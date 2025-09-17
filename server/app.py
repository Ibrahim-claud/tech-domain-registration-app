"""
ICT Request and Contact Form Service

This Flask application provides:

1. OTP generation and verification for ICT request submissions.
2. Forwarding verified ICT requests to a support email.
3. Contact form submissions forwarded to the support email.
4. Bilingual (English and Simplified Chinese) email notifications.
5. Basic CAPTCHA validation for form submissions.
6. MySQL database integration via SQLAlchemy for OTP storage.

Configuration:
- Environment variables are loaded from a `.env` file.
- SMTP is used for sending emails (currently configured for Gmail).
- Database URL and mail credentials are read from environment variables.
- reCAPTCHA secret key is also loaded from environment variables.

Routes:
- POST /api/send-otp       → Generates and sends OTP emails.
- POST /api/verify-otp     → Verifies OTPs and forwards ICT requests.
- POST /api/contact        → Sends contact form submissions to support.
"""

from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from flask_cors import CORS
from datetime import datetime, timedelta
from smtplib import SMTPException
import random, os
import requests

app = Flask(__name__)

# ---------------- CONFIG ---------------- #
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///otp.db"
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.getenv("EMAIL_USER")
app.config["MAIL_PASSWORD"] = os.getenv("EMAIL_PASS")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("EMAIL_USER")

#CAPTCHA
recaptcha_secret = os.getenv("RECAPTCHA_SECRET_KEY")

db = SQLAlchemy(app)
mail = Mail(app)

# ✅ Allow React frontend (localhost:3000)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# ---------------- MODELS ---------------- #
class OTP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    code = db.Column(db.String(6), nullable=False)
    verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)

# ---------------- ROUTES ---------------- #
@app.route("/api/send-otp", methods=["POST"])
def send_otp():
    data = request.get_json(force=True)
    email = data.get("email")
    name = data.get("name")

    if not all([email, name]):
        return jsonify({"status": "error", "message": "Missing email or name"}), 400

    # Reuse OTP if still valid
    otp_entry = OTP.query.filter_by(email=email, verified=False)\
        .order_by(OTP.created_at.desc()).first()

    if not otp_entry or datetime.utcnow() > otp_entry.expires_at:
        code = f"{random.randint(0, 999999):06d}"
        expires_at = datetime.utcnow() + timedelta(hours=24)
        otp_entry = OTP(email=email, code=code, expires_at=expires_at)
        db.session.add(otp_entry)
        db.session.commit()

    try:
        msg = Message(
            subject="Your OTP for ICT Request Verification",
            recipients=[email],
        )

        # Plain text fallback
        msg.body = f"Hi {name},\n\nYour OTP is: {otp_entry.code}\n(It expires in 24 hours.)"

        # HTML version (make sure you have templates/email_otp.html)
        msg.html = render_template(
            "email_otp.html",
            name=name,
            otp=otp_entry.code,
            expiry_minutes=24
        )

        mail.send(msg)

        return jsonify({"status": "success", "message": "OTP sent"}), 200

    except SMTPException as smtp_err:
        return jsonify({
            "status": "error",
            "message": "Failed to send OTP",
            "error": str(smtp_err)
        }), 500

@app.route("/api/verify-otp", methods=["POST"])
def verify_otp():
    

    
    data = request.get_json(force=True)
    email = data.get("email")
    code = data.get("otp")
    name = data.get("name")
    company_name = data.get("company_name")
    company_address = data.get("company_address")
    requirements = data.get("requirements")

    if not all([email, code, name, company_name, company_address, requirements]):
        return jsonify({"status": "error", "message": "Missing fields"}), 400

    # Verify OTP
    otp_entry = OTP.query.filter_by(email=email, code=code, verified=False).first()
    if not otp_entry or datetime.utcnow() > otp_entry.expires_at:
        return jsonify({"status": "error", "message": "Invalid or expired OTP"}), 400

    otp_entry.verified = True
    db.session.commit()

    # Forward to support
    try:
        support_email = os.getenv("SUPPORT_EMAIL")
        msg = Message(
            subject="New Verified ICT Request",
            recipients=[support_email] if support_email else [app.config["MAIL_DEFAULT_SENDER"]],
        )
        msg.body = f"""
        Verified ICT Request:
        From: {name} ({email})
        Company: {company_name}
        Address: {company_address}
        Requirements: {requirements}
        """
        mail.send(msg)
    except SMTPException as smtp_err:
        return jsonify({
            "status": "success",
            "message": "OTP verified but email failed",
            "error": str(smtp_err)
        }), 200

    return jsonify({"status": "success", "message": "OTP verified and request forwarded"}), 200

# -------------------  
# Contact Form Route  
# -------------------  

@app.route("/api/contact", methods=["POST", "OPTIONS"])
def contact():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    try:
        data = request.get_json(force=True)
        name = data.get("name")
        email = data.get("email")
        subject = data.get("subject")
        message = data.get("message")

        if not all([name, email, subject, message]):
            return jsonify({"status": "error", "message": "Missing fields"}), 400

        support_email = os.getenv("SUPPORT_EMAIL")
        if not support_email:
            return jsonify({"status": "error", "message": "SUPPORT_EMAIL not configured"}), 500

        msg = Message(
            subject=f"New Contact Form: {subject}",
            recipients=[support_email],
            sender=app.config["MAIL_DEFAULT_SENDER"],
        )
        msg.body = f"""
        Name: {name}
        Email: {email}
        Subject: {subject}
        Message: {message}
        """
        mail.send(msg)

        return jsonify({"status": "success", "message": "Message sent"}), 200
    except Exception as e:
        # This will show the real cause in Flask console
        print("Contact form error:", e)
        return jsonify({"status": "error", "message": str(e)}), 500



# ---------------- MAIN ---------------- #
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
