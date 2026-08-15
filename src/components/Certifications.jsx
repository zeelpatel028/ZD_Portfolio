import React from 'react';

export default function Certifications({ certsData }) {
  if (!certsData) return null;

  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Accomplishments</span>
          <h2 className="section-title gradient-text-anim">Certifications & Competitions</h2>
          <p className="section-description">
            Recognitions and credentials earned in machine learning, data science, and competitive hackathons.
          </p>
        </div>

        <div className="cert-grid">
          {certsData.map(c => (
            <div key={c.id} className="cert-card hover-lift-3d">
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
