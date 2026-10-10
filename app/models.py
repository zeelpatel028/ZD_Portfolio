from datetime import datetime
import json
from sqlalchemy import (
    Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Index
)
from sqlalchemy.orm import relationship
from app.database import Base

class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    sessions = relationship("AdminSession", back_populates="user", cascade="all, delete-orphan")
    otps = relationship("AdminOTP", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user")

class AdminSession(Base):
    __tablename__ = "admin_sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_token = Column(String(255), unique=True, index=True, nullable=False)
    admin_id = Column(Integer, ForeignKey("admin_users.id", ondelete="CASCADE"), nullable=False)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(500), nullable=True)
    expires_at = Column(DateTime, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("AdminUser", back_populates="sessions")

class AdminOTP(Base):
    __tablename__ = "admin_otps"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("admin_users.id", ondelete="CASCADE"), nullable=False)
    otp_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    expires_at = Column(DateTime, nullable=False, index=True)
    attempts = Column(Integer, default=0, nullable=False)
    resend_count = Column(Integer, default=0, nullable=False)
    is_used = Column(Boolean, default=False, nullable=False)

    user = relationship("AdminUser", back_populates="otps")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    location = Column(String(150), nullable=True)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    github = Column(String(255), nullable=True)
    linkedin = Column(String(255), nullable=True)
    other_urls = Column(Text, nullable=True)  # Stored as JSON string
    summary = Column(Text, nullable=False)
    about_text = Column(Text, nullable=True)
    university = Column(String(200), nullable=True)
    degree = Column(String(200), nullable=True)
    resume_url = Column(String(255), nullable=True)
    logo_url = Column(String(255), nullable=True)
    photo_url = Column(String(255), nullable=True)
    avatar_url = Column(String(255), nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    stage_num = Column(String(10), nullable=False)  # e.g., "01", "02"
    period = Column(String(50), nullable=False)     # e.g., "2021 – 2022"
    title = Column(String(200), nullable=False)
    institution = Column(String(200), nullable=False)
    stats = Column(String(100), nullable=False)
    grade = Column(String(100), nullable=False)
    short_points_json = Column(Text, nullable=False, default="[]") # List of strings as JSON
    project_title = Column(String(200), nullable=True)
    project_desc = Column(Text, nullable=True)
    tech_stack_json = Column(Text, nullable=True, default="[]")    # List of strings as JSON
    type = Column(String(50), nullable=False)
    color = Column(String(30), nullable=False, default="#3b82f6")
    marksheet_id = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=False, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    @property
    def short_points(self):
        try:
            return json.loads(self.short_points_json or "[]")
        except Exception:
            return []

    @short_points.setter
    def short_points(self, val):
        self.short_points_json = json.dumps(val or [])

    @property
    def tech_stack(self):
        try:
            return json.loads(self.tech_stack_json or "[]")
        except Exception:
            return []

    @tech_stack.setter
    def tech_stack(self, val):
        self.tech_stack_json = json.dumps(val or [])

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False, index=True)
    category_icon = Column(String(100), nullable=True, default="fa-solid fa-code")
    name = Column(String(100), nullable=False)
    icon = Column(String(100), nullable=False)
    proficiency = Column(Integer, default=85, nullable=False) # 1-100
    display_order = Column(Integer, default=0, nullable=False)
    is_enabled = Column(Boolean, default=True, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    repo_name = Column(String(100), nullable=True)
    type = Column(String(100), nullable=False)
    status = Column(String(50), default="Completed", nullable=False)
    short_description = Column(Text, nullable=False)
    full_description = Column(Text, nullable=True)
    features_json = Column(Text, nullable=False, default="[]")    # JSON list of features
    tech_stack_json = Column(Text, nullable=False, default="[]")  # JSON list of tech strings
    image_url = Column(String(255), nullable=True)
    github_url = Column(String(255), nullable=True)
    live_demo_url = Column(String(255), nullable=True)
    start_date = Column(String(50), nullable=True)
    is_featured = Column(Boolean, default=False, nullable=False)
    is_published = Column(Boolean, default=True, nullable=False, index=True)
    display_order = Column(Integer, default=0, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    @property
    def features(self):
        try:
            return json.loads(self.features_json or "[]")
        except Exception:
            return []

    @features.setter
    def features(self, val):
        self.features_json = json.dumps(val or [])

    @property
    def tech_stack(self):
        try:
            return json.loads(self.tech_stack_json or "[]")
        except Exception:
            return []

    @tech_stack.setter
    def tech_stack(self, val):
        self.tech_stack_json = json.dumps(val or [])

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    issuing_organization = Column(String(200), nullable=True)
    issue_date = Column(String(50), nullable=True)
    expiration_date = Column(String(50), nullable=True)
    credential_id = Column(String(100), nullable=True)
    credential_url = Column(String(255), nullable=True)
    icon = Column(String(100), default="fa-award", nullable=False)
    description = Column(Text, nullable=False)
    document_url = Column(String(255), nullable=True)
    display_order = Column(Integer, default=0, nullable=False)
    is_published = Column(Boolean, default=True, nullable=False, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    sender_name = Column(String(100), nullable=False)
    sender_email = Column(String(255), nullable=False, index=True)
    subject = Column(String(200), nullable=True)
    message = Column(Text, nullable=False)
    received_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    is_read = Column(Boolean, default=False, nullable=False, index=True)

class PortfolioSetting(Base):
    __tablename__ = "portfolio_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, index=True, nullable=False)
    value = Column(Text, nullable=True)
    description = Column(String(255), nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("admin_users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(100), nullable=False, index=True)
    details = Column(Text, nullable=True)
    ip_address = Column(String(45), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)

    user = relationship("AdminUser", back_populates="audit_logs")

class LoginAttempt(Base):
    __tablename__ = "login_attempts"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, index=True)
    ip_address = Column(String(45), nullable=False, index=True)
    success = Column(Boolean, nullable=False)
    attempt_time = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(200), nullable=False)
    company_logo_url = Column(String(255), nullable=True)
    role_title = Column(String(200), nullable=False)
    employment_type = Column(String(100), nullable=True, default="Full-time")
    start_date = Column(String(50), nullable=False)
    end_date = Column(String(50), nullable=True, default="Present")
    is_current = Column(Boolean, default=False, nullable=False)
    location = Column(String(150), nullable=True)
    company_description = Column(Text, nullable=True)
    responsibilities_json = Column(Text, nullable=True, default="[]")
    tech_stack_json = Column(Text, nullable=True, default="[]")
    key_achievements_json = Column(Text, nullable=True, default="[]")
    company_url = Column(String(255), nullable=True)
    is_published = Column(Boolean, default=True, nullable=False, index=True)
    display_order = Column(Integer, default=0, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    @property
    def responsibilities(self):
        try:
            return json.loads(self.responsibilities_json or "[]")
        except Exception:
            return []

    @responsibilities.setter
    def responsibilities(self, val):
        if isinstance(val, str):
            val = [x.strip() for x in val.split("\n") if x.strip()]
        self.responsibilities_json = json.dumps(val or [])

    @property
    def tech_stack(self):
        try:
            return json.loads(self.tech_stack_json or "[]")
        except Exception:
            return []

    @tech_stack.setter
    def tech_stack(self, val):
        if isinstance(val, str):
            val = [x.strip() for x in val.split(",") if x.strip()]
        self.tech_stack_json = json.dumps(val or [])

    @property
    def key_achievements(self):
        try:
            return json.loads(self.key_achievements_json or "[]")
        except Exception:
            return []

    @key_achievements.setter
    def key_achievements(self, val):
        if isinstance(val, str):
            val = [x.strip() for x in val.split("\n") if x.strip()]
        self.key_achievements_json = json.dumps(val or [])
