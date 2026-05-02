import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const G="#d4af58",I="#e8e0cc",T="#0b1e14";
const SHIFT4 = "https://reservations.shift4payments.com/#/28a60320-b36c-4294-9eb4-0bc1b1d8e019";

const NAV = [
  { label:"Menu",         path:"/menus" },
  { label:"Gallery",      path:"/gallery" },
  { label:"Events",       path:"/events" },
  { label:"Our Story",    path:"/story" },
  { label:"Reservations", path:"/reservations" },
];

export const Navbar = () => {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoErr,  setLogoErr]  = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60]"
        style={{
          background: scrolled ? "rgba(11,30,20,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(212,175,88,0.1)" : "none",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          transition:"background 0.4s, border-color 0.4s",
        }}>
        <div className="flex items-center justify-between px-6 md:px-12" style={{ height:"76px" }}>

          {/* Logo */}
          <Link to="/" className="shrink-0 z-10">
            {!logoErr ? (
              <img src="/raahi-logo.png" alt="Raahi Indian Kitchen"
                style={{ height:scrolled?"42px":"50px", width:"auto", transition:"height 0.4s", filter:"brightness(1.05)" }}
                onError={() => setLogoErr(true)}/>
            ) : (
              <div>
                <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.7rem", color:I, lineHeight:1 }}>Raahi</p>
                <p style={{ fontFamily:"Jost,sans-serif", fontSize:"7px", letterSpacing:"0.42em", color:G, textTransform:"uppercase", marginTop:"2px" }}>Indian Kitchen</p>
              </div>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV.map(l => (
              <Link key={l.path} to={l.path}
                style={{
                  fontFamily:"Jost,sans-serif", fontSize:"11px", letterSpacing:"0.22em",
                  textTransform:"uppercase", textDecoration:"none",
                  color: location.pathname===l.path ? G : "rgba(232,224,204,0.45)",
                  transition:"color 0.3s",
                  borderBottom: location.pathname===l.path ? `1px solid ${G}` : "1px solid transparent",
                  paddingBottom:"2px",
                }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Reserve button */}
          <div className="flex items-center gap-3">
            <a href={SHIFT4} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex btn-primary-outline"
              style={{ fontSize:"10px", padding:"0.55rem 1.5rem" }}>
              Reserve
            </a>
            <button onClick={() => setOpen(o => !o)}
              className="flex flex-col gap-[5px] w-11 h-11 items-center justify-center lg:hidden"
              style={{ background:"none", border:"none", cursor:"pointer" }}>
              <span style={{ width:22, height:1, background:I, display:"block", transition:"transform 0.3s", transform:open?"rotate(45deg) translate(4px,4px)":"none" }}/>
              <span style={{ width:22, height:1, background:I, display:"block", opacity:open?0:1, transition:"opacity 0.2s" }}/>
              <span style={{ width:22, height:1, background:I, display:"block", transition:"transform 0.3s", transform:open?"rotate(-45deg) translate(4px,-4px)":"none" }}/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[55] flex flex-col"
            style={{ background:T }}
            initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
            transition={{ duration:0.45, ease:[0.76,0,0.24,1] }}>
            <div className="flex items-center justify-between px-6" style={{ height:"76px", borderBottom:"1px solid rgba(212,175,88,0.1)" }}>
              {!logoErr
                ? <img src="/raahi-logo.png" alt="Raahi" style={{ height:"44px", width:"auto" }} onError={()=>setLogoErr(true)}/>
                : <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.5rem", color:I }}>Raahi</p>
              }
              <button onClick={() => setOpen(false)} style={{ color:I, background:"none", border:"none", cursor:"pointer" }}>
                <X size={20}/>
              </button>
            </div>
            <nav className="flex flex-col px-8 pt-8 gap-0">
              {[{label:"Home",path:"/"},...NAV,{label:"Gift Cards",path:"/gift-cards"}].map((item,i) => (
                <motion.div key={item.path} initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.06 }}>
                  <Link to={item.path} onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 py-5 border-b"
                    style={{ borderColor:"rgba(232,224,204,0.07)", textDecoration:"none" }}>
                    <span style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", color:"rgba(212,175,88,0.5)", letterSpacing:"0.35em" }}>0{i+1}</span>
                    <span style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"2rem", color:location.pathname===item.path?G:I }}>
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto px-8 pb-12">
              <a href={SHIFT4} target="_blank" rel="noopener noreferrer"
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
