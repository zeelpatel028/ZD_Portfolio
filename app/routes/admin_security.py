from typing import Optional
from fastapi import APIRouter, Request, Form, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud
from app.security import verify_password, hash_password

router = APIRouter(prefix="/admin", tags=["Admin Security"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/security", response_class=HTMLResponse)
async def security_page(
    request: Request,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    current_token = request.state.session_token
    active_sessions = crud.get_active_sessions(db, admin.id)
    recent_attempts = crud.get_recent_login_attempts(db, limit=15)
    audit_logs = crud.get_recent_audit_logs(db, limit=20)

    return templates.TemplateResponse(
        request=request,
        name="admin/security.html",
        context={
            "admin": admin,
            "current_token": current_token,
            "active_sessions": active_sessions,
            "recent_attempts": recent_attempts,
            "audit_logs": audit_logs,
            "active_page": "security",
            "page_title": "Admin Security & Audit Logs",
            "success_msg": None,
            "error_msg": None
        }
    )

@router.post("/security/change-password", response_class=HTMLResponse)
async def change_password(
    request: Request,
    current_password: str = Form(...),
    new_password: str = Form(...),
    confirm_password: str = Form(...),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    error_msg = None
    success_msg = None

    if not verify_password(current_password, admin.password_hash):
        error_msg = "Current password verification failed. Please check your existing password."
    elif new_password != confirm_password:
        error_msg = "New password and confirmation password do not match."
    elif len(new_password) < 8:
        error_msg = "New password must be at least 8 characters long."
    else:
        crud.update_admin_password(db, admin.id, new_password)
        # Revoke other active sessions for security
        current_token = request.state.session_token
        crud.revoke_all_admin_sessions(db, admin.id, except_token=current_token)
        crud.create_audit_log(db, action="ADMIN_PASSWORD_CHANGED", details="Password updated successfully", admin_id=admin.id)
        success_msg = "Admin password updated successfully. Other active sessions have been revoked."

    current_token = request.state.session_token
    active_sessions = crud.get_active_sessions(db, admin.id)
    recent_attempts = crud.get_recent_login_attempts(db, limit=15)
    audit_logs = crud.get_recent_audit_logs(db, limit=20)

    return templates.TemplateResponse(
        request=request,
        name="admin/security.html",
        context={
            "admin": admin,
            "current_token": current_token,
            "active_sessions": active_sessions,
            "recent_attempts": recent_attempts,
            "audit_logs": audit_logs,
            "active_page": "security",
            "page_title": "Admin Security & Audit Logs",
            "success_msg": success_msg,
            "error_msg": error_msg
        }
    )

@router.post("/security/update-email", response_class=HTMLResponse)
async def update_email(
    request: Request,
    current_password: str = Form(...),
    new_email: str = Form(...),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    error_msg = None
    success_msg = None
    clean_email = new_email.strip().lower()

    if not verify_password(current_password, admin.password_hash):
        error_msg = "Current password verification failed."
    elif not clean_email or "@" not in clean_email:
        error_msg = "Please enter a valid email address."
    else:
        existing = crud.get_admin_by_email(db, clean_email)
        if existing and existing.id != admin.id:
            error_msg = "An administrator account with this email address already exists."
        else:
            crud.update_admin_email(db, admin.id, clean_email)
            crud.create_audit_log(db, action="ADMIN_EMAIL_CHANGED", details=f"Updated to {clean_email}", admin_id=admin.id)
            success_msg = f"Admin email address updated to {clean_email}."

    current_token = request.state.session_token
    active_sessions = crud.get_active_sessions(db, admin.id)
    recent_attempts = crud.get_recent_login_attempts(db, limit=15)
    audit_logs = crud.get_recent_audit_logs(db, limit=20)

    return templates.TemplateResponse(
        request=request,
        name="admin/security.html",
        context={
            "admin": admin,
            "current_token": current_token,
            "active_sessions": active_sessions,
            "recent_attempts": recent_attempts,
            "audit_logs": audit_logs,
            "active_page": "security",
            "page_title": "Admin Security & Audit Logs",
            "success_msg": success_msg,
            "error_msg": error_msg
        }
    )

@router.post("/security/revoke-session")
async def revoke_session(
    session_token: str = Form(...),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    crud.revoke_admin_session(db, session_token)
    crud.create_audit_log(db, action="SESSION_REVOKED", details=f"Token: {session_token[:10]}...", admin_id=admin.id)
    return RedirectResponse(url="/admin/security", status_code=303)
