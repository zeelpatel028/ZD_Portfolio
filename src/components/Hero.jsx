import React from 'react';
import { playHoverSound, playClickSound } from '../utils/audioFx';

export default function Hero({ profile, semData }) {
  const currentSem = semData?.currentSemester || 4;

  return (
    <section className="hero" id="hero">
      {/* High-Level Ambient Floating Background Orbs */}
      <div className="hero-ambient-orb-1" aria-hidden="true"></div>
      <div className="hero-ambient-orb-2" aria-hidden="true"></div>

      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-tag" onMouseEnter={playHoverSound}>
            <span className="dot pulse"></span>
            <span className="hero-tag-text">PLAYER 1: B.TECH CSE // LJ UNIVERSITY (SEM {currentSem})</span>
          </div>

          <h1 className="hero-title">
            I AM <span className="highlight gradient-text-anim">{profile?.name || 'ZEEL DOBARIYA'}</span>
          </h1>

          <p className="hero-subtitle">
            <i className="fa-solid fa-gamepad" style={{ color: 'var(--color-peach)' }}></i>
            <span>{profile?.title || 'Aspiring ML Engineer | Data Scientist | Backend Python Developer'}</span>
          </p>

          <p className="hero-description">
            Architecting intelligent machine learning pipelines, engineering robust algorithmic data structures, and deploying high-performance full-stack applications with Python, Java, React, and SQL.
          </p>

          <div className="hero-buttons">
            <a
              href="#projects"
              className="btn btn-primary"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <i className="fa-solid fa-crosshairs"></i> Enter Missions
            </a>
            <a
              href={profile?.resumeUrl || '/Zeel_Dobariya_python.pdf'}
              download="Zeel_Dobariya_Resume.pdf"
              className="btn btn-outline"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <i className="fa-solid fa-download"></i> Loot Resume
            </a>
            <a
              href="#contact"
              className="btn btn-outline"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <i className="fa-solid fa-satellite-dish"></i> Comms Relay
            </a>
          </div>

          {/* Combat & Intelligence Stats HUD */}
          <div className="hero-stats-bar">
            <div className="hero-stat-box" onMouseEnter={playHoverSound}>
              <div className="num">8.17</div>
              <div className="lbl">Peak Power (SPI)</div>
            </div>
            <div className="hero-stat-box" onMouseEnter={playHoverSound}>
              <div className="num">81.62%</div>
              <div className="lbl">Science Precision</div>
            </div>
            <div className="hero-stat-box" onMouseEnter={playHoverSound}>
              <div className="num">80.53%</div>
              <div className="lbl">Board IQ Rate</div>
            </div>
            <div className="hero-stat-box" onMouseEnter={playHoverSound}>
              <div className="num">6+</div>
              <div className="lbl">Arsenal Apps</div>
            </div>
          </div>
        </div>

        {/* Character Avatar Card & Holographic HUD Frame */}
        <div className="hero-card">
          <div className="hero-avatar-wrapper" onMouseEnter={playHoverSound}>
            <div className="hero-avatar-inner">
              <img
                src={profile?.logoUrl || '/ZD.png'}
                alt="Zeel Dobariya Avatar Logo"
                className="hero-avatar-img"
              />
            </div>
          </div>

          <div className="hero-badges-wrapper">
            <div className="floating-badge floating-badge-1" onMouseEnter={playHoverSound}>
              <div className="badge-icon"><i className="fa-solid fa-brain"></i></div>
              <div className="badge-text">
                <div className="val">ML Core Module</div>
                <div className="lbl">Predictive AI & Pandas</div>
              </div>
            </div>

            <div className="floating-badge floating-badge-2" onMouseEnter={playHoverSound}>
              <div className="badge-icon"><i className="fa-solid fa-terminal"></i></div>
              <div className="badge-text">
                <div className="val">Backend Engine</div>
                <div className="lbl">Python, Java & PostgreSQL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
