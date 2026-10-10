import os
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
import app.models as models
import app.crud as crud
from app.data import (
    get_profile_data,
    get_education_steps,
    get_skills_data,
    get_projects_data,
    get_certifications_data
)

def init_db(db: Session = None):
    """Creates database tables and seeds initial portfolio data if empty."""
    Base.metadata.create_all(bind=engine)
    
    close_db = False
    if db is None:
        db = SessionLocal()
        close_db = True

    try:
        # 1. Seed Initial Admin User if none exists
        admin = db.query(models.AdminUser).first()
        if not admin:
            admin_email = os.getenv("ADMIN_EMAIL", "zeelptl028@gmail.com").strip().lower()
            admin_pass = os.getenv("ADMIN_PASSWORD", "Admin@Zeel2026!")
            crud.create_admin_user(db, admin_email, admin_pass)
            print(f"[OK] Created Initial Admin User: {admin_email}")

        # 2. Seed Profile if empty
        profile = db.query(models.Profile).first()
        if not profile:
            raw_p = get_profile_data()
            p_data = {
                "name": raw_p.get("name", "Zeel Dobariya"),
                "title": raw_p.get("title", "Aspiring ML Engineer | Data Scientist | Backend Python Developer"),
                "location": raw_p.get("location", "Ahmedabad, Gujarat, India"),
                "email": raw_p.get("email", "zeelptl028@gmail.com"),
                "github": raw_p.get("github", "https://github.com/zeelpatel028"),
                "linkedin": raw_p.get("linkedin", "https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/"),
                "summary": raw_p.get("summary", ""),
                "university": raw_p.get("university", "LJ University, Ahmedabad"),
                "degree": raw_p.get("degree", "B.Tech in Computer Science Engineering (2024–2028)"),
                "resume_url": raw_p.get("resume_url", "/static/files/Zeel_Dobariya_python.pdf"),
                "logo_url": raw_p.get("logo_url", "/static/images/ZD.png"),
                "photo_url": raw_p.get("photo_url", "/static/images/ZD_Photo.png"),
                "avatar_url": raw_p.get("avatar_url", "/static/images/ZD_Chereter.png")
            }
            crud.update_profile(db, p_data)
            print("[OK] Seeded Profile Data")

        # 3. Seed Education if empty
        if db.query(models.Education).count() == 0:
            edu_list = get_education_steps()
            for idx, ed in enumerate(edu_list):
                ed_obj = models.Education(
                    stage_num=ed.get("num", f"0{idx+1}"),
                    period=ed.get("period", ""),
                    title=ed.get("title", ""),
                    institution=ed.get("institution", ""),
                    stats=ed.get("stats", ""),
                    grade=ed.get("grade", ""),
                    short_points=ed.get("shortPoints", []),
                    project_title=ed.get("projectTitle"),
                    project_desc=ed.get("projectDesc"),
                    tech_stack=ed.get("tech", []),
                    type=ed.get("type", "Sem"),
                    color=ed.get("color", "#3b82f6"),
                    marksheet_id=ed.get("marksheetId"),
                    is_active=ed.get("isActive", False),
                    display_order=idx + 1
                )
                db.add(ed_obj)
            db.commit()
            print("[OK] Seeded Education Data")

        # 4. Seed Skills if empty
        if db.query(models.Skill).count() == 0:
            skills_grouped = get_skills_data()
            order = 1
            for cat in skills_grouped:
                cat_name = cat.get("category", "General")
                cat_icon = cat.get("icon", "fa-solid fa-code")
                for s in cat.get("skills", []):
                    skill_obj = models.Skill(
                        category=cat_name,
                        category_icon=cat_icon,
                        name=s.get("name"),
                        icon=s.get("icon"),
                        proficiency=85,
                        display_order=order,
                        is_enabled=True
                    )
                    db.add(skill_obj)
                    order += 1
            db.commit()
            print("[OK] Seeded Skills Data")

        # 5. Seed Projects if empty
        if db.query(models.Project).count() == 0:
            projects_list = get_projects_data()
            for idx, p in enumerate(projects_list):
                proj_obj = models.Project(
                    title=p.get("title"),
                    slug=crud.generate_slug(p.get("title")),
                    repo_name=p.get("repoName"),
                    type=p.get("type"),
                    status=p.get("status", "Completed"),
                    short_description=p.get("description", ""),
                    full_description=p.get("description", ""),
                    features=p.get("features", []),
                    tech_stack=p.get("techStack", []),
                    github_url=p.get("githubUrl"),
                    live_demo_url=p.get("liveDemoUrl"),
                    is_featured=(idx < 3),
                    is_published=True,
                    display_order=idx + 1
                )
                db.add(proj_obj)
            db.commit()
            print("[OK] Seeded Projects Data")

        # 6. Seed Certifications if empty
        if db.query(models.Certification).count() == 0:
            certs_list = get_certifications_data()
            for idx, c in enumerate(certs_list):
                cert_obj = models.Certification(
                    title=c.get("title"),
                    icon=c.get("icon", "fa-award"),
                    description=c.get("description", ""),
                    display_order=idx + 1,
                    is_published=True
                )
                db.add(cert_obj)
            db.commit()
            print("[OK] Seeded Certifications Data")

        # 7. Seed Settings if empty
        if db.query(models.PortfolioSetting).count() == 0:
            default_settings = {
                "site_title": "Zeel Dobariya | Full-Stack Developer & Machine Learning Engineer Portfolio",
                "site_description": "Portfolio of Zeel Dobariya — Computer Science Engineering student at LJ University, Machine Learning Engineer, Data Scientist, and Backend Developer based in Ahmedabad, Gujarat, India.",
                "contact_email": "zeelptl028@gmail.com",
                "github_url": "https://github.com/zeelpatel028",
                "linkedin_url": "https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/",
                "footer_text": "© 2026 ZEEL DOBARIYA. SYSTEM POWERED BY FASTAPI & JINJA2.",
                "current_semester": "4",
                "contact_form_enabled": "true",
                "resume_download_enabled": "true",
                "maintenance_mode": "false"
            }
            for k, v in default_settings.items():
                crud.update_setting(db, k, v)
            print("[OK] Seeded Portfolio Settings Data")

    finally:
        if close_db:
            db.close()

if __name__ == "__main__":
    init_db()
