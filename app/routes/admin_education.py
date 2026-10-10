import json
from typing import Optional, List
from fastapi import APIRouter, Request, Form, Depends
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud

router = APIRouter(prefix="/admin", tags=["Admin Education"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/education", response_class=HTMLResponse)
async def education_page(
    request: Request,
    edit_id: Optional[int] = None,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    education_items = crud.get_all_education(db)
    editing_item = crud.get_education_by_id(db, edit_id) if edit_id else None

    return templates.TemplateResponse(
        request=request,
        name="admin/education.html",
        context={
            "admin": admin,
            "education_items": education_items,
            "editing_item": editing_item,
            "active_page": "education",
            "page_title": "Education & Semester Management",
            "success_msg": None,
            "error_msg": None
        }
    )

@router.post("/education", response_class=HTMLResponse)
async def save_education(
    ed_id: Optional[int] = Form(None),
    stage_num: str = Form(...),
    period: str = Form(...),
    title: str = Form(...),
    institution: str = Form(...),
    stats: str = Form(...),
    grade: str = Form(...),
    short_points: str = Form(""),
    project_title: Optional[str] = Form(None),
    project_desc: Optional[str] = Form(None),
    tech_stack: str = Form(""),
    type_name: str = Form(..., alias="type"),
    color: str = Form("#3b82f6"),
    marksheet_id: Optional[str] = Form(None),
    is_active: Optional[str] = Form(None),
    display_order: int = Form(0),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    points_list = [p.strip() for p in short_points.splitlines() if p.strip()]
    tech_list = [t.strip() for t in tech_stack.split(",") if t.strip()]

    ed_data = {
        "stage_num": stage_num.strip(),
        "period": period.strip(),
        "title": title.strip(),
        "institution": institution.strip(),
        "stats": stats.strip(),
        "grade": grade.strip(),
        "short_points": points_list,
        "project_title": (project_title or "").strip() or None,
        "project_desc": (project_desc or "").strip() or None,
        "tech_stack": tech_list,
        "type": type_name.strip(),
        "color": color.strip(),
        "marksheet_id": (marksheet_id or "").strip() or None,
        "is_active": is_active in ("true", "on", "1"),
        "display_order": display_order
    }

    saved = crud.create_or_update_education(db, ed_data, ed_id=ed_id)
    action_text = "Updated" if ed_id else "Created"
    crud.create_audit_log(db, action=f"EDUCATION_{action_text.upper()}", details=f"Stage: {saved.title}", admin_id=admin.id)

    return RedirectResponse(url="/admin/education", status_code=303)

@router.post("/education/{ed_id}/delete")
async def delete_education_entry(
    ed_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    crud.delete_education(db, ed_id)
    crud.create_audit_log(db, action="EDUCATION_DELETED", details=f"ID: {ed_id}", admin_id=admin.id)
    return RedirectResponse(url="/admin/education", status_code=303)

@router.post("/education/{ed_id}/set-active")
async def set_active_semester(
    ed_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    crud.create_or_update_education(db, {"is_active": True}, ed_id=ed_id)
    crud.create_audit_log(db, action="ACTIVE_SEMESTER_CHANGED", details=f"Set Active ID: {ed_id}", admin_id=admin.id)
    return RedirectResponse(url="/admin/education", status_code=303)
