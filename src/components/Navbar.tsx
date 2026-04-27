import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReservation } from "@/contexts/ReservationContext";
import { Gift, ChevronDown, X } from "lucide-react";
import maayaLogo from "@/assets/maaya-logo.png";

// ─── Nav structure with optional sub-items ────────────────────────────────────
const NAV_ITEMS = [
  { num: "01", label: "Home",         path: "/",            subs: null },
  { num: "02", label: "Menu",         path: "/menus",       subs: [
    { label: "Signature Cocktails", path: "/menus" },
    { label: "Classic Cocktails",   path: "/menus" },
    { label: "Mocktails",           path: "/menus" },
    { label: "Bites & Plates",      path: "/menus" },
    { label: "Wine & Bubbles",      path: "/menus" },
  ]},
  { num: "03", label: "Gallery",      path: "/gallery",     subs: null },
  { num: "04", label: "Events",       path: "/events",      subs: [
    { label: "Sip & Paint",         path: "/events" },
    { label: "Sports Watch Party",  path: "/events" },
    { label: "Private Events",      path: "/events" },
  ]},
  { num: "05", label: "Story",        path: "/story",       subs: null },
  { num: "06", label: "Reservations", path: "/reservations",subs: null },
  { num: "07", label: "Gift Cards",   path: "/gift-cards",  subs: null },
];

// Desktop center links (02–06, no Gift Cards in the center strip)
const DESKTOP_LINKS = NAV_ITEMS.slice(1, 6);

export const Navbar = () => {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [expandedItem, setExpanded] = useState<string | null>(null);
  const location                  = useLocation();
  const { openWidget }            = useReservation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = () => { setOpen(false); setExpanded(null); };
  const toggleItem  = (label: string) =>
    setExpanded(prev => (prev === label ? null : label));

  return (
    <>
      {/* ── TOPBAR ────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-400 ${
          scrolled ? "bg-background/96 backdrop-blur-sm border-b border-border/20" : "bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between px-4 md:px-10 h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="shrink-0 z-10">
            <img src={maayaLogo} alt="Bar Maaya" className="h-11 md:h-14 w-auto" />
          </Link>

          {/* Desktop center nav (02–06) */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {DESKTOP_LINKS.map(l => (
              <Link key={l.path} to={l.path}
                className={`font-body text-[11px] tracking-[0.2em] transition-colors duration-200 ${
                  location.pathname === l.path ? "text-primary" : "text-foreground/55 hover:text-foreground"
                }`}>
                {l.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Mobile: Gift icon */}
            <Link
              to="/gift-cards"
              className="md:hidden flex items-center justify-center w-11 h-11"
              style={{ color: "#C9A84C" }}
              aria-label="Gift Cards"
            >
              <Gift size={17} />
            </Link>

            {/* Desktop: GIFT CARDS outline button */}
            <Link
              to="/gift-cards"
              className="hidden md:inline-flex items-center gap-1.5 font-body text-[11px] tracking-[0.15em] transition-colors duration-200"
              style={{
                border: "1px solid rgba(201,168,76,0.5)",
                color: "#C9A84C",
                background: "transparent",
                padding: "8px 20px",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <Gift size={12} />
              GIFT CARDS
            </Link>

            {/* Mobile: Reserve outline */}
            <button
              onClick={openWidget}
              className="md:hidden font-body text-[11px] tracking-[0.12em]"
              style={{
                border: "1px solid #C9A84C",
                color: "#C9A84C",
                background: "transparent",
                padding: "8px 14px",
                letterSpacing: "0.12em",
              }}
            >
              Reserve
            </button>

            {/* Desktop: RESERVE filled */}
            <button
              onClick={openWidget}
              className="hidden md:inline-block font-body text-[11px] tracking-[0.2em] bg-primary text-background px-5 py-2.5 hover:bg-primary/80 transition-colors duration-200"
            >
              RESERVE
            </button>

            {/* Hamburger — 44×44 tap target */}
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
              className="flex flex-col gap-[5px] items-center justify-center w-11 h-11"
            >
              <motion.span className="block bg-foreground origin-center"
                style={{ height: "1.5px", width: "18px" }}
                animate={open ? { rotate: -45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }} />
              <motion.span className="block bg-foreground"
                style={{ height: "1.5px", width: "18px" }}
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }} />
              <motion.span className="block bg-foreground origin-center"
                style={{ height: "1.5px", width: "18px" }}
                animate={open ? { rotate: 45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── FULL-SCREEN OVERLAY ───────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[70] flex flex-col"
            style={{ background: "rgba(10,8,4,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overlay top bar */}
            <div
              className="flex items-center justify-between px-4 md:px-10 h-16 md:h-20 border-b border-border/15"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
              <Link to="/" onClick={handleClose}>
                <img src={maayaLogo} alt="Bar Maaya" className="h-11 md:h-14 w-auto" />
              </Link>
              <button
                onClick={handleClose}
                className="w-11 h-11 flex items-center justify-center border border-primary/25 hover:border-primary/60 transition-colors"
                aria-label="Close menu"
              >
                <X size={15} style={{ color: "#C9A84C" }} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 md:px-16 py-4">
              {NAV_ITEMS.map((item, index) => {
                const isActive  = location.pathname === item.path;
                const isExpanded = expandedItem === item.label;
                const hasSubs   = !!item.subs;

                return (
                  <motion.div
                    key={item.path + item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="border-b border-border/10 last:border-0"
                  >
                    {/* Main item row */}
                    {hasSubs ? (
                      <button
                        type="button"
                        onClick={() => toggleItem(item.label)}
                        className="flex items-center gap-5 py-3 md:py-4 w-full group"
                      >
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(201,168,76,0.5)", width: "28px", flexShrink: 0 }}>
                          {item.num}
                        </span>
                        <span
                          style={{
                            fontFamily: '"Crimson Pro", serif',
                            fontStyle: "italic",
                            fontSize: "clamp(28px, 4.5vw, 48px)",
                            color: isActive ? "#C9A84C" : "#F5ECD7",
                            transition: "color 0.2s",
                            lineHeight: 1.1,
                          }}
                          className="group-hover:!text-[#C9A84C] flex-1 text-left"
                        >
                          {item.label}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ color: "rgba(201,168,76,0.5)", flexShrink: 0 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>
                    ) : (
                      <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                        <Link
                          to={item.path}
                          onClick={handleClose}
                          className="flex items-center gap-5 py-3 md:py-4 group"
                        >
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(201,168,76,0.5)", width: "28px", flexShrink: 0 }}>
                            {item.num}
                          </span>
                          <span
                            style={{
                              fontFamily: '"Crimson Pro", serif',
                              fontStyle: "italic",
                              fontSize: "clamp(28px, 4.5vw, 48px)",
                              color: isActive ? "#C9A84C" : "#F5ECD7",
                              transition: "color 0.2s",
                              lineHeight: 1.1,
                            }}
                            className="group-hover:!text-[#C9A84C]"
                          >
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    )}

                    {/* Sub-items accordion */}
                    <AnimatePresence initial={false}>
                      {hasSubs && isExpanded && item.subs && (
                        <motion.div
                          key="subs"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="pl-[52px] pb-3 flex flex-col gap-1">
                            {item.subs.map(sub => (
                              <Link
                                key={sub.label}
                                to={sub.path}
                                onClick={handleClose}
                                className="group flex items-center gap-3 py-2"
                              >
                                <span style={{ width: "6px", height: "1px", background: "rgba(201,168,76,0.35)", flexShrink: 0 }} />
                                <span
                                  style={{ fontFamily: "var(--font-body)", fontSize: "13px", letterSpacing: "0.06em", color: "rgba(201,168,76,0.65)", transition: "color 0.2s" }}
                                  className="group-hover:!text-[#C9A84C]"
                                >
                                  {sub.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom bar */}
            <div className="px-6 md:px-16 py-6 border-t border-border/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-body text-[10px] tracking-[0.4em] text-foreground/30 mb-1">TORONTO</p>
                <p className="font-body text-sm text-foreground/50">244 Adelaide St West</p>
              </div>
              <button
                onClick={() => { handleClose(); openWidget(); }}
                className="font-body text-[11px] tracking-[0.2em] bg-primary text-background px-6 py-3 hover:bg-primary/80 transition-colors"
              >
                RESERVE A TABLE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
