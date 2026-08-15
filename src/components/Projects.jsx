import React from 'react';

export default function Projects({ projectsData }) {
  if (!projectsData) return null;

  return (
    <section className="section" id="projects" style={{ background: 'var(--bg-section-alt)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fa-brands fa-github"></i> Public Repositories (github.com/zeelpatel028)
          </span>
          <h2 className="section-title gradient-text-anim">Innovative Software & AI/ML Projects</h2>
          <p className="section-description">
            A comprehensive showcase of my public GitHub projects, ranging from AI & Machine Learning models to full-stack web applications and core Java data structures.
          </p>
        </div>

        <div className="projects-grid">
          {projectsData.map(proj => (
            <div key={proj.id} className="project-card hover-lift-3d">
              <div className="project-body">
                <div className="project-header">
                  <span className={`project-status ${proj.status === 'Completed' ? 'status-completed' : 'status-in-progress'}`}>
                    {proj.status}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-espresso)', fontWeight: '800' }}>
                    <i className="fa-solid fa-code-commit"></i> {proj.repoName || 'GitHub Repo'}
                  </span>
                </div>

                <h3 className="project-title">
                  {proj.title}
                </h3>
                
                <p className="project-desc">{proj.description}</p>

                {/* Key Features List */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <h4 style={{ fontSize: '0.86rem', color: 'var(--color-espresso)', marginBottom: '0.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Key Capabilities & Architecture:
                  </h4>
                  <ul className="project-features">
                    {proj.features.map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div className="project-tech" style={{ marginBottom: '1.5rem' }}>
                  {proj.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-badge">{tech}</span>
                  ))}
                </div>

                {/* GitHub Repository Link Button */}
                <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'auto', paddingTop: '1.1rem', borderTop: '1px solid var(--border-light)' }}>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm hover-lift-3d"
                    style={{ flex: 1, textDecoration: 'none' }}
                  >
                    <i className="fa-brands fa-github"></i> View GitHub Repo
                  </a>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm hover-lift-3d"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> Open
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
