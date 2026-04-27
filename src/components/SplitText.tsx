import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** "words" splits by word, "chars" splits by character */
  mode?: "words" | "chars";
  stagger?: number;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  mode = "words",
  stagger = 0.07,
}: SplitTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const segments = mode === "words" ? text.split(" ") : text.split("");
  const separator = mode === "words" ? " " : "";

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`} aria-label={text}>
      {segments.map((seg, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.65,
              delay: delay + i * stagger,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {seg}
            {mode === "words" && i < segments.length - 1 ? "\u00A0" : separator}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
