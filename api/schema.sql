-- ============================================================
-- SQL Database Schema & Seed Data for ZD Portfolio Backend
-- Database Engine: SQLite / PostgreSQL / MySQL Compatible
-- ============================================================

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    email VARCHAR(255),
    github VARCHAR(255),
    linkedin VARCHAR(255),
    summary TEXT,
    university VARCHAR(255),
    degree VARCHAR(255),
    resume_url VARCHAR(255),
    logo_url VARCHAR(255)
);

-- Seed Data: Profile
INSERT INTO profile (id, name, title, location, email, github, linkedin, summary, university, degree, resume_url, logo_url)
VALUES (
    1,
    'Zeel Dobariya',
    'Aspiring ML Engineer | Data Scientist | Backend Python Developer',
    'Ahmedabad, Gujarat, India',
    'zeelptl028@gmail.com',
    'https://github.com/zeelpatel028',
    'https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/',
    'Aspiring ML Engineer, Data Scientist and Backend Python Developer. Builds intelligent models, analyzes datasets, and creates scalable backend apps.',
    'LJ University (Lok Jagruti Kendra University), Ahmedabad',
    'B.Tech in Computer Science Engineering (2024–2028)',
    '/Zeel_Dobariya_python.pdf',
    '/ZD.png'
);


-- 2. Semester Status Table
CREATE TABLE IF NOT EXISTS semester_status (
    sem INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    period VARCHAR(100) NOT NULL
);

-- Seed Data: Semester Status Ranges
INSERT INTO semester_status (sem, name, start_date, end_date, period) VALUES
(1, 'Semester I', '2024-09-01', '2025-02-28', 'Sep 2024 – Feb 2025'),
(2, 'Semester II', '2025-03-01', '2025-08-31', 'Mar 2025 – Aug 2025'),
(3, 'Semester III', '2025-09-01', '2026-02-28', 'Sep 2025 – Feb 2026'),
(4, 'Semester IV', '2026-03-01', '2026-08-31', 'Mar 2026 – Aug 2026'),
(5, 'Semester V', '2026-09-01', '2027-02-28', 'Sep 2026 – Feb 2027'),
(6, 'Semester VI', '2027-03-01', '2027-08-31', 'Mar 2027 – Aug 2027'),
(7, 'Semester VII', '2027-09-01', '2028-02-29', 'Sep 2027 – Feb 2028'),
(8, 'Semester VIII', '2028-03-01', '2028-08-31', 'Mar 2028 – Aug 2028');


-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    repo_name VARCHAR(255),
    type VARCHAR(100),
    status VARCHAR(50),
    description TEXT,
    features TEXT, -- Stored as JSON string array
    tech_stack TEXT, -- Stored as JSON string array
    github_url VARCHAR(255)
);

-- Seed Data: Projects
INSERT INTO projects (id, title, repo_name, type, status, description, features, tech_stack, github_url) VALUES
(1, 'AgroVision AI Platform', 'AgroVision_AI', 'AI & Smart Agriculture', 'Active', 'An AI-powered smart agriculture platform designed to optimize farming crop yield using supervised machine learning recommendation models and live market price dashboards.', '["Supervised ML crop yield & recommendation engine", "Trained on weather, soil nutrient (NPK), and historical data", "Interactive web dashboard with real-time commodity market prices", "Built with JavaScript, HTML, and backend data processing"]', '["JavaScript", "Machine Learning", "HTML5", "CSS3"]', 'https://github.com/zeelpatel028/AgroVision_AI'),
(2, 'Tripzza Tours Platform', 'Tripzza-Tuors', 'Full-Stack Web App', 'Completed', 'A modern full-stack Tour & Travel booking platform delivering end-to-end travel booking, payment tracking, analytics dashboards, and PDF invoice generation.', '["User authentication & tour package booking workflow", "Payment tracking and interactive analytics dashboard", "Automated PDF invoice & ticket generation engine", "PostgreSQL relational database storage"]', '["React.js", "Express.js", "PostgreSQL", "PDF Engine"]', 'https://github.com/zeelpatel028/Tripzza-Tuors'),
(3, 'Bharatiya Janta Mart (E-Commerce)', 'E-Commerce', 'Java & Data Structures', 'Completed', 'A robust Java console and JDBC e-commerce platform integrated with MySQL database. Utilizes custom Double Linked List + Stack data structures for cart operations.', '["Shopping Cart managed via Double Linked List + Stack for undo operations", "OTP authentication login system", "PAN card validation module", "Digital user wallet & automated invoice billing"]', '["Java", "JDBC", "MySQL", "Data Structures"]', 'https://github.com/zeelpatel028/E-Commerce'),
(4, 'Hospital Management System', 'Hospital-Menegment-Syatem', 'Core Java Application', 'Completed', 'A comprehensive Java application for managing healthcare operations, patient admission records, doctor appointment scheduling, room allocations, and billing.', '["Patient registration & medical history tracking", "Doctor specialization search & appointment scheduling", "Ward, room & bed availability management", "Automated billing receipt generation & file storage"]', '["Java", "OOP Concepts", "File I/O", "Data Structures"]', 'https://github.com/zeelpatel028/Hospital-Menegment-Syatem'),
(5, 'House Price Prediction ML', 'House-Price-Prediction-Using-Machine-Learning', 'Machine Learning & Data Science', 'Completed', 'A predictive machine learning project built in Jupyter Notebook using Python data science libraries to estimate residential house prices based on property features.', '["Exploratory Data Analysis (EDA) & feature correlation analysis", "Regression algorithms (Linear, Ridge, Decision Trees)", "Feature scaling, outlier detection & data visualization", "Model performance evaluation metrics (RMSE, R2 Score)"]', '["Python", "Jupyter Notebook", "Pandas", "NumPy", "Matplotlib"]', 'https://github.com/zeelpatel028/House-Price-Prediction-Using-Machine-Learning'),
(6, 'VeloraSweet Django Web App', 'VeloraSweet-s-Django-Project', 'Full-Stack Python Django', 'Completed', 'A full-stack sweet shop e-commerce and ordering management web application built with Python Django framework, dynamic templates, and database storage.', '["Sweet items catalog display & category filtering", "Order placement & shopping cart management", "Django admin panel backend for product inventory control", "Responsive user interface styling"]', '["Python", "Django", "HTML5", "CSS3", "SQLite"]', 'https://github.com/zeelpatel028/VeloraSweet-s-Django-Project');


-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category VARCHAR(100) NOT NULL,
    category_icon VARCHAR(100),
    skill_name VARCHAR(100) NOT NULL,
    skill_icon VARCHAR(100)
);

-- Seed Data: Skills
INSERT INTO skills (category, category_icon, skill_name, skill_icon) VALUES
('Programming Languages', 'fa-solid fa-code', 'Python', 'devicon-python-plain colored'),
('Programming Languages', 'fa-solid fa-code', 'JavaScript', 'devicon-javascript-plain colored'),
('Programming Languages', 'fa-solid fa-code', 'Java', 'devicon-java-plain colored'),
('Programming Languages', 'fa-solid fa-code', 'SQL', 'devicon-azuresqldatabase-plain colored'),
('Machine Learning & Data', 'fa-solid fa-brain', 'Pandas', 'devicon-pandas-plain colored'),
('Machine Learning & Data', 'fa-solid fa-brain', 'NumPy', 'devicon-numpy-plain colored'),
('Machine Learning & Data', 'fa-solid fa-brain', 'Supervised Learning', 'fa-solid fa-brain'),
('Machine Learning & Data', 'fa-solid fa-brain', 'Data Preprocessing', 'fa-solid fa-filter'),
('Machine Learning & Data', 'fa-solid fa-brain', 'Model Evaluation', 'fa-solid fa-chart-pie'),
('Web & Backend Development', 'fa-solid fa-layer-group', 'React.js', 'devicon-react-original colored'),
('Web & Backend Development', 'fa-solid fa-layer-group', 'Express.js', 'devicon-express-original'),
('Web & Backend Development', 'fa-solid fa-layer-group', 'Django', 'devicon-django-plain colored'),
('Web & Backend Development', 'fa-solid fa-layer-group', 'RESTful APIs', 'fa-solid fa-network-wired'),
('Web & Backend Development', 'fa-solid fa-layer-group', 'JDBC', 'fa-solid fa-plug-circle-bolt'),
('Tools & Databases', 'fa-solid fa-screwdriver-wrench', 'VS Code', 'devicon-vscode-plain colored'),
('Tools & Databases', 'fa-solid fa-screwdriver-wrench', 'Jupyter Notebook', 'devicon-jupyter-plain colored'),
('Tools & Databases', 'fa-solid fa-screwdriver-wrench', 'Git & GitHub', 'devicon-git-plain colored'),
('Tools & Databases', 'fa-solid fa-screwdriver-wrench', 'MySQL', 'devicon-mysql-plain colored'),
('Tools & Databases', 'fa-solid fa-screwdriver-wrench', 'PostgreSQL', 'devicon-postgresql-plain colored');


-- 5. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    icon VARCHAR(100),
    description TEXT
);

-- Seed Data: Certifications
INSERT INTO certifications (id, title, icon, description) VALUES
(1, 'IIT Bombay – Data Science', 'fa-graduation-cap', 'Certified in foundational and advanced Data Science methodologies, data analysis pipelines, and machine learning principles by IIT Bombay.'),
(2, 'LD Hackathon', 'fa-trophy', 'Participated in rapid prototyping and software development competition at LD College of Engineering, building solutions under tight deadlines.'),
(3, 'LJ Hackathon', 'fa-award', 'Showcased technical problem-solving, innovative application architecture, and team collaboration at the LJ University Hackathon event.');
