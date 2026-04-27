import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { RESERVATION_URL } from "@/constants";

const NAV = [
  { label: "Home",         path: "/" },
  { label: "Menu",         path: "/menus" },
  { label: "Gallery",      path: "/gallery" },
  { label: "Events",       path: "/events" },
  { label: "Our Story",    path: "/story" },
  { label: "Reservations", path: "/reservations" },
  { label: "Gift Cards",   path: "/gift-cards" },
];

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
      <header className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300"
        style={{ background: scrolled ? "rgba(17,49,34,0.97)" : "transparent", borderBottom: scrolled ? "1px solid rgba(163,77,38,0.15)" : "none" }}>
        <div className="flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
          <Link to="/">
            <div>
              <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", fontSize: "1.6rem", color: "#e8e0cc", letterSpacing: "0.05em", lineHeight: 1 }}>Raahi</p>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "7px", letterSpacing: "0.4em", color: "#a34d26", textTransform: "uppercase", marginTop: "2px" }}>Indian Kitchen</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV.slice(1, 6).map(l => (
              <Link key={l.path} to={l.path}
                style={{ fontFamily: "Jost, sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: location.pathname === l.path ? "#a34d26" : "rgba(232,224,204,0.5)", transition: "color 0.2s" }}
                onMouseEnter={e => { if(location.pathname !== l.path) (e.currentTarget as HTMLElement).style.color = "#e8e0cc"; }}
                onMouseLeave={e => { if(location.pathname !== l.path) (e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.5)"; }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex btn-primary-outline" style={{ fontSize: "10px", padding: "0.6rem 1.4rem" }}>
              Reserve
            </a>
            <button onClick={() => setOpen(o => !o)} className="flex flex-col gap-[5px] w-11 h-11 items-center justify-center lg:hidden">
              <span style={{ width: 22, height: 1, background: "#e8e0cc", display: "block", transition: "transform 0.3s", transform: open ? "rotate(45deg) translate(4px,4px)" : "none" }} />
              <span style={{ width: 22, height: 1, background: "#e8e0cc", display: "block", opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
              <span style={{ width: 22, height: 1, background: "#e8e0cc", display: "block", transition: "transform 0.3s", transform: open ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[55] flex flex-col"
            style={{ background: "#113122" }}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.76,0,0.24,1] }}>
            <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: "rgba(163,77,38,0.15)" }}>
              <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", fontSize: "1.4rem", color: "#e8e0cc" }}>Raahi</p>
              <button onClick={() => setOpen(false)} style={{ color: "#e8e0cc", background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <nav className="flex flex-col px-6 pt-10 gap-1">
              {NAV.map((item, i) => (
                <motion.div key={item.path} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link to={item.path} onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 border-b"
                    style={{ borderColor: "rgba(232,224,204,0.08)" }}>
                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: "9px", color: "#a34d26", letterSpacing: "0.3em" }}>0{i+1}</span>
                    <span style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", fontSize: "1.8rem", color: location.pathname === item.path ? "#a34d26" : "#e8e0cc" }}>
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto px-6 pb-12">
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline w-full text-center block">
                Reserve a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
