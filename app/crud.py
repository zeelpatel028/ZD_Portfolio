import re
import json
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import desc, or_

from app.models import (
    AdminUser, AdminSession, AdminOTP, Profile, Education, Skill,
    Project, Certification, ContactMessage, PortfolioSetting,
    AuditLog, LoginAttempt, Experience
)
from app.security import hash_password, verify_password, hash_otp, verify_otp_hash, generate_session_token

# --- AUDIT LOG HELPERS ---
def create_audit_log(db: Session, action: str, details: Optional[str] = None, admin_id: Optional[int] = None, ip_address: Optional[str] = None):
    log = AuditLog(
        admin_id=admin_id,
        action=action,
        details=details,
        ip_address=ip_address,
        created_at=datetime.utcnow()
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

def get_recent_audit_logs(db: Session, limit: int = 20):
    return db.query(AuditLog).order_by(desc(AuditLog.created_at)).limit(limit).all()

# --- LOGIN ATTEMPTS ---
def record_login_attempt(db: Session, email: str, ip_address: str, success: bool):
    attempt = LoginAttempt(
        email=email,
        ip_address=ip_address,
        success=success,
        attempt_time=datetime.utcnow()
    )
    db.add(attempt)
    db.commit()
    return attempt

def get_recent_login_attempts(db: Session, limit: int = 20):
    return db.query(LoginAttempt).order_by(desc(LoginAttempt.attempt_time)).limit(limit).all()

# --- ADMIN USER MANAGEMENT ---
def get_admin_by_email(db: Session, email: str) -> Optional[AdminUser]:
    return db.query(AdminUser).filter(AdminUser.email == email.strip().lower()).first()

def get_admin_by_id(db: Session, admin_id: int) -> Optional[AdminUser]:
    return db.query(AdminUser).filter(AdminUser.id == admin_id).first()

def create_admin_user(db: Session, email: str, password: str) -> AdminUser:
    admin = AdminUser(
        email=email.strip().lower(),
        password_hash=hash_password(password),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin

def update_admin_password(db: Session, admin_id: int, new_password: str) -> bool:
    admin = get_admin_by_id(db, admin_id)
    if not admin:
        return False
    admin.password_hash = hash_password(new_password)
    admin.updated_at = datetime.utcnow()
    db.commit()
    return True

def update_admin_email(db: Session, admin_id: int, new_email: str) -> bool:
    admin = get_admin_by_id(db, admin_id)
    if not admin:
        return False
    admin.email = new_email.strip().lower()
    admin.updated_at = datetime.utcnow()
    db.commit()
    return True

# --- OTP MANAGEMENT ---
def create_otp(db: Session, admin_id: int, otp_code: str, expiry_seconds: int = 300) -> AdminOTP:
    # Invalidate previous unexpired OTPs for this admin
    db.query(AdminOTP).filter(
        AdminOTP.admin_id == admin_id,
        AdminOTP.is_used == False
    ).update({"is_used": True})
    
    otp_record = AdminOTP(
        admin_id=admin_id,
        otp_hash=hash_otp(otp_code),
        created_at=datetime.utcnow(),
        expires_at=datetime.utcnow() + timedelta(seconds=expiry_seconds),
        attempts=0,
        resend_count=0,
        is_used=False
    )
    db.add(otp_record)
    db.commit()
    db.refresh(otp_record)
    return otp_record

def get_active_otp(db: Session, admin_id: int) -> Optional[AdminOTP]:
    return db.query(AdminOTP).filter(
        AdminOTP.admin_id == admin_id,
        AdminOTP.is_used == False,
        AdminOTP.expires_at > datetime.utcnow()
    ).order_by(desc(AdminOTP.created_at)).first()

def verify_and_consume_otp(db: Session, admin_id: int, otp_code: str) -> Tuple[bool, str]:
    otp_record = get_active_otp(db, admin_id)
    if not otp_record:
        return False, "OTP has expired or is invalid. Please request a new code."

    if otp_record.attempts >= 5:
        otp_record.is_used = True
        db.commit()
        return False, "Too many failed OTP verification attempts. Please request a new code."

    otp_record.attempts += 1
    db.commit()

    if verify_otp_hash(otp_code, otp_record.otp_hash):
        otp_record.is_used = True
        db.commit()
        return True, "OTP verified successfully."
    else:
        return False, "Invalid verification code. Please check and try again."

# --- SESSION MANAGEMENT ---
def create_admin_session(
    db: Session,
    admin_id: int,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None,
    max_age_seconds: int = 28800 # 8 hours
) -> AdminSession:
    token = generate_session_token()
    session = AdminSession(
        session_token=token,
        admin_id=admin_id,
        ip_address=ip_address,
        user_agent=user_agent,
        expires_at=datetime.utcnow() + timedelta(seconds=max_age_seconds),
        created_at=datetime.utcnow()
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def get_admin_session(db: Session, token: str) -> Optional[AdminSession]:
    if not token:
        return None
    session = db.query(AdminSession).filter(
        AdminSession.session_token == token,
        AdminSession.expires_at > datetime.utcnow()
    ).first()
    return session

def revoke_admin_session(db: Session, token: str) -> bool:
    session = db.query(AdminSession).filter(AdminSession.session_token == token).first()
    if session:
        db.delete(session)
        db.commit()
        return True
    return False

def revoke_all_admin_sessions(db: Session, admin_id: int, except_token: Optional[str] = None):
    query = db.query(AdminSession).filter(AdminSession.admin_id == admin_id)
    if except_token:
        query = query.filter(AdminSession.session_token != except_token)
    query.delete(synchronize_session=False)
    db.commit()

def get_active_sessions(db: Session, admin_id: int):
    return db.query(AdminSession).filter(
        AdminSession.admin_id == admin_id,
        AdminSession.expires_at > datetime.utcnow()
    ).order_by(desc(AdminSession.created_at)).all()

# --- PROFILE CRUD ---
def get_profile(db: Session) -> Optional[Profile]:
    return db.query(Profile).first()

def update_profile(db: Session, profile_data: Dict[str, Any]) -> Profile:
    profile = get_profile(db)
    if not profile:
        profile = Profile()
        db.add(profile)
    
    for key, val in profile_data.items():
        if hasattr(profile, key) and val is not None:
            setattr(profile, key, val)
    
    profile.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(profile)
    return profile

# --- EDUCATION CRUD ---
def get_all_education(db: Session) -> List[Education]:
    return db.query(Education).order_by(Education.display_order.asc(), Education.id.asc()).all()

def get_education_by_id(db: Session, ed_id: int) -> Optional[Education]:
    return db.query(Education).filter(Education.id == ed_id).first()

def create_or_update_education(db: Session, ed_data: Dict[str, Any], ed_id: Optional[int] = None) -> Education:
    if ed_id:
        ed = get_education_by_id(db, ed_id)
        if not ed:
            ed = Education()
            db.add(ed)
    else:
        ed = Education()
        db.add(ed)

    # Handle current active semester flag
    if ed_data.get("is_active"):
        db.query(Education).update({"is_active": False})

    for key, val in ed_data.items():
        if key in ("short_points", "tech_stack"):
            setattr(ed, key, val)
        elif hasattr(ed, key) and val is not None:
            setattr(ed, key, val)

    ed.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(ed)
    return ed

def delete_education(db: Session, ed_id: int) -> bool:
    ed = get_education_by_id(db, ed_id)
    if ed:
        db.delete(ed)
        db.commit()
        return True
    return False

# --- SKILLS CRUD ---
def get_all_skills(db: Session, only_enabled: bool = False) -> List[Skill]:
    query = db.query(Skill)
    if only_enabled:
        query = query.filter(Skill.is_enabled == True)
    return query.order_by(Skill.category.asc(), Skill.display_order.asc(), Skill.id.asc()).all()

def get_grouped_skills(db: Session, only_enabled: bool = True) -> List[Dict[str, Any]]:
    skills = get_all_skills(db, only_enabled=only_enabled)
    category_map = {}
    for s in skills:
        if s.category not in category_map:
            category_map[s.category] = {
                "category": s.category,
                "icon": s.category_icon or "fa-solid fa-code",
                "skills": []
            }
        category_map[s.category]["skills"].append({
            "id": s.id,
            "name": s.name,
            "icon": s.icon,
            "proficiency": s.proficiency,
            "is_enabled": s.is_enabled,
            "display_order": s.display_order
        })
    return list(category_map.values())

def get_skill_by_id(db: Session, skill_id: int) -> Optional[Skill]:
    return db.query(Skill).filter(Skill.id == skill_id).first()

def create_or_update_skill(db: Session, skill_data: Dict[str, Any], skill_id: Optional[int] = None) -> Skill:
    if skill_id:
        s = get_skill_by_id(db, skill_id)
        if not s:
            s = Skill()
            db.add(s)
    else:
        s = Skill()
        db.add(s)

    for key, val in skill_data.items():
        if hasattr(s, key) and val is not None:
            setattr(s, key, val)

    s.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(s)
    return s

def delete_skill(db: Session, skill_id: int) -> bool:
    s = get_skill_by_id(db, skill_id)
    if s:
        db.delete(s)
        db.commit()
        return True
    return False

# --- PROJECTS CRUD ---
def generate_slug(title: str) -> str:
    slug = title.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_-]+', '-', slug)
    return slug

def get_all_projects(db: Session, only_published: bool = False) -> List[Project]:
    query = db.query(Project)
    if only_published:
        query = query.filter(Project.is_published == True)
    return query.order_by(Project.display_order.asc(), desc(Project.id)).all()

def get_project_by_id(db: Session, proj_id: int) -> Optional[Project]:
    return db.query(Project).filter(Project.id == proj_id).first()

def get_project_by_slug(db: Session, slug: str) -> Optional[Project]:
    return db.query(Project).filter(Project.slug == slug).first()

def create_or_update_project(db: Session, proj_data: Dict[str, Any], proj_id: Optional[int] = None) -> Project:
    if proj_id:
        p = get_project_by_id(db, proj_id)
        if not p:
            p = Project()
            db.add(p)
    else:
        p = Project()
        db.add(p)

    title = proj_data.get("title", p.title or "Untitled Project")
    base_slug = generate_slug(title)
    if not proj_data.get("slug"):
        proj_data["slug"] = base_slug

    # Ensure slug uniqueness
    existing = db.query(Project).filter(Project.slug == proj_data["slug"], Project.id != (proj_id or 0)).first()
    if existing:
        proj_data["slug"] = f"{base_slug}-{datetime.utcnow().strftime('%S')}"

    for key, val in proj_data.items():
        if key in ("features", "tech_stack"):
            setattr(p, key, val)
        elif hasattr(p, key) and val is not None:
            setattr(p, key, val)

    p.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(p)
    return p

def delete_project(db: Session, proj_id: int) -> bool:
    p = get_project_by_id(db, proj_id)
    if p:
        db.delete(p)
        db.commit()
        return True
    return False

# --- CERTIFICATIONS CRUD ---
def get_all_certifications(db: Session, only_published: bool = False) -> List[Certification]:
    query = db.query(Certification)
    if only_published:
        query = query.filter(Certification.is_published == True)
    return query.order_by(Certification.display_order.asc(), desc(Certification.id)).all()

def get_certification_by_id(db: Session, cert_id: int) -> Optional[Certification]:
    return db.query(Certification).filter(Certification.id == cert_id).first()

def create_or_update_certification(db: Session, cert_data: Dict[str, Any], cert_id: Optional[int] = None) -> Certification:
    if cert_id:
        c = get_certification_by_id(db, cert_id)
        if not c:
            c = Certification()
            db.add(c)
    else:
        c = Certification()
        db.add(c)

    for key, val in cert_data.items():
        if hasattr(c, key) and val is not None:
            setattr(c, key, val)

    c.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(c)
    return c

def delete_certification(db: Session, cert_id: int) -> bool:
    c = get_certification_by_id(db, cert_id)
    if c:
        db.delete(c)
        db.commit()
        return True
    return False

# --- CONTACT MESSAGES CRUD ---
def create_contact_message(db: Session, name: str, email: str, subject: Optional[str], message: str) -> ContactMessage:
    msg = ContactMessage(
        sender_name=name.strip(),
        sender_email=email.strip().lower(),
        subject=(subject or "").strip(),
        message=message.strip(),
        received_at=datetime.utcnow(),
        is_read=False
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

def get_contact_messages(
    db: Session,
    search: Optional[str] = None,
    filter_read: Optional[bool] = None,
    page: int = 1,
    per_page: int = 10
) -> Tuple[List[ContactMessage], int]:
    query = db.query(ContactMessage)
    if filter_read is not None:
        query = query.filter(ContactMessage.is_read == filter_read)
    if search:
        search_pattern = f"%{search.strip()}%"
        query = query.filter(
            or_(
                ContactMessage.sender_name.ilike(search_pattern),
                ContactMessage.sender_email.ilike(search_pattern),
                ContactMessage.subject.ilike(search_pattern)
            )
        )
    total = query.count()
    items = query.order_by(desc(ContactMessage.received_at)).offset((page - 1) * per_page).limit(per_page).all()
    return items, total

def get_message_by_id(db: Session, msg_id: int) -> Optional[ContactMessage]:
    return db.query(ContactMessage).filter(ContactMessage.id == msg_id).first()

def toggle_message_read_status(db: Session, msg_id: int, is_read: Optional[bool] = None) -> Optional[ContactMessage]:
    msg = get_message_by_id(db, msg_id)
    if msg:
        if is_read is not None:
            msg.is_read = is_read
        else:
            msg.is_read = not msg.is_read
        db.commit()
        db.refresh(msg)
    return msg

def delete_contact_message(db: Session, msg_id: int) -> bool:
    msg = get_message_by_id(db, msg_id)
    if msg:
        db.delete(msg)
        db.commit()
        return True
    return False

# --- PORTFOLIO SETTINGS CRUD ---
def get_all_settings(db: Session) -> Dict[str, str]:
    settings = db.query(PortfolioSetting).all()
    return {s.key: s.value for s in settings}

def get_setting(db: Session, key: str, default: Optional[str] = None) -> Optional[str]:
    setting = db.query(PortfolioSetting).filter(PortfolioSetting.key == key).first()
    return setting.value if setting else default

def update_setting(db: Session, key: str, value: str, description: Optional[str] = None):
    setting = db.query(PortfolioSetting).filter(PortfolioSetting.key == key).first()
    if not setting:
        setting = PortfolioSetting(key=key, value=value, description=description)
        db.add(setting)
    else:
        setting.value = value
        if description:
            setting.description = description
    setting.updated_at = datetime.utcnow()
    db.commit()

# --- DASHBOARD STATS ---
def get_dashboard_stats(db: Session) -> Dict[str, int]:
    return {
        "total_projects": db.query(Project).count(),
        "total_skills": db.query(Skill).count(),
        "total_certifications": db.query(Certification).count(),
        "total_education": db.query(Education).count(),
        "total_experiences": db.query(Experience).count(),
        "total_messages": db.query(ContactMessage).count(),
        "unread_messages": db.query(ContactMessage).filter(ContactMessage.is_read == False).count()
    }

# --- EXPERIENCE CRUD ---
def get_all_experiences(db: Session, only_published: bool = True) -> List[Experience]:
    query = db.query(Experience)
    if only_published:
        query = query.filter(Experience.is_published == True)
    return query.order_by(Experience.display_order.asc(), Experience.id.desc()).all()

def get_experience_by_id(db: Session, exp_id: int) -> Optional[Experience]:
    return db.query(Experience).filter(Experience.id == exp_id).first()

def create_or_update_experience(db: Session, data: dict, exp_id: Optional[int] = None) -> Experience:
    if exp_id:
        exp = get_experience_by_id(db, exp_id)
        if not exp:
            exp = Experience(id=exp_id)
            db.add(exp)
    else:
        exp = Experience()
        db.add(exp)

    for k, v in data.items():
        if hasattr(exp, k):
            setattr(exp, k, v)

    exp.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(exp)
    return exp

def delete_experience(db: Session, exp_id: int) -> bool:
    exp = get_experience_by_id(db, exp_id)
    if exp:
        db.delete(exp)
        db.commit()
        return True
    return False
