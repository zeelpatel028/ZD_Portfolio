import os
import secrets
from typing import Optional
from fastapi import APIRouter, Request, Form, Depends, HTTPException, status, Query
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
import app.crud as crud
from app.security import (
    verify_password, generate_otp, is_rate_limited, generate_csrf_token,
    create_jwt_access_token
)
from app.email_service import send_otp_email

router = APIRouter(prefix="/admin", tags=["Admin Auth"])
templates = Jinja2Templates(directory="app/templates")

@router.get("/login", response_class=HTMLResponse)
async def login_page(
    request: Request,
    next_url: Optional[str] = Query(None, alias="next"),
    expired: Optional[str] = None,
    db: Session = Depends(get_db)
):
    # If already authenticated, redirect to dashboard
    session_token = request.cookies.get("admin_session")
    if session_token and crud.get_admin_session(db, session_token):
        return RedirectResponse(url="/admin/dashboard", status_code=status.HTTP_302_FOUND)

    csrf_token = generate_csrf_token()
    response = templates.TemplateResponse(
        request=request,
        name="admin/login.html",
        context={
            "next_url": next_url or "/admin/dashboard",
            "expired": expired == "1",
            "csrf_token": csrf_token,
            "error": None
        }
    )
    response.set_cookie("csrf_token", csrf_token, httponly=True, samesite="lax")
    return response

@router.post("/login", response_class=HTMLResponse)
async def handle_login(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    next_url: Optional[str] = Form("/admin/dashboard"),
    db: Session = Depends(get_db)
):
    ip_address = request.client.host if request.client else "127.0.0.1"
    clean_email = email.strip().lower()

    # Rate limiting check
    if is_rate_limited(db, clean_email, ip_address):
        return templates.TemplateResponse(
            request=request,
            name="admin/login.html",
            context={
                "error": "Too many failed login attempts. Please wait 15 minutes before trying again.",
                "email": email,
                "next_url": next_url,
                "csrf_token": request.cookies.get("csrf_token", "")
            },
            status_code=status.HTTP_429_TOO_MANY_REQUESTS
        )

    admin = crud.get_admin_by_email(db, clean_email)
    if not admin or not verify_password(password, admin.password_hash):
        crud.record_login_attempt(db, clean_email, ip_address, success=False)
        crud.create_audit_log(db, action="FAILED_LOGIN_ATTEMPT", details=f"Email: {clean_email}", ip_address=ip_address)
        return templates.TemplateResponse(
            request=request,
            name="admin/login.html",
            context={
                "error": "Invalid email or password. Please check your credentials.",
                "email": email,
                "next_url": next_url,
                "csrf_token": request.cookies.get("csrf_token", "")
            },
            status_code=status.HTTP_401_UNAUTHORIZED
        )

    # Valid credentials -> Generate 6-digit OTP
    crud.record_login_attempt(db, clean_email, ip_address, success=True)
    otp_code = generate_otp()
    crud.create_otp(db, admin.id, otp_code, expiry_seconds=300)
    print(f"🔑 [ADMIN LOGIN OTP] Code for {admin.email}: {otp_code}")

    # Dispatch OTP Email
    email_result = send_otp_email(admin.email, otp_code)
    if not email_result["success"]:
        crud.create_audit_log(db, action="OTP_DISPATCH_FAILED", details=email_result.get("error"), admin_id=admin.id, ip_address=ip_address)
        return templates.TemplateResponse(
            request=request,
            name="admin/login.html",
            context={
                "error": f"Failed to deliver OTP verification email: {email_result.get('error', 'SMTP configuration issue')}. Please verify server email settings.",
                "email": email,
                "next_url": next_url,
                "csrf_token": request.cookies.get("csrf_token", "")
            },
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    crud.create_audit_log(db, action="OTP_SENT", details=f"Sent to {admin.email}", admin_id=admin.id, ip_address=ip_address)

    # Set pending_auth temporary cookie for OTP stage (expires in 10 mins)
    response = RedirectResponse(url="/admin/verify-otp", status_code=status.HTTP_302_FOUND)
    response.set_cookie("pending_admin_id", str(admin.id), httponly=True, samesite="lax", max_age=600)
    return response

@router.get("/verify-otp", response_class=HTMLResponse)
async def verify_otp_page(request: Request):
    pending_admin_id = request.cookies.get("pending_admin_id")
    if not pending_admin_id:
        return RedirectResponse(url="/admin/login", status_code=status.HTTP_302_FOUND)

    csrf_token = generate_csrf_token()
    response = templates.TemplateResponse(
        request=request,
        name="admin/verify_otp.html",
        context={
            "error": None,
            "success_msg": None,
            "csrf_token": csrf_token
        }
    )
    response.set_cookie("csrf_token", csrf_token, httponly=True, samesite="lax")
    return response

@router.post("/verify-otp", response_class=HTMLResponse)
async def handle_verify_otp(
    request: Request,
    otp_code: str = Form(...),
    db: Session = Depends(get_db)
):
    pending_admin_id = request.cookies.get("pending_admin_id")
    if not pending_admin_id:
        return RedirectResponse(url="/admin/login", status_code=status.HTTP_302_FOUND)

    try:
        admin_id = int(pending_admin_id)
    except ValueError:
        return RedirectResponse(url="/admin/login", status_code=status.HTTP_302_FOUND)

    ip_address = request.client.host if request.client else "127.0.0.1"
    user_agent = request.headers.get("user-agent", "")

    success, message = crud.verify_and_consume_otp(db, admin_id, otp_code.strip())
    if not success:
        crud.create_audit_log(db, action="FAILED_OTP_VERIFICATION", details=message, admin_id=admin_id, ip_address=ip_address)
        return templates.TemplateResponse(
            request=request,
            name="admin/verify_otp.html",
            context={
                "error": message,
                "csrf_token": request.cookies.get("csrf_token", "")
            },
            status_code=status.HTTP_400_BAD_REQUEST
        )

    # Success! Create authenticated session
    session_max_age = int(os.getenv("SESSION_MAX_AGE", "28800"))
    session = crud.create_admin_session(
        db=db,
        admin_id=admin_id,
        ip_address=ip_address,
        user_agent=user_agent,
        max_age_seconds=session_max_age
    )

    crud.create_audit_log(db, action="ADMIN_LOGIN_SUCCESS", details="OTP Verified", admin_id=admin_id, ip_address=ip_address)

    admin = crud.get_admin_by_id(db, admin_id)
    jwt_token = create_jwt_access_token({"sub": admin.email if admin else str(admin_id), "admin_id": admin_id, "role": "admin"})

    response = RedirectResponse(url="/admin/dashboard", status_code=status.HTTP_302_FOUND)
    response.set_cookie(
        key="admin_session",
        value=session.session_token,
        httponly=True,
        samesite="lax",
        max_age=session_max_age
    )
    response.set_cookie(
        key="admin_jwt",
        value=jwt_token,
        httponly=True,
        samesite="lax",
        max_age=session_max_age
    )
    response.delete_cookie("pending_admin_id")
    return response

@router.post("/resend-otp")
async def resend_otp(request: Request, db: Session = Depends(get_db)):
    pending_admin_id = request.cookies.get("pending_admin_id")
    if not pending_admin_id:
        return JSONResponse(status_code=400, content={"success": False, "error": "No pending auth session found. Please log in again."})

    try:
        admin_id = int(pending_admin_id)
    except ValueError:
        return JSONResponse(status_code=400, content={"success": False, "error": "Invalid auth session."})

    admin = crud.get_admin_by_id(db, admin_id)
    if not admin:
        return JSONResponse(status_code=400, content={"success": False, "error": "Admin user not found."})

    otp_code = generate_otp()
    crud.create_otp(db, admin.id, otp_code, expiry_seconds=300)
    email_result = send_otp_email(admin.email, otp_code)

    if not email_result["success"]:
        return JSONResponse(status_code=500, content={"success": False, "error": email_result.get("error")})

    return JSONResponse(content={"success": True, "message": "A new verification code has been dispatched to your email."})

@router.get("/logout")
@router.post("/logout")
async def logout(request: Request, db: Session = Depends(get_db)):
    session_token = request.cookies.get("admin_session") or request.cookies.get("admin_jwt")
    if session_token:
        crud.revoke_admin_session(db, session_token)

    response = RedirectResponse(url="/admin/login", status_code=status.HTTP_302_FOUND)
    response.delete_cookie("admin_session")
    response.delete_cookie("admin_jwt")
    response.delete_cookie("csrf_token")
    return response

@router.post("/token")
async def api_login_token(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    """API endpoint to issue JWT Bearer Access Tokens for admin authentication."""
    clean_email = email.strip().lower()
    admin = crud.get_admin_by_email(db, clean_email)
    if not admin or not verify_password(password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    jwt_token = create_jwt_access_token({"sub": admin.email, "admin_id": admin.id, "role": "admin"})
    return {
        "access_token": jwt_token,
        "token_type": "bearer",
        "expires_in": 28800,
        "admin": {"id": admin.id, "email": admin.email}
    }
