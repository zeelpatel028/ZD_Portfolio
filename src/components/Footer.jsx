import React from 'react';
import { playHoverSound, playClickSound } from '../utils/audioFx';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" style={{ position: 'relative' }}>
      <div className="container footer-content">
        <a
          href="#hero"
          className="logo-container"
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
        >
          <div className="logo-hud-frame">
            <img src={profile?.logoUrl || '/ZD.png'} alt="ZD Logo" className="logo-img" />
          </div>
          <div className="logo-text-group">
            <span className="logo-text">ZEEL <span>DOBARIYA</span></span>
            <span className="logo-sub-tag">SYSTEM ONLINE // COMBAT READY</span>
          </div>
        </a>

        <p style={{ color: 'var(--color-taupe)', maxWidth: '520px', fontSize: '0.98rem', fontFamily: 'var(--font-hud)' }}>
          Computer Science Engineering Operative • Machine Learning Architect & Backend Python Developer
        </p>

        <div className="footer-socials">
          <a
            href={profile?.github || "https://github.com/zeelpatel028"}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="GitHub"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href={profile?.linkedin || "https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/"}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="LinkedIn"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            href={`mailto:${profile?.email || 'zeelptl028@gmail.com'}`}
            className="social-link"
            title="Email"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>

        <div className="copyright" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span>&copy; {new Date().getFullYear()} ZEEL DOBARIYA. SYSTEM POWERED BY REACT & EXPRESS.</span>
          <button
            onClick={scrollToTop}
            className="btn-back-to-top"
            title="Scroll to Top"
            onMouseEnter={playHoverSound}
          >
            <i className="fa-solid fa-arrow-up"></i> Top // Return
          </button>
        </div>
      </div>
    </footer>
  );
}
