import React from 'react';

export default function Skills({ skillsData }) {
  if (!skillsData) return null;

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Technical Proficiency</span>
          <h2 className="section-title gradient-text-anim">Skills & Technologies</h2>
          <p className="section-description">
            Core technical competencies across programming, machine learning frameworks, backend architecture, and development tools.
          </p>
        </div>

        <div className="skills-grid">
          {skillsData.map((cat, idx) => (
            <div key={idx} className="skill-card hover-lift-3d">
              <div className="skill-card-header">
                <div className="skill-icon-box">
                  {cat.categoryBanner ? (
                    <img src={cat.categoryBanner} alt={cat.category} className="skill-category-banner-img" />
                  ) : (
                    <div className="skill-icon"><i className={`fa-solid ${cat.icon}`}></i></div>
                  )}
                </div>
                <h3>{cat.category}</h3>
              </div>

              <div className="skill-tags">
                {cat.skills.map((s, sIdx) => {
                  const isObj = typeof s === 'object' && s !== null;
                  const name = isObj ? s.name : s;
                  const iconUrl = isObj ? s.iconUrl : null;

                  return (
                    <span key={sIdx} className="skill-tag skill-tag-with-img hover-lift-3d">
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt={name}
                          className="skill-logo-img"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <span>{name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
