import React from 'react';

export default function LightboxModal({ isOpen, imageSrc, caption, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="lightbox-image-container">
          <img
            src={imageSrc}
            alt={caption || 'Preview View'}
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
