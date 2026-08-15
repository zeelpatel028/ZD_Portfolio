import React, { useState, useEffect, useRef } from 'react';

export default function MarksheetSecurityShield({ children, title = "Official Academic Record", showBadge = true }) {
  const [securityNotice, setSecurityNotice] = useState('');
  const [isFocusLost, setIsFocusLost] = useState(false);
  const [liveTimestamp, setLiveTimestamp] = useState(new Date().toLocaleTimeString());
  const wrapperRef = useRef(null);

  useEffect(() => {
    // 1. Live Timestamp Clock for Watermark DRM
    const timer = setInterval(() => {
      setLiveTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    // 2. Intercept Screen Capture / Media Recording API (getDisplayMedia)
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getDisplayMedia = async function(...args) {
        triggerSecurityAlert('📹 Screen Recording / Display Capture Blocked by DRM Policy.');
        setIsFocusLost(true);
        throw new Error('Screen capture disabled on protected academic document.');
      };
    }

    // 3. Keyboard Shortcut Interceptor (PrintScreen, Win+Shift+S, Mac Cmd+Shift+3/4/5, Ctrl+P, DevTools)
    const handleKeyDown = (e) => {
      const key = e.key ? e.key.toLowerCase() : '';
      const code = e.code ? e.code.toLowerCase() : '';

      // PrintScreen / PrtScn key
      const isPrintScreen = e.key === 'PrintScreen' || code === 'printscreen' || e.keyCode === 44;

      // Windows Snipping Tool (Win + Shift + S or Meta + Shift + S)
      const isWinShiftS = (e.metaKey || e.key === 'Meta' || e.key === 'OS') && e.shiftKey && (key === 's' || code === 'keys');

      // Mac Screenshot Shortcuts (Cmd + Shift + 3 / 4 / 5)
      const isMacScreenshot = e.metaKey && e.shiftKey && (key === '3' || key === '4' || key === '5');

      if (isPrintScreen || isWinShiftS || isMacScreenshot) {
        e.preventDefault();
        e.stopPropagation();
        clearClipboard();
        setIsFocusLost(true);
        triggerSecurityAlert('📷 Screenshot / Screen Capture Shortcut Detected! Content protected.');
        return false;
      }

      // Ctrl+P / Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && (key === 'p')) {
        e.preventDefault();
        triggerSecurityAlert('🖨️ Printing Disabled: Marksheets cannot be printed or exported to PDF.');
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (key === 's')) {
        e.preventDefault();
        triggerSecurityAlert('💾 Saving Restricted: Academic document cannot be saved locally.');
        return false;
      }

      // DevTools Shortcuts: F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Cmd+Option+I
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) ||
        ((e.ctrlKey || e.metaKey) && (key === 'u')) ||
        (e.metaKey && e.altKey && (key === 'i'))
      ) {
        e.preventDefault();
        triggerSecurityAlert('🛡️ Developer Tools / Source View is restricted on protected documents.');
        return false;
      }
    };

    const handleKeyUp = (e) => {
      const code = e.code ? e.code.toLowerCase() : '';
      if (e.key === 'PrintScreen' || code === 'printscreen' || e.keyCode === 44) {
        clearClipboard();
      }
    };

    const clearClipboard = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('🔒 Protected Academic Record (Zeel Dobariya) - Screenshots & Recording Restricted').catch(() => {});
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);

    // 5. DOM Mutation Observer (Anti-Tamper for Watermark overlay)
    let observer = null;
    if (wrapperRef.current && window.MutationObserver) {
      observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
          if (mutation.type === 'childList') {
            const hasWatermark = wrapperRef.current.querySelector('.watermark-overlay-grid');
            if (!hasWatermark) {
              triggerSecurityAlert('⚠️ Security Warning: DOM modification detected! Refreshing security rules.');
              setIsFocusLost(true);
            }
          }
        }
      });
      observer.observe(wrapperRef.current, { childList: true, subtree: true });
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) observer.disconnect();
    };
  }, []);

  const triggerSecurityAlert = (msg) => {
    setSecurityNotice(msg);
    setTimeout(() => {
      setSecurityNotice('');
    }, 4500);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    triggerSecurityAlert('🔒 Right-Click & Context Menu restricted on Marksheet documents.');
    return false;
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  const handleRestoreFocus = () => {
    setIsFocusLost(false);
    setSecurityNotice('');
  };

  return (
    <div
      ref={wrapperRef}
      className="security-shield-wrapper"
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      style={{
        position: 'relative',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      {showBadge && (
        <div className="security-badge-bar">
          <div className="security-badge">
            <span className="security-dot pulse"></span>
            <i className="fa-solid fa-shield-halved"></i>
            <span>Watermark DRM & Anti-Screen-Recording Guard</span>
          </div>
          <div className="security-info-text">
            <i className="fa-solid fa-lock"></i> Protected Academic Document
          </div>
        </div>
      )}

      {securityNotice && (
        <div className="security-alert-banner animate-fade-in">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>{securityNotice}</span>
        </div>
      )}

      {isFocusLost ? (
        <div className="security-focus-lost-overlay animate-fade-in">
          <div className="security-focus-content">
            <div className="focus-shield-icon">
              <i className="fa-solid fa-shield-cat"></i>
            </div>
            <h3>Content Obscured for Security</h3>
            <p>
              Browser focus was shifted, window minimized, or screen capture app detected. The document is obscured to prevent unauthorized screen recording or capture.
            </p>
            <button className="btn-restore-security" onClick={handleRestoreFocus}>
              <i className="fa-solid fa-eye"></i> Click to Verify & Restore View
            </button>
          </div>
        </div>
      ) : (
        <div className="security-protected-content">
          {/* Dynamic Watermark Overlay Pattern with Real-time Clock */}
          <div className="watermark-overlay-grid" aria-hidden="true">
            <div className="watermark-text-repeater">
              {Array.from({ length: 16 }).map((_, idx) => (
                <span key={idx} className="watermark-item">
                  ZEEL DOBARIYA • OFFICIAL ACADEMIC RESULT • SECURE VERIFIED DOCUMENT • {liveTimestamp} • CONFIDENTIAL
                </span>
              ))}
            </div>
          </div>

          {children}
        </div>
      )}
    </div>
  );
}
