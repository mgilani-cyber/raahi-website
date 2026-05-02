import { useRef } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { RESERVATION_URL } from "@/constants";

const G="#d4af58",I="#e8e0cc",T="#0b1e14",D="#0f2818";

const CHAPTERS=[
  {num:"01",label:"The Name",heading:"What Raahi Means",from:"left",
   img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=80",
   body:"Raahi is a Hindi word for traveller — someone on a journey. We chose it because that's what food is, when it's done right. Every dish carries you somewhere. A mouthful of sarson da saag and you're in Punjab. A bite of Gongura biryani and you're in Andhra Pradesh. That sense of travel, without leaving your seat — that's Raahi."},
  {num:"02",label:"The Food",heading:"Recipes That Mean Something",from:"right",
   img:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=80",
   body:"North Houston has plenty of Indian restaurants. What was missing was one that took the food seriously — not just tikka masala and naan, but the full breadth of what Indian cooking actually is. Street eats. Dosas. Keema. Gongura. Lamb chops from the clay oven. We cook all of it, and we cook it properly. Fresh every day, nothing from a packet."},
  {num:"03",label:"Chef Akshay",heading:"The Kitchen Behind It All",from:"left",
   img:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&q=80",
   body:"Chef Akshay brings together classical technique and the kind of flavour memory that only comes from growing up with this food. He's been called the reason people drive across the city to eat with us. The sarson da saag, the Raahi Special, the tandoori salmon — all his."},
  {num:"04",label:"The Space",heading:"A Room Worth Coming Back To",from:"right",
   img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
   body:"When you walk into Raahi, the room feels right. Warm light, comfortable booths, music at a volume that lets you actually talk. Whether you're bringing the family for a regular dinner or celebrating something — the space holds both equally well. Rahul and the front-of-house crew make every table feel like a regular's table."},
  {num:"05",label:"Our Kitchen",heading:"Your Neighbourhood Indian Kitchen",from:"left",
   img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=80",
   body:"Raahi is on Tomball Pkwy because this part of the city deserved its own Indian restaurant worth talking about. Our regulars tell us they used to drive south for good Indian food. They don't anymore. That's the whole point — to be the place this neighbourhood could call its own."},
];

function ChapterSection({ch,i}:{ch:typeof CHAPTERS[0];i:number}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-80px"});
  const isRight=ch.from==="right";

  return (
    <div ref={ref} style={{borderTop:"1px solid rgba(212,175,88,0.08)"}}>
      <div className="container mx-auto px-8 py-20 md:py-28">
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center"+(isRight?" lg:grid-flow-dense":"")}>

          {/* Text block — slides in */}
          <motion.div className={isRight?"lg:col-start-2":""}
            initial={{opacity:0,x:ch.from==="left"?-80:80}}
            animate={v?{opacity:1,x:0}:{}}
            transition={{duration:1,ease:[0.25,0.46,0.45,0.94]}}>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.55em",color:"rgba(212,175,88,0.55)",textTransform:"uppercase",marginBottom:"8px"}}>
              {ch.num} — {ch.label}
            </p>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3.2rem)",color:I,lineHeight:1.05,marginBottom:"1.5rem"}}>
              {ch.heading}
            </h2>
            <div className="gold-rule" style={{width:"40px",marginBottom:"1.5rem"}}/>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.5)",lineHeight:1.95,maxWidth:"500px"}}>
              {ch.body}
            </p>
          </motion.div>

          {/* Image block — slides in from opposite side */}
          <motion.div className={isRight?"lg:col-start-1 lg:row-start-1":""}
            initial={{opacity:0,x:ch.from==="left"?80:-80,scale:0.96}}
            animate={v?{opacity:1,x:0,scale:1}:{}}
            transition={{duration:1.1,delay:0.1,ease:[0.25,0.46,0.45,0.94]}}>
            <div style={{position:"relative",overflow:"hidden",height:"380px",border:`1px solid rgba(212,175,88,0.1)`}}>
              <img src={ch.img} alt={ch.heading}
                style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.78) saturate(0.88)",transform:"scale(1.04)",transition:"transform 0.8s ease"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1.08)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1.04)";}}/>
              {/* Gold corner accents */}
              <div style={{position:"absolute",top:"16px",left:"16px",width:"24px",height:"1px",background:G,opacity:0.6}}/>
              <div style={{position:"absolute",top:"16px",left:"16px",width:"1px",height:"24px",background:G,opacity:0.6}}/>
              <div style={{position:"absolute",bottom:"16px",right:"16px",width:"24px",height:"1px",background:G,opacity:0.6}}/>
              <div style={{position:"absolute",bottom:"16px",right:"16px",width:"1px",height:"24px",background:G,opacity:0.6}}/>
              {/* Chapter number overlay */}
              <div style={{position:"absolute",top:"16px",right:"20px",fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"4rem",color:"rgba(212,175,88,0.08)",lineHeight:1,fontWeight:300}}>
                {ch.num}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Story() {
  const {scrollY}=useScroll();
  const heroY=useTransform(scrollY,[0,600],[0,120]);
  const heroOp=useTransform(scrollY,[0,400],[1,0]);

  return (
    <div style={{background:T,minHeight:"100vh"}}>
      {/* Hero with ContainerScroll */}
      <div style={{background:"#0b1e14",paddingTop:"80px"}}>
        <ContainerScroll
          titleComponent={
            <div style={{textAlign:"center",paddingBottom:"2rem"}}>
              <span className="section-label" style={{marginBottom:"1.2rem",display:"block",textAlign:"center"}}>Our Story</span>
              <h1 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.5rem,6vw,5rem)",color:I,lineHeight:0.95,marginBottom:"1rem"}}>
                One Thousand Flavors<br/>in One Place
              </h1>
              <div className="gold-rule" style={{width:"60px",margin:"1rem auto"}}/>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.42)",maxWidth:"480px",margin:"0 auto",lineHeight:1.9}}>
                An authentic Indian restaurant — where every dish tells a story, and every visit feels like coming home.
              </p>
            </div>
          }>
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="Raahi Story"
            style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.75) saturate(0.85)"}}/>
        </ContainerScroll>
      </div>

      {/* Chapter sections — alternating slide-in */}
      {CHAPTERS.map((ch,i)=><ChapterSection key={ch.num} ch={ch} i={i}/>)}

      {/* CTA */}
      <div style={{background:D,borderTop:"1px solid rgba(212,175,88,0.1)",padding:"96px 0"}}>
        <div className="container mx-auto px-8 text-center">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9}}>
            <span className="section-label" style={{marginBottom:"1rem",display:"block",textAlign:"center"}}>Come Experience It</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3.5rem)",color:I,marginBottom:"1rem"}}>
              The story is better tasted than told.
            </h2>
            <div className="gold-rule" style={{width:"60px",margin:"0 auto 1.5rem"}}/>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"14px",color:"rgba(232,224,204,0.38)",maxWidth:"380px",margin:"0 auto 2rem",lineHeight:1.9}}>
              17695 Tomball Pkwy, Houston TX 77064.<br/>Open 7 days. Tuesday from 5 PM, all other days from 11 AM.
            </p>
            <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">Reserve a Table</a>
              <Link to="/menus" className="btn-dark-filled">See the Menu</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
