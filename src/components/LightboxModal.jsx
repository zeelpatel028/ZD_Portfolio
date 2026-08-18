import React from 'react';
import { playClickSound, playHoverSound } from '../utils/audioFx';

export default function LightboxModal({ isOpen, imageSrc, caption, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay active"
      onClick={() => {
        playClickSound();
        onClose();
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          title="Close modal"
          onMouseEnter={playHoverSound}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="lightbox-image-container">
          <img
            src={imageSrc}
            alt={caption || 'Hologram Preview View'}
            className="modal-img"
            style={{
              display: 'block',
              margin: '0 auto',
              maxHeight: '75vh',
              objectFit: 'contain'
            }}
          />
        </div>

        {caption && <div className="modal-caption">{caption}</div>}
      </div>
    </div>
  );
}
