import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any, Optional

def send_email(to_email: str, subject: str, html_content: str, text_content: Optional[str] = None) -> Dict[str, Any]:
    """
    Sends an email using configured SMTP settings (Gmail or standard SMTP).
    Returns {"success": True/False, "error": str|None}.
    """
    email_user = os.getenv("EMAIL_USER", "").strip()
    raw_pass = os.getenv("EMAIL_PASS", "").strip()
    email_pass = raw_pass.replace(" ", "")
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com").strip()
    smtp_port = int(os.getenv("SMTP_PORT", "465"))

    if not email_user or not email_pass or email_pass == "your_gmail_app_password_here":
        return {
            "success": False,
            "error": "SMTP server email credentials are not configured in environment."
        }

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f'"Zeel Dobariya Portfolio Admin" <{email_user}>'
        msg["To"] = to_email

        if text_content:
            msg.attach(MIMEText(text_content, "plain"))
        msg.attach(MIMEText(html_content, "html"))

        if smtp_port == 465:
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10) as server:
                server.login(email_user, email_pass)
                server.sendmail(email_user, to_email, msg.as_string())
        else:
            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.starttls()
                server.login(email_user, email_pass)
                server.sendmail(email_user, to_email, msg.as_string())

        return {"success": True, "error": None}
    except Exception as e:
        print(f"❌ SMTP Error sending email to {to_email}: {str(e)}")
        return {"success": False, "error": str(e)}

def send_otp_email(admin_email: str, otp_code: str) -> Dict[str, Any]:
    """Sends the 6-digit OTP verification code to the administrator's registered email."""
    subject = "🔑 Admin Login Verification Code - ZD Portfolio"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; background-color: #1e1e1e; color: #e1e1e1; padding: 24px; border-radius: 8px; max-width: 500px; margin: 0 auto; border: 1px solid #3e3e42;">
        <h2 style="color: #FFDBBB; margin-top: 0;">Verification Code Required</h2>
        <p style="color: #CCBEB1; font-size: 0.95rem;">You are logging in to the <strong>Zeel Dobariya Portfolio Admin Panel</strong>.</p>
        
        <div style="background-color: #252526; border: 1px solid #997E67; border-radius: 6px; padding: 18px; text-align: center; margin: 20px 0;">
            <span style="font-size: 2.2rem; font-weight: bold; letter-spacing: 8px; color: #FFDBBB; font-family: monospace;">{otp_code}</span>
        </div>

        <p style="font-size: 0.88rem; color: #997E67;">
            ⏱️ This OTP is single-use and will expire in <strong>5 minutes</strong>.<br>
            If you did not request this login attempt, please secure your account immediately.
        </p>
        <hr style="border: none; border-top: 1px solid #3e3e42; margin-top: 20px;">
        <p style="font-size: 0.75rem; color: #777; text-align: center; margin-bottom: 0;">
            ZD Portfolio Admin Security System • Automated Transmission
        </p>
    </div>
    """
    text_body = f"Your ZD Portfolio Admin Verification Code is: {otp_code}. Valid for 5 minutes."
    return send_email(admin_email, subject, html_body, text_body)

def send_contact_notification(sender_name: str, sender_email: str, subject: str, message: str) -> Dict[str, Any]:
    """Sends a notification email when a new message is submitted on the portfolio contact form."""
    recipient_email = os.getenv("RECIPIENT_EMAIL", "zeelptl028@gmail.com")
    email_subject = f"📩 New Portfolio Message from {sender_name} ({sender_email})"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7ede5; color: #332115; border-radius: 8px;">
      <h2 style="color: #664930; border-bottom: 2px solid #997E67; padding-bottom: 8px;">📩 New Direct Portfolio Transmission</h2>
      <p><strong>Sender Name:</strong> {sender_name}</p>
      <p><strong>Sender Email:</strong> <a href="mailto:{sender_email}">{sender_email}</a></p>
      <p><strong>Subject:</strong> {subject or 'N/A'}</p>
      <div style="margin-top: 15px; padding: 15px; background: #ffffff; border-left: 4px solid #664930; border-radius: 4px;">
        <p style="margin: 0; white-space: pre-wrap;">{message}</p>
      </div>
    </div>
    """
    return send_email(recipient_email, email_subject, html_body)

def send_security_alert(admin_email: str, subject: str, details: str) -> Dict[str, Any]:
    """Sends a security alert notification to the administrator."""
    html_body = f"""
    <div style="font-family: Arial, sans-serif; background-color: #1e1e1e; color: #ffffff; padding: 20px; border-radius: 8px;">
        <h3 style="color: #FFDBBB;">⚠️ Security Alert - ZD Portfolio Admin</h3>
        <p style="color: #CCBEB1;">{details}</p>
    </div>
    """
    return send_email(admin_email, subject, html_body)
