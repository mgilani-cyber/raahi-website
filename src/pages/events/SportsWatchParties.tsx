import { useRef } from "react";
import { PageHero } from "@/components/PageHero";

import { motion, useInView } from "framer-motion";

// Unsplash: sports/watch-party images
const SPORTS_HERO = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80"; // sports (#16)
const SPORTS_BODY = "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1600&q=80"; // sports (#15)

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

function MenuItem({ name, price, desc }: { name: string; price: string; desc?: string }) {
  return (
    <motion.div
      className="flex justify-between items-start py-3.5 border-b border-border/20 group hover:border-primary/30 transition-colors duration-300"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex-1 pr-4">
        <h4 className="text-foreground font-body font-medium text-sm group-hover:text-primary transition-colors duration-200">{name}</h4>
        {desc && <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>}
      </div>
      <span className="text-primary font-body font-semibold text-sm shrink-0">{price}</span>
    </motion.div>
  );
}

const SportsWatchParties = () => {
  return (
    <>
      <SEOHead
        title="Sports Watch Parties Toronto | Bar Maaya"
        description="Watch the game in style at Bar Maaya. Reserve a table for sports nights in Toronto's Entertainment District — big screens, great cocktails, and the best vibe in the city."
        canonical="/events/sports-watch-parties"
      />
      <PageHero label="Where The Game Meets The Vibe" heading="Sports Watch Parties" image={SPORTS_HERO} />

      {/* Hero split */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeUp>
              <p className="section-label">The Beautiful Game</p>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Watch It<br />The <span className="text-primary italic">Maaya</span> Way
              </h2>
              <p className="font-body text-foreground/45 leading-[1.85] mb-5 text-sm"
                style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}>
                Premium screens, our exclusive Premier League Food Menu, and an atmosphere unlike anywhere else in the city.
              </p>
              <p className="font-body text-foreground/35 leading-[1.85] mb-8 text-sm"
                style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}>
                Every match day brings $8 cocktails all match long. Your seat, your squad, your round.
              </p>

              {/* $8 highlight */}
              <div className="border border-primary/30 rounded-sm p-6 bg-primary/5 mb-8 text-center">
                <p className="font-heading text-6xl text-primary mb-1">$8</p>
                <p className="text-foreground font-body text-sm tracking-widest uppercase">Cocktails During Every Match</p>
              </div>

              <a href={} target="_blank" rel="noopener noreferrer" className="btn-gold-outline text-xs">
                RESERVE YOUR MATCH DAY TABLE
              </a>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative overflow-hidden rounded-sm h-[380px] md:h-[520px] group">
                <img src={SPORTS_BODY} alt="Match day atmosphere" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                {/* Live badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full">
                  <motion.div className="w-2 h-2 rounded-full bg-red-500"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }} />
                  <span className="text-foreground text-[10px] font-body tracking-widest">MATCH DAY</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Premier League Food Menu */}
      <section className="py-24 md:py-36" style={{ background: "hsl(8,60%,4%)" }}>
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="section-label">Game Day Eats</p>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground leading-tight">
                Premier League<br /><span className="text-primary italic">Food Menu</span>
              </h2>
            </div>
          </FadeUp>
          <div className="max-w-2xl mx-auto">
            <MenuItem name="Truffle Fries"           price="$11" desc="Truffle Oil, Parmesan, Truffle Aioli" />
            <MenuItem name="Mozzarella Sticks"       price="$12" desc="Deep Fried Mozzarella, Marinara Sauce" />
            <MenuItem name="Loaded Nachos"           price="$16" desc="In-house Nachos, Salsa, Cheese Sauce, Pico De Gallo — Chicken +$5, Beef +$6" />
            <MenuItem name="Chicken Fingers"         price="$15" desc="Chicken Tenders, Honey Mustard Mayo" />
            <MenuItem name="Chicken Wings 1lb"       price="$18" desc="Plain, BBQ, Buffalo, Butter Chicken, Lemon Pepper" />
            <MenuItem name="Chicken Tikka Flatbread" price="$23" desc="Chicken Tikka, Tomato Sauce, Cheese — Butter Chicken Sauce +$3" />
            <MenuItem name="Mushroom Flatbread"      price="$21" desc="Wild Mushrooms, Arugula, Parmesan, Truffle Oil" />
            <MenuItem name="Pepperoni Flatbread"     price="$21" desc="Smoked Pepperoni, Tomato Sauce, Cheese" />

            <FadeUp delay={0.1}>
              <div className="mt-10 text-center">
                <a href={} target="_blank" rel="noopener noreferrer" className="btn-gold-outline text-xs">
                  RESERVE YOUR TABLE
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
};

export default SportsWatchParties;
