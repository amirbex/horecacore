import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { SiteContent } from '../../store/mockDb';

const CX = 200, CY = 200;
const CORE = "#1A1F24", SAGE = "#A8BCA8", ORANGE = "#FF8C42";

function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function ringSegment(rOuter: number, rInner: number, start: number, end: number) {
  const so = polar(rOuter, start);
  const eo = polar(rOuter, end);
  const si = polar(rInner, start);
  const ei = polar(rInner, end);
  const large = Math.abs(end - start) > 180 ? 1 : 0;
  const sweep = end > start ? 1 : 0;
  const rev = 1 - sweep;
  return [
    "M", so.x, so.y,
    "A", rOuter, rOuter, 0, large, sweep, eo.x, eo.y,
    "L", ei.x, ei.y,
    "A", rInner, rInner, 0, large, rev, si.x, si.y,
    "Z"
  ].join(" ");
}

function arcPath(r: number, start: number, end: number) {
  const s = polar(r, start);
  const e = polar(r, end);
  const large = Math.abs(end - start) > 180 ? 1 : 0;
  const sweep = end > start ? 1 : 0;
  return ["M", s.x, s.y, "A", r, r, 0, large, sweep, e.x, e.y].join(" ");
}

const segDelays = [
  { c: "ls-seg-d1", dx: -50, dy: -30, rot: 12 },
  { c: "ls-seg-d2", dx: 55, dy: -26, rot: -8 },
  { c: "ls-seg-d3", dx: 42, dy: 45, rot: 15 },
  { c: "ls-seg-d4", dx: -46, dy: 38, rot: -10 },
  { c: "ls-seg-d5", dx: 0, dy: -60, rot: 6 },
  { c: "ls-seg-d6", dx: 60, dy: 12, rot: -14 },
  { c: "ls-seg-d7", dx: -22, dy: 55, rot: 10 },
  { c: "ls-seg-d8", dx: -55, dy: -12, rot: -6 },
  { c: "ls-seg-d9", dx: 32, dy: -52, rot: 8 },
  { c: "ls-seg-d10", dx: 50, dy: 35, rot: -12 }
];

export default function SlideCoreHero({ content, onIntroComplete }: { content?: SiteContent, onIntroComplete?: () => void }) {
  const [isIntro, setIsIntro] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Lock scroll during intro
    if (isIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isIntro]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });
  
  // Opacity fade out when scrolling
  const opacityFade = useTransform(smoothProgress, [0, 0.4, 0.6], [1, 1, 0]);
  const textOpacityFade = useTransform(smoothProgress, [0, 0.05], [1, 0]);
  
  // Zooming effect for the logo when scrolling
  const logoZoom = useTransform(smoothProgress, [0, 0.5], [1, 20]);
  const logoY = useTransform(smoothProgress, [0, 1], ["0vh", "60vh"]);
  
  // Brand text moving into logo
  const textMoveProgress = useTransform(smoothProgress, [0, 0.25], [0, 1]);
  
  // Late opacity for logo and text
  const lateOpacity = useTransform(smoothProgress, [0.25, 0.5], [1, 0]);
  
  // Scattering effect for logo pieces
  const scatterOuterScale = useTransform(smoothProgress, [0, 1], [1, 5]);
  const scatterOuterRot = useTransform(smoothProgress, [0, 1], [0, 90]);
  const scatterMidScale = useTransform(smoothProgress, [0, 1], [1, 3]);
  const scatterMidRot = useTransform(smoothProgress, [0, 1], [0, -45]);
  const scatterInnerScale = useTransform(smoothProgress, [0, 1], [1, 0]);

  useEffect(() => {
    // Intro lasts 5.5 seconds before transitioning to hero state
    const t = setTimeout(() => {
      setIsIntro(false);
      if (onIntroComplete) onIntroComplete();
    }, 6500);
    return () => clearTimeout(t);
  }, [onIntroComplete]);

  return (
    <section 
      ref={containerRef}
      className="snap-slide relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#f2f5f8] text-[#1A1F24] select-none z-0" 
      id="slide-hero"
    >
      <style>{`
        .ls-brand-text-move {
          --text-target-x: 0px;
          --text-target-y: -90px;
          transform: translate(calc(var(--text-target-x) * var(--move-progress, 0)), calc(var(--text-target-y) * var(--move-progress, 0)));
        }
        @media (min-width: 640px) {
          .ls-brand-text-move {
            --text-target-x: -12vw;
            --text-target-y: 0px;
          }
        }
        .ls-stage {
          --core: #1A1F24;
          --sage: #A8BCA8;
          --orange: #FF8C42;
          --grid: rgba(168, 188, 168, 0.25);
          --grid-light: rgba(168, 188, 168, 0.1);
        }

        .ls-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px),
            linear-gradient(var(--grid-light) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-light) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          background-position: center center;
          z-index: 0;
        }

        .ls-vignette {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 15%, rgba(242,245,248,0.95) 100%);
          z-index: 1;
        }

        .ls-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }

                        @keyframes ls-core-appear {
          0% { opacity: 0; transform: scale(0.05); animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
          15% { opacity: 1; transform: scale(5.5); filter: drop-shadow(0 0 40px rgba(26, 31, 36, 0.8)); animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1); }
          72% { opacity: 1; transform: scale(5.5); filter: drop-shadow(0 0 40px rgba(26, 31, 36, 0.8)); animation-timing-function: cubic-bezier(0.5, 0, 0.2, 1); }
          88% { transform: scale(0.95); filter: drop-shadow(0 0 10px rgba(26, 31, 36, 0.3)); animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
          100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 15px rgba(26, 31, 36, 0.4)); }
        }

                        @keyframes ls-eye-look {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          8% { transform: translate(0, 0) scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
          11% { transform: translate(0, 0) scale(1.4); opacity: 1; animation-timing-function: ease-out; }
          14% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(0, 0) scale(1); animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
          /* Look Right */
          25% { transform: translate(12px, 0px) scale(1.1); }
          32% { transform: translate(12px, 0px) scale(1.1); animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
          /* Look Up */
          37% { transform: translate(8px, -11px) scale(0.9); }
          44% { transform: translate(8px, -11px) scale(0.9); animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
          /* Look Down */
          49% { transform: translate(2px, 12px) scale(1.05); }
          56% { transform: translate(2px, 12px) scale(1.05); animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
          /* Look Left */
          61% { transform: translate(-10px, 2px) scale(0.95); }
          68% { transform: translate(-10px, 2px) scale(0.95); animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
          /* Back to Centerish */
          75% { transform: translate(-2px, -1px) scale(1); }
          82% { transform: translate(-2px, -1px) scale(1); animation-timing-function: cubic-bezier(0.5, 0, 0.2, 1); }
          /* Rest inside */
          88% { transform: translate(-5px, -5px) scale(1); opacity: 0.8; }
          100% { transform: translate(-5px, -5px) scale(1); opacity: 0.8; }
        }


        @keyframes ls-core-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(26, 31, 36, 0.4)); }
          50% { filter: drop-shadow(0 0 12px rgba(26, 31, 36, 0.35)); }
        }
        @keyframes ls-wire-draw {
          0% { stroke-dashoffset: 1; opacity: 0; }
          18% { opacity: 0.85; }
          100% { stroke-dashoffset: 0; opacity: 0.62; }
        }
        @keyframes ls-segment-slide-in {
          0% {
            opacity: 0;
            transform: translate(var(--dx, 0px), var(--dy, 0px)) scale(0.76) rotate(calc(var(--rot, 0deg) * 0.1deg));
          }
          62% {
            opacity: 1;
            transform: translate(calc(var(--dx, 0px) * 0.06), calc(var(--dy, 0px) * 0.06)) scale(1.045) rotate(0deg);
          }
          82% { transform: translate(0, 0) scale(0.985); }
          100% { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        @keyframes ls-tick-lock {
          0% { opacity: 0; transform: scale(0.35); filter: blur(2px); }
          55% { opacity: 1; transform: scale(1.22); filter: blur(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ls-text-rise {
          0% { opacity: 0; transform: translateY(24px); letter-spacing: 0.2em; filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 0.06em; filter: blur(0); }
        }
        @keyframes ls-fa-rise {
          0% { opacity: 0; transform: translateY(20px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes ls-rotate-cw {
          0% { transform: rotate(0deg); animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
          5% { transform: rotate(18deg); animation-timing-function: linear; }
          100% { transform: rotate(378deg); }
        }
        @keyframes ls-rotate-ccw {
          0% { transform: rotate(0deg); animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
          5% { transform: rotate(-18deg); animation-timing-function: linear; }
          100% { transform: rotate(-378deg); }
        }
        @keyframes ls-dim-fade { 0% { opacity: 0; } 100% { opacity: 0.42; } }
        @keyframes ls-pulse-ring {
          0% { opacity: 0; transform: scale(0.48); stroke-width: 1.5px; }
          30% { opacity: 0.34; }
          100% { opacity: 0; transform: scale(1.75); stroke-width: 1.5px; }
        }
        .ls-anim-core { opacity: 0; transform-origin: center; transform-box: fill-box; animation: ls-core-appear 4s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both, ls-core-glow 2.4s ease-in-out 4.5s infinite; }
        .ls-anim-eye { opacity: 0; transform-origin: center; transform-box: fill-box; animation: ls-eye-look 4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both; }
        .ls-anim-pulse-ring { opacity: 0; transform-origin: 200px 200px; animation: ls-pulse-ring 1.1s ease-out 3.5s both; }
        .ls-anim-wire { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; animation: ls-wire-draw 1.05s cubic-bezier(0.4, 0, 0.2, 1) both; }
        .ls-anim-segment { opacity: 0; transform-origin: 200px 200px; animation: ls-segment-slide-in 0.78s cubic-bezier(0.18, 0.88, 0.24, 1.18) both; }
        .ls-anim-tick { opacity: 0; transform-origin: center; transform-box: fill-box; animation: ls-tick-lock 0.44s cubic-bezier(0.34, 1.45, 0.64, 1) both; }
        .ls-anim-dims { opacity: 0; animation: ls-dim-fade 0.9s ease 3.45s both; }
        @keyframes ls-bg-disk-fade {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .ls-anim-bg-disk { opacity: 0; animation: ls-bg-disk-fade 1.5s ease-out 4.5s forwards; }
.ls-rotate-outer { transform-origin: 200px 200px; animation: ls-rotate-cw 30s infinite; animation-delay: 5.5s; }
        .ls-rotate-inner { transform-origin: 200px 200px; animation: ls-rotate-ccw 20s infinite; animation-delay: 5.5s; }
        .ls-rotate-mid { transform-origin: 200px 200px; animation: ls-rotate-cw 45s infinite; animation-delay: 5.5s; }

        .ls-seg-d1 { animation-delay: 4.50s; --dx: -50px; --dy: -30px; }
        .ls-seg-d2 { animation-delay: 4.58s; --dx: 55px;  --dy: -25px; }
        .ls-seg-d3 { animation-delay: 4.66s; --dx: 45px;  --dy: 45px; }
        .ls-seg-d4 { animation-delay: 4.74s; --dx: -45px; --dy: 40px; }
        .ls-seg-d5 { animation-delay: 4.82s; --dx: 0px;   --dy: -60px; }
        .ls-seg-d6 { animation-delay: 4.90s; --dx: 60px;  --dy: 10px; }
        .ls-seg-d7 { animation-delay: 4.98s; --dx: -25px; --dy: 55px; }
        .ls-seg-d8 { animation-delay: 5.06s; --dx: -55px; --dy: -15px; }
        .ls-seg-d9 { animation-delay: 5.12s; --dx: 35px;  --dy: -50px; }
        .ls-seg-d10{ animation-delay: 5.18s; --dx: 50px;  --dy: 35px; }
        .ls-tick-d1 { animation-delay: 5.00s; }
        .ls-tick-d2 { animation-delay: 5.08s; }
        .ls-tick-d3 { animation-delay: 5.16s; }
        .ls-tick-d4 { animation-delay: 3.24s; }
      `}</style>
      
      <div className="ls-stage ls-bg" />
      <div className="ls-noise" />
      <div className="ls-vignette" />

      <motion.div style={{ opacity: opacityFade }} className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 max-w-7xl mx-auto pt-24 pb-16">
        
        {/* Animated Logo and Brand Text Wrapper */}
        <motion.div
          layout
          style={{ scale: logoZoom, y: logoY }}
          className={`relative flex items-center justify-center z-20 transform-gpu origin-center ${isIntro ? 'flex-col gap-6 mb-8' : 'flex-col sm:flex-row gap-4 mb-4'}`}
          transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* Animated Logo Container */}
          <motion.div
            layout
            animate={isIntro ? {
              width: "min(75vw, 260px)",
              height: "min(75vw, 260px)"
            } : {
              width: "min(35vw, 140px)",
              height: "min(35vw, 140px)"
            }}
            transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative flex justify-center items-center transform-gpu shrink-0 origin-center"
          >
            <div className="w-full h-full relative">
              <div className="ls-anim-bg-disk absolute inset-[6%] rounded-full bg-white/45 shadow-[0_0_60px_rgba(168,188,168,0.15),inset_0_0_20px_rgba(255,255,255,0.8)] backdrop-blur-[3px]" />
              
              <svg viewBox="0 0 400 400" className="relative w-full h-full block z-10 drop-shadow-xl" role="img" aria-label="HoReCa CORE technical blueprint">
                <defs>
                  <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#1a1f24" floodOpacity="0.2"/>
                  </filter>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                </defs>

                {/* Dimension guides */}
                <g className="ls-anim-dims" stroke="#9db4c7" strokeWidth="0.7" fill="none">
                  <rect x="58" y="58" width="284" height="284" strokeDasharray="3 4"/>
                  <line x1="58" y1="42" x2="342" y2="42"/><line x1="58" y1="36" x2="58" y2="48"/><line x1="342" y1="36" x2="342" y2="48"/>
                  <text x="200" y="34" textAnchor="middle" fill="#9db4c7" fontSize="10" fontFamily="Inter, sans-serif" stroke="none">H</text>
                  <line x1="42" y1="58" x2="42" y2="342"/><line x1="36" y1="58" x2="48" y2="58"/><line x1="36" y1="342" x2="48" y2="342"/>
                  <text x="28" y="204" textAnchor="middle" fill="#9db4c7" fontSize="10" fontFamily="Inter, sans-serif" stroke="none" transform="rotate(-90 28 204)">H</text>
                  <line x1="358" y1="120" x2="358" y2="200"/><line x1="352" y1="120" x2="364" y2="120"/><line x1="352" y1="200" x2="364" y2="200"/>
                  <text x="372" y="164" textAnchor="middle" fill="#9db4c7" fontSize="10" fontFamily="Inter, sans-serif" stroke="none">H</text>
                  <line x1="358" y1="200" x2="358" y2="280"/><line x1="352" y1="280" x2="364" y2="280"/>
                  <text x="372" y="244" textAnchor="middle" fill="#9db4c7" fontSize="10" fontFamily="Inter, sans-serif" stroke="none">H</text>
                  <line x1="200" y1="70" x2="200" y2="330" strokeDasharray="2 5" opacity="0.6"/>
                  <line x1="70" y1="200" x2="330" y2="200" strokeDasharray="2 5" opacity="0.6"/>
                  <line x1="90" y1="90" x2="310" y2="310" strokeDasharray="1 6" opacity="0.35"/>
                  <line x1="310" y1="90" x2="90" y2="310" strokeDasharray="1 6" opacity="0.35"/>
                </g>

                {/* Wireframe rings */}
                <g fill="none" stroke="#1a1f24" strokeWidth="0.9" strokeLinecap="round" pathLength={1}>
                  {[48, 68, 88, 108, 128, 148].map((r, i) => (
                    <circle key={`wire-${i}`} className="ls-anim-wire" cx={CX} cy={CY} r={r} style={{ animationDelay: `${3.5 + i * 0.08}s`, opacity: 0.4 }} />
                  ))}
                  <path className="ls-anim-wire" d={arcPath(158, -20, 100)} style={{ animationDelay: "3.95s" }} />
                  <path className="ls-anim-wire" d={arcPath(158, 120, 220)} style={{ animationDelay: "4.0s" }} />
                  <path className="ls-anim-wire" d={arcPath(158, 240, 320)} style={{ animationDelay: "4.05s" }} />
                </g>

                {/* OUTER CW */}
                <motion.g style={{ scale: scatterOuterScale, rotate: scatterOuterRot, transformOrigin: '200px 200px' }}>
                  <g className="ls-rotate-outer">
                    {[
                      [152, 132, -15, 55, SAGE, 1],
                      [152, 134, 70, 118, SAGE, 0.8],
                      [150, 128, 200, 255, SAGE, 1],
                      [148, 130, 280, 330, SAGE, 0.9],
                      [150, 118, 55, 78, CORE, 1],
                      [148, 112, 175, 198, CORE, 1],
                      [146, 122, 255, 272, CORE, 1],
                      [154, 138, 58, 66, ORANGE, 1],
                      [154, 138, 112, 120, ORANGE, 1],
                      [152, 136, 268, 276, ORANGE, 1],
                      [152, 136, 318, 326, ORANGE, 1]
                    ].map((s, i) => (
                      <path key={`outer-${i}`} className={`ls-anim-segment ${segDelays[i % 10].c}`} d={ringSegment(s[0] as number, s[1] as number, s[2] as number, s[3] as number)} fill={s[4] as string} opacity={(s[5] as number) < 1 ? s[5] as number : undefined} />
                    ))}
                    <rect className="ls-anim-segment ls-seg-d2" x="48" y="194" width="22" height="8" rx="1" fill={ORANGE} style={{ animationDelay: "3.05s", "--dx": "-40px", "--dy": "0px" } as any} />
                    <rect className="ls-anim-segment ls-seg-d3" x="48" y="204" width="18" height="5" rx="1" fill={CORE} style={{ animationDelay: "3.1s", "--dx": "-40px", "--dy": "0px" } as any} />
                    <rect className="ls-anim-segment ls-seg-d4" x="330" y="194" width="22" height="8" rx="1" fill={ORANGE} style={{ animationDelay: "3.05s", "--dx": "40px", "--dy": "0px" } as any} />
                    <rect className="ls-anim-segment ls-seg-d5" x="334" y="204" width="18" height="5" rx="1" fill={CORE} style={{ animationDelay: "3.1s", "--dx": "40px", "--dy": "0px" } as any} />
                    {[{ a: 28, r: 142, d: "ls-tick-d1" }, { a: 105, r: 140, d: "ls-tick-d2" }, { a: 230, r: 138, d: "ls-tick-d3" }, { a: 305, r: 144, d: "ls-tick-d4" }].map((dot, i) => {
                      const p = polar(dot.r, dot.a);
                      return <circle key={`outer-dot-${i}`} className={`ls-anim-tick ${dot.d}`} cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r="4.5" fill={ORANGE} filter="url(#glow)" />;
                    })}
                  </g>
                </motion.g>

                {/* MID slow CW */}
                <motion.g style={{ scale: scatterMidScale, rotate: scatterMidRot, transformOrigin: '200px 200px' }}>
                  <g className="ls-rotate-mid">
                    {[
                      [118, 100, -5, 70, SAGE, 0.95],
                      [120, 102, 95, 145, SAGE, 0.6],
                      [118, 98, 160, 210, CORE, 1],
                      [116, 100, 230, 280, SAGE, 1],
                      [118, 104, 300, 340, SAGE, 0.8]
                    ].map((s, i) => (
                      <path key={`mid-${i}`} className={`ls-anim-segment ${segDelays[(i + 2) % 10].c}`} d={ringSegment(s[0] as number, s[1] as number, s[2] as number, s[3] as number)} fill={s[4] as string} opacity={(s[5] as number) < 1 ? s[5] as number : undefined} />
                    ))}
                    {[{ a: 0, len: 18 }, { a: 90, len: 14 }, { a: 180, len: 16 }, { a: 270, len: 12 }].map((bar, i) => {
                      const inner = polar(88, bar.a);
                      const outer = polar(88 + bar.len, bar.a);
                      return <line key={`mid-line-${i}`} className={`ls-anim-segment ${segDelays[i % 10].c}`} x1={inner.x.toFixed(2)} y1={inner.y.toFixed(2)} x2={outer.x.toFixed(2)} y2={outer.y.toFixed(2)} stroke={CORE} strokeWidth="3.5" strokeLinecap="round" />;
                    })}
                    {[{ a: 42, r: 110 }, { a: 155, r: 112 }, { a: 248, r: 108 }].map((dot, i) => {
                      const p = polar(dot.r, dot.a);
                      return <circle key={`mid-dot-${i}`} className={`ls-anim-tick ls-tick-d${(i % 4) + 1}`} cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r="3.5" fill={ORANGE} filter="url(#glow)" />;
                    })}
                  </g>
                </motion.g>

                {/* INNER CCW */}
                <motion.g style={{ scale: scatterInnerScale, transformOrigin: '200px 200px' }}>
                  <g className="ls-rotate-inner">
                    {[
                      [92, 74, 20, 95, SAGE, 1],
                      [90, 72, 110, 165, SAGE, 0.7],
                      [92, 76, 185, 240, CORE, 1],
                      [88, 72, 260, 320, SAGE, 1],
                      [90, 78, 330, 380, SAGE, 0.85]
                    ].map((s, i) => (
                      <path key={`inner-${i}`} className={`ls-anim-segment ${segDelays[i % 10].c}`} d={ringSegment(s[0] as number, s[1] as number, s[2] as number, s[3] as number)} fill={s[4] as string} opacity={(s[5] as number) < 1 ? s[5] as number : undefined} />
                    ))}
                    <path className={`ls-anim-segment ${segDelays[5].c}`} d={arcPath(68, 10, 100)} fill="none" stroke={SAGE} strokeWidth="6" strokeLinecap="round" />
                    <path className={`ls-anim-segment ${segDelays[6].c}`} d={arcPath(68, 130, 200)} fill="none" stroke={CORE} strokeWidth="5" strokeLinecap="round" />
                    <path className={`ls-anim-segment ${segDelays[7].c}`} d={arcPath(68, 220, 300)} fill="none" stroke={SAGE} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
                    <path className={`ls-anim-segment ${segDelays[8].c}`} d={ringSegment(58, 48, -30, 50)} fill={SAGE} opacity="0.95" />
                    <path className={`ls-anim-segment ${segDelays[9].c}`} d={ringSegment(58, 48, 90, 150)} fill={CORE} />
                    <path className="ls-anim-segment ls-seg-d1" d={ringSegment(56, 48, 180, 250)} fill={SAGE} opacity="0.6" style={{ animationDelay: "3.15s", "--dx": "20px", "--dy": "30px" } as any} />
                    <path className="ls-anim-segment ls-seg-d2" d={ringSegment(58, 50, 280, 340)} fill={SAGE} style={{ animationDelay: "3.2s", "--dx": "-25px", "--dy": "-20px" } as any} />
                    {[{ a: 55, r: 80 }, { a: 200, r: 82 }, { a: 310, r: 78 }].map((dot, i) => {
                      const p = polar(dot.r, dot.a);
                      return <circle key={`inner-dot-${i}`} className={`ls-anim-tick ls-tick-d${(i % 4) + 1}`} cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r="3" fill={ORANGE} filter="url(#glow)" />;
                    })}
                  </g>
                </motion.g>

                {/* Static core */}
                <g>
                  <circle className="ls-anim-pulse-ring" cx={CX} cy={CY} r="28" fill="none" stroke={CORE} strokeWidth="1.5" />
                  <g className="ls-anim-core"><circle cx={CX} cy={CY} r="22" fill={CORE} filter="url(#soft-shadow)" />
                  <circle className="ls-anim-eye" cx={CX} cy={CY} r="4" fill="rgba(255,255,255,0.8)" opacity="1" /></g>
                </g>
              </svg>
            </div>
          </motion.div>
          
          <motion.div style={{ scale: logoZoom, opacity: lateOpacity }} className="z-10 origin-center">
            <motion.div style={{ "--move-progress": textMoveProgress } as any} className="ls-brand-text-move">
            <motion.div
              layout
              animate={isIntro ? { scale: 1 } : { scale: 0.85 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className={`flex flex-col justify-center pointer-events-none ${isIntro ? 'items-center' : 'items-center sm:items-start'}`}
              dir="ltr"
            >
              <div className={`font-montserrat text-2xl sm:text-3xl font-bold text-[#1A1F24] opacity-0 animate-[ls-text-rise_1.4s_cubic-bezier(0.2,0.8,0.2,1)_4.5s_forwards] tracking-[0.06em] ${isIntro ? 'text-center' : 'text-center sm:text-left'} leading-[1.1]`}>
                HoReCa<br />CORE
              </div>
              <div className="font-lalezar text-3xl sm:text-4xl text-[#1A1F24] opacity-0 animate-[ls-fa-rise_1.4s_cubic-bezier(0.2,0.8,0.2,1)_4.7s_forwards] whitespace-nowrap">
                هورکا کور
              </div>
            </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hero Text Content - Animates in after intro */}
        <motion.div style={{ opacity: textOpacityFade }} className="z-30 flex flex-col items-center relative w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isIntro ? { opacity: 0, y: 30, filter: "blur(10px)", display: "none" } : { opacity: 1, y: 0, filter: "blur(0px)", display: "flex" }}
            transition={{ duration: 1.5, delay: isIntro ? 0 : 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex-col items-center text-center max-w-4xl mt-2 sm:mt-4 relative"
          >
          <h1 
            className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight text-[#1A1F24] leading-tight drop-shadow-sm font-sans mt-0"
            dir="rtl"
          >
            طراحی، مهندسی و راه‌اندازی پروژه‌های صنعت خوراک و نوشیدنی
          </h1>
          
          <p 
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#374151] leading-relaxed max-w-3xl font-normal font-sans text-center px-4"
            dir="rtl"
          >
            ما در HoReCa Core با ترکیب دانش معماری، مهندسی فرآیند و هنر مهمان‌نوازی، پروژه‌های شما را از یک ایده اولیه به کسب‌وکاری پایدار و سودآور تبدیل می‌کنیم.
          </p>
          
          <div 
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center w-full gap-4 sm:gap-6 font-sans px-4"
          >
            <button 
              onClick={() => {
                const target = document.getElementById('slide-phases');
                if (target) {
                  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                  const startPosition = window.scrollY;
                  const distance = targetPosition - startPosition;
                  const duration = 30000; 
                  let start: number | null = null;
                  let isCancelled = false;
                  const cancelScroll = () => {
                    isCancelled = true;
                    window.removeEventListener('wheel', cancelScroll);
                    window.removeEventListener('touchstart', cancelScroll);
                  };
                  window.addEventListener('wheel', cancelScroll, { passive: true });
                  window.addEventListener('touchstart', cancelScroll, { passive: true });
                  const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                  const step = (timestamp: number) => {
                    if (isCancelled) return;
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    window.scrollTo(0, startPosition + distance * easeInOutQuad(percentage));
                    if (progress < duration) window.requestAnimationFrame(step);
                    else cancelScroll();
                  };
                  window.requestAnimationFrame(step);
                }
              }}
              className="group w-full sm:w-auto px-8 py-3.5 bg-white/40 hover:bg-white/60 border border-[#1A1F24]/10 hover:border-[#1A1F24]/30 text-[#1A1F24] rounded-full font-medium tracking-wide transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow text-sm sm:text-base flex items-center justify-center gap-3"
            >
              <span>مشاهده سیستم همکاری</span>
              <svg className="w-4 h-4 -rotate-90 text-[#FF8C42] transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
          </motion.div>
        </motion.div>
        
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isIntro ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-[#A8BCA8] to-transparent relative overflow-hidden">
           <motion.div
             animate={{ y: [0, 64] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             className="w-[2px] h-4 bg-[#FF8C42] absolute left-1/2 -translate-x-1/2 top-0 blur-[1px]"
           />
        </div>
      </motion.div>
    </section>
  );
}
