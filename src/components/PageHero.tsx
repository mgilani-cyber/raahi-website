import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  label: string;
  heading: string;
  image?: string;
  children?: ReactNode;
  overlay?: number;
}

export const PageHero = ({ label, heading, image, children, overlay = 0.62 }: PageHeroProps) => {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden -mt-20" style={{ background: "hsl(8,60%,3%)" }}>
      {image ? (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: `brightness(${1 - overlay})`,
          }}
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-background" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10 z-[1]" />

      <div className="relative z-10 container mx-auto px-6 pb-16 md:pb-24">
        <motion.p
          className="font-body text-[10px] tracking-[0.55em] text-primary/60 uppercase mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {label}
        </motion.p>
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {heading}
          </motion.h1>
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
};
