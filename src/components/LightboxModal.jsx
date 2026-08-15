import React from 'react';
import MarksheetSecurityShield from './MarksheetSecurityShield';

export default function LightboxModal({ isOpen, imageSrc, caption, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <MarksheetSecurityShield title={caption || 'Full Marksheet Document'} showBadge={true}>
          <div
            className="lightbox-image-container"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <img
              src={imageSrc}
              alt={caption || 'Marksheet View'}
              className="modal-img"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                display: 'block',
                margin: '0 auto',
                maxHeight: '75vh',
                objectFit: 'contain'
              }}
            />
          </div>
        </MarksheetSecurityShield>

        <div className="modal-caption">
          <i className="fa-solid fa-shield-halved" style={{ marginRight: '6px', color: 'var(--color-peach)' }}></i>
          {caption || 'Marksheet Full View'} (Protected Document)
        </div>
      </div>
    </div>
  );
}
