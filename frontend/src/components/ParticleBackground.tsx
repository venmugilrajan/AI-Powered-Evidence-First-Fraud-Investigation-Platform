import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  className?: string;
  theme?: 'dark' | 'light' | 'gold';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  className = '', 
  theme = 'gold' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Grid of topographical mesh points
    const rows = 28;
    const cols = 55;
    let step = 0;

    const render = () => {
      step += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Color scheme
      const baseAlpha = theme === 'dark' ? 0.35 : 0.28;
      const pointColor = theme === 'dark' 
        ? 'rgba(164, 214, 168, ' 
        : theme === 'gold' 
          ? 'rgba(196, 172, 116, ' 
          : 'rgba(38, 77, 48, ';

      // Draw undulating waves of mesh particles
      for (let r = 0; r < rows; r++) {
        const yNorm = r / rows;
        // Perspective depth
        const yBase = height * 0.25 + yNorm * height * 0.75;
        const scale = 0.5 + yNorm * 0.7;

        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const xNorm = c / cols;
          const x = xNorm * width;

          // Multi-frequency Perlin-style synthetic terrain wave
          const wave1 = Math.sin(c * 0.22 + step * 1.5 + r * 0.3) * 22;
          const wave2 = Math.cos(c * 0.12 - step * 0.8 + r * 0.5) * 16;
          const wave3 = Math.sin((c + r) * 0.08 + step * 2.2) * 12;
          
          // Mountain ridge elevation in the center
          const centerDist = Math.abs(xNorm - 0.5);
          const mountainRidge = Math.max(0, 1 - centerDist * 2.2) * Math.sin(r * 0.4 + step) * 28;

          const y = yBase + (wave1 + wave2 + wave3 + mountainRidge) * scale;
          const alpha = (0.08 + (1 - yNorm * 0.4) * baseAlpha) * (0.4 + Math.sin(c * 0.3 + step) * 0.3);

          ctx.fillStyle = `${pointColor}${Math.max(0.04, Math.min(0.85, alpha))})`;
          
          // Draw topographical dot
          const dotSize = (1.1 + yNorm * 1.8) * (scale > 0.8 ? 1.2 : 0.9);
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();

          // Draw faint horizontal connector wires between particles for terrain wireframe effect
          if (c > 0 && c % 2 === 0) {
            ctx.strokeStyle = `${pointColor}${Math.max(0.02, alpha * 0.22)})`;
            ctx.lineWidth = 0.6;
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
    />
  );
};
