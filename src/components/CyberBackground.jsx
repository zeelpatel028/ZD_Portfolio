import React, { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates for interactive particle field
    const mouse = { x: null, y: null, radius: 120 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes matching luxury palette (#FFDBBB, #CCBEB1, #997E67)
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
      ctx.strokeStyle = 'rgba(153, 126, 103, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle cyber grid
      drawGrid();

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction
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

        // Render particle (diamond or circle)
        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(255, 219, 187, 0.4)';
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

        // Draw connections between close nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.22;
            ctx.strokeStyle = `rgba(255, 219, 187, ${opacity})`;
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

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="cyber-background-container" aria-hidden="true">
      <canvas ref={canvasRef} className="cyber-canvas" />
      <div className="cyber-scanlines" />
    </div>
  );
}
