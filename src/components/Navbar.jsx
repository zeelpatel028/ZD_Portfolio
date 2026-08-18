import React, { useState, useEffect } from 'react';
import { playHoverSound, playClickSound, toggleSfx, isSfxEnabled } from '../utils/audioFx';

export default function Navbar({ profile, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sfxActive, setSfxActive] = useState(true);

  useEffect(() => {
    setSfxActive(isSfxEnabled());
  }, []);

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

  const handleSfxToggle = () => {
    const nextState = toggleSfx();
    setSfxActive(nextState);
  };

  const navLinks = [
    { label: 'Bio', keyTag: '01', href: '#about', icon: 'fa-solid fa-user-astronaut' },
    { label: 'Quests', keyTag: '02', href: '#education', icon: 'fa-solid fa-route' },
    { label: 'Arsenal', keyTag: '03', href: '#skills', icon: 'fa-solid fa-crosshairs' },
    { label: 'Missions', keyTag: '04', href: '#projects', icon: 'fa-solid fa-gamepad' },
    { label: 'Trophies', keyTag: '05', href: '#certifications', icon: 'fa-solid fa-trophy' },
    { label: 'Comms', keyTag: '06', href: '#contact', icon: 'fa-solid fa-satellite-dish' },
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar">
          {/* Brand Logo with Player Status HUD */}
          <a
            href="#hero"
            className="logo-container"
            onClick={() => {
              playClickSound();
              setMenuOpen(false);
            }}
            onMouseEnter={playHoverSound}
          >
            <div className="logo-hud-frame">
              <img src={profile?.logoUrl || '/ZD.png'} alt="ZD Logo" className="logo-img" />
            </div>
            <div className="logo-text-group">
              <span className="logo-text">ZEEL <span>DOBARIYA</span></span>
              <span className="logo-sub-tag">
                <span className="status-beacon"></span>
                <span>LVL 4 CSE // READY</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-menu desktop-only">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                >
                  <span className="hotkey-tag">[{link.keyTag}]</span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Header Action Buttons */}
          <div className="nav-actions">
            {/* Audio SFX Toggle */}
            <button
              className={`sfx-toggle-btn ${!sfxActive ? 'muted' : ''}`}
              onClick={handleSfxToggle}
              title={`Audio SFX: ${sfxActive ? 'Enabled' : 'Muted'}`}
              aria-label="Toggle Audio Effects"
              onMouseEnter={playHoverSound}
            >
              <i className={`fa-solid ${sfxActive ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
            </button>

            {/* Light / Dark Mode Toggle Button */}
            <button
              className="theme-toggle-btn"
              onClick={() => {
                playClickSound();
                onToggleTheme();
              }}
              title={`Switch to ${theme === 'dark' ? 'Tactical Light' : 'Cyber Dark'} Mode`}
              aria-label="Toggle Theme"
              onMouseEnter={playHoverSound}
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            {/* Desktop Resume Loot Download Button */}
            <a
              href={profile?.resumeUrl || '/Zeel_Dobariya_python.pdf'}
              download="Zeel_Dobariya_Resume.pdf"
              className="btn btn-primary btn-sm desktop-resume-btn"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <i className="fa-solid fa-file-arrow-down"></i> <span>Loot Resume</span>
            </a>

            {/* Hamburger Button for Mobile */}
            <button
              className="hamburger"
              onClick={() => {
                playClickSound();
                setMenuOpen(!menuOpen);
              }}
              aria-label="Toggle Mobile Navigation Menu"
              onMouseEnter={playHoverSound}
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
          onClick={() => {
            playClickSound();
            setMenuOpen(false);
          }}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile Slide-out Gaming HUD Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-logo">
            <img src={profile?.logoUrl || '/ZD.png'} alt="ZD Logo" className="logo-img-sm" />
            <span>OPERATIVE // ZEEL</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => {
              playClickSound();
              setMenuOpen(false);
            }}
            aria-label="Close Menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-section-label">MISSION NAVIGATION</div>
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => {
                    playClickSound();
                    setMenuOpen(false);
                  }}
                  onMouseEnter={playHoverSound}
                >
                  <div className="mobile-link-left">
                    <span className="mobile-link-icon"><i className={link.icon}></i></span>
                    <span className="mobile-link-title">[{link.keyTag}] {link.label}</span>
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
            onClick={() => {
              playClickSound();
              setMenuOpen(false);
            }}
            onMouseEnter={playHoverSound}
          >
            <i className="fa-solid fa-file-arrow-down"></i> Download Resume Loot
          </a>

          <div className="mobile-drawer-socials">
            <a
              href={profile?.github || 'https://github.com/zeelpatel028'}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href={profile?.linkedin || 'https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/'}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href={`mailto:${profile?.email || 'zeelptl028@gmail.com'}`}
              title="Email"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
