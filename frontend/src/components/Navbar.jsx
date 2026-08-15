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
    <header class={`header ${scrolled ? 'scrolled' : ''}`}>
      <div class="container navbar">
        <a href="#hero" class="logo-container">
          <img src={profile?.logoUrl || '/ZD.png'} alt="ZD Logo" class="logo-img" />
          <span class="logo-text">ZEEL <span>DOBARIYA</span></span>
        </a>

        <ul class={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><a href="#about" class="nav-link" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#education" class="nav-link" onClick={() => setMenuOpen(false)}>Education & Marksheets</a></li>
          <li><a href="#skills" class="nav-link" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#projects" class="nav-link" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#certifications" class="nav-link" onClick={() => setMenuOpen(false)}>Certifications</a></li>
          <li><a href="#contact" class="nav-link" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>

        <div class="nav-actions">
          {/* Light / Dark Mode Toggle Button */}
          <button
            class="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            <i class={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <a href={profile?.resumeUrl || '/Zeel_Dobariya_python.pdf'} download="Zeel_Dobariya_Resume.pdf" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-file-arrow-down"></i> Resume
          </a>
          <button class="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Navigation">
            <i class={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
