from typing import Optional
from fastapi import APIRouter, Request, Form, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud

router = APIRouter(prefix="/admin", tags=["Admin Settings"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/settings", response_class=HTMLResponse)
async def settings_page(
    request: Request,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    settings = crud.get_all_settings(db)
    return templates.TemplateResponse(
        request=request,
        name="admin/settings.html",
        context={
            "admin": admin,
            "settings": settings,
            "active_page": "settings",
            "page_title": "Portfolio Settings",
            "success_msg": None,
            "error_msg": None
        }
    )

@router.post("/settings", response_class=HTMLResponse)
async def update_settings(
    site_title: str = Form(...),
    site_description: str = Form(...),
    contact_email: str = Form(...),
    github_url: str = Form(...),
    linkedin_url: str = Form(...),
    footer_text: str = Form(...),
    current_semester: str = Form("4"),
    contact_form_enabled: Optional[str] = Form(None),
    resume_download_enabled: Optional[str] = Form(None),
    maintenance_mode: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    crud.update_setting(db, "site_title", site_title.strip())
    crud.update_setting(db, "site_description", site_description.strip())
    crud.update_setting(db, "contact_email", contact_email.strip())
    crud.update_setting(db, "github_url", github_url.strip())
    crud.update_setting(db, "linkedin_url", linkedin_url.strip())
    crud.update_setting(db, "footer_text", footer_text.strip())
    crud.update_setting(db, "current_semester", current_semester.strip())
    crud.update_setting(db, "contact_form_enabled", "true" if contact_form_enabled in ("true", "on", "1") else "false")
    crud.update_setting(db, "resume_download_enabled", "true" if resume_download_enabled in ("true", "on", "1") else "false")
    crud.update_setting(db, "maintenance_mode", "true" if maintenance_mode in ("true", "on", "1") else "false")

    crud.create_audit_log(db, action="SETTINGS_UPDATED", details="Updated public portfolio settings", admin_id=admin.id)

    settings = crud.get_all_settings(db)
    return templates.TemplateResponse(
        request=request,
        name="admin/settings.html",
        context={
            "admin": admin,
            "settings": settings,
            "active_page": "settings",
            "page_title": "Portfolio Settings",
            "success_msg": "Portfolio settings updated successfully!"
        }
    )
