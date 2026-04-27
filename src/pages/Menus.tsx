import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { MagneticElement } from "@/components/MagneticElement";
import { useReservation } from "@/contexts/ReservationContext";
import { Star } from "lucide-react";
import { MENU_CATEGORIES } from "@/lib/menuData";
import type { MenuItem, MenuSubGroup } from "@/lib/menuData";
import { Component as LuminaSlider } from "@/components/ui/lumina-interactive-list";

// ─── Menu Item Row ─────────────────────────────────────────────────────────────
function MenuItemRow({ item, isHappyHour = false }: { item: MenuItem; isHappyHour?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "20px 16px",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
        borderLeft: hovered ? "3px solid rgba(201,168,76,0.5)" : "3px solid transparent",
        background: hovered
          ? isHappyHour ? "rgba(201,168,76,0.05)" : "rgba(201,168,76,0.03)"
          : "transparent",
        transition: "border-color 0.2s ease, background 0.2s ease",
        gap: "16px",
        cursor: "default",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: item.desc ? "4px" : 0 }}>
          <span style={{ fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif", fontStyle: "italic", fontSize: "16px", color: "#F5ECD7" }}>
            {item.name}
          </span>
          {item.veg && (
            <span style={{ fontSize: "8px", fontFamily: "Calibri, 'Gill Sans', sans-serif", letterSpacing: "0.15em", color: "rgba(80,200,120,0.7)", border: "1px solid rgba(80,200,120,0.25)", padding: "2px 6px" }}>VEG</span>
          )}
          {item.badge && (
            <span style={{ fontSize: "8px", fontFamily: "Calibri, 'Gill Sans', sans-serif", letterSpacing: "0.15em", color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.25)", padding: "2px 6px" }}>{item.badge}</span>
          )}
        </div>
        {item.desc && (
          <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "13px", color: "#8C7A5E", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
        )}
        {item.note && (
          <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "11px", color: "rgba(201,168,76,0.45)", marginTop: "4px", margin: 0 }}>{item.note}</p>
        )}
      </div>
      <span style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "14px", color: "#C9A84C", flexShrink: 0, paddingTop: "2px", fontWeight: 600 }}>
        ${item.price}
      </span>
    </div>
  );
}

// ─── Spirits 2-col grid ────────────────────────────────────────────────────────
function SpiritsGrid({ items }: { items: MenuItem[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 48px" }}>
      {items.map(item => (
        <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid rgba(201,168,76,0.07)" }}>
          <div style={{ flex: 1, paddingRight: "8px" }}>
            <p style={{ fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif", fontStyle: "italic", fontSize: "15px", color: "#F5ECD7", lineHeight: 1.2, margin: 0 }}>{item.name}</p>
            {item.desc && (
              <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "11px", color: "#8C7A5E", marginTop: "2px", margin: 0 }}>{item.desc}</p>
            )}
          </div>
          <span style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "14px", color: "#C9A84C", flexShrink: 0, fontWeight: 600 }}>${item.price}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Tableside feature card ────────────────────────────────────────────────────
function TablesideCard({ subGroup }: { subGroup: MenuSubGroup }) {
  const item = subGroup.items[0];
  return (
    <div style={{ border: "1px solid rgba(201,168,76,0.25)", padding: "40px 32px", textAlign: "center", background: "rgba(201,168,76,0.02)", maxWidth: "560px" }}>
      <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "9px", letterSpacing: "0.55em", color: "rgba(201,168,76,0.45)", textTransform: "uppercase", marginBottom: "16px" }}>The Theatrical Experience</p>
      <h3 style={{ fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#F5ECD7", marginBottom: "8px" }}>{item.name}</h3>
      <p style={{ fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif", fontSize: "28px", color: "#C9A84C", marginBottom: "8px" }}>${item.price}</p>
      {item.desc && (
        <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "12px", color: "#8C7A5E", marginBottom: "32px" }}>{item.desc}</p>
      )}
      {subGroup.steps && (
        <div style={{ textAlign: "left" }}>
          {subGroup.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "14px" }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "22px", color: "rgba(201,168,76,0.35)", flexShrink: 0, width: "24px", lineHeight: 1 }}>{i + 1}</span>
              <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "13px", color: "rgba(245,236,215,0.5)", lineHeight: 1.65, margin: 0 }}>{step}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sub-group renderer ────────────────────────────────────────────────────────
function SubGroupContent({ sg, isHappyHour }: { sg: MenuSubGroup; isHappyHour?: boolean }) {
  if (sg.type === "tableside") return <TablesideCard subGroup={sg} />;
  if (sg.type === "spirits")   return <SpiritsGrid items={sg.items} />;
  return (
    <>
      {sg.items.map(item => <MenuItemRow key={item.name} item={item} isHappyHour={isHappyHour} />)}
      {sg.note && (
        <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "11px", color: "rgba(201,168,76,0.4)", marginTop: "20px", fontStyle: "italic" }}>
          {sg.note}
        </p>
      )}
    </>
  );
}

// ─── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

const subGroupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

// ─── Page shell ────────────────────────────────────────────────────────────────
const Menus = () => (
  <>
    <SEOHead
      title="Cocktail and Tapas Menu | Bar Maaya Toronto"
      description="Explore Bar Maaya's cocktail and tapas menu in Toronto's Entertainment District, from over-the-top signatures and absinthe service to shareable late-night bites."
      canonical="/menus"
    />
    <MenusInner />
  </>
);

// ─── Inner page ────────────────────────────────────────────────────────────────
const MenusInner = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { openWidget } = useReservation();

  const activeCategory = MENU_CATEGORIES.find(c => c.id === openCategory) ?? null;

  const selectTab = (id: string) => {
    setOpenCategory(id);
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <LuminaSlider />

      {/* ── STICKY CATEGORY TABS ─────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: "60px",
          display: "flex",
          alignItems: "stretch",
          background: "rgba(10,8,4,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {MENU_CATEGORIES.map(cat => {
          const isActive = openCategory === cat.id;
          return (
            <div key={cat.id} style={{ position: "relative", flexShrink: 0 }}>
              <button
                onClick={() => selectTab(cat.id)}
                style={{
                  padding: "0 24px",
                  height: "60px",
                  background: "none",
                  border: "none",
                  color: isActive ? "#C9A84C" : "rgba(245,236,215,0.5)",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "color 0.2s ease, opacity 0.2s ease",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(245,236,215,0.85)"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(245,236,215,0.5)"; }}
              >
                {cat.label}
              </button>
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: "2px",
                    background: "#C9A84C",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── MENU CONTENT — hidden until tab selected ─────────────────────── */}
      <div style={{ background: "#0A0804" }}>
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ maxWidth: "800px", padding: "48px 24px 72px" }}
            >
              {/* Happy Hour badge */}
              {activeCategory.id === "happy-hour" && (
                <motion.div variants={subGroupVariants} style={{ marginBottom: "36px" }}>
                  <span style={{
                    display: "inline-block",
                    background: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    fontFamily: "Calibri, 'Gill Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "#C9A84C",
                    padding: "6px 14px",
                    textTransform: "uppercase",
                  }}>
                    LIMITED TIME · DAILY 4–6 PM
                  </span>
                </motion.div>
              )}

              {activeCategory.subGroups.map((sg, i) => (
                <motion.div
                  key={i}
                  variants={subGroupVariants}
                  style={{ marginBottom: i < activeCategory.subGroups.length - 1 ? "48px" : 0 }}
                >
                  {sg.type !== "tableside" && (
                    <div style={{ paddingBottom: "14px", marginBottom: "4px", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                      <h2 style={{
                        fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif",
                        fontStyle: "italic",
                        fontSize: "28px",
                        color: "#F5ECD7",
                        margin: 0,
                        lineHeight: 1.15,
                      }}>
                        {sg.label}
                      </h2>
                    </div>
                  )}
                  <SubGroupContent sg={sg} isHappyHour={activeCategory.id === "happy-hour"} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── CHEF'S PAIRINGS ──────────────────────────────────────────────── */}
      <section style={{ background: "hsl(8,60%,4%)", padding: "6rem 24px" }}>
        <div className="container mx-auto px-0">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <p className="font-body text-[10px] tracking-[0.55em] text-primary/45 uppercase mb-4">Chef's Suggestions</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground leading-tight">
              Complete Your<br /><span className="text-primary italic">Evening</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border/10">
            {[
              { cocktail: "Saffron Spice", cocktailPrice: "$24", food: "Ghee Roast Prawns", foodPrice: "$18", note: "The saffron's floral warmth mirrors the clarified butter and curry leaves. A pairing that spans two continents.", tag: "SIGNATURE PAIRING" },
              { cocktail: "Smokey Trails", cocktailPrice: "$23", food: "Charcuterie Board", foodPrice: "$26", note: "Mezcal smoke and honey cut through aged cheese and cured meats. Bold on bold — effortlessly balanced.", tag: "BOLD PAIRING" },
              { cocktail: "Rose Bazaar", cocktailPrice: "$19", food: "Saffron Crème Brûlée", foodPrice: "$10", note: "Elderflower and lychee echo the saffron custard's perfume. Begin with one. End with the other.", tag: "DESSERT PAIRING" },
            ].map((pair, i) => (
              <motion.div key={pair.cocktail}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="h-full flex flex-col p-8 md:p-10 border-b md:border-b-0 md:border-r border-border/10 last:border-0" style={{ background: "hsl(8,60%,5%)" }}>
                  <span className="font-body text-[8px] tracking-[0.5em] text-primary/40 uppercase mb-6 flex items-center gap-2">
                    <Star size={8} className="text-primary/40" /> {pair.tag}
                  </span>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-heading text-foreground text-xl">{pair.cocktail}</span>
                    <span className="font-heading text-primary">{pair.cocktailPrice}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-px bg-primary/15" />
                    <span className="font-script italic text-foreground/30 text-sm">pairs with</span>
                    <div className="flex-1 h-px bg-primary/15" />
                  </div>
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-heading text-foreground text-xl">{pair.food}</span>
                    <span className="font-heading text-primary">{pair.foodPrice}</span>
                  </div>
                  <p className="font-body text-[12px] text-foreground/30 leading-relaxed flex-1">{pair.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section style={{ background: "hsl(8,60%,4%)", padding: "100px 24px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }}>
          <p style={{ fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#F5ECD7", marginBottom: "16px" }}>
            Ready to experience it?
          </p>
          <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: "14px", color: "#8C7A5E", marginBottom: "40px" }}>
            Reserve your table and let the evening unfold.
          </p>
          <MagneticElement className="inline-block">
            <button onClick={openWidget} className="btn-gold-outline text-[11px] inline-block">
              RESERVE YOUR TABLE
            </button>
          </MagneticElement>
        </motion.div>
      </section>
    </>
  );
};

export default Menus;
