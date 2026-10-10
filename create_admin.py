import os
import sys
import getpass
from app.database import SessionLocal, Base, engine
import app.crud as crud
from app.models import AdminUser

def main():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    print("==================================================")
    print("🔒 ZD Portfolio Admin Account Initializer & CLI Setup")
    print("==================================================")

    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")

    if not email:
        email = input("Enter Admin Email Address: ").strip()

    if not password:
        password = getpass.getpass("Enter Admin Master Password: ")
        confirm_pass = getpass.getpass("Confirm Admin Master Password: ")
        if password != confirm_pass:
            print("❌ Passwords do not match. Aborting.")
            sys.exit(1)

    if len(password) < 8:
        print("❌ Password must be at least 8 characters long.")
        sys.exit(1)

    clean_email = email.strip().lower()
    existing_admin = crud.get_admin_by_email(db, clean_email)

    if existing_admin:
        print(f"ℹ️ Administrator {clean_email} already exists. Updating password...")
        crud.update_admin_password(db, existing_admin.id, password)
        print("✅ Password updated successfully.")
    else:
        crud.create_admin_user(db, clean_email, password)
        print(f"✅ Administrator account created for: {clean_email}")

    db.close()

if __name__ == "__main__":
    main()
