import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

from app.init_db import init_db
from app.routes.portfolio import router as portfolio_router
from app.routes.admin_auth import router as admin_auth_router
from app.routes.admin_dashboard import router as admin_dashboard_router
from app.routes.admin_profile import router as admin_profile_router
from app.routes.admin_education import router as admin_education_router
from app.routes.admin_skills import router as admin_skills_router
from app.routes.admin_projects import router as admin_projects_router
from app.routes.admin_certifications import router as admin_certifications_router
from app.routes.admin_resume import router as admin_resume_router
from app.routes.admin_messages import router as admin_messages_router
from app.routes.admin_settings import router as admin_settings_router
from app.routes.admin_security import router as admin_security_router
from app.routes.admin_experience import router as admin_experience_router

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables and seed default portfolio data on startup
    try:
        init_db()
        print("✅ Database initialized successfully.")
    except Exception as e:
        print(f"❌ Database Initialization Error: {e}")
    yield

app = FastAPI(
    title="Zeel Dobariya Portfolio & Admin System",
    description="Full-Stack Developer & Machine Learning Engineer Portfolio with Admin Panel built with FastAPI, Jinja2, HTML5, CSS3, Vanilla JS & SQLAlchemy",
    version="1.0.0",
    lifespan=lifespan
)

# Mount static files directory
app.mount("/static", StaticFiles(directory="app/static"), name="static")
if os.path.exists("public"):
    app.mount("/public", StaticFiles(directory="public"), name="public")
else:
    app.mount("/public", StaticFiles(directory="app/static"), name="public_fallback")

# Include Admin Routers
app.include_router(admin_auth_router)
app.include_router(admin_dashboard_router)
app.include_router(admin_profile_router)
app.include_router(admin_education_router)
app.include_router(admin_skills_router)
app.include_router(admin_projects_router)
app.include_router(admin_certifications_router)
app.include_router(admin_resume_router)
app.include_router(admin_messages_router)
app.include_router(admin_settings_router)
app.include_router(admin_security_router)
app.include_router(admin_experience_router)

# Include Public Portfolio Router
app.include_router(portfolio_router)

# Custom Error Handlers
templates = Jinja2Templates(directory="app/templates")

@app.exception_handler(404)
async def custom_404_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Not Found", "message": "The requested resource could not be found."}
    )

@app.exception_handler(500)
async def custom_500_handler(request: Request, exc):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error", "message": "An unexpected error occurred."}
    )
