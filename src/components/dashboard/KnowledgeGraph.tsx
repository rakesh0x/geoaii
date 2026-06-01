"use client";

import { motion } from "framer-motion";

const CENTER = { x: 380, y: 300 };
const CAT_R = 140;
const CHILD_R = 245;
const TONE: Record<string, string> = { indigo: "#6366F1", orange: "#FB923C", amber: "#F59E0B" };

const deg2rad = (d: number) => (d * Math.PI) / 180;

interface Category {
  id: string;
  label: string;
  tone: string;
}

export default function KnowledgeGraph({ company = "your company", categories = [], children = {} }: { company?: string; categories?: Category[]; children?: Record<string, string[]> }) {
  const n = categories.length || 1;

  const nodes = categories.map((cat, i) => {
    const angle = -90 + i * (360 / n);
    const pos = {
      x: CENTER.x + CAT_R * Math.cos(deg2rad(angle)),
      y: CENTER.y + CAT_R * Math.sin(deg2rad(angle)),
    };
    const kids = (children[cat.id] || []).map((label: string, j: number, arr: string[]) => {
      const off = (j - (arr.length - 1) / 2) * 22;
      const ca = angle + off;
      return {
        label,
        x: CENTER.x + CHILD_R * Math.cos(deg2rad(ca)),
        y: CENTER.y + CHILD_R * Math.sin(deg2rad(ca)),
      };
    });
    return { ...cat, pos, kids, color: TONE[cat.tone] || TONE.indigo };
  });

  const catW = (label: string) => label.length * 7.4 + 30;

  return (
    <div className="w-full" data-testid="knowledge-graph">
      <svg viewBox="0 0 760 600" className="h-auto w-full">
        <defs>
          <radialGradient id="kgCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g fill="none">
          {nodes.map((node, i) => (
            <g key={`edge-${i}`}>
              <line x1={CENTER.x} y1={CENTER.y} x2={node.pos.x} y2={node.pos.y} stroke="#E2E8F0" strokeWidth="1.3" />
              <line
                x1={CENTER.x} y1={CENTER.y} x2={node.pos.x} y2={node.pos.y}
                stroke={node.color} strokeWidth="1.4" strokeOpacity="0.4"
                className="geo-flow-line" style={{ animationDelay: `${i * 1.2}s` }}
              />
              {node.kids.map((k, j) => (
                <line key={j} x1={node.pos.x} y1={node.pos.y} x2={k.x} y2={k.y} stroke="#EAEDF2" strokeWidth="1.1" />
              ))}
            </g>
          ))}
        </g>

        {nodes.map((node, i) =>
          node.kids.map((k, j) => {
            const anchor = k.x < CENTER.x - 8 ? "end" : k.x > CENTER.x + 8 ? "start" : "middle";
            const dx = anchor === "end" ? -9 : anchor === "start" ? 9 : 0;
            const dy = anchor === "middle" ? (k.y < CENTER.y ? -10 : 16) : 4;
            return (
              <motion.g
                key={`k-${i}-${j}`}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 + j * 0.05 }}
                style={{ transformOrigin: `${k.x}px ${k.y}px` }}
              >
                <circle cx={k.x} cy={k.y} r="4.5" fill={node.color} fillOpacity="0.85" />
                <text x={k.x + dx} y={k.y + dy} textAnchor={anchor} fontFamily="Figtree, sans-serif" fontSize="12.5" fill="#64748B">
                  {k.label}
                </text>
              </motion.g>
            );
          })
        )}

        {nodes.map((node, i) => {
          const w = catW(node.label);
          return (
            <motion.g
              key={`cat-${i}`}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${node.pos.x}px ${node.pos.y}px` }}
            >
              <rect x={node.pos.x - w / 2} y={node.pos.y - 17} width={w} height="34" rx="17" fill="#ffffff" stroke={node.color} strokeOpacity="0.4" />
              <circle cx={node.pos.x - w / 2 + 16} cy={node.pos.y} r="3.5" fill={node.color} />
              <text x={node.pos.x - w / 2 + 27} y={node.pos.y + 4.5} fontFamily="Figtree, sans-serif" fontSize="13" fontWeight="600" fill="#334155">
                {node.label}
              </text>
            </motion.g>
          );
        })}

        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        >
          <circle cx={CENTER.x} cy={CENTER.y} r="80" fill="url(#kgCore)" />
          <rect x={CENTER.x - 70} y={CENTER.y - 28} width="140" height="56" rx="28" fill="#0F172A" />
          <text x={CENTER.x} y={CENTER.y - 3} textAnchor="middle" fontFamily="Fraunces, serif" fontSize="15" fontWeight="500" fill="#ffffff">
            {company.length > 16 ? company.slice(0, 15) + "\u2026" : company}
          </text>
          <text x={CENTER.x} y={CENTER.y + 15} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.5" fill="#A5B4FC">
            AS AI SEES YOU
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
