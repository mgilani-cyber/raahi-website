import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReservation } from "@/contexts/ReservationContext";
import ctaBg from "@/assets/cta-bg.jpg";

export const CTABanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { openWidget } = useReservation();

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${ctaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-background/80 z-[1]" />
      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] z-[2]" style={{ background: "linear-gradient(90deg, transparent, rgba(184,142,68,0.4), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] z-[2]" style={{ background: "linear-gradient(90deg, transparent, rgba(184,142,68,0.4), transparent)" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Visit Us @ 244 Adelaide St West
        </motion.p>
        <motion.h2
          className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          A Perfect Fusion Of Tradition &amp; Innovation
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Each creation at Bar Maaya embodies the perfect fusion of tradition and innovation. Elevate your palate and indulge in an experience where every sip takes you on a journey.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={openWidget} className="btn-gold-outline">
            RESERVE YOUR TABLE
          </button>
        </motion.div>
      </div>
    </section>
  );
};
