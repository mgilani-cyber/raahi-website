import { useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import { useReservation } from "@/contexts/ReservationContext";
import { EMAIL } from "@/constants";
import { X, CheckCircle, Ticket } from "lucide-react";
import ImageGallery from "@/components/ui/image-gallery";
import type { EventGalleryId as EventId } from "@/components/ui/image-gallery";

// ─── Shared form styles ───────────────────────────────────────────────────────
const INPUT: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(201,168,76,0.18)",
  color: "#F5ECD7",
  padding: "12px 14px",
  fontFamily: "var(--font-body)",
  fontSize: "16px",
  width: "100%",
  outline: "none",
};
const LABEL = "font-body text-[10px] tracking-[0.35em] text-foreground/35 uppercase block mb-2";

function SuccessScreen({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <CheckCircle size={42} className="text-primary" />
      <p className="font-heading text-foreground text-xl italic">{heading}</p>
      <p className="font-body text-foreground/45 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

// ─── Date card picker ─────────────────────────────────────────────────────────
function DateCardPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const days: { label: string; sub: string; value: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 10; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    days.push({
      label: d.toLocaleDateString("en-CA", { weekday: "short", day: "numeric" }),
      sub:   d.toLocaleDateString("en-CA", { month: "short" }),
      value: d.toISOString().slice(0, 10),
    });
  }
  return (
    <div>
      <label className={LABEL}>Select Game Date *</label>
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
        {days.map(d => (
          <button key={d.value} type="button" onClick={() => onChange(d.value)}
            className="shrink-0 flex flex-col items-center px-4 py-3 min-w-[64px] transition-all duration-200"
            style={{
              border:      value === d.value ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.18)",
              background:  value === d.value ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)",
              color:       value === d.value ? "#C9A84C" : "rgba(245,236,215,0.55)",
            }}>
            <span className="font-heading text-xs italic">{d.label}</span>
            <span className="font-body text-[9px] tracking-widest mt-0.5 opacity-60">{d.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Sip & Paint form ─────────────────────────────────────────────────────────
const TICKET_COUNT = 20;

function SipPaintForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", qty: "1", tier: "general" });
  const [done, setDone] = useState(false);
  if (done) return <SuccessScreen heading="You're on the list!" body="We'll confirm your Sip & Paint spot via email shortly." />;
  const tierPrice = form.tier === "general" ? 20 : 25;
  const total = tierPrice * parseInt(form.qty, 10);
  return (
    <form onSubmit={e => { e.preventDefault(); setDone(true); }} className="space-y-5">
      <div className="flex items-center gap-3 p-4 border border-primary/15" style={{ background: "rgba(201,168,76,0.04)" }}>
        <Ticket size={14} className="text-primary/60 shrink-0" />
        <span className="font-body text-[11px] text-primary/70 tracking-wider">{TICKET_COUNT} spots remaining per tier</span>
      </div>
      <div className="flex gap-3 flex-wrap">
        {([
          { id: "general", label: "$20 — General", price: 20 },
          { id: "premium", label: "$25 — Premium", price: 25 },
        ] as const).map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setForm(f => ({ ...f, tier: t.id }))}
            className="px-5 py-2.5 text-[11px] tracking-wider font-body"
            style={{
              border: form.tier === t.id ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.3)",
              color: form.tier === t.id ? "#C9A84C" : "rgba(201,168,76,0.55)",
              background: form.tier === t.id ? "rgba(201,168,76,0.07)" : "transparent",
              transition: "all 0.2s ease",
              minHeight: "44px",
            }}
          >
            {t.label} · {TICKET_COUNT} Left
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={LABEL}>First Name *</label>
          <input required style={INPUT} inputMode="text" autoComplete="given-name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="First name" /></div>
        <div><label className={LABEL}>Last Name *</label>
          <input required style={INPUT} inputMode="text" autoComplete="family-name" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Last name" /></div>
        <div><label className={LABEL}>Email *</label>
          <input required type="email" style={INPUT} inputMode="email" autoComplete="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" /></div>
        <div><label className={LABEL}>Phone</label>
          <input type="tel" style={INPUT} inputMode="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (416) 000-0000" /></div>
        <div className="sm:col-span-2"><label className={LABEL}>Tickets *</label>
          <select required style={INPUT} value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))}>
            {Array.from({ length: Math.min(TICKET_COUNT, 6) }, (_, i) => i + 1).map(n => (
              <option key={n} value={n} style={{ background: "#1A0A04" }}>{n} ticket{n > 1 ? "s" : ""} — ${tierPrice * n}</option>
            ))}
          </select></div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <p className="font-body text-foreground/35 text-[11px]">Total: <span className="text-primary">${total}</span></p>
        <button type="submit" className="btn-gold-outline text-[10px]">RESERVE MY SPOT</button>
      </div>
    </form>
  );
}

// ─── Sports Watch Party form ──────────────────────────────────────────────────
function SportsForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", guests: "1", date: "" });
  const [done, setDone] = useState(false);
  if (done) return <SuccessScreen heading="See you at the match!" body="Your spot is confirmed. We'll send a reminder before game day." />;
  return (
    <form onSubmit={e => { e.preventDefault(); setDone(true); }} className="space-y-5">
      <div className="p-4 border border-primary/15" style={{ background: "rgba(201,168,76,0.04)" }}>
        <p className="font-body text-[11px] text-primary/70 tracking-wider">$10 entry per person · Reserve your table in advance</p>
      </div>
      <DateCardPicker value={form.date} onChange={date => setForm(f => ({ ...f, date }))} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={LABEL}>First Name *</label>
          <input required style={INPUT} inputMode="text" autoComplete="given-name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="First name" /></div>
        <div><label className={LABEL}>Last Name *</label>
          <input required style={INPUT} inputMode="text" autoComplete="family-name" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Last name" /></div>
        <div><label className={LABEL}>Email *</label>
          <input required type="email" style={INPUT} inputMode="email" autoComplete="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" /></div>
        <div><label className={LABEL}>Guests *</label>
          <select required style={INPUT} value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}>
            {[1,2,3,4,5,6,7,8].map(n => (
              <option key={n} value={n} style={{ background: "#1A0A04" }}>{n} guest{n > 1 ? "s" : ""} — ${10 * n}</option>
            ))}
          </select></div>
      </div>
      {!form.date && <p className="font-body text-[10px] text-red-400/60">Please select a game date above.</p>}
      <div className="pt-2">
        <button type="submit" disabled={!form.date} className="btn-gold-outline text-[10px] disabled:opacity-40 disabled:cursor-not-allowed">
          CLAIM MY SPOT
        </button>
      </div>
    </form>
  );
}

// ─── Private Events form ──────────────────────────────────────────────────────
const EVENT_TYPES = ["Birthday / Celebration", "Corporate Event", "Brand Launch", "Cocktail Reception", "Full Venue Buyout", "Other"];
const BUDGETS     = ["Under $2,000", "$2,000 – $5,000", "$5,000 – $10,000", "$10,000+"];
const PACKAGES    = ["Love Seat (2–8 guests)", "Gallery (8–20 guests)", "Bar Buyout (20–30 guests)", "Ballroom (30–40 guests)", "Not sure yet"];

function PrivateForm({ prefilledType = "" }: { prefilledType?: string }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    type: prefilledType, guests: "", budget: "",
    packageInterest: "", date: "", message: "",
  });
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Private Event Inquiry — ${form.type || "General"}`);
    const body    = encodeURIComponent([
      `Name: ${form.firstName} ${form.lastName}`, `Email: ${form.email}`, `Phone: ${form.phone}`,
      `Event Type: ${form.type}`, `Package Interest: ${form.packageInterest || "Not specified"}`,
      `Guests: ${form.guests}`, `Budget: ${form.budget}`, `Date: ${form.date}`,
      `Message:\n${form.message}`,
    ].filter(Boolean).join("\n"));
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setDone(true);
  };

  if (done) return <SuccessScreen heading="Inquiry received." body="Our events team will reach out within 24 hours to discuss your vision." />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={LABEL}>First Name *</label>
          <input required style={INPUT} inputMode="text" autoComplete="given-name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="First name" /></div>
        <div><label className={LABEL}>Last Name *</label>
          <input required style={INPUT} inputMode="text" autoComplete="family-name" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Last name" /></div>
        <div><label className={LABEL}>Email *</label>
          <input required type="email" style={INPUT} inputMode="email" autoComplete="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" /></div>
        <div><label className={LABEL}>Phone</label>
          <input type="tel" style={INPUT} inputMode="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (416) 000-0000" /></div>
        <div><label className={LABEL}>Event Type *</label>
          <select required style={INPUT} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
            <option value="" style={{ background: "#1A0A04" }}>Select type</option>
            {EVENT_TYPES.map(t => <option key={t} value={t} style={{ background: "#1A0A04" }}>{t}</option>)}
          </select></div>
        <div><label className={LABEL}>Package Interest</label>
          <select style={INPUT} value={form.packageInterest} onChange={e => setForm(f => ({ ...f, packageInterest: e.target.value }))}>
            <option value="" style={{ background: "#1A0A04" }}>Select package</option>
            {PACKAGES.map(p => <option key={p} value={p} style={{ background: "#1A0A04" }}>{p}</option>)}
          </select></div>
        <div><label className={LABEL}>Guests *</label>
          <input required type="number" min="1" max="200" style={INPUT} inputMode="numeric" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} placeholder="e.g. 20" /></div>
        <div><label className={LABEL}>Budget *</label>
          <select required style={INPUT} value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
            <option value="" style={{ background: "#1A0A04" }}>Select range</option>
            {BUDGETS.map(b => <option key={b} value={b} style={{ background: "#1A0A04" }}>{b}</option>)}
          </select></div>
        <div className="sm:col-span-2"><label className={LABEL}>Event Date</label>
          <input type="date" style={INPUT} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
        <div className="sm:col-span-2"><label className={LABEL}>Tell Us Your Vision</label>
          <textarea rows={3} style={{ ...INPUT, resize: "vertical" }} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Describe your theme, special requests…" /></div>
      </div>
      <div className="pt-2">
        <button type="submit" className="btn-gold-outline text-[10px]">SUBMIT INQUIRY</button>
      </div>
    </form>
  );
}

// ─── Package cards ────────────────────────────────────────────────────────────
const BIRTHDAY_PACKAGES = [
  { venue: "Love Seat",  guests: "2–8 guests",   price: "From $35/person", perks: ["Reserved table", "On-the-house tiramisu cake", "Personalized welcome"] },
  { venue: "Gallery",    guests: "8–20 guests",   price: "From $35/person", perks: ["Private gallery section", "Tiramisu cake included", "Birthday banner"] },
  { venue: "Bar Buyout", guests: "20–30 guests",  price: "From $40/person", perks: ["Full bar reserved", "Custom menu planning", "Tiramisu cake + DJ coordination"] },
  { venue: "Ballroom",   guests: "30–40 guests",  price: "From $45/person", perks: ["Full venue buyout", "Bespoke menu & entertainment", "Personalized décor"] },
];

const CORPORATE_PACKAGES = [
  { venue: "Team Dinner",          guests: "4–15 guests",  price: "From $35/person", perks: ["Reserved section", "Set menu options", "Welcome drinks"] },
  { venue: "Client Entertainment", guests: "15–25 guests", price: "From $40/person", perks: ["Private area", "Custom cocktail menu", "AV support available"] },
  { venue: "Full Buyout",          guests: "25–40 guests", price: "Custom pricing",  perks: ["Entire venue", "Bespoke event management", "Custom entertainment"] },
];

function PackageCards({ packages }: { packages: typeof BIRTHDAY_PACKAGES }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {packages.map(pkg => (
        <div key={pkg.venue} style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "18px 16px", background: "rgba(201,168,76,0.025)", borderTop: "2px solid rgba(201,168,76,0.5)" }}>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "16px", color: "#F5ECD7", marginBottom: "4px" }}>{pkg.venue}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(245,236,215,0.35)", marginBottom: "8px", letterSpacing: "0.05em" }}>{pkg.guests}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#C9A84C", marginBottom: "10px" }}>{pkg.price}</p>
          <ul className="space-y-1">
            {pkg.perks.map(p => (
              <li key={p} style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(245,236,215,0.35)" }}>· {p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function BirthdayModalContent() {
  return (
    <div>
      <div className="mb-6 p-4 border border-primary/15" style={{ background: "rgba(201,168,76,0.04)" }}>
        <p className="font-body text-[11px] text-primary/70 tracking-wider">Every package includes an on-the-house tiramisu cake · Groups of 2 to 40</p>
      </div>
      <PackageCards packages={BIRTHDAY_PACKAGES} />
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "24px" }}>
        <p className="font-body text-[10px] tracking-[0.35em] text-foreground/35 uppercase mb-4">Send an Inquiry</p>
        <PrivateForm prefilledType="Birthday / Celebration" />
      </div>
    </div>
  );
}

function CorporateModalContent() {
  return (
    <div>
      <div className="mb-6 p-4 border border-primary/15" style={{ background: "rgba(201,168,76,0.04)" }}>
        <p className="font-body text-[11px] text-primary/70 tracking-wider">Client entertaining, team events, brand activations · Groups of 4 to 40</p>
      </div>
      <PackageCards packages={CORPORATE_PACKAGES} />
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "24px" }}>
        <p className="font-body text-[10px] tracking-[0.35em] text-foreground/35 uppercase mb-4">Send an Inquiry</p>
        <PrivateForm prefilledType="Corporate Event" />
      </div>
    </div>
  );
}

// ─── Modal overlay ────────────────────────────────────────────────────────────
function EventModal({ id, onClose }: { id: EventId; onClose: () => void }) {
  const titles: Record<EventId, string> = {
    "sip-paint": "Sip & Paint",
    "sports":    "Sports Watch Party",
    "birthday":  "Birthday Packages",
    "corporate": "Corporate Events",
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 85,
        background: "rgba(0,0,0,0.85)",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px 16px 40px 16px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
        onPointerDown={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          flexShrink: 0,
          background: "#1E160D",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: 8,
          padding: "40px 32px",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: 16, right: 16, zIndex: 10, background: "none", border: "none", cursor: "pointer", color: "rgba(245,236,215,0.5)", display: "flex", padding: 4 }}
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div style={{ marginBottom: 28, paddingRight: 32 }}>
          <p className="font-body text-[9px] tracking-[0.45em] text-primary/50 mb-1">BOOK AN EVENT</p>
          <p className="font-heading text-xl text-foreground italic">{titles[id]}</p>
        </div>

        {/* Content — no scroll here, overlay scrolls */}
        {id === "sip-paint"  && <SipPaintForm />}
        {id === "sports"     && <SportsForm />}
        {id === "birthday"   && <BirthdayModalContent />}
        {id === "corporate"  && <CorporateModalContent />}
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const BookEvent = () => {
  const [activeModal, setActiveModal] = useState<EventId | null>(null);
  const { openWidget } = useReservation();

  return (
    <>
      <SEOHead
        title="Events at Bar Maaya Toronto | Sip & Paint, Sports Watch, Private"
        description="Book Sip & Paint nights, Sports Watch Parties, Birthday and Corporate events at Bar Maaya, Toronto's immersive cocktail bar in the Entertainment District."
        canonical="/events"
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-center -mt-20 text-center"
        style={{ minHeight: "280px", background: "#0A0804", padding: "100px 24px 56px" }}
      >
        <div>
          <motion.p
            className="font-body text-[10px] tracking-[0.5em] text-primary/60 mb-4"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            CHOOSE YOUR NIGHT
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight"
              initial={{ y: "100%" }} animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              Events At <span className="text-primary italic">Maaya</span>
            </motion.h1>
          </div>
          <motion.p
            className="font-heading italic text-foreground/35 text-base md:text-xl mt-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Sip &amp; Paint · Sports Watch · Birthday · Corporate
          </motion.p>
        </div>
      </div>

      {/* ── EVENTS ACCORDION ─────────────────────────────────────────────── */}
      <div style={{ background: "#0A0804", padding: "0 0 4px" }}>
        <ImageGallery onBook={(id) => setActiveModal(id)} />
      </div>

      {/* ── BOTTOM INFO STRIP ────────────────────────────────────────────── */}
      <section style={{ background: "hsl(8,60%,4%)", padding: "64px 24px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-[10px] tracking-[0.5em] text-primary/50 uppercase mb-4">Also At Bar Maaya</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { label: "Happy Hour",        detail: "Daily 4–6 PM · 20% off cocktails",  action: () => openWidget() },
              { label: "Live Music",        detail: "Fri & Sat from 8 PM · No cover",    action: () => openWidget() },
              { label: "Walk-ins Welcome",  detail: "No reservation needed · All nights", action: () => openWidget() },
            ].map(item => (
              <button key={item.label} onClick={item.action} className="text-left group min-h-[44px]">
                <p className="font-heading text-foreground/70 text-lg italic group-hover:text-primary transition-colors duration-200">{item.label}</p>
                <p className="font-body text-foreground/30 text-[11px] tracking-wider mt-1">{item.detail}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── BOOKING MODALS ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <EventModal
            key={activeModal}
            id={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default BookEvent;
