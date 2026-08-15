import React from 'react';
import SemesterWidget from './SemesterWidget';

export default function About({ semData }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">About Me</span>
          <h2 className="section-title">Passion for AI, Data & Robust Systems</h2>
          <p className="section-description">
            A computer science engineering student driven by problem-solving, structured algorithms, and continuous learning.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--color-peach)' }}>Background & Focus</h3>
            <p className="about-text">
              I am currently pursuing my <strong>B.Tech in Computer Science Engineering</strong> at <strong>LJ University, Ahmedabad (2024–2028)</strong>. My technical focus bridges the gap between machine learning intelligence and backend software development.
            </p>
            <p className="about-text">
              From crafting algorithmic solutions in Java and Python to building data-driven platforms like <em>AgroVision</em> and full-stack web applications like <em>Tripzza</em>, I aim to build software that creates real-world impact.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <i className="fa-solid fa-robot"></i>
                <h4>Machine Learning</h4>
                <p>Predictive modeling, Pandas, NumPy, Scikit-Learn</p>
              </div>
              <div className="highlight-item">
                <i className="fa-solid fa-server"></i>
                <h4>Backend Dev</h4>
                <p>Python, Express.js, Java JDBC, MySQL, PostgreSQL</p>
              </div>
            </div>
          </div>

          <SemesterWidget semData={semData} />
        </div>
      </div>
    </section>
  );
}
