import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";
import { MENU_CATEGORIES } from "@/lib/menuData";
import { RESERVATION_URL } from "@/constants";

const G="#d4af58",I="#e8e0cc",T="#081910",D="#0c1e14",R="#a34d26";

// Map category IDs to background images
const CAT_IMAGES: Record<string,string> = {
  "starters":     "/raahi/11.03.25RaahiIndianKitchen_0098.jpg",
  "street-eats":  "/raahi/11.03.25RaahiIndianKitchen_0038.jpg",
  "tandoor":      "/raahi/11.03.25RaahiIndianKitchen_0013.jpg",
  "dosa":         "/raahi/RAAHI (4)-2.jpg",
  "indo-chinese": "/raahi/RAAHI (5).png",
  "mains-veg":    "/raahi/RAAHI (6).png",
  "mains-nonveg": "/raahi/RAAHI (7).png",
  "biryani":      "/raahi/RAAHI (8).png",
  "breads":       "/raahi/H.jpg",
  "desserts":     "/raahi/ChatGPT Image Aug 26, 2025 at 01_15_58 PM.png",
  "drinks":       "/raahi/ChatGPT Image Aug 26, 2025 at 01_18_20 PM.png",
};

function ItemRow({ item }: { item: any }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        padding:"14px 16px", borderBottom:"1px solid rgba(212,175,88,0.07)",
        borderLeft: h ? "2px solid rgba(212,175,88,0.5)" : "2px solid transparent",
        background: h ? "rgba(212,175,88,0.04)" : "transparent", transition:"all 0.2s", gap:"12px" }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:"8px", marginBottom:item.desc?"4px":0 }}>
          <span style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"16px", color:I }}>{item.name}</span>
          {item.veg&&<span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:"rgba(80,200,120,0.8)", border:"1px solid rgba(80,200,120,0.2)", padding:"2px 6px", textTransform:"uppercase" }}>VEG</span>}
          {item.badge&&<span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:G, border:`1px solid rgba(212,175,88,0.25)`, padding:"2px 6px", textTransform:"uppercase" }}>{item.badge}</span>}
        </div>
        {item.desc&&<p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.35)", lineHeight:1.6, margin:0 }}>{item.desc}</p>}
      </div>
      <span style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:G, flexShrink:0, paddingTop:"2px", fontWeight:600 }}>{item.price}</span>
    </div>
  );
}

function MenuPanel({ cat }: { cat: any }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }}
      style={{ maxWidth:"700px", margin:"0 auto", maxHeight:"70vh", overflowY:"auto",
        scrollbarWidth:"thin", scrollbarColor:"rgba(212,175,88,0.3) transparent" }}>
      {cat.subGroups.map((group: any, i: number) => (
        <div key={i} style={{ marginBottom:"16px" }}>
          <div style={{ padding:"12px 16px", background:"rgba(212,175,88,0.06)", borderBottom:`1px solid rgba(212,175,88,0.15)` }}>
            <span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.35em", color:G, textTransform:"uppercase", fontWeight:600 }}>
              {group.label}
            </span>
            {group.note&&<span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", color:"rgba(232,224,204,0.3)", marginLeft:"10px" }}>· {group.note}</span>}
          </div>
          {group.items.map((item: any, j: number) => <ItemRow key={j} item={item}/>)}
        </div>
      ))}
    </motion.div>
  );
}

export default function Menus() {
  const [activeId, setActiveId] = useState<string|null>(null);
  const apiRef = useRef<FullScreenFXAPI>(null);

  const sections = MENU_CATEGORIES.map((cat, i) => ({
    id: cat.id,
    background: CAT_IMAGES[cat.id] || "/raahi/11.03.25RaahiIndianKitchen_0013.jpg",
    leftLabel: (
      <span style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(0.75rem,1.5vw,1.1rem)", letterSpacing:"0.15em", textTransform:"uppercase" as const, color:I }}>
        {cat.tagline}
      </span>
    ),
    title: cat.label,
    rightLabel: (
      <button
        onClick={(e) => { e.stopPropagation(); setActiveId(cat.id); }}
        style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.3em", textTransform:"uppercase" as const,
          border:`1px solid rgba(212,175,88,0.4)`, color:G, padding:"8px 18px", background:"transparent", cursor:"pointer",
          transition:"all 0.3s" }}
        onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background=G; el.style.color=T; }}
        onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.color=G; }}>
        View Items →
      </button>
    ),
  }));

  const activeCategory = MENU_CATEGORIES.find(c => c.id === activeId);

  return (
    <div style={{ background:T }}>

      {/* Page header */}
      <div style={{ background:`linear-gradient(135deg,#081910,#0f2818,#081910)`, paddingTop:"100px", paddingBottom:"40px",
        borderBottom:"1px solid rgba(212,175,88,0.1)", textAlign:"center", position:"relative" }}>
        <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>
          Raahi Indian Kitchen
        </p>
        <h1 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2.5rem,6vw,5rem)", color:I, lineHeight:0.95, marginBottom:"1rem" }}>
          Our Menu
        </h1>
        <div style={{ height:"1px", width:"60px", background:`linear-gradient(90deg,transparent,${G},transparent)`, margin:"1rem auto" }}/>
        <p style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:"rgba(232,224,204,0.4)", lineHeight:1.85, maxWidth:"480px", margin:"0 auto" }}>
          Scroll through categories — click <em style={{color:G}}>View Items</em> on any section to see the full menu.
        </p>
      </div>

      {/* Full screen scroll FX menu */}
      <FullScreenScrollFX
        apiRef={apiRef}
        sections={sections}
        header={<span style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.6em",color:"rgba(212,175,88,0.4)"}}>SCROLL TO EXPLORE</span>}
        showProgress={true}
        bgTransition="fade"
        colors={{ text:I, overlay:"rgba(8,25,16,0.6)", pageBg:T, stageBg:T }}
        durations={{ change:0.7, snap:800 }}
        gap={0}
        gridPaddingX={3}
      />

      {/* Menu items modal */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            style={{ background:"rgba(8,25,16,0.95)", backdropFilter:"blur(12px)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setActiveId(null)}>
            <motion.div
              style={{ background:"#0c1e14", border:"1px solid rgba(212,175,88,0.2)", width:"100%", maxWidth:"760px", maxHeight:"88vh", display:"flex", flexDirection:"column", borderRadius:"2px" }}
              initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:40, opacity:0 }}
              transition={{ duration:0.35 }}
              onClick={e => e.stopPropagation()}>

              {/* Modal header */}
              <div style={{ padding:"24px 28px", borderBottom:"1px solid rgba(212,175,88,0.1)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
                <div>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:G, textTransform:"uppercase", marginBottom:"4px", opacity:0.7 }}>{activeCategory.tagline}</p>
                  <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.8rem", color:I }}>{activeCategory.label}</h2>
                </div>
                <button onClick={() => setActiveId(null)}
                  style={{ color:"rgba(232,224,204,0.3)", background:"none", border:"none", cursor:"pointer", fontSize:"24px", lineHeight:1, padding:"4px" }}>
                  ×
                </button>
              </div>

              {/* Menu items */}
              <div style={{ overflowY:"auto", flex:1, padding:"8px 0" }}>
                <MenuPanel cat={activeCategory}/>
              </div>

              {/* Footer */}
              <div style={{ padding:"16px 28px", borderTop:"1px solid rgba(212,175,88,0.1)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
                <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.3)" }}>
                  Paranthas until 5 PM · Takeout & delivery available
                </p>
                <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.25em", color:G, textTransform:"uppercase", border:`1px solid rgba(212,175,88,0.3)`, padding:"8px 18px", textDecoration:"none" }}>
                  Reserve →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
