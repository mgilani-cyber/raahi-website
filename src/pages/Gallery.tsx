import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const G="#d4af58", I="#e8e0cc", T="#0b1e14";

const SCENES = [
  {
    id: "exterior",
    image: "/raahi/raahi-exterior.png",
    location: "Outside",
    description: "17695 Tomball Pkwy · North Houston",
    hotspot: { label: "Enter Raahi →", x: "48%", y: "58%" },
  },
  {
    id: "door",
    image: "/raahi/raahi-door.png",
    location: "Entrance",
    description: "Welcome to Raahi Indian Kitchen",
    hotspot: { label: "Step Inside →", x: "50%", y: "52%" },
  },
  {
    id: "reception",
    image: "/raahi/raahi-entrance.png",
    location: "Reception",
    description: "Be welcomed by our team",
    hotspot: { label: "Enter the Dining Room →", x: "58%", y: "48%" },
  },
  {
    id: "dining",
    image: "/raahi/raahi-dining-full.png",
    location: "Dining Room",
    description: "Warm pendant lights · Teal velvet booths · Gold details",
    hotspot: { label: "See the Detail →", x: "35%", y: "55%" },
  },
  {
    id: "chairs",
    image: "/raahi/raahi-chairs.png",
    location: "Dining Room · Detail",
    description: "Gold lion hardware on every chair",
    hotspot: { label: "Explore the Lounge →", x: "65%", y: "42%" },
  },
  {
    id: "lounge",
    image: "/raahi/raahi-lounge.png",
    location: "The Lounge",
    description: "Intimate round tables · Perfect for private gatherings",
    hotspot: { label: "Visit the Bar →", x: "42%", y: "38%" },
  },
  {
    id: "bar",
    image: "/raahi/RAAHI (7).png",
    location: "Bar & Cocktails",
    description: "The Raahi Hurricane · Signature Margaritas · Full bar",
    hotspot: { label: "See the Food →", x: "55%", y: "45%" },
  },
  {
    id: "food",
    image: "/raahi/11.03.25RaahiIndianKitchen_0098.jpg",
    location: "The Food",
    description: "Traditional recipes · Fresh every day · Nothing from a packet",
    hotspot: null,
  },
];

function Hotspot({ label, x, y, onClick }: { label:string; x:string; y:string; onClick:()=>void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position:"absolute", left:x, top:y, transform:"translate(-50%,-50%)", zIndex:20, cursor:"pointer" }}
      onClick={onClick} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      {/* Pulse ring */}
      <motion.div animate={{ scale:[1,2,1], opacity:[0.5,0,0.5] }} transition={{ duration:2, repeat:Infinity }}
        style={{ position:"absolute", inset:"-6px", borderRadius:"50%", border:`1px solid ${G}`, pointerEvents:"none" }}/>
      {/* Dot */}
      <motion.div animate={{ scale: hovered ? 1.4 : 1 }}
        style={{ width:"10px", height:"10px", borderRadius:"50%", background:G, margin:"0 auto 10px" }}/>
      {/* Label pill */}
      <motion.div animate={{ y: hovered ? -3 : 0, opacity: hovered ? 1 : 0.85 }}
        style={{ background:"rgba(11,30,20,0.78)", backdropFilter:"blur(20px)",
          border:`1px solid rgba(212,175,88,${hovered?"0.65":"0.22"})`,
          padding:"10px 20px", whiteSpace:"nowrap", transition:"border-color 0.3s" }}>
        <span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.35em", textTransform:"uppercase", color:G }}>
          {label}
        </span>
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const [idx, setIdx] = useState(0);
  const scene = SCENES[idx];

  const goNext = () => { if (idx < SCENES.length-1) setIdx(i=>i+1); };
  const goPrev = () => { if (idx > 0) setIdx(i=>i-1); };

  return (
    <div style={{ position:"fixed", inset:0, background:T, overflow:"hidden" }}>

      {/* Full screen image */}
      <AnimatePresence mode="wait">
        <motion.img key={scene.id} src={scene.image} alt={scene.location}
          initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.97 }}
          transition={{ duration:0.75, ease:[0.25,0.46,0.45,0.94] }}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.5)" }}/>
      </AnimatePresence>

      {/* Overlays */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(11,30,20,0.7) 0%,transparent 30%,transparent 55%,rgba(11,30,20,0.9) 100%)", pointerEvents:"none", zIndex:5 }}/>

      {/* Top */}
      <div style={{ position:"absolute", top:0, left:0, right:0, padding:"32px 44px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:30 }}>
        <AnimatePresence mode="wait">
          <motion.div key={scene.id+"top"} initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.4}}>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"8px", letterSpacing:"0.6em", color:"rgba(212,175,88,0.45)", textTransform:"uppercase", marginBottom:"4px" }}>Raahi Indian Kitchen</p>
            <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.4rem", color:I }}>{scene.location}</p>
          </motion.div>
        </AnimatePresence>
        <Link to="/" style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.42em", color:"rgba(212,175,88,0.35)", textTransform:"uppercase", textDecoration:"none" }}
          onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="rgba(212,175,88,0.8)"}
          onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="rgba(212,175,88,0.35)"}>
          ← Back
        </Link>
      </div>

      {/* Hotspot */}
      <AnimatePresence mode="wait">
        {scene.hotspot && (
          <motion.div key={scene.id+"hs"} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{delay:0.5,duration:0.5}}>
            <Hotspot label={scene.hotspot.label} x={scene.hotspot.x} y={scene.hotspot.y} onClick={goNext}/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final scene CTA */}
      {!scene.hotspot && (
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
          style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", zIndex:20, textAlign:"center" }}>
          <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.8rem,3.5vw,3rem)", color:I, marginBottom:"1.2rem" }}>
            Ready to experience it?
          </p>
          <div style={{ height:"1px", width:"60px", background:`linear-gradient(90deg,transparent,${G},transparent)`, margin:"0 auto 1.8rem" }}/>
          <Link to="/reservations"
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.38em", textTransform:"uppercase", color:G,
              border:"1px solid rgba(212,175,88,0.4)", padding:"14px 30px", textDecoration:"none",
              backdropFilter:"blur(12px)", background:"rgba(11,30,20,0.6)", display:"inline-block" }}>
            Reserve a Table →
          </Link>
        </motion.div>
      )}

      {/* Back arrow */}
      {idx > 0 && (
        <motion.button onClick={goPrev} initial={{opacity:0}} animate={{opacity:1}} whileHover={{scale:1.1}}
          style={{ position:"absolute", left:"28px", top:"50%", transform:"translateY(-50%)", zIndex:20,
            width:"48px", height:"48px", borderRadius:"50%", border:"1px solid rgba(212,175,88,0.22)",
            background:"rgba(11,30,20,0.65)", backdropFilter:"blur(12px)",
            color:"rgba(212,175,88,0.5)", fontSize:"18px", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
          ←
        </motion.button>
      )}

      {/* Bottom */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 44px 36px", zIndex:20 }}>
        <AnimatePresence mode="wait">
          <motion.p key={scene.id+"desc"} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
            transition={{duration:0.4,delay:0.2}}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.28em", color:"rgba(232,224,204,0.32)", textTransform:"uppercase", marginBottom:"16px" }}>
            {scene.description}
          </motion.p>
        </AnimatePresence>
        {/* Progress */}
        <div style={{ display:"flex", gap:"5px", alignItems:"center" }}>
          {SCENES.map((_,i) => (
            <div key={i} style={{ width:i===idx?"22px":"6px", height:"5px", borderRadius:"3px",
              background:i===idx ? G : i<idx ? "rgba(212,175,88,0.38)" : "rgba(212,175,88,0.14)",
              transition:"all 0.35s" }}/>
          ))}
        </div>
      </div>
    </div>
  );
}
