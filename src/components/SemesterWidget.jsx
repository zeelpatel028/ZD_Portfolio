import React from 'react';
import { playHoverSound } from '../utils/audioFx';

export default function SemesterWidget({ semData }) {
  if (!semData) return null;

  const { currentSemester, progressPercent, semesters } = semData;

  return (
    <div className="semester-widget" onMouseEnter={playHoverSound}>
      <div className="widget-header">
        <div className="widget-title-area">
          <div className="widget-icon"><i className="fa-solid fa-crosshairs"></i></div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Campaign Progression</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)' }}>LJ University B.Tech CSE (2024–2028)</p>
          </div>
        </div>
        <span className="live-badge"><i className="fa-solid fa-bolt"></i> REST API LIVE</span>
      </div>

      <div className="current-sem-display">
        <div className="sem-number-hero">STAGE {currentSemester}</div>
        <div className="sem-subtitle">Active Semester Term // In Combat</div>
      </div>

      <div className="progress-container">
        <div className="progress-info">
          <span>Graduation XP Progress</span>
          <span style={{ color: 'var(--color-peach)', fontWeight: 800 }}>{progressPercent}% Complete</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', textAlign: 'center', marginBottom: '0.8rem', fontFamily: 'var(--font-hud)' }}>
        8 Campaign Stages Total • Real-time telemetry via Express backend
      </p>

      <div className="sem-timeline-chips">
        {semesters && semesters.map(s => (
          <div
            key={s.sem}
            className={`sem-chip ${s.status.toLowerCase()}`}
            onMouseEnter={playHoverSound}
          >
            S{s.sem} {s.status === 'Completed' ? '✓' : s.status === 'Active' ? '⚡' : '🔒'}
          </div>
        ))}
      </div>
    </div>
  );
}
