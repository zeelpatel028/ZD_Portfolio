<p align="center">
  <img src="frontend/public/ZD.png" width="140" alt="ZD Portfolio Logo" />
</p>

<h1 align="center">⚡ ZD Portfolio | Zeel Dobariya ⚡</h1>

<p align="center">
  <b>A High-Performance, Hardened Full-Stack Developer Portfolio & Academic Result Portal</b>
</p>

<p align="center">
  <a href="https://github.com/zeelpatel028/ZD_Portfolio">
    <img src="https://img.shields.io/github/stars/zeelpatel028/ZD_Portfolio?style=for-the-badge&logo=github&color=6366f1" alt="Stars"/>
  </a>
  <a href="https://github.com/zeelpatel028/ZD_Portfolio/network/members">
    <img src="https://img.shields.io/github/forks/zeelpatel028/ZD_Portfolio?style=for-the-badge&logo=github&color=8b5cf6" alt="Forks"/>
  </a>
  <a href="https://github.com/zeelpatel028/ZD_Portfolio/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="License"/>
  </a>
</p>

---

## 🌟 Overview

**ZD Portfolio** is a feature-packed, modern full-stack web application designed for **Zeel Dobariya**. Built with React 18, Vite, Tailwind CSS, and a Node.js Express backend, it features interactive UI components, dynamic project showcases, verified credentials, and a **hardened anti-tamper security shield** for sensitive academic marksheets.

---

## ✨ Key Features

- 🎨 **Futuristic Glassmorphism UI**: High-contrast dark theme, animated gradients, smooth scroll transitions, and micro-interactions.
- 🔒 **Marksheet Security Shield**: Enterprise-grade client protection system including:
  - **Anti-Screenshot & Anti-Recording Blurring**: Blurs confidential marksheets when focus is lost or capture tools are active.
  - **DevTools Inspection Prevention**: Keybinding blocks (`F12`, `Ctrl+Shift+I`, `Ctrl+U`) and debugger loop traps.
  - **Dynamic Watermarking**: Embeds live timestamps, viewer IP/session context across marksheets.
  - **Context & Drag Lock**: Disables right-click menus, text selection, and image dragging.
- 📧 **Backend Contact Service**: Express server powered by Nodemailer for real-time SMTP message dispatch with fallback validation.
- 🎓 **Academic & Certificate Showcase**: Interactive Lightbox modal viewer for high-res semester marksheets and professional certifications.
- ⚡ **Optimized Performance**: Lightning-fast Vite HMR build, modular component design, and zero bloat.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-F43F5E?style=flat-square&logo=lucide&logoColor=white)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22C55E?style=flat-square&logo=node.js&logoColor=white)

---

## 📁 Repository Structure

```gfm
ZD/
├── 📂 backend/                     # Express API & Mail Dispatcher
│   ├── 📄 server.js                 # API Endpoints & SMTP Controller
│   ├── 📄 .env.example              # Environment Configuration Template
│   ├── 📄 package.json              # Backend Dependencies
│   └── 📂 public/                   # Backend Assets & Media
│
├── 📂 frontend/                    # Vite + React Frontend Application
│   ├── 📂 src/
│   │   ├── 📂 components/           # UI Components
│   │   │   ├── Navbar.jsx           # Sticky Responsive Header
│   │   │   ├── Hero.jsx             # Profile Banner & CTAs
│   │   │   ├── About.jsx            # Bio & Personal Summary
│   │   │   ├── Skills.jsx           # Technical Skill Badges
│   │   │   ├── Projects.jsx         # Project Gallery & Live Demo Links
│   │   │   ├── EducationTimeline.jsx# Roadmap & Academic Credentials
│   │   │   ├── MarksheetGallery.jsx # Semester Marksheet Viewer
│   │   │   ├── MarksheetSecurityShield.jsx # Anti-Screenshot Protection
│   │   │   ├── Contact.jsx          # Interactive Message Form
│   │   │   └── Footer.jsx           # Footer & Social Links
│   │   ├── App.jsx                  # Main Application Layout
│   │   ├── index.css                # Custom CSS Design System
│   │   └── main.jsx                 # Application Entry Point
│   ├── 📄 index.html                # HTML Web Document
│   └── 📄 vite.config.js            # Vite Configuration
│
├── 📄 .gitignore                    # Git Exclusion Standard
└── 📄 README.md                     # Documentation
```

---

## 🛡️ Marksheet Security Shield Specifications

| Protection Mechanism | Description | Action Taken |
| :--- | :--- | :--- |
| **DevTools Blocking** | Detects console opening & keyboard shortcuts (`F12`, `Ctrl+Shift+I/J/U`) | Prevents inspection & triggers debugger traps |
| **Anti-Screenshot Blur** | Monitors window blur, focus loss, and print screen keys (`PrtScn`, `Meta+Shift+S`) | Immediately blurs marksheets & displays security shield modal |
| **Context Menu Lock** | Prevents right-click context menu on sensitive document elements | Suppresses menu event & image saving |
| **Dynamic Watermark** | Overlays live user metadata, session details, and security warnings | Rendered dynamically over documents |
| **Content Drag Prevention** | Disables image dragging and highlighted text copy operations | Blocks drag/drop download attempts |

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

---

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

Edit your `.env` file with your SMTP email settings:
```env
PORT=5000
RECIPIENT_EMAIL=zeelptl028@gmail.com
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Start the backend server:
```bash
node server.js
```
The server will launch at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📡 API Reference

### Send Contact Message
- **Endpoint**: `POST /api/contact`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Hello Zeel, I would like to discuss a project with you."
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Your message has been sent successfully!"
  }
  ```

---

## 👤 Author

**Zeel Dobariya**
- 🐙 GitHub: [@zeelpatel028](https://github.com/zeelpatel028)
- 📧 Email: [zeelptl028@gmail.com](mailto:zeelptl028@gmail.com)
- 💼 Repository: [ZD_Portfolio](https://github.com/zeelpatel028/ZD_Portfolio)

---

<p align="center">
  <sub>Built with ❤️ by Zeel Dobariya • © 2026 All Rights Reserved</sub>
</p>
