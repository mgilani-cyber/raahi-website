import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import maayaLogo from "@/assets/maaya-logo.png";

export function CinemaIntro({ onDone }: { onDone: () => void }) {
  if (sessionStorage.getItem("introDone") === "true") {
    onDone();
    return null;
  }
  return <CinemaIntroInner onDone={onDone} />;
}

function CinemaIntroInner({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "exit">("in");

  const skip = () => {
    sessionStorage.setItem("introDone", "true");
    onDone();
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"),  700);
    const t2 = setTimeout(() => setPhase("exit"),  1900);
    const t3 = setTimeout(() => {
      sessionStorage.setItem("introDone", "true");
      onDone();
    }, 2650);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
      animate={phase === "exit" ? { y: "-100%" } : { y: "0%" }}
      transition={phase === "exit"
        ? { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
        : {}}
    >
      {/* Skip */}
      <button
        onClick={skip}
        className="absolute top-8 right-8 font-body text-[10px] tracking-[0.45em] text-white/25 hover:text-white/60 transition-colors"
      >
        SKIP
      </button>

      {/* Logo — blurs in like a lens focusing */}
      <motion.img
        src={maayaLogo}
        alt="Bar Maaya"
        className="w-32 md:w-44 mb-7"
        initial={{ opacity: 0, filter: "blur(16px)" }}
        animate={phase !== "in"
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(16px)" }}
        transition={{ duration: 0.75 }}
      />

      {/* Gold line extends from centre */}
      <motion.div
        className="h-px bg-primary/55"
        initial={{ width: 0 }}
        animate={phase !== "in" ? { width: 100 } : { width: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
      />

      {/* Location */}
      <motion.p
        className="font-body text-[9px] tracking-[0.6em] text-white/25 mt-5"
        initial={{ opacity: 0 }}
        animate={phase !== "in" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.35 }}
      >
        244 ADELAIDE ST WEST · TORONTO
      </motion.p>
    </motion.div>
  );
}
