import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CinemaIntro({ onDone }: { onDone: () => void }) {
  if (sessionStorage.getItem("raahiIntroDone") === "true") { onDone(); return null; }
  return <CinemaIntroInner onDone={onDone} />;
}

function CinemaIntroInner({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in"|"hold"|"exit">("in");
  const skip = () => { sessionStorage.setItem("raahiIntroDone","true"); onDone(); };
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 2100);
    const t3 = setTimeout(() => { sessionStorage.setItem("raahiIntroDone","true"); onDone(); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: "#113122" }}
      animate={phase === "exit" ? { y: "-100%" } : { y: "0%" }}
      transition={phase === "exit" ? { duration: 0.7, ease: [0.76,0,0.24,1] } : {}}>
      <button onClick={skip} className="absolute top-8 right-8"
        style={{ fontFamily: "Jost, sans-serif", fontSize: "10px", letterSpacing: "0.45em", color: "rgba(232,224,204,0.3)", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}>
        Skip
      </button>
      <motion.div className="text-center"
        initial={{ opacity: 0, filter: "blur(16px)" }}
        animate={phase !== "in" ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(16px)" }}
        transition={{ duration: 0.8 }}>
        <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", fontSize: "clamp(3rem,10vw,6rem)", color: "#e8e0cc", letterSpacing: "0.08em", lineHeight: 1 }}>Raahi</p>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "10px", letterSpacing: "0.5em", color: "#a34d26", textTransform: "uppercase", marginTop: "8px" }}>Indian Kitchen</p>
      </motion.div>
      <motion.div style={{ height: "1px", background: "#a34d26", marginTop: "2rem" }}
        initial={{ width: 0 }} animate={phase !== "in" ? { width: 80 } : { width: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }} />
      <motion.p style={{ fontFamily: "Jost, sans-serif", fontSize: "9px", letterSpacing: "0.6em", color: "rgba(232,224,204,0.3)", marginTop: "1.5rem", textTransform: "uppercase" }}
        initial={{ opacity: 0 }} animate={phase !== "in" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}>
        Houston · Texas
      </motion.p>
    </motion.div>
  );
}
