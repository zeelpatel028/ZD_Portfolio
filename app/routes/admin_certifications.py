from typing import Optional
from fastapi import APIRouter, Request, Form, File, UploadFile, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud
from app.file_utils import save_upload_file

router = APIRouter(prefix="/admin", tags=["Admin Certifications"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/certifications", response_class=HTMLResponse)
async def certifications_page(
    request: Request,
    edit_id: Optional[int] = None,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    certifications = crud.get_all_certifications(db, only_published=False)
    editing_cert = crud.get_certification_by_id(db, edit_id) if edit_id else None

    return templates.TemplateResponse(
        request=request,
        name="admin/certifications.html",
        context={
            "admin": admin,
            "certifications": certifications,
            "editing_cert": editing_cert,
            "active_page": "certifications",
            "page_title": "Certifications Management"
        }
    )

@router.post("/certifications", response_class=HTMLResponse)
async def save_certification(
    cert_id: Optional[int] = Form(None),
    title: str = Form(...),
    issuing_organization: Optional[str] = Form(None),
    issue_date: Optional[str] = Form(None),
    expiration_date: Optional[str] = Form(None),
    credential_id: Optional[str] = Form(None),
    credential_url: Optional[str] = Form(None),
    icon: str = Form("fa-award"),
    description: str = Form(...),
    display_order: int = Form(0),
    is_published: Optional[str] = Form(None),
    document: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    cert_data = {
        "title": title.strip(),
        "issuing_organization": (issuing_organization or "").strip() or None,
        "issue_date": (issue_date or "").strip() or None,
        "expiration_date": (expiration_date or "").strip() or None,
        "credential_id": (credential_id or "").strip() or None,
        "credential_url": (credential_url or "").strip() or None,
        "icon": icon.strip(),
        "description": description.strip(),
        "display_order": display_order,
        "is_published": is_published in ("true", "on", "1")
    }

    if document and document.filename:
        is_pdf = document.filename.lower().endswith(".pdf")
        ok, msg, path = await save_upload_file(document, "app/static/files" if is_pdf else "app/static/images", is_pdf=is_pdf)
        if ok:
            cert_data["document_url"] = path

    saved = crud.create_or_update_certification(db, cert_data, cert_id=cert_id)
    action = "UPDATED" if cert_id else "CREATED"
    crud.create_audit_log(db, action=f"CERTIFICATION_{action}", details=f"Title: {saved.title}", admin_id=admin.id)

    return RedirectResponse(url="/admin/certifications", status_code=303)

@router.post("/certifications/{cert_id}/delete")
async def delete_certification_entry(
    cert_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    crud.delete_certification(db, cert_id)
    crud.create_audit_log(db, action="CERTIFICATION_DELETED", details=f"ID: {cert_id}", admin_id=admin.id)
    return RedirectResponse(url="/admin/certifications", status_code=303)

@router.post("/certifications/{cert_id}/toggle-published")
async def toggle_certification_published(
    cert_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    cert = crud.get_certification_by_id(db, cert_id)
    if cert:
        crud.create_or_update_certification(db, {"is_published": not cert.is_published}, cert_id=cert_id)
        crud.create_audit_log(db, action="CERTIFICATION_PUBLISHED_TOGGLED", details=f"ID {cert_id} Published: {not cert.is_published}", admin_id=admin.id)
    return RedirectResponse(url="/admin/certifications", status_code=303)
