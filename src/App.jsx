import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EducationTimeline from './components/EducationTimeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import CyberBackground from './components/CyberBackground';
import {
  defaultProfile,
  defaultSemData,
  defaultProjects,
  defaultSkills,
  defaultCerts
} from './data/defaultData';

export default function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [semData, setSemData] = useState(defaultSemData);
  const [projects, setProjects] = useState(defaultProjects);
  const [skills, setSkills] = useState(defaultSkills);
  const [certs, setCerts] = useState(defaultCerts);

  // Theme State: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('zd_theme') || 'dark';
  });

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState({ isOpen: false, imageSrc: '', caption: '' });
  // Toast state
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zd_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    fetch('/api/profile').then(res => res.ok ? res.json() : null).then(data => data && setProfile(data)).catch(() => {});
    fetch('/api/semester-status').then(res => res.ok ? res.json() : null).then(data => data && setSemData(data)).catch(() => {});
    fetch('/api/projects').then(res => res.ok ? res.json() : null).then(data => data && setProjects(data)).catch(() => {});
    fetch('/api/skills').then(res => res.ok ? res.json() : null).then(data => data && setSkills(data)).catch(() => {});
    fetch('/api/certifications').then(res => res.ok ? res.json() : null).then(data => data && setCerts(data)).catch(() => {});
  }, []);

  const openLightbox = (imageSrc, caption) => {
    setLightbox({ isOpen: true, imageSrc, caption });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, imageSrc: '', caption: '' });
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 3000);
  };

  return (
    <div className="app-root">
      <CyberBackground />
      <Navbar profile={profile} theme={theme} onToggleTheme={toggleTheme} />
      <Hero profile={profile} semData={semData} />
      <About semData={semData} />

      <section className="section" id="education" style={{ background: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">
              <i className="fa-solid fa-graduation-cap"></i> Academic Record // Education
            </span>
            <h2 className="section-title gradient-text-anim">Education & Academic Journey</h2>
            <div className="section-header-divider"></div>
            <p className="section-description">
              A complete timeline of my academic journey along with main subject scores, total marks, Percentile Ranks (PR), and college SPIs.
            </p>
          </div>

          <EducationTimeline />
        </div>
      </section>

      <Skills skillsData={skills} />
      <Projects projectsData={projects} />
      <Certifications certsData={certs} />
      <Contact profile={profile} onShowToast={showToast} />
      <Footer profile={profile} />

      <LightboxModal
        isOpen={lightbox.isOpen}
        imageSrc={lightbox.imageSrc}
        caption={lightbox.caption}
        onClose={closeLightbox}
      />

      {toastMsg && <div className="toast show">{toastMsg}</div>}
    </div>
  );
}
