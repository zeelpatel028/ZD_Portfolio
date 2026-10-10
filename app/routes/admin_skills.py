from typing import Optional
from fastapi import APIRouter, Request, Form, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud

router = APIRouter(prefix="/admin", tags=["Admin Skills"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/skills", response_class=HTMLResponse)
async def skills_page(
    request: Request,
    edit_id: Optional[int] = None,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    skills = crud.get_all_skills(db, only_enabled=False)
    editing_skill = crud.get_skill_by_id(db, edit_id) if edit_id else None

    categories = [
        "Programming Languages",
        "Machine Learning & Data",
        "Web & Backend Development",
        "Tools & Databases",
        "Frontend Development",
        "Developer Tools"
    ]

    return templates.TemplateResponse(
        request=request,
        name="admin/skills.html",
        context={
            "admin": admin,
            "skills": skills,
            "editing_skill": editing_skill,
            "categories": categories,
            "active_page": "skills",
            "page_title": "Skills Management"
        }
    )

@router.post("/skills", response_class=HTMLResponse)
async def save_skill(
    skill_id: Optional[int] = Form(None),
    name: str = Form(...),
    category: str = Form(...),
    category_icon: str = Form("fa-solid fa-code"),
    icon: str = Form(...),
    proficiency: int = Form(85),
    display_order: int = Form(0),
    is_enabled: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    skill_data = {
        "name": name.strip(),
        "category": category.strip(),
        "category_icon": category_icon.strip(),
        "icon": icon.strip(),
        "proficiency": max(1, min(100, proficiency)),
        "display_order": display_order,
        "is_enabled": is_enabled in ("true", "on", "1")
    }

    saved = crud.create_or_update_skill(db, skill_data, skill_id=skill_id)
    action = "UPDATED" if skill_id else "CREATED"
    crud.create_audit_log(db, action=f"SKILL_{action}", details=f"Skill: {saved.name}", admin_id=admin.id)

    return RedirectResponse(url="/admin/skills", status_code=303)

@router.post("/skills/{skill_id}/delete")
async def delete_skill_entry(
    skill_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    crud.delete_skill(db, skill_id)
    crud.create_audit_log(db, action="SKILL_DELETED", details=f"ID: {skill_id}", admin_id=admin.id)
    return RedirectResponse(url="/admin/skills", status_code=303)

@router.post("/skills/{skill_id}/toggle")
async def toggle_skill_entry(
    skill_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    skill = crud.get_skill_by_id(db, skill_id)
    if skill:
        crud.create_or_update_skill(db, {"is_enabled": not skill.is_enabled}, skill_id=skill_id)
        crud.create_audit_log(db, action="SKILL_TOGGLED", details=f"Skill ID {skill_id} Enabled: {not skill.is_enabled}", admin_id=admin.id)
    return RedirectResponse(url="/admin/skills", status_code=303)
