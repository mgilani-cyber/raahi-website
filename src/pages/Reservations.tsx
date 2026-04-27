import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { MagneticElement } from "@/components/MagneticElement";
import { useReservation } from "@/contexts/ReservationContext";
import { PHONE_NUMBER } from "@/constants";
import { Phone, MapPin, Clock } from "lucide-react";
import tableSetting from "@/assets/table-setting.jpg";
import barAtmosphere from "@/assets/bar-atmosphere.jpg";
import womanAmber from "@/assets/woman-amber.jpg";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

const HOURS = [
  { day: "Monday", time: "Closed", closed: true },
  { day: "Tuesday", time: "4:00 PM – 2:00 AM" },
  { day: "Wednesday", time: "4:00 PM – 2:00 AM" },
  { day: "Thursday", time: "4:00 PM – 2:00 AM" },
  { day: "Friday", time: "4:00 PM – 2:00 AM" },
  { day: "Saturday", time: "12:00 PM – 2:00 AM" },
  { day: "Sunday", time: "12:00 PM – 12:00 AM" },
];
const TODAY = new Date().toLocaleString("en-US", { weekday: "long" });

const Reservations = () => {
  const { openWidget } = useReservation();
  return (
  <>
    <SEOHead
      title="Contact Bar Maaya | Reservations in Toronto"
      description="Contact Bar Maaya in Toronto's Entertainment District to book your table, plan group events or ask about our cocktail, tapas and live music nights."
      canonical="/reservations"
    />
    {/* HERO */}
    <div className="relative min-h-[65vh] overflow-hidden -mt-20 flex items-center justify-center" style={{ background: "hsl(8,60%,3%)" }}>
      <div className="absolute inset-0">
        <img src={tableSetting} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.22)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p className="font-body text-[10px] tracking-[0.5em] text-primary/60 mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          244 ADELAIDE ST WEST · TORONTO
        </motion.p>
        <div className="overflow-hidden mb-6">
          <motion.h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight"
            initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
            Reserve Your <span className="text-primary italic">Evening</span>
          </motion.h1>
        </div>
        <motion.p className="font-script italic text-foreground/50 text-xl md:text-2xl mb-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          Your table is waiting.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <MagneticElement className="inline-block">
            <button onClick={openWidget}
              className="inline-block border border-primary text-primary font-body text-[11px] tracking-[0.35em] px-12 py-5 hover:bg-primary hover:text-background transition-all duration-300">
              RESERVE YOUR TABLE
            </button>
          </MagneticElement>
        </motion.div>
      </div>
    </div>

    {/* HOURS + INFO */}
    <section className="py-24 md:py-36 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          <FadeUp>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-px bg-primary" />
              <span className="font-body text-[10px] tracking-[0.5em] text-primary/60">OPENING TIMES</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-10">Hours</h2>
            {HOURS.map(({ day, time, closed }) => (
              <div key={day} className={`flex items-center justify-between py-4 border-b border-border/15 ${day === TODAY ? "border-primary/25" : ""}`}>
                <div className="flex items-center gap-3">
                  {day === TODAY && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                  <span className={`font-body text-sm ${day === TODAY ? "text-primary" : "text-foreground/55"}`}>{day}</span>
                  {day === TODAY && <span className="font-body text-[9px] tracking-widest text-primary/50 border border-primary/20 px-2 py-0.5">TODAY</span>}
                </div>
                <span className={`font-body text-sm ${closed ? "text-foreground/20" : "text-foreground/70"}`}>{time}</span>
              </div>
            ))}
            <p className="font-script italic text-primary text-base mt-6">Happy Hour: Tue–Fri 4PM–7PM · $8 Cocktails</p>
          </FadeUp>

          <div className="space-y-8">
            <FadeUp delay={0.1}>
              <div className="border border-border/20 p-8" style={{ background: "hsl(8,55%,9%)" }}>
                <h3 className="font-heading text-xl text-foreground mb-6">Contact Us</h3>
                <div className="space-y-5">
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 border border-border/30 flex items-center justify-center group-hover:border-primary/40 transition-colors shrink-0">
                      <Phone size={14} className="text-primary/60" />
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-widest text-foreground/30 mb-0.5">PHONE</p>
                      <p className="font-body text-foreground/70 text-sm group-hover:text-primary transition-colors">{PHONE_NUMBER}</p>
                    </div>
                  </a>
                  <a href="https://maps.google.com/?q=244+Adelaide+St+West+Toronto" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 border border-border/30 flex items-center justify-center group-hover:border-primary/40 transition-colors shrink-0">
                      <MapPin size={14} className="text-primary/60" />
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-widest text-foreground/30 mb-0.5">ADDRESS</p>
                      <p className="font-body text-foreground/70 text-sm group-hover:text-primary transition-colors">244 Adelaide St West, Toronto</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-border/30 flex items-center justify-center shrink-0">
                      <Clock size={14} className="text-primary/60" />
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-widest text-foreground/30 mb-0.5">WALK-INS</p>
                      <p className="font-body text-foreground/70 text-sm">Welcome based on availability</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="border border-border/20 p-8" style={{ background: "hsl(8,55%,9%)" }}>
                <h3 className="font-heading text-xl text-foreground mb-6">How It Works</h3>
                <div className="space-y-6">
                  {[
                    { n: "01", t: "Choose Your Date", d: "Pick a date and time online — takes 60 seconds." },
                    { n: "02", t: "Instant Confirmation", d: "Receive your confirmation immediately." },
                    { n: "03", t: "Arrive & Enjoy", d: "Walk in, your table is ready. The rest is Maaya." },
                  ].map(s => (
                    <div key={s.n} className="flex gap-5">
                      <span className="font-heading text-primary/25 text-3xl leading-none shrink-0">{s.n}</span>
                      <div>
                        <p className="font-heading text-foreground text-base mb-1">{s.t}</p>
                        <p className="font-body text-[12px] text-foreground/40 leading-relaxed">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <MagneticElement className="block">
                <button onClick={openWidget} className="btn-gold-outline text-[11px] block text-center w-full">
                  RESERVE YOUR TABLE
                </button>
              </MagneticElement>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>

    {/* IMAGE STRIP */}
    <div className="grid grid-cols-3 gap-px">
      {[tableSetting, barAtmosphere, womanAmber].map((img, i) => (
        <div key={i} className="relative overflow-hidden h-[200px] md:h-[320px] group">
          <img src={img} alt="" className="w-full h-full object-cover brightness-40 transition-all duration-700 group-hover:scale-110 group-hover:brightness-60" />
        </div>
      ))}
    </div>

    {/* LARGE GROUP */}
    <section className="py-24 text-center" style={{ background: "hsl(8,60%,4%)" }}>
      <FadeUp>
        <p className="font-body text-[10px] tracking-[0.5em] text-primary/60 mb-4">GROUPS OF 8+</p>
        <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4">Planning A Large Group?</h2>
        <p className="font-body text-foreground/40 text-sm mb-10 max-w-md mx-auto leading-relaxed">
          For parties of 8+, private dining, or full venue buyouts — reach out directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticElement>
            <a href={`tel:${PHONE_NUMBER}`} className="btn-dark-filled text-[11px] inline-block">{PHONE_NUMBER}</a>
          </MagneticElement>
          <MagneticElement>
            <a href="/events/private-events" className="btn-gold-outline text-[11px] inline-block">PRIVATE EVENTS</a>
          </MagneticElement>
        </div>
      </FadeUp>
    </section>
  </>
  );
};

export default Reservations;
