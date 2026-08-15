import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EducationTimeline from './components/EducationTimeline';
import MarksheetGallery from './components/MarksheetGallery';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [semData, setSemData] = useState(null);
  const [marksheets, setMarksheets] = useState(null);
  const [projects, setProjects] = useState(null);
  const [skills, setSkills] = useState(null);
  const [certs, setCerts] = useState(null);

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
    fetch('/api/profile').then(res => res.json()).then(data => setProfile(data)).catch(console.error);
    fetch('/api/semester-status').then(res => res.json()).then(data => setSemData(data)).catch(console.error);
    fetch('/api/marksheets').then(res => res.json()).then(data => setMarksheets(data)).catch(console.error);
    fetch('/api/projects').then(res => res.json()).then(data => setProjects(data)).catch(console.error);
    fetch('/api/skills').then(res => res.json()).then(data => setSkills(data)).catch(console.error);
    fetch('/api/certifications').then(res => res.json()).then(data => setCerts(data)).catch(console.error);
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
    <div class="app-root">
      <Navbar profile={profile} theme={theme} onToggleTheme={toggleTheme} />
      <Hero profile={profile} semData={semData} />
      <About semData={semData} />

      <section class="section" id="education" style={{ background: 'var(--bg-section-alt)' }}>
        <div class="container">
          <div class="section-header">
            <span class="section-subtitle">Academic Record</span>
            <h2 class="section-title">Education & Verified Marksheets</h2>
            <p class="section-description">
              A complete timeline of my academic journey along with verified marksheets, main subject scores, total marks, Percentile Ranks (PR), and college SPIs.
            </p>
          </div>

          <EducationTimeline />
          <MarksheetGallery marksheetsData={marksheets} onOpenLightbox={openLightbox} />
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

      {toastMsg && <div class="toast show">{toastMsg}</div>}
    </div>
  );
}
