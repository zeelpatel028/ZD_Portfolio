import React, { useState } from 'react';
import { playHoverSound, playClickSound, playLevelUpSound } from '../utils/audioFx';

export default function Contact({ profile, onShowToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCopy = (text) => {
    playClickSound();
    navigator.clipboard.writeText(text).then(() => {
      onShowToast(`[COPIED TELEMETRY]: ${text}`);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound();
    setLoading(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        playLevelUpSound();
        setStatusMsg('[TRANSMISSION SENT]: Message delivered successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusMsg(data.error || '[ERROR]: Transmission failed.');
      }
    } catch (err) {
      setStatusMsg('[ERROR]: Signal interrupted. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-section-alt)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fa-solid fa-satellite-dish"></i> Transmission Frequency // Secure Comms
          </span>
          <h2 className="section-title gradient-text-anim">Open Comms Channel</h2>
          <p className="section-description">
            Available for ML Engineering roles, Backend Python development missions, and high-impact software collaborations.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-card" onMouseEnter={playHoverSound}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--color-peach)' }}>
              <i className="fa-solid fa-tower-broadcast"></i> Secure Telemetry Direct
            </h3>

            <div className="contact-item" onMouseEnter={playHoverSound}>
              <div className="contact-icon"><i className="fa-solid fa-envelope"></i></div>
              <div className="contact-detail">
                <div className="label">Comms Address (Email)</div>
                <div className="val">{profile?.email || 'zeelptl028@gmail.com'}</div>
              </div>
              <button
                className="copy-btn"
                onClick={() => handleCopy(profile?.email || 'zeelptl028@gmail.com')}
                title="Copy Email Telemetry"
                onMouseEnter={playHoverSound}
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>

            <div className="contact-item" onMouseEnter={playHoverSound}>
              <div className="contact-icon"><i className="fa-brands fa-linkedin-in"></i></div>
              <div className="contact-detail">
                <div className="label">LinkedIn Frequency</div>
                <div className="val">
                  <a
                    href={profile?.linkedin || 'https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    linkedin.com/in/zeel-dobariya
                  </a>
                </div>
              </div>
              <button
                className="copy-btn"
                onClick={() => handleCopy(profile?.linkedin || 'https://www.linkedin.com/in/zeel-dobariya-a8a0b9369/')}
                title="Copy LinkedIn Telemetry"
                onMouseEnter={playHoverSound}
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>

            <div className="contact-item" onMouseEnter={playHoverSound}>
              <div className="contact-icon"><i className="fa-solid fa-location-crosshairs"></i></div>
              <div className="contact-detail">
                <div className="label">Base of Operations</div>
                <div className="val">{profile?.location || 'Ahmedabad, Gujarat, India'}</div>
              </div>
            </div>
          </div>

          <div className="contact-info-card" onMouseEnter={playHoverSound}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', color: 'var(--color-peach)' }}>
              <i className="fa-solid fa-terminal"></i> Transmit Packet
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Operative Codename / Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="Enter your name / callsign..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Return Frequency (Email)</label>
                <input
                  type="email"
                  className="form-input"
                  required
                  placeholder="Enter return email address..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Encrypted Message Payload</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  required
                  placeholder="Type your transmission payload here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                onMouseEnter={playHoverSound}
              >
                <i className="fa-solid fa-paper-plane"></i> {loading ? 'Transmitting...' : 'Send Transmission'}
              </button>

              {statusMsg && (
                <p style={{ marginTop: '1rem', fontSize: '0.92rem', color: 'var(--color-peach)', fontFamily: 'var(--font-hud)', fontWeight: 700 }}>
                  {statusMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
