import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";
import { SEOHead } from "@/components/SEOHead";
import { MagneticElement } from "@/components/MagneticElement";
import { useReservation } from "@/contexts/ReservationContext";
import { Link } from "react-router-dom";
import barAtmosphere from "@/assets/bar-atmosphere.jpg";
// Client photos from public/sTORY/
const IMG_BANNER = "/sTORY/STORY-BANNER.jpg";
const IMG_CH01   = "/sTORY/cocktail-amber-coupe.png";
const IMG_CH02   = "/sTORY/VISION.jpg";
const IMG_CH03   = "/sTORY/cocktail-golden-glow.png";
const IMG_CH04   = "/sTORY/THE SPACE.JPG";
const IMG_CH05   = "/sTORY/tapas-marble-spread.png";
const IMG_LEFT   = "/sTORY/LEFT.png";
const IMG_RIGHT  = "/sTORY/111.jpg";

const CHAPTERS = [
  {
    num: "01", label: "The Name",
    heading: "Why \"Maaya\"",
    body: "Maaya is a Sanskrit word for illusion. We chose it because that's what a genuinely good night out feels like — you come in for one drink, and two hours later you're still there wondering where the time went. That's not an accident. That's the whole point.",
    image: IMG_CH01,
    objectPosition: "center 35%",
  },
  {
    num: "02", label: "The Vision",
    heading: "Why We Exist",
    body: "Toronto has no shortage of bars. What it was missing was somewhere that actually had a point of view. We grew up between two worlds — Eastern and Western — and Maaya is what happens when you stop trying to pick one. Everything on the menu belongs here, and it shows.",
    image: IMG_CH02,
    objectPosition: "center center",
  },
  {
    num: "03", label: "The Craft",
    heading: "Every Sip Intentional",
    body: "Some of these recipes took months to get right. We use things you don't usually find in cocktails — saffron, cardamom, tamarind, smoked salt — not because it sounds interesting on a menu, but because when it works, it really works. Every drink has been through enough rounds of testing that we can tell you exactly why it tastes the way it does.",
    image: IMG_CH03,
    objectPosition: "center 40%",
  },
  {
    num: "04", label: "The Space",
    heading: "A Room That Holds the Night",
    body: "The room was designed to make you lose track of time. Low light, deep booths, music that's loud enough to feel something but quiet enough to still have a real conversation. We put a lot of thought into making it feel like we didn't — that kind of effortless takes work.",
    image: IMG_CH04,
    objectPosition: "center 30%",
  },
  {
    num: "05", label: "The Night",
    heading: "What Your Evening Becomes",
    body: "Most people who come here don't plan to stay as long as they do — that's something we hear a lot. A work dinner runs long, a first date turns into a proper night, someone comes in alone and ends up at the bar talking to strangers for hours. We can't explain it, but we're glad it keeps happening.",
    image: IMG_CH05,
    objectPosition: "center center",
  },
];

function Chapter({ chapter, index }: { chapter: typeof CHAPTERS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <div ref={ref} className="py-20 border-b border-border/10 last:border-0 relative">
      {/* Chapter number watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-foreground/[0.025]" style={{ fontSize: "clamp(160px, 30vw, 360px)" }}>
          {chapter.num}
        </span>
      </div>
      <div className={`container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10`}>
        {/* Image */}
        <div className={`flex flex-col ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <motion.div
            className="relative overflow-hidden h-[340px] md:h-[520px]"
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.img
              src={chapter.image}
              alt={chapter.heading}
              className="w-full h-[120%] object-cover -top-[10%] absolute"
              loading="lazy"
              style={{ y: imgY, filter: "brightness(0.7) saturate(0.9)", objectPosition: chapter.objectPosition ?? "center center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </motion.div>
          <div className="mt-3 px-1">
            <span className="font-body text-[9px] tracking-[0.5em] text-primary/50">
              {chapter.label}
            </span>
          </div>
        </div>

        {/* Text */}
        <motion.div
          className={isEven ? "lg:order-2" : "lg:order-1"}
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-primary/25 text-5xl leading-none">{chapter.num}</span>
            <div className="h-px flex-1 bg-border/30" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            {chapter.heading}
          </h2>
          <p className="font-body text-foreground/50 leading-relaxed text-sm md:text-base">
            {chapter.body}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const Story = () => {
  const { openWidget } = useReservation();
  return (
    <>
      <SEOHead
        title="The Story Behind Bar Maaya Toronto"
        description="Discover the story of Bar Maaya, Toronto's illusion-inspired cocktail bar where Eastern flavours meet Western creativity. Learn how we turn every sip into a little bit of magic."
        canonical="/story"
      />
      {/* HERO */}
      <div className="relative overflow-hidden -mt-20 flex items-center justify-center text-center" style={{ minHeight: "60vh", background: "hsl(8,60%,3%)" }}>
        <img
          src={IMG_BANNER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,8,4,0.65)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative z-10 px-6 py-20">
          <motion.p
            className="mb-5"
            style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "11px", letterSpacing: "0.3em", color: "#C9A84C", textTransform: "uppercase" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            OUR STORY
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              style={{ fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif", fontStyle: "italic", fontSize: "clamp(34px, 6vw, 56px)", color: "#F5ECD7", lineHeight: 1.1 }}
              initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
              The Essence of <span style={{ color: "#C9A84C" }}>Maaya</span>
            </motion.h1>
          </div>
          <motion.p
            style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", color: "rgba(245,236,215,0.6)", fontSize: "16px", marginTop: "20px" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Maaya — illusion in Sanskrit. A word that shapes everything we do.
          </motion.p>
        </div>
      </div>

      {/* ABOUT INTRO ─ three paragraphs for SEO + GEO */}
      <section className="py-20" style={{ background: "hsl(8,60%,3%)" }}>
        <div className="container mx-auto px-6 max-w-3xl space-y-6">
          {[
            `Maaya is a Sanskrit word for illusion. Not the trick kind — the kind where you're so present in a moment that everything else falls away. We built this bar around that feeling, in a room on Adelaide Street where the nights tend to run longer than planned.`,
            `The cocktails are where East meets West on this menu. Cardamom, saffron and tamarind sitting next to the classics — not as a gimmick, but because that's genuinely how we think about flavour. A lot of our regulars came in once on a whim and haven't really stopped coming back.`,
            `We're a few minutes from some of Toronto's best theatres, which means we see a lot of different kinds of nights. Pre-show nerves, post-show highs, late-night decisions. Whatever brings you in — the bar's the same and the welcome's the same.`,
          ].map((para, i) => (
            <motion.p
              key={i}
              className="font-body text-foreground/45 text-[15px] leading-[1.9]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </section>

      {/* CHAPTERS */}
      <div className="bg-background">
        {CHAPTERS.map((chapter, i) => (
          <Chapter key={chapter.num} chapter={chapter} index={i} />
        ))}
      </div>

      {/* DUAL IMAGE — drag-to-compare */}
      <div style={{ background: "hsl(8,60%,3%)" }}>
        <ImageComparison
          className="w-full"
          style={{ height: "clamp(300px, 45vw, 560px)" }}
        >
          <ImageComparisonImage
            src={IMG_LEFT}
            alt="Bar Maaya kitchen craft"
            position="left"
          />
          <ImageComparisonImage
            src={IMG_RIGHT}
            alt="Bar Maaya signature cocktail"
            position="right"
          />
          <ImageComparisonSlider className="bg-white/20 backdrop-blur-sm">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm"
              style={{ width: "44px", height: "44px" }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M4 1L1 5L4 9" stroke="rgba(201,168,76,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M6 1L9 5L6 9" stroke="rgba(201,168,76,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </ImageComparisonSlider>
        </ImageComparison>
      </div>

      {/* FINAL CTA */}
      <section className="py-20 text-center relative overflow-hidden" style={{ background: "hsl(8,60%,4%)" }}>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url(${barAtmosphere})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-script italic text-primary text-2xl mb-4">"Look beyond the veil."</p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4">Now You Know Our Story</h2>
            <p className="font-body text-foreground/40 text-sm mb-10 leading-relaxed">
              Come experience it for yourself. Toronto's most immersive bar, 244 Adelaide St West.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticElement>
                <button onClick={openWidget} className="btn-gold-outline text-[11px] inline-block">
                  RESERVE YOUR TABLE
                </button>
              </MagneticElement>
              <MagneticElement>
                <Link to="/menus" className="btn-dark-filled text-[11px] inline-block">VIEW MENUS</Link>
              </MagneticElement>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Story;
