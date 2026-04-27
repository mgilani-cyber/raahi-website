import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function usePourCursor(active: boolean) {
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const isPouringRef = useRef(false);

  const x = useSpring(rawX, { stiffness: 300, damping: 28 });
  const y = useSpring(rawY, { stiffness: 300, damping: 28 });

  useEffect(() => {
    if (!active) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [active, rawX, rawY]);

  return { x, y, isPouringRef };
}
