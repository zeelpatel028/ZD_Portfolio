import React from 'react';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" style={{ position: 'relative' }}>
      <div className="container footer-content">
        <a href="#hero" className="logo-container">
          <img src={profile?.logoUrl || '/ZD.png'} alt="ZD Logo" className="logo-img" />
          <span className="logo-text">ZEEL <span>DOBARIYA</span></span>
        </a>

        <p style={{ color: 'var(--color-taupe)', maxWidth: '500px', fontSize: '0.95rem' }}>
          Computer Science Engineering Student • Aspiring ML Engineer & Backend Python Developer
        </p>

        <div className="footer-socials">
          <a href={profile?.github || "https://github.com/zeelpatel028"} target="_blank" rel="noopener noreferrer" className="social-link hover-lift-3d" title="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href={profile?.linkedin || "https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/"} target="_blank" rel="noopener noreferrer" className="social-link hover-lift-3d" title="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href={`mailto:${profile?.email || 'zeelptl028@gmail.com'}`} className="social-link hover-lift-3d" title="Email">
            <i className="fa-solid fa-envelope"></i>
          </a>
          <a href={`tel:${profile?.phone || '+916353807407'}`} className="social-link hover-lift-3d" title="Phone">
            <i className="fa-solid fa-phone"></i>
          </a>
        </div>

        <div className="copyright" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span>&copy; {new Date().getFullYear()} Zeel Dobariya. Built with React.js & Node.js/Express.js.</span>
          <button onClick={scrollToTop} className="btn-back-to-top hover-lift-3d" title="Scroll to Top">
            <i className="fa-solid fa-arrow-up"></i> Top
          </button>
        </div>
      </div>
    </footer>
  );
}
