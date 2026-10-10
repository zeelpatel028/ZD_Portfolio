import os
import uuid
import re
from typing import Tuple, Optional
from fastapi import UploadFile

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"}
ALLOWED_DOCUMENT_EXTENSIONS = {".pdf"}

MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5 MB
MAX_PDF_SIZE = 10 * 1024 * 1024   # 10 MB

def validate_image_file(file: UploadFile, content: bytes) -> Tuple[bool, str]:
    """Validates image extension, size, and header magic bytes."""
    ext = os.path.splitext(file.filename.lower())[1]
    if ext not in ALLOWED_IMAGE_EXTENSIONS:
        return False, f"Invalid image extension '{ext}'. Allowed: JPG, PNG, WEBP, SVG, GIF."

    if len(content) > MAX_IMAGE_SIZE:
        return False, "Image file size exceeds limit (Max 5MB)."

    # Header check (Magic Bytes)
    if ext in (".jpg", ".jpeg"):
        if not content.startswith(b"\xff\xd8\xff"):
            return False, "Corrupted or invalid JPG image signature."
    elif ext == ".png":
        if not content.startswith(b"\x89PNG\r\n\x1a\n"):
            return False, "Corrupted or invalid PNG image signature."
    elif ext == ".webp":
        if not (content.startswith(b"RIFF") and b"WEBP" in content[:16]):
            return False, "Corrupted or invalid WEBP image signature."
    elif ext == ".pdf":
        return False, "PDF files should be uploaded as documents, not images."

    return True, "Valid image"

def validate_pdf_file(file: UploadFile, content: bytes) -> Tuple[bool, str]:
    """Validates PDF document extension, size, and header signature."""
    ext = os.path.splitext(file.filename.lower())[1]
    if ext != ".pdf":
        return False, "Only PDF document files are allowed for resume uploads."

    if len(content) > MAX_PDF_SIZE:
        return False, "Resume file size exceeds maximum limit of 10MB."

    # Signature check for PDF
    if not content.startswith(b"%PDF-"):
        return False, "Invalid PDF file header signature."

    return True, "Valid PDF"

async def save_upload_file(file: UploadFile, dest_folder: str, is_pdf: bool = False) -> Tuple[bool, str, str]:
    """
    Saves an uploaded file safely to the destination directory.
    Returns (success, message, relative_web_path).
    """
    os.makedirs(dest_folder, exist_ok=True)
    content = await file.read()
    
    if is_pdf:
        valid, err_msg = validate_pdf_file(file, content)
    else:
        valid, err_msg = validate_image_file(file, content)

    if not valid:
        return False, err_msg, ""

    ext = os.path.splitext(file.filename.lower())[1]
    clean_name = re.sub(r'[^\w\-]', '_', os.path.splitext(file.filename)[0])[:30]
    safe_filename = f"{clean_name}_{uuid.uuid4().hex[:8]}{ext}"
    
    file_path = os.path.join(dest_folder, safe_filename)
    
    # Write content securely
    with open(file_path, "wb") as f:
        f.write(content)

    # Normalize forward slashes for static URLs
    rel_path = file_path.replace("\\", "/").replace("app/", "/")
    if not rel_path.startswith("/"):
        rel_path = "/" + rel_path

    return True, "File uploaded successfully.", rel_path
