import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MENU_CATEGORIES } from "@/lib/menuData";
import { RESERVATION_URL } from "@/constants";

const G="#d4af58",I="#e8e0cc",T="#081910",D="#0c1e14";

const CAT_IMAGES: Record<string,string> = {
  "starters":     "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg",
  "street-eats":  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  "tandoor":      "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
  "dosa":         "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
  "indo-chinese": "https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg",
  "mains-veg":    "https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg",
  "mains-nonveg": "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
  "biryani":      "https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg",
  "breads":       "https://images.pexels.com/photos/1568471/pexels-photo-1568471.jpeg",
  "desserts":     "https://images.pexels.com/photos/3782788/pexels-photo-3782788.jpeg",
  "drinks":       "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg",
};

function ItemRow({ item }: { item: any }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        padding:"14px 20px", borderBottom:"1px solid rgba(212,175,88,0.07)",
        borderLeft: h ? "2px solid rgba(212,175,88,0.6)" : "2px solid transparent",
        background: h ? "rgba(212,175,88,0.04)" : "transparent",
        transition:"all 0.2s", gap:"16px" }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:"8px", marginBottom:item.desc?"5px":0 }}>
          <span style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"16px", color:I }}>{item.name}</span>
          {item.veg && <span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:"rgba(80,200,120,0.9)", border:"1px solid rgba(80,200,120,0.25)", padding:"2px 7px", textTransform:"uppercase" }}>VEG</span>}
          {item.badge && <span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:G, border:`1px solid rgba(212,175,88,0.3)`, padding:"2px 7px", textTransform:"uppercase" }}>{item.badge}</span>}
        </div>
        {item.desc && <p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.35)", lineHeight:1.65, margin:0 }}>{item.desc}</p>}
      </div>
      <span style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:G, flexShrink:0, fontWeight:600 }}>{item.price}</span>
    </div>
  );
}

function CategoryRow({ cat, isOpen, onToggle, onHover }: { cat:any; isOpen:boolean; onToggle:()=>void; onHover:()=>void }) {
  return (
    <div style={{ borderBottom:"1px solid rgba(212,175,88,0.1)" }} onMouseEnter={onHover}>
      <button onClick={onToggle}
        style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"22px 28px", background: isOpen ? "rgba(212,175,88,0.06)" : "transparent",
          border:"none", cursor:"pointer", textAlign:"left",
          borderLeft: isOpen ? `3px solid ${G}` : "3px solid transparent",
          transition:"all 0.3s" }}>
        <div>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:"rgba(212,175,88,0.55)", textTransform:"uppercase", marginBottom:"5px" }}>{cat.tagline}</p>
          <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.3rem,2.5vw,1.9rem)", color: isOpen ? G : I, margin:0, transition:"color 0.3s" }}>{cat.label}</h2>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration:0.3 }}>
          <ChevronDown size={18} style={{ color: isOpen ? G : "rgba(232,224,204,0.3)" }}/>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration:0.35, ease:[0.25,0.46,0.45,0.94] }} style={{ overflow:"hidden" }}>
            {cat.subGroups.map((group:any, i:number) => (
              <div key={i}>
                <div style={{ padding:"10px 28px", background:"rgba(212,175,88,0.04)", borderBottom:"1px solid rgba(212,175,88,0.08)" }}>
                  <span style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.4em", color:G, textTransform:"uppercase", fontWeight:600 }}>{group.label}</span>
                  {group.note && <span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", color:"rgba(232,224,204,0.25)", marginLeft:"10px" }}>· {group.note}</span>}
                </div>
                {group.items.map((item:any, j:number) => <ItemRow key={j} item={item}/>)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Menus() {
  const [openId,  setOpenId]  = useState<string|null>(null);
  const [hoverId, setHoverId] = useState<string>(MENU_CATEGORIES[0]?.id || "starters");

  const bgImage = CAT_IMAGES[hoverId] || CAT_IMAGES["starters"];

  return (
    <div style={{ background:T, minHeight:"100vh" }}>

      {/* Full page layout: image left, categories right */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"100vh" }} className="max-md:block">

        {/* LEFT — sticky background image that changes on hover */}
        <div className="hidden md:block" style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>
          <AnimatePresence mode="wait">
            <motion.img key={bgImage} src={bgImage} alt="Menu category"
              initial={{ opacity:0, scale:1.05 }}
              animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.5 }}
              style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          </AnimatePresence>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 60%, rgba(8,25,16,0.8) 100%)" }}/>
          {/* Category name overlay */}
          <div style={{ position:"absolute", bottom:"40px", left:"32px" }}>
            <AnimatePresence mode="wait">
              <motion.div key={hoverId} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
                <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:"rgba(212,175,88,0.7)", textTransform:"uppercase", marginBottom:"6px" }}>Now Viewing</p>
                <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.8rem", color:"#fff" }}>
                  {MENU_CATEGORIES.find(c=>c.id===hoverId)?.label}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — scrollable menu categories */}
        <div style={{ background:D, overflowY:"auto" }}>
          {/* Header */}
          <div style={{ padding:"120px 28px 40px", borderBottom:"1px solid rgba(212,175,88,0.1)", background:"linear-gradient(135deg,#081910,#0f2818)" }}>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>Raahi Indian Kitchen</p>
            <h1 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2rem,4vw,3.5rem)", color:I, lineHeight:0.95, marginBottom:"1rem" }}>Our Menu</h1>
            <div style={{ height:"1px", width:"50px", background:`linear-gradient(90deg,transparent,${G},transparent)`, marginBottom:"1rem" }}/>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"13px", color:"rgba(232,224,204,0.4)", lineHeight:1.85 }}>
              Hover a category to preview · Click to explore
            </p>
          </div>

          {/* Categories */}
          <div>
            {MENU_CATEGORIES.map(cat => (
              <CategoryRow key={cat.id} cat={cat}
                isOpen={openId===cat.id}
                onToggle={() => setOpenId(openId===cat.id ? null : cat.id)}
                onHover={() => setHoverId(cat.id)}/>
            ))}
          </div>

          {/* Footer note */}
          <div style={{ padding:"24px 28px", borderTop:"1px solid rgba(212,175,88,0.08)", textAlign:"center" }}>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.3)", lineHeight:1.85 }}>
              Paranthas until 5 PM · Takeout available · Tuesday opens 5 PM
            </p>
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-block", marginTop:"16px", fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.3em", color:G, textTransform:"uppercase", border:`1px solid rgba(212,175,88,0.3)`, padding:"10px 24px", textDecoration:"none" }}>
              Reserve a Table →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
