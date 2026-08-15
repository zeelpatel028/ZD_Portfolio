import React, { useState, useEffect } from 'react';

export default function Navbar({ profile, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar">
        <a href="#hero" className="logo-container">
          <img src={profile?.logoUrl || '/ZD.png'} alt="ZD Logo" className="logo-img" />
          <span className="logo-text">ZEEL <span>DOBARIYA</span></span>
        </a>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#education" className="nav-link" onClick={() => setMenuOpen(false)}>Education & Marksheets</a></li>
          <li><a href="#skills" className="nav-link" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#certifications" className="nav-link" onClick={() => setMenuOpen(false)}>Certifications</a></li>
          <li><a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>

        <div className="nav-actions">
          {/* Light / Dark Mode Toggle Button */}
          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <a href={profile?.resumeUrl || '/Zeel_Dobariya_python.pdf'} download="Zeel_Dobariya_Resume.pdf" className="btn btn-primary btn-sm">
            <i className="fa-solid fa-file-arrow-down"></i> Resume
          </a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Navigation">
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
