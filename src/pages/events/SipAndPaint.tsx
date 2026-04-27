import { useState, useRef } from "react";
import { PageHero } from "@/components/PageHero";

import { MagneticElement } from "@/components/MagneticElement";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
// Unsplash: art/paint event images
const SIP_HERO  = "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80"; // art/paint (#14)
const SIP_ABOUT = "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600&q=80"; // art/paint (#13)

const tiers = [
  { name: "General Admission", price: "$20", id: "general", soldOut: false, ticketsRemaining: 20, perks: ["Canvas and art supplies included", "Expert artist guide", "Open seating"] },
  { name: "Final Round",       price: "$25", id: "final",   soldOut: false, ticketsRemaining: 20, perks: ["Premium canvas and art supplies included", "Priority seating", "Everything in General"] },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

const SipAndPaint = () => {
  const [form, setForm] = useState({ quantity: 1, tier: "general", name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls = "w-full bg-transparent border border-border/40 px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors font-body placeholder:text-foreground/25";
  const labelCls = "font-body text-[10px] tracking-[0.4em] text-foreground/35 uppercase mb-2 block";

  return (
    <>
        title="Sip & Paint Toronto Every Saturday | Bar Maaya"
        description="Join Bar Maaya's Sip & Paint every Saturday in Toronto's Entertainment District. Canvas and art supplies included, guided by a professional artist. From $20."
        canonical="/events/sip-and-paint"
      />
      <PageHero label="Every Saturday at Bar Maaya" heading="Sip & Paint" image={SIP_HERO} overlay={0.6} />

      {/* About the event */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <FadeUp>
              <p className="section-label">About The Event</p>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Unleash Your<br /><span className="text-primary italic">Creativity</span>
              </h2>
              <p className="font-body text-foreground/45 leading-[1.85] mb-5 text-sm"
                style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}>
                Pick up a brush, create something beautiful, and enjoy the atmosphere of Bar Maaya.
                No artistic experience required — every session is led by a professional artist who
                guides you step by step through the evening's featured piece.
              </p>
              <p className="font-body text-foreground/35 leading-[1.85] mb-10 text-sm"
                style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}>
                Every Saturday — and spots fill up fast.
              </p>
              <div className="space-y-4">
                {[
                  "Canvas and art supplies included",
                  "Expert artist guidance throughout the evening",
                  "All painting materials and brushes provided",
                  "No experience required — everyone's an artist here",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="w-5 h-5 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-primary" />
                    </div>
                    <span className="font-body text-foreground/55 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <motion.div
                className="overflow-hidden h-[60vw] lg:h-[560px]"
                initial={{ clipPath: "inset(16% 0% 16% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.img
                  src={SIP_ABOUT}
                  alt="Sip & Paint"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.75)" }}
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Pricing + booking */}
      <section className="py-24 md:py-36" style={{ background: "hsl(8,60%,4%)" }}>
        <div className="container mx-auto px-6 max-w-2xl">
          <FadeUp>
            <p className="section-label text-center">Choose Your Experience</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground text-center leading-tight mb-16">
              Reserve a Table
            </h2>
          </FadeUp>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 border border-border/20"
                style={{ background: "hsl(8,55%,9%)" }}
              >
                <div className="w-14 h-14 border border-primary/40 flex items-center justify-center mx-auto mb-6">
                  <Check size={22} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-3">You're In!</h3>
                <p className="font-body text-foreground/40 text-sm">We'll send confirmation details to your email shortly.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Tier selection */}
                <div>
                  <p className={labelCls}>Select Tier</p>
                  <div className="grid grid-cols-2 gap-3">
                    {tiers.map(tier => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, tier: tier.id }))}
                        className={`relative p-6 border text-left transition-all duration-300 ${
                          form.tier === tier.id
                            ? "border-primary/60 bg-primary/5"
                            : "border-border/30 hover:border-primary/30"
                        }`}
                        style={{ background: form.tier === tier.id ? "hsl(8,55%,10%)" : "hsl(8,55%,9%)" }}
                      >
                        {form.tier === tier.id && (
                          <motion.div layoutId="tier-indicator" className="absolute top-3 right-3 w-4 h-4 border border-primary flex items-center justify-center">
                            <Check size={9} className="text-primary" />
                          </motion.div>
                        )}
                        <p className="font-heading text-foreground text-base mb-1">{tier.name}</p>
                        <p className="text-primary font-heading text-2xl mb-2">{tier.price}</p>
                        <p className="font-body text-[10px] tracking-wider mb-3" style={{ color: "rgba(201,168,76,0.55)" }}>
                          {tier.ticketsRemaining} tickets remaining
                        </p>
                        <ul className="space-y-1">
                          {tier.perks.map(p => <li key={p} className="font-body text-[11px] text-foreground/40">· {p}</li>)}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p className={labelCls}>Number of Tickets</p>
                  <div className="flex items-center gap-5">
                    <button type="button" onClick={() => setForm(f => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))}
                      className="w-10 h-10 border border-border/40 text-foreground hover:border-primary hover:text-primary transition-colors text-xl">−</button>
                    <span className="text-foreground font-heading text-3xl w-10 text-center">{form.quantity}</span>
                    <button type="button" onClick={() => setForm(f => ({ ...f, quantity: Math.min(10, f.quantity + 1) }))}
                      className="w-10 h-10 border border-border/40 text-foreground hover:border-primary hover:text-primary transition-colors text-xl">+</button>
                    <span className="font-body text-foreground/35 text-sm ml-2">
                      Total: <span className="text-primary font-heading text-lg">
                        ${(form.quantity * (form.tier === "general" ? 20 : 25)).toFixed(0)}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Personal details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Full Name", type: "text", span: true },
                    { key: "email", label: "Email Address", type: "email" },
                    { key: "phone", label: "Phone Number", type: "tel" },
                  ].map(f => (
                    <div key={f.key} className={(f as any).span ? "md:col-span-2" : ""}>
                      <label className={labelCls}>{f.label}</label>
                      <input type={f.type} value={form[f.key as keyof typeof form] as string}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className={inputCls} required />
                    </div>
                  ))}
                </div>
                <div>
                  <label className={labelCls}>Additional Notes (optional)</label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    rows={3} className={`${inputCls} resize-none`} />
                </div>

                <MagneticElement className="block">
                  <button type="submit" className="w-full btn-gold-outline text-[11px] !py-4">
                    BOOK MY SPOT — {form.quantity} {form.quantity === 1 ? "TICKET" : "TICKETS"}
                  </button>
                </MagneticElement>
                <p className="font-body text-[10px] text-foreground/25 text-center tracking-widest">Confirmation sent to your email</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default SipAndPaint;
