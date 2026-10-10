# ⚡ Zeel Dobariya Portfolio & Admin Control Center (FastAPI + SQLite + HTML5 / CSS3 / Vanilla JS)

<p align="center">
  <img src="app/static/images/ZD.png" width="140" alt="ZD Portfolio Logo" />
</p>

<h1 align="center">⚡ ZD Portfolio | Zeel Dobariya ⚡</h1>

<p align="center">
  <b>A Lightweight, Fast, Responsive Personal Portfolio & Admin Control Center built with Python FastAPI, Jinja2 Templates, SQLAlchemy, SQLite, HTML5, Vanilla CSS3, and JavaScript</b>
</p>

---

## 🌟 Overview

This project is a high-performance personal portfolio website and comprehensive administrative control panel for **Zeel Dobariya** (Computer Science Engineering Student, Machine Learning Engineer, Data Scientist, and Backend Developer).

### 🛠️ Architecture
- **Backend**: Python FastAPI, SQLAlchemy ORM, Uvicorn ASGI Server, Jinja2 Templates.
- **Database**: SQLite (`instance/portfolio.db`) with automatic table creation & initial data seeding. Configurable for PostgreSQL via `DATABASE_URL`.
- **Public Frontend**: HTML5, Vanilla CSS3, Vanilla JavaScript, Web Audio API sound synthesis.
- **Admin Panel**: Visual Studio Code-inspired dark/light developer dashboard with 2-Factor Email OTP authentication, Argon2id password hashing, audit logs, and complete CRUD management for all portfolio content.

---

## ✨ Key Admin Panel & Security Features

- 🖥️ **VS Code-Inspired Minimalist Admin Interface**: Designed with dark charcoal sidebar, neutral editor background, status bar telemetry, clean data tables, search filters, and confirmation modals. Zero heavy particle animations or sound effects in the admin dashboard.
- 🔐 **Argon2id Password Hashing & 2-Factor Email OTP**:
  - Validates credentials using Argon2id password hashing.
  - Generates cryptographically secure 6-digit OTP using Python's `secrets` module.
  - Dispatches OTP via SMTP TLS/SSL email.
  - Enforces 5-minute single-use OTP expiration, rate limiting, and resend cooldowns.
  - Stores keyed SHA-256 OTP digests (never plaintext).
- 🍪 **Server-Side Session Security**:
  - `AdminSession` DB records with random session tokens.
  - `HttpOnly` and `SameSite=Lax` cookies.
  - Automatic session expiration and one-click remote session revocation.
- 📊 **Real Database Dashboard Telemetry**:
  - Live counts for Projects, Skills, Certifications, Education Stages, Contact Messages, Unread Submissions.
  - Real-time Administrator Audit Log tracking all content modifications.
- 📝 **Complete Content CRUD Management**:
  - **Profile (`/admin/profile`)**: Edit bio, title, contact links; preview and upload profile photos, avatar, logo, and resume PDF.
  - **Education (`/admin/education`)**: Manage timeline stages (SSC, 12th, Sem 1–8), SPI stats, projects, and active current semester marker.
  - **Skills (`/admin/skills`)**: Manage skills, categories, proficiency percentages, devicon/fontawesome icons, display order, and enabled toggles.
  - **Projects (`/admin/projects`)**: Complete CRUD, slug generation, tech stack, key features list, thumbnail uploads, repo links, demo links, featured toggle, and draft/published toggles.
  - **Certifications (`/admin/certifications`)**: Manage certifications, hackathon awards, issuing orgs, credential links, document uploads, and publication toggles.
  - **Resume (`/admin/resume`)**: View published PDF, upload replacement resume with magic-byte signature validation (<=10MB), toggle public download availability.
  - **Contact Messages (`/admin/messages`)**: Inbox table, search by sender/email, filter read/unread status, message detail viewer, delete confirmations.
  - **Portfolio Settings (`/admin/settings`)**: Edit site title, description, contact email, social profile links, footer text, active semester, and feature availability.
  - **Admin Security (`/admin/security`)**: Change master password, update admin email, view active sessions, revoke sessions, inspect failed login attempts, and full audit logs.

---

## 📁 Repository Structure

```
ZD/
├── app/
│   ├── __init__.py
│   ├── main.py                  # FastAPI Entry, Lifespan DB Init & Router Mounts
│   ├── database.py              # SQLAlchemy Engine, SessionLocal & Base
│   ├── models.py                # 12 SQLAlchemy ORM Models
│   ├── crud.py                  # Database CRUD Operations & Queries
│   ├── init_db.py               # Auto Table Creation & Seed Initialization
│   ├── security.py              # Argon2id Hashing, OTP & Session Security
│   ├── email_service.py         # SMTP Email Dispatcher (OTP & Contact Alerts)
│   ├── dependencies.py         # FastAPI Auth & CSRF Dependencies
│   ├── file_utils.py            # Upload File Signature & Size Validation
│   ├── data.py                  # Initial Seed Fallback Data
│   ├── routes/
│   │   ├── portfolio.py         # Public Pages & REST API Routes
│   │   ├── admin_auth.py        # /admin/login, /admin/verify-otp, /admin/logout
│   │   ├── admin_dashboard.py   # /admin/dashboard
│   │   ├── admin_profile.py     # /admin/profile
│   │   ├── admin_education.py   # /admin/education
│   │   ├── admin_skills.py      # /admin/skills
│   │   ├── admin_projects.py    # /admin/projects
│   │   ├── admin_certifications.py # /admin/certifications
│   │   ├── admin_resume.py      # /admin/resume
│   │   ├── admin_messages.py    # /admin/messages
│   │   ├── admin_settings.py    # /admin/settings
│   │   └── admin_security.py    # /admin/security
│   ├── templates/
│   │   ├── base.html            # Public Base Template
│   │   ├── index.html           # Public Home Template
│   │   ├── projects.html        # Public Projects Page
│   │   ├── contact.html         # Public Contact Form
│   │   └── admin/               # 13 VS Code-Inspired Admin Templates
│   └── static/
│       ├── css/
│       │   ├── style.css        # Public Sci-Fi Gaming HUD CSS
│       │   └── admin.css        # VS Code Admin Panel CSS
│       ├── js/
│       │   ├── audioFx.js       # Procedural Web Audio API Engine
│       │   ├── script.js        # Public Interactive Controller
│       │   └── admin.js         # Admin Previews & Confirm Dialogs
│       ├── images/              # Uploaded Photos, Avatars, Logos
│       └── files/               # Published Resumes & Documents
│
├── instance/
│   └── portfolio.db             # Persistent SQLite Database
├── tests/
│   └── test_admin.py            # Pytest Suite (Auth, OTP, Sessions, CRUD, Public API)
├── create_admin.py              # CLI Admin Setup & Password Reset Tool
├── run.py                       # Server Startup Entry Point
├── requirements.txt             # Python Dependencies
├── .env.example                 # Environment Configuration Template
├── .gitignore                   # Git Exclusion Rules
└── README.md                    # Project Documentation
```

---

## 💻 Local Installation & Setup Instructions

### 1. Prerequisites
- **Python 3.10+** (Python 3.12 recommended)
- **pip** package manager

### 2. Setup Virtual Environment & Install Dependencies

```bash
# Navigate to project root
cd ZD

# Create & activate virtual environment
python -m venv .venv

# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure environment variables in `.env`:

```env
PORT=5000
HOST=0.0.0.0
DATABASE_URL=sqlite:///./instance/portfolio.db
SECRET_KEY=zd_portfolio_super_secret_key_2026
ADMIN_EMAIL=zeelptl028@gmail.com
ADMIN_PASSWORD=Admin@Zeel2026!

# SMTP Configuration for 2FA OTP & Contact Form Delivery
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_USER=zeelptl028@gmail.com
EMAIL_PASS=your_gmail_app_password_here
RECIPIENT_EMAIL=zeelptl028@gmail.com
```

### 4. Initialize Database & Admin User

Run the CLI administrator setup script:

```bash
python create_admin.py
```

Or start the server (the database tables and default data will automatically seed on startup):

```bash
python run.py
```

---

## 🚀 Running & Accessing the Application

Start the FastAPI server:

```bash
python run.py
```

- **Public Portfolio**: [http://localhost:5000](http://localhost:5000)
- **Admin Panel Login**: [http://localhost:5000/admin/login](http://localhost:5000/admin/login)

---

## 🧪 Running Automated Tests

Run the Pytest test suite:

```bash
pytest
```

Output:
```
tests/test_admin.py ...... [100%]
6 passed
```

---

## ☁️ Deployment Instructions (Render)

1. Create a **New Web Service** on [Render](https://render.com).
2. Connect your GitHub repository (`zeelpatel028/ZD_Portfolio`).
3. Set Environment to **Python 3**.
4. Configure build & start commands:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Set Environment Variables in Render Dashboard:
   - `DATABASE_URL`: `sqlite:///./instance/portfolio.db` (or attach persistent disk / PostgreSQL database)
   - `SECRET_KEY`: strong random secret key string
   - `ADMIN_EMAIL`: administrator email
   - `ADMIN_PASSWORD`: administrator password
   - `EMAIL_USER`: SMTP email
   - `EMAIL_PASS`: Gmail App Password
6. Deploy! Render will monitor `/health`.

---

## 👤 Author & Contact

**Zeel Dobariya**
- 🐙 GitHub: [@zeelpatel028](https://github.com/zeelpatel028)
- 💼 LinkedIn: [zeel-dobariya](https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/)
- 📧 Email: [zeelptl028@gmail.com](mailto:zeelptl028@gmail.com)

---
<p align="center">
  <sub>Built with ❤️ by Zeel Dobariya • Powered by Python FastAPI, Jinja2, & SQLAlchemy • © 2026 All Rights Reserved</sub>
</p>
