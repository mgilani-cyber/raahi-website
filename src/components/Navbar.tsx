import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { RESERVATION_URL } from "@/constants";

const NAV = [
  { label: "Menu",         path: "/menus" },
  { label: "Gallery",      path: "/gallery" },
  { label: "Events",       path: "/events" },
  { label: "Our Story",    path: "/story" },
  { label: "Reservations", path: "/reservations" },
];

const R="#a34d26", I="#e8e0cc", T="#113122";

export const Navbar = () => {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500"
        style={{
          background: scrolled ? "rgba(17,49,34,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(212,175,88,0.12)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}>
        <div className="flex items-center justify-between px-6 md:px-12 h-20">

          {/* Logo */}
          <Link to="/" className="shrink-0 z-10">
            <img src="/raahi-logo.png" alt="Raahi Indian Kitchen"
              style={{ height: scrolled ? "44px" : "52px", width: "auto", transition: "height 0.4s ease", filter: "brightness(1.05)" }} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV.map(l => (
              <Link key={l.path} to={l.path}
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: location.pathname === l.path ? "#d4af58" : "rgba(232,224,204,0.55)",
                  transition: "color 0.3s",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { if(location.pathname!==l.path)(e.currentTarget as HTMLElement).style.color=I; }}
                onMouseLeave={e => { if(location.pathname!==l.path)(e.currentTarget as HTMLElement).style.color="rgba(232,224,204,0.55)"; }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Reserve button */}
          <div className="flex items-center gap-3">
            <Link to="/reservations"
              className="hidden md:inline-flex btn-primary-outline"
              style={{ fontSize: "10px", padding: "0.6rem 1.6rem", borderColor: "#d4af58", color: "#d4af58" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color=T; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="#d4af58"; }}>
              Reserve
            </Link>
            <button onClick={() => setOpen(o => !o)}
              className="flex flex-col gap-[5px] w-11 h-11 items-center justify-center lg:hidden">
              <span style={{ width:22, height:1, background:I, display:"block", transition:"transform 0.3s", transform: open?"rotate(45deg) translate(4px,4px)":"none" }}/>
              <span style={{ width:22, height:1, background:I, display:"block", opacity: open?0:1, transition:"opacity 0.2s" }}/>
              <span style={{ width:22, height:1, background:I, display:"block", transition:"transform 0.3s", transform: open?"rotate(-45deg) translate(4px,-4px)":"none" }}/>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[55] flex flex-col"
            style={{ background: T }}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.76,0,0.24,1] }}>
            <div className="flex items-center justify-between px-6 h-20 border-b" style={{ borderColor: "rgba(212,175,88,0.15)" }}>
              <img src="/raahi-logo.png" alt="Raahi" style={{ height: "44px", width: "auto" }} />
              <button onClick={() => setOpen(false)} style={{ color: I, background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <nav className="flex flex-col px-8 pt-10 gap-1">
              {[{label:"Home",path:"/"},...NAV,{label:"Gift Cards",path:"/gift-cards"}].map((item, i) => (
                <motion.div key={item.path} initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.06 }}>
                  <Link to={item.path} onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 py-5 border-b"
                    style={{ borderColor: "rgba(232,224,204,0.07)", textDecoration: "none" }}>
                    <span style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", color:"#d4af58", letterSpacing:"0.3em" }}>0{i+1}</span>
                    <span style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"2rem", color: location.pathname===item.path?"#d4af58":I }}>
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto px-8 pb-12">
              <Link to="/reservations" onClick={() => setOpen(false)}
                className="btn-primary-outline w-full text-center block" style={{ borderColor:"#d4af58", color:"#d4af58" }}>
                Reserve a Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
