import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RESERVATION_URL } from "@/constants";
import { MENU_CATEGORIES } from "@/lib/menuData";
import type { MenuCategoryData } from "@/lib/menuData";
import { ChevronDown, ChevronUp } from "lucide-react";

const TEAL  = "#113122";
const RUST  = "#a34d26";
const SAGE  = "#6f8566";
const IVORY = "#e8e0cc";
const DARK  = "#0a1f15";

// ── Menu item row ─────────────────────────────────────────────────────────────
function MenuItemRow({ item }: { item: any }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "18px 16px",
        borderBottom: "1px solid rgba(163,77,38,0.08)",
        borderLeft: hovered ? "3px solid rgba(163,77,38,0.6)" : "3px solid transparent",
        background: hovered ? "rgba(163,77,38,0.04)" : "transparent",
        transition: "all 0.2s ease",
        gap: "16px",
        cursor: "default",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: item.desc ? "5px" : 0 }}>
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "16px", color: IVORY }}>
            {item.name}
          </span>
          {item.veg && (
            <span style={{ fontSize: "8px", fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em", color: "rgba(80,200,120,0.8)", border: "1px solid rgba(80,200,120,0.25)", padding: "2px 7px", textTransform: "uppercase" }}>
              VEG
            </span>
          )}
          {item.badge && (
            <span style={{ fontSize: "8px", fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em", color: "rgba(163,77,38,0.85)", border: "1px solid rgba(163,77,38,0.3)", padding: "2px 7px", textTransform: "uppercase", background: "rgba(163,77,38,0.08)" }}>
              {item.badge}
            </span>
          )}
        </div>
        {item.desc && (
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12.5px", color: "rgba(232,224,204,0.38)", lineHeight: 1.65, margin: 0 }}>
            {item.desc}
          </p>
        )}
        {item.note && (
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "rgba(163,77,38,0.45)", marginTop: "4px" }}>
            {item.note}
          </p>
        )}
      </div>
      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", color: RUST, flexShrink: 0, paddingTop: "2px", fontWeight: 600 }}>
        {item.price}
      </span>
    </div>
  );
}

// ── Sub-group accordion ───────────────────────────────────────────────────────
function SubGroup({ group }: { group: any }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: "8px" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px", background: "rgba(111,133,102,0.08)",
          border: "none", borderBottom: "1px solid rgba(163,77,38,0.12)",
          cursor: "pointer", textAlign: "left",
        }}
      >
        <div>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.3em", color: RUST, textTransform: "uppercase", fontWeight: 600 }}>
            {group.label}
          </span>
          {group.note && (
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "rgba(232,224,204,0.3)", marginLeft: "12px" }}>
              · {group.note}
            </span>
          )}
        </div>
        {open
          ? <ChevronUp size={14} style={{ color: "rgba(163,77,38,0.5)", flexShrink: 0 }} />
          : <ChevronDown size={14} style={{ color: "rgba(163,77,38,0.5)", flexShrink: 0 }} />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            {group.items.map((item: any, i: number) => (
              <MenuItemRow key={i} item={item} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Category panel ────────────────────────────────────────────────────────────
function CategoryPanel({ cat }: { cat: MenuCategoryData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Category header */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: RUST, textTransform: "uppercase", marginBottom: "8px" }}>
          {cat.tagline}
        </p>
        <h2 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: IVORY, lineHeight: 1 }}>
          {cat.label}
        </h2>
        <div style={{ width: "40px", height: "1px", background: RUST, marginTop: "16px" }} />
      </div>

      {/* Sub-groups */}
      <div style={{ border: "1px solid rgba(163,77,38,0.12)", background: "rgba(17,49,34,0.4)" }}>
        {cat.subGroups.map((group, i) => (
          <SubGroup key={i} group={group} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Main Menu page ────────────────────────────────────────────────────────────
export default function Menus() {
  const [activeId, setActiveId] = useState(MENU_CATEGORIES[0].id);
  const activeCategory = MENU_CATEGORIES.find(c => c.id === activeId)!;

  return (
    <div style={{ background: TEAL, minHeight: "100vh" }}>

      {/* Page hero */}
      <div style={{ background: DARK, borderBottom: "1px solid rgba(163,77,38,0.15)", paddingTop: "120px", paddingBottom: "56px" }}>
        <div className="container mx-auto px-6">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.55em", color: RUST, textTransform: "uppercase", marginBottom: "1rem" }}>
            Raahi Indian Kitchen · Houston
          </p>
          {/* SEO H1 */}
          <h1 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: IVORY, lineHeight: 0.95, marginBottom: "1rem" }}>
            Our Menu
          </h1>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", color: "rgba(232,224,204,0.45)", maxWidth: "520px", lineHeight: 1.85 }}>
            Everything from tandoori starters and South Indian dosas to slow-cooked biryanis, street eats, and a full bar. Traditional recipes, fresh every day, in North Houston.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline" style={{ fontSize: "10px" }}>
              Reserve a Table
            </a>
            <a href="tel:+13467680068" className="btn-dark-filled" style={{ fontSize: "10px" }}>
              +1 (346) 768-0068
            </a>
          </div>
        </div>
      </div>

      {/* Menu layout */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar tabs */}
          <div className="lg:w-64 shrink-0">
            <div style={{ position: "sticky", top: "100px" }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: "rgba(163,77,38,0.55)", textTransform: "uppercase", marginBottom: "1rem" }}>
                Categories
              </p>
              <nav className="flex lg:flex-col gap-2 flex-wrap">
                {MENU_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveId(cat.id)}
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "12px",
                      letterSpacing: "0.05em",
                      border: "1px solid",
                      borderColor: activeId === cat.id ? "rgba(163,77,38,0.6)" : "rgba(163,77,38,0.1)",
                      background: activeId === cat.id ? "rgba(163,77,38,0.1)" : "transparent",
                      color: activeId === cat.id ? RUST : "rgba(232,224,204,0.45)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      width: "100%",
                      display: "block",
                    }}
                    onMouseEnter={e => {
                      if (activeId !== cat.id) {
                        (e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.75)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(163,77,38,0.25)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (activeId !== cat.id) {
                        (e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.45)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(163,77,38,0.1)";
                      }
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>

              {/* Info box */}
              <div style={{ marginTop: "2rem", padding: "20px", background: "rgba(163,77,38,0.06)", border: "1px solid rgba(163,77,38,0.15)" }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.4em", color: RUST, textTransform: "uppercase", marginBottom: "10px" }}>
                  Good to know
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.45)", lineHeight: 1.75 }}>
                  Paranthas available until 5 PM daily. Takeout & delivery available. Ask staff about allergens.
                </p>
                <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(163,77,38,0.12)" }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.4em", color: RUST, textTransform: "uppercase", marginBottom: "6px" }}>
                    Tue hours
                  </p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.45)" }}>
                    Opens 5 PM · Other days 11 AM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <CategoryPanel key={activeId} cat={activeCategory} />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ background: DARK, borderTop: "1px solid rgba(163,77,38,0.15)", padding: "64px 0" }}>
        <div className="container mx-auto px-6 text-center">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.45em", color: RUST, textTransform: "uppercase", marginBottom: "1rem" }}>
            Ready to order?
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3rem)", color: IVORY, marginBottom: "1rem" }}>
            Come in. We'll take care of the rest.
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "rgba(232,224,204,0.4)", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: 1.85 }}>
            Walk-ins welcome. Reservations recommended on weekends. Call us for same-day bookings.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">
              Reserve a Table
            </a>
            <a href="tel:+13467680068" className="btn-dark-filled">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
