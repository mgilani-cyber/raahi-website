import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESERVATION_URL = "https://reservations.shift4payments.com/#/28a60320-b36c-4294-9eb4-0bc1b1d8e019";

const CATEGORIES = [
  {
    id: "starters",
    label: "Starters",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1600&auto=format&fit=crop&q=85",
    tagline: "Begin the journey",
    items: [
      { name: "Aloo Tikki Chaat", desc: "Crispy potato patties, chickpea curry, tamarind, mint, cool yogurt", price: "$12" },
      { name: "Samosa Chaat", desc: "Flaky pastry, spiced potato, date-tamarind, crisp sev", price: "$11" },
      { name: "Chicken Lollipop", desc: "Frenched wings, deep aromatic marinade, crisp-fried, mint chutney", price: "$16" },
      { name: "Seekh Kebab", desc: "Minced lamb, brown onion, green chili, charred in the tandoor", price: "$18" },
      { name: "Gol Gappe", desc: "Crisp semolina shells, spiced potato, tamarind water, pomegranate", price: "$10" },
      { name: "Dahi Bhalla", desc: "Lentil dumplings, cool yogurt, sweet tamarind, roasted cumin", price: "$11" },
    ],
  },
  {
    id: "tandoor",
    label: "Tandoor",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=1600&auto=format&fit=crop&q=85",
    tagline: "From the clay oven",
    items: [
      { name: "Tandoori Chicken", desc: "Half chicken, overnight marinade, clay oven fired, mint raita", price: "$24" },
      { name: "Lamb Chops", desc: "Rack of lamb, aromatic spice rub, charred, pickled onion", price: "$36" },
      { name: "Murg Malai Tikka", desc: "Chicken breast, cream cheese, ginger, cardamom, saffron", price: "$22" },
      { name: "Tandoori Salmon", desc: "Atlantic salmon, carom seed crust, dill raita", price: "$28" },
      { name: "Paneer Tikka", desc: "House-made paneer, bell pepper, onion, smoky tandoor char", price: "$18" },
      { name: "Shrimp Tandoori", desc: "Gulf shrimp, Kashmiri chili marinade, lemon butter", price: "$26" },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=1600&auto=format&fit=crop&q=85",
    tagline: "Slow-cooked, deeply spiced",
    items: [
      { name: "Butter Chicken", desc: "Free-range chicken, slow-simmered tomato cream, smoked fenugreek", price: "$22" },
      { name: "Sarson Da Saag", desc: "Slow-braised mustard greens, white butter, makki ki roti", price: "$19" },
      { name: "Lamb Vindaloo", desc: "Bone-in lamb, Goan spice paste, tamarind, slow-braised", price: "$26" },
      { name: "Paneer Tikka Masala", desc: "House-made cottage cheese, rich tomato-cashew gravy", price: "$20" },
      { name: "Dal Makhani", desc: "Black lentils, slow-cooked overnight, cream, smoked butter", price: "$18" },
      { name: "Rogan Josh", desc: "Bone-in lamb, Kashmiri chili, whole spices, saffron", price: "$26" },
    ],
  },
  {
    id: "biryani",
    label: "Biryani",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1600&auto=format&fit=crop&q=85",
    tagline: "Sealed, steamed, opened tableside",
    items: [
      { name: "Chicken Biryani", desc: "Aged basmati, saffron-scented, dum-sealed, raita, mirchi salan", price: "$22" },
      { name: "Lamb Biryani", desc: "Slow-cooked tender lamb, caramelised onion crown", price: "$26" },
      { name: "Goat Biryani", desc: "Bone-in goat, whole spices, rose water, sealed and steamed", price: "$28" },
      { name: "Shrimp Biryani", desc: "Gulf shrimp, coastal spice blend, curry leaf temper", price: "$28" },
      { name: "Veg Dum Biryani", desc: "Seasonal vegetables, saffron milk, whole spices", price: "$18" },
      { name: "Gongura Biryani", desc: "Sorrel leaf, tangy spice blend, slow dum, caramelised shallots", price: "$24" },
    ],
  },
  {
    id: "street",
    label: "Street Eats",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1600&auto=format&fit=crop&q=85",
    tagline: "Houston meets the streets of India",
    items: [
      { name: "Pav Bhaji", desc: "Spiced vegetable mash, buttered pav, red onion, coriander", price: "$14" },
      { name: "Masala Dosa", desc: "Crisp rice crepe, spiced potato, coconut chutney, sambar", price: "$16" },
      { name: "Bhel Puri", desc: "Puffed rice, tamarind, green chutney, tomato, sev", price: "$10" },
      { name: "Vada Pav", desc: "Spiced potato fritter, garlic chutney, buttered bun", price: "$10" },
      { name: "Papdi Chaat", desc: "Crisp wafers, yogurt, tamarind, pomegranate, mint foam", price: "$12" },
      { name: "Kathi Roll", desc: "Flaky paratha, spiced chicken or paneer, pickled onion, chutney", price: "$14" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=1600&auto=format&fit=crop&q=85",
    tagline: "Sweet endings",
    items: [
      { name: "Gulab Jamun", desc: "Milk-solid dumplings, rose water syrup, pistachio", price: "$8" },
      { name: "Rasmalai", desc: "Soft cheese patties, saffron milk, cardamom, almonds", price: "$9" },
      { name: "Kheer", desc: "Slow-cooked rice pudding, rosewater, cashew, cardamom", price: "$8" },
      { name: "Malpua", desc: "Fried pancake, sugar syrup, rabri cream, pistachio dust", price: "$10" },
      { name: "Kulfi", desc: "Dense frozen cream, pistachio, cardamom, falooda", price: "$9" },
      { name: "Gajar Halwa", desc: "Slow-cooked carrot, ghee, cardamom, khoya, cashew", price: "$9" },
    ],
  },
];

export function RaahiMenuFX() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPrevIndex(activeIndex);
            setActiveIndex(i);
          }
        },
        { threshold: 0.4, rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(ref);
      observers.push(obs);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const active = CATEGORIES[activeIndex];

  return (
    <div style={{ background: "#0a1f15", position: "relative" }}>

      {/* STICKY BACKGROUND IMAGE — changes per category */}
      <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 0, overflow: "hidden", marginBottom: "-100vh" }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={active.image}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "absolute", inset: 0 }}
          >
            <img
              src={active.image}
              alt={active.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) saturate(0.7)" }}
            />
          </motion.div>
        </AnimatePresence>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,31,21,0.92) 40%, rgba(10,31,21,0.3) 100%)" }} />

        {/* STICKY LEFT PANEL — category name + items */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 8vw", zIndex: 2 }}>
          <div style={{ maxWidth: "520px", width: "100%" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", letterSpacing: "0.5em", color: "#a34d26", textTransform: "uppercase", marginBottom: "12px" }}>
                  {active.tagline}
                </p>
                <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", fontSize: "clamp(3rem,6vw,5.5rem)", color: "#e8e0cc", lineHeight: 0.95, marginBottom: "40px" }}>
                  {active.label}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(163,77,38,0.12)" }}>
                  {active.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      style={{ background: "rgba(10,31,21,0.85)", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}
                    >
                      <div>
                        <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "16px", color: "#e8e0cc", marginBottom: "3px" }}>{item.name}</p>
                        <p style={{ fontFamily: "Jost,sans-serif", fontSize: "11px", color: "rgba(232,224,204,0.4)", lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                      <span style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "17px", color: "#a34d26", flexShrink: 0, paddingTop: "2px" }}>{item.price}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CATEGORY DOTS — right side */}
        <div style={{ position: "fixed", right: "5vw", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "20px", zIndex: 9999 }}>
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => {
                const el = sectionRefs.current[i];
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", flexDirection: "row-reverse" }}
            >
              <div style={{ width: activeIndex === i ? "28px" : "6px", height: "6px", background: activeIndex === i ? "#a34d26" : "rgba(232,224,204,0.25)", borderRadius: "3px", transition: "all 0.4s ease" }} />
              <span style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: activeIndex === i ? "#e8e0cc" : "rgba(232,224,204,0.3)", transition: "color 0.3s", whiteSpace: "nowrap" }}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* SCROLL HINT */}
        <div style={{ position: "absolute", bottom: "40px", left: "8vw", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #a34d26, transparent)" }} />
          <p style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.4em", color: "rgba(232,224,204,0.3)", textTransform: "uppercase" }}>Scroll to explore</p>
        </div>
      </div>

      {/* SCROLL SECTIONS — one per category, triggers intersection observer */}
      <div style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.id}
            ref={el => sectionRefs.current[i] = el}
            style={{ height: "100vh", minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 8vw" }}
          />
        ))}
      </div>

      {/* RESERVE CTA */}
      <div style={{ position: "relative", zIndex: 2, background: "rgba(10,31,21,0.97)", borderTop: "1px solid rgba(163,77,38,0.2)", padding: "60px 8vw", textAlign: "center" }}>
        <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">
          Reserve a Table
        </a>
      </div>
    </div>
  );
}
