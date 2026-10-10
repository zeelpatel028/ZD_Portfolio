import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Setup test environment
os.environ["DATABASE_URL"] = "sqlite:///./instance/test_portfolio.db"
os.environ["SECRET_KEY"] = "test_secret_key_12345"

from app.main import app
from app.database import Base, get_db
from app.init_db import init_db
import app.crud as crud
from app.security import hash_password, generate_otp

os.makedirs("./instance", exist_ok=True)
TEST_DATABASE_URL = "sqlite:///./instance/test_portfolio.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module", autouse=True)
def setup_test_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    init_db(db)
    # Ensure standard admin user exists for testing
    admin = crud.get_admin_by_email(db, "admin@test.com")
    if not admin:
        crud.create_admin_user(db, "admin@test.com", "AdminTest@2026!")
    db.close()
    yield
    Base.metadata.drop_all(bind=engine)
    if os.path.exists("./instance/test_portfolio.db"):
        try:
            os.remove("./instance/test_portfolio.db")
        except Exception:
            pass

client = TestClient(app, follow_redirects=False)

def test_public_routes_available():
    res = client.get("/")
    assert res.status_code == 200
    assert "ZEEL DOBARIYA" in res.text

    res_projects = client.get("/projects")
    assert res_projects.status_code == 200

    res_contact = client.get("/contact")
    assert res_contact.status_code == 200

    res_health = client.get("/health")
    assert res_health.status_code == 200
    assert res_health.json()["status"] == "healthy"

def test_unauthenticated_admin_access_redirects():
    res = client.get("/admin/dashboard")
    assert res.status_code in (302, 307)
    assert "/admin/login" in res.headers.get("location")

def test_login_invalid_password():
    res = client.post(
        "/admin/login",
        data={"email": "admin@test.com", "password": "WrongPassword123!"}
    )
    assert res.status_code == 401
    assert "Invalid email or password" in res.text

def test_full_auth_and_otp_flow():
    # 1. Login with valid password
    res_login = client.post(
        "/admin/login",
        data={"email": "admin@test.com", "password": "AdminTest@2026!"}
    )
    assert res_login.status_code == 302
    assert res_login.headers.get("location") == "/admin/verify-otp"
    
    # Extract pending_admin_id cookie
    pending_cookie = res_login.cookies.get("pending_admin_id")
    assert pending_cookie is not None

    # Retrieve OTP generated in DB for testing
    db = TestingSessionLocal()
    admin = crud.get_admin_by_email(db, "admin@test.com")
    otp_record = crud.get_active_otp(db, admin.id)
    db.close()

    # 2. Verify with wrong OTP
    res_wrong_otp = client.post(
        "/admin/verify-otp",
        data={"otp_code": "000000"},
        cookies={"pending_admin_id": pending_cookie}
    )
    assert res_wrong_otp.status_code == 400
    assert "Invalid verification code" in res_wrong_otp.text

    # 3. Verify with correct OTP
    # We test manually consuming OTP via hash or setting OTP
    db = TestingSessionLocal()
    test_otp = "123456"
    crud.create_otp(db, admin.id, test_otp)
    db.close()

    res_correct_otp = client.post(
        "/admin/verify-otp",
        data={"otp_code": test_otp},
        cookies={"pending_admin_id": pending_cookie}
    )
    assert res_correct_otp.status_code == 302
    assert res_correct_otp.headers.get("location") == "/admin/dashboard"

    session_cookie = res_correct_otp.cookies.get("admin_session")
    assert session_cookie is not None

    # 4. Access dashboard with valid session cookie
    res_dash = client.get("/admin/dashboard", cookies={"admin_session": session_cookie})
    assert res_dash.status_code == 200
    assert "System Overview" in res_dash.text

    # 5. Logout
    res_logout = client.get("/admin/logout", cookies={"admin_session": session_cookie})
    assert res_logout.status_code == 302
    assert res_logout.headers.get("location") == "/admin/login"

def test_contact_form_and_message_db_storage():
    res = client.post(
        "/contact",
        data={
            "name": "Jane Tester",
            "email": "jane@example.com",
            "message": "Hello Zeel, this is a test portfolio message!"
        },
        headers={"x-requested-with": "XMLHttpRequest"}
    )
    assert res.status_code == 200
    assert res.json()["success"] == True

    # Verify message is in DB
    db = TestingSessionLocal()
    messages, total = crud.get_contact_messages(db)
    assert total >= 1
    found = any(m.sender_name == "Jane Tester" for m in messages)
    assert found == True
    db.close()

def test_project_crud_and_public_visibility():
    db = TestingSessionLocal()
    admin = crud.get_admin_by_email(db, "admin@test.com")
    session = crud.create_admin_session(db, admin.id)
    session_cookie = session.session_token
    db.close()

    # 1. Create a draft (unpublished) project
    res_create = client.post(
        "/admin/projects",
        data={
            "title": "Secret Internal Project",
            "type": "Backend Engine",
            "short_description": "A draft project not published to public.",
            "is_published": "" # Not checked
        },
        cookies={"admin_session": session_cookie}
    )
    assert res_create.status_code == 303

    # 2. Check public API — draft project should NOT be present
    res_api = client.get("/api/projects")
    assert res_api.status_code == 200
    projects_list = res_api.json()
    assert not any(p["title"] == "Secret Internal Project" for p in projects_list)

    # 3. Publish project via admin
    db = TestingSessionLocal()
    draft_proj = crud.get_project_by_slug(db, "secret-internal-project")
    assert draft_proj is not None
    client.post(f"/admin/projects/{draft_proj.id}/toggle-published", cookies={"admin_session": session_cookie})
    db.close()

    # 4. Check public API again — now published project MUST appear
    res_api_2 = client.get("/api/projects")
    assert res_api_2.status_code == 200
    projects_list_2 = res_api_2.json()
    assert any(p["title"] == "Secret Internal Project" for p in projects_list_2)

def test_experience_crud_and_public_visibility():
    db = TestingSessionLocal()
    admin = crud.get_admin_by_email(db, "admin@test.com")
    session = crud.create_admin_session(db, admin.id)
    session_cookie = session.session_token
    db.close()

    # 1. Create a published experience
    res_create = client.post(
        "/admin/experience",
        data={
            "company_name": "Test Tech Corp",
            "role_title": "Software Developer Intern",
            "employment_type": "Internship",
            "start_date": "Jan 2026",
            "end_date": "Present",
            "location": "Remote",
            "company_description": "Building FastAPI backend systems",
            "responsibilities": "Developed REST APIs\nOptimized SQL queries",
            "tech_stack": "Python, FastAPI, SQLite",
            "is_published": "true"
        },
        cookies={"admin_session": session_cookie}
    )
    assert res_create.status_code == 303

    # 2. Check public API — published experience MUST appear
    res_api = client.get("/api/experiences")
    assert res_api.status_code == 200
    exp_list = res_api.json()
    assert any(e["company_name"] == "Test Tech Corp" for e in exp_list)

    # 3. Check public HTML homepage — company name MUST render in experience section
    res_home = client.get("/")
    assert res_home.status_code == 200
    assert "Test Tech Corp" in res_home.text

def test_jwt_token_authentication_flow():
    # 1. Obtain JWT token via /admin/token
    res = client.post(
        "/admin/token",
        data={"email": "admin@test.com", "password": "AdminTest@2026!"}
    )
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    jwt_token = data["access_token"]
    assert data["token_type"] == "bearer"

    # 2. Access protected admin dashboard using Authorization: Bearer <jwt_token> header
    res_dash = client.get("/admin/dashboard", headers={"Authorization": f"Bearer {jwt_token}"})
    assert res_dash.status_code == 200
    assert "System Overview" in res_dash.text

