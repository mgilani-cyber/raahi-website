import { RaahiMenuFX } from "@/components/ui/raahi-menu-fx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MENU_CATEGORIES } from "@/lib/menuData";
import type { MenuCategoryData } from "@/lib/menuData";
import { RESERVATION_URL } from "@/constants";

const T="#113122",R="#a34d26",I="#e8e0cc",D="#0a1f15";

function ItemRow({item}:{item:any}) {
  const [h,setH]=useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"16px",borderBottom:"1px solid rgba(163,77,38,0.08)",borderLeft:h?"3px solid rgba(163,77,38,0.6)":"3px solid transparent",background:h?"rgba(163,77,38,0.04)":"transparent",transition:"all 0.2s",gap:"16px"}}>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"8px",marginBottom:item.desc?"5px":0}}>
          <span style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"16px",color:I}}>{item.name}</span>
          {item.veg&&<span style={{fontSize:"8px",fontFamily:"Jost,sans-serif",letterSpacing:"0.15em",color:"rgba(80,200,120,0.8)",border:"1px solid rgba(80,200,120,0.25)",padding:"2px 7px",textTransform:"uppercase"}}>VEG</span>}
          {item.badge&&<span style={{fontSize:"8px",fontFamily:"Jost,sans-serif",letterSpacing:"0.15em",color:"rgba(163,77,38,0.85)",border:"1px solid rgba(163,77,38,0.3)",padding:"2px 7px",textTransform:"uppercase",background:"rgba(163,77,38,0.08)"}}>{item.badge}</span>}
        </div>
        {item.desc&&<p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.38)",lineHeight:1.65,margin:0}}>{item.desc}</p>}
      </div>
      <span style={{fontFamily:"Jost,sans-serif",fontSize:"14px",color:R,flexShrink:0,paddingTop:"2px",fontWeight:600}}>{item.price}</span>
    </div>
  );
}

function SubGroup({group}:{group:any}) {
  const [open,setOpen]=useState(true);
  return (
    <div style={{marginBottom:"8px"}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:"rgba(111,133,102,0.08)",border:"none",borderBottom:"1px solid rgba(163,77,38,0.12)",cursor:"pointer",textAlign:"left"}}>
        <span style={{fontFamily:"Jost,sans-serif",fontSize:"11px",letterSpacing:"0.3em",color:R,textTransform:"uppercase",fontWeight:600}}>
          {group.label}{group.note&&<span style={{color:"rgba(232,224,204,0.3)",fontWeight:400,marginLeft:"10px"}}>· {group.note}</span>}
        </span>
        {open?<ChevronUp size={14} style={{color:"rgba(163,77,38,0.5)",flexShrink:0}}/>:<ChevronDown size={14} style={{color:"rgba(163,77,38,0.5)",flexShrink:0}}/>}
      </button>
      <AnimatePresence initial={false}>
        {open&&(
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}} style={{overflow:"hidden"}}>
            {group.items.map((item:any,i:number)=><ItemRow key={i} item={item}/>)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&auto=format&fit=crop&q=80";

function CategoryPanel({cat}:{cat:MenuCategoryData}) {
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.4}}>
      <div style={{marginBottom:"28px"}}>
        <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:R,textTransform:"uppercase",marginBottom:"8px"}}>{cat.tagline}</p>
        <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(1.8rem,4vw,2.8rem)",color:I,lineHeight:1}}>{cat.label}</h2>
        <div style={{width:"40px",height:"1px",background:R,marginTop:"16px"}}/>
      </div>
      <div style={{border:"1px solid rgba(163,77,38,0.12)",background:"rgba(17,49,34,0.4)"}}>
        {cat.subGroups.map((g,i)=><SubGroup key={i} group={g}/>)}
      </div>
    </motion.div>
  );
}

export default function Menus() {
  const [activeId,setActiveId]=useState(MENU_CATEGORIES[0].id);
  const active=MENU_CATEGORIES.find(c=>c.id===activeId)||MENU_CATEGORIES[0];
  const activeBg=(active as any).image||DEFAULT_IMAGE;
    return (
    <div style={{background:T,minHeight:"100vh"}}>
      <div style={{background:D,borderBottom:"1px solid rgba(163,77,38,0.15)",paddingTop:"120px",paddingBottom:"56px"}}>
        <div className="container mx-auto px-6">
          <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.55em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>Raahi Indian Kitchen · Houston</p>
          <h1 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.5rem,6vw,5rem)",color:I,lineHeight:0.95,marginBottom:"1rem"}}>Our Menu</h1>
          <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.45)",maxWidth:"520px",lineHeight:1.85}}>
            Everything from tandoori starters and South Indian dosas to slow-cooked biryanis, street eats and a full bar. Traditional recipes, fresh every day, in North Houston.
          </p>
          <div style={{marginTop:"1.5rem",display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline" style={{fontSize:"10px"}}>Reserve a Table</a>
            <a href="tel:+13467680068" className="btn-dark-filled" style={{fontSize:"10px"}}>+1 (346) 768-0068</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 shrink-0">
            <div style={{position:"sticky",top:"100px"}}>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:"rgba(163,77,38,0.55)",textTransform:"uppercase",marginBottom:"1rem"}}>Categories</p>
              <nav className="flex lg:flex-col gap-2 flex-wrap">
                {MENU_CATEGORIES.map(cat=>(
                  <button key={cat.id} onClick={()=>setActiveId(cat.id)}
                    style={{textAlign:"left",padding:"12px 16px",fontFamily:"Jost,sans-serif",fontSize:"12px",border:"1px solid",borderColor:activeId===cat.id?"rgba(163,77,38,0.6)":"rgba(163,77,38,0.1)",background:activeId===cat.id?"rgba(163,77,38,0.1)":"transparent",color:activeId===cat.id?R:"rgba(232,224,204,0.45)",cursor:"pointer",transition:"all 0.2s",width:"100%",display:"block"}}>
                    {cat.label}
                  </button>
                ))}
              </nav>
              <div style={{marginTop:"2rem",padding:"20px",background:"rgba(163,77,38,0.06)",border:"1px solid rgba(163,77,38,0.15)"}}>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.4em",color:R,textTransform:"uppercase",marginBottom:"10px"}}>Good to know</p>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.45)",lineHeight:1.75}}>Paranthas until 5 PM daily. Takeout and delivery available. Call us for same-day orders.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <CategoryPanel key={activeId} cat={active}/>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <RaahiMenuFX />
      <div style={{background:D,borderTop:"1px solid rgba(163,77,38,0.15)",padding:"64px 0"}}>
        <div className="container mx-auto px-6 text-center">
          <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3rem)",color:I,marginBottom:"1rem"}}>Come in. We will take care of the rest.</h2>
          <p style={{fontFamily:"Jost,sans-serif",fontSize:"14px",color:"rgba(232,224,204,0.4)",marginBottom:"2rem",maxWidth:"400px",margin:"0 auto 2rem",lineHeight:1.85}}>Walk-ins welcome. Reservations recommended on weekends.</p>
          <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">Reserve a Table</a>
            <a href="tel:+13467680068" className="btn-dark-filled">Call Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
