import { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Download, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/resume';
import { FaceDepthSVG, IsoCamSVG } from '../data/heroSvgs';

const roles = [
  "Computer Vision Engineer",
  "Deep Learning Specialist",
  "AI Systems Architect",
  "Real-Time Inference Expert",
];

function NeuralCameraSVG() {
  const layerColors = ['#00D9FF', '#7B2FBE', '#FF6B35', '#22d3ee'];
  const nodes = [
    { x: 52, y: 75, l: 0 }, { x: 52, y: 120, l: 0 }, { x: 52, y: 165, l: 0 },
    { x: 52, y: 210, l: 0 }, { x: 52, y: 255, l: 0 },
    { x: 140, y: 90, l: 1 }, { x: 140, y: 135, l: 1 }, { x: 140, y: 180, l: 1 },
    { x: 140, y: 225, l: 1 }, { x: 140, y: 270, l: 1 },
    { x: 228, y: 108, l: 2 }, { x: 228, y: 158, l: 2 }, { x: 228, y: 208, l: 2 }, { x: 228, y: 258, l: 2 },
    { x: 310, y: 140, l: 3 }, { x: 310, y: 190, l: 3 }, { x: 310, y: 240, l: 3 },
  ];
  const byLayer = [0, 1, 2, 3].map(l => nodes.filter(n => n.l === l));
  const edges = [];
  for (let l = 0; l < 3; l++) {
    for (const a of byLayer[l]) for (const b of byLayer[l + 1]) {
      edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, c: layerColors[l] });
    }
  }

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[290px] xl:w-[360px] pointer-events-none select-none hidden lg:block">
      <div style={{ animation: 'heroFloat 8s ease-in-out infinite', animationDelay: '1.2s' }}>
        <svg viewBox="0 0 420 370" width="100%" xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 20px rgba(123,47,190,0.15))' }}
        >
          <defs>
            <radialGradient id="netGlow" cx="50%" cy="55%" r="50%">
              <stop offset="0%" stopColor="#7B2FBE" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#7B2FBE" stopOpacity="0" />
            </radialGradient>
            <marker id="arr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#00D9FF" fillOpacity="0.45" />
            </marker>
          </defs>

          {/* Network glow bg */}
          <ellipse cx="190" cy="180" rx="130" ry="110" fill="url(#netGlow)" />

          {/* ── CCTV Camera ── */}
          <g transform="translate(8, 18)">
            {/* Arm */}
            <rect x="36" y="0" width="7" height="26" rx="3.5"
              fill="rgba(0,217,255,0.12)" stroke="#00D9FF" strokeWidth="0.8" strokeOpacity="0.5" />
            {/* Body */}
            <rect x="6" y="24" width="68" height="34" rx="8"
              fill="rgba(0,0,20,0.7)" stroke="#00D9FF" strokeWidth="1.1" strokeOpacity="0.55" />
            {/* Body shine */}
            <rect x="8" y="26" width="64" height="8" rx="4" fill="rgba(255,255,255,0.03)" />
            {/* Lens outer */}
            <circle cx="28" cy="41" r="13" fill="rgba(0,0,20,0.9)" stroke="#00D9FF" strokeWidth="1.5" strokeOpacity="0.7" />
            {/* Lens inner rings */}
            <circle cx="28" cy="41" r="9" fill="none" stroke="#00D9FF" strokeWidth="0.8" strokeOpacity="0.4" />
            <circle cx="28" cy="41" r="5" fill="rgba(0,217,255,0.12)" />
            <circle cx="28" cy="41" r="2.5" fill="rgba(0,217,255,0.5)" />
            {/* Lens glint */}
            <circle cx="25" cy="38" r="1.5" fill="white" fillOpacity="0.55" />
            {/* IR dots */}
            {[52, 63, 72].map((x, i) => (
              <circle key={i} cx={x} cy="41" r="3"
                fill="rgba(255,107,53,0.15)" stroke="#FF6B35" strokeWidth="0.9" strokeOpacity="0.65"
                style={{ animation: `heroGlow ${1.3 + i * 0.3}s ease-in-out infinite` }} />
            ))}
            {/* Status LED */}
            <circle cx="70" cy="27" r="2.5" fill="#22c55e"
              style={{ animation: 'heroGlow 1s ease-in-out infinite' }} />
            <text x="6" y="72" fontSize="6.5" fill="#00D9FF" fillOpacity="0.5" fontFamily="Fira Code, monospace">CCTV · PTZ · 4K</text>
            <text x="6" y="81" fontSize="5.5" fill="#00D9FF" fillOpacity="0.3" fontFamily="Fira Code, monospace">SCRFD-10G detector</text>
          </g>

          {/* FOV cone */}
          <path d="M30,55 L85,22 L85,98 Z"
            fill="rgba(0,217,255,0.035)" stroke="rgba(0,217,255,0.18)" strokeWidth="0.7" strokeDasharray="4 3" />
          <line x1="30" y1="55" x2="85" y2="22" stroke="rgba(0,217,255,0.12)" strokeWidth="0.5" />
          <line x1="30" y1="55" x2="85" y2="98" stroke="rgba(0,217,255,0.12)" strokeWidth="0.5" />

          {/* Arrow to network */}
          <line x1="88" y1="58" x2="136" y2="100"
            stroke="#00D9FF" strokeWidth="0.9" strokeOpacity="0.38" strokeDasharray="5 3"
            markerEnd="url(#arr)" />
          <text x="90" y="78" fontSize="6" fill="#00D9FF" fillOpacity="0.35" fontFamily="Fira Code, monospace"
            transform="rotate(-28,90,78)">frame stream</text>

          {/* Network edges */}
          {edges.map((e, i) => (
            <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke={e.c} strokeOpacity="0.11" strokeWidth="0.7" />
          ))}

          {/* Activated edge highlight (random subset) */}
          {[edges[2], edges[8], edges[15], edges[22]].filter(Boolean).map((e, i) => (
            <line key={`h${i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke={e.c} strokeOpacity="0.45" strokeWidth="1.2"
              style={{ animation: `heroGlow ${1.8 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }} />
          ))}

          {/* Network nodes */}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="8"
                fill={`${layerColors[n.l]}14`} stroke={layerColors[n.l]} strokeWidth="1" strokeOpacity="0.55"
                style={{ animation: `heroGlow ${1.5 + (i % 4) * 0.25}s ease-in-out infinite`, animationDelay: `${(i % 5) * 0.18}s` }} />
              <circle cx={n.x} cy={n.y} r="2.8" fill={layerColors[n.l]} fillOpacity="0.75" />
            </g>
          ))}

          {/* Layer labels */}
          {[
            { x: 52, label: 'INPUT', sub: '128px' },
            { x: 140, label: 'CONV', sub: 'ReLU' },
            { x: 228, label: 'FC', sub: '512d' },
            { x: 310, label: 'EMBED', sub: '512-dim' },
          ].map((l, i) => (
            <g key={i}>
              <text x={l.x} y="305" textAnchor="middle" fontSize="7"
                fill={layerColors[i]} fillOpacity="0.7" fontFamily="Fira Code, monospace">{l.label}</text>
              <text x={l.x} y="315" textAnchor="middle" fontSize="5.5"
                fill={layerColors[i]} fillOpacity="0.38" fontFamily="Fira Code, monospace">{l.sub}</text>
            </g>
          ))}

          {/* Embedding vector box */}
          <rect x="338" y="110" width="68" height="140" rx="7"
            fill="rgba(0,217,255,0.04)" stroke="#00D9FF" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="4 2" />
          {Array.from({ length: 20 }).map((_, i) => (
            <rect key={i} x="343" y={116 + i * 6.5} rx="1" height="4"
              width={16 + Math.abs(Math.sin(i * 1.4)) * 28 + 8}
              fill="#00D9FF" fillOpacity={0.07 + Math.abs(Math.sin(i * 0.9)) * 0.2} />
          ))}
          <text x="372" y="105" textAnchor="middle" fontSize="6.5" fill="#00D9FF" fillOpacity="0.5" fontFamily="Fira Code, monospace">VECTOR</text>
          <text x="372" y="260" textAnchor="middle" fontSize="6" fill="#00D9FF" fillOpacity="0.3" fontFamily="Fira Code, monospace">512-dim</text>

          {/* Milvus DB */}
          <g transform="translate(335, 275)">
            <rect x="0" y="0" width="72" height="56" rx="7"
              fill="rgba(123,47,190,0.08)" stroke="#7B2FBE" strokeWidth="0.9" strokeOpacity="0.5" />
            <text x="36" y="14" textAnchor="middle" fontSize="7" fill="#7B2FBE" fillOpacity="0.8" fontFamily="Fira Code, monospace">MILVUS DB</text>
            {[0, 1, 2].map(r => (
              <ellipse key={r} cx="36" cy={25 + r * 10} rx="22" ry="4.5"
                fill="rgba(123,47,190,0.06)" stroke="#7B2FBE" strokeWidth="0.7" strokeOpacity="0.3" />
            ))}
            <text x="36" y="55" textAnchor="middle" fontSize="5.5" fill="#7B2FBE" fillOpacity="0.35" fontFamily="Fira Code, monospace">24K embeddings</text>
          </g>
          {/* Arrow embedding → Milvus */}
          <line x1="372" y1="252" x2="371" y2="273"
            stroke="#7B2FBE" strokeWidth="0.9" strokeOpacity="0.38" strokeDasharray="3 2"
            markerEnd="url(#arr)" />

          {/* NVIDIA badge */}
          <g transform="translate(8, 295)">
            <rect x="0" y="0" width="96" height="34" rx="7"
              fill="rgba(118,185,0,0.06)" stroke="rgba(118,185,0,0.38)" strokeWidth="0.8" />
            <text x="10" y="14" fontSize="7.5" fill="#76b900" fillOpacity="0.9" fontFamily="Fira Code, monospace" fontWeight="bold">NVIDIA DGX A100</text>
            <text x="10" y="26" fontSize="6" fill="#76b900" fillOpacity="0.55" fontFamily="Fira Code, monospace">TensorRT FP16</text>
            <circle cx="88" cy="17" r="5.5"
              fill="rgba(118,185,0,0.15)" stroke="#76b900" strokeWidth="0.8" strokeOpacity="0.6"
              style={{ animation: 'heroGlow 1.2s ease-in-out infinite' }} />
          </g>

          {/* Accuracy readout */}
          <text x="8" y="344" fontSize="6.5" fill="#22d3ee" fillOpacity="0.5" fontFamily="Fira Code, monospace">ACCURACY</text>
          <text x="72" y="344" fontSize="10" fill="#22d3ee" fillOpacity="0.95" fontFamily="Fira Code, monospace" fontWeight="bold">98.0%</text>
          <text x="8" y="356" fontSize="5.5" fill="#22d3ee" fillOpacity="0.28" fontFamily="Fira Code, monospace">~5,000 students · 20+ streams</text>
        </svg>
      </div>
      {/* Edge fades */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#050509] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/70 via-transparent to-[#050509]/70 pointer-events-none" />
    </div>
  );
}
function FaceLandmarkSVG() {
  const faceOval = "M130,28 C170,28 210,60 222,105 C234,150 230,195 222,230 C210,270 190,305 165,318 C150,325 130,328 130,328 C130,328 110,325 95,318 C70,305 50,270 38,230 C30,195 26,150 38,105 C50,60 90,28 130,28 Z";

  const groups = [
    { pts: [[90, 95], [100, 88], [112, 85], [124, 86], [134, 90]], color: '#00D9FF', r: 2.2 },
    { pts: [[126, 90], [136, 86], [148, 85], [160, 88], [170, 95]], color: '#00D9FF', r: 2.2 },
    { pts: [[88, 115], [100, 109], [112, 108], [122, 109], [124, 115], [122, 121], [112, 123], [100, 121]], color: '#7B2FBE', r: 2.4 },
    { pts: [[138, 115], [140, 109], [150, 108], [162, 109], [172, 115], [162, 121], [150, 123], [140, 121]], color: '#7B2FBE', r: 2.4 },
    { pts: [[130, 108], [130, 118], [130, 128], [130, 138]], color: '#00D9FF', r: 2 },
    { pts: [[108, 148], [118, 152], [130, 154], [142, 152], [152, 148]], color: '#00D9FF', r: 2 },
    { pts: [[116, 160], [130, 162], [144, 160]], color: '#00D9FF', r: 1.8 },
    { pts: [[100, 180], [112, 174], [122, 170], [130, 169], [138, 170], [148, 174], [160, 180]], color: '#FF6B35', r: 2.2 },
    { pts: [[100, 180], [112, 188], [122, 193], [130, 194], [138, 193], [148, 188], [160, 180]], color: '#FF6B35', r: 2.2 },
    { pts: [[110, 180], [122, 178], [130, 178], [138, 178], [150, 180]], color: '#FF6B35', r: 1.8 },
    { pts: [[55, 200], [52, 220], [55, 245], [65, 268], [80, 288], [100, 308], [130, 322], [160, 308], [180, 288], [195, 268], [205, 245], [208, 220], [205, 200]], color: '#00D9FF', r: 1.8 },
    { pts: [[70, 175], [75, 190], [78, 205]], color: '#7B2FBE', r: 1.6 },
    { pts: [[190, 175], [185, 190], [182, 205]], color: '#7B2FBE', r: 1.6 },
    { pts: [[88, 65], [100, 58], [112, 54], [130, 52], [148, 54], [160, 58], [172, 65]], color: '#00D9FF', r: 1.6 },
  ];

  const edges = groups.flatMap(({ pts, color }) =>
    pts.slice(0, -1).map((p, i) => ({ x1: p[0], y1: p[1], x2: pts[i + 1][0], y2: pts[i + 1][1], color }))
  );

  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[260px] xl:w-[310px] pointer-events-none select-none hidden lg:block">
      <div style={{ animation: 'heroFloat 7s ease-in-out infinite' }}>
        <svg viewBox="0 0 260 360" width="100%" xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 20px rgba(0,217,255,0.15))' }}
        >
          <defs>
            <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0" />
              <stop offset="48%" stopColor="#00D9FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.55" />
              <stop offset="52%" stopColor="#00D9FF" stopOpacity="0" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
            </linearGradient>
            <clipPath id="faceClip">
              <path d={faceOval} />
            </clipPath>
          </defs>

          {/* Outer detection box */}
          <rect x="20" y="12" width="220" height="332" rx="5"
            fill="none" stroke="rgba(0,217,255,0.15)" strokeWidth="1" strokeDasharray="6 4" />
          {/* Corner brackets */}
          {[[[20, 12], [42, 12], [20, 34]], [[220, 12], [240, 12], [240, 34]], [[20, 324], [20, 344], [42, 344]], [[220, 324], [240, 324], [240, 344]]].map((pts, i) => (
            <polyline key={i} points={pts.map(p => p.join(',')).join(' ')}
              fill="none" stroke="#00D9FF" strokeWidth="2.2" strokeLinecap="round" />
          ))}

          {/* Face fill + outline */}
          <path d={faceOval} fill="rgba(0,217,255,0.02)" stroke="rgba(0,217,255,0.1)" strokeWidth="1" />

          {/* Mesh triangle overlay */}
          <path d="M130,85 L88,115 L130,108 Z" fill="rgba(0,217,255,0.04)" />
          <path d="M130,85 L172,115 L130,108 Z" fill="rgba(0,217,255,0.04)" />
          <path d="M88,115 L130,154 L172,115 Z" fill="rgba(123,47,190,0.04)" />
          <path d="M130,154 L100,180 L160,180 Z" fill="rgba(0,217,255,0.03)" />
          <path d="M55,200 L130,194 L205,200 Z" fill="rgba(0,217,255,0.02)" />

          {/* Connection lines */}
          {edges.map((e, i) => (
            <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke={e.color} strokeOpacity="0.22" strokeWidth="0.7" />
          ))}

          {/* Cross-group connections */}
          <line x1="124" y1="115" x2="138" y2="115" stroke="#00D9FF" strokeOpacity="0.12" strokeWidth="0.5" />
          <line x1="130" y1="138" x2="130" y2="154" stroke="#00D9FF" strokeOpacity="0.15" strokeWidth="0.7" />
          <line x1="88" y1="115" x2="55" y2="200" stroke="#00D9FF" strokeOpacity="0.07" strokeWidth="0.5" />
          <line x1="172" y1="115" x2="205" y2="200" stroke="#00D9FF" strokeOpacity="0.07" strokeWidth="0.5" />

          {/* Landmark dots */}
          {groups.map(({ pts, color, r }) =>
            pts.map((p, i) => (
              <circle key={`${color}-${p[0]}-${p[1]}`} cx={p[0]} cy={p[1]} r={r}
                fill={color} style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
            ))
          )}

          {/* Eye iris circles */}
          <circle cx="106" cy="115" r="9" fill="none" stroke="#7B2FBE" strokeWidth="1.2" strokeOpacity="0.45" />
          <circle cx="106" cy="115" r="4" fill="rgba(123,47,190,0.35)" />
          <circle cx="104" cy="113" r="1.5" fill="white" fillOpacity="0.5" />
          <circle cx="154" cy="115" r="9" fill="none" stroke="#7B2FBE" strokeWidth="1.2" strokeOpacity="0.45" />
          <circle cx="154" cy="115" r="4" fill="rgba(123,47,190,0.35)" />
          <circle cx="152" cy="113" r="1.5" fill="white" fillOpacity="0.5" />

          {/* Scan sweep line */}
          <rect x="20" y="12" width="220" height="332" clipPath="url(#faceClip)"
            fill="url(#scanGrad)"
            style={{ animation: 'heroScan 3.5s linear infinite' }} />

          {/* Dimension lines */}
          <line x1="38" y1="200" x2="22" y2="200" stroke="#00D9FF" strokeWidth="0.5" strokeOpacity="0.35" />
          <line x1="222" y1="200" x2="238" y2="200" stroke="#00D9FF" strokeWidth="0.5" strokeOpacity="0.35" />

          {/* Labels */}
          <text x="22" y="10" fontSize="7" fill="#00D9FF" fillOpacity="0.45" fontFamily="Fira Code, monospace">FACE_ID · 0x4F2A</text>
          <text x="22" y="354" fontSize="6.5" fill="#00D9FF" fillOpacity="0.4" fontFamily="Fira Code, monospace">468 pts · CONF 0.98</text>
          <text x="22" y="363" fontSize="6" fill="#00D9FF" fillOpacity="0.25" fontFamily="Fira Code, monospace">SCRFD-10G · ResNet-50</text>
        </svg>
      </div>
      {/* Edge fades */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050509] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/70 via-transparent to-[#050509]/70 pointer-events-none" />
    </div>
  );
}

// Animated background particles
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 217, 255, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// Typing animation hook
function useTypingEffect(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex === 0) {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typedText = useTypingEffect(roles);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050509 0%, #0a0a14 50%, #050509 100%)' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className='bat'></div>
      <IsoCamSVG />
      {/* <NeuralCameraSVG/> */}
      {/* Right Face landmarks SVG */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] xl:w-[500px] pointer-events-none select-none hidden lg:block">
        <div style={{ animation: 'heroFloat 7s ease-in-out infinite' }}>
          <img src="public/images/face-3.png" alt=""/>
        </ div>
      </ div>
      
      {/* Particles */}
      <Particles />
      
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,217,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Large decorative circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00D9FF]/10 shadow-[0_0_50px_rgba(0,217,255,0.2)] blur-[1px] pointer-events-none"
      />
      {/* <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#00D9FF]/10 shadow-[0_0_50px_rgba(0,217,255,0.2)] blur-[1px] pointer-events-none"
      /> */}

      {/* Content */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D9FF]/25 bg-[#00D9FF]/05 m-4">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">
            Available for opportunities
          </span>
        </div>

        {/* Avatar placeholder */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-2 border-[#00D9FF]/40 flex items-center justify-center bg-[#0a0a14] text-4xl font-display font-bold text-[#00D9FF] text-glow overflow-hidden">
              <img src="public/images/profile.png" alt=""/>
            </div>
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                background: 'conic-gradient(from 0deg, #00D9FF, #7B2FBE, #FF6B35, #00D9FF)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white 0)',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white 0)',
                animation: 'orbit 4s linear infinite',
              }}
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white mb-3 tracking-tight">
          Mohd{'\n'}
          <span className="gradient-text">Zeeshan</span>
          {'  '}Saifi
        </h1>

        {/* Typing role */}
        <div className="h-10 flex items-center justify-center mb-6">
          <span className="font-mono text-xl md:text-2xl text-[#00D9FF] text-glow-sm">
            {typedText}
            <span className="cursor text-[#00D9FF]">|</span>
          </span>
        </div>

        {/* Summary */}
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-body">
          Building production-grade AI vision systems with{' '}
          <span className="text-[#00D9FF]">98% accuracy</span> at scale,
          from CCTV gate monitoring to PTZ classroom automation.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
          {personalInfo.stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-4 group hover:border-[#00D9FF]/30 transition-all duration-300"
            >
              <div className="stat-number text-2xl text-[#00D9FF] text-glow mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-mono tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-body mb-8">
          <MapPin size={14} className="text-[#00D9FF]" />
          <span>{personalInfo.location}</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="mailto:saifizeeshan895@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00D9FF] text-[#050509] font-display font-bold rounded hover:bg-white hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all duration-300 text-sm tracking-wide"
          >
            <Mail size={16} />
            Get In Touch
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#00D9FF]/30 bg-black text-slate-300 hover:text-[#00D9FF] hover:border-[#00D9FF] hover:bg-[#00D9FF]/05 rounded transition-all duration-300 text-sm"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#0A66C2]/30 bg-black text-slate-300 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/05 rounded transition-all duration-300 text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Scroll cue */}
        <div className="flex flex-col items-center gap-2 text-slate-600 text-xs font-mono tracking-widest animate-bounce">
          <span>SCROLL</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </section>
  );
}
