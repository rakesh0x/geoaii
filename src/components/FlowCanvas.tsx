"use client";

import { useEffect, useRef } from "react";

export const NODES = {
  inputs: [
    { key: "ideas", label: "Ideas", x: 0.13, y: 0.16 },
    { key: "content", label: "Content", x: 0.13, y: 0.39 },
    { key: "knowledge", label: "Knowledge", x: 0.13, y: 0.61 },
    { key: "products", label: "Products", x: 0.13, y: 0.84 },
  ],
  core: { x: 0.5, y: 0.5 },
  output: { x: 0.82, y: 0.5 },
};

const COLORS = {
  line: "rgba(99, 102, 241, 0.18)",
  particleA: "rgba(99, 102, 241, 0.9)",
  particleB: "rgba(255, 138, 101, 0.9)",
  coreGlow: "rgba(99, 102, 241, 0.35)",
};

interface Segment { from: { x: number; y: number }; to: { x: number; y: number }; ctrl: { x: number; y: number }; color: string }
interface Particle { seg: Segment; t: number; speed: number; size: number }

export default function FlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const px = (f: number) => f * W;
    const py = (f: number) => f * H;

    const segments: Segment[] = [];
    NODES.inputs.forEach((n) => {
      segments.push({
        from: { x: n.x, y: n.y },
        to: NODES.core,
        ctrl: { x: (n.x + NODES.core.x) / 2, y: n.y },
        color: COLORS.particleA,
      });
    });
    segments.push({
      from: NODES.core,
      to: NODES.output,
      ctrl: { x: (NODES.core.x + NODES.output.x) / 2, y: 0.5 },
      color: COLORS.particleB,
    });

    const spawn = () => {
      segments.forEach((seg, i) => {
        const isOutput = i === segments.length - 1;
        if (Math.random() < (isOutput ? 0.18 : 0.05)) {
          particlesRef.current.push({
            seg,
            t: 0,
            speed: 0.004 + Math.random() * 0.004,
            size: (isOutput ? 1.6 : 1.2) + Math.random() * 1.4,
          });
        }
      });
    };

    const bezier = (p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }, t: number) => {
      const mt = 1 - t;
      return {
        x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
        y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
      };
    };

    let pulse = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = COLORS.line;
      segments.forEach((seg) => {
        ctx.beginPath();
        ctx.moveTo(px(seg.from.x), py(seg.from.y));
        ctx.quadraticCurveTo(px(seg.ctrl.x), py(seg.ctrl.y), px(seg.to.x), py(seg.to.y));
        ctx.stroke();
      });

      pulse += 0.02;
      const cx = px(NODES.core.x);
      const cy = py(NODES.core.y);
      const baseR = Math.min(W, H) * 0.085;
      const r = baseR + Math.sin(pulse) * 4;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.4);
      grad.addColorStop(0, COLORS.coreGlow);
      grad.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 2.4, 0, Math.PI * 2);
      ctx.fill();

      spawn();
      const next: Particle[] = [];
      for (const p of particlesRef.current) {
        p.t += p.speed;
        if (p.t >= 1) continue;
        const pos = bezier(
          { x: px(p.seg.from.x), y: py(p.seg.from.y) },
          { x: px(p.seg.ctrl.x), y: py(p.seg.ctrl.y) },
          { x: px(p.seg.to.x), y: py(p.seg.to.y) },
          p.t
        );
        const fade = Math.sin(p.t * Math.PI);
        ctx.globalAlpha = Math.max(0.15, fade);
        ctx.fillStyle = p.seg.color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        next.push(p);
      }
      particlesRef.current = next.slice(-260);

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
