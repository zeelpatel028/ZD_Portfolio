import React, { useState } from 'react';
import { playHoverSound, playClickSound } from '../utils/audioFx';

// Fallback lookup dictionary for known tech skills
const defaultSkillIcons = {
  'python': 'devicon-python-plain colored',
  'javascript': 'devicon-javascript-plain colored',
  'java': 'devicon-java-plain colored',
  'sql': 'devicon-azuresqldatabase-plain colored',
  'pandas': 'devicon-pandas-plain colored',
  'numpy': 'devicon-numpy-plain colored',
  'supervised learning': 'fa-solid fa-brain',
  'data preprocessing': 'fa-solid fa-filter',
  'model evaluation': 'fa-solid fa-chart-pie',
  'machine learning': 'fa-solid fa-brain',
  'react.js': 'devicon-react-original colored',
  'react': 'devicon-react-original colored',
  'express.js': 'devicon-express-original',
  'express': 'devicon-express-original',
  'django': 'devicon-django-plain colored',
  'restful apis': 'fa-solid fa-network-wired',
  'rest apis': 'fa-solid fa-network-wired',
  'jdbc': 'fa-solid fa-plug-circle-bolt',
  'vs code': 'devicon-vscode-plain colored',
  'jupyter notebook': 'devicon-jupyter-plain colored',
  'git & github': 'devicon-git-plain colored',
  'git': 'devicon-git-plain colored',
  'github': 'devicon-github-original',
  'mysql': 'devicon-mysql-plain colored',
  'postgresql': 'devicon-postgresql-plain colored',
  'html5': 'devicon-html5-plain colored',
  'css3': 'devicon-css3-plain colored',
  'node.js': 'devicon-nodejs-plain colored'
};

const defaultCategoryIcons = {
  'Programming Languages': 'fa-solid fa-code',
  'Machine Learning & Data': 'fa-solid fa-brain',
  'Web & Backend Development': 'fa-solid fa-layer-group',
  'Tools & Databases': 'fa-solid fa-screwdriver-wrench'
};

export default function Skills({ skillsData }) {
  const [activeFilter, setActiveFilter] = useState('All');

  if (!skillsData) return null;

  const filterCategories = ['All', ...skillsData.map(c => c.category)];

  const filteredSkills = activeFilter === 'All'
    ? skillsData
    : skillsData.filter(c => c.category === activeFilter);

  const totalSkillsCount = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);

  const getSkillIconClass = (skill) => {
    if (typeof skill === 'object' && skill !== null) {
      if (skill.icon) return skill.icon;
      const key = (skill.name || '').toLowerCase().trim();
      return defaultSkillIcons[key] || 'fa-solid fa-code';
    }
    const key = String(skill).toLowerCase().trim();
    return defaultSkillIcons[key] || 'fa-solid fa-code';
  };

  const getCategoryIconClass = (cat) => {
    if (cat.icon) {
      return cat.icon.startsWith('fa-') || cat.icon.startsWith('devicon-')
        ? cat.icon
        : `fa-solid ${cat.icon}`;
    }
    return defaultCategoryIcons[cat.category] || 'fa-solid fa-code';
  };

  const handleTabClick = (catName) => {
    playClickSound();
    setActiveFilter(catName);
  };

  return (
    <section className="section" id="skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fa-solid fa-code"></i> Tech Loadout // Skills
          </span>
          <h2 className="section-title gradient-text-anim">Skills & Technical Arsenal</h2>
          <div className="section-header-divider"></div>
          <p className="section-description">
            Combat-ready technical masteries across algorithmic programming, machine learning frameworks, scalable backend servers, and developer tooling.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="skills-filter-tabs">
          {filterCategories.map((catName, idx) => (
            <button
              key={idx}
              className={`skills-tab-btn ${activeFilter === catName ? 'active' : ''}`}
              onClick={() => handleTabClick(catName)}
              onMouseEnter={playHoverSound}
            >
              {catName === 'All' ? (
                <>
                  <i className="fa-solid fa-border-all"></i> All Loadouts ({totalSkillsCount})
                </>
              ) : (
                <>
                  <i className="fa-solid fa-terminal"></i> {catName}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className={`skills-grid ${filteredSkills.length === 1 ? 'single-category-grid' : ''}`}>
          {filteredSkills.map((cat, idx) => {
            const catIconClass = getCategoryIconClass(cat);

            return (
              <div
                key={idx}
                className="skill-card"
                onMouseEnter={playHoverSound}
              >
                {/* Top Accent Line */}
                <div className="skill-card-accent"></div>

                <div className="skill-card-header">
                  <div className="skill-icon-box">
                    <i className={catIconClass}></i>
                  </div>
                  <div>
                    <h3>{cat.category}</h3>
                    <span className="skill-count-badge">
                      {cat.skills.length} Weapons Equipped
                    </span>
                  </div>
                </div>

                <div className="skill-tags">
                  {cat.skills.map((s, sIdx) => {
                    const name = typeof s === 'object' && s !== null ? s.name : s;
                    const iconClass = getSkillIconClass(s);

                    return (
                      <span
                        key={sIdx}
                        className="skill-tag"
                        onMouseEnter={playHoverSound}
                      >
                        <i className={`skill-tag-icon ${iconClass}`}></i>
                        <span className="skill-tag-name">{name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
