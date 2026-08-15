require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'zeelptl028@gmail.com';

app.use(cors());
app.use(express.json());

// Serve static assets from root public folder if needed
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));

/* ==========================================
   1. PROFILE API
========================================== */
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Zeel Dobariya',
    title: 'Aspiring ML Engineer | Data Scientist | Backend Python Developer',
    location: 'Ahmedabad, Gujarat, India',
    email: 'zeelptl028@gmail.com',
    phone: '+91-6353807407',
    github: 'https://github.com/zeelpatel028',
    linkedin: 'https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/',
    summary: 'Aspiring ML Engineer, Data Scientist and Backend Python Developer. Builds intelligent models, analyzes datasets, and creates scalable backend apps.',
    university: 'LJ University (Lok Jagruti Kendra University), Ahmedabad',
    degree: 'B.Tech in Computer Science Engineering (2024–2028)',
    resumeUrl: '/Zeel_Dobariya_python.pdf',
    logoUrl: '/ZD.png'
  });
});

/* ==========================================
   2. DYNAMIC SEMESTER STATUS CALCULATOR API
========================================== */
app.get('/api/semester-status', (req, res) => {
  const startDate = new Date('2024-09-01');
  const endDate = new Date('2028-08-31');
  const now = new Date();

  const semesterRanges = [
    { sem: 1, name: 'Semester I', start: '2024-09-01', end: '2025-02-28', period: 'Sep 2024 – Feb 2025' },
    { sem: 2, name: 'Semester II', start: '2025-03-01', end: '2025-08-31', period: 'Mar 2025 – Aug 2025' },
    { sem: 3, name: 'Semester III', start: '2025-09-01', end: '2026-02-28', period: 'Sep 2025 – Feb 2026' },
    { sem: 4, name: 'Semester IV', start: '2026-03-01', end: '2026-08-31', period: 'Mar 2026 – Aug 2026' },
    { sem: 5, name: 'Semester V', start: '2026-09-01', end: '2027-02-28', period: 'Sep 2026 – Feb 2027' },
    { sem: 6, name: 'Semester VI', start: '2027-03-01', end: '2027-08-31', period: 'Mar 2027 – Aug 2027' },
    { sem: 7, name: 'Semester VII', start: '2027-09-01', end: '2028-02-29', period: 'Sep 2027 – Feb 2028' },
    { sem: 8, name: 'Semester VIII', start: '2028-03-01', end: '2028-08-31', period: 'Mar 2028 – Aug 2028' }
  ];

  let currentSemNumber = 1;
  let currentSemObj = semesterRanges[0];

  if (now < startDate) {
    currentSemNumber = 1;
  } else if (now > endDate) {
    currentSemNumber = 8;
  } else {
    for (let item of semesterRanges) {
      const s = new Date(item.start);
      const e = new Date(item.end);
      if (now >= s && now <= e) {
        currentSemNumber = item.sem;
        currentSemObj = item;
        break;
      }
    }
  }

  const totalDuration = endDate - startDate;
  const elapsed = Math.max(0, Math.min(now - startDate, totalDuration));
  const progressPercent = Math.round((elapsed / totalDuration) * 100);

  res.json({
    currentSemester: currentSemNumber,
    semesterInfo: currentSemObj,
    progressPercent: progressPercent,
    totalSemesters: 8,
    startDate: '2024-09-01',
    endDate: '2028-08-31',
    semesters: semesterRanges.map(s => ({
      ...s,
      status: s.sem < currentSemNumber ? 'Completed' : s.sem === currentSemNumber ? 'Active' : 'Upcoming'
    }))
  });
});

/* ==========================================
   3. MARKSHEETS DATA API
========================================== */
app.get('/api/marksheets', (req, res) => {
  res.json({
    '10th': {
      id: '10th',
      title: 'Class 10th Secondary School Certificate (SSC)',
      institution: 'Gujarat Secondary & Higher Secondary Education Board (GSHSEB) — March 2022',
      seatNo: 'C6092300',
      image: '/10.jpeg',
      stats: [
        { label: 'Total Marks', val: '426 / 600' },
        { label: 'Percentile Rank', val: '80.53 PR' },
        { label: 'Overall Grade', val: 'B1' }
      ],
      headers: ['Code & Subject', 'Board Marks (80)', 'School Eval (20)', 'Total (100)', 'Grade'],
      rows: [
        ['01 GUJARATI FL', '54', '16', '70', 'B2'],
        ['10 SOCIAL SCIENCE', '52', '17', '69', 'B2'],
        ['11 SCIENCE', '57', '17', '74', 'B1'],
        ['12 STANDARD MATHS', '48', '16', '64', 'B2'],
        ['16 ENGLISH SL', '53', '16', '69', 'B2'],
        ['17 SANSKRIT SL', '63', '17', '80', 'B1'],
        ['24 COMPUTER EDU. -T', '-', '-', '-', 'A2'],
        ['51 COMPUTER EDU. -P', '-', '-', '-', 'A1']
      ],
      notes: 'Result: QUALIFIED FOR SECONDARY SCHOOL CERTIFICATE'
    },
    '12th': {
      id: '12th',
      title: 'Class 12th Higher Secondary Certificate (HSC) - Science Stream',
      institution: 'Gujarat Secondary & Higher Secondary Education Board (GSHSEB) — March 2024',
      seatNo: 'B 226299',
      image: '/12.jpeg',
      stats: [
        { label: 'Theory Marks', val: '355 / 500' },
        { label: 'Total Marks', val: '466 / 650' },
        { label: 'Science Theory PR', val: '81.62 PR' }
      ],
      headers: ['Code & Subject', 'Total Marks', 'Marks Obtained', 'Grade'],
      rows: [
        ['013 ENGLISH (S.L.)', '100', '45', 'C2'],
        ['050 MATHEMATICS', '100', '92', 'A1'],
        ['052 CHEMISTRY', '100', '85', 'A2'],
        ['053 CHEMISTRY PRACT.', '050', '36', 'B1'],
        ['054 PHYSICS', '100', '77', 'B1'],
        ['055 PHYSICS PRACT.', '050', '32', 'B2'],
        ['331 COMPUTER', '100', '56', 'C1'],
        ['332 COMPUTER PRACT.', '050', '43', 'A2']
      ],
      notes: 'Overall Grade: B1 | Overall Percentile Rank: 60.73 PR'
    },
    'sem-1': {
      id: 'sem-1',
      title: 'B.Tech CSE - Semester I Performance Report (Sep 2024 – Feb 2025)',
      institution: 'LJ University, Ahmedabad — Exam Period: Feb-2025',
      seatNo: '24002171210044',
      image: '/ssem-1.jpeg',
      stats: [
        { label: 'College SPI', val: '7.13' },
        { label: 'Credits Earned', val: '24 / 24' },
        { label: 'Result Class', val: 'Distinction' }
      ],
      headers: ['Code & Course Title', 'Credit', 'Theory Grade', 'Practical Grade', 'Overall Grade'],
      rows: [
        ['117121191 Mathematics - I', '6.0', 'A+', '-', 'A+'],
        ['117122191 Computer Programming using Java-I', '6.0', 'C', 'A++', 'B++'],
        ['017123191 Software Engineering', '4.0', 'B++', 'A++', 'B++'],
        ['117121192 Physics', '4.0', 'B++', 'A++', 'B++'],
        ['017122192 IOT Workshop - Laboratory', '2.0', '-', 'A++', 'A++'],
        ['017122193 Computer Workshop - Laboratory', '2.0', '-', 'A++', 'A++'],
        ['017128191 Environmental Science', '0.0', 'A', '-', 'A']
      ],
      notes: 'MOOC: Introduction to Java (Coursera / LearnQuest) | Result: Pass (First Class with Distinction)'
    },
    'sem-2': {
      id: 'sem-2',
      title: 'B.Tech CSE - Semester II Performance Report (Mar 2025 – Aug 2025)',
      institution: 'LJ University, Ahmedabad — Exam Period: Aug-2025',
      seatNo: '24002171210044',
      image: '/sem-2.jpeg',
      stats: [
        { label: 'College SPI', val: '6.37' },
        { label: 'Credits Earned', val: '27 / 27' },
        { label: 'Result Class', val: 'First Class' }
      ],
      headers: ['Code & Course Title', 'Credit', 'Theory Grade', 'Practical Grade', 'Overall Grade'],
      rows: [
        ['017121291 Mathematics - II', '5.0', 'B+', '-', 'B+'],
        ['117123291 Database Management System', '6.0', 'C', 'A', 'B+'],
        ['117123292 Data Structures using Java', '6.0', 'A', 'A', 'A'],
        ['117122291 Fundamental of Electronics & Elec.', '4.0', 'C', 'A', 'B'],
        ['117122292 Computer Programming using Java-II', '6.0', 'B+', 'A++', 'A']
      ],
      notes: 'MOOC: Inheritance and Data Structures in Java (Coursera / Penn) | Result: Pass (First Class)'
    },
    'sem-3': {
      id: 'sem-3',
      title: 'B.Tech CSE - Semester III Performance Report (Sep 2025 – Feb 2026)',
      institution: 'LJ University, Ahmedabad — Exam Period: Feb-2026',
      seatNo: '24002171210044',
      image: '/sem-3.jpeg',
      stats: [
        { label: 'College SPI', val: '8.17' },
        { label: 'Credits Earned', val: '24 / 24' },
        { label: 'Result Class', val: 'Distinction' }
      ],
      headers: ['Code & Course Title', 'Credit', 'Theory Grade', 'Practical Grade', 'Overall Grade'],
      rows: [
        ['017123391 Digital Electronics', '5.0', 'A++', 'A++', 'A++'],
        ['117123392 Full Stack Development with JS-1', '6.0', 'A++', 'A+', 'A+'],
        ['017121391 Intro to Probability & Stochastic', '5.0', 'A+', '-', 'A+'],
        ['117122391 Fundamentals of CS using Python - I', '5.0', 'A+', 'O++', 'O'],
        ['017127391 Effective Technical Communication', '3.0', 'O++', '-', 'O++'],
        ['017128391 Constitution of India', '0.0', 'B+', '-', 'B+']
      ],
      notes: 'MOOC: Introduction to HTML, CSS, & JavaScript (Coursera / IBM) | Result: Pass (First Class with Distinction)'
    }
  });
});

/* ==========================================
   4. PROJECTS API
========================================== */
app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'AgroVision AI Platform',
      repoName: 'AgroVision_AI',
      type: 'AI & Smart Agriculture',
      status: 'Active',
      description: 'An AI-powered smart agriculture platform designed to optimize farming crop yield using supervised machine learning recommendation models and live market price dashboards.',
      features: [
        'Supervised ML crop yield & recommendation engine',
        'Trained on weather, soil nutrient (NPK), and historical data',
        'Interactive web dashboard with real-time commodity market prices',
        'Built with JavaScript, HTML, and backend data processing'
      ],
      techStack: ['JavaScript', 'Machine Learning', 'HTML5', 'CSS3'],
      githubUrl: 'https://github.com/zeelpatel028/AgroVision_AI'
    },
    {
      id: 2,
      title: 'AI AgroVision Engine',
      repoName: 'AI_AgroVision',
      type: 'Python Data Science & ML',
      status: 'Active',
      description: 'Python machine learning backend engine driving data processing pipelines, predictive modeling algorithms, and feature engineering for agriculture datasets.',
      features: [
        'Data analysis pipelines built with Pandas and NumPy',
        'Predictive crop classification algorithm',
        'Data preprocessing & feature scaling matrix',
        'Model training and evaluation scripts'
      ],
      techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn'],
      githubUrl: 'https://github.com/zeelpatel028/AI_AgroVision'
    },
    {
      id: 3,
      title: 'Tripzza Tours Platform',
      repoName: 'Tripzza-Tuors',
      type: 'Full-Stack Web App',
      status: 'Completed',
      description: 'A modern full-stack Tour & Travel booking platform delivering end-to-end travel booking, payment tracking, analytics dashboards, and PDF invoice generation.',
      features: [
        'User authentication & tour package booking workflow',
        'Payment tracking and interactive analytics dashboard',
        'Automated PDF invoice & ticket generation engine',
        'PostgreSQL relational database storage'
      ],
      techStack: ['React.js', 'Express.js', 'PostgreSQL', 'PDF Engine'],
      githubUrl: 'https://github.com/zeelpatel028/Tripzza-Tuors'
    },
    {
      id: 4,
      title: 'Bharatiya Janta Mart (E-Commerce)',
      repoName: 'E-Commerce / shop',
      type: 'Java & Data Structures',
      status: 'Completed',
      description: 'A robust Java console and JDBC e-commerce platform integrated with MySQL database. Utilizes custom Double Linked List + Stack data structures for cart operations.',
      features: [
        'Shopping Cart managed via Double Linked List + Stack for undo operations',
        'OTP authentication login system',
        'PAN card validation module',
        'Digital user wallet & automated invoice billing'
      ],
      techStack: ['Java', 'JDBC', 'MySQL', 'Data Structures'],
      githubUrl: 'https://github.com/zeelpatel028/E-Commerce'
    },
    {
      id: 5,
      title: 'Hospital Management System',
      repoName: 'Hospital-Menegment-Syatem',
      type: 'Core Java Application',
      status: 'Completed',
      description: 'A comprehensive Java application for managing healthcare operations, patient admission records, doctor appointment scheduling, room allocations, and billing.',
      features: [
        'Patient registration & medical history tracking',
        'Doctor specialization search & appointment scheduling',
        'Ward, room & bed availability management',
        'Automated billing receipt generation & file storage'
      ],
      techStack: ['Java', 'OOP Concepts', 'File I/O', 'Data Structures'],
      githubUrl: 'https://github.com/zeelpatel028/Hospital-Menegment-Syatem'
    },
    {
      id: 6,
      title: 'House Price Prediction ML',
      repoName: 'House-Price-Prediction-Using-Machine-Learning',
      type: 'Machine Learning & Data Science',
      status: 'Completed',
      description: 'A predictive machine learning project built in Jupyter Notebook using Python data science libraries to estimate residential house prices based on property features.',
      features: [
        'Exploratory Data Analysis (EDA) & feature correlation analysis',
        'Regression algorithms (Linear, Ridge, Decision Trees)',
        'Feature scaling, outlier detection & data visualization',
        'Model performance evaluation metrics (RMSE, R2 Score)'
      ],
      techStack: ['Python', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Matplotlib'],
      githubUrl: 'https://github.com/zeelpatel028/House-Price-Prediction-Using-Machine-Learning'
    },
    {
      id: 7,
      title: 'VeloraSweet Django Web App',
      repoName: 'VeloraSweet-s-Django-Project',
      type: 'Full-Stack Python Django',
      status: 'Completed',
      description: 'A full-stack sweet shop e-commerce and ordering management web application built with Python Django framework, dynamic templates, and database storage.',
      features: [
        'Sweet items catalog display & category filtering',
        'Order placement & shopping cart management',
        'Django admin panel backend for product inventory control',
        'Responsive user interface styling'
      ],
      techStack: ['Python', 'Django', 'HTML5', 'CSS3', 'SQLite'],
      githubUrl: 'https://github.com/zeelpatel028/VeloraSweet-s-Django-Project'
    }
  ]);
});

/* ==========================================
   5. SKILLS API
========================================== */
app.get('/api/skills', (req, res) => {
  res.json([
    {
      category: 'Programming Languages',
      icon: 'fa-code',
      categoryBanner: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/python/python-original.svg',
      skills: [
        { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/python/python-original.svg' },
        { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/java/java-original.svg' },
        { name: 'SQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg' }
      ]
    },
    {
      category: 'Machine Learning & Data',
      icon: 'fa-brain',
      categoryBanner: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/pandas/pandas-original.svg',
      skills: [
        { name: 'Pandas', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/pandas/pandas-original.svg' },
        { name: 'NumPy', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/numpy/numpy-original.svg' },
        { name: 'Supervised Learning', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/tensorflow/tensorflow-original.svg' },
        { name: 'Data Preprocessing', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/python/python-plain.svg' },
        { name: 'Model Evaluation', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/jupyter/jupyter-original.svg' }
      ]
    },
    {
      category: 'Web & Backend Development',
      icon: 'fa-globe',
      categoryBanner: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/react/react-original.svg',
      skills: [
        { name: 'React.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/react/react-original.svg' },
        { name: 'Express.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/express/express-original.svg' },
        { name: 'Django', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/django/django-plain.svg' },
        { name: 'RESTful APIs', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'JDBC', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/java/java-plain.svg' }
      ]
    },
    {
      category: 'Tools & Databases',
      icon: 'fa-wrench',
      categoryBanner: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/postgresql/postgresql-original.svg',
      skills: [
        { name: 'VS Code', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Jupyter Notebook', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/jupyter/jupyter-original.svg' },
        { name: 'Git & GitHub', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/git/git-original.svg' },
        { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/mysql/mysql-original.svg' },
        { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicon/devicon/icons/postgresql/postgresql-original.svg' }
      ]
    }
  ]);
});

/* ==========================================
   6. CERTIFICATIONS API
========================================== */
app.get('/api/certifications', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'IIT Bombay – Data Science',
      icon: 'fa-graduation-cap',
      description: 'Certified in foundational and advanced Data Science methodologies, data analysis pipelines, and machine learning principles by IIT Bombay.'
    },
    {
      id: 2,
      title: 'LD Hackathon',
      icon: 'fa-trophy',
      description: 'Participated in rapid prototyping and software development competition at LD College of Engineering, building solutions under tight deadlines.'
    },
    {
      id: 3,
      title: 'LJ Hackathon',
      icon: 'fa-award',
      description: 'Showcased technical problem-solving, innovative application architecture, and team collaboration at the LJ University Hackathon event.'
    }
  ]);
});

/* ==========================================
   7. CONTACT API & EMAIL SENDING ENDPOINT
========================================== */
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please provide your name, email, and message.' });
  }

  console.log(`\n========================================`);
  console.log(`📩 NEW DIRECT MESSAGE RECEIVED!`);
  console.log(`From Name: ${name}`);
  console.log(`Sender Email: ${email}`);
  console.log(`Target Email: ${RECIPIENT_EMAIL}`);
  console.log(`Message Content:\n${message}`);
  console.log(`========================================\n`);

  const emailUser = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
  const rawPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim() : '';
  const emailPass = rawPass.replace(/\s+/g, '');

  const isConfigured = emailUser && emailPass && emailPass !== 'your_gmail_app_password_here';

  if (isConfigured) {
    try {
      console.log(` Attempting SMTP dispatch via Gmail user: ${emailUser}...`);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass
        }
      });

      const mailOptions = {
        from: `"${name}" <${emailUser}>`,
        replyTo: email,
        to: RECIPIENT_EMAIL,
        subject: `New Portfolio Message from ${name} (${email})`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7ede5; color: #332115; border-radius: 8px;">
            <h2 style="color: #664930; border-bottom: 2px solid #997E67; padding-bottom: 8px;">📩 New Direct Portfolio Message</h2>
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Date & Time:</strong> ${new Date().toLocaleString()}</p>
            <div style="margin-top: 15px; padding: 15px; background: #ffffff; border-left: 4px solid #664930; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(` SUCCESS! Email dispatched to ${RECIPIENT_EMAIL}. Message ID: ${info.messageId}`);

      return res.json({
        success: true,
        message: `Thank you ${name}! Your message has been sent directly to Zeel's email inbox (${RECIPIENT_EMAIL}).`
      });
    } catch (emailErr) {
      console.error('❌ Email dispatch error:', emailErr);
      return res.status(500).json({
        success: false,
        error: `Failed to send email: ${emailErr.message}`
      });
    }
  } else {
    console.log(`ℹ️ [Email Note]: EMAIL_USER / EMAIL_PASS not fully configured in environment`);
    return res.json({
      success: true,
      message: `Thank you ${name}! Your message was logged successfully.`
    });
  }
});

module.exports = app;

if (require.main === module || (!process.env.VERCEL && process.env.NODE_ENV !== 'production')) {
  app.listen(PORT, () => {
    console.log(`🚀 Zeel Dobariya Portfolio Express Backend running on http://localhost:${PORT}`);
  });
}
