import React, { useRef, useEffect } from 'react';

export function Particles({ 
  color = "#ffffff", 
  particleCount = 5000, 
  particleSize = 3, 
  animate = false, 
  className = "" 
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];

    const initParticles = () => {
      particles = [];
      // If animated, drawing 25000 arcs every frame will crash most browsers.
      // We cap it at 400 for a smooth 60fps live background while keeping the density high.
      const actualCount = animate ? Math.min(particleCount, 400) : particleCount;
      
      for (let i = 0; i < actualCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * particleSize,
          alpha: Math.random() * 0.8 + 0.2,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    };

    const resize = () => {
      // Use parent container dimensions instead of window
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
      if (!animate) {
        drawStatic();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      
      particles.forEach(p => {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;

      particles.forEach(p => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges cleanly
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        // Draw particle
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    // Delay resize slightly to ensure parent layout is complete
    setTimeout(() => {
      resize();
      if (animate) {
        render();
      }
    }, 0);
    
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [color, particleCount, particleSize, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
