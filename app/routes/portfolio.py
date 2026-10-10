import os
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional

from fastapi import APIRouter, Request, Form, HTTPException, status, Depends
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session

from app.database import get_db
import app.crud as crud
from app.data import (
    get_profile_data as default_profile_data,
    get_semester_status_data as default_semester_status_data,
    get_projects_data as default_projects_data,
    get_skills_data as default_skills_data,
    get_certifications_data as default_certifications_data,
    get_education_steps as default_education_steps
)
from app.email_service import send_contact_notification

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

class ContactFormSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=5, max_length=5000)

def is_valid_email(email_str: str) -> bool:
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email_str))

# Helper to fetch active DB profile or fallback
def fetch_profile(db: Session):
    p = crud.get_profile(db)
    if p:
        return {
            "name": p.name,
            "title": p.title,
            "location": p.location,
            "email": p.email,
            "phone": p.phone,
            "github": p.github,
            "linkedin": p.linkedin,
            "summary": p.summary,
            "university": p.university,
            "degree": p.degree,
            "resume_url": p.resume_url or "/static/files/Zeel_Dobariya_python.pdf",
            "logo_url": p.logo_url or "/static/images/ZD.png",
            "photo_url": p.photo_url or "/static/images/ZD_Photo.png",
            "avatar_url": p.avatar_url or "/static/images/ZD_Chereter.png"
        }
    return default_profile_data()

# Helper to fetch published DB projects or fallback
def fetch_projects(db: Session):
    db_projects = crud.get_all_projects(db, only_published=True)
    if db_projects:
        res = []
        for p in db_projects:
            res.append({
                "id": p.id,
                "title": p.title,
                "slug": p.slug,
                "repoName": p.repo_name,
                "type": p.type,
                "status": p.status,
                "description": p.short_description,
                "features": p.features,
                "techStack": p.tech_stack,
                "githubUrl": p.github_url,
                "liveDemoUrl": p.live_demo_url,
                "imageUrl": p.image_url,
                "isFeatured": p.is_featured
            })
        return res
    return default_projects_data()

# Helper to fetch published experiences
def fetch_experiences(db: Session):
    exps = crud.get_all_experiences(db, only_published=True)
    return [
        {
            "id": e.id,
            "company_name": e.company_name,
            "company_logo_url": e.company_logo_url,
            "role_title": e.role_title,
            "employment_type": e.employment_type,
            "start_date": e.start_date,
            "end_date": e.end_date,
            "is_current": e.is_current,
            "location": e.location,
            "company_description": e.company_description,
            "responsibilities": e.responsibilities,
            "tech_stack": e.tech_stack,
            "key_achievements": e.key_achievements,
            "company_url": e.company_url
        }
        for e in exps
    ]

# Helper to fetch grouped DB skills or fallback
def fetch_skills(db: Session):
    grouped = crud.get_grouped_skills(db, only_enabled=True)
    if grouped:
        return grouped
    return default_skills_data()

# Helper to fetch published certifications or fallback
def fetch_certifications(db: Session):
    certs = crud.get_all_certifications(db, only_published=True)
    if certs:
        return [
            {
                "id": c.id,
                "title": c.title,
                "icon": c.icon or "fa-award",
                "description": c.description,
                "issuingOrganization": c.issuing_organization,
                "issueDate": c.issue_date,
                "credentialId": c.credential_id,
                "credentialUrl": c.credential_url,
                "documentUrl": c.document_url
            }
            for c in certs
        ]
    return default_certifications_data()

# Helper to fetch education steps or fallback
def fetch_education(db: Session):
    eds = crud.get_all_education(db)
    if eds:
        res = []
        for e in eds:
            res.append({
                "num": e.stage_num,
                "period": e.period,
                "title": e.title,
                "institution": e.institution,
                "stats": e.stats,
                "grade": e.grade,
                "shortPoints": e.short_points,
                "projectTitle": e.project_title,
                "projectDesc": e.project_desc,
                "tech": e.tech_stack,
                "type": e.type,
                "color": e.color,
                "marksheetId": e.marksheet_id,
                "isActive": e.is_active
            })
        return res
    return default_education_steps()

async def process_contact_submission(db: Session, name: str, email: str, message: str, subject: Optional[str] = None):
    name = (name or "").strip()
    email = (email or "").strip()
    message = (message or "").strip()

    if not name or not email or not message:
        return {"success": False, "error": "Please provide your name, email, and message."}

    if not is_valid_email(email):
        return {"success": False, "error": "Please enter a valid email address."}

    # Save to database
    msg_record = crud.create_contact_message(db, name=name, email=email, subject=subject, message=message)

    # Dispatch email notification
    send_contact_notification(name, email, subject or "Portfolio Contact Submission", message)

    return {
        "success": True,
        "message": f"Thank you {name}! Your transmission has been sent directly to Zeel's inbox."
    }

# HTML Template Page Routes
@router.get("/", response_class=HTMLResponse)
async def home_page(request: Request, db: Session = Depends(get_db)):
    profile = fetch_profile(db)
    sem_data = default_semester_status_data() # Includes dynamic date progress
    projects = fetch_projects(db)
    skills = fetch_skills(db)
    certs = fetch_certifications(db)
    education_steps = fetch_education(db)
    experiences = fetch_experiences(db)

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "profile": profile,
            "sem_data": sem_data,
            "projects": projects,
            "skills": skills,
            "certs": certs,
            "education_steps": education_steps,
            "experiences": experiences,
            "active_tab": "home"
        }
    )

@router.get("/projects", response_class=HTMLResponse)
async def projects_page(request: Request, db: Session = Depends(get_db)):
    profile = fetch_profile(db)
    projects = fetch_projects(db)
    return templates.TemplateResponse(
        request=request,
        name="projects.html",
        context={
            "profile": profile,
            "projects": projects,
            "active_tab": "projects"
        }
    )

@router.get("/contact", response_class=HTMLResponse)
async def contact_page(request: Request, db: Session = Depends(get_db)):
    profile = fetch_profile(db)
    return templates.TemplateResponse(
        request=request,
        name="contact.html",
        context={
            "profile": profile,
            "active_tab": "contact"
        }
    )

@router.post("/contact")
async def handle_contact_form(
    request: Request,
    name: str = Form(None),
    email: str = Form(None),
    message: str = Form(None),
    db: Session = Depends(get_db)
):
    if request.headers.get("content-type") == "application/json":
        try:
            body = await request.json()
            name = body.get("name")
            email = body.get("email")
            message = body.get("message")
        except Exception:
            pass

    result = await process_contact_submission(db, name, email, message)

    if request.headers.get("x-requested-with") == "XMLHttpRequest" or "application/json" in request.headers.get("accept", ""):
        return JSONResponse(content=result)

    profile = fetch_profile(db)
    return templates.TemplateResponse(
        request=request,
        name="contact.html",
        context={
            "profile": profile,
            "result": result,
            "active_tab": "contact"
        }
    )

# REST API JSON Routes
@router.get("/api/profile")
async def api_profile(db: Session = Depends(get_db)):
    return JSONResponse(content=fetch_profile(db))

@router.get("/api/semester-status")
async def api_semester_status():
    return JSONResponse(content=default_semester_status_data())

@router.get("/api/projects")
async def api_projects(db: Session = Depends(get_db)):
    return JSONResponse(content=fetch_projects(db))

@router.get("/api/experiences")
async def api_experiences(db: Session = Depends(get_db)):
    return JSONResponse(content=fetch_experiences(db))

@router.get("/api/skills")
async def api_skills(db: Session = Depends(get_db)):
    return JSONResponse(content=fetch_skills(db))

@router.get("/api/certifications")
async def api_certifications(db: Session = Depends(get_db)):
    return JSONResponse(content=fetch_certifications(db))

@router.post("/api/contact")
async def api_contact(data: ContactFormSchema, db: Session = Depends(get_db)):
    result = await process_contact_submission(db, data.name, data.email, data.message)
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "portfolio-fastapi", "database": "connected"}
