from typing import Optional
from fastapi import APIRouter, Request, Form, File, UploadFile, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud
from app.file_utils import save_upload_file

router = APIRouter(prefix="/admin", tags=["Admin Projects"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/projects", response_class=HTMLResponse)
async def projects_page(
    request: Request,
    edit_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    projects = crud.get_all_projects(db, only_published=False)
    if search:
        s = search.strip().lower()
        projects = [p for p in projects if s in p.title.lower() or s in p.type.lower() or s in (p.short_description or "").lower()]

    editing_project = crud.get_project_by_id(db, edit_id) if edit_id else None

    return templates.TemplateResponse(
        request=request,
        name="admin/projects.html",
        context={
            "admin": admin,
            "projects": projects,
            "editing_project": editing_project,
            "search_query": search or "",
            "active_page": "projects",
            "page_title": "Projects Management"
        }
    )

@router.post("/projects", response_class=HTMLResponse)
async def save_project(
    proj_id: Optional[int] = Form(None),
    title: str = Form(...),
    slug: Optional[str] = Form(None),
    repo_name: Optional[str] = Form(None),
    type_name: str = Form(..., alias="type"),
    status: str = Form("Completed"),
    short_description: str = Form(...),
    full_description: Optional[str] = Form(None),
    features: str = Form(""),
    tech_stack: str = Form(""),
    github_url: Optional[str] = Form(None),
    live_demo_url: Optional[str] = Form(None),
    start_date: Optional[str] = Form(None),
    is_featured: Optional[str] = Form(None),
    is_published: Optional[str] = Form(None),
    display_order: int = Form(0),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    features_list = [f.strip() for f in features.splitlines() if f.strip()]
    tech_list = [t.strip() for t in tech_stack.split(",") if t.strip()]

    is_featured_bool = is_featured in ("true", "on", "1")
    is_published_bool = is_published in ("true", "on", "1")

    proj_data = {
        "title": title.strip(),
        "slug": (slug or "").strip() or None,
        "repo_name": (repo_name or "").strip() or None,
        "type": type_name.strip(),
        "status": status.strip(),
        "short_description": short_description.strip(),
        "full_description": (full_description or short_description).strip(),
        "features": features_list,
        "tech_stack": tech_list,
        "github_url": (github_url or "").strip() or None,
        "live_demo_url": (live_demo_url or "").strip() or None,
        "start_date": (start_date or "").strip() or None,
        "is_featured": is_featured_bool,
        "is_published": is_published_bool,
        "display_order": display_order
    }

    if image and image.filename:
        ok, msg, path = await save_upload_file(image, "app/static/images")
        if ok:
            proj_data["image_url"] = path

    saved = crud.create_or_update_project(db, proj_data, proj_id=proj_id)
    action = "UPDATED" if proj_id else "CREATED"
    crud.create_audit_log(db, action=f"PROJECT_{action}", details=f"Title: {saved.title}", admin_id=admin.id)

    return RedirectResponse(url="/admin/projects", status_code=303)

@router.post("/projects/{proj_id}/delete")
async def delete_project_entry(
    proj_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    crud.delete_project(db, proj_id)
    crud.create_audit_log(db, action="PROJECT_DELETED", details=f"ID: {proj_id}", admin_id=admin.id)
    return RedirectResponse(url="/admin/projects", status_code=303)

@router.post("/projects/{proj_id}/toggle-published")
async def toggle_project_published(
    proj_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    proj = crud.get_project_by_id(db, proj_id)
    if proj:
        crud.create_or_update_project(db, {"is_published": not proj.is_published}, proj_id=proj_id)
        crud.create_audit_log(db, action="PROJECT_PUBLISHED_TOGGLED", details=f"ID {proj_id} Published: {not proj.is_published}", admin_id=admin.id)
    return RedirectResponse(url="/admin/projects", status_code=303)

@router.post("/projects/{proj_id}/toggle-featured")
async def toggle_project_featured(
    proj_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    proj = crud.get_project_by_id(db, proj_id)
    if proj:
        crud.create_or_update_project(db, {"is_featured": not proj.is_featured}, proj_id=proj_id)
        crud.create_audit_log(db, action="PROJECT_FEATURED_TOGGLED", details=f"ID {proj_id} Featured: {not proj.is_featured}", admin_id=admin.id)
    return RedirectResponse(url="/admin/projects", status_code=303)
