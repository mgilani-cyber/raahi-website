import { motion, AnimatePresence } from "framer-motion";

interface Splash {
  id: number;
  x: number;
  y: number;
}

interface PourParticlesProps {
  splashes: Splash[];
}

const PARTICLE_COUNT = 14;

export function PourParticles({ splashes }: PourParticlesProps) {
  return (
    <AnimatePresence>
      {splashes.map((splash) =>
        Array.from({ length: PARTICLE_COUNT }, (_, i) => {
          const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
          const distance = Math.random() * 80 + 40;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;
          const size = Math.random() * 5 + 2;

          return (
            <motion.div
              key={`${splash.id}-${i}`}
              className="fixed rounded-full pointer-events-none"
              style={{
                left: splash.x,
                top: splash.y,
                width: size,
                height: size,
                background: `rgba(184, 142, 68, ${Math.random() * 0.6 + 0.4})`,
                boxShadow: `0 0 ${size * 2}px rgba(184, 142, 68, 0.6)`,
                zIndex: 10001,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: tx,
                y: ty,
                opacity: 0,
                scale: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: Math.random() * 0.4 + 0.4,
                ease: "easeOut",
              }}
            />
          );
        })
      )}
    </AnimatePresence>
  );
}
