import React, { useState, useEffect } from 'react';

export default function Navbar({ profile, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const navLinks = [
    { label: 'About', href: '#about', icon: 'fa-solid fa-user' },
    { label: 'Education & Marksheets', href: '#education', icon: 'fa-solid fa-graduation-cap' },
    { label: 'Skills', href: '#skills', icon: 'fa-solid fa-code' },
    { label: 'Projects', href: '#projects', icon: 'fa-solid fa-laptop-code' },
    { label: 'Certifications', href: '#certifications', icon: 'fa-solid fa-award' },
    { label: 'Contact', href: '#contact', icon: 'fa-solid fa-envelope' },
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar">
          {/* Brand Logo */}
          <a href="#hero" className="logo-container" onClick={() => setMenuOpen(false)}>
            <img src={profile?.logoUrl || '/ZD.png'} alt="ZD Logo" className="logo-img" />
            <span className="logo-text">ZEEL <span>DOBARIYA</span></span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-menu desktop-only">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Header Action Buttons */}
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

            {/* Desktop Resume Download Button */}
            <a
              href={profile?.resumeUrl || '/Zeel_Dobariya_python.pdf'}
              download="Zeel_Dobariya_Resume.pdf"
              className="btn btn-primary btn-sm desktop-resume-btn"
            >
              <i className="fa-solid fa-file-arrow-down"></i> <span>Resume</span>
            </a>

            {/* Hamburger Button for Mobile */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Mobile Navigation Menu"
            >
              <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {menuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Luxury Mobile Slide-out Glassmorphism Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-logo">
            <img src={profile?.logoUrl || '/ZD.png'} alt="ZD Logo" className="logo-img-sm" />
            <span>ZEEL DOBARIYA</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-section-label">Navigation</div>
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="mobile-link-left">
                    <span className="mobile-link-icon"><i className={link.icon}></i></span>
                    <span className="mobile-link-title">{link.label}</span>
                  </div>
                  <i className="fa-solid fa-chevron-right mobile-link-arrow"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="drawer-footer">
          <a
            href={profile?.resumeUrl || '/Zeel_Dobariya_python.pdf'}
            download="Zeel_Dobariya_Resume.pdf"
            className="btn btn-primary w-full mobile-drawer-resume"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-file-arrow-down"></i> Download Resume
          </a>

          <div className="mobile-drawer-socials">
            <a href={profile?.github || 'https://github.com/zeelpatel028'} target="_blank" rel="noreferrer" title="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href={profile?.linkedin || 'https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/'} target="_blank" rel="noreferrer" title="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href={`mailto:${profile?.email || 'zeelptl028@gmail.com'}`} title="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
