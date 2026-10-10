from datetime import datetime, date

def get_profile_data():
    return {
        "name": "Zeel Dobariya",
        "title": "Aspiring ML Engineer | Data Scientist | Backend Python Developer",
        "location": "Ahmedabad, Gujarat, India",
        "email": "zeelptl028@gmail.com",
        "github": "https://github.com/zeelpatel028",
        "linkedin": "https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/",
        "summary": "Aspiring ML Engineer, Data Scientist and Backend Python Developer. Builds intelligent models, analyzes datasets, and creates scalable backend apps.",
        "university": "LJ University (Lok Jagruti Kendra University), Ahmedabad",
        "degree": "B.Tech in Computer Science Engineering (2024–2028)",
        "resume_url": "/static/files/Zeel_Dobariya_python.pdf",
        "logo_url": "/static/images/ZD.png",
        "photo_url": "/static/images/ZD_Photo.png",
        "avatar_url": "/static/images/ZD_Chereter.png"
    }

def get_semester_status_data():
    start_date = date(2024, 9, 1)
    end_date = date(2028, 8, 31)
    today = date.today()

    semester_ranges = [
        {"sem": 1, "name": "Semester I", "start": "2024-09-01", "end": "2025-02-28", "period": "Sep 2024 – Feb 2025"},
        {"sem": 2, "name": "Semester II", "start": "2025-03-01", "end": "2025-08-31", "period": "Mar 2025 – Aug 2025"},
        {"sem": 3, "name": "Semester III", "start": "2025-09-01", "end": "2026-02-28", "period": "Sep 2025 – Feb 2026"},
        {"sem": 4, "name": "Semester IV", "start": "2026-03-01", "end": "2026-08-31", "period": "Mar 2026 – Aug 2026"},
        {"sem": 5, "name": "Semester V", "start": "2026-09-01", "end": "2027-02-28", "period": "Sep 2026 – Feb 2027"},
        {"sem": 6, "name": "Semester VI", "start": "2027-03-01", "end": "2027-08-31", "period": "Mar 2027 – Aug 2027"},
        {"sem": 7, "name": "Semester VII", "start": "2027-09-01", "end": "2028-02-29", "period": "Sep 2027 – Feb 2028"},
        {"sem": 8, "name": "Semester VIII", "start": "2028-03-01", "end": "2028-08-31", "period": "Mar 2028 – Aug 2028"}
    ]

    current_sem = 4
    current_sem_obj = semester_ranges[3]

    if today < start_date:
        current_sem = 1
        current_sem_obj = semester_ranges[0]
    elif today > end_date:
        current_sem = 8
        current_sem_obj = semester_ranges[7]
    else:
        for item in semester_ranges:
            s = datetime.strptime(item["start"], "%Y-%m-%d").date()
            e = datetime.strptime(item["end"], "%Y-%m-%d").date()
            if s <= today <= e:
                current_sem = item["sem"]
                current_sem_obj = item
                break

    total_days = (end_date - start_date).days
    elapsed_days = max(0, min((today - start_date).days, total_days))
    progress_percent = round((elapsed_days / total_days) * 100) if total_days > 0 else 50

    semesters_formatted = []
    for s in semester_ranges:
        status = "Completed" if s["sem"] < current_sem else ("Active" if s["sem"] == current_sem else "Upcoming")
        semesters_formatted.append({
            **s,
            "status": status
        })

    return {
        "currentSemester": current_sem,
        "semesterInfo": current_sem_obj,
        "progressPercent": progress_percent,
        "totalSemesters": 8,
        "startDate": "2024-09-01",
        "endDate": "2028-08-31",
        "semesters": semesters_formatted
    }

def get_projects_data():
    return [
        {
            "id": 1,
            "title": "AgroVision AI Platform",
            "repoName": "AgroVision_AI",
            "type": "AI & Smart Agriculture",
            "status": "Active",
            "description": "An AI-powered smart agriculture platform designed to optimize farming crop yield using supervised machine learning recommendation models and live market price dashboards.",
            "features": [
                "Supervised ML crop yield & recommendation engine",
                "Trained on weather, soil nutrient (NPK), and historical data",
                "Interactive web dashboard with real-time commodity market prices",
                "Built with JavaScript, HTML, and backend data processing"
            ],
            "techStack": ["JavaScript", "Machine Learning", "HTML5", "CSS3"],
            "githubUrl": "https://github.com/zeelpatel028/AgroVision_AI"
        },
        {
            "id": 3,
            "title": "Tripzza Tours Platform",
            "repoName": "Tripzza-Tuors",
            "type": "Full-Stack Web App",
            "status": "Completed",
            "description": "A modern full-stack Tour & Travel booking platform delivering end-to-end travel booking, payment tracking, analytics dashboards, and PDF invoice generation.",
            "features": [
                "User authentication & tour package booking workflow",
                "Payment tracking and interactive analytics dashboard",
                "Automated PDF invoice & ticket generation engine",
                "PostgreSQL relational database storage"
            ],
            "techStack": ["React.js", "Express.js", "PostgreSQL", "PDF Engine"],
            "githubUrl": "https://github.com/zeelpatel028/Tripzza-Tuors"
        },
        {
            "id": 4,
            "title": "Bharatiya Janta Mart (E-Commerce)",
            "repoName": "E-Commerce",
            "type": "Java & Data Structures",
            "status": "Completed",
            "description": "A robust Java console and JDBC e-commerce platform integrated with MySQL database. Utilizes custom Double Linked List + Stack data structures for cart operations.",
            "features": [
                "Shopping Cart managed via Double Linked List + Stack for undo operations",
                "OTP authentication login system",
                "PAN card validation module",
                "Digital user wallet & automated invoice billing"
            ],
            "techStack": ["Java", "JDBC", "MySQL", "Data Structures"],
            "githubUrl": "https://github.com/zeelpatel028/E-Commerce"
        },
        {
            "id": 5,
            "title": "Hospital Management System",
            "repoName": "Hospital-Menegment-Syatem",
            "type": "Core Java Application",
            "status": "Completed",
            "description": "A comprehensive Java application for managing healthcare operations, patient admission records, doctor appointment scheduling, room allocations, and billing.",
            "features": [
                "Patient registration & medical history tracking",
                "Doctor specialization search & appointment scheduling",
                "Ward, room & bed availability management",
                "Automated billing receipt generation & file storage"
            ],
            "techStack": ["Java", "OOP Concepts", "File I/O", "Data Structures"],
            "githubUrl": "https://github.com/zeelpatel028/Hospital-Menegment-Syatem"
        },
        {
            "id": 6,
            "title": "House Price Prediction ML",
            "repoName": "House-Price-Prediction-Using-Machine-Learning",
            "type": "Machine Learning & Data Science",
            "status": "Completed",
            "description": "A predictive machine learning project built in Jupyter Notebook using Python data science libraries to estimate residential house prices based on property features.",
            "features": [
                "Exploratory Data Analysis (EDA) & feature correlation analysis",
                "Regression algorithms (Linear, Ridge, Decision Trees)",
                "Feature scaling, outlier detection & data visualization",
                "Model performance evaluation metrics (RMSE, R2 Score)"
            ],
            "techStack": ["Python", "Jupyter Notebook", "Pandas", "NumPy", "Matplotlib"],
            "githubUrl": "https://github.com/zeelpatel028/House-Price-Prediction-Using-Machine-Learning"
        },
        {
            "id": 7,
            "title": "VeloraSweet Django Web App",
            "repoName": "VeloraSweet-s-Django-Project",
            "type": "Full-Stack Python Django",
            "status": "Completed",
            "description": "A full-stack sweet shop e-commerce and ordering management web application built with Python Django framework, dynamic templates, and database storage.",
            "features": [
                "Sweet items catalog display & category filtering",
                "Order placement & shopping cart management",
                "Django admin panel backend for product inventory control",
                "Responsive user interface styling"
            ],
            "techStack": ["Python", "Django", "HTML5", "CSS3", "SQLite"],
            "githubUrl": "https://github.com/zeelpatel028/VeloraSweet-s-Django-Project"
        }
    ]

def get_skills_data():
    return [
        {
            "category": "Programming Languages",
            "icon": "fa-solid fa-code",
            "skills": [
                {"name": "Python", "icon": "devicon-python-plain colored"},
                {"name": "JavaScript", "icon": "devicon-javascript-plain colored"},
                {"name": "Java", "icon": "devicon-java-plain colored"},
                {"name": "SQL", "icon": "devicon-azuresqldatabase-plain colored"}
            ]
        },
        {
            "category": "Machine Learning & Data",
            "icon": "fa-solid fa-brain",
            "skills": [
                {"name": "Pandas", "icon": "devicon-pandas-plain colored"},
                {"name": "NumPy", "icon": "devicon-numpy-plain colored"},
                {"name": "Supervised Learning", "icon": "fa-solid fa-brain"},
                {"name": "Data Preprocessing", "icon": "fa-solid fa-filter"},
                {"name": "Model Evaluation", "icon": "fa-solid fa-chart-pie"}
            ]
        },
        {
            "category": "Web & Backend Development",
            "icon": "fa-solid fa-layer-group",
            "skills": [
                {"name": "FastAPI & Python", "icon": "devicon-fastapi-plain colored"},
                {"name": "Express.js", "icon": "devicon-express-original"},
                {"name": "Django", "icon": "devicon-django-plain colored"},
                {"name": "RESTful APIs", "icon": "fa-solid fa-network-wired"},
                {"name": "JDBC", "icon": "fa-solid fa-plug-circle-bolt"}
            ]
        },
        {
            "category": "Tools & Databases",
            "icon": "fa-solid fa-screwdriver-wrench",
            "skills": [
                {"name": "VS Code", "icon": "devicon-vscode-plain colored"},
                {"name": "Jupyter Notebook", "icon": "devicon-jupyter-plain colored"},
                {"name": "Git & GitHub", "icon": "devicon-git-plain colored"},
                {"name": "MySQL", "icon": "devicon-mysql-plain colored"},
                {"name": "PostgreSQL", "icon": "devicon-postgresql-plain colored"}
            ]
        }
    ]

def get_certifications_data():
    return [
        {
            "id": 1,
            "title": "IIT Bombay – Data Science",
            "icon": "fa-graduation-cap",
            "description": "Certified in foundational and advanced Data Science methodologies, data analysis pipelines, and machine learning principles by IIT Bombay."
        },
        {
            "id": 2,
            "title": "LD Hackathon",
            "icon": "fa-trophy",
            "description": "Participated in rapid prototyping and software development competition at LD College of Engineering, building solutions under tight deadlines."
        },
        {
            "id": 3,
            "title": "LJ Hackathon",
            "icon": "fa-award",
            "description": "Showcased technical problem-solving, innovative application architecture, and team collaboration at the LJ University Hackathon event."
        }
    ]

def get_education_steps():
    return [
        {
            "num": "01",
            "period": "2021 – 2022",
            "title": "Stage 01: SSC Board Recon",
            "institution": "GSHSEB Board, Gandhinagar",
            "stats": "426 / 600 • 80.53 PR",
            "grade": "B1 Grade (Rank Cleared)",
            "shortPoints": [
                "Board Score: 426 / 600 (80.53 PR)",
                "Computer Practical: Grade A1 (Max)",
                "Sanskrit: 80/100 | Science: 74/100"
            ],
            "projectTitle": None,
            "type": "School Quest",
            "color": "#3b82f6",
            "marksheetId": "10th"
        },
        {
            "num": "02",
            "period": "2023 – 2024",
            "title": "Stage 02: 12th Science Stream",
            "institution": "GSHSEB Science Stream (Group A)",
            "stats": "466 / 650 • 81.62 PR",
            "grade": "B1 Overall (Rank Cleared)",
            "shortPoints": [
                "Mathematics: 92 / 100 (Grade A1)",
                "Chemistry: 85 / 100 (Grade A2)",
                "Physics: 77 / 100 (Grade B1)",
                "Computer Practical: 43 / 50 (Grade A2)"
            ],
            "projectTitle": None,
            "type": "HSC Board",
            "color": "#8b5cf6",
            "marksheetId": "12th"
        },
        {
            "num": "03",
            "period": "Sep 2024 – Feb 2025",
            "title": "Stage 03: Semester I",
            "institution": "LJ University, Ahmedabad",
            "stats": "7.13 SPI (Distinction)",
            "grade": "First Class with Distinction",
            "shortPoints": [
                "Mathematics-I: Grade A+",
                "MOOC: Intro to Java (LearnQuest)",
                "IOT & Hardware Labs: Grade A++"
            ],
            "projectTitle": "Boss: Hospital Management System",
            "projectDesc": "Core Java application for managing patient admissions, doctor appointment scheduling, room allocation & automated billing.",
            "tech": ["Java", "OOP", "File I/O"],
            "type": "Sem 1",
            "color": "#10b981",
            "marksheetId": "sem-1"
        },
        {
            "num": "04",
            "period": "Mar 2025 – Aug 2025",
            "title": "Stage 04: Semester II",
            "institution": "LJ University, Ahmedabad",
            "stats": "6.37 SPI (First Class)",
            "grade": "First Class",
            "shortPoints": [
                "Data Structures using Java: Grade A",
                "Database Management System: Grade B+",
                "MOOC: Java Data Structures (Penn)"
            ],
            "projectTitle": "Boss: Bharatiya Janta Mart",
            "projectDesc": "Java console e-commerce app integrated with MySQL via JDBC. Double Linked List + Stack cart system, OTP login & PAN validation.",
            "tech": ["Java", "JDBC", "MySQL", "Data Structures"],
            "type": "Sem 2",
            "color": "#f59e0b",
            "marksheetId": "sem-2"
        },
        {
            "num": "05",
            "period": "Sep 2025 – Feb 2026",
            "title": "Stage 05: Semester III",
            "institution": "LJ University, Ahmedabad",
            "stats": "8.17 SPI (Distinction)",
            "grade": "First Class with Distinction (Peak SPI)",
            "shortPoints": [
                "Digital Electronics: Grade A++",
                "Full Stack Development JS-1: Grade A+",
                "Fundamentals of CS using Python: Grade O",
                "MOOC: HTML, CSS & JS (IBM)"
            ],
            "projectTitle": "Boss: Tripzza Tours Platform",
            "projectDesc": "Full-stack Tour booking platform featuring booking workflow, payment analytics dashboard, PostgreSQL DB & automated PDF ticket engine.",
            "tech": ["React.js", "Express.js", "PostgreSQL", "PDF Engine"],
            "type": "Sem 3",
            "color": "#ec4899",
            "marksheetId": "sem-3"
        },
        {
            "num": "06",
            "period": "Mar 2026 – Aug 2026",
            "title": "Stage 06: Semester IV (Active)",
            "institution": "LJ University, Ahmedabad",
            "stats": "Active Stage IV",
            "grade": "In Combat // Active Quest",
            "shortPoints": [
                "Supervised Machine Learning Algorithms",
                "Data Science Pipelines (Pandas & NumPy)",
                "Cloud APIs & Backend Python Integrations"
            ],
            "projectTitle": "Raid: AgroVision AI Platform",
            "projectDesc": "AI-powered smart agriculture platform with supervised ML crop recommendation models based on weather, soil nutrients, and live commodity prices.",
            "tech": ["Python", "Machine Learning", "Pandas", "NumPy"],
            "type": "Sem 4",
            "color": "#22c55e",
            "isActive": True,
            "marksheetId": None
        },
        {
            "num": "07",
            "period": "Sep 2026 – Jun 2028",
            "title": "Stage 07: Semesters V – VIII",
            "institution": "LJ University, Ahmedabad",
            "stats": "B.Tech Roadmap",
            "grade": "Upcoming Specialization Missions",
            "shortPoints": [
                "Deep Learning & Neural Networks",
                "Natural Language Processing (NLP)",
                "MLOps & Cloud Model Deployment",
                "Final Year Capstone Industry Project"
            ],
            "projectTitle": None,
            "type": "Roadmap",
            "color": "#06b6d4",
            "marksheetId": None
        }
    ]
