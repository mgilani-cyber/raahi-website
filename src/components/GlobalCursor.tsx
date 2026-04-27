import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function GlobalCursor() {
  const [clicking, setClicking]   = useState(false);
  const [hovering, setHovering]   = useState(false);
  const [visible,  setVisible]    = useState(false);

  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  // Dot — tracks precisely
  const dotX = useSpring(rawX, { stiffness: 700, damping: 42 });
  const dotY = useSpring(rawY, { stiffness: 700, damping: 42 });

  // Ring — lags behind for depth
  const ringX = useSpring(rawX, { stiffness: 110, damping: 22 });
  const ringY = useSpring(rawY, { stiffness: 110, damping: 22 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const down = () => setClicking(true);
    const up   = () => setClicking(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!(t.closest("a") || t.closest("button") || t.closest("[data-cursor-hover]")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
      window.removeEventListener("mouseover", over);
    };
  }, [rawX, rawY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Lagging outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-primary/40"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:   hovering ? 52 : clicking ? 20 : 34,
          height:  hovering ? 52 : clicking ? 20 : 34,
          opacity: hovering ? 0.6 : 0.25,
          borderColor: hovering ? "hsl(42,52%,54%)" : "hsl(42,52%,54%,0.4)",
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Precise inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-primary"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:   clicking ? 5 : 7,
          height:  clicking ? 5 : 7,
          opacity: hovering ? 0 : 0.9,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
