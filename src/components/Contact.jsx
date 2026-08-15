import React, { useState } from 'react';

export default function Contact({ profile, onShowToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      onShowToast(`Copied "${text}" to clipboard!`);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setStatusMsg(data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusMsg(data.error || 'Failed to submit.');
      }
    } catch (err) {
      setStatusMsg('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact" style={{ background: 'rgba(18, 13, 10, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title gradient-text-anim">Let's Connect & Collaborate</h2>
          <p className="section-description">
            Open for ML Engineering internships, backend development roles, and technical collaborations.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-card hover-lift-3d">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-peach)' }}>Contact Information</h3>

            <div className="contact-item">
              <div className="contact-icon"><i className="fa-solid fa-envelope"></i></div>
              <div className="contact-detail">
                <div className="label">Email Address</div>
                <div className="val">{profile?.email || 'zeelptl028@gmail.com'}</div>
              </div>
              <button className="copy-btn hover-lift-3d" onClick={() => handleCopy(profile?.email || 'zeelptl028@gmail.com')} title="Copy Email">
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><i className="fa-solid fa-phone"></i></div>
              <div className="contact-detail">
                <div className="label">Phone Number</div>
                <div className="val">{profile?.phone || '+91-6353807407'}</div>
              </div>
              <button className="copy-btn hover-lift-3d" onClick={() => handleCopy(profile?.phone || '+91-6353807407')} title="Copy Phone">
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div className="contact-detail">
                <div className="label">Location</div>
                <div className="val">{profile?.location || 'Ahmedabad, Gujarat, India'}</div>
              </div>
            </div>
          </div>

          <div className="contact-info-card hover-lift-3d">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-peach)' }}>Send a Direct Message</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-input"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  required
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                <i className="fa-solid fa-paper-plane"></i> {loading ? 'Sending...' : 'Send Message'}
              </button>

              {statusMsg && (
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-peach)' }}>{statusMsg}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
