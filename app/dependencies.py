from typing import Optional
from fastapi import Request, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import AdminUser
from app.crud import get_admin_session, get_admin_by_id, get_admin_by_email
from app.security import decode_jwt_access_token

class AdminAuthRequired:
    """Dependency that enforces JWT & Session Admin Authentication on FastAPI endpoints."""
    def __init__(self, redirect_on_html: bool = True):
        self.redirect_on_html = redirect_on_html

    async def __call__(self, request: Request, db: Session = Depends(get_db)) -> AdminUser:
        token = None
        
        # 1. Try to extract JWT token from Authorization header (Bearer <token>)
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1].strip()

        # 2. Try to extract JWT / session token from cookies
        if not token:
            token = request.cookies.get("admin_jwt") or request.cookies.get("admin_session")
        
        is_html_route = self.redirect_on_html and (
            request.url.path.startswith("/admin/") or 
            "text/html" in request.headers.get("accept", "") or
            "*/*" in request.headers.get("accept", "")
        )

        admin = None

        if token:
            # Check if token is valid JWT
            payload = decode_jwt_access_token(token)
            if payload:
                admin_id = payload.get("admin_id")
                email = payload.get("sub")
                if admin_id:
                    admin = get_admin_by_id(db, admin_id)
                elif email:
                    admin = get_admin_by_email(db, email)

            # Fallback to database session check
            if not admin:
                session = get_admin_session(db, token)
                if session and session.user:
                    admin = session.user

        if not admin:
            if is_html_route:
                raise HTTPException(
                    status_code=status.HTTP_307_TEMPORARY_REDIRECT,
                    headers={"Location": f"/admin/login?next={request.url.path}"}
                )
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="JWT Authentication required. Please log in to access the admin panel."
            )

        request.state.admin = admin
        request.state.session_token = token
        return admin

def get_current_admin_optional(request: Request, db: Session = Depends(get_db)) -> Optional[AdminUser]:
    token = request.cookies.get("admin_jwt") or request.cookies.get("admin_session")
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1].strip()

    if not token:
        return None

    payload = decode_jwt_access_token(token)
    if payload:
        admin_id = payload.get("admin_id")
        email = payload.get("sub")
        if admin_id:
            return get_admin_by_id(db, admin_id)
        elif email:
            return get_admin_by_email(db, email)

    session = get_admin_session(db, token)
    return session.user if session else None

def verify_csrf(request: Request, csrf_token: Optional[str] = None) -> bool:
    cookie_token = request.cookies.get("csrf_token")
    header_token = request.headers.get("x-csrf-token")
    provided_token = csrf_token or header_token

    if not cookie_token or not provided_token:
        return False
    return cookie_token == provided_token
