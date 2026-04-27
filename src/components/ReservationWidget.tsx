import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, MapPin, Clock, ChevronDown, Users } from "lucide-react";
import { useReservation } from "@/contexts/ReservationContext";
import { OPENTABLE_URL, PHONE_NUMBER, ADDRESS } from "@/constants";

/* ─── helpers ───────────────────────────────────────────────── */
function buildDateOptions() {
  const opts: { label: string; value: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const label =
      i === 0
        ? "Today"
        : i === 1
        ? "Tomorrow"
        : d.toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });
    opts.push({ label, value: d.toISOString().slice(0, 10) });
  }
  return opts;
}

function buildTimeOptions() {
  const opts: { label: string; value: string }[] = [];
  for (let h = 17; h < 26; h++) {
    for (const m of [0, 30]) {
      const hour = h % 24;
      const suffix = hour < 12 ? "AM" : "PM";
      const h12 = ((hour - 1 + 12) % 12) + 1;
      opts.push({
        label: `${h12}:${m === 0 ? "00" : "30"} ${suffix}`,
        value: `${String(hour).padStart(2, "0")}:${m === 0 ? "00" : "30"}`,
      });
    }
  }
  return opts;
}

const DATE_OPTIONS  = buildDateOptions();
const TIME_OPTIONS  = buildTimeOptions();
const GUEST_OPTIONS = Array.from({ length: 7 }, (_, i) => ({
  label: `${i + 1} ${i === 0 ? "Guest" : "Guests"}`,
  value: String(i + 1),
})).concat([{ label: "8+ Guests", value: "8" }]);

/* ─── select field ───────────────────────────────────────────── */
function Select({
  label,
  value,
  options,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-body text-[9px] tracking-[0.45em] text-foreground/30 mb-2 uppercase">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary/50">
          {icon}
        </div>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent border border-border/25 text-foreground/80 font-body py-3 pl-9 pr-8 focus:outline-none focus:border-primary/50 transition-colors"
          style={{ fontSize: "16px" }}
        >
          {options.map(o => (
            <option key={o.value} value={o.value} style={{ background: "#1E160D" }}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={12}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary/40"
        />
      </div>
    </div>
  );
}

/* ─── main widget ────────────────────────────────────────────── */
export const ReservationWidget = () => {
  const { isOpen, closeWidget } = useReservation();

  const [date,   setDate]   = useState(DATE_OPTIONS[0].value);
  const [time,   setTime]   = useState(TIME_OPTIONS[4].value); // ~6 PM default
  const [guests, setGuests] = useState("2");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  /* track viewport for slide direction */
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ESC to close */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeWidget(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeWidget]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const dateLabel  = DATE_OPTIONS.find(d => d.value === date)?.label ?? "";
  const timeLabel  = TIME_OPTIONS.find(t => t.value === time)?.label ?? "";
  const guestLabel = guests === "8" ? "8+ Guests" : `${guests} ${guests === "1" ? "Guest" : "Guests"}`;
  const deepLink   = `${OPENTABLE_URL}&covers=${guests}&datetime=${date}T${time}`;

  /* animation: slide from bottom (mobile) or from right (desktop) */
  const initial = isMobile ? { y: "100%", opacity: 1 } : { x: "100%", opacity: 1 };
  const animate = isMobile ? { y: 0,      opacity: 1 } : { x: 0,      opacity: 1 };
  const exit    = isMobile ? { y: "100%", opacity: 1 } : { x: "100%", opacity: 1 };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="res-backdrop"
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeWidget}
          />

          {/* Panel */}
          <motion.div
            key="res-panel"
            className={[
              "fixed z-[81] flex flex-col",
              /* mobile: full width, slides from bottom */
              "bottom-0 left-0 right-0 max-h-[92vh]",
              /* desktop: right side, full height */
              "md:top-0 md:bottom-0 md:left-auto md:right-0 md:max-h-none md:h-full md:w-[660px]",
            ].join(" ")}
            style={{ background: "hsl(8,60%,4%)" }}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Two-column layout */}
            <div
              className="flex flex-col md:flex-row h-full md:overflow-hidden"
              style={{ overflowY: "auto", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >

              {/* LEFT: sidebar (desktop only) */}
              <div
                className="hidden md:flex flex-col justify-between p-8 w-[210px] shrink-0 border-r border-border/15"
                style={{ background: "hsl(8,60%,3%)" }}
              >
                <div>
                  <p className="font-body text-[9px] tracking-[0.5em] text-primary/50 mb-6">BAR MAAYA</p>
                  <h2 className="font-heading text-2xl text-foreground italic leading-tight mb-8">
                    Reserve<br />Your<br /><span className="text-primary">Evening</span>
                  </h2>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <MapPin size={13} className="text-primary/50 mt-0.5 shrink-0" />
                      <p className="font-body text-[11px] text-foreground/40 leading-relaxed">{ADDRESS}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={13} className="text-primary/50 mt-0.5 shrink-0" />
                      <p className="font-body text-[11px] text-foreground/40">{PHONE_NUMBER}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={13} className="text-primary/50 mt-0.5 shrink-0" />
                      <div className="font-body text-[11px] text-foreground/40 leading-relaxed space-y-0.5">
                        <p>Tue – Thu: 4 PM – 12 AM</p>
                        <p>Fri – Sat: 4 PM – 2 AM</p>
                        <p>Sun: 4 PM – 12 AM</p>
                        <p className="text-foreground/25">Mon: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-6 h-px bg-primary/30 mb-4" />
                  <p className="font-script italic text-primary/60 text-sm">A little magic awaits.</p>
                </div>
              </div>

              {/* RIGHT: booking form */}
              <div className="flex flex-col flex-1 min-h-0">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-border/15 shrink-0">
                  <div>
                    <p className="font-body text-[9px] tracking-[0.45em] text-primary/50 mb-0.5">BOOK A TABLE</p>
                    <p className="font-heading text-xl text-foreground italic">Bar Maaya</p>
                  </div>
                  <button
                    onClick={closeWidget}
                    className="w-9 h-9 flex items-center justify-center border border-border/25 hover:border-primary/40 transition-colors"
                    aria-label="Close reservation panel"
                  >
                    <X size={14} className="text-foreground/50" />
                  </button>
                </div>

                {/* Form */}
                <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-5" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" } as React.CSSProperties}>
                  {/* Mobile: mini info strip */}
                  <div className="md:hidden flex items-center gap-3 pb-4 border-b border-border/15">
                    <MapPin size={12} className="text-primary/50 shrink-0" />
                    <p className="font-body text-[11px] text-foreground/40">{ADDRESS}</p>
                  </div>

                  <Select
                    label="Date"
                    value={date}
                    options={DATE_OPTIONS}
                    onChange={setDate}
                    icon={<Clock size={13} />}
                  />
                  <Select
                    label="Time"
                    value={time}
                    options={TIME_OPTIONS}
                    onChange={setTime}
                    icon={<Clock size={13} />}
                  />
                  <Select
                    label="Party Size"
                    value={guests}
                    options={GUEST_OPTIONS}
                    onChange={setGuests}
                    icon={<Users size={13} />}
                  />

                  {/* Selection summary */}
                  <div
                    className="border border-border/20 p-4"
                    style={{ background: "hsl(8,55%,8%)" }}
                  >
                    <p className="font-body text-[9px] tracking-[0.4em] text-foreground/30 mb-1.5">
                      YOUR SELECTION
                    </p>
                    <p className="font-heading text-foreground/80 text-base italic">
                      {dateLabel} · {timeLabel} · {guestLabel}
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href={deepLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center font-body text-[11px] tracking-[0.35em] bg-primary text-background py-4 hover:bg-primary/85 transition-colors"
                  >
                    CONFIRM ON OPENTABLE
                  </a>

                  <p className="font-body text-[10px] text-foreground/25 text-center leading-relaxed">
                    You&apos;ll complete your reservation on OpenTable — free &amp; instant confirmation.
                  </p>
                </div>

                {/* Bottom info cards */}
                <div className="shrink-0 border-t border-border/15 grid grid-cols-2 divide-x divide-border/15">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="p-5 group hover:bg-white/[0.02] transition-colors"
                  >
                    <p className="font-body text-[9px] tracking-widest text-primary/50 mb-1.5">LARGE GROUPS</p>
                    <p className="font-heading text-foreground/70 text-sm italic group-hover:text-primary transition-colors">
                      8+ guests?
                    </p>
                    <p className="font-body text-[10px] text-foreground/30 mt-1">Call us directly.</p>
                  </a>
                  <a
                    href="/events/private-events"
                    onClick={closeWidget}
                    className="p-5 group hover:bg-white/[0.02] transition-colors"
                  >
                    <p className="font-body text-[9px] tracking-widest text-primary/50 mb-1.5">PRIVATE EVENTS</p>
                    <p className="font-heading text-foreground/70 text-sm italic group-hover:text-primary transition-colors">
                      Full venue?
                    </p>
                    <p className="font-body text-[10px] text-foreground/30 mt-1">Inquire here.</p>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
