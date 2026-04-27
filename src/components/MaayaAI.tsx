import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { OPENTABLE_URL, PHONE_NUMBER } from "@/constants";

// ── Knowledge base ────────────────────────────────────────────────────────────
const KB = {
  hours: `**Bar Maaya Hours:**\n- Monday: **Closed**\n- Tuesday – Thursday: 4PM – 12AM\n- Friday – Saturday: 4PM – 2AM\n- Sunday: 4PM – 12AM\n\nHappy Hour: Every day we're open, **4PM – 7PM**`,

  happyHour: `**Happy Hour** runs Tue–Fri, **4PM – 7PM**\n\n**$8 cocktails all happy hour long:**\n- Saffron Spice — Saffron Vodka, Ginger Liqueur, Lemon, Egg White, Mango\n- Hillside — Cardamom Mezcal, Aperol, Lemongrass, Lemon, Egg White\n- Rose Bazaar — Pisco, Elderflower, Lychee, Sparkling Wine\n- The Pink City — Empress Gin, Lemon, Pineapple, Orange Liqueur\n- Smokey Sapphire — Tequila Reposado, Mezcal, Cointreau, Dry Vermouth\n- Smokey Trails — Mezcal, Rye, Honey, Cinnamon\n- Cinnamon Sleek — Malibu Coconut Rum, Cinnamon Syrup, Cream\n- Lychee Bliss — Gin, Soju, Lychee, Milk, Lemon\n- Paloma — Altos Tequila, Grapefruit, Agave\n- Velvet Illusion — Vodka, Coffee Liqueur, Heavy Cream\n- Strawberry Absinthe Sour — Gin, Absinthe, Lime\n\n**Happy Hour Food Specials:**\n- Maaya Fries — $9\n- Truffle Fries — $11\n- Samosas (4pc) — $10\n- Chili Paneer — $13\n- Sliders (2pc) — $12\n\nCome early — the bar fills up fast.`,

  menu: `**Bar Maaya Menus:**\n\n**Happy Hour Menu** (Tue–Fri 4–7PM) — All cocktails $8, food specials\n\n**Regular Menu** — Full signature & classic cocktails, spirits (gin, rum, vodka, tequila, whiskey, scotch, Japanese whisky, cognac), bites & plates, desserts, wine & bubbles\n\n**Tableside Old Fashioned** — $28 · A theatrical experience, smoked at your table\n\n**Premier League Food Menu** — Game-day eats: wings, flatbreads, nachos, fries\n\n[View Full Menu →](/menus)`,

  cocktails: `**Signature Cocktails at Bar Maaya:**\n\n**Saffron Spice** $24 — Saffron Vodka, Ginger Liqueur, Lemon, Egg White, Mango\n**Hillside** $24 — Cardamom Mezcal, Aperol, Lemongrass, Lemon, Egg White\n**Rose Bazaar** $19 — Pisco, Elderflower, Lychee, Sparkling Wine\n**The Pink City** $16 — Empress Gin, Lemon, Pineapple, Orange Liqueur, Egg White\n**Smokey Sapphire** $16 — Tequila Reposado, Mezcal, Cointreau, Dry Vermouth\n**Smokey Trails** $23 — Mezcal, Rye, Honey, Cinnamon Syrup\n**Cinnamon Sleek** $22 — Malibu Coconut Rum, Cinnamon Syrup, Cream\n**Tamarind Spiced Punch** $65 — Serves 4–6\n\n**Tableside Old Fashioned** $28 — Whiskey or bourbon, smoked under a glass dome at your table\n\nAll cocktails **$8** during Happy Hour (Tue–Fri 4–7PM)\n\n[See Full Cocktail Menu →](/menus)`,

  events: `**Events at Bar Maaya:**\n\n**Sip & Paint** — Every Saturday. Tickets from $20. All skill levels welcome.\n\n**Sports Watch Parties** — Premier League every weekend. Big screens, $8 drinks.\n\n**Birthday Packages** — From $35/person · Tiramisu cake included · 2 to 40 guests\n\n**Corporate Events** — Team dinners, client entertaining, full buyouts · 4 to 40 guests\n\n**Private Events** — Brand launches, cocktail receptions, full venue buyouts\n\n[Browse All Events →](/events)`,

  sipAndPaint: `**Sip & Paint at Bar Maaya**\n\nPick up a brush, create something beautiful, and enjoy the atmosphere of Bar Maaya.\n\nEvery Saturday — spots fill up fast\n- $20 General: canvas and art supplies included\n- $25 Premium: premium canvas and art supplies included, priority seating\n\nAll supplies provided — zero experience needed\n\n[Book Sip & Paint →](/events)`,

  sports: `**Sports Watch Parties**\n\nWe screen **Premier League** games every weekend on our big screens\n**$8 drinks** all match long\nGame-day food menu available\nMultiple screens, incredible sound\n\nNo reservation needed — just show up.\n\n[Learn More →](/events)`,

  privateEvents: `**Private Events at Bar Maaya**\n\n**Birthday Packages:**\n- Love Seat — 2–8 guests · From $35/person · Tiramisu cake included\n- Gallery — 8–20 guests · From $35/person · Tiramisu cake + birthday banner\n- Bar Buyout — 20–30 guests · From $40/person · Custom menu + DJ\n- Ballroom — 30–40 guests · From $45/person · Full venue, bespoke experience\n\n**Corporate Packages:**\n- Team Dinner — 4–15 guests · From $35/person\n- Client Entertainment — 15–25 guests · From $40/person\n- Full Buyout — 25–40 guests · Custom pricing\n\nAll packages include custom cocktail menus, entertainment options, and full event coordination.\n\n[Plan Your Event →](/events)`,

  reservation: `**Reserve a Table**\n\nBook your table online — it takes under 60 seconds.\n\nWalk-ins are also welcome based on availability.\n\nFor large groups (8+) or private events, call us directly:\n${PHONE_NUMBER}\n\n[Reserve Your Table →](${OPENTABLE_URL})`,

  location: `**Find Bar Maaya**\n\n**244 Adelaide St West**\nToronto, Ontario M5H 1X6\n\nIn the heart of the Entertainment District, steps from Osgoode Station.\n\nTTC: Osgoode (Line 1) — 3 min walk\nGreen P parking on Adelaide & Peter St\n\n[Get Directions →](https://maps.google.com/?q=244+Adelaide+St+West+Toronto)`,

  contact: `**Contact Bar Maaya**\n\n**Phone:** ${PHONE_NUMBER}\n**Address:** 244 Adelaide St West, Toronto\n**Instagram:** [@bar.maaya](https://www.instagram.com/bar.maaya/)\n\nFor private event inquiries:\n[Submit Event Request →](/events)\n\nFor reservations:\n[Reserve Your Table →](${OPENTABLE_URL})`,

  parking: `**Parking near Bar Maaya**\n\nGreen P Parking — Peter St & Adelaide St W (1 min walk)\nMetro Parking — 230 Adelaide St W\nTTC — Osgoode Station (Line 1), 3-min walk\nRideshare drop-off at 244 Adelaide St W`,

  about: `**About Bar Maaya**\n\n"Maaya" is the word for illusion — the idea that reality is far more enchanting than it first appears.\n\nBar Maaya was born from a singular vision: to create a cocktail experience where Eastern botanical traditions meet Western mixology innovation — all within one of Toronto's most immersive spaces.\n\nMystical décor, amber lighting, and a veil between worlds.\n\n[Read Our Full Story →](/story)`,

  dress: `**Dress Code at Bar Maaya**\n\nSmart casual to upscale. We want you to feel as good as the cocktails taste.\n\nSmart casual / evening wear\nButton-downs, blazers, dresses\nAthletic wear, flip-flops not recommended on weekends\n\nWhen in doubt — dress like you're going somewhere special.`,

  music: `**Music at Bar Maaya**\n\nFlamenco Fridays — live guitar and dance from 8PM every Friday\nViolin Saturdays — our resident violinist from 8PM every Saturday\nDJ sets on select evenings\n\nFollow **@bar.maaya** on Instagram for the weekly lineup.`,
};

// ── Pattern matching ──────────────────────────────────────────────────────────
function getResponse(q: string): { text: string; links?: { label: string; to: string; external?: boolean }[] } {
  const lq = q.toLowerCase();

  if (/happy.?hour|deal|special|discount|cheap|\$8|eight dollar/i.test(lq))
    return { text: KB.happyHour };

  if (/hour|open|close|time|when|schedule|monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(lq))
    return { text: KB.hours };

  if (/sip.?and.?paint|paint|art|canvas|painting/i.test(lq))
    return { text: KB.sipAndPaint, links: [{ label: "Book Sip & Paint", to: "/events" }] };

  if (/sport|soccer|football|premier.?league|watch.?part|game|match|screen/i.test(lq))
    return { text: KB.sports, links: [{ label: "Sports Watch Parties", to: "/events" }] };

  if (/birthday|celebration|celebrate/i.test(lq))
    return { text: KB.privateEvents, links: [{ label: "Birthday Packages", to: "/events" }, { label: "Plan Your Event", to: "/events" }] };

  if (/corporate|team|client|business|company|work|office/i.test(lq))
    return { text: KB.privateEvents, links: [{ label: "Corporate Packages", to: "/events" }, { label: "Plan Your Event", to: "/events" }] };

  if (/private|buyout|group|wedding/i.test(lq))
    return { text: KB.privateEvents, links: [{ label: "Plan Private Event", to: "/events" }] };

  if (/event|happening|tonight/i.test(lq) && !/menu|food|drink|cocktail/i.test(lq))
    return { text: KB.events, links: [{ label: "All Events", to: "/events" }] };

  if (/cocktail|drink|signature|old.?fashion|saffron|mystic|mule|veil/i.test(lq))
    return { text: KB.cocktails, links: [{ label: "Full Cocktail Menu", to: "/menus" }] };

  if (/food|eat|menu|dish|plate|kitchen|curry|poutine|wing|samosa|naan/i.test(lq))
    return { text: KB.menu, links: [{ label: "View Full Menu", to: "/menus" }] };

  if (/what.?s on/i.test(lq))
    return { text: KB.events, links: [{ label: "All Events", to: "/events" }] };

  if (/reserv|book|table|seat|walk.?in/i.test(lq))
    return {
      text: KB.reservation,
      links: [
        { label: "Reserve Your Table", to: OPENTABLE_URL, external: true },
        { label: "Private Events", to: "/events" },
      ],
    };

  if (/park|parking|car/i.test(lq))
    return { text: KB.parking };

  if (/where|location|address|direction|how to get|transit|ttc|subway|osgoode/i.test(lq))
    return { text: KB.location };

  if (/contact|phone|call|email|reach|instagram/i.test(lq))
    return { text: KB.contact };

  if (/dress|wear|attire|code|outfit|clothes/i.test(lq))
    return { text: KB.dress };

  if (/music|dj|live|sax|band|jazz|entertain|violin|flamenco/i.test(lq))
    return { text: KB.music };

  if (/about|story|what is|who|maaya|meaning|concept|vibe/i.test(lq))
    return { text: KB.about, links: [{ label: "Read Our Story", to: "/story" }] };

  return {
    text: `I can help you with:\n\n- **Menu & cocktails** — what we serve\n- **Happy Hour** — Tue–Fri 4–7PM, $8 drinks\n- **Events** — Sip & Paint, Sports, Private\n- **Reservations** — book a table\n- **Hours & Location** — 244 Adelaide St W\n- **Dress code, parking, music**\n\nWhat would you like to know?`,
  };
}

// ── Markdown-lite renderer ────────────────────────────────────────────────────
function renderText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const rendered = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[(.+?)\]\((.+?)\)/g, (_, label, href) => {
        const ext = href.startsWith("http");
        return `<a href="${href}" ${ext ? 'target="_blank" rel="noopener noreferrer"' : ""} class="text-primary hover:underline">${label}</a>`;
      });
    return (
      <span key={i} className="block" dangerouslySetInnerHTML={{ __html: rendered || "&nbsp;" }} />
    );
  });
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Msg = { role: "user" | "ai"; text: string; links?: { label: string; to: string; external?: boolean }[] };

const QUICK = [
  "What's on the menu?",
  "Happy Hour deals",
  "Upcoming events",
  "Reserve a table",
  "Where are you?",
  "Private events",
];

const IDLE_MSG: Msg = {
  role: "ai",
  text: "Still exploring?\n\nI'm here whenever you're ready — whether it's finding the perfect cocktail, booking a table, or planning a private event. Just ask.",
  links: [
    { label: "Reserve a Table ›", to: OPENTABLE_URL, external: true },
    { label: "View Menus ›", to: "/menus" },
  ],
};

// ── Component ─────────────────────────────────────────────────────────────────
export function MaayaAI() {
  const [open, setOpen] = useState(false);
  const dragConstraintsRef = useRef<HTMLDivElement>(null);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: `Welcome to Bar Maaya.\n\nI'm your personal guide to everything Maaya — menus, cocktails, events, reservations, and more.\n\nWhat can I help you with tonight?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showIdleBubble, setShowIdleBubble] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Idle: after 15s show a floating bubble above the button (not in chat) ─
  const hasInteracted = useRef(false);

  const resetIdleTimer = useCallback(() => {
    hasInteracted.current = true;
    setShowIdleBubble(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasInteracted.current) return;
      setShowIdleBubble(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  // ── Scroll to bottom on new messages ─────────────────────────────────────
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  // ── Send message ──────────────────────────────────────────────────────────
  const send = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      resetIdleTimer();
      const userMsg: Msg = { role: "user", text };
      setMsgs((m) => [...m, userMsg]);
      setInput("");
      setTyping(true);
      setTimeout(() => {
        const { text: responseText, links } = getResponse(text);
        setMsgs((m) => [...m, { role: "ai", text: responseText, links }]);
        setTyping(false);
      }, 700 + Math.random() * 400);
    },
    [resetIdleTimer]
  );

  return (
    <>
      {/* Drag constraint layer — full viewport */}
      <div ref={dragConstraintsRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99993 }} />

      {/* Idle bubble — appears above the button after 15s, dismissed on open */}
      <AnimatePresence>
        {showIdleBubble && !open && (
          <motion.div
            className="fixed bottom-20 right-6 z-[99994] max-w-[220px]"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="relative px-4 py-3 text-[13px] leading-snug border border-primary/30"
              style={{
                background: "hsl(8,55%,6%)",
                fontFamily: "'Crimson Pro', serif",
                fontStyle: "italic",
                color: "rgba(245,236,215,0.8)",
              }}
            >
              Still exploring? I can help with menus, cocktails, bookings and more.
              {/* tail */}
              <span
                className="absolute -bottom-[7px] right-6 w-3 h-3 border-r border-b border-primary/30"
                style={{ background: "hsl(8,55%,6%)", transform: "rotate(45deg)" }}
              />
              <button
                onClick={() => setShowIdleBubble(false)}
                className="absolute top-2 right-2 text-foreground/30 hover:text-foreground/60 transition-colors"
              >
                <X size={11} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger — draggable */}
      <motion.button
        drag
        dragConstraints={dragConstraintsRef}
        dragMomentum={false}
        dragElastic={0.08}
        onClick={() => { setOpen(true); resetIdleTimer(); }}
        className="fixed bottom-6 right-6 z-[99994] flex items-center gap-2 px-5 py-3 font-body text-[10px] tracking-[0.3em] text-background bg-primary"
        style={{ borderRadius: "0", touchAction: "none" }}
        initial={{ opacity: 0, y: 20 }}
        animate={!open ? {
          opacity: 1,
          y: 0,
          boxShadow: [
            "0 0 24px rgba(201,168,76,0.3)",
            "0 0 48px rgba(201,168,76,0.6)",
            "0 0 24px rgba(201,168,76,0.3)",
          ],
        } : { opacity: 0, y: 20, pointerEvents: "none" }}
        transition={{
          opacity: { delay: 2.5, duration: 0.5 },
          y: { delay: 2.5, duration: 0.5 },
          boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 3 },
        }}
        whileHover={{ scale: 1.04, backgroundColor: "rgba(201,168,76,0.85)" }}
        whileTap={{ scale: 0.97 }}
      >
        <Sparkles size={12} />
        ASK MAAYA
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[99995] bg-background/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer — auto-height up to viewport max */}
            <motion.div
              className="fixed bottom-0 right-0 z-[99996] w-full max-w-[420px] flex flex-col bg-[hsl(8,55%,6%)] border-l border-t border-border/30 shadow-2xl"
              style={{ maxHeight: "min(90vh, 700px)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Header */}
              <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <Sparkles size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-foreground text-base leading-tight">Ask Maaya</p>
                    <p className="text-muted-foreground text-[10px] font-body tracking-wider">Your Bar Maaya Guide</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Quick chips */}
              <div className="shrink-0 relative">
                <div className="px-4 py-3 flex gap-2 overflow-x-auto border-b border-border/10 scrollbar-hide">
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      onClick={() => { send(q); resetIdleTimer(); }}
                      className="shrink-0 text-[10px] font-body tracking-wide px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200 whitespace-nowrap"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[hsl(8,55%,6%)] to-transparent pointer-events-none border-b border-border/10" />
              </div>

              {/* Messages — flex-1 + min-h-0 so it shrinks and scrolls properly */}
              <div
                className="flex-1 min-h-0 overflow-y-auto px-5 py-4 flex flex-col gap-4"
                onScroll={resetIdleTimer}
              >
                {msgs.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mr-2 mt-1">
                        <Sparkles size={10} className="text-primary" />
                      </div>
                    )}
                    <div className="max-w-[82%]">
                      <div
                        className={`px-4 py-3 leading-relaxed rounded-2xl ${
                          msg.role === "user"
                            ? "bg-primary text-background rounded-tr-sm font-body text-[13px]"
                            : "bg-card/60 border border-border/20 text-foreground/85 rounded-tl-sm"
                        }`}
                        style={msg.role === "ai" ? {
                          fontFamily: "'Crimson Pro', serif",
                          fontStyle: "italic",
                          fontSize: "15px",
                          fontWeight: 300,
                        } : {}}
                      >
                        {msg.role === "ai" ? (
                          <div className="space-y-0.5">{renderText(msg.text)}</div>
                        ) : (
                          msg.text
                        )}
                      </div>
                      {/* Link chips */}
                      {msg.links && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {msg.links.map((link) =>
                            link.external ? (
                              <a
                                key={link.label}
                                href={link.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-body text-primary border border-primary/40 px-3 py-1 rounded-full hover:bg-primary/10 transition-colors"
                              >
                                {link.label} <ChevronRight size={11} />
                              </a>
                            ) : (
                              <Link
                                key={link.label}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center gap-1 text-[11px] font-body text-primary border border-primary/40 px-3 py-1 rounded-full hover:bg-primary/10 transition-colors"
                              >
                                {link.label} <ChevronRight size={11} />
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <Sparkles size={10} className="text-primary" />
                    </div>
                    <div className="bg-card/60 border border-border/20 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary/60"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="shrink-0 px-4 py-4 border-t border-border/20">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => { setInput(e.target.value); resetIdleTimer(); }}
                    onFocus={resetIdleTimer}
                    placeholder="Ask about cocktails, events, hours..."
                    className="flex-1 bg-card/40 border border-border/30 rounded-full px-4 py-2.5 text-[13px] font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background hover:bg-primary/80 disabled:opacity-40 transition-all duration-200 shrink-0"
                  >
                    <Send size={15} />
                  </button>
                </form>
                <p className="text-center text-muted-foreground/30 text-[10px] font-body mt-2 tracking-wider">
                  Powered by Bar Maaya AI
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
