import React, { useState, useEffect, useRef } from 'react';
import { playHoverSound, playClickSound, playScannerSound } from '../utils/audioFx';

export default function Hero({ profile, semData }) {
  const currentSem = semData?.currentSemester || 4;

  const heroImages = [
    {
      src: '/ZD_Photo.png',
      alt: 'Zeel Dobariya Real Profile',
      mode: 'REAL PROFILE',
      tag: 'OFFICIAL'
    },
    {
      src: '/ZD_Chereter.png',
      alt: 'Zeel Dobariya Cyber Character',
      mode: 'CYBER AVATAR',
      tag: 'ESPORTS'
    }
  ];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const triggerScanTransition = () => {
    setIsScanning(true);
    playScannerSound();

    // Switch image midway through the scanner sweep
    setTimeout(() => {
      setActiveImgIndex(prev => (prev === 0 ? 1 : 0));
    }, 450);

    // End scan animation
    setTimeout(() => {
      setIsScanning(false);
    }, 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      triggerScanTransition();
    }, 5000); // Continuous 5-second interval

    return () => clearInterval(timer);
  }, []);

  const handleImageClick = () => {
    playClickSound();
    triggerScanTransition();
  };

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

        {/* Character Avatar Card & Holographic HUD Frame with Laser Scanner Transition */}
        <div className="hero-card">
          <div
            className={`hero-avatar-wrapper ${isScanning ? 'scanning-active' : ''}`}
            onMouseEnter={playHoverSound}
            onClick={handleImageClick}
            title="Click to trigger laser scan & switch avatar (Auto-scans every 5s)"
          >
            <div className="hero-avatar-inner">
              {heroImages.map((img, idx) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className={`hero-avatar-portrait ${activeImgIndex === idx ? 'active' : ''}`}
                />
              ))}

              {/* Holographic Laser Scanner Sweep Overlay */}
              <div className={`laser-scanner-overlay ${isScanning ? 'sweep' : ''}`} aria-hidden="true">
                <div className="laser-beam-line"></div>
                <div className="laser-grid-mesh"></div>
                <div className="scanner-status-text">
                  <i className="fa-solid fa-barcode"></i> SCANNING // RECONFIGURING
                </div>
              </div>

              <div className="avatar-vignette"></div>
            </div>

            {/* Mode Indicator Pill */}
            <div className="avatar-mode-pill">
              <span className={`avatar-mode-dot ${isScanning ? 'scanning' : ''}`}></span>
              <span>{heroImages[activeImgIndex].mode}</span>
              <span className="avatar-mode-tag">{isScanning ? 'SCAN' : '5s AUTO'}</span>
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
