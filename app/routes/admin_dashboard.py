from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import AdminAuthRequired
import app.crud as crud

router = APIRouter(prefix="/admin", tags=["Admin Dashboard"])
templates = Jinja2Templates(directory="app/templates")
auth_required = AdminAuthRequired(redirect_on_html=True)

@router.get("/dashboard", response_class=HTMLResponse)
async def dashboard(
    request: Request,
    db: Session = Depends(get_db),
    admin = Depends(auth_required)
):
    stats = crud.get_dashboard_stats(db)
    recent_logs = crud.get_recent_audit_logs(db, limit=15)

    return templates.TemplateResponse(
        request=request,
        name="admin/dashboard.html",
        context={
            "admin": admin,
            "stats": stats,
            "recent_logs": recent_logs,
            "active_page": "dashboard",
            "page_title": "Dashboard",
            "db_status": "Connected (SQLite)"
        }
    )
