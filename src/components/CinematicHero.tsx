import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MagneticElement } from "./MagneticElement";
import { useReservation } from "@/contexts/ReservationContext";

export function CinematicHero({ visible }: { visible: boolean }) {
  const { openWidget } = useReservation();
  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden -mt-20"
      style={{ background: "hsl(8,60%,3%)" }}
    >
      {/* ── VIDEO ─────────────────────────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted loop playsInline
        style={{ filter: "brightness(0.68)", objectPosition: "center 38%" }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient — heavy bottom-left, airy top-right */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/92 via-background/25 to-background/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent" />

      {/* ── EDITORIAL CONTENT — anchored bottom-left ──────────── */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 md:pb-20">

        {/* Eyebrow */}
        <motion.p
          className="font-body text-[10px] tracking-[0.65em] text-primary/55 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          TORONTO · 244 ADELAIDE ST WEST
        </motion.p>

        {/* WHERE ILLUSION MEETS EVENING — single line */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-heading select-none leading-[0.92] whitespace-nowrap"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 7rem)" }}
            initial={{ y: "110%" }}
            animate={visible ? { y: "0%" } : {}}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="text-foreground">Where </span>
            <span className="text-primary italic">Illusion</span>
            <span className="text-foreground"> Meets </span>
            <span className="text-primary italic">Evening</span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.div
          className="flex items-center gap-4 mt-7 mb-8"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <div className="w-7 h-px bg-primary/45 shrink-0" />
          <p className="font-script italic text-foreground/55 text-sm md:text-base">
            Where Eastern ritual meets Western craft
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 8 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          <MagneticElement>
            <button onClick={openWidget} className="btn-gold-outline">
              RESERVE A TABLE
            </button>
          </MagneticElement>
          <Link
            to="/menus"
            className="font-body text-[10px] tracking-[0.38em] text-foreground/45 hover:text-foreground transition-colors duration-300 link-draw"
          >
            VIEW MENUS
          </Link>
          <Link
            to="/story"
            className="font-body text-[10px] tracking-[0.38em] text-foreground/45 hover:text-foreground transition-colors duration-300 link-draw"
          >
            OUR STORY
          </Link>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR — right edge ─────────────────────── */}
      <motion.div
        className="absolute right-8 md:right-10 bottom-16 hidden md:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <div className="relative h-16 w-px overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-primary/45"
            animate={{ scaleY: [0, 1, 0], y: ["0%", "0%", "100%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top", height: "100%" }}
          />
        </div>
        <span className="font-body text-[8px] tracking-[0.55em] text-foreground/22 [writing-mode:vertical-rl] rotate-180">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
