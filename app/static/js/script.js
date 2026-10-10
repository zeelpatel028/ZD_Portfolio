/**
 * ZEEL DOBARIYA PORTFOLIO - VANILLA JS FRONTEND CONTROLLER
 * High-performance, lightweight, modular vanilla JavaScript script.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. CYBER BACKGROUND CANVAS PARTICLE ENGINE
  ========================================== */
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: null, y: null, radius: 120 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
    const particles = [];
    const colors = [
      'rgba(255, 219, 187, 0.7)',
      'rgba(204, 190, 177, 0.6)',
      'rgba(153, 126, 103, 0.65)',
      'rgba(255, 219, 187, 0.4)'
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        isDiamond: Math.random() > 0.6
      });
    }

    const drawGrid = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.strokeStyle = isLight ? 'rgba(203, 213, 225, 0.35)' : 'rgba(153, 126, 103, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.clearRect(0, 0, width, height);

      drawGrid();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 1.8;
            p.y += (dy / dist) * force * 1.8;
          }
        }

        ctx.fillStyle = isLight ? (p.isDiamond ? 'rgba(217, 119, 6, 0.75)' : 'rgba(71, 85, 105, 0.6)') : p.color;
        ctx.shadowColor = isLight ? 'rgba(217, 119, 6, 0.3)' : 'rgba(255, 219, 187, 0.4)';
        ctx.shadowBlur = 6;

        if (p.isDiamond) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const opacity = (1 - dist / 130) * (isLight ? 0.35 : 0.22);
            ctx.strokeStyle = isLight ? `rgba(217, 119, 6, ${opacity})` : `rgba(255, 219, 187, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  /* ==========================================
     2. THEME CONTROLLER & PERSISTENCE
  ========================================== */
  const savedTheme = localStorage.getItem('zd_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (window.AudioFx) window.AudioFx.playClickSound();
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('zd_theme', next);
    });
  }

  /* ==========================================
     3. HEADER STICKY & MOBILE DRAWER NAVIGATION
  ========================================== */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  const hamburger = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  const openDrawer = () => {
    if (window.AudioFx) window.AudioFx.playClickSound();
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (window.AudioFx) window.AudioFx.playClickSound();
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ==========================================
     4. AVATAR LASER SCANNER TRANSITION
  ========================================== */
  const avatarWrapper = document.getElementById('hero-avatar-wrapper');
  const portraitReal = document.getElementById('portrait-real');
  const portraitCyber = document.getElementById('portrait-cyber');
  const laserScannerOverlay = document.getElementById('laser-scanner-overlay');
  const avatarModeDot = document.getElementById('avatar-mode-dot');
  const avatarModeTitle = document.getElementById('avatar-mode-title');

  let activeAvatarIndex = 0; // 0 = Real, 1 = Cyber
  let isScanning = false;

  const triggerScanTransition = (playSound = false) => {
    if (isScanning) return;
    isScanning = true;

    if (playSound && window.AudioFx) {
      window.AudioFx.playScannerSound();
    }

    if (avatarWrapper) avatarWrapper.classList.add('scanning-active');
    if (laserScannerOverlay) laserScannerOverlay.classList.add('sweep');
    if (avatarModeDot) avatarModeDot.classList.add('scanning');

    setTimeout(() => {
      activeAvatarIndex = activeAvatarIndex === 0 ? 1 : 0;
      if (activeAvatarIndex === 0) {
        if (portraitReal) portraitReal.classList.add('active');
        if (portraitCyber) portraitCyber.classList.remove('active');
        if (avatarModeTitle) avatarModeTitle.textContent = 'REAL PROFILE';
      } else {
        if (portraitCyber) portraitCyber.classList.add('active');
        if (portraitReal) portraitReal.classList.remove('active');
        if (avatarModeTitle) avatarModeTitle.textContent = 'CYBER AVATAR';
      }
    }, 450);

    setTimeout(() => {
      if (avatarWrapper) avatarWrapper.classList.remove('scanning-active');
      if (laserScannerOverlay) laserScannerOverlay.classList.remove('sweep');
      if (avatarModeDot) avatarModeDot.classList.remove('scanning');
      isScanning = false;
    }, 1000);
  };

  if (avatarWrapper) {
    avatarWrapper.addEventListener('click', () => {
      if (window.AudioFx) window.AudioFx.playClickSound();
      triggerScanTransition(true);
    });

    setInterval(() => {
      triggerScanTransition(false);
    }, 5000);
  }

  /* ==========================================
     5. TIMELINE MILESTONE HOLOGRAM MODAL
  ========================================== */
  const bigModalBackdrop = document.getElementById('big-card-backdrop');
  const bigModalClose = document.getElementById('big-card-close');
  const holoCloseBtn = document.getElementById('holo-close-btn');

  const openMilestoneModal = (cardElem) => {
    if (window.AudioFx) window.AudioFx.playModalOpenSound();

    const stepNum = cardElem.dataset.num || '01';
    const period = cardElem.dataset.period || '';
    const title = cardElem.dataset.title || '';
    const institution = cardElem.dataset.institution || '';
    const stats = cardElem.dataset.stats || '';
    const grade = cardElem.dataset.grade || '';
    const color = cardElem.dataset.color || '#3b82f6';
    const points = JSON.parse(cardElem.dataset.points || '[]');
    const projectTitle = cardElem.dataset.projecttitle || '';
    const projectDesc = cardElem.dataset.projectdesc || '';
    const tech = JSON.parse(cardElem.dataset.tech || '[]');

    document.getElementById('modal-step-num').textContent = stepNum;
    document.getElementById('modal-step-num').style.background = color;
    document.getElementById('modal-step-period').textContent = period;
    document.getElementById('modal-step-title').textContent = title;
    document.getElementById('modal-step-institution').textContent = institution;
    document.getElementById('modal-step-stats').textContent = `${stats} (${grade})`;
    document.getElementById('modal-header-container').style.borderLeft = `6px solid ${color}`;

    const pointsList = document.getElementById('modal-step-points');
    pointsList.innerHTML = '';
    points.forEach(pt => {
      const li = document.createElement('li');
      li.style.marginBottom = '0.35rem';
      li.textContent = pt;
      pointsList.appendChild(li);
    });

    const projectBox = document.getElementById('modal-step-project-box');
    if (projectTitle) {
      projectBox.style.display = 'block';
      document.getElementById('modal-step-project-title').innerHTML = `<i class="fa-solid fa-laptop-code"></i> ${projectTitle}`;
      document.getElementById('modal-step-project-desc').textContent = projectDesc;

      const techBadges = document.getElementById('modal-step-project-tech');
      techBadges.innerHTML = '';
      tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-badge';
        span.textContent = t;
        techBadges.appendChild(span);
      });
    } else {
      projectBox.style.display = 'none';
    }

    if (bigModalBackdrop) bigModalBackdrop.style.display = 'flex';
  };

  const closeMilestoneModal = () => {
    if (window.AudioFx) window.AudioFx.playClickSound();
    if (bigModalBackdrop) bigModalBackdrop.style.display = 'none';
  };

  document.querySelectorAll('.scroll-block-card').forEach(card => {
    card.addEventListener('click', () => openMilestoneModal(card));
  });

  if (bigModalClose) bigModalClose.addEventListener('click', closeMilestoneModal);
  if (holoCloseBtn) holoCloseBtn.addEventListener('click', closeMilestoneModal);
  if (bigModalBackdrop) {
    bigModalBackdrop.addEventListener('click', (e) => {
      if (e.target === bigModalBackdrop) closeMilestoneModal();
    });
  }

  /* ==========================================
     6. SKILLS CATEGORY FILTER TABS
  ========================================== */
  const skillTabs = document.querySelectorAll('.skills-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (window.AudioFx) window.AudioFx.playClickSound();

      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.dataset.category;

      skillCards.forEach(card => {
        if (filterCategory === 'All' || card.dataset.category === filterCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================
     7. CONTACT FORM TRANSMISSION & TOAST
  ========================================== */
  const contactForm = document.getElementById('contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');
  const contactStatusMsg = document.getElementById('contact-status-msg');

  const showToast = (message) => {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (window.AudioFx) window.AudioFx.playClickSound();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';
      }
      if (contactStatusMsg) contactStatusMsg.textContent = '';

      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (data.success) {
          if (window.AudioFx) window.AudioFx.playLevelUpSound();
          if (contactStatusMsg) {
            contactStatusMsg.style.color = 'var(--color-peach)';
            contactStatusMsg.textContent = data.message || '[TRANSMISSION SENT]: Message delivered successfully!';
          }
          showToast(`[TRANSMISSION SENT]: Thank you ${name}!`);
          contactForm.reset();
        } else {
          if (contactStatusMsg) {
            contactStatusMsg.style.color = '#ef4444';
            contactStatusMsg.textContent = data.error || '[ERROR]: Transmission failed.';
          }
        }
      } catch (err) {
        if (contactStatusMsg) {
          contactStatusMsg.style.color = '#ef4444';
          contactStatusMsg.textContent = '[ERROR]: Signal interrupted. Please try again.';
        }
      } finally {
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Transmission';
        }
      }
    });
  }

  /* ==========================================
     8. TELEMETRY COPY-TO-CLIPBOARD BUTTONS
  ========================================== */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.AudioFx) window.AudioFx.playClickSound();
      const textToCopy = btn.dataset.copytext;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`[COPIED TELEMETRY]: ${textToCopy}`);
        });
      }
    });
  });

  /* ==========================================
     9. AUDIO HOVER EFFECTS & BACK TO TOP
  ========================================== */
  document.querySelectorAll('a, button, .scroll-block-card, .skill-card, .project-card, .cert-card, .contact-item, .hero-stat-box').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      if (window.AudioFx) window.AudioFx.playHoverSound();
    });
  });

  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (window.AudioFx) window.AudioFx.playClickSound();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
