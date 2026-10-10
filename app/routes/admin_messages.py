from typing import Optional
from fastapi import APIRouter, Request, Form, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud

router = APIRouter(prefix="/admin", tags=["Admin Contact Messages"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/messages", response_class=HTMLResponse)
async def messages_page(
    request: Request,
    page: int = 1,
    search: Optional[str] = None,
    filter_read: Optional[str] = None,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    read_filter: Optional[bool] = None
    if filter_read == "read":
        read_filter = True
    elif filter_read == "unread":
        read_filter = False

    messages, total = crud.get_contact_messages(
        db, search=search, filter_read=read_filter, page=page, per_page=10
    )

    total_pages = max(1, (total + 9) // 10)

    return templates.TemplateResponse(
        request=request,
        name="admin/messages.html",
        context={
            "admin": admin,
            "messages": messages,
            "current_page": page,
            "total_pages": total_pages,
            "total_messages": total,
            "search_query": search or "",
            "filter_read": filter_read or "all",
            "active_page": "messages",
            "page_title": "Contact Messages"
        }
    )

@router.post("/messages/{msg_id}/toggle-read")
async def toggle_message_read(
    msg_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    msg = crud.toggle_message_read_status(db, msg_id)
    if msg:
        status_str = "Read" if msg.is_read else "Unread"
        crud.create_audit_log(db, action="MESSAGE_STATUS_CHANGED", details=f"Msg ID {msg_id} marked {status_str}", admin_id=admin.id)
    return RedirectResponse(url="/admin/messages", status_code=303)

@router.post("/messages/{msg_id}/delete")
async def delete_message(
    msg_id: int,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    crud.delete_contact_message(db, msg_id)
    crud.create_audit_log(db, action="MESSAGE_DELETED", details=f"ID: {msg_id}", admin_id=admin.id)
    return RedirectResponse(url="/admin/messages", status_code=303)
