export const defaultProfile = {
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
};

export const defaultSemData = {
  currentSemester: 4,
  progressPercent: 50,
  totalSemesters: 8,
  startDate: '2024-09-01',
  endDate: '2028-08-31',
  semesters: [
    { sem: 1, name: 'Semester I', start: '2024-09-01', end: '2025-02-28', period: 'Sep 2024 – Feb 2025', status: 'Completed' },
    { sem: 2, name: 'Semester II', start: '2025-03-01', end: '2025-08-31', period: 'Mar 2025 – Aug 2025', status: 'Completed' },
    { sem: 3, name: 'Semester III', start: '2025-09-01', end: '2026-02-28', period: 'Sep 2025 – Feb 2026', status: 'Completed' },
    { sem: 4, name: 'Semester IV', start: '2026-03-01', end: '2026-08-31', period: 'Mar 2026 – Aug 2026', status: 'Active' },
    { sem: 5, name: 'Semester V', start: '2026-09-01', end: '2027-02-28', period: 'Sep 2026 – Feb 2027', status: 'Upcoming' },
    { sem: 6, name: 'Semester VI', start: '2027-03-01', end: '2027-08-31', period: 'Mar 2027 – Aug 2027', status: 'Upcoming' },
    { sem: 7, name: 'Semester VII', start: '2027-09-01', end: '2028-02-29', period: 'Sep 2027 – Feb 2028', status: 'Upcoming' },
    { sem: 8, name: 'Semester VIII', start: '2028-03-01', end: '2028-08-31', period: 'Mar 2028 – Aug 2028', status: 'Upcoming' }
  ]
};

export const defaultProjects = [
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
];

export const defaultSkills = [
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
];

export const defaultCerts = [
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
];
