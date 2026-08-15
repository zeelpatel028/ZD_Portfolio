import React from 'react';

export default function SemesterWidget({ semData }) {
  if (!semData) return null;

  const { currentSemester, progressPercent, semesters } = semData;

  return (
    <div class="semester-widget">
      <div class="widget-header">
        <div class="widget-title-area">
          <div class="widget-icon"><i class="fa-solid fa-calendar-check"></i></div>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Current Academic Term</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)' }}>LJ University B.Tech CSE (2024–2028)</p>
          </div>
        </div>
        <span class="live-badge"><i class="fa-solid fa-bolt"></i> NODE/EXPRESS API</span>
      </div>

      <div class="current-sem-display">
        <div class="sem-number-hero">Sem {currentSemester}</div>
        <div class="sem-subtitle">Current Active Semester</div>
      </div>

      <div class="progress-container">
        <div class="progress-info">
          <span>B.Tech Graduation Progress</span>
          <span style={{ color: 'var(--color-peach)', fontWeight: 700 }}>{progressPercent}% Completed</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.8rem' }}>
        Computed via Express backend REST API based on today's date (8 terms total).
      </p>

      <div class="sem-timeline-chips">
        {semesters && semesters.map(s => (
          <div key={s.sem} class={`sem-chip ${s.status.toLowerCase()}`}>
            Sem {s.sem} {s.status === 'Completed' ? '✓' : s.status === 'Active' ? '⚡' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
