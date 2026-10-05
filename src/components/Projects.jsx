import React from 'react';
import { playHoverSound, playClickSound } from '../utils/audioFx';

export default function Projects({ projectsData }) {
  if (!projectsData) return null;

  return (
    <section className="section" id="projects" style={{ background: 'var(--bg-section-alt)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fa-solid fa-diagram-project"></i> Mission Log // Projects
          </span>
          <h2 className="section-title gradient-text-anim">Projects & Tactical Builds</h2>
          <div className="section-header-divider"></div>
          <p className="section-description">
            A battle-tested deployment log of public GitHub operations ranging from AI/ML recommendation engines to full-stack transactional platforms and core Java data structures.
          </p>
        </div>

        <div className="projects-grid">
          {projectsData.map((proj, idx) => (
            <div
              key={proj.id}
              className="project-card"
              onMouseEnter={playHoverSound}
            >
              <div className="project-body">
                <div className="project-header">
                  <span className={`project-status ${proj.status === 'Completed' ? 'status-completed' : 'status-in-progress'}`}>
                    {proj.status === 'Completed' ? 'MISSION CLEARED' : 'ACTIVE MISSION'}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-taupe)', fontWeight: '700', fontFamily: 'var(--font-hud)' }}>
                    <i className="fa-solid fa-code-commit"></i> {proj.repoName || 'GitHub Repo'}
                  </span>
                </div>

                <h3 className="project-title">
                  {proj.title}
                </h3>
                
                <p className="project-desc">{proj.description}</p>

                {/* Key Capabilities */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <h4 style={{ fontSize: '0.86rem', color: 'var(--color-peach)', marginBottom: '0.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Tactical Architecture & Specs:
                  </h4>
                  <ul className="project-features">
                    {proj.features.map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Equipment */}
                <div className="project-tech" style={{ marginBottom: '1.5rem', marginTop: 'auto' }}>
                  {proj.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-badge">{tech}</span>
                  ))}
                </div>

                {/* Launch Links */}
                <div style={{ display: 'flex', gap: '0.8rem', paddingTop: '1.1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, textDecoration: 'none' }}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    <i className="fa-brands fa-github"></i> Deploy Repo
                  </a>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
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
