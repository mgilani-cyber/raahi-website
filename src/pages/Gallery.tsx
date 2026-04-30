import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const G="#d4af58", I="#e8e0cc";

const SCENES = [
  { id:"exterior", image:"/raahi/raahi-exterior.png",    location:"Outside",        description:"17695 Tomball Pkwy · North Houston",              hotspot:{ label:"Enter Raahi →",           x:"48%", y:"60%" } },
  { id:"door",     image:"/raahi/raahi-door.png",         location:"Entrance",       description:"Welcome to Raahi Indian Kitchen",                  hotspot:{ label:"Step Inside →",           x:"50%", y:"52%" } },
  { id:"lobby",    image:"/raahi/raahi-entrance.png",     location:"Reception",      description:"Be welcomed by our team",                          hotspot:{ label:"Enter the Dining Room →", x:"55%", y:"50%" } },
  { id:"dining",   image:"/raahi/raahi-dining-full.png",  location:"Dining Room",    description:"Warm pendant lights · Teal velvet booths",          hotspot:{ label:"See the Detail →",       x:"35%", y:"55%" } },
  { id:"chairs",   image:"/raahi/raahi-chairs.png",       location:"Dining Room",    description:"Gold lion hardware on every chair",                 hotspot:{ label:"Explore the Lounge →",   x:"65%", y:"42%" } },
  { id:"lounge",   image:"/raahi/raahi-lounge.png",       location:"The Lounge",     description:"Intimate round tables · Private gatherings",        hotspot:{ label:"Visit the Bar →",        x:"42%", y:"38%" } },
  { id:"bar",      image:"/raahi/RAAHI (7).png",          location:"Bar & Cocktails",description:"Raahi Hurricane · Signature Margaritas · Full bar", hotspot:{ label:"See the Food →",         x:"55%", y:"45%" } },
  { id:"food",     image:"/raahi/11.03.25RaahiIndianKitchen_0098.jpg", location:"The Food", description:"Traditional recipes · Fresh every day",     hotspot:null },
];

// Preload all images on mount
function usePreload() {
  useEffect(() => {
    SCENES.forEach(s => { const img = new Image(); img.src = s.image; });
  }, []);
}

export default function Gallery() {
  usePreload();
  const [idx, setIdx]       = useState(0);
  const [exiting, setExiting] = useState(false);
  const scene = SCENES[idx];

  const goNext = () => {
    if (idx >= SCENES.length - 1 || exiting) return;
    setExiting(true);
    setTimeout(() => { setIdx(i => i + 1); setExiting(false); }, 600);
  };

  const goPrev = () => {
    if (idx <= 0 || exiting) return;
    setExiting(true);
    setTimeout(() => { setIdx(i => i - 1); setExiting(false); }, 600);
  };

  return (
    <div style={{ position:"fixed", inset:0, overflow:"hidden", background:"#000" }}>

      {/* Current image — scales up on exit (walking in) */}
      <AnimatePresence mode="wait">
        <motion.div key={scene.id}
          initial={{ opacity:0, scale:1.12 }}
          animate={{ opacity:1,  scale:1 }}
          exit={{ opacity:0, scale:1.18 }}
          transition={{ duration:0.75, ease:[0.25,0.46,0.45,0.94] }}
          style={{ position:"absolute", inset:0 }}>
          <img
            src={scene.image}
            alt={scene.location}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
        </motion.div>
      </AnimatePresence>

      {/* Minimal gradient — only at very top and bottom for text */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:5,
        background:"linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 15%, transparent 78%, rgba(0,0,0,0.45) 100%)" }}/>

      {/* Top bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, padding:"28px 40px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", zIndex:20 }}>
        <AnimatePresence mode="wait">
          <motion.div key={scene.id+"hdr"} initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.35}}>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"8px", letterSpacing:"0.6em", color:"rgba(212,175,88,0.7)", textTransform:"uppercase", marginBottom:"3px" }}>
              Raahi Indian Kitchen
            </p>
            <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.4rem", color:"#fff" }}>
              {scene.location}
            </p>
          </motion.div>
        </AnimatePresence>
        <Link to="/" style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.42em", color:"rgba(255,255,255,0.5)", textTransform:"uppercase", textDecoration:"none" }}>
          ← Back
        </Link>
      </div>

      {/* Hotspot */}
      <AnimatePresence mode="wait">
        {scene.hotspot && (
          <motion.div key={scene.id+"hs"} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{delay:0.5, duration:0.4}}
            style={{ position:"absolute", left:scene.hotspot.x, top:scene.hotspot.y, transform:"translate(-50%,-50%)", zIndex:20, cursor:"pointer" }}
            onClick={goNext}>
            {/* Pulse */}
            <motion.div animate={{scale:[1,2,1], opacity:[0.6,0,0.6]}} transition={{duration:2, repeat:Infinity}}
              style={{ position:"absolute", inset:"-8px", borderRadius:"50%", border:`1px solid ${G}`, pointerEvents:"none" }}/>
            <motion.div style={{ width:"10px", height:"10px", borderRadius:"50%", background:G, margin:"0 auto 10px" }}
              whileHover={{ scale:1.4 }}/>
            <motion.div whileHover={{ y:-3, borderColor:"rgba(212,175,88,0.8)" }}
              style={{ background:"rgba(0,0,0,0.55)", backdropFilter:"blur(20px)", border:"1px solid rgba(212,175,88,0.35)", padding:"10px 20px", whiteSpace:"nowrap", transition:"border-color 0.3s" }}>
              <span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.35em", textTransform:"uppercase", color:G }}>
                {scene.hotspot.label}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final scene CTA */}
      {!scene.hotspot && (
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
          style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", zIndex:20, textAlign:"center" }}>
          <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2rem,4vw,3rem)", color:"#fff", marginBottom:"1rem" }}>
            Ready to experience it?
          </p>
          <div style={{ height:"1px", width:"60px", background:`linear-gradient(90deg,transparent,${G},transparent)`, margin:"0 auto 1.8rem" }}/>
          <Link to="/reservations"
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.38em", textTransform:"uppercase", color:G,
              border:"1px solid rgba(212,175,88,0.45)", padding:"14px 30px", textDecoration:"none",
              backdropFilter:"blur(12px)", background:"rgba(0,0,0,0.5)", display:"inline-block" }}>
            Reserve a Table →
          </Link>
        </motion.div>
      )}

      {/* Back arrow */}
      {idx > 0 && (
        <motion.button onClick={goPrev} initial={{opacity:0}} animate={{opacity:1}} whileHover={{scale:1.08}}
          style={{ position:"absolute", left:"28px", top:"50%", transform:"translateY(-50%)", zIndex:20,
            width:"48px", height:"48px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.2)",
            background:"rgba(0,0,0,0.45)", backdropFilter:"blur(12px)", color:"rgba(255,255,255,0.6)",
            fontSize:"18px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          ←
        </motion.button>
      )}

      {/* Bottom */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 40px 32px", zIndex:20 }}>
        <AnimatePresence mode="wait">
          <motion.p key={scene.id+"desc"} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.35,delay:0.2}}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.28em", color:"rgba(255,255,255,0.45)", textTransform:"uppercase", marginBottom:"14px" }}>
            {scene.description}
          </motion.p>
        </AnimatePresence>
        <div style={{ display:"flex", gap:"5px" }}>
          {SCENES.map((_,i) => (
            <div key={i} style={{ width:i===idx?"22px":"6px", height:"5px", borderRadius:"3px",
              background:i===idx ? G : i<idx ? "rgba(212,175,88,0.4)" : "rgba(255,255,255,0.2)",
              transition:"all 0.35s" }}/>
          ))}
        </div>
      </div>
    </div>
  );
}
