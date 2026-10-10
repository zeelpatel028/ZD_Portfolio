from typing import Optional
from fastapi import APIRouter, Request, Form, File, UploadFile, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud
from app.file_utils import save_upload_file

router = APIRouter(prefix="/admin", tags=["Admin Experience"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/experience", response_class=HTMLResponse)
async def experience_page(
    request: Request,
    edit_id: Optional[int] = None,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    experiences = crud.get_all_experiences(db, only_published=False)
    editing_exp = crud.get_experience_by_id(db, edit_id) if edit_id else None

    return templates.TemplateResponse(
        request=request,
        name="admin/experience.html",
        context={
            "admin": admin,
            "experiences": experiences,
            "editing_exp": editing_exp,
            "active_page": "experience",
            "page_title": "Experience Management"
        }
    )

@router.post("/experience", response_class=HTMLResponse)
async def save_experience(
    exp_id: Optional[int] = Form(None),
    company_name: str = Form(...),
    role_title: str = Form(...),
    employment_type: Optional[str] = Form("Full-time"),
    start_date: str = Form(...),
    end_date: Optional[str] = Form("Present"),
    is_current: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    company_description: Optional[str] = Form(None),
    responsibilities: Optional[str] = Form(None),
    tech_stack: Optional[str] = Form(None),
    key_achievements: Optional[str] = Form(None),
    company_url: Optional[str] = Form(None),
    display_order: int = Form(0),
    is_published: Optional[str] = Form(None),
    company_logo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    exp_data = {
        "company_name": company_name.strip(),
        "role_title": role_title.strip(),
        "employment_type": (employment_type or "").strip(),
        "start_date": start_date.strip(),
        "end_date": (end_date or "").strip(),
        "is_current": is_current in ("true", "on", "1"),
        "location": (location or "").strip() or None,
        "company_description": (company_description or "").strip() or None,
        "responsibilities": (responsibilities or "").strip(),
        "tech_stack": (tech_stack or "").strip(),
        "key_achievements": (key_achievements or "").strip(),
        "company_url": (company_url or "").strip() or None,
        "display_order": display_order,
        "is_published": is_published in ("true", "on", "1")
    }

    if company_logo and company_logo.filename:
        ok, msg, path = await save_upload_file(company_logo, "app/static/images", is_pdf=False)
        if ok:
            exp_data["company_logo_url"] = path

    saved = crud.create_or_update_experience(db, exp_data, exp_id=exp_id)
    action = "UPDATED" if exp_id else "CREATED"
    crud.create_audit_log(db, action=f"EXPERIENCE_{action}", details=f"Company: {saved.company_name} - Role: {saved.role_title}", admin_id=admin.id)

    return RedirectResponse(url="/admin/experience", status_code=303)

@router.post("/experience/{exp_id}/delete")
async def delete_experience_entry(
    exp_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    crud.delete_experience(db, exp_id)
    crud.create_audit_log(db, action="EXPERIENCE_DELETED", details=f"ID: {exp_id}", admin_id=admin.id)
    return RedirectResponse(url="/admin/experience", status_code=303)

@router.post("/experience/{exp_id}/toggle-published")
async def toggle_experience_published(
    exp_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    exp = crud.get_experience_by_id(db, exp_id)
    if exp:
        crud.create_or_update_experience(db, {"is_published": not exp.is_published}, exp_id=exp_id)
        crud.create_audit_log(db, action="EXPERIENCE_PUBLISHED_TOGGLED", details=f"ID {exp_id} Published: {not exp.is_published}", admin_id=admin.id)
    return RedirectResponse(url="/admin/experience", status_code=303)
