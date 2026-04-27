import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { RESERVATION_URL } from "@/constants";
import barAtmosphere from "@/assets/bar-atmosphere.jpg";
import barPanoramic  from "@/assets/bar-panoramic.jpg";
import foodDark      from "@/assets/food-dark.jpg";
import tableSet      from "@/assets/table-setting.jpg";
import foodPlating   from "@/assets/food-plating.jpg";
import parallaxBg    from "@/assets/parallax-bg.jpg";

const TEAL  = "#113122";
const RUST  = "#a34d26";
const SAGE  = "#6f8566";
const IVORY = "#e8e0cc";
const DARK  = "#0a1f15";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

function RevealImage({ src, alt = "", className = "", delay = 0 }: { src: string; alt?: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(14% 0% 14% 0%)" }}
      animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <motion.img src={src} alt={alt} className="w-full h-full object-cover"
        style={{ filter: "brightness(0.78) saturate(0.88)" }}
        initial={{ scale: 1.12 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }} />
    </motion.div>
  );
}

// Real Raahi story chapters
const CHAPTERS = [
  {
    num: "01",
    label: "The Name",
    heading: "What Raahi Means",
    body: "Raahi is a Hindi word for traveller — someone on a journey. We chose it because that's what food is, when it's done right. Every dish on our menu carries you somewhere. A mouthful of sarson da saag and you're in Punjab. A bite of Gongura biryani and you're in Andhra Pradesh. That sense of travel, without leaving your seat — that's Raahi.",
    img: foodPlating,
  },
  {
    num: "02",
    label: "The Food",
    heading: "Recipes That Mean Something",
    body: "North Houston has a lot of Indian restaurants. What was missing was one that took the food seriously — not just the tikka masala and naan, but the full breadth of what Indian cooking actually is. Street eats. Dosas. Keema. Gongura. Lamb chops from the clay oven. We cook all of it, and we cook it properly. Fresh every day, nothing from a packet.",
    img: foodDark,
  },
  {
    num: "03",
    label: "Chef Akshay",
    heading: "The Kitchen Behind It All",
    body: "Chef Akshay brings together two things that don't always meet — classical technique and the kind of flavour memory that only comes from growing up with this food. He's been called the reason people drive across Houston to eat with us. The sarson da saag, the Raahi Special, the tandoori salmon — all his. We're lucky to have him.",
    img: barAtmosphere,
  },
  {
    num: "04",
    label: "The Space",
    heading: "A Room Worth Coming Back To",
    body: "When you walk into Raahi, you'll notice the room feels right. Warm light, comfortable booths, music at a volume that lets you actually talk. We put thought into making it a place you'd want to be, not just eat and leave. Whether you're bringing your family for a regular dinner or celebrating something — the room holds both equally well.",
    img: tableSet,
  },
  {
    num: "05",
    label: "North Houston",
    heading: "Your Neighbourhood Indian Kitchen",
    body: "Raahi is on Tomball Pkwy because North Houston deserved its own Indian restaurant worth talking about. Our regulars tell us they used to drive south for good Indian food. They don't anymore. That's the whole point — to be the place this part of the city could call its own.",
    img: barPanoramic,
  },
];

export default function Story() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div style={{ background: TEAL, minHeight: "100vh" }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={barAtmosphere} alt="Raahi Indian Kitchen Houston" className="w-full h-full object-cover"
            style={{ filter: "brightness(0.22) saturate(0.65)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(17,49,34,0.5), rgba(17,49,34,0.75))" }} />
        </motion.div>
        <div className="relative z-10 text-center px-6" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.55em", color: RUST, textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Our Story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", fontSize: "clamp(3rem, 8vw, 6rem)", color: IVORY, lineHeight: 0.95, marginBottom: "1.5rem" }}>
            One Thousand Flavors<br />in One Place
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 56 }} transition={{ delay: 0.7, duration: 0.55 }}
            style={{ height: "1px", background: RUST, margin: "0 auto 1.5rem" }} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", color: "rgba(232,224,204,0.45)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.9 }}>
            An authentic Indian restaurant in North Houston — where every dish tells a story, and every visit feels like coming home.
          </motion.p>
        </div>
      </div>

      {/* Chapters */}
      <div style={{ background: TEAL }}>
        {CHAPTERS.map((ch, i) => (
          <div key={ch.num} style={{ borderTop: "1px solid rgba(163,77,38,0.12)" }}>
            <div className="container mx-auto px-6 py-[64px] md:py-[96px]">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>

                {/* Text */}
                <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                  <FadeUp>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: RUST, textTransform: "uppercase", marginBottom: "6px" }}>
                      {ch.num} — {ch.label}
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.06}>
                    <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: IVORY, lineHeight: 1.05, marginBottom: "1.5rem" }}>
                      {ch.heading}
                    </h2>
                  </FadeUp>
                  <FadeUp delay={0.12}>
                    <div style={{ width: "36px", height: "1px", background: RUST, marginBottom: "1.5rem" }} />
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", color: "rgba(232,224,204,0.52)", lineHeight: 1.95, maxWidth: "500px" }}>
                      {ch.body}
                    </p>
                  </FadeUp>
                </div>

                {/* Image */}
                <div className={i % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <RevealImage src={ch.img} alt={ch.heading} className="h-[320px] md:h-[420px]" delay={0.1} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: DARK, borderTop: "1px solid rgba(163,77,38,0.15)", padding: "80px 0" }}>
        <div className="container mx-auto px-6 text-center">
          <FadeUp>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.45em", color: RUST, textTransform: "uppercase", marginBottom: "1rem" }}>
              Come Experience It
            </p>
            <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: IVORY, marginBottom: "1rem" }}>
              The story is better<br />tasted than told.
            </h2>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "rgba(232,224,204,0.4)", maxWidth: "380px", margin: "0 auto 2rem", lineHeight: 1.85 }}>
              17695 Tomball Pkwy, Houston TX 77064.<br />Open 7 days. Tuesday from 5 PM, all other days from 11 AM.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">
                Reserve a Table
              </a>
              <Link to="/menus" className="btn-dark-filled">
                See the Menu
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
