import InteractiveSelector from "@/components/ui/interactive-selector";
import { useState, useRef } from "react";
import { PageHero } from "@/components/PageHero";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { EMAIL } from "@/constants";
import barPanoramic from "@/assets/bar-panoramic.jpg";
// Unsplash: private event / people images
const PRIV_CORPORATE   = "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&q=80"; // people/social (#12)
const PRIV_CELEBRATION = "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1600&q=80"; // people/social (#11)

const eventTypes = [
  { label: "Birthday", emoji: "🥂" },
  { label: "Bachelorette", emoji: "✨" },
  { label: "Corporate", emoji: "🤝" },
  { label: "Anniversary", emoji: "💛" },
  { label: "Other", emoji: "🎉" },
];

const STEPS = ["Your Details", "Event Info", "Final Touch"];

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-3 mb-8 justify-center">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-7 h-7 border text-xs font-body transition-all duration-400 ${
            i < current ? "bg-primary border-primary text-primary-foreground" :
            i === current ? "border-primary text-primary" :
            "border-border/40 text-foreground/30"
          }`}>
            {i < current ? <Check size={12} /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-10 h-[1px] transition-colors duration-400 ${i < current ? "bg-primary" : "bg-border"}`} />
          )}
        </div>
      ))}
    <InteractiveSelector />
</div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

const PrivateEvents = () => {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    eventType: "", preferredDate: "", guestCount: "", budget: "", details: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const goNext = () => { setDir(1); setStep(s => s + 1); };
  const goPrev = () => { setDir(-1); setStep(s => s - 1); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`, `Email: ${form.email}`, `Phone: ${form.phone}`,
      form.company ? `Company: ${form.company}` : "",
      `Event Type: ${form.eventType}`, `Date: ${form.preferredDate}`,
      `Guests: ${form.guestCount}`, `Budget: ${form.budget}`,
      form.details ? `Details: ${form.details}` : "",
    ].filter(Boolean).join("\n");
    window.location.href = `mailto:${EMAIL}?subject=Private Event Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };

  const inputCls = "w-full bg-transparent border border-border/40 px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors font-body placeholder:text-foreground/25";
  const labelCls = "font-body text-[10px] tracking-[0.4em] text-foreground/35 uppercase mb-2 block";

  return (
    <>
        title="Private Events Toronto | Bar Maaya — Venue Hire"
        description="Host your private event at Bar Maaya in Toronto's Entertainment District. Birthdays, corporate events, bachelorettes and full venue buyouts. Up to 200 guests."
        canonical="/events/private-events"
      />
      <PageHero label="Available Year-Round" heading={`Host Your\nEvent at Maaya`} image={barPanoramic} overlay={0.6} />

      {/* Event Types */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-6">
          <FadeUp>
            <p className="section-label text-center">What's The Occasion?</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground text-center leading-tight mb-16">
              Every Celebration,<br /><span className="text-primary italic">Elevated</span>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              { title: "Corporate Events", sub: "Team experiences & client entertaining", image: PRIV_CORPORATE },
              { title: "Personal Celebrations", sub: "Birthdays, bachelorettes, anniversaries", image: PRIV_CELEBRATION },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="relative group overflow-hidden rounded-sm min-h-[300px] flex flex-col justify-end">
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="relative z-10 p-8">
                    <p className="font-script italic text-primary text-base mb-1">{item.sub}</p>
                    <h3 className="font-heading text-foreground text-2xl">{item.title}</h3>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          {/* Event type pills */}
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {eventTypes.map(t => (
                <span key={t.label} className="border border-border/30 px-5 py-2 text-[11px] font-body tracking-widest text-foreground/35 hover:border-primary/50 hover:text-primary transition-colors duration-300 cursor-default">
                  {t.emoji} {t.label}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 3-Step Inquiry Form */}
      <section className="py-24 md:py-36" style={{ background: "hsl(8,60%,4%)" }}>
        <div className="container mx-auto px-6 max-w-xl">
          <FadeUp>
            <p className="section-label text-center">Get In Touch</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground text-center leading-tight mb-3">Event Inquiry</h2>
            <p className="font-body text-foreground/35 text-center text-sm mb-12 tracking-wide">We'll respond within 24 hours.</p>
          </FadeUp>

          <div className="border border-border/20 p-8 md:p-12" style={{ background: "hsl(8,55%,9%)" }}>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Check size={28} className="text-primary" />
                  </motion.div>
                  <h3 className="font-heading text-2xl text-foreground mb-3">Inquiry Sent</h3>
                  <p className="text-muted-foreground text-sm">Our events team will reach out within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <StepDots current={step} />
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait" custom={dir}>
                      {step === 0 && (
                        <motion.div key="s0" custom={dir} variants={slideVariants}
                          initial="enter" animate="center" exit="exit"
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="space-y-4"
                        >
                          <p className="font-heading text-foreground text-lg mb-5">Who are you?</p>
                          {[
                            { key: "name", label: "Full Name", type: "text", required: true },
                            { key: "email", label: "Email Address", type: "email", required: true },
                            { key: "phone", label: "Phone Number", type: "tel", required: true },
                            { key: "company", label: "Company Name (optional)", type: "text", required: false },
                          ].map(f => (
                            <div key={f.key}>
                              <label className={labelCls}>{f.label}</label>
                              <input type={f.type} value={form[f.key as keyof typeof form]}
                                onChange={e => set(f.key, e.target.value)}
                                className={inputCls} required={f.required} />
                            </div>
                          ))}
                        </motion.div>
                      )}
                      {step === 1 && (
                        <motion.div key="s1" custom={dir} variants={slideVariants}
                          initial="enter" animate="center" exit="exit"
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="space-y-4"
                        >
                          <p className="font-heading text-foreground text-lg mb-5">Tell us about your event</p>
                          <div>
                            <label className={labelCls}>Event Type</label>
                            <select value={form.eventType} onChange={e => set("eventType", e.target.value)} className={inputCls} required>
                              <option value="">Select type</option>
                              {eventTypes.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelCls}>Preferred Date</label>
                              <input type="date" value={form.preferredDate} onChange={e => set("preferredDate", e.target.value)} className={inputCls} required />
                            </div>
                            <div>
                              <label className={labelCls}>Guest Count</label>
                              <input type="number" min={1} value={form.guestCount} onChange={e => set("guestCount", e.target.value)} className={inputCls} required />
                            </div>
                          </div>
                          <div>
                            <label className={labelCls}>Estimated Budget</label>
                            <select value={form.budget} onChange={e => set("budget", e.target.value)} className={inputCls} required>
                              <option value="">Select range</option>
                              {["Under $500", "$500–$1,000", "$1,000–$2,500", "$2,500+", "Unsure"].map(b => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </div>
                        </motion.div>
                      )}
                      {step === 2 && (
                        <motion.div key="s2" custom={dir} variants={slideVariants}
                          initial="enter" animate="center" exit="exit"
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="space-y-4"
                        >
                          <p className="font-heading text-foreground text-lg mb-5">Anything else we should know?</p>
                          <div>
                            <label className={labelCls}>Additional Details (optional)</label>
                            <textarea value={form.details} onChange={e => set("details", e.target.value)}
                              rows={5} placeholder="Special requests, décor preferences, catering notes..."
                              className={`${inputCls} resize-none`} />
                          </div>
                          <div className="border border-border/30 rounded-sm p-4 bg-card text-xs text-muted-foreground space-y-1">
                            <p><span className="text-foreground">Name:</span> {form.name}</p>
                            <p><span className="text-foreground">Event:</span> {form.eventType} · {form.preferredDate} · {form.guestCount} guests</p>
                            <p><span className="text-foreground">Budget:</span> {form.budget}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-3 mt-8">
                      {step > 0 && (
                        <button type="button" onClick={goPrev} className="btn-dark-filled text-xs flex-1">← BACK</button>
                      )}
                      {step < 2 ? (
                        <button type="button" onClick={goNext} className="btn-gold-outline text-xs flex-1">CONTINUE →</button>
                      ) : (
                        <button type="submit" className="bg-primary text-primary-foreground py-3 text-sm tracking-[0.2em] font-body font-medium hover:bg-primary/90 transition-all duration-300 min-h-[44px] flex-1">
                          SEND INQUIRY
                        </button>
                      )}
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivateEvents;
