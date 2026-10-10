from typing import Optional
from fastapi import APIRouter, Request, Form, File, UploadFile, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud
from app.file_utils import save_upload_file

router = APIRouter(prefix="/admin", tags=["Admin Profile"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/profile", response_class=HTMLResponse)
async def profile_page(
    request: Request,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    profile = crud.get_profile(db)
    return templates.TemplateResponse(
        request=request,
        name="admin/profile.html",
        context={
            "admin": admin,
            "profile": profile,
            "active_page": "profile",
            "page_title": "Profile Management",
            "success_msg": None,
            "error_msg": None
        }
    )

@router.post("/profile", response_class=HTMLResponse)
async def handle_update_profile(
    request: Request,
    name: str = Form(...),
    title: str = Form(...),
    location: Optional[str] = Form(None),
    email: str = Form(...),
    phone: Optional[str] = Form(None),
    github: Optional[str] = Form(None),
    linkedin: Optional[str] = Form(None),
    summary: str = Form(...),
    photo: Optional[UploadFile] = File(None),
    avatar: Optional[UploadFile] = File(None),
    logo: Optional[UploadFile] = File(None),
    resume: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    profile = crud.get_profile(db)
    p_data = {
        "name": name.strip(),
        "title": title.strip(),
        "location": (location or "").strip(),
        "email": email.strip(),
        "phone": (phone or "").strip(),
        "github": (github or "").strip(),
        "linkedin": (linkedin or "").strip(),
        "summary": summary.strip()
    }

    error_msg = None

    # Process file uploads
    if photo and photo.filename:
        ok, msg, path = await save_upload_file(photo, "app/static/images")
        if ok:
            p_data["photo_url"] = path
        else:
            error_msg = f"Photo upload failed: {msg}"

    if avatar and avatar.filename:
        ok, msg, path = await save_upload_file(avatar, "app/static/images")
        if ok:
            p_data["avatar_url"] = path
        elif not error_msg:
            error_msg = f"Avatar upload failed: {msg}"

    if logo and logo.filename:
        ok, msg, path = await save_upload_file(logo, "app/static/images")
        if ok:
            p_data["logo_url"] = path
        elif not error_msg:
            error_msg = f"Logo upload failed: {msg}"

    if resume and resume.filename:
        ok, msg, path = await save_upload_file(resume, "app/static/files", is_pdf=True)
        if ok:
            p_data["resume_url"] = path
        elif not error_msg:
            error_msg = f"Resume upload failed: {msg}"

    updated_profile = crud.update_profile(db, p_data)
    crud.create_audit_log(db, action="PROFILE_UPDATED", details="Updated personal profile info", admin_id=admin.id)

    return templates.TemplateResponse(
        request=request,
        name="admin/profile.html",
        context={
            "admin": admin,
            "profile": updated_profile,
            "active_page": "profile",
            "page_title": "Profile Management",
            "success_msg": "Profile information updated successfully!" if not error_msg else None,
            "error_msg": error_msg
        }
    )
