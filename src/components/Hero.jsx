import React from 'react';

export default function Hero({ profile, semData }) {
  const currentSem = semData?.currentSemester || 5;

  return (
    <section className="hero" id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* High-Level Ambient Floating Background Orbs */}
      <div className="hero-ambient-orb-1" aria-hidden="true"></div>
      <div className="hero-ambient-orb-2" aria-hidden="true"></div>

      <div className="container hero-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <div className="hero-tag sonar-pulse-container">
            <span className="dot pulse"></span>
            <span>B.Tech Computer Science Engineering • LJ University</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="highlight gradient-text-anim">{profile?.name || 'Zeel Dobariya'}</span>
          </h1>

          <p className="hero-subtitle">
            {profile?.title || 'Aspiring ML Engineer | Data Scientist | Backend Python Developer'}
          </p>

          <p className="hero-description">
            Building intelligent machine learning models, performing in-depth data analysis, and architecting scalable backend applications with Python, Java, and modern web technologies.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary hover-lift-3d">
              <i className="fa-solid fa-laptop-code"></i> Explore Projects
            </a>
            <a href={profile?.resumeUrl || '/Zeel_Dobariya_python.pdf'} download="Zeel_Dobariya_Resume.pdf" className="btn btn-outline hover-lift-3d">
              <i className="fa-solid fa-download"></i> Download Resume
            </a>
            <a href="#contact" className="btn btn-outline hover-lift-3d">
              <i className="fa-solid fa-paper-plane"></i> Contact Me
            </a>
          </div>

          {/* Luxury Key Stats Bar */}
          <div className="hero-stats-bar">
            <div className="hero-stat-box hover-lift-3d">
              <div className="num">8.17</div>
              <div className="lbl">Max College SPI</div>
            </div>
            <div className="hero-stat-box hover-lift-3d">
              <div className="num">81.62%</div>
              <div className="lbl">12th Science PR</div>
            </div>
            <div className="hero-stat-box hover-lift-3d">
              <div className="num">80.53%</div>
              <div className="lbl">10th Board PR</div>
            </div>
            <div className="hero-stat-box hover-lift-3d">
              <div className="num">3+</div>
              <div className="lbl">AI & Fullstack Apps</div>
            </div>
          </div>
        </div>

        <div className="hero-card hover-lift-3d">
          <div className="hero-avatar-wrapper">
            <img src={profile?.logoUrl || '/ZD.png'} alt="Zeel Dobariya Avatar Logo" className="hero-avatar-img" />
          </div>

          <div className="floating-badge floating-badge-1 hover-lift-3d">
            <div className="badge-icon"><i className="fa-solid fa-brain"></i></div>
            <div className="badge-text">
              <div className="val">Machine Learning</div>
              <div className="lbl">Supervised & Predictive AI</div>
            </div>
          </div>

          <div className="floating-badge floating-badge-2 hover-lift-3d">
            <div className="badge-icon"><i className="fa-solid fa-code"></i></div>
            <div className="badge-text">
              <div className="val">Backend & SQL</div>
              <div className="lbl">Python, Java, PostgreSQL</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
