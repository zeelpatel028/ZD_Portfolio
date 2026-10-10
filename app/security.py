import os
import secrets
import hashlib
import string
from datetime import datetime, timedelta
from typing import Optional, Tuple
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, InvalidHashError

ph = PasswordHasher()

def hash_password(password: str) -> str:
    """Hashes a password using Argon2id."""
    return ph.hash(password)

def verify_password(password: str, password_hash: str) -> bool:
    """Verifies a password against an Argon2id hash."""
    try:
        return ph.verify(password_hash, password)
    except (VerifyMismatchError, InvalidHashError):
        return False
    except Exception:
        return False

def generate_otp() -> str:
    """Generates a cryptographically secure 6-digit OTP string."""
    digits = string.digits
    return "".join(secrets.choice(digits) for _ in range(6))

def hash_otp(otp_code: str) -> str:
    """Generates a SHA-256 hash digest of the OTP code."""
    secret_key = os.getenv("SECRET_KEY", "zd_portfolio_super_secret_key_2026")
    salted = f"{otp_code}:{secret_key}"
    return hashlib.sha256(salted.encode("utf-8")).hexdigest()

def verify_otp_hash(otp_code: str, hashed_otp: str) -> bool:
    """Verifies if the provided OTP matches the stored hash digest."""
    return secrets.compare_digest(hash_otp(otp_code), hashed_otp)

def generate_session_token() -> str:
    """Generates a cryptographically secure session token."""
    return secrets.token_urlsafe(32)

def generate_csrf_token() -> str:
    """Generates a CSRF token."""
    return secrets.token_hex(16)

def get_secret_key() -> str:
    """Retrieves or generates the application SECRET_KEY."""
    return os.getenv("SECRET_KEY", "zd_portfolio_super_secret_key_2026")

# --- JWT AUTHENTICATION HELPERS ---
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", os.getenv("SECRET_KEY", "zd_portfolio_jwt_secret_key_2026"))
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "480"))

# pyrefly: ignore [missing-import]
import jwt

def create_jwt_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Generates a signed JWT access token for user authentication and authorization."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def decode_jwt_access_token(token: str) -> Optional[dict]:
    """Decodes and validates a JWT access token, returning the payload if valid."""
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None

def is_rate_limited(
    db_session,
    email: str,
    ip_address: str,
    max_attempts: int = 5,
    window_minutes: int = 15
) -> bool:
    """Checks if login attempts for an email or IP address exceed the rate limit."""
    from app.models import LoginAttempt
    cutoff = datetime.utcnow() - timedelta(minutes=window_minutes)
    
    attempts = db_session.query(LoginAttempt).filter(
        LoginAttempt.attempt_time >= cutoff,
        LoginAttempt.success == False,
        (LoginAttempt.email == email) | (LoginAttempt.ip_address == ip_address)
    ).count()
    
    return attempts >= max_attempts
