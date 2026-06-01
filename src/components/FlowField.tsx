"use client";

import { motion } from "framer-motion";

const INPUTS = [
  { label: "Ideas", y: 58, accent: "#6366F1" },
  { label: "Content", y: 138, accent: "#6366F1" },
  { label: "Knowledge", y: 218, accent: "#FF8A65" },
  { label: "Products", y: 298, accent: "#FFB020" },
];

const CHIP_W = 168;
const CHIP_H = 46;
const CORE = { x: 510, y: 178, r: 62 };
const AI = { x: 728, y: 178 };
const ANSWER = { x: 928, y: 178 };

const Chip = ({ x, y, label, accent }: { x: number; y: number; label: string; accent: string; anchorRight?: boolean }) => {
  return (
    <g>
      <rect
        x={x}
        y={y - CHIP_H / 2}
        width={CHIP_W}
        height={CHIP_H}
        rx={CHIP_H / 2}
        fill="#ffffff"
        stroke="#E7E9EE"
        strokeWidth="1"
      />
      <circle cx={x + 24} cy={y} r="4.5" fill={accent} />
      <text
        x={x + 42}
        y={y + 5}
        fontFamily="Figtree, sans-serif"
        fontSize="15.5"
        fontWeight="500"
        fill="#334155"
      >
        {label}
      </text>
    </g>
  );
};

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
};

export default function FlowField() {
  return (
    <svg
      viewBox="0 0 1000 360"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Ideas, content, knowledge and products flow through GeoAI into AI systems and become the answer."
    >
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="coreFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="answerFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#FF8A65" />
        </linearGradient>
      </defs>

      <g fill="none">
        {INPUTS.map((n, i) => (
          <g key={i}>
            <path d={curve(70 + CHIP_W, n.y, CORE.x - CORE.r, CORE.y)} stroke="#E2E8F0" strokeWidth="1.4" />
            <path
              d={curve(70 + CHIP_W, n.y, CORE.x - CORE.r, CORE.y)}
              stroke="#6366F1"
              strokeWidth="1.6"
              strokeOpacity="0.5"
              className="geo-flow-line"
              style={{ animationDelay: `${i * 1.4}s` }}
            />
          </g>
        ))}
        <path d={curve(CORE.x + CORE.r, CORE.y, AI.x - CHIP_W / 2, AI.y)} stroke="#E2E8F0" strokeWidth="1.4" />
        <path
          d={curve(CORE.x + CORE.r, CORE.y, AI.x - CHIP_W / 2, AI.y)}
          stroke="#FF8A65"
          strokeWidth="1.8"
          strokeOpacity="0.55"
          className="geo-flow-line"
        />
        <path d={curve(AI.x + CHIP_W / 2, AI.y, ANSWER.x - 50, ANSWER.y)} stroke="#E2E8F0" strokeWidth="1.4" />
        <path
          d={curve(AI.x + CHIP_W / 2, AI.y, ANSWER.x - 50, ANSWER.y)}
          stroke="#FF8A65"
          strokeWidth="1.8"
          strokeOpacity="0.55"
          className="geo-flow-line"
        />
      </g>

      {INPUTS.map((n, i) => (
        <motion.g
          key={n.label}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.g
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <Chip x={70} y={n.y} label={n.label} accent={n.accent} />
          </motion.g>
        </motion.g>
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${CORE.x}px ${CORE.y}px` }}
      >
        <circle cx={CORE.x} cy={CORE.y} r={CORE.r * 2} fill="url(#coreGlow)">
          <animate attributeName="r" values={`${CORE.r * 1.8};${CORE.r * 2.1};${CORE.r * 1.8}`} dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx={CORE.x} cy={CORE.y} r={CORE.r} fill="url(#coreFill)" />
        <circle cx={CORE.x} cy={CORE.y} r={CORE.r} fill="none" stroke="#ffffff" strokeOpacity="0.12" />
        <text x={CORE.x} y={CORE.y - 4} textAnchor="middle" fontFamily="Fraunces, serif" fontSize="22" fontWeight="500" fill="#ffffff">
          GeoAI
        </text>
        <text x={CORE.x} y={CORE.y + 16} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8.5" letterSpacing="2" fill="#A5B4FC">
          VISIBILITY LAYER
        </text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <motion.g animate={{ y: [-2.5, 2.5, -2.5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <Chip x={AI.x} y={AI.y} label="AI Systems" accent="#0F172A" />
        </motion.g>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${ANSWER.x}px ${ANSWER.y}px` }}
      >
        <motion.g animate={{ y: [-3, 3, -3] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx={ANSWER.x} cy={ANSWER.y} r="50" fill="url(#answerFill)" opacity="0.14" />
          <circle cx={ANSWER.x} cy={ANSWER.y} r="34" fill="#ffffff" stroke="#FFD9C9" strokeWidth="1.4" />
          <text x={ANSWER.x} y={ANSWER.y + 5} textAnchor="middle" fontFamily="Fraunces, serif" fontSize="14" fontWeight="500" fill="#0F172A">
            Answer
          </text>
        </motion.g>
      </motion.g>
    </svg>
  );
}
