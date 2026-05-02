import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";
import { MENU_CATEGORIES } from "@/lib/menuData";
import { RESERVATION_URL } from "@/constants";

const G="#d4af58",I="#e8e0cc",T="#081910",D="#0c1e14";

const CAT_IMAGES: Record<string,string> = {
  "starters":     "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?w=1200",
  "street-eats":  "https://images.pexels.com/photos/1117194/pexels-photo-1117194.jpeg?w=1200",
  "tandoor":      "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?w=1200",
  "dosa":         "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?w=1200",
  "indo-chinese": "https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?w=1200",
  "mains-veg":    "https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?w=1200",
  "mains-nonveg": "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?w=1200",
  "biryani":      "https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg?w=1200",
  "breads":       "https://images.pexels.com/photos/1117194/pexels-photo-1117194.jpeg?w=1200",
  "desserts":     "https://images.pexels.com/photos/3782788/pexels-photo-3782788.jpeg?w=1200",
  "drinks":       "https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?w=1200",
};

function ItemRow({ item }: { item: any }) {
  const [h,setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        padding:"14px 20px", borderBottom:"1px solid rgba(212,175,88,0.06)",
        borderLeft: h?"2px solid rgba(212,175,88,0.5)":"2px solid transparent",
        background: h?"rgba(212,175,88,0.03)":"transparent",
        transition:"all 0.2s", gap:"16px", cursor:"default" }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:"8px", marginBottom:item.desc?"5px":0 }}>
          <span style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"16px", color:I }}>{item.name}</span>
          {item.veg&&<span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:"rgba(80,200,120,0.8)", border:"1px solid rgba(80,200,120,0.2)", padding:"2px 7px", textTransform:"uppercase" }}>VEG</span>}
          {item.badge&&<span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:G, border:"1px solid rgba(212,175,88,0.25)", padding:"2px 7px", textTransform:"uppercase" }}>{item.badge}</span>}
        </div>
        {item.desc&&<p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.35)", lineHeight:1.65, margin:0 }}>{item.desc}</p>}
      </div>
      <span style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:G, flexShrink:0, paddingTop:"2px", fontWeight:600 }}>{item.price}</span>
    </div>
  );
}

export default function Menus() {
  const [activeId, setActiveId] = useState<string|null>(null);
  const activeCategory = MENU_CATEGORIES.find(c=>c.id===activeId);

  const sections = MENU_CATEGORIES.map((cat) => ({
    id: cat.id,
    background: CAT_IMAGES[cat.id] || "/raahi/11.03.25RaahiIndianKitchen_0013.jpg",
    leftLabel: (
      <span style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(0.7rem,1.3vw,1rem)", letterSpacing:"0.15em", textTransform:"uppercase" as const, lineHeight:1.4 }}>
        {cat.tagline}
      </span>
    ),
    title: cat.label,
    rightLabel: (
      <button
        onClick={(e)=>{ e.stopPropagation(); setActiveId(cat.id); }}
        style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.3em", textTransform:"uppercase" as const,
          border:"1px solid rgba(212,175,88,0.35)", color:G, padding:"8px 20px",
          background:"transparent", cursor:"pointer", transition:"all 0.3s",
          whiteSpace:"nowrap" as const }}
        onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=G; el.style.color=T; }}
        onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.color=G; }}>
        View Items
      </button>
    ),
  }));

  return (
    <div style={{ background:T }}>
      {/* Page header */}
      <div style={{ background:"linear-gradient(135deg,#081910,#0f2818,#081910)", paddingTop:"100px", paddingBottom:"40px",
        borderBottom:"1px solid rgba(212,175,88,0.1)", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>
          Raahi Indian Kitchen
        </p>
        <h1 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2.5rem,6vw,5rem)", color:I, lineHeight:0.95, marginBottom:"1rem" }}>
          Our Menu
        </h1>
        <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg,transparent,#d4af58,transparent)", margin:"1.2rem auto 1.5rem" }}/>
        <p style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:"rgba(232,224,204,0.4)", lineHeight:1.85, maxWidth:"460px", margin:"0 auto" }}>
          Scroll through categories — click <em style={{color:G,fontStyle:"italic"}}>View Items</em> to explore the full menu.
        </p>
      </div>

      {/* GSAP Scroll FX */}
      <FullScreenScrollFX
        sections={sections}
        header="Scroll to Explore"
        showProgress={true}
        bgTransition="fade"
        colors={{ text:I, overlay:"rgba(8,25,16,0.62)", pageBg:T, stageBg:T }}
        durations={{ change:0.7, snap:800 }}
        gap={0}
        gridPaddingX={3}
      />

      {/* Items modal */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            style={{ background:"rgba(8,25,16,0.96)", backdropFilter:"blur(16px)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={()=>setActiveId(null)}>
            <motion.div
              style={{ background:"#0c1e14", border:"1px solid rgba(212,175,88,0.2)", width:"100%", maxWidth:"760px", maxHeight:"88vh", display:"flex", flexDirection:"column" }}
              initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:40, opacity:0 }}
              transition={{ duration:0.35 }}
              onClick={e=>e.stopPropagation()}>
              {/* Modal header */}
              <div style={{ padding:"24px 28px", borderBottom:"1px solid rgba(212,175,88,0.1)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
                <div>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:G, textTransform:"uppercase", marginBottom:"4px", opacity:0.7 }}>{activeCategory.tagline}</p>
                  <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.8rem", color:I }}>{activeCategory.label}</h2>
                </div>
                <button onClick={()=>setActiveId(null)}
                  style={{ color:"rgba(232,224,204,0.3)", background:"none", border:"none", cursor:"pointer", fontSize:"24px", lineHeight:1, padding:"4px" }}>
                  ×
                </button>
              </div>
              {/* Items */}
              <div style={{ overflowY:"auto", flex:1 }}>
                {activeCategory.subGroups.map((group:any,i:number)=>(
                  <div key={i}>
                    <div style={{ padding:"12px 28px", background:"rgba(212,175,88,0.04)", borderBottom:"1px solid rgba(212,175,88,0.08)" }}>
                      <span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.4em", color:G, textTransform:"uppercase", fontWeight:600 }}>{group.label}</span>
                      {group.note&&<span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", color:"rgba(232,224,204,0.25)", marginLeft:"10px" }}>· {group.note}</span>}
                    </div>
                    {group.items.map((item:any,j:number)=><ItemRow key={j} item={item}/>)}
                  </div>
                ))}
              </div>
              {/* Footer */}
              <div style={{ padding:"16px 28px", borderTop:"1px solid rgba(212,175,88,0.1)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
                <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.28)" }}>
                  Paranthas until 5 PM · Takeout available
                </p>
                <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.25em", color:G, textTransform:"uppercase", border:"1px solid rgba(212,175,88,0.3)", padding:"8px 18px", textDecoration:"none" }}>
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
