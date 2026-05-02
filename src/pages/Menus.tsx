import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_CATEGORIES } from "@/lib/menuData";
import { RESERVATION_URL } from "@/constants";

const G="#d4af58",I="#e8e0cc",T="#081910";

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
  const [h,setH]=useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start",
        padding:"14px 24px", borderBottom:"1px solid rgba(212,175,88,0.07)",
        borderLeft:h?"2px solid rgba(212,175,88,0.6)":"2px solid transparent",
        background:h?"rgba(212,175,88,0.04)":"transparent", transition:"all 0.2s", gap:"16px" }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", marginBottom:item.desc?"4px":0 }}>
          <span style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"16px", color:I }}>{item.name}</span>
          {item.veg&&<span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:"rgba(80,200,120,0.9)", border:"1px solid rgba(80,200,120,0.25)", padding:"2px 6px", textTransform:"uppercase" }}>VEG</span>}
          {item.badge&&<span style={{ fontSize:"8px", fontFamily:"Jost,sans-serif", letterSpacing:"0.15em", color:G, border:`1px solid rgba(212,175,88,0.3)`, padding:"2px 6px", textTransform:"uppercase" }}>{item.badge}</span>}
        </div>
        {item.desc&&<p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.35)", lineHeight:1.6, margin:0 }}>{item.desc}</p>}
      </div>
      <span style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:G, flexShrink:0, fontWeight:600 }}>{item.price}</span>
    </div>
  );
}

export default function Menus() {
  const [openId,setOpenId]=useState<string|null>(null);
  const [bgId,setBgId]=useState(MENU_CATEGORIES[0]?.id||"starters");

  return (
    <div style={{ background:T, minHeight:"100vh", position:"relative" }}>

      {/* Fixed full-screen background image */}
      <div style={{ position:"fixed", inset:0, zIndex:0 }}>
        <AnimatePresence mode="wait">
          <motion.img key={bgId}
            src={CAT_IMAGES[bgId]}
            alt=""
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:0.5 }}
            style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        </AnimatePresence>
        {/* Dark overlay so text is readable */}
        <div style={{ position:"absolute", inset:0, background:"rgba(8,25,16,0.80)" }}/>
      </div>

      {/* Scrollable content on top */}
      <div style={{ position:"relative", zIndex:1, maxWidth:"860px", margin:"0 auto", padding:"0 24px 80px" }}>

        {/* Header */}
        <div style={{ paddingTop:"120px", paddingBottom:"48px", textAlign:"center", borderBottom:"1px solid rgba(212,175,88,0.12)" }}>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>Raahi Indian Kitchen</p>
          <h1 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2.5rem,5vw,4rem)", color:I, lineHeight:0.95, marginBottom:"1rem" }}>Our Menu</h1>
          <div style={{ height:"1px", width:"50px", background:`linear-gradient(90deg,transparent,${G},transparent)`, margin:"1rem auto 1.2rem" }}/>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"13px", color:"rgba(232,224,204,0.4)", lineHeight:1.85 }}>
            Hover a category to preview the dish · Click to explore
          </p>
        </div>

        {/* Category list */}
        <div style={{ marginTop:"8px" }}>
          {MENU_CATEGORIES.map((cat) => (
            <div key={cat.id}
              onMouseEnter={()=>setBgId(cat.id)}
              style={{ borderBottom:"1px solid rgba(212,175,88,0.1)", overflow:"hidden" }}>

              {/* Category button */}
              <button
                onClick={()=>setOpenId(openId===cat.id?null:cat.id)}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"20px 0", background:"transparent", border:"none", cursor:"pointer", textAlign:"left",
                  borderLeft:openId===cat.id?`3px solid ${G}`:"3px solid transparent",
                  paddingLeft:openId===cat.id?"16px":"0",
                  transition:"all 0.3s" }}>
                <div>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:"rgba(212,175,88,0.55)", textTransform:"uppercase", marginBottom:"5px" }}>{cat.tagline}</p>
                  <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.4rem,2.5vw,2rem)", color:openId===cat.id?G:I, margin:0, transition:"color 0.3s" }}>{cat.label}</h2>
                </div>
                <motion.span animate={{ rotate:openId===cat.id?180:0 }} transition={{ duration:0.3 }}
                  style={{ color:openId===cat.id?G:"rgba(232,224,204,0.3)", fontSize:"20px", marginRight:"8px" }}>
                  ↓
                </motion.span>
              </button>

              {/* Items */}
              <AnimatePresence initial={false}>
                {openId===cat.id && (
                  <motion.div
                    initial={{ height:0, opacity:0 }}
                    animate={{ height:"auto", opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.35, ease:[0.25,0.46,0.45,0.94] }}
                    style={{ overflow:"hidden", background:"rgba(8,25,16,0.7)", backdropFilter:"blur(16px)", marginBottom:"4px" }}>
                    {cat.subGroups.map((group:any,i:number)=>(
                      <div key={i}>
                        <div style={{ padding:"10px 24px", background:"rgba(212,175,88,0.06)", borderBottom:"1px solid rgba(212,175,88,0.1)" }}>
                          <span style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.4em", color:G, textTransform:"uppercase", fontWeight:600 }}>{group.label}</span>
                          {group.note&&<span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", color:"rgba(232,224,204,0.25)", marginLeft:"10px" }}>· {group.note}</span>}
                        </div>
                        {group.items.map((item:any,j:number)=><ItemRow key={j} item={item}/>)}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div style={{ marginTop:"48px", textAlign:"center" }}>
          <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.3em", color:G, textTransform:"uppercase", border:`1px solid rgba(212,175,88,0.35)`, padding:"12px 28px", textDecoration:"none", display:"inline-block" }}>
            Reserve a Table →
          </a>
        </div>
      </div>
    </div>
  );
}
