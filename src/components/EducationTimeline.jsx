import React, { useState } from 'react';

export default function EducationTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const steps = [
    {
      num: '01',
      period: '2021 – 2022',
      title: '10th Standard (SSC)',
      institution: 'GSHSEB Board, Gandhinagar',
      stats: '426 / 600 • 80.53 PR',
      grade: 'B1 Grade (Qualified)',
      shortPoints: [
        'Board Marks: 426 / 600 (80.53 PR)',
        'Computer Practical: Grade A1',
        'Sanskrit: 80/100 (B1) | Science: 74/100 (B1)'
      ],
      projectTitle: null,
      type: 'School',
      color: '#3b82f6',
      marksheetId: '10th'
    },
    {
      num: '02',
      period: '2023 – 2024',
      title: '12th Science (HSC)',
      institution: 'GSHSEB Science Stream (Group A)',
      stats: '466 / 650 • 81.62 Science PR',
      grade: 'B1 Overall Grade',
      shortPoints: [
        'Mathematics: 92 / 100 (Grade A1)',
        'Chemistry: 85 / 100 (Grade A2)',
        'Physics: 77 / 100 (Grade B1)',
        'Computer Practical: 43 / 50 (Grade A2)'
      ],
      projectTitle: null,
      type: 'HSC Board',
      color: '#8b5cf6',
      marksheetId: '12th'
    },
    {
      num: '03',
      period: 'Sep 2024 – Feb 2025',
      title: 'Semester I',
      institution: 'LJ University, Ahmedabad',
      stats: '7.13 SPI (Distinction)',
      grade: 'First Class with Distinction',
      shortPoints: [
        'Mathematics-I: Grade A+',
        'MOOC: Intro to Java (LearnQuest)',
        'IOT & Computer Workshops: Grade A++'
      ],
      projectTitle: 'Hospital Management System',
      projectDesc: 'Core Java application for managing patient admissions, doctor appointment scheduling, room allocation & automated billing.',
      tech: ['Java', 'OOP', 'File I/O'],
      type: 'Sem 1',
      color: '#10b981',
      marksheetId: 'sem-1'
    },
    {
      num: '04',
      period: 'Mar 2025 – Aug 2025',
      title: 'Semester II',
      institution: 'LJ University, Ahmedabad',
      stats: '6.37 SPI (First Class)',
      grade: 'First Class',
      shortPoints: [
        'Data Structures using Java: Grade A',
        'Database Management System: Grade B+',
        'MOOC: Java Data Structures (Penn)'
      ],
      projectTitle: 'Bharatiya Janta Mart',
      projectDesc: 'Java console e-commerce app integrated with MySQL via JDBC. Double Linked List + Stack cart system, OTP login & PAN validation.',
      tech: ['Java', 'JDBC', 'MySQL', 'Data Structures'],
      type: 'Sem 2',
      color: '#f59e0b',
      marksheetId: 'sem-2'
    },
    {
      num: '05',
      period: 'Sep 2025 – Feb 2026',
      title: 'Semester III',
      institution: 'LJ University, Ahmedabad',
      stats: '8.17 SPI (Distinction)',
      grade: 'First Class with Distinction',
      shortPoints: [
        'Digital Electronics: Grade A++',
        'Full Stack Development JS-1: Grade A+',
        'Fundamentals of CS using Python: Grade O',
        'MOOC: HTML, CSS & JS (IBM)'
      ],
      projectTitle: 'Tripzza Tours',
      projectDesc: 'Full-stack Tour booking platform featuring booking workflow, payment analytics dashboard, PostgreSQL DB & automated PDF ticket engine.',
      tech: ['React.js', 'Express.js', 'PostgreSQL', 'PDF Engine'],
      type: 'Sem 3',
      color: '#ec4899',
      marksheetId: 'sem-3'
    },
    {
      num: '06',
      period: 'Mar 2026 – Aug 2026',
      title: 'Semester IV (Active)',
      institution: 'LJ University, Ahmedabad',
      stats: 'Active Semester IV',
      grade: 'In Progress',
      shortPoints: [
        'Supervised Machine Learning Algorithms',
        'Data Science Pipelines (Pandas & NumPy)',
        'Cloud APIs & Backend Python Integrations'
      ],
      projectTitle: 'AgroVision',
      projectDesc: 'AI-powered smart agriculture platform with supervised ML crop recommendation models based on weather, soil nutrients, and live commodity prices.',
      tech: ['Python', 'Machine Learning', 'Pandas', 'NumPy'],
      type: 'Sem 4',
      color: '#22c55e',
      isActive: true,
      marksheetId: null
    },
    {
      num: '07',
      period: 'Sep 2026 – Jun 2028',
      title: 'Semesters V – VIII',
      institution: 'LJ University, Ahmedabad',
      stats: 'B.Tech Roadmap',
      grade: 'Upcoming Specialization',
      shortPoints: [
        'Deep Learning & Neural Networks',
        'Natural Language Processing (NLP)',
        'MLOps & Cloud Model Deployment',
        'Final Year Capstone Industry Project'
      ],
      projectTitle: null,
      type: 'Roadmap',
      color: '#06b6d4',
      marksheetId: null
    }
  ];

  return (
    <div className="svg-timeline-wrapper">
      {/* Timeline Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
        <span className="section-subtitle"><i className="fa-solid fa-route"></i> Academic Roadmap</span>
        <h3 style={{ fontSize: '1.85rem', marginTop: '0.4rem', color: 'var(--color-peach)' }}>
          Curved Milestone Pathway
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
          ↔ Scroll horizontally to explore all milestones • Click any block to view full details
        </p>
      </div>

      {/* Horizontal Scrollable Track Container */}
      <div className="timeline-scroll-track">
        <div className="curved-timeline-canvas-scroll">
          {/* Continuous Winding SVG Vector Road Track */}
          <svg className="timeline-svg-road-scroll" viewBox="0 0 1750 480" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roadGradLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                <stop offset="20%" stopColor="#8b5cf6" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#10b981" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.85" />
                <stop offset="80%" stopColor="#ec4899" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.95" />
              </linearGradient>

              <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Winding Road Outer Stroke */}
            <path
              d="M 60,240 C 180,80 300,80 420,240 C 540,400 660,400 780,240 C 900,80 1020,80 1140,240 C 1260,400 1380,400 1500,240 C 1600,100 1680,100 1710,240"
              fill="none"
              stroke="url(#roadGradLine)"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Dashed Center Road Line */}
            <path
              d="M 60,240 C 180,80 300,80 420,240 C 540,400 660,400 780,240 C 900,80 1020,80 1140,240 C 1260,400 1380,400 1500,240 C 1600,100 1680,100 1710,240"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Node Dots on SVG Curve */}
            <circle cx="120" cy="160" r="10" fill="#3b82f6" filter="url(#nodeGlow)" />
            <circle cx="360" cy="160" r="10" fill="#8b5cf6" filter="url(#nodeGlow)" />
            <circle cx="600" cy="320" r="10" fill="#10b981" filter="url(#nodeGlow)" />
            <circle cx="840" cy="160" r="10" fill="#f59e0b" filter="url(#nodeGlow)" />
            <circle cx="1080" cy="160" r="10" fill="#ec4899" filter="url(#nodeGlow)" />
            <circle cx="1320" cy="320" r="12" fill="#22c55e" filter="url(#nodeGlow)" />
            <circle cx="1560" cy="160" r="10" fill="#06b6d4" filter="url(#nodeGlow)" />
          </svg>

          {/* Staggered Milestone Cards Layer */}
          <div className="cards-scroll-layer">
            {steps.map((step, idx) => {
              const isTop = idx % 2 === 0;
              return (
                <div
                  key={step.num}
                  className={`scroll-block-card ${isTop ? 'scroll-align-top' : 'scroll-align-bottom'} ${step.isActive ? 'block-active' : ''}`}
                  onMouseEnter={() => setSelectedMilestone(step)}
                  onClick={() => setSelectedMilestone(step)}
                >
                  {/* Badge Number */}
                  <div className="scroll-num-tag" style={{ background: step.color }}>
                    {step.num}
                  </div>

                  <div className="scroll-card-header">
                    <span className="scroll-period">{step.period}</span>
                    <span className="scroll-type" style={{ color: step.color }}>{step.type}</span>
                  </div>

                  <h4 className="scroll-title">{step.title}</h4>
                  <div className="scroll-stat-badge">{step.stats}</div>

                  {/* Concise Summary Points */}
                  <ul className="scroll-short-list">
                    {step.shortPoints.slice(0, 2).map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>

                  {/* Short Project Tag */}
                  {step.projectTitle && (
                    <div className="scroll-project-tag">
                      <i className="fa-solid fa-folder-open"></i> {step.projectTitle}
                    </div>
                  )}

                  <div className="scroll-hover-hint">
                    <i className="fa-solid fa-expand"></i> Click for Details
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== EXPANDED DETAIL MODAL / BIG CARD ==================== */}
      {selectedMilestone && (
        <div className="big-card-backdrop" onClick={() => setSelectedMilestone(null)}>
          <div className="big-card-modal" onClick={e => e.stopPropagation()}>
            <button className="big-card-close" onClick={() => setSelectedMilestone(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="big-card-header" style={{ borderLeft: `6px solid ${selectedMilestone.color}` }}>
              <div className="big-card-num" style={{ background: selectedMilestone.color }}>
                {selectedMilestone.num}
              </div>
              <div>
                <span className="big-card-period">{selectedMilestone.period} • {selectedMilestone.type}</span>
                <h3 className="big-card-title">{selectedMilestone.title}</h3>
                <p className="big-card-institution">{selectedMilestone.institution}</p>
              </div>
            </div>

            <div className="big-card-body">
              {/* Highlight Stats Pill */}
              <div className="big-card-stat-pill">
                <i className="fa-solid fa-award"></i> {selectedMilestone.stats} ({selectedMilestone.grade})
              </div>

              {/* Full Points List */}
              <div style={{ marginBottom: '1.2rem' }}>
                <h4 style={{ fontSize: '0.98rem', color: 'var(--color-espresso)', marginBottom: '0.6rem' }}>
                  <i className="fa-solid fa-list-check"></i> Coursework & Performance Highlights:
                </h4>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {selectedMilestone.shortPoints.map((pt, pIdx) => (
                    <li key={pIdx} style={{ marginBottom: '0.35rem' }}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Full Project Feature Box */}
              {selectedMilestone.projectTitle && (
                <div className="big-card-project">
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--color-espresso)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fa-solid fa-laptop-code"></i> {selectedMilestone.projectTitle}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                    {selectedMilestone.projectDesc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {selectedMilestone.tech.map((t, tIdx) => (
                      <span key={tIdx} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="big-card-footer">
              {selectedMilestone.marksheetId && (
                <a href="#marksheets" className="btn btn-primary btn-sm" onClick={() => setSelectedMilestone(null)}>
                  <i className="fa-solid fa-file-invoice"></i> View Verified Marksheet
                </a>
              )}
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedMilestone(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
