import React, { useState } from 'react';

export default function Skills({ skillsData }) {
  const [activeFilter, setActiveFilter] = useState('All');

  if (!skillsData) return null;

  const filterCategories = ['All', ...skillsData.map(c => c.category)];

  const filteredSkills = activeFilter === 'All'
    ? skillsData
    : skillsData.filter(c => c.category === activeFilter);

  // Quick stats counter
  const totalSkillsCount = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section className="section" id="skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fa-solid fa-layer-group"></i> Technical Proficiency
          </span>
          <h2 className="section-title gradient-text-anim">Skills & Technologies</h2>
          <p className="section-description">
            Core technical competencies across programming, machine learning frameworks, backend architecture, and modern developer tooling.
          </p>
        </div>

        {/* Featured Top Tech Bar */}
        <div className="featured-tech-bar animate-fade-in">
          <div className="featured-tech-label">
            <span className="featured-dot"></span> Core Stack Highlights:
          </div>
          <div className="featured-tech-pills">
            <span className="featured-pill"><img src="https://cdn.jsdelivr.net/gh/devicon/devicon/icons/python/python-original.svg" alt="Python" /> Python</span>
            <span className="featured-pill"><img src="https://cdn.jsdelivr.net/gh/devicon/devicon/icons/pandas/pandas-original.svg" alt="ML & Data" /> ML & Data</span>
            <span className="featured-pill"><img src="https://cdn.jsdelivr.net/gh/devicon/devicon/icons/react/react-original.svg" alt="React" /> React.js</span>
            <span className="featured-pill"><img src="https://cdn.jsdelivr.net/gh/devicon/devicon/icons/java/java-original.svg" alt="Java" /> Java & JDBC</span>
            <span className="featured-pill"><img src="https://cdn.jsdelivr.net/gh/devicon/devicon/icons/express/express-original.svg" alt="Express" /> Express.js</span>
            <span className="featured-pill"><img src="https://cdn.jsdelivr.net/gh/devicon/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" /> PostgreSQL</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="skills-filter-tabs">
          {filterCategories.map((catName, idx) => (
            <button
              key={idx}
              className={`skills-tab-btn ${activeFilter === catName ? 'active' : ''}`}
              onClick={() => setActiveFilter(catName)}
            >
              {catName === 'All' ? (
                <>
                  <i className="fa-solid fa-border-all"></i> All Skills ({totalSkillsCount})
                </>
              ) : (
                <>
                  <i className="fa-solid fa-code-branch"></i> {catName}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((cat, idx) => (
            <div key={idx} className="skill-card hover-lift-3d">
              {/* Top Accent Line */}
              <div className="skill-card-accent"></div>

              <div className="skill-card-header">
                <div className="skill-icon-box">
                  {cat.categoryBanner ? (
                    <img src={cat.categoryBanner} alt={cat.category} className="skill-category-banner-img" />
                  ) : (
                    <div className="skill-icon"><i className={`fa-solid ${cat.icon}`}></i></div>
                  )}
                </div>
                <div>
                  <h3>{cat.category}</h3>
                  <span className="skill-count-badge">
                    {cat.skills.length} Technologies
                  </span>
                </div>
              </div>

              <div className="skill-tags">
                {cat.skills.map((s, sIdx) => {
                  const isObj = typeof s === 'object' && s !== null;
                  const name = isObj ? s.name : s;
                  const iconUrl = isObj ? s.iconUrl : null;

                  return (
                    <span key={sIdx} className="skill-tag skill-tag-with-img hover-lift-3d">
                      {iconUrl ? (
                        <img
                          src={iconUrl}
                          alt={name}
                          className="skill-logo-img"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <i className="fa-solid fa-code skill-default-icon"></i>
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
