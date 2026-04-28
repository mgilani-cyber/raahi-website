
import React, { useState } from "react";
import { FullScreenScrollFX } from "./full-screen-scroll-fx";

const RESERVATION_URL = "https://reservations.shift4payments.com/#/28a60320-b36c-4294-9eb4-0bc1b1d8e019";

const MENU_DATA = [
  {
    id: "starters",
    category: "Starters",
    background: "https://raahiindiankitchen.com/wp-content/uploads/2024/08/raahi-appetizer-scaled.jpg",
    items: [
      { name: "Aloo Tikki Chaat", desc: "Crispy potato patties, chickpea curry, tamarind, mint, cool yogurt", price: "$12" },
      { name: "Samosa Chaat", desc: "Flaky pastry, spiced potato, date-tamarind, crisp sev", price: "$11" },
      { name: "Chicken Lollipop", desc: "Frenched wings, aromatic marinade, crisp-fried, mint chutney", price: "$16" },
      { name: "Seekh Kebab", desc: "Minced lamb, brown onion, green chili, charred in tandoor", price: "$18" },
      { name: "Gol Gappe", desc: "Crisp semolina shells, spiced potato, tamarind water, pomegranate", price: "$10" },
    ],
  },
  {
    id: "mains",
    category: "Mains",
    background: "https://raahiindiankitchen.com/wp-content/uploads/2024/08/raahi-maincourse-scaled.jpg",
    items: [
      { name: "Butter Chicken", desc: "Free-range chicken, slow-simmered tomato cream, smoked fenugreek", price: "$22" },
      { name: "Sarson Da Saag", desc: "Slow-braised mustard greens, white butter, makki ki roti", price: "$19" },
      { name: "Lamb Vindaloo", desc: "Bone-in lamb, Goan spice paste, tamarind, slow-braised", price: "$26" },
      { name: "Paneer Tikka Masala", desc: "House-made cottage cheese, rich tomato-cashew gravy", price: "$20" },
      { name: "Dal Makhani", desc: "Black lentils, slow-cooked overnight, cream, smoked butter", price: "$18" },
    ],
  },
  {
    id: "tandoor",
    category: "Tandoor",
    background: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=1200&auto=format&fit=crop&q=80",
    items: [
      { name: "Tandoori Chicken", desc: "Half chicken, overnight marinade, clay oven, mint raita", price: "$24" },
      { name: "Lamb Chops", desc: "Rack of lamb, aromatic spice rub, charred, pickled onion", price: "$36" },
      { name: "Murg Malai Tikka", desc: "Chicken breast, cream cheese, ginger, cardamom, saffron", price: "$22" },
      { name: "Tandoori Salmon", desc: "Atlantic salmon, carom seed crust, dill raita", price: "$28" },
      { name: "Paneer Tikka", desc: "House-made paneer, bell pepper, onion, smoky tandoor char", price: "$18" },
    ],
  },
  {
    id: "biryani",
    category: "Biryani",
    background: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&auto=format&fit=crop&q=80",
    items: [
      { name: "Chicken Biryani", desc: "Aged basmati, saffron, dum-sealed, raita, mirchi salan", price: "$22" },
      { name: "Lamb Biryani", desc: "Slow-cooked tender lamb, caramelised onion crown", price: "$26" },
      { name: "Goat Biryani", desc: "Bone-in goat, whole spices, rose water, sealed and steamed", price: "$28" },
      { name: "Shrimp Biryani", desc: "Gulf shrimp, coastal spice blend, curry leaf temper", price: "$28" },
      { name: "Veg Dum Biryani", desc: "Seasonal vegetables, saffron milk, whole spices", price: "$18" },
    ],
  },
  {
    id: "street",
    category: "Street Eats",
    background: "https://raahiindiankitchen.com/wp-content/uploads/2025/02/IMG_7918-1024x768.jpeg",
    items: [
      { name: "Pav Bhaji", desc: "Spiced vegetable mash, buttered pav, red onion, coriander", price: "$14" },
      { name: "Dahi Bhalla", desc: "Lentil dumplings, cool yogurt, sweet tamarind, cumin", price: "$12" },
      { name: "Masala Dosa", desc: "Crisp rice crepe, spiced potato, coconut chutney, sambar", price: "$16" },
      { name: "Bhel Puri", desc: "Puffed rice, tamarind, green chutney, tomato, sev", price: "$10" },
      { name: "Vada Pav", desc: "Spiced potato fritter, garlic chutney, buttered bun", price: "$10" },
    ],
  },
  {
    id: "desserts",
    category: "Desserts",
    background: "https://raahiindiankitchen.com/wp-content/uploads/2025/02/IMG_7922-1024x768.jpeg",
    items: [
      { name: "Gulab Jamun", desc: "Milk-solid dumplings, rose water syrup, pistachio", price: "$8" },
      { name: "Rasmalai", desc: "Soft cheese patties, saffron milk, cardamom, almonds", price: "$9" },
      { name: "Kheer", desc: "Slow-cooked rice pudding, rosewater, cashew, cardamom", price: "$8" },
      { name: "Malpua", desc: "Fried pancake, sugar syrup, rabri cream, pistachio dust", price: "$10" },
      { name: "Kulfi", desc: "Dense frozen cream, pistachio, cardamom, falooda", price: "$9" },
    ],
  },
];

export function RaahiMenuFX() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const currentCat = MENU_DATA.find(c => c.id === openCategory);

  const sections = MENU_DATA.map((cat) => ({
    id: cat.id,
    background: cat.background,
    leftLabel: (
      <span style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(0.75rem,1.6vw,1.1rem)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>
        {cat.category}
      </span>
    ),
    title: cat.category,
    rightLabel: (
      <span style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(0.7rem,1.4vw,1rem)", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(232,224,204,0.45)" }}>
        {cat.items.length} dishes
      </span>
    ),
  }));

  return (
    <div style={{ background: "#0a1f15" }}>
      <div style={{ textAlign: "center", padding: "80px 24px 0" }}>
        <p style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", letterSpacing: "0.45em", color: "#a34d26", textTransform: "uppercase", marginBottom: "12px" }}>
          Our Menu
        </p>
        <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", fontSize: "clamp(2rem,5vw,4rem)", color: "#e8e0cc", marginBottom: "12px" }}>
          Scroll to explore. Click to discover.
        </h2>
        <p style={{ fontFamily: "Jost,sans-serif", fontSize: "13px", color: "rgba(232,224,204,0.35)", maxWidth: "400px", margin: "0 auto" }}>
          Scroll through each category — click any section to reveal the full dish list.
        </p>
      </div>

      <FullScreenScrollFX
        sections={sections}
        showProgress
        bgTransition="fade"
        durations={{ change: 0.7, snap: 800 }}
        onIndexChange={(i) => {
          // auto-open category on scroll
          setOpenCategory(MENU_DATA[i].id);
        }}
        footer={
          <div style={{ paddingBottom: "8px" }}>
            {MENU_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
                style={{
                  fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.3em",
                  textTransform: "uppercase", color: openCategory === cat.id ? "#a34d26" : "rgba(232,224,204,0.3)",
                  background: "none", border: "none", cursor: "pointer", margin: "0 10px",
                  transition: "color 0.3s",
                }}
              >
                {cat.category}
              </button>
            ))}
          </div>
        }
      />

      <div style={{
        background: "#071510",
        maxHeight: openCategory ? "900px" : "0",
        overflow: "hidden",
        transition: "max-height 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
        borderTop: openCategory ? "1px solid rgba(163,77,38,0.18)" : "none",
      }}>
        {currentCat && (
          <div style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 32px 80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "44px" }}>
              <div>
                <p style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.45em", color: "#a34d26", textTransform: "uppercase", marginBottom: "8px" }}>Now viewing</p>
                <h3 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#e8e0cc" }}>{currentCat.category}</h3>
              </div>
              <button onClick={() => setOpenCategory(null)} style={{ background: "none", border: "1px solid rgba(163,77,38,0.3)", color: "#a34d26", padding: "8px 18px", fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}>
                Close
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(163,77,38,0.07)" }}>
              {currentCat.items.map((item, i) => (
                <div key={i} style={{ background: "#071510", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", opacity: 0, animation: `fadeSlideIn 0.45s ease ${i * 0.07}s forwards` }}>
                  <div>
                    <h4 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "19px", color: "#e8e0cc", marginBottom: "6px" }}>{item.name}</h4>
                    <p style={{ fontFamily: "Jost,sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.4)", lineHeight: 1.65, maxWidth: "260px" }}>{item.desc}</p>
                  </div>
                  <span style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "20px", color: "#a34d26", flexShrink: 0, marginLeft: "16px" }}>{item.price}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "52px" }}>
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">Reserve a Table</a>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeSlideIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
