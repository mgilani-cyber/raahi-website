import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FloatingDust } from "./FloatingDust";
import { PourParticles } from "./PourParticles";
import { useAudioPour } from "@/hooks/useAudioPour";
import maayaLogo from "@/assets/maaya-logo.png";
import barBg from "@/assets/bar-panoramic.jpg";

interface Splash {
  id: number;
  x: number;
  y: number;
}

const HINT_STAGES = [
  { threshold: 0,  text: "press & hold anywhere to pour" },
  { threshold: 1,  text: "keep pouring..." },
  { threshold: 25, text: "you're almost in..." },
  { threshold: 55, text: "just a little more..." },
  { threshold: 75, text: "welcome to Bar Maaya" },
];

function getHintText(pct: number) {
  let text = HINT_STAGES[0].text;
  for (const stage of HINT_STAGES) {
    if (pct >= stage.threshold) text = stage.text;
  }
  return text;
}

export function PourReveal({ onRevealed }: { onRevealed: () => void }) {
  // Skip if already done this session
  if (sessionStorage.getItem("pourDone") === "true") return null;

  return <PourRevealInner onRevealed={onRevealed} />;
}

function PourRevealInner({ onRevealed }: { onRevealed: () => void }) {
  const darkCanvasRef = useRef<HTMLCanvasElement>(null);
  const goldCanvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const isHoldingRef = useRef(false);
  const activePoinrsRef = useRef<{ x: number; y: number; radius: number }[]>([]);
  const frameCountRef = useRef(0);
  const goldAlphaRef = useRef(0);
  const goldFadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [pct, setPct] = useState(0);
  const [hintText, setHintText] = useState(HINT_STAGES[0].text);
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const [finalizing, setFinalizing] = useState(false);
  const [done, setDone] = useState(false);
  const [muted, setMuted] = useState(false);

  const { startPour, stopPour, playChime, toggleMute, muted: audioMuted } = useAudioPour();

  // Custom cursor
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);
  const cursorX = useSpring(rawX, { stiffness: 400, damping: 30 });
  const cursorY = useSpring(rawY, { stiffness: 400, damping: 30 });
  const [pouring, setPouring] = useState(false);

  // ── Canvas setup ──────────────────────────────────────────────
  const initCanvases = useCallback(() => {
    const dark = darkCanvasRef.current;
    const gold = goldCanvasRef.current;
    if (!dark || !gold) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    dark.width = w;
    dark.height = h;
    gold.width = w;
    gold.height = h;

    const dc = dark.getContext("2d")!;
    dc.fillStyle = "hsl(8, 60%, 7%)";
    dc.fillRect(0, 0, w, h);

    const gc = gold.getContext("2d")!;
    gc.clearRect(0, 0, w, h);
    goldAlphaRef.current = 0;
  }, []);

  useEffect(() => {
    initCanvases();
    const onResize = () => initCanvases();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [initCanvases]);

  // ── Pixel coverage check ──────────────────────────────────────
  const checkCoverage = useCallback(() => {
    const canvas = darkCanvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const step = 8; // sample every 8px for performance
    const data = ctx.getImageData(0, 0, w, h).data;
    let transparent = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      if (data[i] < 128) transparent++;
      total++;
    }
    return Math.round((transparent / total) * 100);
  }, []);

  // ── Draw liquid on both canvases ──────────────────────────────
  const drawLiquid = useCallback((x: number, y: number, radius: number) => {
    const dark = darkCanvasRef.current;
    const gold = goldCanvasRef.current;
    if (!dark || !gold) return;

    const dc = dark.getContext("2d")!;
    const gc = gold.getContext("2d")!;

    // Punch hole in dark overlay
    dc.globalCompositeOperation = "destination-out";
    dc.beginPath();
    dc.arc(x, y, radius, 0, Math.PI * 2);
    dc.fill();

    // Satellite drops (gravity biased downward)
    for (let i = 0; i < 5; i++) {
      const ox = (Math.random() - 0.5) * radius * 1.2;
      const oy = Math.random() * radius * 1.0 - radius * 0.2;
      const or_ = radius * (Math.random() * 0.4 + 0.3);
      dc.beginPath();
      dc.arc(x + ox, y + oy, or_, 0, Math.PI * 2);
      dc.fill();
    }

    // Drip tendrils downward
    dc.beginPath();
    dc.ellipse(x, y + radius * 1.1, radius * 0.3, radius * 0.6, 0, 0, Math.PI * 2);
    dc.fill();

    dc.globalCompositeOperation = "source-over";

    // Draw golden liquid on gold canvas
    const alpha = Math.min(goldAlphaRef.current, 0.65);
    gc.globalCompositeOperation = "source-over";
    const grad = gc.createRadialGradient(x, y, 0, x, y, radius * 1.4);
    grad.addColorStop(0, `rgba(220, 170, 80, ${alpha})`);
    grad.addColorStop(0.6, `rgba(184, 130, 50, ${alpha * 0.7})`);
    grad.addColorStop(1, `rgba(184, 130, 50, 0)`);
    gc.fillStyle = grad;
    gc.beginPath();
    gc.arc(x, y, radius * 1.4, 0, Math.PI * 2);
    gc.fill();
  }, []);

  // ── Animation loop ─────────────────────────────────────────────
  const loop = useCallback(() => {
    if (!isHoldingRef.current) return;

    activePoinrsRef.current = activePoinrsRef.current.map((pt) => ({
      ...pt,
      radius: Math.min(pt.radius + 2.5, 130),
    }));

    for (const pt of activePoinrsRef.current) {
      drawLiquid(pt.x, pt.y, pt.radius);
    }

    // Fade gold in gradually
    goldAlphaRef.current = Math.min(goldAlphaRef.current + 0.015, 0.65);

    // Satellite drip burst every 200ms (~12 frames)
    frameCountRef.current++;
    if (frameCountRef.current % 12 === 0) {
      for (const pt of activePoinrsRef.current) {
        const angle = Math.random() * Math.PI * 2;
        const d = pt.radius * (Math.random() * 0.4 + 0.8);
        drawLiquid(
          pt.x + Math.cos(angle) * d,
          pt.y + Math.sin(angle) * d,
          pt.radius * 0.25
        );
      }
    }

    // Check coverage every 30 frames
    if (frameCountRef.current % 30 === 0) {
      const coverage = checkCoverage();
      setPct(coverage);
      setHintText(getHintText(coverage));

      // Update site blur
      document.documentElement.style.setProperty(
        "--site-blur",
        `${Math.max(0, 24 - (coverage / 75) * 24)}px`
      );

      if (coverage >= 75) {
        triggerFinalReveal();
        return;
      }
    }

    rafRef.current = requestAnimationFrame(loop);
  }, [drawLiquid, checkCoverage]);

  // ── Final reveal choreography ─────────────────────────────────
  const triggerFinalReveal = useCallback(() => {
    isHoldingRef.current = false;
    cancelAnimationFrame(rafRef.current);
    stopPour();
    playChime();
    if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
    setPouring(false);
    setFinalizing(true);

    // Flood remaining dark patches
    const dark = darkCanvasRef.current;
    if (dark) {
      const dc = dark.getContext("2d")!;
      dc.globalCompositeOperation = "destination-out";
      dc.fillStyle = "rgba(0,0,0,1)";
      let r = 0;
      const flood = setInterval(() => {
        r += 18;
        for (let i = 0; i < 20; i++) {
          dc.beginPath();
          dc.arc(
            Math.random() * dark.width,
            Math.random() * dark.height,
            r,
            0, Math.PI * 2
          );
          dc.fill();
        }
        if (r > Math.max(dark.width, dark.height)) clearInterval(flood);
      }, 16);
    }

    // Fade gold canvas out
    if (goldFadeRef.current) clearInterval(goldFadeRef.current);
    goldFadeRef.current = setInterval(() => {
      goldAlphaRef.current = Math.max(0, goldAlphaRef.current - 0.04);
      const gold = goldCanvasRef.current;
      if (gold) {
        const gc = gold.getContext("2d")!;
        gc.globalAlpha = goldAlphaRef.current;
      }
      if (goldAlphaRef.current <= 0) {
        clearInterval(goldFadeRef.current!);
      }
    }, 16);

    // After sweep completes, unmount
    setTimeout(() => {
      document.documentElement.style.setProperty("--site-blur", "0px");
      sessionStorage.setItem("pourDone", "true");
      setDone(true);
      onRevealed();
      window.dispatchEvent(new Event("pourComplete"));
    }, 1400);
  }, [stopPour, playChime, onRevealed]);

  // ── Pointer handlers ──────────────────────────────────────────
  const startPouring = useCallback((x: number, y: number) => {
    if (finalizing) return;

    if (activePoinrsRef.current.length === 0) {
      playChime();
      if (navigator.vibrate) navigator.vibrate(40);
    }

    // Splash burst
    setSplashes((prev) => [...prev, { id: Date.now(), x, y }]);
    setTimeout(() => setSplashes((prev) => prev.slice(1)), 700);

    isHoldingRef.current = true;
    activePoinrsRef.current = [{ x, y, radius: 5 }];
    startPour();
    setPouring(true);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, [finalizing, playChime, startPour, loop]);

  const stopPouring = useCallback(() => {
    isHoldingRef.current = false;
    activePoinrsRef.current = [];
    cancelAnimationFrame(rafRef.current);
    stopPour();
    setPouring(false);
  }, [stopPour]);

  const updatePos = useCallback((x: number, y: number) => {
    if (!isHoldingRef.current) return;
    activePoinrsRef.current = activePoinrsRef.current.map((pt) => ({
      ...pt,
      x,
      y,
    }));
  }, []);

  // Mouse events
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      updatePos(e.clientX, e.clientY);
    };
    const onDown = (e: MouseEvent) => startPouring(e.clientX, e.clientY);
    const onUp = () => stopPouring();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [rawX, rawY, startPouring, stopPouring, updatePos]);

  // Touch events
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startPouring(t.clientX, t.clientY);
    };
    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      rawX.set(t.clientX);
      rawY.set(t.clientY);
      updatePos(t.clientX, t.clientY);
    };
    const onEnd = () => stopPouring();

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [rawX, rawY, startPouring, stopPouring, updatePos]);

  // Cleanup
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (goldFadeRef.current) clearInterval(goldFadeRef.current);
    };
  }, []);

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden select-none"
          initial={{ opacity: 1 }}
          animate={finalizing ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.9, delay: finalizing ? 0.5 : 0 }}
          style={{ cursor: "default" }}
        >
          {/* Hidden SVG gooey filter */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          {/* Blurred bar background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${barBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px) brightness(0.25)",
              transform: "scale(1.05)",
            }}
          />

          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Gold canvas (liquid color layer) */}
          <div style={{ filter: "url(#goo)" }}>
            <canvas
              ref={goldCanvasRef}
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 1 }}
            />
          </div>

          {/* Dark overlay canvas (with gooey filter) */}
          <div style={{ filter: "url(#goo)", position: "absolute", inset: 0, zIndex: 2 }}>
            <canvas
              ref={darkCanvasRef}
              className="absolute inset-0 pointer-events-none"
            />
          </div>

          {/* Ambient floating dust */}
          <div className="absolute inset-0 z-[3] pointer-events-none">
            <FloatingDust />
          </div>

          {/* Center content: logo + hint */}
          <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center pointer-events-none">
            <motion.img
              src={maayaLogo}
              alt="Bar Maaya"
              className="w-40 md:w-56 mb-8"
              animate={{ scale: [1, 1.03, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Bouncing drop icon */}
            <motion.div
              className="mb-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
                <path
                  d="M10 0C10 0 0 12 0 18C0 23.523 4.477 28 10 28C15.523 28 20 23.523 20 18C20 12 10 0 10 0Z"
                  fill="rgba(184,142,68,0.8)"
                />
              </svg>
            </motion.div>

            {/* Dynamic hint text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={hintText}
                className="font-script italic text-center text-lg md:text-xl"
                style={{ color: "rgba(184,142,68,0.9)", letterSpacing: "0.05em" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                {hintText}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar — thin gold line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[5]" style={{ background: "rgba(184,142,68,0.15)" }}>
            <motion.div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, rgba(184,142,68,0.4), rgba(220,180,90,0.9))",
                width: `${pct}%`,
                boxShadow: "0 0 8px rgba(184,142,68,0.6)",
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Mute button */}
          <button
            className="absolute top-4 right-4 z-[6] text-gold opacity-60 hover:opacity-100 transition-opacity pointer-events-auto"
            onClick={toggleMute}
            style={{ color: "rgba(184,142,68,0.7)" }}
          >
            {audioMuted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          {/* Splash particles */}
          <div className="absolute inset-0 z-[7] pointer-events-none">
            <PourParticles splashes={splashes} />
          </div>

          {/* Custom cursor (desktop only) */}
          <motion.div
            className="fixed pointer-events-none z-[9998] hidden md:block"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <motion.svg
              width="28"
              height="36"
              viewBox="0 0 28 36"
              fill="none"
              animate={{ rotate: pouring ? 45 : 0 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            >
              {/* Glass body */}
              <path
                d="M6 4 L4 28 L24 28 L22 4 Z"
                stroke="rgba(184,142,68,0.9)"
                strokeWidth="1.5"
                fill="rgba(184,142,68,0.1)"
              />
              {/* Stem */}
              <line x1="14" y1="28" x2="14" y2="33" stroke="rgba(184,142,68,0.9)" strokeWidth="1.5" />
              {/* Base */}
              <line x1="9" y1="33" x2="19" y2="33" stroke="rgba(184,142,68,0.9)" strokeWidth="1.5" />
              {/* Liquid inside when pouring */}
              {pouring && (
                <motion.path
                  d="M8 22 L6.5 28 L21.5 28 L20 22 Z"
                  fill="rgba(184,142,68,0.5)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
