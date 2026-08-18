import React, { useState } from 'react';
import { playHoverSound, playClickSound, playLevelUpSound, playModalOpenSound } from '../utils/audioFx';

export default function EducationTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const steps = [
    {
      num: '01',
      period: '2021 – 2022',
      title: 'Stage 01: SSC Board Recon',
      institution: 'GSHSEB Board, Gandhinagar',
      stats: '426 / 600 • 80.53 PR',
      grade: 'B1 Grade (Rank Cleared)',
      shortPoints: [
        'Board Score: 426 / 600 (80.53 PR)',
        'Computer Practical: Grade A1 (Max)',
        'Sanskrit: 80/100 | Science: 74/100'
      ],
      projectTitle: null,
      type: 'School Quest',
      color: '#3b82f6',
      marksheetId: '10th'
    },
    {
      num: '02',
      period: '2023 – 2024',
      title: 'Stage 02: 12th Science Stream',
      institution: 'GSHSEB Science Stream (Group A)',
      stats: '466 / 650 • 81.62 PR',
      grade: 'B1 Overall (Rank Cleared)',
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
      title: 'Stage 03: Semester I',
      institution: 'LJ University, Ahmedabad',
      stats: '7.13 SPI (Distinction)',
      grade: 'First Class with Distinction',
      shortPoints: [
        'Mathematics-I: Grade A+',
        'MOOC: Intro to Java (LearnQuest)',
        'IOT & Hardware Labs: Grade A++'
      ],
      projectTitle: 'Boss: Hospital Management System',
      projectDesc: 'Core Java application for managing patient admissions, doctor appointment scheduling, room allocation & automated billing.',
      tech: ['Java', 'OOP', 'File I/O'],
      type: 'Sem 1',
      color: '#10b981',
      marksheetId: 'sem-1'
    },
    {
      num: '04',
      period: 'Mar 2025 – Aug 2025',
      title: 'Stage 04: Semester II',
      institution: 'LJ University, Ahmedabad',
      stats: '6.37 SPI (First Class)',
      grade: 'First Class',
      shortPoints: [
        'Data Structures using Java: Grade A',
        'Database Management System: Grade B+',
        'MOOC: Java Data Structures (Penn)'
      ],
      projectTitle: 'Boss: Bharatiya Janta Mart',
      projectDesc: 'Java console e-commerce app integrated with MySQL via JDBC. Double Linked List + Stack cart system, OTP login & PAN validation.',
      tech: ['Java', 'JDBC', 'MySQL', 'Data Structures'],
      type: 'Sem 2',
      color: '#f59e0b',
      marksheetId: 'sem-2'
    },
    {
      num: '05',
      period: 'Sep 2025 – Feb 2026',
      title: 'Stage 05: Semester III',
      institution: 'LJ University, Ahmedabad',
      stats: '8.17 SPI (Distinction)',
      grade: 'First Class with Distinction (Peak SPI)',
      shortPoints: [
        'Digital Electronics: Grade A++',
        'Full Stack Development JS-1: Grade A+',
        'Fundamentals of CS using Python: Grade O',
        'MOOC: HTML, CSS & JS (IBM)'
      ],
      projectTitle: 'Boss: Tripzza Tours Platform',
      projectDesc: 'Full-stack Tour booking platform featuring booking workflow, payment analytics dashboard, PostgreSQL DB & automated PDF ticket engine.',
      tech: ['React.js', 'Express.js', 'PostgreSQL', 'PDF Engine'],
      type: 'Sem 3',
      color: '#ec4899',
      marksheetId: 'sem-3'
    },
    {
      num: '06',
      period: 'Mar 2026 – Aug 2026',
      title: 'Stage 06: Semester IV (Active)',
      institution: 'LJ University, Ahmedabad',
      stats: 'Active Stage IV',
      grade: 'In Combat // Active Quest',
      shortPoints: [
        'Supervised Machine Learning Algorithms',
        'Data Science Pipelines (Pandas & NumPy)',
        'Cloud APIs & Backend Python Integrations'
      ],
      projectTitle: 'Raid: AgroVision AI Platform',
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
      title: 'Stage 07: Semesters V – VIII',
      institution: 'LJ University, Ahmedabad',
      stats: 'B.Tech Roadmap',
      grade: 'Upcoming Specialization Missions',
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

  const handleOpenMilestone = (step) => {
    playModalOpenSound();
    setSelectedMilestone(step);
  };

  const handleCloseMilestone = () => {
    playClickSound();
    setSelectedMilestone(null);
  };

  return (
    <div className="svg-timeline-wrapper">
      {/* Timeline Section Sub-Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-subtitle">
          <i className="fa-solid fa-route"></i> Campaign Quest Pathway
        </span>
        <h3 style={{ fontSize: '1.9rem', marginTop: '0.4rem', color: 'var(--color-peach)' }}>
          Academic Campaign Roadmap
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginTop: '0.3rem', fontFamily: 'var(--font-hud)' }}>
          ↔ Scroll horizontally to explore all campaign stages • Click any card for Hologram Telemetry
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

              <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Winding Laser Outer Stroke */}
            <path
              d="M 60,240 C 180,80 300,80 420,240 C 540,400 660,400 780,240 C 900,80 1020,80 1140,240 C 1260,400 1380,400 1500,240 C 1600,100 1680,100 1710,240"
              fill="none"
              stroke="url(#roadGradLine)"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Dashed Center Laser Pulse Line */}
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
                  onMouseEnter={playHoverSound}
                  onClick={() => handleOpenMilestone(step)}
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

                  {/* Boss Project Tag */}
                  {step.projectTitle && (
                    <div className="scroll-project-tag">
                      <i className="fa-solid fa-skull"></i> {step.projectTitle}
                    </div>
                  )}

                  <div className="scroll-hover-hint">
                    <i className="fa-solid fa-expand"></i> Inspect Holo
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== EXPANDED HOLOGRAM DETAIL MODAL ==================== */}
      {selectedMilestone && (
        <div className="big-card-backdrop" onClick={handleCloseMilestone}>
          <div className="big-card-modal" onClick={e => e.stopPropagation()}>
            <button className="big-card-close" onClick={handleCloseMilestone}>
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

              {/* Coursework List */}
              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-peach)', marginBottom: '0.6rem' }}>
                  <i className="fa-solid fa-list-check"></i> Missions & Performance Telemetry:
                </h4>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.6' }}>
                  {selectedMilestone.shortPoints.map((pt, pIdx) => (
                    <li key={pIdx} style={{ marginBottom: '0.35rem' }}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Boss Project Feature Box */}
              {selectedMilestone.projectTitle && (
                <div className="big-card-project">
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--color-peach)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fa-solid fa-laptop-code"></i> {selectedMilestone.projectTitle}
                  </h4>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                    {selectedMilestone.projectDesc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {selectedMilestone.tech.map((t, tIdx) => (
                      <span key={tIdx} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="big-card-footer">
              <button className="btn btn-outline btn-sm" onClick={handleCloseMilestone}>
                Close Holo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
