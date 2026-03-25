// ─────────────────────────────────────────────────────────────────────────────
// HeroSVGs.jsx
//
// DROP-IN usage inside Hero.jsx:
//   import { FaceDepthSVG, IsoCamSVG, HERO_SVG_KEYFRAMES } from './HeroSVGs';
//   <style>{HERO_SVG_KEYFRAMES}</style>
//   <FaceDepthSVG />   ← left panel
//   <IsoCamSVG />      ← right panel
// ─────────────────────────────────────────────────────────────────────────────

export const HERO_SVG_KEYFRAMES = `
  @keyframes heroFloat {
    0%,100% { transform:translateY(0px);  }
    50%      { transform:translateY(-14px); }
  }
  @keyframes heroScan {
    0%   { transform:translateY(-360px); }
    100% { transform:translateY(360px);  }
  }
  @keyframes heroGlow {
    0%,100% { opacity:1;   }
    50%     { opacity:0.3; }
  }
  @keyframes heroFovPulse {
    0%,100% { opacity:0.05; }
    50%     { opacity:0.14; }
  }
  @keyframes heroOrbit {
    0%   { transform:rotate(0deg);   }
    100% { transform:rotate(360deg); }
  }
`;

// ══════════════════════════════════════════════════════════════════════════════
// SHARED DEPTH COLOR  –  maps z (0 = far/bg, 1.6 = nose tip) → CSS color
// Matches the reference image: black → indigo → blue → cyan → green →
// yellow → orange → white-orange at the very tip
// ══════════════════════════════════════════════════════════════════════════════
function depthColor(z) {
  const t = Math.max(0, Math.min(1.0, z / 1.6));
  // 8-stop rainbow ramp
  const stops = [
    [0.00, [4,   0,  20]],   // near-black
    [0.09, [20,  0,  80]],   // deep indigo
    [0.20, [0,  20, 180]],   // pure blue
    [0.34, [0, 160, 210]],   // cyan
    [0.50, [0, 200, 100]],   // green
    [0.64, [180,220,  0]],   // yellow-green
    [0.78, [255,140,  0]],   // orange
    [0.90, [255, 60,  0]],   // red-orange
    [1.00, [255,220,200]],   // near-white
  ];
  let lo = stops[0], hi = stops[stops.length-1];
  for (let i = 0; i < stops.length-1; i++) {
    if (t >= stops[i][0] && t <= stops[i+1][0]) { lo=stops[i]; hi=stops[i+1]; break; }
  }
  const p = lo[0]===hi[0] ? 0 : (t-lo[0])/(hi[0]-lo[0]);
  const r = Math.round(lo[1][0] + p*(hi[1][0]-lo[1][0]));
  const g = Math.round(lo[1][1] + p*(hi[1][1]-lo[1][1]));
  const b = Math.round(lo[1][2] + p*(hi[1][2]-lo[1][2]));
  return `rgb(${r},${g},${b})`;
}

// ══════════════════════════════════════════════════════════════════════════════
// LEFT PANEL — Depth-Camera Face  (3/4 profile, dense pixel grid)
//
// Design intent (matching the reference image):
//   • 28 × 38 pixel grid — cells are small (≈8px) for dense texture
//   • Face oriented 3/4 right: the right cheek + nose protrude toward camera
//     (warm colors), the left side falls away (cool → black)
//   • Depth model: ellipsoid base + nose spike + brow/lip bumps + eye sockets
//   • Cells outside the face silhouette = fully transparent → black BG shows through
//   • Animated white scan-line sweeps down through the pixel field
//   • HUD corner brackets, confidence readout, landmark crosses
// ══════════════════════════════════════════════════════════════════════════════

const COLS = 28, ROWS = 38, CS = 8.5;   // cell size px
const OX = 18, OY = 32;                 // grid top-left in SVG

// Face silhouette: 3/4 oval, shifted slightly right
const FCX=0.60, FCY=0.48, FA=0.38, FB=0.44;

// Nose centre (profile-side) and tip protrusion
const NX=0.28, NY=0.54;

// Compute depth grid once (outside render — runs once at module load)
const DEPTH_GRID = (() => {
  const cells = [];
  for (let row=0; row<ROWS; row++) {
    for (let col=0; col<COLS; col++) {
      const xn = (col+0.5)/COLS;
      const yn = (row+0.5)/ROWS;

      // Is point inside the head oval?
      const fdx=(xn-FCX)/FA, fdy=(yn-FCY)/FB;
      const fd2=fdx*fdx+fdy*fdy;
      if (fd2 >= 1.0) continue;

      // Base sphere depth
      let z = Math.sqrt(Math.max(0, 1-fd2));

      // ── 3/4 rotation: right side (profile nose side) rotates toward camera
      const sideBoost = Math.max(0, (FCX - xn) * 1.6) * z;
      z += sideBoost;

      // ── Nose tip — the hottest peak in the depth map (matches reference)
      const ndx=(xn-NX)/0.075, ndy=(yn-NY)/0.10;
      const nd2=ndx*ndx+ndy*ndy;
      if (nd2 < 1) z += 0.85 * Math.pow(1-nd2, 1.4);

      // ── Nasal bridge (runs from brow to tip along x~0.30)
      const nbdx=(xn-0.32)/0.06, nbdy=(yn-0.44)/0.16;
      const nbd2=nbdx*nbdx+nbdy*nbdy;
      if (nbd2 < 1) z += 0.25*(1-nbd2);

      // ── Brow ridge (profile side)
      const bx=(xn-0.38)/0.14, by=(yn-0.36)/0.055;
      const bd2=bx*bx+by*by;
      if (bd2<1) z += 0.12*(1-bd2);

      // ── Lips protrusion
      const lx=(xn-0.40)/0.11, ly=(yn-0.68)/0.065;
      const ld2=lx*lx+ly*ly;
      if (ld2<1) z += 0.30*(1-ld2);

      // ── Cheekbone (profile/right side)
      const ckx=(xn-0.34)/0.10, cky=(yn-0.59)/0.11;
      const ckd2=ckx*ckx+cky*cky;
      if (ckd2<1) z += 0.20*(1-ckd2);

      // ── Chin
      const chx=(xn-0.50)/0.13, chy=(yn-0.84)/0.07;
      const chd2=chx*chx+chy*chy;
      if (chd2<1) z += 0.15*(1-chd2);

      // ── Left eye socket (far/profile side — deep recession)
      const lex=(xn-0.37)/0.07, ley=(yn-0.42)/0.06;
      const led2=lex*lex+ley*ley;
      if (led2<1) z -= 0.55*(1-led2);

      // ── Right eye socket (frontal, partially visible)
      const rex=(xn-0.70)/0.075, rey=(yn-0.41)/0.06;
      const red2=rex*rex+rey*rey;
      if (red2<1) z -= 0.50*(1-red2);

      // ── Temple hollow (left side falls away to nothing)
      if (xn > 0.82) z -= 0.5*(xn-0.82)*2;

      const zClamped = Math.max(0.02, Math.min(1.6, z));
      cells.push({ col, row, z: zClamped });
    }
  }
  return cells;
})();

// Key landmark positions
const LANDMARKS = [
  { xn:0.37, yn:0.42, label:'L.EYE',  c:'#7B2FBE' },
  { xn:0.70, yn:0.41, label:'R.EYE',  c:'#7B2FBE' },
  { xn:0.28, yn:0.54, label:'NOSE',   c:'#FF6B35'  },
  { xn:0.40, yn:0.68, label:'LIPS',   c:'#00D9FF'  },
  { xn:0.50, yn:0.85, label:'CHIN',   c:'#00D9FF'  },
];

const GW = COLS * CS;
const GH = ROWS * CS;
const VW = GW + OX*2;
const VH = GH + OY + 44;

export function FaceDepthSVG() {
  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[265px] xl:w-[310px] pointer-events-none select-none hidden lg:block">
      <div style={{ animation:'heroFloat 7s ease-in-out infinite' }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" xmlns="http://www.w3.org/2000/svg"
          style={{ filter:'drop-shadow(0 0 22px rgba(0,217,255,0.14))' }}>

          <defs>
            {/* Scan-line clip */}
            <clipPath id="dcClip">
              <rect x={OX} y={OY} width={GW} height={GH} />
            </clipPath>
            {/* Legend gradient */}
            <linearGradient id="lgGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgb(4,0,20)"    />
              <stop offset="20%"  stopColor="rgb(0,20,180)"  />
              <stop offset="40%"  stopColor="rgb(0,160,210)" />
              <stop offset="60%"  stopColor="rgb(0,200,100)" />
              <stop offset="78%"  stopColor="rgb(255,140,0)" />
              <stop offset="92%"  stopColor="rgb(255,60,0)"  />
              <stop offset="100%" stopColor="rgb(255,220,200)"/>
            </linearGradient>
          </defs>

          {/* ── Black background so empty cells = void ── */}
          <rect x={OX} y={OY} width={GW} height={GH} fill="#000008" />

          {/* ── HUD header ── */}
          <text x={OX} y={OY-13} fontSize="7" fill="#00D9FF" fillOpacity="0.45"
            fontFamily="Fira Code, monospace" letterSpacing="0.5">DEPTH_CAM · 3/4 PROFILE · 30fps</text>
          <text x={VW-OX} y={OY-13} fontSize="7" fill="#FF6B35" fillOpacity="0.55"
            textAnchor="end" fontFamily="Fira Code, monospace">CONF:0.98</text>

          {/* ── Outer frame ── */}
          <rect x={OX-1} y={OY-1} width={GW+2} height={GH+2}
            fill="none" stroke="rgba(0,217,255,0.22)" strokeWidth="0.8" />

          {/* ── Depth pixel cells ── */}
          {DEPTH_GRID.map(({ col, row, z }) => {
            const opacity = Math.min(1, 0.55 + z * 0.29);
            return (
              <rect
                key={`${col}-${row}`}
                x={OX + col*CS + 0.4}
                y={OY + row*CS + 0.4}
                width={CS - 0.8}
                height={CS - 0.8}
                rx="1.4"
                fill={depthColor(z)}
                opacity={opacity}
              />
            );
          })}

          {/* ── Scan line ── */}
          <rect x={OX} y={OY} width={GW} height={6}
            fill="rgba(255,255,255,0.50)" clipPath="url(#dcClip)" rx="3"
            style={{ animation:'heroScan 4s linear infinite' }} />

          {/* ── Landmark crosses ── */}
          {LANDMARKS.map(({ xn, yn, label, c }) => {
            const px = OX + xn*GW, py = OY + yn*GH;
            const left = xn < 0.52;
            const lx = left ? px - 24 : px + 24;
            const ly = py - 8;
            return (
              <g key={label}>
                {/* Outer ring */}
                <circle cx={px} cy={py} r="6"
                  fill="none" stroke={c} strokeWidth="1.3" strokeOpacity="0.80"
                  style={{ animation:'heroGlow 2s ease-in-out infinite' }} />
                {/* Core dot */}
                <circle cx={px} cy={py} r="2.2" fill={c} fillOpacity="0.95" />
                {/* Cross arms */}
                <line x1={px-9} y1={py} x2={px-6.5} y2={py} stroke={c} strokeWidth="0.8" strokeOpacity="0.6"/>
                <line x1={px+6.5} y1={py} x2={px+9} y2={py} stroke={c} strokeWidth="0.8" strokeOpacity="0.6"/>
                <line x1={px} y1={py-9} x2={px} y2={py-6.5} stroke={c} strokeWidth="0.8" strokeOpacity="0.6"/>
                <line x1={px} y1={py+6.5} x2={px} y2={py+9} stroke={c} strokeWidth="0.8" strokeOpacity="0.6"/>
                {/* Leader + label */}
                <line x1={px} y1={py} x2={lx} y2={ly}
                  stroke={c} strokeWidth="0.55" strokeOpacity="0.40" strokeDasharray="2 1.5" />
                <text x={lx + (left ? -2 : 2)} y={ly - 2}
                  textAnchor={left ? 'end' : 'start'}
                  fontSize="5.5" fill={c} fillOpacity="0.75"
                  fontFamily="Fira Code, monospace">{label}</text>
              </g>
            );
          })}

          {/* ── Corner HUD brackets ── */}
          {[
            [[OX,OY],[OX+20,OY],[OX,OY+20]],
            [[OX+GW,OY],[OX+GW-20,OY],[OX+GW,OY+20]],
            [[OX,OY+GH],[OX,OY+GH-20],[OX+20,OY+GH]],
            [[OX+GW,OY+GH],[OX+GW-20,OY+GH],[OX+GW,OY+GH-20]],
          ].map((pts, i) => (
            <polyline key={i}
              points={pts.map(p=>p.join(',')).join(' ')}
              fill="none" stroke="#00D9FF" strokeWidth="2.4" strokeLinecap="round" />
          ))}

          {/* ── Depth legend bar ── */}
          <rect x={OX} y={OY+GH+12} width={GW} height={6}
            rx="3" fill="url(#lgGrad)" opacity="0.88" />
          <text x={OX}    y={OY+GH+28} fontSize="6" fill="rgb(40,0,120)"   fontFamily="Fira Code, monospace">FAR</text>
          <text x={OX+GW} y={OY+GH+28} fontSize="6" fill="rgb(255,200,180)" textAnchor="end" fontFamily="Fira Code, monospace">NEAR</text>
          <text x={OX+GW/2} y={OY+GH+28} fontSize="5.5" fill="rgba(0,217,255,0.28)"
            textAnchor="middle" fontFamily="Fira Code, monospace">Δ depth (mm)</text>

          {/* ── Bottom meta line ── */}
          <text x={OX} y={VH-2} fontSize="5.8" fill="rgba(0,217,255,0.25)"
            fontFamily="Fira Code, monospace">SCRFD-10G · ResNet-50 w600k · Milvus</text>
        </svg>
      </div>

      {/* Soft edge fades so it bleeds into the dark BG */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050509] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/60 via-transparent to-[#050509]/60 pointer-events-none" />
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// RIGHT PANEL — Isometric CCTV Detection Scene
// (unchanged from last version — solid and fits the theme)
// ══════════════════════════════════════════════════════════════════════════════

const ISO = { ox:185, oy:95, tw:26, th:13 };

function isoP(gx, gz, gy=0) {
  return [
    ISO.ox + (gx-gz)*ISO.tw,
    ISO.oy + (gx+gz)*ISO.th - gy*ISO.th*2,
  ];
}
function pstr(arr) {
  return arr.map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

function FloorTile({ gx, gz, bright }) {
  const c = [isoP(gx,gz),isoP(gx+1,gz),isoP(gx+1,gz+1),isoP(gx,gz+1)];
  return (
    <polygon points={pstr(c)}
      fill={`rgba(0,217,255,${bright?0.055:0.018})`}
      stroke={`rgba(0,217,255,${bright?0.16:0.07})`}
      strokeWidth="0.5" />
  );
}

function IsoBox({ gx, gz, w, d, h, color, alpha=0.65 }) {
  const T=(x,z)=>isoP(gx+x,gz+z,h);
  const B=(x,z)=>isoP(gx+x,gz+z,0);
  const top  =[T(0,0),T(w,0),T(w,d),T(0,d)];
  const left =[B(0,0),B(0,d),T(0,d),T(0,0)];
  const right=[B(0,d),B(w,d),T(w,d),T(0,d)];
  const edges=[[B(0,0),B(w,0)],[B(w,0),B(w,d)],[B(w,d),B(0,d)],[B(0,d),B(0,0)],
               [T(0,0),T(w,0)],[T(w,0),T(w,d)],[T(w,d),T(0,d)],[T(0,d),T(0,0)],
               [B(0,0),T(0,0)],[B(w,0),T(w,0)],[B(w,d),T(w,d)],[B(0,d),T(0,d)]];
  return (
    <g>
      <polygon points={pstr(top)}   fill={`${color}1A`} />
      <polygon points={pstr(left)}  fill={`${color}0D`} />
      <polygon points={pstr(right)} fill={`${color}0A`} />
      {edges.map(([a,b],i)=>(
        <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
          stroke={color} strokeWidth="0.85" strokeOpacity={alpha} />
      ))}
    </g>
  );
}

function IsoCamera({ gx, gz, poleH=5 }) {
  const cy=poleH, cw=2.0, cd=1.0, ch=0.55;
  const T=(x,z)=>isoP(gx+x,gz+z,cy+ch);
  const B=(x,z)=>isoP(gx+x,gz+z,cy);
  const pBot=isoP(gx+cw*0.5,gz+cd*0.5,0);
  const pTop=isoP(gx+cw*0.5,gz+cd*0.5,cy);
  const lens=isoP(gx+cw,gz+cd*0.5,cy+ch*0.5);
  return (
    <g>
      <line x1={pBot[0]} y1={pBot[1]} x2={pTop[0]} y2={pTop[1]}
        stroke="rgba(0,217,255,0.38)" strokeWidth="2.8" strokeLinecap="round" />
      <polygon points={pstr([T(0,0),T(cw,0),T(cw,cd),T(0,cd)])}
        fill="rgba(0,217,255,0.12)" stroke="#00D9FF" strokeWidth="0.9" strokeOpacity="0.6" />
      <polygon points={pstr([B(cw,0),B(cw,cd),T(cw,cd),T(cw,0)])}
        fill="rgba(0,217,255,0.06)" stroke="#00D9FF" strokeWidth="0.9" strokeOpacity="0.5" />
      <polygon points={pstr([B(0,0),B(cw,0),T(cw,0),T(0,0)])}
        fill="rgba(0,217,255,0.08)" stroke="#00D9FF" strokeWidth="0.9" strokeOpacity="0.5" />
      <circle cx={lens[0]} cy={lens[1]} r="7.5"
        fill="rgba(0,0,20,0.88)" stroke="#00D9FF" strokeWidth="1.5" strokeOpacity="0.82" />
      <circle cx={lens[0]} cy={lens[1]} r="4.5"
        fill="rgba(0,217,255,0.14)" stroke="#00D9FF" strokeWidth="0.7" strokeOpacity="0.5" />
      <circle cx={lens[0]} cy={lens[1]} r="2"   fill="#00D9FF" fillOpacity="0.7" />
      <circle cx={lens[0]-2} cy={lens[1]-2} r="1.3" fill="white" fillOpacity="0.5" />
      {[52,63,72].map((x,i)=>(
        <circle key={i}
          cx={isoP(gx+cw*0.1*i+0.7,gz+cd*0.1,cy+ch*0.5)[0]}
          cy={isoP(gx+cw*0.1*i+0.7,gz+cd*0.1,cy+ch*0.5)[1]}
          r="2.2" fill="rgba(255,107,53,0.2)" stroke="#FF6B35" strokeWidth="0.8" strokeOpacity="0.6"
          style={{animation:`heroGlow ${1.3+i*0.25}s ease-in-out infinite`}} />
      ))}
      <circle
        cx={isoP(gx+0.25,gz,cy+ch)[0]}
        cy={isoP(gx+0.25,gz,cy+ch)[1]}
        r="2.4" fill="#22c55e"
        style={{animation:'heroGlow 1s ease-in-out infinite'}} />
      <text x={isoP(gx+cw*0.5,gz+cd*0.5,cy+ch+0.45)[0]}
            y={isoP(gx+cw*0.5,gz+cd*0.5,cy+ch+0.45)[1]}
        textAnchor="middle" fontSize="6" fill="#00D9FF" fillOpacity="0.48"
        fontFamily="Fira Code, monospace">CCTV·PTZ</text>
    </g>
  );
}

function DetectionLabel({ gx, gz, h, color, pid, conf }) {
  const top=isoP(gx+0.5,gz+0.5,h+0.7);
  return (
    <g>
      <circle cx={top[0]} cy={top[1]+9} r="2.2" fill={color} fillOpacity="0.55" />
      <line x1={top[0]} y1={top[1]+7} x2={top[0]} y2={top[1]-2}
        stroke={color} strokeWidth="0.6" strokeOpacity="0.38" strokeDasharray="2 1.5" />
      <rect x={top[0]-22} y={top[1]-22} width={44} height={20} rx="5"
        fill={`${color}18`} stroke={color} strokeWidth="0.8" strokeOpacity="0.65" />
      <text x={top[0]} y={top[1]-9} textAnchor="middle"
        fontSize="6" fill={color} fontFamily="Fira Code, monospace">{pid}</text>
      <text x={top[0]} y={top[1]-2} textAnchor="middle"
        fontSize="5.5" fill={color} fillOpacity="0.68" fontFamily="Fira Code, monospace">{conf}</text>
    </g>
  );
}

const SUBJECTS=[
  {gx:0.5,gz:1.5,color:'#00D9FF',pid:'ID:001',conf:'0.97'},
  {gx:3.0,gz:1.0,color:'#FF6B35',pid:'ID:002',conf:'0.94'},
  {gx:1.5,gz:3.5,color:'#7B2FBE',pid:'ID:003',conf:'0.91'},
];
const CAM_GX=-0.5,CAM_GZ=-0.5;

export function IsoCamSVG() {
  const camLens=isoP(CAM_GX+2.0,CAM_GZ+0.5,5.28);
  const floorTiles=[];
  for(let gx=-1;gx<=6;gx++) for(let gz=-1;gz<=5;gz++){
    const d=Math.sqrt((gx-2.5)**2+(gz-2.5)**2);
    floorTiles.push(<FloorTile key={`${gx}${gz}`} gx={gx} gz={gz} bright={d<2.2} />);
  }
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[295px] xl:w-[400px] pointer-events-none select-none hidden lg:block">
      <div style={{animation:'heroFloat 8.5s ease-in-out infinite',animationDelay:'1.4s'}}>
        <svg viewBox="0 0 375 395" width="100%" xmlns="http://www.w3.org/2000/svg"
          style={{filter:'drop-shadow(0 0 18px rgba(0,217,255,0.10))'}}>
          <defs>
            <radialGradient id="fglow" cx="50%" cy="58%" r="46%">
              <stop offset="0%"   stopColor="#00D9FF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0"   />
            </radialGradient>
            <marker id="arr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#00D9FF" fillOpacity="0.42" />
            </marker>
          </defs>

          <rect x="0" y="0" width="375" height="395" fill="url(#fglow)" />
          {floorTiles}
          <IsoCamera gx={CAM_GX} gz={CAM_GZ} poleH={5} />

          {/* FOV triangle */}
          {(() => {
            const L=isoP(SUBJECTS[2].gx,SUBJECTS[2].gz,0);
            const R=isoP(SUBJECTS[1].gx+1,SUBJECTS[1].gz,0);
            return(
              <polygon
                points={`${camLens[0]},${camLens[1]} ${L[0]},${L[1]} ${R[0]},${R[1]}`}
                fill="rgba(0,217,255,0.04)"
                stroke="rgba(0,217,255,0.12)" strokeWidth="0.5" strokeDasharray="5 3"
                style={{animation:'heroFovPulse 3s ease-in-out infinite'}} />
            );
          })()}

          {/* FOV dashed rays */}
          {SUBJECTS.map(s=>{
            const t=isoP(s.gx+0.5,s.gz+0.5,3.5);
            return(
              <g key={`r${s.pid}`}>
                <line x1={camLens[0]} y1={camLens[1]} x2={t[0]} y2={t[1]}
                  stroke="#00D9FF" strokeWidth="0.7" strokeOpacity="0.20" strokeDasharray="5 3" />
                <circle cx={t[0]} cy={t[1]} r="2.6"
                  fill={s.color} fillOpacity="0.5"
                  style={{animation:'heroGlow 2s ease-in-out infinite'}} />
              </g>
            );
          })}

          {/* Person boxes */}
          {SUBJECTS.map(s=>(
            <IsoBox key={s.pid} gx={s.gx} gz={s.gz} w={1} d={1} h={3.5} color={s.color} />
          ))}

          {/* Labels */}
          {SUBJECTS.map(s=>(
            <DetectionLabel key={`l${s.pid}`}
              gx={s.gx} gz={s.gz} h={3.5} color={s.color} pid={s.pid} conf={s.conf} />
          ))}

          {/* System panel */}
          <g transform="translate(10,308)">
            <rect x="0" y="0" width="114" height="64" rx="7"
              fill="rgba(0,217,255,0.04)" stroke="rgba(0,217,255,0.18)" strokeWidth="0.8" />
            {[
              {label:'STREAMS', val:'20+',     color:'#00D9FF'},
              {label:'DETECT',  val:'3 / frm', color:'#FF6B35'},
              {label:'LATENCY', val:'<32 ms',  color:'#7B2FBE'},
              {label:'ACC',     val:'98.0%',   color:'#22d3ee'},
            ].map(({label,val,color},i)=>(
              <g key={label} transform={`translate(8,${15+i*13})`}>
                <rect x="0" y="-8" width="4" height="8" rx="1" fill={color} fillOpacity="0.65" />
                <text x="9" y="0" fontSize="6.2" fill="rgba(255,255,255,0.38)"
                  fontFamily="Fira Code, monospace">{label}</text>
                <text x="64" y="0" fontSize="7" fill={color} fillOpacity="0.92"
                  fontFamily="Fira Code, monospace">{val}</text>
              </g>
            ))}
          </g>

          <text x="10" y="382" fontSize="6" fill="#76b900" fillOpacity="0.48"
            fontFamily="Fira Code, monospace">NVIDIA DGX A100 · TensorRT FP16</text>
          <text x="10" y="392" fontSize="5.5" fill="rgba(0,217,255,0.22)"
            fontFamily="Fira Code, monospace">Milvus · 24K embeddings · InsightFace</text>
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-[#050509] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050509]/60 via-transparent to-[#050509]/60 pointer-events-none" />
    </div>
  );
}