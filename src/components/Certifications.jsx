import React from 'react';
import { playHoverSound } from '../utils/audioFx';

export default function Certifications({ certsData }) {
  if (!certsData) return null;

  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fa-solid fa-trophy"></i> Trophy Room // Certifications
          </span>
          <h2 className="section-title gradient-text-anim">Certifications & Honors</h2>
          <div className="section-header-divider"></div>
          <p className="section-description">
            Prestigious credentials and honors earned in high-intensity competitive hackathons and advanced Data Science pipelines.
          </p>
        </div>

        <div className="cert-grid">
          {certsData.map(c => (
            <div
              key={c.id}
              className="cert-card"
              onMouseEnter={playHoverSound}
            >
              <div className="cert-icon"><i className={`fa-solid ${c.icon}`}></i></div>
              <div className="cert-info">
                <h4>{c.title}</h4>
                <p>{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
