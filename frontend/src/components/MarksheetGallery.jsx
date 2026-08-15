import React, { useState, useEffect } from 'react';
import MarksheetSecurityShield from './MarksheetSecurityShield';
import SecurityShieldAnimation from './SecurityShieldAnimation';

export default function MarksheetGallery({ marksheetsData, onOpenLightbox }) {
  const [activeTab, setActiveTab] = useState('10th');
  const [isScreenshotHidden, setIsScreenshotHidden] = useState(false);
  const [securityNotice, setSecurityNotice] = useState('');

  const tabs = [
    { key: '10th', label: '10th Board (SSC)', icon: 'fa-certificate' },
    { key: '12th', label: '12th Science (HSC)', icon: 'fa-award' },
    { key: 'sem-1', label: 'Semester 1 (7.13 SPI)', icon: 'fa-graduation-cap' },
    { key: 'sem-2', label: 'Semester 2 (6.37 SPI)', icon: 'fa-graduation-cap' },
    { key: 'sem-3', label: 'Semester 3 (8.17 SPI)', icon: 'fa-graduation-cap' },
    { key: 'sem-upcoming-4', label: 'Sem 4 (Awaited)', icon: 'fa-clock' },
    { key: 'sem-upcoming-5', label: 'Sem 5 (Current)', icon: 'fa-clock' },
    { key: 'sem-upcoming-6', label: 'Sem 6–8 (Upcoming)', icon: 'fa-clock' },
  ];

  const isUpcoming = activeTab.startsWith('sem-upcoming');
  const activeData = marksheetsData ? marksheetsData[activeTab] : null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key ? e.key.toLowerCase() : '';
      const code = e.code ? e.code.toLowerCase() : '';

      const isPrtScn = e.key === 'PrintScreen' || code === 'printscreen' || e.keyCode === 44;
      const isWinShiftS = (e.metaKey || e.key === 'Meta' || e.key === 'OS') && e.shiftKey && (key === 's' || code === 'keys');
      const isMacScreenshot = e.metaKey && e.shiftKey && (key === '3' || key === '4' || key === '5');
      const isCtrlP = (e.ctrlKey || e.metaKey) && (key === 'p');
      const isCtrlS = (e.ctrlKey || e.metaKey) && (key === 's');
      const isF12 = e.key === 'F12' || (e.metaKey && e.altKey && key === 'i');

      if (isPrtScn || isWinShiftS || isMacScreenshot || isCtrlP || isCtrlS || isF12) {
        setIsScreenshotHidden(true);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('🔒 Protected Academic Document (Zeel Dobariya) - Screenshots & Recording Restricted').catch(() => {});
        }
        setSecurityNotice('📷 Screenshot / Screen Capture Key Detected: Marksheet obscured for document protection.');
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  const handleRestoreView = (e) => {
    e.stopPropagation();
    setIsScreenshotHidden(false);
    setSecurityNotice('');
  };

  return (
    <div className="marksheets-container">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--color-peach)' }}>Select Marksheet to View Detailed Breakdown</h3>
      </div>

      <div className="marksheet-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <i className={`fa-solid ${tab.icon}`}></i> {tab.label}
          </button>
        ))}
      </div>

      <MarksheetSecurityShield title={activeData ? activeData.title : 'Academic Marksheet'}>
        {securityNotice && (
          <div className="security-alert-banner animate-fade-in" style={{ margin: '0.5rem 0' }}>
            <i className="fa-solid fa-shield-halved"></i>
            <span>{securityNotice}</span>
          </div>
        )}

        <div className="marksheet-card-display">
          {isUpcoming || !activeData ? (
            <div className="marksheet-placeholder">
              <div className="placeholder-icon">
                <i className="fa-solid fa-hourglass-half"></i>
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--color-peach)' }}>Upcoming Semester Record</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '1.5rem' }}>
                Marksheet record for this semester will be automatically updated upon term completion and official release from LJ University.
              </p>
              <span className="live-badge"><i className="fa-solid fa-clock"></i> Term in Progress / Scheduled</span>
            </div>
          ) : (
            <>
              <div
                className="marksheet-preview-area cyber-scanline-container hover-lift-3d"
                onClick={() => {
                  if (!isScreenshotHidden) {
                    onOpenLightbox(activeData.image, activeData.title);
                  }
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                {!isScreenshotHidden ? (
                  <>
                    <img
                      src={activeData.image}
                      alt={activeData.title}
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        display: 'block',
                        width: '100%',
                        height: 'auto'
                      }}
                    />
                    <div className="zoom-overlay">
                      <i className="fa-solid fa-magnifying-glass-plus"></i>
                      <span>Click to view original mark sheet</span>
                    </div>
                  </>
                ) : (
                  <div
                    className="marksheet-screenshot-hide-overlay"
                    style={{
                      padding: '2.5rem 1.5rem',
                      textAlign: 'center',
                      background: 'rgba(18, 13, 10, 0.96)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '320px',
                      border: '1px solid var(--border-active)'
                    }}
                  >
                    {/* Animated SVG Cyber Security Shield */}
                    <SecurityShieldAnimation size={120} />

                    <h4 style={{ fontSize: '1.3rem', color: 'var(--color-peach)', marginBottom: '0.4rem' }}>
                      Marksheet Hidden for Security
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '380px', marginBottom: '1.4rem' }}>
                      Screenshot key detected. The marksheet image is hidden to protect document privacy.
                    </p>

                    <button
                      onClick={handleRestoreView}
                      style={{
                        padding: '0.65rem 1.6rem',
                        background: 'linear-gradient(135deg, var(--color-peach) 0%, var(--color-taupe) 100%)',
                        color: '#120d0a',
                        border: 'none',
                        borderRadius: '9999px',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <i className="fa-solid fa-rotate-left"></i>
                      Restore Marksheet View
                    </button>
                  </div>
                )}
              </div>

              <div className="marksheet-details-area">
                <div>
                  <div className="marksheet-header-info">
                    <h3>{activeData.title}</h3>
                    <p><i className="fa-solid fa-building-columns"></i> {activeData.institution} | Seat/Enroll: <strong>{activeData.seatNo}</strong></p>
                  </div>

                  <div className="stats-badges-grid">
                    {activeData.stats && activeData.stats.map((s, idx) => (
                      <div key={idx} className="stat-badge">
                        <div className="stat-val">{s.val}</div>
                        <div className="stat-lbl">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="marks-table-wrapper">
                    <table className="marks-table">
                      <thead>
                        <tr>
                          {activeData.headers && activeData.headers.map((h, idx) => <th key={idx}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {activeData.rows && activeData.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx}>
                                {cIdx === row.length - 1 ? (
                                  <span className="grade-pill">{cell}</span>
                                ) : (
                                  cell
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', borderTop: '1px dashed var(--border-light)', paddingTop: '0.8rem', marginTop: '1rem' }}>
                  <i className="fa-solid fa-circle-info" style={{ color: 'var(--color-peach)' }}></i> {activeData.notes}
                </div>
              </div>
            </>
          )}
        </div>
      </MarksheetSecurityShield>
    </div>
  );
}
