import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { MagneticElement } from "@/components/MagneticElement";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import ImageAutoSlider from "@/components/ui/image-auto-slider";
import { OPENTABLE_URL } from "@/constants";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { useReservation } from "@/contexts/ReservationContext";

// Assets
import cocktailAmber   from "@/assets/cocktail-amber.jpg";
import barAtmosphere   from "@/assets/bar-atmosphere.jpg";
import barPanoramic    from "@/assets/bar-panoramic.jpg";
import parallaxBg      from "@/assets/parallax-bg.jpg";
import djNight         from "@/assets/dj-night.jpg";
import saxNight        from "@/assets/sax-night.jpg";
import tableSet        from "@/assets/table-setting.jpg";
import womanAmber      from "@/assets/woman-amber.jpg";
import womanCocktail   from "@/assets/woman-cocktail.jpg";
import foodDark        from "@/assets/food-dark.jpg";
import gallery1        from "@/assets/gallery-1.png";
import gallery2        from "@/assets/gallery-2.png";
import gallery3        from "@/assets/gallery-3.png";
import gallery4        from "@/assets/gallery-4.png";
import gallery5        from "@/assets/gallery-5.png";
import gallery6        from "@/assets/gallery-6.png";
import gallery7        from "@/assets/gallery-7.png";

// ─── Animated counter ─────────────────────────────────────────────────────────

function CountUp({ target, suffix = "", duration = 1.8 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const fps = 60;
    const frames = Math.round(duration * fps);
    let frame = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const id = setInterval(() => {
      frame++;
      setValue(Math.round(ease(frame / frames) * target));
      if (frame >= frames) clearInterval(id);
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [inView, target, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

function SlideUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "102%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}>
        {children}
      </motion.div>
    </div>
  );
}

function RevealImage({ src, alt = "", className = "", delay = 0, brightness = 0.72 }: { src: string; alt?: string; className?: string; delay?: number; brightness?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(18% 0% 18% 0%)" }}
      animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{ duration: 1.15, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <motion.img src={src} alt={alt} className="w-full h-full object-cover"
        style={{ filter: `brightness(${brightness})` }}
        initial={{ scale: 1.14 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.15, delay, ease: [0.25, 0.46, 0.45, 0.94] }} />
    </motion.div>
  );
}

function ParallaxBg({ src, children, brightness = 0.28, className = "" }: { src: string; children: React.ReactNode; brightness?: number; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 scale-[1.42]" style={{ y }}>
        <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: `brightness(${brightness})` }} />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── Night Card (FIX 3) ───────────────────────────────────────────────────────

function NightCard({ img, label, heading, time, desc, onBook, cta = "Reserve a Table", highlighted = false }: {
  img: string; label: string; heading: string; time: string; desc: string; onBook: () => void; cta?: string; highlighted?: boolean;
}) {
  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer"
      style={{
        minHeight: "420px", borderRadius: "4px", display: "flex", flexDirection: "column", justifyContent: "flex-end",
        ...(highlighted ? { border: "1px solid rgba(201,168,76,0.55)" } : {}),
      }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest:  { y: 0,  boxShadow: "0 4px 24px rgba(0,0,0,0.3)" },
        hover: { y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.3)" },
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onBook}
    >
      {/* Background image */}
      <motion.img
        src={img} alt={heading}
        className="absolute inset-0 w-full h-full object-cover object-center"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Dark overlay — lightens on hover */}
      <motion.div
        className="absolute inset-0"
        variants={{
          rest:  { background: "rgba(10,8,4,0.55)" },
          hover: { background: "rgba(10,8,4,0.25)" },
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Gold top accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#C9A84C" }} />

      {/* Daily special badge */}
      {highlighted && (
        <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 20, background: "#C9A84C", color: "#0A0804", fontSize: "9px", letterSpacing: "0.2em", padding: "4px 10px", fontFamily: "Calibri, 'Gill Sans', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>
          DAILY SPECIAL
        </div>
      )}

      {/* Card content */}
      <div style={{ position: "relative", zIndex: 10, padding: "28px" }}>
        <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#C9A84C", textTransform: "uppercase", marginBottom: "8px" }}>{label}</p>
        <h3 style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", fontSize: "32px", color: "#F5ECD7", lineHeight: 1.1, marginBottom: "8px" }}>{heading}</h3>
        <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "14px", color: "#C9A84C", marginBottom: "8px" }}>{time}</p>
        <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "13px", color: "rgba(245,236,215,0.5)", marginBottom: "20px", lineHeight: 1.55 }}>{desc}</p>
        {/* Desktop: slide-up on hover */}
        <motion.button
          onClick={e => { e.stopPropagation(); onBook(); }}
          className="hidden md:block"
          variants={{ rest: { y: 12, opacity: 0, pointerEvents: "none" }, hover: { y: 0, opacity: 1, pointerEvents: "auto" } }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "10px", letterSpacing: "0.2em",
            border: "1px solid rgba(201,168,76,0.5)", color: "rgba(201,168,76,0.85)",
            padding: "10px 20px", background: "transparent", cursor: "pointer", textTransform: "uppercase",
          }}
        >
          {cta}
        </motion.button>
        {/* Mobile: always visible */}
        <button
          onClick={e => { e.stopPropagation(); onBook(); }}
          className="md:hidden"
          style={{
            fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "10px", letterSpacing: "0.2em",
            border: "1px solid rgba(201,168,76,0.5)", color: "rgba(201,168,76,0.85)",
            padding: "10px 20px", background: "transparent", cursor: "pointer", textTransform: "uppercase",
          }}
        >
          {cta}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Cocktail Showcase ────────────────────────────────────────────────────────

interface FeaturedCocktail {
  name: string;
  ingredients: [string, string, string];
  desc: string;
  profile: string;
  price: number;
  cardBg: string;
}

const FEATURED_COCKTAILS: FeaturedCocktail[] = [
  { name: "Saffron Spice",            ingredients: ["Saffron Vodka", "Ginger Liqueur", "Mango Juice"],  desc: "A golden ritual — floral, exotic, and warmly spiced.",    profile: "SPICY",   price: 24, cardBg: "#1A0F04" },
  { name: "Smokey Trails",            ingredients: ["Mezcal", "Rye Whiskey", "Cinnamon Syrup"],        desc: "Smoke meets honey. Bold, balanced, unforgettable.",       profile: "SMOKY",   price: 23, cardBg: "#151018" },
  { name: "Rose Bazaar",              ingredients: ["Pisco", "Elderflower", "Sparkling Wine"],         desc: "Floral, light, effervescent. Elegance in a glass.",       profile: "FLORAL",  price: 19, cardBg: "#0A0A1E" },
  { name: "Chocolate Boulevardier",   ingredients: ["Whiskey", "Cocoa Campari", "Montenegro"],        desc: "Bitter, dark, deeply satisfying. For the bold.",          profile: "BITTER",  price: 19, cardBg: "#2A0A0A" },
  { name: "Strawberry Absinthe Sour", ingredients: ["Gin", "Absinthe", "Egg White"],                  desc: "Complex and tangy. A sour with anise intrigue.",          profile: "CITRUS",  price: 19, cardBg: "#181A04" },
  { name: "Deshler",                  ingredients: ["Whiskey", "Lillet Blanc", "Orange Curaçao"],     desc: "A classic refined. Smooth, citrus-kissed, timeless.",     profile: "CLASSIC", price: 20, cardBg: "#1A0F04" },
];

function CocktailShowcaseCard({ name, ingredients, desc, profile, price, cardBg, index }: FeaturedCocktail & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ rotateX: -4, rotateY: 4, scale: 1.02, boxShadow: "0 0 40px rgba(201,168,76,0.12)" }}
      className="border-beam"
      style={{
        background: cardBg,
        border: "1px solid rgba(201,168,76,0.12)",
        padding: "36px 28px 28px",
        minHeight: "440px",
        display: "flex",
        flexDirection: "column",
        transformStyle: "preserve-3d",
        perspective: "900px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }} />
      <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(201,168,76,0.8)", marginBottom: "24px" }}>
        {ingredients.join(" · ")}
      </p>
      <h3 style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", fontSize: "26px", color: "#F5ECD7", lineHeight: 1.2, marginBottom: "14px", flexGrow: 1 }}>
        {name}
      </h3>
      <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "13px", color: "#8C7A5E", lineHeight: 1.65, marginBottom: "24px" }}>
        {desc}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ display: "inline-block", border: "1px solid rgba(201,168,76,0.45)", color: "rgba(201,168,76,0.8)", padding: "4px 10px", fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {profile}
        </span>
        <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: "18px", color: "#F5ECD7" }}>
          ${price}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const REVIEWS = [
  { quote: "The most immersive bar I've visited in Toronto. Every cocktail felt like a performance.", name: "Sarah M., Toronto" },
  { quote: "Came for Sip & Paint and left completely obsessed. The atmosphere, the art, the people — worth every dollar.", name: "James K., Toronto" },
  { quote: "The Tableside Old-Fashioned is not just a drink, it's theatre. Book a table. You'll thank me later.", name: "Priya R., Mississauga" },
  { quote: "Bought a gift card for my partner. Three weeks later they're still raving about it.", name: "Daniel W., Toronto" },
  { quote: "Dark, warm, mysterious. Like stepping into another world the moment you walk in.", name: "Aisha T., Toronto" },
  { quote: "The Sip & Paint night exceeded every expectation. The art guide, the vibe, the staff — flawless.", name: "Marcus L., Etobicoke" },
];

function ReviewCard({ quote, name }: { quote: string; name: string }) {
  return (
    <div style={{ width: "340px", padding: "0 40px", borderRight: "1px solid rgba(201,168,76,0.15)", flexShrink: 0 }}>
      <p style={{ letterSpacing: "3px", color: "#C9A84C", fontSize: "14px", marginBottom: "16px" }}>★★★★★</p>
      <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", fontSize: "15px", color: "#F5ECD7", lineHeight: 1.7 }}>"{quote}"</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontVariant: "small-caps", color: "rgba(201,168,76,0.65)", marginTop: "16px" }}>{name}</p>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MARQUEE_WORDS = [
  "BAR MAAYA", "·", "TORONTO", "·", "LOOK BEYOND THE VEIL", "·",
  "EASTERN FLAVOURS", "·", "WESTERN CRAFT", "·", "244 ADELAIDE ST W", "·",
];

const SLIDER_IMAGES = [
  { src: gallery1 }, { src: barAtmosphere }, { src: gallery3 },
  { src: djNight },  { src: gallery5 },      { src: saxNight },
  { src: gallery7 }, { src: cocktailAmber }, { src: gallery2 },
  { src: barPanoramic }, { src: gallery6 }, { src: womanAmber },
];

const INSTAGRAM_GRID = [
  { src: gallery1,      caption: "Every sip, intentional." },
  { src: gallery2,      caption: "Craft cocktails, Eastern soul." },
  { src: barAtmosphere, caption: "Amber light, immersive space." },
  { src: gallery4,      caption: "Where illusion begins." },
  { src: saxNight,      caption: "Live music under golden light." },
  { src: cocktailAmber, caption: "The Saffron Spice ritual." },
  { src: gallery7,      caption: "Celebrate every moment." },
  { src: djNight,       caption: "Nights you won't forget." },
  { src: womanCocktail, caption: "Bar Maaya, Toronto." },
];

// ─── Page Sections ────────────────────────────────────────────────────────────

function HomepageContent() {
  const { openWidget } = useReservation();

  return (
    <>
      <style>{`
        .marquee-track { display:flex; animation:marquee-scroll 50s linear infinite; width:max-content; }
        .marquee-track:hover { animation-play-state:paused; }
        @keyframes marquee-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>

      <h1 className="sr-only">Where Illusion Meets Every Pour</h1>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <div className="overflow-hidden py-[11px] border-y border-primary/10" style={{ background: "hsl(8,60%,4%)" }}>
        <motion.div className="flex gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}>
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className={`text-[10px] font-body tracking-[0.38em] shrink-0 ${w === "·" ? "text-primary/50" : "text-foreground/18"}`}>{w}</span>
          ))}
        </motion.div>
      </div>

      {/* ── THE ILLUSION ─────────────────────────────────────────────────── */}
      <section className="py-[48px] md:py-[60px] lg:py-[80px]" style={{ background: "hsl(8,60%,3%)" }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-[60px] items-stretch">
            <div className="flex flex-col justify-center">
              <FadeUp><p className="font-body text-[10px] tracking-[0.55em] text-primary/45 uppercase mb-8">Maaya · The Illusion</p></FadeUp>
              <SlideUp delay={0.05}>
                <h2 className="font-heading text-foreground leading-[0.92] mb-6" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
                  Between<br /><span className="text-primary italic">Two Worlds</span>
                </h2>
              </SlideUp>
              <FadeUp delay={0.1}>
                <p className="font-heading italic text-foreground/55 text-lg md:text-xl mb-8 max-w-[400px]" style={{ lineHeight: 1.5 }}>
                  Bar Maaya is Toronto's immersive cocktail bar in the heart of the Entertainment District. Sip over-the-top drinks, share tapas and lose yourself in a moody, music-filled escape.
                </p>
              </FadeUp>
              <FadeUp delay={0.18}>
                <p className="text-foreground/36 text-sm leading-[1.9] mb-10 max-w-[360px] font-body">
                  We inhabit the space between the ordinary and the extraordinary — where Eastern ritual meets Western craft, and every cocktail is a story waiting to begin.
                </p>
                <div className="h-px w-12 bg-primary/25 mb-10" />
                <p className="text-foreground/22 text-[11px] leading-[1.85] max-w-[320px] font-body" style={{ letterSpacing: "0.02em" }}>
                  At 244 Adelaide St West, Toronto's Entertainment District. Step through the veil — and discover what lies on the other side.
                </p>
              </FadeUp>
            </div>
            <RevealImage
              src="/sTORY/food-cocktail-spread.png"
              alt="Cocktails and tapas at Bar Maaya"
              className="h-[80vw] lg:h-full min-h-[500px]"
              brightness={0.85}
              delay={0.1}
            />
          </div>
        </div>
      </section>

      {/* ── EXCEPTIONAL COCKTAIL EXPERIENCE ──────────────────────────────── */}
      <section className="py-[48px] md:py-[60px] lg:py-[80px] overflow-hidden" style={{ background: "hsl(8,60%,4%)" }}>
        <div className="container mx-auto px-6 mb-16">
          <FadeUp><p className="section-label">Artisan Cocktails</p></FadeUp>
          <SlideUp delay={0.05}>
            <h2 className="font-heading text-foreground leading-[0.92]" style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}>
              Exceptional<br /><span className="text-primary italic">Cocktail</span> Experience
            </h2>
          </SlideUp>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 h-auto md:h-[78vh] max-h-[720px]">
          <div className="md:col-span-3 relative overflow-hidden h-[62vw] md:h-full min-h-[300px]">
            <RevealImage src={cocktailAmber} alt="Signature cocktail" className="w-full h-full" brightness={0.88} />
          </div>
          <div className="md:col-span-2 flex flex-col justify-center px-8 md:px-14 py-14 md:py-0" style={{ background: "hsl(8,60%,5%)" }}>
            <FadeUp>
              <span className="font-body text-[9px] tracking-[0.65em] text-primary/40 block mb-9 uppercase">Our Signature</span>
              <h3 className="font-heading text-foreground leading-[0.9] mb-5" style={{ fontSize: "clamp(2.4rem, 3.8vw, 3.5rem)" }}>
                The Tableside<br /><span className="text-primary italic">Old Fashioned</span>
              </h3>
              <p className="text-foreground/35 text-sm leading-relaxed mb-10 max-w-[268px]" style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}>
                Bourbon, smoke, and a little bit of theatre. Built at your table, every time. It's the drink people come back for.
              </p>
              <MagneticElement className="inline-block">
                <Link to="/menus" className="btn-gold-outline text-[10px]">EXPLORE THE MENU</Link>
              </MagneticElement>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── WEEKLY NIGHTS (FIX 3) ────────────────────────────────────────── */}
      <section style={{ background: "hsl(8,60%,4%)", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container mx-auto px-6 py-[48px] md:py-[60px] lg:py-[80px]">
          <FadeUp className="text-center" delay={0}>
            <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: "#C9A84C", textTransform: "uppercase", marginBottom: "16px" }}>
              EVERY WEEK
            </p>
            <h2 style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 44px)", color: "#F5ECD7", marginBottom: "48px" }}>
              The Nights Worth Knowing
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img:         "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80&auto=format&fit=crop",
                label:       "EVERY DAY WE'RE OPEN",
                heading:     "Happy Hour",
                time:        "4:00 PM – 6:00 PM",
                desc:        "20% off cocktails. 15% off wine. The best hour of the day.",
                cta:         "Reserve a Table",
                highlighted: true,
              },
              {
                img:     "/events/flamenco.png",
                label:   "EVERY FRIDAY",
                heading: "Flamenco Friday",
                time:    "From 8:00 PM",
                desc:    "Live flamenco. The kind of Friday that makes the week worth it.",
                cta:     "Reserve a Table",
              },
              {
                img:     "/events/violin.png",
                label:   "EVERY SATURDAY",
                heading: "Violin Saturdays",
                time:    "From 8:00 PM",
                desc:    "Live violin. Good cocktails. The perfect Saturday.",
                cta:     "Reserve a Table",
              },
            ].map((card, i) => (
              <FadeUp key={card.heading} delay={i * 0.1}>
                <NightCard {...card} onBook={openWidget} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE THE TRANSFORMATION ────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "hsl(8,60%,2%)" }}>
        <div className="relative overflow-hidden h-[80vw] md:h-[80vh] max-h-[800px]">
          <motion.div className="absolute inset-0 scale-[1.18]"
            initial={{ y: "6%" }} whileInView={{ y: "0%" }} viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <img src={barPanoramic} alt="Bar Maaya interior" className="w-full h-full object-cover" style={{ filter: "brightness(0.38) saturate(0.85)" }} />
          </motion.div>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 28%, hsl(8,60%,2%) 88%), linear-gradient(to bottom, hsl(8,60%,2%) 0%, transparent 18%, transparent 72%, hsl(8,60%,2%) 100%)" }} />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center max-w-3xl">
              <FadeUp><p className="font-body text-[10px] tracking-[0.55em] text-primary/45 uppercase mb-8">The Maaya Effect</p></FadeUp>
              <SlideUp delay={0.08}>
                <h2 className="font-heading text-foreground leading-[1.0]" style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}>
                  Experience the<br /><span className="text-primary italic">Transformation</span>
                </h2>
              </SlideUp>
              <FadeUp delay={0.25}>
                <p className="text-foreground/35 text-sm md:text-base leading-[1.85] mt-8 max-w-[460px] mx-auto" style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}>
                  You arrive as yourself. You leave changed. Every detail — the light, the smoke, the taste — is designed to transport you beyond the ordinary.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <div className="flex items-center justify-center gap-8 mt-12">
                  <MagneticElement>
                    <a href={OPENTABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-gold-outline text-[10px]">RESERVE YOUR TABLE</a>
                  </MagneticElement>
                  <Link to="/story" className="font-body text-[10px] tracking-[0.38em] text-foreground/30 hover:text-primary transition-colors duration-300 link-draw">OUR STORY</Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP ──────────────────────────────── */}
        <div className="border-t border-primary/8 py-[48px] md:py-[60px] lg:py-[80px]" style={{ background: "hsl(8,60%,3%)" }}>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[80px]">
              {[
                { number: "5,000+", label: "GUESTS SERVED" },
                { number: "50+",    label: "COCKTAILS ON MENU" },
                { number: "200+",   label: "CAPACITY" },
              ].map((stat, i) => (
                <motion.div key={stat.label} className="text-center"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}>
                  <p style={{ fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif", fontSize: "72px", color: "#C9A84C", lineHeight: 1, marginBottom: "12px" }}>
                    {stat.number}
                  </p>
                  <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: "rgba(245,236,215,0.28)", textTransform: "uppercase" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY MAAYA (FIX 6) ────────────────────────────────────────────── */}
      <section className="py-[48px] md:py-[60px] lg:py-[80px]" style={{ background: "hsl(8,60%,4%)" }}>
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeUp>
            <p className="font-body text-[10px] tracking-[0.55em] text-primary/45 uppercase mb-6">The Experience</p>
            <h2 className="font-heading text-foreground leading-tight mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Why Start Your Night at Our<br />
              <span className="text-primary italic">Toronto Cocktail Bar</span>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {[
              {
                num:     "01",
                heading: "Craft Cocktails",
                text:    "Immersive cocktails that blend Eastern flavours with Western mixology, from the iconic Saffron Spice to smoky, theatrical signatures.",
              },
              {
                num:     "02",
                heading: "Eastern Bites",
                text:    "Shareable tapas and bar bites designed for pre-show hangs, date nights and late-night cravings in the Entertainment District.",
              },
              {
                num:     "03",
                heading: "The Experience",
                text:    "Live music, themed nights and happy hour deals that turn \"just drinks\" into a full experience.",
              },
            ].map((item, i) => (
              <FadeUp key={item.num} delay={i * 0.12}>
                <div style={{ borderTop: "1px solid rgba(201,168,76,0.25)", paddingTop: "32px" }}>
                  <span className="font-body text-[10px] tracking-[0.45em] text-primary/40 block mb-4">{item.num}</span>
                  <h3 style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", fontSize: "20px", color: "#F5ECD7", marginBottom: "12px" }}>{item.heading}</h3>
                  <p className="font-body text-foreground/45 text-[15px] leading-[1.85]">{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCOVER OUR SIGNATURE COCKTAILS ─────────────────────────────── */}
      <ParallaxBg src={cocktailAmber} brightness={0.45} className="relative">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,4,0.55) 0%, rgba(10,8,4,0.35) 50%, rgba(10,8,4,0.72) 100%)" }} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-[48px] md:py-[60px] lg:py-[80px]">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.3em", color: "#C9A84C", textTransform: "uppercase", marginBottom: "24px" }}>
            THE BAR
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
            style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", color: "#F5ECD7", lineHeight: 1.08, marginBottom: "20px", maxWidth: "700px" }}>
            Discover Our<br />Signature Cocktails
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.22 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "rgba(245,236,215,0.6)", marginBottom: "44px", maxWidth: "440px", lineHeight: 1.75 }}>
            Every glass tells a story. Eastern ritual expressed through the art of the modern cocktail.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.32 }}>
            <Link to="/menus" className="group inline-flex items-center gap-2 btn-gold-outline text-[11px]">
              EXPLORE THE MENU{" "}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </ParallaxBg>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-[48px] md:py-[60px] lg:py-[80px]" style={{ background: "#0A0804", overflow: "hidden" }}>
        <div className="container mx-auto px-6" style={{ marginBottom: "56px", textAlign: "center" }}>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", color: "#C9A84C", textTransform: "uppercase", marginBottom: "16px" }}>
            WHAT PEOPLE ARE SAYING
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F5ECD7", marginBottom: "12px" }}>
            Don't take our word for it.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "#8C7A5E" }}>
            Real people. Real nights at Bar Maaya, Toronto.
          </motion.p>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div className="marquee-track">
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <ReviewCard key={i} quote={r.quote} name={r.name} />
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <span
            style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "12px", letterSpacing: "0.18em", color: "rgba(201,168,76,0.6)", cursor: "pointer", transition: "color 0.3s" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#C9A84C")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.6)")}
          >
            Read more reviews on Google →
          </span>
        </div>
      </section>

      {/* ── IMAGE AUTO SLIDER ─────────────────────────────────────────────── */}
      <ImageAutoSlider images={SLIDER_IMAGES} speed={48} rowHeight={210} />

      {/* ── VISIT MAAYA TODAY ─────────────────────────────────────────────── */}
      <ParallaxBg src={parallaxBg} brightness={0.2} className="py-[48px] md:py-[60px] lg:py-[80px]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <FadeUp><p className="font-body text-[10px] tracking-[0.55em] text-primary/50 uppercase mb-8">THE NEXT STEP</p></FadeUp>
              <SlideUp delay={0.06}>
                <h2 className="font-heading text-foreground leading-[0.92] mb-10" style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}>
                  Your table<br /><span className="text-primary italic">is waiting.</span>
                </h2>
              </SlideUp>
              <FadeUp delay={0.2}>
                <p className="text-foreground/38 text-sm leading-[1.85] mb-12 max-w-[340px]" style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}>
                  Reserve tonight at one of Toronto's favourite cocktail bars. Reservations recommended, walk-ins welcome.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticElement className="inline-block">
                    <a href={OPENTABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-gold-outline">RESERVE NOW</a>
                  </MagneticElement>
                  <MagneticElement className="inline-block">
                    <Link to="/menus" className="btn-dark-filled">VIEW THE MENU</Link>
                  </MagneticElement>
                </div>
              </FadeUp>
            </div>
            <div className="space-y-8">
              {[
                { icon: MapPin, label: "Location", value: "244 Adelaide St West", sub: "Entertainment District, Toronto, ON" },
                { icon: Clock,  label: "Hours",    value: "Tue – Thu & Sun: 4 PM – 12 AM", sub: "Fri – Sat: 4 PM – 2 AM · Mon: Closed" },
              ].map((item, i) => (
                <FadeUp key={i} delay={0.15 + i * 0.12}>
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-primary/20" style={{ background: "rgba(201,168,76,0.06)" }}>
                      <item.icon size={14} className="text-primary/60" />
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-[0.45em] text-primary/40 uppercase mb-1">{item.label}</p>
                      <p className="font-heading text-foreground/75 text-lg leading-tight">{item.value}</p>
                      <p className="text-foreground/28 text-[12px] mt-0.5" style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}>{item.sub}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
              <FadeUp delay={0.38}>
                <div className="flex gap-3 pt-4">
                  {[{ label: "Gallery", href: "/gallery" }, { label: "Events", href: "/events" }, { label: "Our Story", href: "/story" }].map(link => (
                    <Link key={link.label} to={link.href} className="flex items-center gap-1.5 font-body text-[9.5px] tracking-[0.38em] text-foreground/28 hover:text-primary transition-colors duration-300 uppercase">
                      {link.label} <ArrowRight size={9} />
                    </Link>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </ParallaxBg>

      {/* ── INSTAGRAM FEED ───────────────────────────────────────────────── */}
      <section className="py-[48px] md:py-[60px] lg:py-[80px]" style={{ background: "hsl(8,60%,4%)" }}>
        <div className="container mx-auto px-6 mb-12">
          <FadeUp>
            <div className="flex items-end justify-between">
              <div>
                <p className="section-label">@bar.maaya</p>
                <h2 className="font-heading text-4xl md:text-5xl text-foreground">Follow The Story</h2>
              </div>
              <a href="https://www.instagram.com/bar.maaya/" target="_blank" rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 font-body text-[10px] tracking-[0.38em] text-foreground/30 hover:text-primary transition-colors link-draw">
                INSTAGRAM
              </a>
            </div>
          </FadeUp>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px">
          {INSTAGRAM_GRID.map((item, i) => (
            <motion.a key={i} href="https://www.instagram.com/bar.maaya/" target="_blank" rel="noopener noreferrer"
              className="relative overflow-hidden group block" style={{ aspectRatio: "1/1" }}
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}>
              <img src={item.src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter: "brightness(0.58) saturate(0.82)" }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3">
                <p className="text-white/0 group-hover:text-white/80 transition-all duration-300 text-[10px] leading-snug translate-y-2 group-hover:translate-y-0" style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}>
                  {item.caption}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
          <motion.a href="https://www.instagram.com/bar.maaya/" target="_blank" rel="noopener noreferrer"
            className="relative overflow-hidden group flex items-center justify-center"
            style={{ aspectRatio: "1/1", background: "hsl(8,60%,6%)", border: "1px solid rgba(201,168,76,0.12)" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}>
            <div className="text-center p-4">
              <p className="font-heading text-primary/60 group-hover:text-primary transition-colors text-xl mb-2">@bar.maaya</p>
              <p className="font-body text-[9px] tracking-[0.45em] text-foreground/30 uppercase">Follow Us</p>
              <div className="mt-4 flex justify-center">
                <ArrowRight size={14} className="text-primary/40 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </motion.a>
        </div>
      </section>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const Index = () => {
  return (
    <>
      <SEOHead
        title="Cocktail Bar Toronto | Bar Maaya — Entertainment District"
        description="Bar Maaya is a cocktail bar in Toronto's Entertainment District. Craft cocktails, live music, Sip & Paint events, and happy hour daily 4–6 PM. 244 Adelaide St West."
        canonical="/"
      />
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/hero-video.mp4"
        posterSrc={barAtmosphere}
        bgImageSrc={parallaxBg}
        title="Where Illusion Meets Every Pour"
        splitAt={3}
        date="BAR MAAYA · TORONTO"
        scrollToExpand="Scroll to enter"
        textBlend={true}
      >
        <HomepageContent />
      </ScrollExpandMedia>
    </>
  );
};

export default Index;
