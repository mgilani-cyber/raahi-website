import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ChevronRight } from "lucide-react";
import { RESERVATION_URL, PHONE_NUMBER, PHONE_SECONDARY, EMAIL, GOOGLE_MAPS_URL } from "@/constants";

const TEAL  = "#113122";
const RUST  = "#a34d26";
const IVORY = "#e8e0cc";
const DARK  = "#0a1f15";

// ── Real Raahi knowledge base ──────────────────────────────────────────────
const KB = {
  hours: `**Raahi Indian Kitchen Hours:**\n- Monday: 11 AM – 10 PM\n- Tuesday: 5 PM – 10 PM\n- Wednesday – Sunday: 11 AM – 10 PM\n\nWe're open 7 days a week. Tuesday we open later at 5 PM.`,

  location: `**Find Us:**\n17695 Tomball Pkwy\nHouston, TX 77064\n\nWe're in North Houston on Tomball Pkwy.\n\n[Get Directions →](${GOOGLE_MAPS_URL})`,

  reservation: `**Book a Table:**\nReserve online — takes under a minute:\n\n[Reserve Now →](${RESERVATION_URL})\n\nOr call us directly:\n**${PHONE_NUMBER}**\n**${PHONE_SECONDARY}**\n\nWalk-ins are always welcome based on availability.`,

  menu: `**Our Menu includes:**\n\n- **Starters** — Pakoras, Samosas, Street Eats (Gol Gappe, Chaat, Dahi Bhalla)\n- **Tandoor** — Lamb Chops ($24.99), Tandoori Chicken, Salmon, Prawns, Tikkas\n- **Dosa Corner** — Plain, Masala, Mysore, Paneer Dosa\n- **Veg Mains** — Palak Paneer, Shahi Paneer, Dal Makhani, Raahi Special\n- **Chicken** — Butter Chicken, Tikka Masala, Chettinad, Korma (all $16.99)\n- **Lamb & Goat** — Masala, Vindaloo, Korma, Kadhai ($19.99–$21.99)\n- **Biryani** — 9 options: Chicken, Goat, Lamb, Paneer, Veg, Gongura and more\n- **Cocktails** — Raahi Hurricane, Raahi Margaritas (5 flavours), Mango Storm\n- **Lassi & Drinks** — Mango, Sweet, Salty, Rose Lassi — all $5\n- **Desserts** — Gulab Jamun, Rasmalai, Carrot Halwa, Faluda\n- **Kids Menu** — Fries, Chicken Strips, Mini Burgers, Combo\n\n[See Full Menu →](/menus)`,

  butter_chicken: `**Butter Chicken at Raahi** — $16.99\n\nTandoori chicken cooked in a tomato-based gravy with cream and Indian spices. One of our most-ordered dishes — our customers say it's the best in North Houston.`,

  biryani: `**Biryani at Raahi:**\n\n- Veg Biryani — $13.99\n- Egg Biryani — $14.99\n- Chicken Biryani — $16.99\n- Paneer Biryani — $15.99\n- Gongura Biryani (Chicken) — $16.99\n- Vijaywada Boneless Chicken Biryani — $16.99\n- Goat Biryani — $19.99\n- Gongura Goat Biryani — $19.99\n- Lamb Biryani — $21.99\n\nNine biryanis to choose from. We'd suggest the Gongura Goat if you want something different.`,

  cocktails: `**Cocktails at Raahi:**\n\n- Mango Storm — $13 (Dark Rum, Lime, Mango, Ginger Beer)\n- Cucumber Lemon G&T — $11 (Tanqueray Gin, Cucumber, Lemon, Fever Tree)\n- Blackberry Old Fashioned — $12 (Bourbon, Blackberry, Bitters)\n- Pomegranate Gin Fizz — $12\n- Raahi Hurricane — $13 (Light + Dark Rum, Passion Fruit, Pineapple)\n- Passion Fruit Side Car — $14\n- Raahi Margaritas — $12 (Classic, Blackberry, Mango, Pomegranate, or Passion Fruit)\n\n**Mocktails** — all $8: Lavender Lemon Fizz, Passion Fruit Colada, Mango Mule, Cucumber Spritzer, Pomegranate Limeade`,

  lassi: `**Lassi & Drinks** (all $5):\n- Sweet Lassi\n- Salty Lassi\n- Mango Lassi ⭐ most popular\n- Rose Lassi\n- Banana Shake\n- Mango Shake\n- Rose Shake\n- Paan Gulkand Shake\n- Masala Lemonade\n- Mojito / Rose Mojito / Mango Mojito\n\n**Hot Drinks** (all $3): Chai, Masala Chai, Ginger Chai, Indian Coffee`,

  vegetarian: `**Vegetarian Options at Raahi:**\n\nWe have an extensive veg menu:\n- All Pakoras & most Samosas\n- All Street Eats (Gol Gappe, Chaat, Dahi Bhalla etc.)\n- Full Dosa Corner (Plain, Masala, Mysore, Paneer Dosa)\n- 20+ Veg Main Course dishes — Palak Paneer, Shahi Paneer, Dal Bukhara, Raahi Special, Sarso Da Saag and more\n- Veg Biryani & Paneer Biryani\n- All Paranthas (until 5 PM)\n- All Lassis & Desserts\n\n[See Veg Menu →](/menus)`,

  parking: `**Parking:**\nPlenty of free parking available at 17695 Tomball Pkwy, Houston TX 77064. We're in a strip center with easy access off Tomball Parkway.`,

  contact: `**Contact Raahi Indian Kitchen:**\n\n📞 ${PHONE_NUMBER}\n📞 ${PHONE_SECONDARY}\n📧 ${EMAIL}\n📍 17695 Tomball Pkwy, Houston TX 77064\n\n[Reserve Online →](${RESERVATION_URL})`,

  about: `**About Raahi Indian Kitchen:**\n\nRaahi means 'traveller' in Hindi. We're an authentic Indian restaurant in North Houston on Tomball Pkwy, serving traditional recipes with fresh ingredients.\n\nOur menu covers North Indian, South Indian, street food, Indo-Chinese, biryanis and a full bar — over 100 items. Chef Akshay leads our kitchen, and Rahul and the team make sure every table feels looked after.\n\nWe have 144+ Google reviews and a 4.9★ rating. Come in and see why North Houston considers us one of the best Indian restaurants in the city.`,

  kids: `**Kids Menu at Raahi:**\n- Fries — $4\n- Chicken Strips — $5\n- Mini Burgers (Paneer or Chicken) — $6\n- Combo (Mini Burger + Fries + Pop) — $10 🎉 Best value for kids`,

  desserts: `**Desserts at Raahi:**\n- Gulab Jamun — $5.99 (Indian donuts in sugar syrup)\n- Rasmalai — $5.99 (cottage cheese in saffron milk)\n- Carrot Halwa — $5.99 (slow-cooked, served warm)\n- Gulab Jamun with Ice Cream / Kulfi — $7.99\n- Ice Cream (1 scoop) — $3\n- Faluda — $7.99 (kulfi with rose syrup, noodles, condensed milk)`,

  wifi: `Yes, we offer complimentary Wi-Fi. Just ask our staff for the network details when you visit.`,

  delivery: `Yes, we offer both takeout and delivery. Call us at ${PHONE_NUMBER} or check our online ordering options.`,

  bar: `**Yes, we have a full bar.** We serve:\n- Signature cocktails (Raahi Hurricane, Margaritas, Mango Storm)\n- Mocktails ($8 each)\n- Lassis & Indian drinks\n- Full liquor selection (Tito's, Grey Goose, Patron, Glenlivet, MacAllan and more)\n- Draft beer (Modelo, Michelob Ultra, Stella, Saint Arnold)\n- Bottled beer (Corona, Heineken, Guinness, Shiner Bock and more)`,
};

// ── Pattern matcher ────────────────────────────────────────────────────────
function getResponse(q: string): string {
  const lq = q.toLowerCase();

  if (/hour|open|close|time|when|monday|tuesday|wednesday|thursday|friday|saturday|sunday|schedule/i.test(lq))
    return KB.hours;
  if (/location|address|where|direction|tomball|77064|find|map|park/i.test(lq))
    return KB.location;
  if (/reserv|book|table|seat/i.test(lq))
    return KB.reservation;
  if (/butter.?chicken/i.test(lq))
    return KB.butter_chicken;
  if (/biryani|rice|dum/i.test(lq))
    return KB.biryani;
  if (/cocktail|drink|alcohol|bar|beer|liquor|rum|gin|tequila|whiskey|vodka/i.test(lq))
    return KB.cocktails;
  if (/lassi|chai|coffee|shake|lemonade|mojito|hot.?drink|beverage/i.test(lq))
    return KB.lassi;
  if (/veg|vegetarian|paneer|no.?meat|plant/i.test(lq))
    return KB.vegetarian;
  if (/kid|child|children|family|junior/i.test(lq))
    return KB.kids;
  if (/dessert|sweet|gulab|rasmalai|kulfi|halwa|faluda/i.test(lq))
    return KB.desserts;
  if (/wifi|wi-fi|internet|network/i.test(lq))
    return KB.wifi;
  if (/delivery|takeout|take.?out|order|pickup/i.test(lq))
    return KB.delivery;
  if (/contact|phone|email|call|reach/i.test(lq))
    return KB.contact;
  if (/about|story|history|who|raahi|chef|akshay|rahul/i.test(lq))
    return KB.about;
  if (/menu|food|eat|dish|item|serve/i.test(lq))
    return KB.menu;

  return `Great question! For the most accurate answer, give us a call at **${PHONE_NUMBER}** or email us at **${EMAIL}**. We're happy to help.\n\nYou can also browse our full menu [here →](/menus) or [reserve a table online →](${RESERVATION_URL}).`;
}

// ── Quick replies ──────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  "What are your hours?",
  "How do I make a reservation?",
  "What's on the menu?",
  "Do you have vegetarian options?",
  "Where are you located?",
  "Tell me about cocktails",
];

// ── Message renderer ───────────────────────────────────────────────────────
function MessageText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g);
  const elements: React.ReactNode[] = [];
  let i = 0;
  text.split('\n').forEach((line, li) => {
    if (li > 0) elements.push(<br key={`br-${li}`} />);
    const segs = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    segs.forEach((seg, si) => {
      if (/^\*\*[^*]+\*\*$/.test(seg)) {
        elements.push(<strong key={`b-${li}-${si}`}>{seg.slice(2, -2)}</strong>);
      } else if (/^\[[^\]]+\]\([^)]+\)$/.test(seg)) {
        const label = seg.match(/\[([^\]]+)\]/)![1];
        const href  = seg.match(/\(([^)]+)\)/)![1];
        const isExt = href.startsWith('http');
        elements.push(
          <a key={`a-${li}-${si}`} href={href} target={isExt ? "_blank" : undefined} rel={isExt ? "noopener noreferrer" : undefined}
            style={{ color: RUST, textDecoration: "underline" }}>
            {label}
          </a>
        );
      } else {
        elements.push(seg);
      }
    });
  });
  return <span>{elements}</span>;
}

// ── Main AI widget ─────────────────────────────────────────────────────────
export function RaahiAI() {
  const [open,    setOpen]    = useState(false);
  const [input,   setInput]   = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: `Namaste! 🙏 I'm Raahi's assistant. Ask me anything — hours, menu, reservations, directions, or what to order.\n\nWe're at 17695 Tomball Pkwy, Houston TX 77064.` },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { role: "ai", text: getResponse(userMsg) }]);
    }, 380);
  }, []);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[70] w-14 h-14 flex items-center justify-center shadow-lg"
        style={{ background: RUST, borderRadius: "50%" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Chat with Raahi AI"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={20} color={IVORY} />
              </motion.div>
            : <motion.div key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Sparkles size={20} color={IVORY} />
              </motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 right-4 md:right-6 z-[70] w-[calc(100vw-2rem)] md:w-[400px] shadow-2xl"
            style={{ maxHeight: "580px", display: "flex", flexDirection: "column", background: DARK, border: "1px solid rgba(163,77,38,0.25)", borderRadius: "4px" }}
          >
            {/* Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(163,77,38,0.15)", background: TEAL, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.1rem", color: IVORY }}>Raahi</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.35em", color: "rgba(163,77,38,0.8)", textTransform: "uppercase" }}>
                  Ask me anything
                </p>
              </div>
              <button onClick={() => setOpen(false)} style={{ color: "rgba(232,224,204,0.4)", background: "none", border: "none", cursor: "pointer" }}>
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "85%",
                    padding: "12px 14px",
                    background: m.role === "user" ? RUST : "rgba(111,133,102,0.12)",
                    border: m.role === "user" ? "none" : "1px solid rgba(163,77,38,0.12)",
                    borderRadius: "4px",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "13px",
                    color: m.role === "user" ? IVORY : "rgba(232,224,204,0.75)",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}>
                    <MessageText text={m.text} />
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div style={{ padding: "0 16px 12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {QUICK_REPLIES.map(q => (
                  <button key={q} onClick={() => send(q)}
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", padding: "6px 12px", border: "1px solid rgba(163,77,38,0.3)", background: "transparent", color: "rgba(163,77,38,0.8)", cursor: "pointer", borderRadius: "2px", transition: "all 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(163,77,38,0.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(163,77,38,0.12)", display: "flex", gap: "8px" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="Ask about menu, hours, reservations..."
                style={{
                  flex: 1, background: "rgba(111,133,102,0.08)", border: "1px solid rgba(163,77,38,0.15)",
                  color: IVORY, padding: "10px 12px", fontFamily: "'Jost', sans-serif", fontSize: "13px",
                  outline: "none", borderRadius: "2px",
                }}
              />
              <button onClick={() => send(input)}
                style={{ width: 40, height: 40, background: RUST, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: "2px" }}>
                <Send size={14} color={IVORY} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
