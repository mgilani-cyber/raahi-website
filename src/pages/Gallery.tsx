import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const G="#d4af58",I="#e8e0cc",T="#0b1e14";

const SECTIONS = [
  {
    id:"dining",
    label:"Dining Room",
    position:{ left:"28%", top:"42%" },
    hero:"/raahi/raahi-dining-full.png",
    photos:[
      { src:"/raahi/raahi-dining-full.png", caption:"The main dining room" },
      { src:"/raahi/raahi-chairs.png",       caption:"Teal velvet with gold lion hardware" },
      { src:"/raahi/RAAHI (5).png",          caption:"Warm lighting, comfortable booths" },
      { src:"/raahi/RAAHI (6).png",          caption:"Every detail considered" },
    ]
  },
  {
    id:"bar",
    label:"Bar & Cocktails",
    position:{ left:"62%", top:"30%" },
    hero:"/raahi/RAAHI (7).png",
    photos:[
      { src:"/raahi/RAAHI (7).png",                       caption:"The bar at Raahi" },
      { src:"/raahi/RAAHI (8).png",                       caption:"Crafted cocktails" },
      { src:"/raahi/11.03.25RaahiIndianKitchen_0038.jpg", caption:"Raahi Hurricane · $13" },
    ]
  },
  {
    id:"food",
    label:"Signature Dishes",
    position:{ left:"70%", top:"58%" },
    hero:"/raahi/11.03.25RaahiIndianKitchen_0098.jpg",
    photos:[
      { src:"/raahi/11.03.25RaahiIndianKitchen_0098.jpg",                  caption:"From our kitchen" },
      { src:"/raahi/ChatGPT Image Aug 26, 2025 at 01_15_58 PM.png",       caption:"Starters" },
      { src:"/raahi/ChatGPT Image Aug 26, 2025 at 01_18_20 PM.png",       caption:"Mains" },
      { src:"/raahi/ChatGPT Image Aug 26, 2025 at 04_05_41 PM.png",       caption:"Desserts" },
    ]
  },
  {
    id:"events",
    label:"Private Events",
    position:{ left:"22%", top:"62%" },
    hero:"/raahi/raahi-lounge.png",
    photos:[
      { src:"/raahi/raahi-lounge.png",   caption:"Intimate lounge seating" },
      { src:"/raahi/raahi-entrance.png", caption:"Your guests arrive in style" },
      { src:"/raahi/RAAHI (4)-2.jpg",    caption:"Private dining" },
    ]
  },
  {
    id:"outside",
    label:"Find Us",
    position:{ left:"45%", top:"20%" },
    hero:"/raahi/raahi-exterior.png",
    photos:[
      { src:"/raahi/raahi-exterior.png", caption:"17695 Tomball Pkwy · North Houston" },
      { src:"/raahi/raahi-door.png",     caption:"Welcome to Raahi" },
      { src:"/raahi/raahi-entrance.png", caption:"Reception" },
    ]
  },
];

function Hotspot({ section, onClick }: { section: typeof SECTIONS[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position:"absolute", ...section.position, zIndex:10, transform:"translate(-50%,-50%)" }}>
      <button onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"12px", padding:"8px 0" }}>
        {/* Pulsing dot */}
        <div style={{ position:"relative", width:"12px", height:"12px", flexShrink:0 }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", background: hovered ? G : "rgba(212,175,88,0.8)", transition:"background 0.3s" }}/>
          {hovered && (
            <motion.div initial={{ scale:1, opacity:0.5 }} animate={{ scale:2.8, opacity:0 }}
              transition={{ duration:1.2, repeat:Infinity }}
              style={{ position:"absolute", inset:0, borderRadius:"50%", background:G }}/>
          )}
        </div>
        {/* Label */}
        <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration:0.2 }}>
          <span style={{
            fontFamily:"Jost,sans-serif", fontSize:"11px", letterSpacing:"0.35em",
            textTransform:"uppercase", whiteSpace:"nowrap",
            color: hovered ? G : "rgba(232,224,204,0.75)",
            transition:"color 0.3s",
          }}>
            {section.label} →
          </span>
        </motion.div>
      </button>
      {/* Connecting line */}
      {hovered && (
        <motion.div initial={{ width:0 }} animate={{ width:"40px" }}
          style={{ height:"1px", background:`rgba(212,175,88,0.4)`, marginLeft:"24px" }}/>
      )}
    </div>
  );
}

function PhotoPanel({ section, onClose }: { section: typeof SECTIONS[0]; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const photo = section.photos[idx];
  const total = section.photos.length;

  return (
    <motion.div className="fixed inset-0 z-50"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.5 }}>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img key={idx} src={photo.src} alt={photo.caption}
          initial={{ opacity:0, scale:1.04 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.97 }}
          transition={{ duration:0.6, ease:[0.25,0.46,0.45,0.94] }}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.52)" }}/>
      </AnimatePresence>

      {/* Overlays */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(11,30,20,0.72) 0%,transparent 28%,transparent 58%,rgba(11,30,20,0.92) 100%)", pointerEvents:"none" }}/>

      {/* Top */}
      <div style={{ position:"absolute", top:0, left:0, right:0, padding:"36px 48px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", zIndex:10 }}>
        <div>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.58em", color:"rgba(212,175,88,0.5)", textTransform:"uppercase", marginBottom:"5px" }}>
            Raahi Indian Kitchen
          </p>
          <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.8rem", color:I, margin:0 }}>
            {section.label}
          </h2>
        </div>
        <button onClick={onClose}
          style={{ background:"rgba(11,30,20,0.6)", border:"1px solid rgba(212,175,88,0.25)", color:"rgba(232,224,204,0.5)", cursor:"pointer", width:"44px", height:"44px", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(12px)", transition:"border-color 0.3s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor="rgba(212,175,88,0.6)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor="rgba(212,175,88,0.25)"}>
          <X size={15}/>
        </button>
      </div>

      {/* Prev */}
      <AnimatePresence>
        {idx > 0 && (
          <motion.button initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
            onClick={() => setIdx(i => i-1)}
            style={{ position:"absolute", left:"36px", top:"50%", transform:"translateY(-50%)", zIndex:10,
              width:"52px", height:"52px", borderRadius:"50%", border:"1px solid rgba(212,175,88,0.28)",
              background:"rgba(11,30,20,0.7)", backdropFilter:"blur(16px)", color:G,
              fontSize:"20px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            ←
          </motion.button>
        )}
      </AnimatePresence>

      {/* Next */}
      <AnimatePresence>
        {idx < total-1 && (
          <motion.button initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
            onClick={() => setIdx(i => i+1)}
            style={{ position:"absolute", right:"36px", top:"50%", transform:"translateY(-50%)", zIndex:10,
              width:"52px", height:"52px", borderRadius:"50%", border:"1px solid rgba(212,175,88,0.28)",
              background:"rgba(11,30,20,0.7)", backdropFilter:"blur(16px)", color:G,
              fontSize:"20px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            →
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 48px 44px", zIndex:10 }}>
        <AnimatePresence mode="wait">
          <motion.p key={idx} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.3em", color:"rgba(232,224,204,0.38)", textTransform:"uppercase", marginBottom:"18px" }}>
            {photo.caption} &nbsp;·&nbsp; {idx+1} / {total}
          </motion.p>
        </AnimatePresence>
        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          {section.photos.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{ width:i===idx?"24px":"7px", height:"7px", borderRadius:"4px",
                background:i===idx ? G : "rgba(212,175,88,0.22)",
                border:"none", cursor:"pointer", transition:"all 0.35s", padding:0 }}/>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<string|null>(null);
  const activeSection = SECTIONS.find(s => s.id === active) ?? null;

  return (
    <div style={{ position:"fixed", inset:0, background:T, overflow:"hidden" }}>

      {/* Hero bg — the dining room is the "mansion" */}
      <img src="/raahi/raahi-dining-wide.png" alt="Raahi Indian Kitchen"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.4) saturate(0.8)" }}/>

      {/* Mood overlays */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(11,30,20,0.75) 0%,rgba(11,30,20,0.3) 50%,rgba(11,30,20,0.65) 100%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(11,30,20,0.55) 0%,transparent 40%,rgba(11,30,20,0.7) 100%)", pointerEvents:"none" }}/>

      {/* Top bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, padding:"36px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:10 }}>
        <div>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"8px", letterSpacing:"0.65em", color:"rgba(212,175,88,0.45)", textTransform:"uppercase", marginBottom:"4px" }}>
            Explore
          </p>
          <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.4rem", color:"rgba(232,224,204,0.85)" }}>
            Raahi Indian Kitchen
          </p>
        </div>
        <Link to="/" style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.4em", color:"rgba(212,175,88,0.38)", textTransform:"uppercase", textDecoration:"none", transition:"color 0.3s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="rgba(212,175,88,0.8)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(212,175,88,0.38)"}>
          ← Back to Site
        </Link>
      </div>

      {/* Hotspots over the scene */}
      {SECTIONS.map(section => (
        <Hotspot key={section.id} section={section} onClick={() => setActive(section.id)}/>
      ))}

      {/* Bottom label */}
      <div style={{ position:"absolute", bottom:"44px", left:"48px", zIndex:10 }}>
        <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1rem,2vw,1.5rem)", color:"rgba(232,224,204,0.45)", marginBottom:"6px" }}>
          Select a space to explore.
        </p>
        <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.48em", color:"rgba(212,175,88,0.35)", textTransform:"uppercase" }}>
          17695 Tomball Pkwy · Houston, TX
        </p>
      </div>

      {/* Mobile hotspot list */}
      <div className="md:hidden" style={{ position:"absolute", bottom:"120px", left:0, right:0, zIndex:10, padding:"0 36px", display:"flex", flexDirection:"column", gap:"16px" }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            style={{ background:"rgba(11,30,20,0.7)", border:"1px solid rgba(212,175,88,0.2)", padding:"12px 20px", color:G, fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.3em", textTransform:"uppercase", cursor:"pointer", textAlign:"left", backdropFilter:"blur(12px)" }}>
            {s.label} →
          </button>
        ))}
      </div>

      {/* Photo panel overlay */}
      <AnimatePresence>
        {activeSection && (
          <PhotoPanel key={activeSection.id} section={activeSection} onClose={() => setActive(null)}/>
        )}
      </AnimatePresence>
    </div>
  );
}
