import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MENU_CATEGORIES } from "@/lib/menuData";
import { RESERVATION_URL } from "@/constants";

const G="#d4af58",I="#e8e0cc",T="#081910",D="#0c1e14";

function ItemRow({ item }: { item: any }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        padding:"14px 20px", borderBottom:"1px solid rgba(212,175,88,0.06)",
        borderLeft: h ? "2px solid rgba(212,175,88,0.5)" : "2px solid transparent",
        background: h ? "rgba(212,175,88,0.03)" : "transparent",
        transition:"all 0.2s", gap:"16px", cursor:"default" }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:"8px", marginBottom:item.desc?"5px":0 }}>
          <span style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"16px", color:I }}>{item.name}</span>
          {item.veg && <span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:"rgba(80,200,120,0.8)", border:"1px solid rgba(80,200,120,0.2)", padding:"2px 7px", textTransform:"uppercase" }}>VEG</span>}
          {item.badge && <span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:G, border:"1px solid rgba(212,175,88,0.25)", padding:"2px 7px", textTransform:"uppercase" }}>{item.badge}</span>}
        </div>
        {item.desc && <p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.35)", lineHeight:1.65, margin:0 }}>{item.desc}</p>}
      </div>
      <span style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:G, flexShrink:0, paddingTop:"2px", fontWeight:600 }}>{item.price}</span>
    </div>
  );
}

function CategoryAccordion({ cat }: { cat: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid rgba(212,175,88,0.1)", overflow:"hidden" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"24px 28px", background: open ? "rgba(212,175,88,0.05)" : "transparent",
          border:"none", cursor:"pointer", textAlign:"left",
          borderLeft: open ? "3px solid rgba(212,175,88,0.6)" : "3px solid transparent",
          transition:"all 0.3s",
        }}>
        <div>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:"rgba(212,175,88,0.55)", textTransform:"uppercase", marginBottom:"6px" }}>{cat.tagline}</p>
          <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.5rem,3vw,2.2rem)", color: open ? G : I, transition:"color 0.3s", margin:0 }}>{cat.label}</h2>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.3 }}>
          <ChevronDown size={18} style={{ color: open ? G : "rgba(232,224,204,0.3)", flexShrink:0 }}/>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration:0.35, ease:[0.25,0.46,0.45,0.94] }} style={{ overflow:"hidden" }}>
            {cat.subGroups.map((group: any, i: number) => (
              <div key={i}>
                <div style={{ padding:"12px 28px", background:"rgba(212,175,88,0.04)", borderTop:"1px solid rgba(212,175,88,0.08)" }}>
                  <span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.4em", color:"rgba(212,175,88,0.6)", textTransform:"uppercase", fontWeight:600 }}>{group.label}</span>
                  {group.note && <span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", color:"rgba(232,224,204,0.25)", marginLeft:"10px" }}>· {group.note}</span>}
                </div>
                {group.items.map((item: any, j: number) => <ItemRow key={j} item={item}/>)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Menus() {
  return (
    <div style={{ background:T, minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#081910,#0f2818,#081910)", paddingTop:"120px", paddingBottom:"60px", borderBottom:"1px solid rgba(212,175,88,0.1)", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>Raahi Indian Kitchen</p>
        <h1 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2.5rem,6vw,5rem)", color:I, lineHeight:0.95, marginBottom:"1rem" }}>Our Menu</h1>
        <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg,transparent,#d4af58,transparent)", margin:"1.2rem auto 1.5rem" }}/>
        <p style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:"rgba(232,224,204,0.4)", lineHeight:1.85, maxWidth:"460px", margin:"0 auto 2rem" }}>
          Click any category to explore the full menu.
        </p>
        <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.25em", color:G, textTransform:"uppercase", border:"1px solid rgba(212,175,88,0.35)", padding:"10px 24px", textDecoration:"none" }}>
          Reserve a Table
        </a>
      </div>
      <div className="container mx-auto px-6 py-12" style={{ maxWidth:"860px" }}>
        <div style={{ border:"1px solid rgba(212,175,88,0.1)", background:"rgba(12,30,20,0.4)" }}>
          {MENU_CATEGORIES.map(cat => <CategoryAccordion key={cat.id} cat={cat}/>)}
        </div>
        <div style={{ marginTop:"40px", padding:"24px", background:"rgba(212,175,88,0.04)", border:"1px solid rgba(212,175,88,0.1)", textAlign:"center" }}>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.35)", lineHeight:1.85 }}>
            Paranthas available until 5 PM daily · Takeout and delivery available<br/>
            <span style={{ color:"rgba(212,175,88,0.45)" }}>Tuesday opens at 5 PM · All other days from 11 AM</span>
          </p>
        </div>
      </div>
    </div>
  );
}
