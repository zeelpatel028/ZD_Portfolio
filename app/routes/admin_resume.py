import os
from fastapi import APIRouter, Request, Form, File, UploadFile, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud
from app.file_utils import save_upload_file

router = APIRouter(prefix="/admin", tags=["Admin Resume"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/resume", response_class=HTMLResponse)
async def resume_page(
    request: Request,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    profile = crud.get_profile(db)
    resume_enabled = crud.get_setting(db, "resume_download_enabled", "true") == "true"
    
    resume_file_exists = False
    file_size_kb = 0
    if profile and profile.resume_url:
        local_path = profile.resume_url.lstrip("/")
        if not local_path.startswith("app/"):
            local_path = "app/" + local_path
        if os.path.exists(local_path):
            resume_file_exists = True
            file_size_kb = round(os.path.getsize(local_path) / 1024, 1)

    return templates.TemplateResponse(
        request=request,
        name="admin/resume.html",
        context={
            "admin": admin,
            "profile": profile,
            "resume_enabled": resume_enabled,
            "resume_file_exists": resume_file_exists,
            "file_size_kb": file_size_kb,
            "active_page": "resume",
            "page_title": "Resume File Management",
            "success_msg": None,
            "error_msg": None
        }
    )

@router.post("/resume", response_class=HTMLResponse)
async def upload_resume(
    request: Request,
    resume_file: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    profile = crud.get_profile(db)
    resume_enabled = crud.get_setting(db, "resume_download_enabled", "true") == "true"

    if not resume_file or not resume_file.filename:
        return templates.TemplateResponse(
            request=request,
            name="admin/resume.html",
            context={
                "admin": admin,
                "profile": profile,
                "resume_enabled": resume_enabled,
                "resume_file_exists": False,
                "file_size_kb": 0,
                "active_page": "resume",
                "page_title": "Resume File Management",
                "error_msg": "Please select a valid PDF file to upload."
            }
        )

    ok, msg, rel_path = await save_upload_file(resume_file, "app/static/files", is_pdf=True)
    if not ok:
        return templates.TemplateResponse(
            request=request,
            name="admin/resume.html",
            context={
                "admin": admin,
                "profile": profile,
                "resume_enabled": resume_enabled,
                "resume_file_exists": False,
                "file_size_kb": 0,
                "active_page": "resume",
                "page_title": "Resume File Management",
                "error_msg": f"Resume Upload Error: {msg}"
            }
        )

    # Update profile record with new resume URL
    updated_profile = crud.update_profile(db, {"resume_url": rel_path})
    crud.create_audit_log(db, action="RESUME_UPDATED", details=f"New resume path: {rel_path}", admin_id=admin.id)

    local_path = rel_path.lstrip("/")
    if not local_path.startswith("app/"):
        local_path = "app/" + local_path
    file_size_kb = round(os.path.getsize(local_path) / 1024, 1) if os.path.exists(local_path) else 0

    return templates.TemplateResponse(
        request=request,
        name="admin/resume.html",
        context={
            "admin": admin,
            "profile": updated_profile,
            "resume_enabled": resume_enabled,
            "resume_file_exists": True,
            "file_size_kb": file_size_kb,
            "active_page": "resume",
            "page_title": "Resume File Management",
            "success_msg": "Resume PDF uploaded and published successfully!"
        }
    )

@router.post("/resume/toggle-availability")
async def toggle_resume_availability(
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    curr = crud.get_setting(db, "resume_download_enabled", "true") == "true"
    new_val = "false" if curr else "true"
    crud.update_setting(db, "resume_download_enabled", new_val)
    crud.create_audit_log(db, action="RESUME_AVAILABILITY_TOGGLED", details=f"Enabled: {new_val}", admin_id=admin.id)
    return RedirectResponse(url="/admin/resume", status_code=303)
