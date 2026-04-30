import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const G="#d4af58",I="#e8e0cc",T="#0b1e14";

const SECTIONS = [
  {
    id:"dining",
    label:"Dining Room",
    position:{ left:"22%", top:"38%" },
    photos:[
      { src:"/raahi/11.03.25RaahiIndianKitchen_0013.jpg", caption:"The main dining room" },
      { src:"/raahi/RAAHI (5).png",  caption:"Warm lighting, comfortable booths" },
      { src:"/raahi/RAAHI (6).png",  caption:"Teal velvet with gold lion hardware" },
    ]
  },
  {
    id:"bar",
    label:"Bar & Cocktails",
    position:{ left:"58%", top:"28%" },
    photos:[
      { src:"/raahi/RAAHI (7).png",                       caption:"The bar at Raahi" },
      { src:"/raahi/RAAHI (8).png",                       caption:"Crafted cocktails" },
      { src:"/raahi/11.03.25RaahiIndianKitchen_0038.jpg", caption:"Raahi Hurricane" },
    ]
  },
  {
    id:"food",
    label:"Signature Dishes",
    position:{ left:"72%", top:"55%" },
    photos:[
      { src:"/raahi/11.03.25RaahiIndianKitchen_0098.jpg",                   caption:"From the kitchen" },
      { src:"/raahi/ChatGPT Image Aug 26, 2025 at 01_15_58 PM.png",        caption:"Starters" },
      { src:"/raahi/ChatGPT Image Aug 26, 2025 at 01_18_20 PM.png",        caption:"Mains" },
      { src:"/raahi/ChatGPT Image Aug 26, 2025 at 04_05_41 PM.png",        caption:"Desserts" },
    ]
  },
  {
    id:"events",
    label:"Private Events",
    position:{ left:"35%", top:"62%" },
    photos:[
      { src:"/raahi/RAAHI (4)-2.jpg", caption:"Private dining" },
      { src:"/raahi/RAAHI (4).png",   caption:"Your celebration, our space" },
      { src:"/raahi/H.jpg",           caption:"Events at Raahi" },
    ]
  },
];

function HotspotLabel({ label, active, onClick }: { label:string; active:boolean; onClick:()=>void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"none", border:"none", cursor:"pointer", padding:0,
        display:"flex", alignItems:"center", gap:"10px",
      }}>
      {/* Animated dot */}
      <div style={{ position:"relative", width:"10px", height:"10px" }}>
        <div style={{
          position:"absolute", inset:0, borderRadius:"50%",
          background: active||hovered ? G : "rgba(212,175,88,0.5)",
          transition:"background 0.3s",
        }}/>
        {(hovered||active) && (
          <motion.div
            initial={{ scale:1, opacity:0.6 }}
            animate={{ scale:2.5, opacity:0 }}
            transition={{ duration:1, repeat:Infinity }}
            style={{ position:"absolute", inset:0, borderRadius:"50%", background:G }}/>
        )}
      </div>
      {/* Label */}
      <span style={{
        fontFamily:"Jost,sans-serif", fontSize:"11px", letterSpacing:"0.32em",
        textTransform:"uppercase", color: hovered||active ? G : "rgba(232,224,204,0.7)",
        transition:"color 0.3s", whiteSpace:"nowrap",
      }}>
        → {label}
      </span>
    </button>
  );
}

function PhotoOverlay({ section, onClose }: { section:typeof SECTIONS[0]; onClose:()=>void }) {
  const [idx, setIdx] = useState(0);
  const photo = section.photos[idx];
  const total = section.photos.length;

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.4 }}>

      {/* Dark backdrop */}
      <div style={{ position:"absolute", inset:0, background:"rgba(11,30,20,0.97)" }} onClick={onClose}/>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img key={idx} src={photo.src} alt={photo.caption}
          initial={{ opacity:0, scale:1.04 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0, scale:0.97 }}
          transition={{ duration:0.5 }}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.55)" }}/>
      </AnimatePresence>

      {/* Gradient */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(11,30,20,0.6) 0%,transparent 30%,transparent 60%,rgba(11,30,20,0.92) 100%)", pointerEvents:"none" }}/>

      {/* Top bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, padding:"32px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:10 }}>
        <div>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.55em", color:"rgba(212,175,88,0.5)", textTransform:"uppercase", marginBottom:"4px" }}>Raahi Indian Kitchen</p>
          <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.4rem", color:I }}>{section.label}</p>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"1px solid rgba(212,175,88,0.25)", color:"rgba(232,224,204,0.5)", cursor:"pointer", width:"40px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <X size={16}/>
        </button>
      </div>

      {/* Prev */}
      {idx > 0 && (
        <motion.button onClick={() => setIdx(i=>i-1)}
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          whileHover={{ scale:1.1 }}
          style={{ position:"absolute", left:"32px", top:"50%", transform:"translateY(-50%)", zIndex:10,
            width:"50px", height:"50px", borderRadius:"50%", border:"1px solid rgba(212,175,88,0.3)",
            background:"rgba(11,30,20,0.7)", backdropFilter:"blur(12px)",
            color:G, fontSize:"18px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          ←
        </motion.button>
      )}

      {/* Next */}
      {idx < total-1 && (
        <motion.button onClick={() => setIdx(i=>i+1)}
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          whileHover={{ scale:1.1 }}
          style={{ position:"absolute", right:"32px", top:"50%", transform:"translateY(-50%)", zIndex:10,
            width:"50px", height:"50px", borderRadius:"50%", border:"1px solid rgba(212,175,88,0.3)",
            background:"rgba(11,30,20,0.7)", backdropFilter:"blur(12px)",
            color:G, fontSize:"18px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          →
        </motion.button>
      )}

      {/* Bottom */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 40px 40px", zIndex:10 }}>
        <AnimatePresence mode="wait">
          <motion.p key={idx}
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.3em", color:"rgba(232,224,204,0.4)", textTransform:"uppercase", marginBottom:"16px" }}>
            {photo.caption} · {idx+1} / {total}
          </motion.p>
        </AnimatePresence>
        {/* Dots */}
        <div style={{ display:"flex", gap:"6px" }}>
          {section.photos.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{ width:i===idx?"22px":"6px", height:"6px", borderRadius:"3px",
                background:i===idx ? G : "rgba(212,175,88,0.25)",
                border:"none", cursor:"pointer", transition:"all 0.3s", padding:0 }}/>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<string|null>(null);
  const activeSection = SECTIONS.find(s => s.id === active) || null;

  return (
    <div style={{ position:"fixed", inset:0, background:T, overflow:"hidden" }}>

      {/* Hero background */}
      <img src="/raahi/11.03.25RaahiIndianKitchen_0013.jpg"
        alt="Raahi Indian Kitchen"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.45)" }}/>

      {/* Gradients */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(11,30,20,0.7) 0%,transparent 40%,rgba(11,30,20,0.6) 100%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(11,30,20,0.5) 0%,transparent 50%)", pointerEvents:"none" }}/>

      {/* Top bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, padding:"32px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:10 }}>
        <div>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.55em", color:"rgba(212,175,88,0.5)", textTransform:"uppercase", marginBottom:"3px" }}>Explore</p>
          <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.3rem", color:I }}>Raahi Indian Kitchen</p>
        </div>
        <Link to="/" style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.4em", color:"rgba(212,175,88,0.4)", textTransform:"uppercase", textDecoration:"none" }}>
          ← Back to Site
        </Link>
      </div>

      {/* Hotspots — positioned over hero */}
      {SECTIONS.map(section => (
        <div key={section.id}
          style={{ position:"absolute", zIndex:10, ...section.position }}>
          {/* Connecting line */}
          <div style={{ position:"absolute", left:"-24px", top:"50%", width:"18px", height:"1px", background:`rgba(212,175,88,0.3)` }}/>
          <HotspotLabel
            label={section.label}
            active={active===section.id}
            onClick={() => setActive(section.id)}/>
        </div>
      ))}

      {/* Bottom tagline */}
      <div style={{ position:"absolute", bottom:"40px", left:"40px", zIndex:10 }}>
        <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.2rem,2.5vw,1.8rem)", color:"rgba(232,224,204,0.6)", marginBottom:"4px" }}>
          Click a space to explore.
        </p>
        <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.45em", color:"rgba(212,175,88,0.4)", textTransform:"uppercase" }}>
          17695 Tomball Pkwy · Houston, TX
        </p>
      </div>

      {/* Mobile fallback — list of hotspots */}
      <div className="md:hidden" style={{ position:"absolute", bottom:"100px", left:0, right:0, zIndex:10, padding:"0 32px", display:"flex", flexDirection:"column", gap:"12px" }}>
        {SECTIONS.map(s => (
          <HotspotLabel key={s.id} label={s.label} active={active===s.id} onClick={() => setActive(s.id)}/>
        ))}
      </div>

      {/* Photo overlay */}
      <AnimatePresence>
        {activeSection && (
          <PhotoOverlay section={activeSection} onClose={() => setActive(null)}/>
        )}
      </AnimatePresence>
    </div>
  );
}
