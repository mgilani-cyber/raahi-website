import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { RESERVATION_URL } from "@/constants";
import barAtmosphere from "@/assets/bar-atmosphere.jpg";
import barPanoramic  from "@/assets/bar-panoramic.jpg";
import foodDark      from "@/assets/food-dark.jpg";
import tableSet      from "@/assets/table-setting.jpg";
import foodPlating   from "@/assets/food-plating.jpg";

const T="#113122",R="#a34d26",I="#e8e0cc",D="#0a1f15";

function FadeUp({children,delay=0}:{children:React.ReactNode;delay?:number}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-40px"});
  return <motion.div ref={ref} initial={{opacity:0,y:28}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.85,delay,ease:[0.25,0.46,0.45,0.94]}}>{children}</motion.div>;
}

const CHAPTERS=[
  {num:"01",label:"The Name",heading:"What Raahi Means",img:foodPlating,
   body:"Raahi is a Hindi word for traveller — someone on a journey. We chose it because that's what food is, when it's done right. Every dish carries you somewhere. A mouthful of sarson da saag and you're in Punjab. A bite of Gongura biryani and you're in Andhra Pradesh. That sense of travel, without leaving your seat — that's Raahi."},
  {num:"02",label:"The Food",heading:"Recipes That Mean Something",img:foodDark,
   body:"North Houston has plenty of Indian restaurants. What was missing was one that took the food seriously — not just tikka masala and naan, but the full breadth of what Indian cooking actually is. Street eats. Dosas. Keema. Gongura. Lamb chops from the clay oven. We cook all of it, and we cook it properly. Fresh every day, nothing from a packet."},
  {num:"03",label:"Chef Akshay",heading:"The Kitchen Behind It All",img:barAtmosphere,
   body:"Chef Akshay brings together classical technique and the kind of flavour memory that only comes from growing up with this food. He's been called the reason people drive across Houston to eat with us. The sarson da saag, the Raahi Special, the tandoori salmon — all his."},
  {num:"04",label:"The Space",heading:"A Room Worth Coming Back To",img:tableSet,
   body:"When you walk into Raahi, the room feels right. Warm light, comfortable booths, music at a volume that lets you actually talk. Whether you're bringing the family for a regular dinner or celebrating something — the space holds both equally well. Rahul and the front-of-house crew make every table feel like a regular's table."},
  {num:"05",label:"North Houston",heading:"Your Neighbourhood Indian Kitchen",img:barPanoramic,
   body:"Raahi is on Tomball Pkwy because North Houston deserved its own Indian restaurant worth talking about. Our regulars tell us they used to drive south for good Indian food. They don't anymore. That's the whole point — to be the place this part of the city could call its own."},
];

export default function Story() {
  const {scrollY}=useScroll();
  const heroY=useTransform(scrollY,[0,500],[0,100]);
  return (
    <div style={{background:T,minHeight:"100vh"}}>
      <div className="relative overflow-hidden" style={{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <motion.div className="absolute inset-0" style={{y:heroY}}>
          <img src={barAtmosphere} alt="Raahi Indian Kitchen" className="w-full h-full object-cover" style={{filter:"brightness(0.22) saturate(0.65)"}}/>
          <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(17,49,34,0.5),rgba(17,49,34,0.75))"}}/>
        </motion.div>
        <div className="relative z-10 text-center px-6" style={{paddingTop:"120px",paddingBottom:"80px"}}>
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.55em",color:R,textTransform:"uppercase",marginBottom:"1.5rem"}}>Our Story</motion.p>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
            style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(3rem,8vw,6rem)",color:I,lineHeight:0.95,marginBottom:"1.5rem"}}>
            One Thousand Flavors<br />in One Place
          </motion.h1>
          <motion.div initial={{width:0}} animate={{width:56}} transition={{delay:0.7,duration:0.55}}
            style={{height:"1px",background:R,margin:"0 auto 1.5rem"}}/>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.85}}
            style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.45)",maxWidth:"480px",margin:"0 auto",lineHeight:1.9}}>
            An authentic Indian restaurant in North Houston — where every dish tells a story, and every visit feels like coming home.
          </motion.p>
        </div>
      </div>

      {CHAPTERS.map((ch,i)=>(
        <div key={ch.num} style={{borderTop:"1px solid rgba(163,77,38,0.12)"}}>
          <div className="container mx-auto px-6 py-16 md:py-24">
            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center"+(i%2!==0?" lg:grid-flow-dense":"")}>
              <div className={i%2!==0?"lg:col-start-2":""}>
                <FadeUp><p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:R,textTransform:"uppercase",marginBottom:"6px"}}>{ch.num} — {ch.label}</p></FadeUp>
                <FadeUp delay={0.06}><h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3.2rem)",color:I,lineHeight:1.05,marginBottom:"1.5rem"}}>{ch.heading}</h2></FadeUp>
                <FadeUp delay={0.12}>
                  <div style={{width:"36px",height:"1px",background:R,marginBottom:"1.5rem"}}/>
                  <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.52)",lineHeight:1.95,maxWidth:"500px"}}>{ch.body}</p>
                </FadeUp>
              </div>
              <div className={i%2!==0?"lg:col-start-1 lg:row-start-1":""}>
                <motion.div className="overflow-hidden" style={{height:"320px"}}
                  initial={{clipPath:"inset(14% 0% 14% 0%)"}} whileInView={{clipPath:"inset(0% 0% 0% 0%)"}} viewport={{once:true}}
                  transition={{duration:1.2,ease:[0.25,0.46,0.45,0.94]}}>
                  <motion.img src={ch.img} alt={ch.heading} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.78)"}}
                    initial={{scale:1.12}} whileInView={{scale:1}} viewport={{once:true}} transition={{duration:1.2,ease:[0.25,0.46,0.45,0.94]}}/>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div style={{background:D,borderTop:"1px solid rgba(163,77,38,0.15)",padding:"80px 0"}}>
        <div className="container mx-auto px-6 text-center">
          <FadeUp>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>Come Experience It</p>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3.5rem)",color:I,marginBottom:"1rem"}}>The story is better tasted than told.</h2>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"14px",color:"rgba(232,224,204,0.4)",maxWidth:"380px",margin:"0 auto 2rem",lineHeight:1.85}}>
              17695 Tomball Pkwy, Houston TX 77064.<br />Open 7 days. Tuesday from 5 PM, all other days from 11 AM.
            </p>
            <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">Reserve a Table</a>
              <Link to="/menus" className="btn-dark-filled">See the Menu</Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
