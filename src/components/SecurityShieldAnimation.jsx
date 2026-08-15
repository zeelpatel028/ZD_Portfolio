import React from 'react';

export default function SecurityShieldAnimation({ size = 120 }) {
  return (
    <div className="security-svg-container" style={{ width: size, height: size, margin: '0 auto 1.2rem auto', position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="security-shield-svg"
      >
        <defs>
          {/* Radial Gradient for Outer Glow */}
          <radialGradient id="shieldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFDBBB" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#997E67" stopOpacity="0" />
          </radialGradient>

          {/* Linear Gradient for Shield Body */}
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDBBB" />
            <stop offset="50%" stopColor="#CCBEB1" />
            <stop offset="100%" stopColor="#997E67" />
          </linearGradient>

          {/* Laser Scan Line Gradient */}
          <linearGradient id="laserGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDBBB" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFDBBB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFDBBB" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="100" cy="100" r="90" fill="url(#shieldGlow)" className="svg-ambient-pulse" />

        {/* Rotating Outer Tech Dash Ring */}
        <circle
          cx="100"
          cy="100"
          r="82"
          stroke="url(#shieldGradient)"
          strokeWidth="3"
          strokeDasharray="14 10 35 12"
          fill="none"
          className="svg-rotate-clockwise"
        />

        {/* Rotating Inner Reverse Tech Dash Ring */}
        <circle
          cx="100"
          cy="100"
          r="68"
          stroke="#CCBEB1"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeDasharray="8 6 20 8"
          fill="none"
          className="svg-rotate-counterclockwise"
        />

        {/* Outer Hexagon Shield Silhouette */}
        <path
          d="M100 32 L145 55 V102 C145 132 125 158 100 168 C75 158 55 132 55 102 V55 L100 32 Z"
          fill="rgba(26, 18, 13, 0.85)"
          stroke="url(#shieldGradient)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          className="svg-shield-path"
        />

        {/* Inner Glowing Core Shield */}
        <path
          d="M100 44 L135 62 V100 C135 124 119 145 100 154 C81 145 65 124 65 100 V62 L100 44 Z"
          fill="rgba(153, 126, 103, 0.15)"
          stroke="#FFDBBB"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Animated Laser Scanner Line */}
        <g className="svg-scan-line">
          <line x1="60" y1="0" x2="140" y2="0" stroke="url(#laserGradient)" strokeWidth="3" />
        </g>

        {/* Security Padlock Icon in Center */}
        <g className="svg-lock-group" transform="translate(100, 100)">
          {/* Lock Shackle */}
          <path
            d="M-12 -2 C-12 -12, -7 -17, 0 -17 C7 -17, 12 -12, 12 -2 V4 H-12 V-2 Z"
            fill="none"
            stroke="#FFDBBB"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="svg-shackle-bounce"
          />
          {/* Lock Body */}
          <rect
            x="-16"
            y="2"
            width="32"
            height="26"
            rx="5"
            fill="url(#shieldGradient)"
            stroke="#120d0a"
            strokeWidth="1.5"
          />
          {/* Keyhole Dot */}
          <circle cx="0" cy="12" r="3.5" fill="#120d0a" />
          <path d="M-1.5 13.5 L1.5 13.5 L2.5 21 L-2.5 21 Z" fill="#120d0a" />
        </g>

        {/* Corner Tech Dots */}
        <circle cx="100" cy="22" r="3" fill="#FFDBBB" className="svg-dot-pulse" />
        <circle cx="100" cy="178" r="3" fill="#FFDBBB" className="svg-dot-pulse" />
        <circle cx="22" cy="100" r="3" fill="#FFDBBB" className="svg-dot-pulse" />
        <circle cx="178" cy="100" r="3" fill="#FFDBBB" className="svg-dot-pulse" />
      </svg>
    </div>
  );
}
