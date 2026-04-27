import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { INSTAGRAM_URL } from "@/constants";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.png";
import gallery8 from "@/assets/gallery-8.png";
import barAtmosphere from "@/assets/bar-atmosphere.jpg";
import barPanoramic  from "@/assets/bar-panoramic.jpg";
import foodDark      from "@/assets/food-dark.jpg";
import foodPlating   from "@/assets/food-plating.jpg";
import tableSet      from "@/assets/table-setting.jpg";
import womanCocktail from "@/assets/woman-cocktail.jpg";

const T="#113122",R="#a34d26",I="#e8e0cc",D="#0a1f15";

const IMAGES=[
  {src:gallery1,caption:"Raahi Indian Kitchen — North Houston"},
  {src:gallery2,caption:"Crafted cocktails with an Indian soul"},
  {src:gallery3,caption:"From the clay oven"},
  {src:gallery4,caption:"The dining room"},
  {src:gallery5,caption:"Street eats done properly"},
  {src:gallery6,caption:"Sweet endings"},
  {src:gallery7,caption:"Private dining at Raahi"},
  {src:gallery8,caption:"An evening at Raahi"},
  {src:barAtmosphere,caption:"The atmosphere"},
  {src:barPanoramic,caption:"The full room"},
  {src:foodDark,caption:"Our kitchen"},
  {src:foodPlating,caption:"Plating with care"},
  {src:tableSet,caption:"A table set for you"},
  {src:womanCocktail,caption:"The bar menu"},
];

export default function Gallery() {
  const [selected,setSelected]=useState<number|null>(null);
  return (
    <div style={{background:T,minHeight:"100vh"}}>
      <div style={{background:D,paddingTop:"120px",paddingBottom:"56px",borderBottom:"1px solid rgba(163,77,38,0.15)"}}>
        <div className="container mx-auto px-6">
          <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.55em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>Photography</p>
          <h1 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.5rem,6vw,5rem)",color:I,lineHeight:0.95,marginBottom:"1rem"}}>Gallery</h1>
          <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.45)",maxWidth:"440px",lineHeight:1.85}}>
            A look inside Raahi — the food, the space, the bar. Follow us on Instagram for more.
          </p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
            style={{display:"inline-block",marginTop:"1rem",fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(163,77,38,0.6)",textTransform:"uppercase"}}>
            @raahi_hou on Instagram →
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {IMAGES.map((img,i)=>(
            <motion.div key={i} className="overflow-hidden cursor-pointer relative group"
              style={{aspectRatio:"1/1"}}
              initial={{opacity:0,scale:0.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
              transition={{duration:0.6,delay:i*0.04}}
              onClick={()=>setSelected(i)}>
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{filter:"brightness(0.72) saturate(0.85)"}}/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{background:"linear-gradient(to top,rgba(17,49,34,0.8),transparent)"}}>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"11px",color:"rgba(232,224,204,0.8)",letterSpacing:"0.05em"}}>{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected!==null&&(
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            style={{background:"rgba(10,31,21,0.95)"}}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={()=>setSelected(null)}>
            <button onClick={()=>setSelected(null)} className="absolute top-6 right-6"
              style={{color:"rgba(232,224,204,0.5)",background:"none",border:"none",cursor:"pointer"}}><X size={24}/></button>
            <motion.img src={IMAGES[selected].src} alt={IMAGES[selected].caption}
              className="max-w-full max-h-[85vh] object-contain"
              initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
              onClick={e=>e.stopPropagation()}/>
            <p style={{position:"absolute",bottom:"24px",left:"50%",transform:"translateX(-50%)",fontFamily:"Jost,sans-serif",fontSize:"11px",letterSpacing:"0.3em",color:"rgba(232,224,204,0.4)",textTransform:"uppercase",whiteSpace:"nowrap"}}>
              {IMAGES[selected].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
