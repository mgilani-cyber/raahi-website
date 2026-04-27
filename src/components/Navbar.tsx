import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, X } from "lucide-react";
import { RESERVATION_URL } from "@/constants";

const NAV_ITEMS = [
  { num: "01", label: "Home",         path: "/" },
  { num: "02", label: "Menu",         path: "/menus" },
  { num: "03", label: "Gallery",      path: "/gallery" },
  { num: "04", label: "Events",       path: "/events" },
  { num: "05", label: "Story",        path: "/story" },
  { num: "06", label: "Reservations", path: "/reservations" },
  { num: "07", label: "Gift Cards",   path: "/gift-cards" },
  { num: "08", label: "Catering",     path: "/catering" },
];

const DESKTOP_LINKS = NAV_ITEMS.slice(1, 7);

export const Navbar = () => {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-400 ${
          scrolled
            ? "backdrop-blur-sm border-b"
            : "bg-transparent"
        }`}
        style={{
          background: scrolled ? "rgba(17,49,34,0.97)" : "transparent",
          borderColor: scrolled ? "rgba(163,77,38,0.15)" : "transparent",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="flex items-center justify-between px-4 md:px-10 h-16 md:h-20">

          {/* Logo / Wordmark */}
          <Link to="/" className="shrink-0 z-10">
            <div style={{ lineHeight: 1 }}>
              <p style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.6rem",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#e8e0cc",
                letterSpacing: "0.05em",
              }}>Raahi</p>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "7px",
                letterSpacing: "0.4em",
                color: "#a34d26",
                textTransform: "uppercase",
                marginTop: "1px",
              }}>Indian Bistro</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {DESKTOP_LINKS.map(l => (
              <Link key={l.path} to={l.path}
                className={`font-body text-[11px] tracking-[0.2em] transition-colors duration-200 uppercase ${
                  location.pathname === l.path
                    ? "text-primary"
                    : "text-foreground/50 hover:text-foreground"
                }`}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/gift-cards"
              className="md:hidden flex items-center justify-center w-11 h-11"
              style={{ color: "#a34d26" }}
              aria-label="Gift Cards">
              <Gift size={17} />
            </Link>

            <Link to="/gift-cards"
              className="hidden md:inline-flex items-center gap-1.5 font-body text-[11px] tracking-[0.15em] transition-colors duration-200 uppercase"
              style={{
                border: "1px solid rgba(163,77,38,0.45)",
                color: "rgba(163,77,38,0.85)",
                padding: "0.45rem 1.1rem",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#a34d26"; (e.currentTarget as HTMLElement).style.color = "#e8e0cc"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(163,77,38,0.85)"; }}
            >
              Gift Cards
            </Link>

            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex btn-primary-outline text-[10px]">
              Reserve
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(o => !o)}
              className="flex flex-col gap-[5px] w-11 h-11 items-center justify-center lg:hidden"
              aria-label="Menu"
            >
              <span style={{ width: 22, height: 1, background: "#e8e0cc", display: "block", transition: "transform 0.3s", transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ width: 22, height: 1, background: "#e8e0cc", display: "block", opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
              <span style={{ width: 22, height: 1, background: "#e8e0cc", display: "block", transition: "transform 0.3s", transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col"
            style={{ background: "#113122" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: "rgba(163,77,38,0.15)" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontStyle: "italic", color: "#e8e0cc" }}>Raahi</p>
              <button onClick={() => setOpen(false)} style={{ color: "#e8e0cc" }}><X size={20} /></button>
            </div>
            <nav className="flex flex-col px-6 pt-10 gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.div key={item.path}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}>
                  <Link to={item.path}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 border-b"
                    style={{ borderColor: "rgba(232,224,204,0.08)" }}>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", color: "#a34d26", letterSpacing: "0.3em" }}>{item.num}</span>
                    <span style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem", fontStyle: "italic", color: location.pathname === item.path ? "#a34d26" : "#e8e0cc" }}>
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto px-6 pb-12">
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary-outline w-full text-center block">
                Reserve a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
