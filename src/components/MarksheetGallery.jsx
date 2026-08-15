import React, { useState } from 'react';
import MarksheetSecurityShield from './MarksheetSecurityShield';
import { defaultMarksheets } from '../data/defaultData';

export default function MarksheetGallery({ marksheetsData, onOpenLightbox }) {
  const [activeTab, setActiveTab] = useState('10th');

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
  const mergedData = marksheetsData || defaultMarksheets;
  const activeData = mergedData ? mergedData[activeTab] || defaultMarksheets[activeTab] : defaultMarksheets[activeTab];

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
                onClick={() => onOpenLightbox(activeData.image, activeData.title)}
                title="Click to view full screen high-resolution image"
                style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              >
                <img
                  src={activeData.image}
                  alt={activeData.title}
                  draggable="false"
                  onError={(e) => {
                    console.error("Image load error for", activeData.image);
                  }}
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    display: 'block',
                    width: '100%',
                    maxHeight: '480px',
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }}
                />
                <div className="zoom-overlay">
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                  <span>Click to view original mark sheet</span>
                </div>
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

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px dashed var(--border-light)', paddingTop: '0.8rem', marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-taupe)' }}>
                    <i className="fa-solid fa-circle-info" style={{ color: 'var(--color-peach)' }}></i> {activeData.notes}
                  </div>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => onOpenLightbox(activeData.image, activeData.title)}
                  >
                    <i className="fa-solid fa-expand"></i> View High-Res Image
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </MarksheetSecurityShield>
    </div>
  );
}
