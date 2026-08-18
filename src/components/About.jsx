import React from 'react';
import SemesterWidget from './SemesterWidget';
import { playHoverSound } from '../utils/audioFx';

export default function About({ semData }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fa-solid fa-id-card-clip"></i> Operative Dossier // Specs
          </span>
          <h2 className="section-title gradient-text-anim">Character Lore & Specs</h2>
          <p className="section-description">
            A relentless Computer Science Engineer driven by algorithmic precision, machine learning model optimization, and scalable backend architecture.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card" onMouseEnter={playHoverSound}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem', color: 'var(--color-peach)' }}>
              <i className="fa-solid fa-microchip"></i> Core Objectives & Background
            </h3>
            <p className="about-text">
              Currently advancing through my <strong>B.Tech in Computer Science Engineering</strong> at <strong>LJ University, Ahmedabad (2024–2028)</strong>. My primary combat spec bridges the gap between deep machine learning intelligence and rock-solid backend systems.
            </p>
            <p className="about-text">
              From engineering core data structures in Java & Python to training predictive crop recommendation engines in <em>AgroVision</em> and deploying full-stack travel booking portals in <em>Tripzza</em>, my focus is building software with tangible impact.
            </p>

            <div className="about-highlights">
              <div className="highlight-item" onMouseEnter={playHoverSound}>
                <i className="fa-solid fa-brain"></i>
                <h4>ML & Data Science</h4>
                <p>Supervised Learning, Pandas, NumPy, Scikit-Learn pipelines</p>
              </div>
              <div className="highlight-item" onMouseEnter={playHoverSound}>
                <i className="fa-solid fa-server"></i>
                <h4>Backend & APIs</h4>
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
