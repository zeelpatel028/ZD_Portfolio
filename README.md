# ZD Portfolio - Zeel Dobariya

Full-stack developer portfolio showcasing projects, technical skills, education timeline, security-hardened academic marksheet portal, and interactive contact form with real-time email dispatch.

## 🚀 Features

- **Interactive UI & Animations**: Built with React, Tailwind CSS, and Lucide React icons.
- **Project Showcase**: Displaying full-stack projects with live demo and GitHub links.
- **Hardened Marksheet Portal**: Academic marksheet & result view protected with dynamic watermark, anti-screenshot, anti-screen recording, and DevTools inspection defense.
- **Backend Email Service**: Node.js & Express server using Nodemailer for instant contact message dispatches via SMTP.
- **Education & Certifications**: Detailed timeline of education, achievements, and verified credentials.

## 📁 Repository Structure

```
ZD/
├── frontend/             # React (Vite) frontend application
│   ├── src/              # React components & styles
│   └── public/           # Static assets, images & resume
└── backend/              # Node.js & Express server
    ├── server.js         # API routes & SMTP email integration
    └── .env.example      # Environment variable template
```

## 🛠️ Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env     # Update with your SMTP credentials
node server.js
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## 📜 License

MIT License
