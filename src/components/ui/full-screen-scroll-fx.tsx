
import React, {
  CSSProperties, ReactNode, forwardRef, useEffect,
  useImperativeHandle, useLayoutEffect, useMemo,
  useRef, useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
};

type Colors = Partial<{ text: string; overlay: string; pageBg: string; stageBg: string }>;
type Durations = Partial<{ change: number; snap: number }>;

export type FullScreenFXAPI = {
  next: () => void; prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number; refresh: () => void;
};

export type FullScreenFXProps = {
  sections: Section[]; className?: string; style?: CSSProperties;
  fontFamily?: string; header?: ReactNode; footer?: ReactNode;
  gap?: number; gridPaddingX?: number; showProgress?: boolean;
  durations?: Durations; reduceMotion?: boolean;
  bgTransition?: "fade" | "wipe"; parallaxAmount?: number;
  currentIndex?: number; onIndexChange?: (index: number) => void;
  initialIndex?: number; colors?: Colors;
  apiRef?: React.Ref<FullScreenFXAPI>; ariaLabel?: string;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(({
  sections, className, style,
  fontFamily = '"Cormorant Garamond", Georgia, serif',
  header, footer, gap = 1, gridPaddingX = 2,
  showProgress = true,
  durations = { change: 0.7, snap: 800 },
  reduceMotion, bgTransition = "fade", parallaxAmount = 4,
  currentIndex, onIndexChange, initialIndex = 0,
  colors = { text: "rgba(232,224,204,0.92)", overlay: "rgba(10,31,21,0.55)", pageBg: "#0a1f15", stageBg: "#0a1f15" },
  apiRef, ariaLabel = "Menu sections",
}, ref) => {
  const total = sections.length;
  const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
  const isControlled = typeof currentIndex === "number";
  const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const fixedRef = useRef<HTMLDivElement | null>(null);
  const fixedSectionRef = useRef<HTMLDivElement | null>(null);
  const bgRefs = useRef<HTMLImageElement[]>([]);
  const wordRefs = useRef<HTMLSpanElement[][]>([]);
  const leftTrackRef = useRef<HTMLDivElement | null>(null);
  const rightTrackRef = useRef<HTMLDivElement | null>(null);
  const leftItemRefs = useRef<HTMLDivElement[]>([]);
  const rightItemRefs = useRef<HTMLDivElement[]>([]);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const currentNumberRef = useRef<HTMLSpanElement | null>(null);
  const lastIndexRef = useRef(index);
  const isAnimatingRef = useRef(false);
  const isSnappingRef = useRef(false);
  const sectionTopRef = useRef<number[]>([]);

  const prefersReduced = useMemo(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches, []);
  const motionOff = reduceMotion ?? prefersReduced;

  const tempWordBucket = useRef<HTMLSpanElement[]>([]);
  const splitWords = (text: string) => text.split(/\s+/).filter(Boolean).map((w, i, arr) => (
    <span className="fx-word-mask" key={i}>
      <span className="fx-word" ref={(el) => el && tempWordBucket.current.push(el)}>{w}</span>
      {i < arr.length - 1 ? " " : null}
    </span>
  ));
  const WordsCollector = ({ onReady }: { onReady: () => void }) => { useEffect(() => onReady(), []); return null; };

  const computePositions = () => {
    const el = fixedSectionRef.current;
    if (!el) return;
    const top = el.offsetTop, h = el.offsetHeight;
    sectionTopRef.current = Array.from({ length: total }, (_, i) => top + (h * i) / total);
  };

  const measureRAF = (fn: () => void) => { if (typeof window !== "undefined") requestAnimationFrame(() => requestAnimationFrame(fn)); };

  const measureAndCenterLists = (toIndex = index, animate = true) => {
    const centerTrack = (container: HTMLDivElement | null, items: HTMLDivElement[], trackRef: React.MutableRefObject<HTMLDivElement | null>) => {
      if (!container || !items.length || !trackRef.current) return;
      const contRect = container.getBoundingClientRect();
      const first = items[0], second = items[1];
      let rowH = first.getBoundingClientRect().height;
      if (second) rowH = second.getBoundingClientRect().top - first.getBoundingClientRect().top;
      const targetY = contRect.height / 2 - rowH / 2 - toIndex * rowH;
      animate
        ? gsap.to(trackRef.current, { y: targetY, duration: (durations.change ?? 0.7) * 0.9, ease: "power3.out" })
        : gsap.set(trackRef.current, { y: targetY });
    };
    measureRAF(() => measureRAF(() => {
      centerTrack(leftTrackRef.current, leftItemRefs.current, leftTrackRef);
      centerTrack(rightTrackRef.current, rightItemRefs.current, rightTrackRef);
    }));
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const fixed = fixedRef.current, fs = fixedSectionRef.current;
    if (!fixed || !fs || !total) return;
    gsap.set(bgRefs.current, { opacity: 0, scale: 1.04, yPercent: 0 });
    if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });
    wordRefs.current.forEach((words, sIdx) => words.forEach((w) => gsap.set(w, { yPercent: sIdx === index ? 0 : 100, opacity: sIdx === index ? 1 : 0 })));
    computePositions();
    measureAndCenterLists(index, false);
    const st = ScrollTrigger.create({
      trigger: fs, start: "top top", end: "bottom bottom", pin: fixed, pinSpacing: true,
      onUpdate: (self) => {
        if (motionOff || isSnappingRef.current) return;
        const target = Math.min(total - 1, Math.floor(self.progress * total));
        if (target !== lastIndexRef.current && !isAnimatingRef.current) {
          goTo(lastIndexRef.current + (target > lastIndexRef.current ? 1 : -1), false);
        }
        if (progressFillRef.current) progressFillRef.current.style.width = `${(lastIndexRef.current / (total - 1 || 1)) * 100}%`;
      },
    });
    const ro = new ResizeObserver(() => { computePositions(); measureAndCenterLists(lastIndexRef.current, false); ScrollTrigger.refresh(); });
    ro.observe(fs);
    return () => { ro.disconnect(); st.kill(); };
  }, [total, initialIndex, motionOff, bgTransition, parallaxAmount]);

  const changeSection = (to: number) => {
    if (to === lastIndexRef.current || isAnimatingRef.current) return;
    const from = lastIndexRef.current, down = to > from;
    isAnimatingRef.current = true;
    if (!isControlled) setLocalIndex(to);
    onIndexChange?.(to);
    if (currentNumberRef.current) currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
    if (progressFillRef.current) progressFillRef.current.style.width = `${(to / (total - 1 || 1)) * 100}%`;
    const D = durations.change ?? 0.7;
    const outWords = wordRefs.current[from] || [], inWords = wordRefs.current[to] || [];
    if (outWords.length) gsap.to(outWords, { yPercent: down ? -100 : 100, opacity: 0, duration: D * 0.6, stagger: down ? 0.03 : -0.03, ease: "power3.out" });
    if (inWords.length) { gsap.set(inWords, { yPercent: down ? 100 : -100, opacity: 0 }); gsap.to(inWords, { yPercent: 0, opacity: 1, duration: D, stagger: down ? 0.05 : -0.05, ease: "power3.out" }); }
    const prevBg = bgRefs.current[from], newBg = bgRefs.current[to];
    if (bgTransition === "fade") {
      if (newBg) { gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 }); gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: "power2.out" }); }
      if (prevBg) gsap.to(prevBg, { opacity: 0, yPercent: down ? -parallaxAmount : parallaxAmount, duration: D, ease: "power2.out" });
    } else {
      if (newBg) { gsap.set(newBg, { opacity: 1, clipPath: down ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", scale: 1, yPercent: 0 }); gsap.to(newBg, { clipPath: "inset(0 0 0 0)", duration: D, ease: "power3.out" }); }
      if (prevBg) gsap.to(prevBg, { opacity: 0, duration: D * 0.8, ease: "power2.out" });
    }
    measureAndCenterLists(to, true);
    leftItemRefs.current.forEach((el, i) => { el.classList.toggle("active", i === to); gsap.to(el, { opacity: i === to ? 1 : 0.35, x: i === to ? 10 : 0, duration: D * 0.6, ease: "power3.out" }); });
    rightItemRefs.current.forEach((el, i) => { el.classList.toggle("active", i === to); gsap.to(el, { opacity: i === to ? 1 : 0.35, x: i === to ? -10 : 0, duration: D * 0.6, ease: "power3.out" }); });
    gsap.delayedCall(D, () => { lastIndexRef.current = to; isAnimatingRef.current = false; });
  };

  const goTo = (to: number, withScroll = true) => {
    const clamped = clamp(to, 0, total - 1);
    isSnappingRef.current = true;
    changeSection(clamped);
    if (withScroll && typeof window !== "undefined") {
      window.scrollTo({ top: sectionTopRef.current[clamped], behavior: "smooth" });
      setTimeout(() => (isSnappingRef.current = false), durations.snap ?? 800);
    } else setTimeout(() => (isSnappingRef.current = false), 10);
  };

  useImperativeHandle(apiRef, () => ({ next: () => goTo(index + 1), prev: () => goTo(index - 1), goTo, getIndex: () => index, refresh: () => ScrollTrigger.refresh() }));

  useEffect(() => {
    leftItemRefs.current.forEach((el, i) => gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: i * 0.06, ease: "power3.out" }));
    rightItemRefs.current.forEach((el, i) => gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: 0.2 + i * 0.06, ease: "power3.out" }));
    measureAndCenterLists(index, false);
  }, []);

  const cssVars: CSSProperties = {
    ["--fx-font" as any]: fontFamily,
    ["--fx-text" as any]: colors.text,
    ["--fx-overlay" as any]: colors.overlay,
    ["--fx-page-bg" as any]: colors.pageBg,
    ["--fx-stage-bg" as any]: colors.stageBg,
    ["--fx-gap" as any]: `${gap}rem`,
    ["--fx-grid-px" as any]: `${gridPaddingX}rem`,
    ["--fx-row-gap" as any]: "10px",
  };

  return (
    <div ref={(node) => { (rootRef as any).current = node; if (typeof ref === "function") ref(node); else if (ref) (ref as any).current = node; }}
      className={["fx", className].filter(Boolean).join(" ")} style={{ ...cssVars, ...style }} aria-label={ariaLabel}>
      <div style={{ position: "relative" }}>
        <div ref={fixedSectionRef} style={{ height: `${Math.max(1, total + 1)}00vh`, position: "relative" }}>
          <div ref={fixedRef} style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden", background: "var(--fx-page-bg)" }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--fx-stage-bg)", zIndex: 1 }}>
              {sections.map((s, i) => (
                <div key={s.id ?? i} style={{ position: "absolute", inset: 0 }}>
                  <img ref={(el) => el && (bgRefs.current[i] = el)} src={s.background} alt=""
                    style={{ position: "absolute", inset: "-10% 0 -10% 0", width: "100%", height: "120%", objectFit: "cover", filter: "brightness(0.5) saturate(0.75)", opacity: 0, willChange: "transform, opacity" }} />
                  <div style={{ position: "absolute", inset: 0, background: "var(--fx-overlay)" }} />
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--fx-gap)", padding: "0 var(--fx-grid-px)", zIndex: 2, height: "100%" }}>
              {header && <div style={{ gridColumn: "1/13", alignSelf: "start", paddingTop: "6vh", textAlign: "center", color: "var(--fx-text)", fontFamily: "var(--fx-font)" }}>{header}</div>}
              <div style={{ gridColumn: "1/13", position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1.3fr 1fr", alignItems: "center", height: "100%", padding: "0 var(--fx-grid-px)" }}>
                <div ref={leftTrackRef} style={{ willChange: "transform" }}>
                  {sections.map((s, i) => (
                    <div key={`L-${s.id ?? i}`} ref={(el) => el && (leftItemRefs.current[i] = el)}
                      onClick={() => goTo(i)} role="button" tabIndex={0}
                      style={{ color: "var(--fx-text)", fontWeight: 700, lineHeight: 1.2, margin: "6px 0", opacity: 0.35, cursor: "pointer", fontSize: "clamp(0.8rem,1.8vw,1.3rem)", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", userSelect: "none", paddingLeft: "16px", position: "relative" }}>
                      {s.leftLabel}
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", placeItems: "center", textAlign: "center", height: "60vh", overflow: "hidden", position: "relative" }}>
                  {sections.map((s, sIdx) => {
                    tempWordBucket.current = [];
                    const isString = typeof s.title === "string";
                    return (
                      <div key={`C-${s.id ?? sIdx}`} style={{ position: "absolute", opacity: sIdx === index ? 1 : 0, visibility: sIdx === index ? "visible" : "hidden" }}>
                        <h3 style={{ margin: 0, color: "var(--fx-text)", fontWeight: 900, fontSize: "clamp(2rem,7vw,5.5rem)", fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", letterSpacing: "-0.01em" }}>
                          {isString ? splitWords(s.title as string) : s.title}
                        </h3>
                        <WordsCollector onReady={() => { if (tempWordBucket.current.length) wordRefs.current[sIdx] = [...tempWordBucket.current]; tempWordBucket.current = []; }} />
                      </div>
                    );
                  })}
                </div>
                <div ref={rightTrackRef} style={{ willChange: "transform", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  {sections.map((s, i) => (
                    <div key={`R-${s.id ?? i}`} ref={(el) => el && (rightItemRefs.current[i] = el)}
                      onClick={() => goTo(i)} role="button" tabIndex={0}
                      style={{ color: "var(--fx-text)", fontWeight: 700, lineHeight: 1.2, margin: "6px 0", opacity: 0.35, cursor: "pointer", fontSize: "clamp(0.8rem,1.8vw,1.3rem)", fontFamily: "Jost, sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", userSelect: "none", paddingRight: "16px", position: "relative" }}>
                      {s.rightLabel}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: "1/13", alignSelf: "end", paddingBottom: "5vh", textAlign: "center" }}>
                {footer}
                {showProgress && (
                  <div style={{ width: 200, height: 2, margin: "1rem auto 0", background: "rgba(232,224,204,0.15)", position: "relative" }}>
                    <span ref={currentNumberRef} style={{ position: "absolute", bottom: "100%", left: 0, fontFamily: "Jost,sans-serif", fontSize: "0.7rem", color: "var(--fx-text)", marginBottom: "4px" }}>{String(index + 1).padStart(2, "0")}</span>
                    <span style={{ position: "absolute", bottom: "100%", right: 0, fontFamily: "Jost,sans-serif", fontSize: "0.7rem", color: "rgba(232,224,204,0.3)", marginBottom: "4px" }}>{String(total).padStart(2, "0")}</span>
                    <div ref={progressFillRef} style={{ position: "absolute", inset: "0 auto 0 0", width: "0%", background: "#a34d26", height: "100%", transition: "width 0.3s ease" }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.fx-word-mask{display:inline-block;overflow:hidden;vertical-align:middle}.fx-word{display:inline-block;vertical-align:middle}`}</style>
    </div>
  );
});

FullScreenScrollFX.displayName = "FullScreenScrollFX";
