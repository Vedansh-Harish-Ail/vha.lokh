import React, { useRef, useEffect, useState } from 'react';
import { soundEngine } from '../ui/AudioHaptic';
import { Play, RotateCcw, Sparkles } from 'lucide-react';

export const InteractiveLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMode, setActiveMode] = useState<'gravity' | 'wave' | 'matrix'>('wave');
  const [stats, setStats] = useState({ nodes: 120, fps: 60 });
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      char: string;
      size: number;
      color: string;
    }

    const chars = ['V', 'H', 'A', 'L', 'O', 'K', 'H', '0', '1', '✦', '/', '—', '×'];
    const particles: Particle[] = [];
    const cols = Math.floor(width / 45);
    const rows = Math.floor(height / 45);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i + 0.5) * (width / cols);
        const y = (j + 0.5) * (height / rows);
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          char: chars[(i * rows + j) % chars.length],
          size: 13,
          color: (i + j) % 5 === 0 ? '#d4ff3f' : '#f4f2ec',
        });
      }
    }
    setStats({ nodes: particles.length, fps: 60 });

    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;

    const render = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      frameCount++;
      fpsTimer += delta;
      if (fpsTimer >= 1) {
        setStats((prev) => ({ ...prev, fps: Math.round(frameCount / fpsTimer) }));
        frameCount = 0;
        fpsTimer = 0;
      }

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(244, 242, 236, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw particles
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const time = currentTime * 0.002;

      particles.forEach((p, idx) => {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (activeMode === 'wave') {
          const waveOffset = Math.sin(time + p.originX * 0.015 + p.originY * 0.015) * 8;
          p.originY += (p.originY + waveOffset - p.originY) * 0.02;
        }

        // Repel from cursor
        const maxDist = 130;
        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 70;
          p.vx -= (dx / dist) * force * 0.15;
          p.vy -= (dy / dist) * force * 0.15;
        }

        // Spring back to origin
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.08;
        p.vy += homeDy * 0.08;

        // Damping
        p.vx *= 0.85;
        p.vy *= 0.85;

        p.x += p.vx;
        p.y += p.vy;

        // Render connecting lines to neighbor if close
        if (idx % 2 === 0) {
          ctx.strokeStyle = 'rgba(244, 242, 236, 0.05)';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.originX, p.originY);
          ctx.stroke();
        }

        // Glyph render
        ctx.fillStyle = dist < 120 ? '#d4ff3f' : p.color;
        ctx.globalAlpha = dist < 120 ? 1 : 0.65;
        ctx.fillText(p.char, p.x, p.y);
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  };

  const handleCanvasClick = () => {
    soundEngine.playTone(600 + Math.random() * 400, 0.09);
  };

  return (
    <div className="relative w-full bg-obsidian-card hairline-border overflow-hidden">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-bone/10 bg-obsidian-surface px-5 py-3">
        <div className="flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-accent-acid" />
          <span className="font-mono text-xs uppercase tracking-wider text-bone font-medium">
            Studio Interactive Physics Engine // v2.4
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px] text-bone/60">
          <span>NODES: <strong className="text-bone">{stats.nodes}</strong></span>
          <span>FPS: <strong className="text-accent-acid">{stats.fps}</strong></span>
          <span className="hidden sm:inline">MODE: <strong className="text-bone uppercase">{activeMode}</strong></span>
        </div>
      </div>

      {/* Mode Controls */}
      <div className="flex items-center justify-between border-b border-bone/10 px-5 py-2.5 bg-obsidian-deep/50">
        <div className="flex gap-2">
          {(['wave', 'gravity', 'matrix'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                soundEngine.playClick();
                setActiveMode(mode);
              }}
              className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                activeMode === mode
                  ? 'bg-accent-acid text-obsidian font-bold'
                  : 'bg-obsidian hairline-border text-bone/70 hover:text-bone'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            soundEngine.playClick();
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
          }}
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-bone/50 hover:text-bone transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Field</span>
        </button>
      </div>

      {/* Live Canvas */}
      <div className="relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCanvasClick}
          className="w-full h-[380px] md:h-[420px] block"
        />

        {/* Floating guidance overlay */}
        <div className="pointer-events-none absolute bottom-4 left-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-bone/40">
          <Play className="h-3 w-3 text-accent-acid animate-pulse" />
          <span>Hover cursor to deflect kinetic typography matrix // Click for resonant frequency</span>
        </div>
      </div>
    </div>
  );
};
