import React, { useState, useEffect } from 'react';
import { Utensils, Music, Star, Heart, Calendar } from 'lucide-react';

const RESERVATION_URL = "https://reservations.shift4payments.com/#/28a60320-b36c-4294-9eb4-0bc1b1d8e019";

const options = [
  {
    title: "Private Dining",
    description: "Exclusive tables for celebrations",
    image: "https://raahiindiankitchen.com/wp-content/uploads/2025/02/IMG_7918-1024x768.jpeg",
    icon: <Utensils size={20} color="white" />,
  },
  {
    title: "Live Music Nights",
    description: "Food, drinks & live performances",
    image: "https://raahiindiankitchen.com/wp-content/uploads/2025/02/IMG_7922-1024x768.jpeg",
    icon: <Music size={20} color="white" />,
  },
  {
    title: "Chef's Tasting Menu",
    description: "Multi-course culinary journey",
    image: "https://raahiindiankitchen.com/wp-content/uploads/2024/08/raahi-appetizer-scaled.jpg",
    icon: <Star size={20} color="white" />,
  },
  {
    title: "Diwali & Festivals",
    description: "Celebrate India's greatest moments",
    image: "https://raahiindiankitchen.com/wp-content/uploads/2025/02/IMG_7925-1024x768.jpeg",
    icon: <Heart size={20} color="white" />,
  },
  {
    title: "Corporate Events",
    description: "Impress your team & clients",
    image: "https://raahiindiankitchen.com/wp-content/uploads/2025/02/IMG_7930-1024x768.jpeg",
    icon: <Calendar size={20} color="white" />,
  },
];

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animated, setAnimated] = useState<number[]>([]);

  useEffect(() => {
    const timers = options.map((_, i) =>
      setTimeout(() => setAnimated(prev => [...prev, i]), 180 * i)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ background: "#0a1f15", padding: "80px 0" }}>
      <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
        <p style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", letterSpacing: "0.45em", color: "#a34d26", textTransform: "uppercase", marginBottom: "12px" }}>
          Experiences at Raahi
        </p>
        <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#e8e0cc", lineHeight: 1.1, marginBottom: "16px" }}>
          Every occasion deserves<br />a table at Raahi.
        </h2>
        <p style={{ fontFamily: "Jost,sans-serif", fontSize: "14px", color: "rgba(232,224,204,0.45)", maxWidth: "440px", margin: "0 auto" }}>
          From intimate dinners to full celebrations — we have the space, the food, and the warmth to make it unforgettable.
        </p>
      </div>

      <div style={{ display: "flex", width: "100%", maxWidth: "960px", height: "420px", margin: "0 auto", overflow: "hidden", padding: "0 24px" }}>
        {options.map((opt, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              overflow: "hidden",
              backgroundImage: `url('${opt.image}')`,
              backgroundSize: activeIndex === i ? "auto 100%" : "auto 120%",
              backgroundPosition: "center",
              opacity: animated.includes(i) ? 1 : 0,
              transform: animated.includes(i) ? "translateX(0)" : "translateX(-60px)",
              transition: "flex 0.7s ease, box-shadow 0.4s ease, opacity 0.5s ease, transform 0.5s ease, background-size 0.7s ease",
              flex: activeIndex === i ? "7 1 0%" : "1 1 0%",
              minWidth: "56px",
              cursor: "pointer",
              borderLeft: i > 0 ? "2px solid rgba(17,49,34,0.8)" : "none",
              boxShadow: activeIndex === i ? "0 20px 60px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: activeIndex === i
                ? "linear-gradient(to top, rgba(10,31,21,0.95) 0%, rgba(10,31,21,0.2) 60%, transparent 100%)"
                : "linear-gradient(to top, rgba(10,31,21,0.85) 0%, transparent 60%)",
              transition: "background 0.5s ease",
            }} />

            {/* Label */}
            <div style={{ position: "relative", zIndex: 2, padding: "20px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                minWidth: "40px", height: "40px", borderRadius: "50%",
                background: "rgba(163,77,38,0.85)", border: "1px solid rgba(163,77,38,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {opt.icon}
              </div>
              <div style={{
                opacity: activeIndex === i ? 1 : 0,
                transform: activeIndex === i ? "translateX(0)" : "translateX(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                whiteSpace: "nowrap",
              }}>
                <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.15rem", color: "#e8e0cc", fontStyle: "italic", marginBottom: "2px" }}>
                  {opt.title}
                </p>
                <p style={{ fontFamily: "Jost,sans-serif", fontSize: "11px", color: "rgba(232,224,204,0.55)", letterSpacing: "0.05em" }}>
                  {opt.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "48px" }}>
        
          href={RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-outline"
        >
          Reserve for Your Event
        </a>
      </div>
    </div>
  );
};

export default InteractiveSelector;
