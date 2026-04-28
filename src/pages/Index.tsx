import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { RESERVATION_URL, INSTAGRAM_URL, PHONE_NUMBER, PHONE_SECONDARY, GOOGLE_MAPS_URL } from "@/constants";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

const G="#d4af58",I="#e8e0cc",T="#081910",D="#0c1e14",R="#a34d26",S="#6f8566";

const HERO_IMG   = "/raahi/11.03.25RaahiIndianKitchen_0013.jpg";
const HERO_IMG2  = "/raahi/11.03.25RaahiIndianKitchen_0038.jpg";
const FOOD1      = "/raahi/11.03.25RaahiIndianKitchen_0098.jpg";
const FOOD2      = "/raahi/RAAHI (4)-2.jpg";
const AMBIENCE1  = "/raahi/RAAHI (4).png";
const AMBIENCE2  = "/raahi/RAAHI (5).png";
const COCKTAIL   = "/raahi/RAAHI (6).png";
const INTERIOR   = "/raahi/RAAHI (7).png";
const DISH1      = "/raahi/RAAHI (8).png";
const DISH2      = "/raahi/H.jpg";
const AI_FOOD1   = "/raahi/ChatGPT Image Aug 26, 2025 at 01_15_58 PM.png";
const AI_FOOD2   = "/raahi/ChatGPT Image Aug 26, 2025 at 01_18_20 PM.png";
const AI_FOOD3   = "/raahi/ChatGPT Image Aug 26, 2025 at 04_05_41 PM.png";
const GEM_IMG    = "/raahi/Gemini_Generated_Image_w1omz8w1omz8w1om.png";

const SLIDER_IMAGES = [HERO_IMG,HERO_IMG2,FOOD1,FOOD2,AMBIENCE1,AMBIENCE2,COCKTAIL,INTERIOR,DISH1,DISH2,AI_FOOD1,AI_FOOD2];

function FadeUp({children,delay=0,className=""}: {children:React.ReactNode;delay?:number;className?:string}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-40px"});
  return <motion.div ref={ref} className={className} initial={{opacity:0,y:32}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.9,delay,ease:[0.25,0.46,0.45,0.94]}}>{}</motion.div>;
}
FadeUp.defaultProps = {};

function RevealImg({src,alt="",className="",delay=0}: {src:string;alt?:string;className?:string;delay?:number}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-8%"});
  return (
    <motion.div ref={ref} className={"overflow-hidden "+className}
      initial={{clipPath:"inset(16% 0% 16% 0%)"}} animate={v?{clipPath:"inset(0% 0% 0% 0%)"}:{}}
      transition={{duration:1.2,delay,ease:[0.25,0.46,0.45,0.94]}}>
      <motion.img src={src} alt={alt} className="w-full h-full object-cover"
        style={{filter:"brightness(0.82) saturate(0.9)"}}
        initial={{scale:1.14}} animate={v?{scale:1}:{}}
        transition={{duration:1.2,delay,ease:[0.25,0.46,0.45,0.94]}} />
    </motion.div>
  );
}

function ParallaxSection({src,children,brightness=0.22,className=""}: {src:string;children:React.ReactNode;brightness?:number;className?:string}) {
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
  const y=useTransform(scrollYProgress,[0,1],["-16%","16%"]);
  return (
    <div ref={ref} className={"relative overflow-hidden "+className}>
      <motion.div className="absolute inset-0 scale-[1.38]" style={{y}}>
        <img src={src} alt="" className="w-full h-full object-cover" style={{filter:`brightness(${brightness})`}}/>
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CountUp({target,suffix=""}: {target:number;suffix?:string}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-60px"});
  const [val,setVal]=useState(0);
  useEffect(()=>{
    if(!v)return;
    const frames=108;let f=0;
    const ease=(t:number)=>1-Math.pow(1-t,3);
    const id=setInterval(()=>{f++;setVal(Math.round(ease(f/frames)*target));if(f>=frames)clearInterval(id);},1000/60);
    return ()=>clearInterval(id);
  },[v,target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const REVIEWS=[
  {q:"There's only a handful of Indian restaurants I'd recommend in Houston. Raahi has entered that list. Chef Akshay has brought amazing flavors and twists to his dishes.",n:"Nisha B."},
  {q:"5 stars for this elegant fine dining restaurant. Excellent service, elegant ambience, delicious food.",n:"Shumail N."},
  {q:"Beautiful place with really good flavored food and impeccable service. Definitely recommend the masala chai.",n:"Emaline"},
  {q:"The ambiance is warm and inviting — great for both casual dining and special occasions.",n:"Jay S."},
  {q:"The sarson ka saag is definitely the best in Houston. Have that with makki ki roti — you won't regret it.",n:"Nisha B."},
  {q:"A must-try for north Houstonians who were otherwise forced to drive south for good Indian food.",n:"Shumail N."},
];

const MARQUEE=["Butter Chicken","Chicken Biryani","Raahi Hurricane","Sarson Da Saag","Mango Lassi","Gol Gappe","Masala Dosa","Lamb Chops","Raahi Margaritas","Gulab Jamun","Palak Paneer","Tandoori Salmon"];

function Hero() {
  const ref=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:["start start","end start"]});
  const imgY    =useTransform(scrollYProgress,[0,1],["0%","30%"]);
  const textY   =useTransform(scrollYProgress,[0,1],["0%","60%"]);
  const opacity =useTransform(scrollYProgress,[0,0.6],[1,0]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{y:imgY}}>
        <img src={HERO_IMG} alt="Raahi Indian Kitchen"
          className="w-full h-full object-cover"
          style={{filter:"brightness(0.35) saturate(0.7)",transform:"scale(1.15)"}}/>
        {/* Luxury gradient overlay */}
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(8,25,16,0.3) 0%,rgba(8,25,16,0.5) 60%,rgba(8,25,16,0.9) 100%)"}}/>
      </motion.div>

      {/* Gold top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(212,175,88,0.4),transparent)"}}/>

      {/* Hero text — scrolls away with image */}
      <motion.div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center"
        style={{y:textY,opacity}}>

        <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.8}}
          style={{marginBottom:"2rem"}}>
          <div style={{height:"1px",width:"60px",background:`linear-gradient(90deg,transparent,${G},transparent)`,margin:"0 auto 2rem"}}/>
          <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.65em",color:G,textTransform:"uppercase",opacity:0.8}}>
            Indian Kitchen
          </p>
        </motion.div>

        <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.5,duration:1.1,ease:[0.25,0.46,0.45,0.94]}}>
          <img src="/raahi-logo.png" alt="Raahi Indian Kitchen"
            style={{width:"clamp(260px,35vw,420px)",height:"auto",filter:"brightness(1.1) drop-shadow(0 0 40px rgba(212,175,88,0.3))"}}/>
        </motion.div>

        <motion.div initial={{width:0}} animate={{width:"80px"}} transition={{delay:1.1,duration:0.8}}
          style={{height:"1px",background:`linear-gradient(90deg,transparent,${G},transparent)`,margin:"2rem auto"}}/>

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}}
          style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(1.1rem,2.5vw,1.6rem)",color:"rgba(232,224,204,0.6)",lineHeight:1.9,maxWidth:"500px",marginBottom:"2.5rem"}}>
          Where tradition meets the table. Authentic Indian food done properly.
        </motion.p>

        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.5}}
          className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
          <Link to="/reservations" className="btn-primary-outline">Reserve a Table</Link>
          <Link to="/menus" className="btn-dark-filled">Explore the Menu</Link>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.55em",color:"rgba(232,224,204,0.2)",textTransform:"uppercase"}}>Scroll</p>
          <motion.div style={{width:1,height:36,background:`linear-gradient(to bottom,${G},transparent)`}}
            animate={{scaleY:[0.3,1,0.3]}} transition={{duration:2,repeat:Infinity}}/>
        </motion.div>
      </motion.div>
    </div>
  );
}

function HomepageContent() {
  return (
    <>
      {/* MARQUEE */}
      <div style={{background:`linear-gradient(90deg,#0a1f15,#0f2818,#0a1f15)`,overflow:"hidden",padding:"16px 0",borderTop:`1px solid rgba(212,175,88,0.1)`,borderBottom:`1px solid rgba(212,175,88,0.1)`}}>
        <div className="marquee-track">
          {[...MARQUEE,...MARQUEE].map((item,i)=>(
            <span key={i} style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.4em",color:"rgba(212,175,88,0.6)",textTransform:"uppercase",flexShrink:0}}>
              {item} <span style={{color:"rgba(212,175,88,0.25)",marginLeft:"1.5rem"}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* IMAGE SLIDER */}
      <div style={{background:D,padding:"64px 0 56px",borderBottom:`1px solid rgba(212,175,88,0.08)`}}>
        <div className="container mx-auto px-6 mb-10">
          <FadeUp>
            <span className="section-label" style={{marginBottom:"10px",display:"block"}}>Inside Raahi</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3rem)",color:I}}>
              A taste of what's waiting.
            </h2>
          </FadeUp>
        </div>
        <ImageAutoSlider images={SLIDER_IMAGES} height="280px" speed={35}/>
      </div>

      {/* WELCOME */}
      <section className="py-20 md:py-28" style={{background:T}}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeUp><span className="section-label" style={{marginBottom:"1.2rem",display:"block"}}>Our Kitchen</span></FadeUp>
              <FadeUp delay={0.1}>
                <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.8rem,5vw,4.5rem)",color:I,lineHeight:"0.95",marginBottom:"1.5rem"}}>
                  Flavours worth<br/><span style={{color:G}}>travelling for.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div style={{width:"48px",height:"1px",background:G,marginBottom:"1.5rem",opacity:0.5}}/>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.5)",lineHeight:1.95,marginBottom:"2rem",maxWidth:"440px"}}>
                  At Raahi, we cook the way it's meant to be cooked — traditional recipes, fresh ingredients, nothing from a packet. Butter chicken that'll ruin every other version for you. Biryani that smells like your grandmother's kitchen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/reservations" className="btn-primary-outline">Book a Table</Link>
                  <Link to="/menus" className="btn-dark-filled">See the Menu</Link>
                </div>
              </FadeUp>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <RevealImg src={FOOD1} className="h-72 lg:h-96"/>
              <RevealImg src={FOOD2} className="h-72 lg:h-96 mt-10" delay={0.15}/>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section style={{background:D,padding:"80px 0",borderTop:`1px solid rgba(212,175,88,0.08)`,borderBottom:`1px solid rgba(212,175,88,0.08)`}}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{border:`1px solid rgba(212,175,88,0.08)`}}>
            {[
              {img:AMBIENCE1,label:"The Food",body:"Every dish comes from a real recipe. Our sarson da saag has been called the best. North Indian, South Indian, street food, biryani — all under one roof, all done properly."},
              {img:INTERIOR,label:"The Space",body:"Warm lighting, comfortable booths, music at a volume that lets you actually talk. A room that feels right whether you're having a quiet dinner for two or celebrating."},
              {img:COCKTAIL,label:"The Bar",body:"Not many Indian restaurants take their bar seriously. We do. The Raahi Hurricane, five signature margaritas, mango lassi — or just a cold Modelo with your biryani."},
            ].map((item,i)=>(
              <FadeUp key={i} delay={i*0.12}>
                <div style={{height:"100%",background:"rgba(212,175,88,0.02)"}}>
                  <div style={{height:"240px",overflow:"hidden"}}>
                    <img src={item.img} alt={item.label} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.65) saturate(0.85)",transition:"transform 0.8s ease"}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1.06)";}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1)";}}/>
                  </div>
                  <div style={{padding:"28px 24px"}}>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:G,textTransform:"uppercase",marginBottom:"10px",opacity:0.7}}>{}</p>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"13.5px",color:"rgba(232,224,204,0.45)",lineHeight:1.85}}>{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section className="py-20 md:py-28" style={{background:T}}>
        <div className="container mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="section-label" style={{marginBottom:"1rem",display:"block",textAlign:"center"}}>What to Order</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3.2rem)",color:I}}>The dishes people come back for.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {num:"01",title:"Paneer",desc:"Palak Paneer, Shahi Paneer, Dal Makhani, Sarson Da Saag — our veg dishes convert meat-eaters.",img:AI_FOOD1},
              {num:"02",title:"Clay Oven",desc:"Lamb chops ($24.99), Tandoori Chicken, Tandoori Salmon. Marinated overnight.",img:DISH1},
              {num:"03",title:"Street Eats",desc:"Gol Gappe, Samosa Chaat, Dahi Bhalla, Aloo Tikki. Served properly.",img:AI_FOOD2},
              {num:"04",title:"Biryani",desc:"Chicken, Lamb, Goat, Paneer, Gongura — nine biryanis. Slow-cooked, never rushed.",img:AI_FOOD3},
            ].map((item,i)=>(
              <FadeUp key={i} delay={i*0.1}>
                <div className="luxury-card" style={{overflow:"hidden"}}>
                  <div style={{height:"200px",overflow:"hidden"}}>
                    <img src={item.img} alt={item.title} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.7)",transition:"transform 0.7s ease"}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1.08)";}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1)";}}/>
                  </div>
                  <div style={{padding:"20px"}}>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.45em",color:G,opacity:0.6,marginBottom:"8px"}}>{}</p>
                    <h3 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.3rem",color:I,marginBottom:"8px"}}>{item.title}</h3>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.42)",lineHeight:1.8}}>{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="text-center mt-12"><Link to="/menus" className="btn-primary-outline">Full Menu</Link></div>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:`linear-gradient(135deg,#1a0f05,#2a1808,#1a0f05)`,padding:"56px 0",borderTop:`1px solid rgba(212,175,88,0.1)`,borderBottom:`1px solid rgba(212,175,88,0.1)`}}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{v:144,s:"+",l:"Google Reviews"},{v:100,s:"+",l:"Menu Items"},{v:4,s:".9★",l:"Google Rating"},{v:9,s:"",l:"Biryanis"}].map((item,i)=>(
              <FadeUp key={i} delay={i*0.1}>
                <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(3rem,6vw,5rem)",color:G,lineHeight:1}}>
                  <CountUp target={item.v} suffix={item.s}/>
                </p>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(212,175,88,0.45)",textTransform:"uppercase",marginTop:"8px"}}>{item.l}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX CTA */}
      <ParallaxSection src={HERO_IMG2} className="py-24 md:py-36">
        <div className="container mx-auto px-6 text-center">
          <FadeUp>
            <span className="section-label" style={{marginBottom:"1.5rem",display:"block",textAlign:"center"}}>A Table for You</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.5rem,6vw,5.5rem)",color:I,lineHeight:1,marginBottom:"1.5rem",maxWidth:"700px",margin:"0 auto 1.5rem"}}>
              You shouldn't have to drive across<br/>the city for great Indian food.
            </h2>
            <div style={{height:"1px",width:"80px",background:`linear-gradient(90deg,transparent,${G},transparent)`,margin:"0 auto 2rem"}}/>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.45)",maxWidth:"480px",margin:"0 auto 2.5rem",lineHeight:1.9}}>
              Raahi is right here — come in once and you'll understand why the regulars keep coming back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reservations" className="btn-primary-outline">Reserve a Table</Link>
              <Link to="/story" className="btn-dark-filled">Our Story</Link>
            </div>
          </FadeUp>
        </div>
      </ParallaxSection>

      {/* REVIEWS */}
      <section className="py-20" style={{background:D,overflow:"hidden"}}>
        <div className="container mx-auto px-6 mb-14 text-center">
          <FadeUp>
            <span className="section-label" style={{marginBottom:"1rem",display:"block",textAlign:"center"}}>Google Reviews</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3rem)",color:I,marginBottom:"6px"}}>What people are saying.</h2>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(212,175,88,0.35)",letterSpacing:"0.2em"}}>4.9 STARS · 144 REVIEWS ON GOOGLE</p>
          </FadeUp>
        </div>
        <div style={{overflow:"hidden"}}>
          <div className="marquee-track" style={{animationDuration:"48s",gap:"20px"}}>
            {[...REVIEWS,...REVIEWS].map((r,i)=>(
              <div key={i} style={{flexShrink:0,width:"360px",background:"rgba(212,175,88,0.03)",border:`1px solid rgba(212,175,88,0.1)`,padding:"32px",borderRadius:"2px"}}>
                <div style={{display:"flex",gap:"3px",marginBottom:"16px"}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:G,fontSize:"13px"}}>★</span>)}</div>
                <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"15px",color:"rgba(232,224,204,0.7)",lineHeight:1.85,marginBottom:"16px"}}>"{}"</p>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.35em",color:"rgba(212,175,88,0.5)",textTransform:"uppercase"}}>— {}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:"40px"}}>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
            style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(212,175,88,0.4)",textTransform:"uppercase"}}>
            Read all reviews →
          </a>
        </div>
      </section>

      {/* VISIT */}
      <ParallaxSection src={AMBIENCE2} brightness={0.15} className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp><span className="section-label" style={{marginBottom:"1.5rem",display:"block"}}>Find Us</span></FadeUp>
              <FadeUp delay={0.1}>
                <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.8rem,5vw,5rem)",color:I,lineHeight:"0.92",marginBottom:"2rem"}}>
                  Your table<br/><span style={{color:G}}>is waiting.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/reservations" className="btn-primary-outline">Reserve Now</Link>
                  <Link to="/menus" className="btn-dark-filled">View the Menu</Link>
                </div>
              </FadeUp>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"28px"}}>
              {[
                {Icon:MapPin,label:"Address",value:"17695 Tomball Pkwy",sub:"Houston, TX 77064"},
                {Icon:Clock,label:"Hours",value:"Tue–Sun · Open for Lunch & Dinner",sub:"Tuesday from 5 PM · All other days 11 AM · Closed Monday"},
                {Icon:Phone,label:"Phone",value:PHONE_NUMBER,sub:PHONE_SECONDARY},
              ].map((item,i)=>(
                <FadeUp key={i} delay={0.15+i*0.12}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:"18px"}}>
                    <div style={{flexShrink:0,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid rgba(212,175,88,0.2)`,background:"rgba(212,175,88,0.04)"}}>
                      <item.Icon size={14} style={{color:"rgba(212,175,88,0.55)"}}/>
                    </div>
                    <div>
                      <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.45em",color:"rgba(212,175,88,0.45)",textTransform:"uppercase",marginBottom:"4px"}}>{item.label}</p>
                      <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",color:"rgba(232,224,204,0.8)",fontSize:"1.05rem"}}>{item.value}</p>
                      <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.28)",marginTop:"2px"}}>{item.sub}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
              <FadeUp delay={0.5}>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:"6px",fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(212,175,88,0.45)",textTransform:"uppercase"}}>
                  Get Directions <ArrowRight size={10}/>
                </a>
              </FadeUp>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* INSTAGRAM */}
      <section className="py-20" style={{background:T}}>
        <div className="container mx-auto px-6 mb-12">
          <FadeUp>
            <div className="flex items-end justify-between">
              <div>
                <span className="section-label" style={{marginBottom:"8px",display:"block"}}>Follow Along</span>
                <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3rem)",color:I}}>Find Us on Instagram</h2>
              </div>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hidden md:block"
                style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.38em",color:"rgba(212,175,88,0.35)",textTransform:"uppercase"}}>@raahi_hou</a>
            </div>
          </FadeUp>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-px">
          {[FOOD1,FOOD2,AMBIENCE1,AMBIENCE2,COCKTAIL,INTERIOR,DISH1,DISH2,AI_FOOD1,AI_FOOD2,AI_FOOD3,GEM_IMG].map((src,i)=>(
            <motion.a key={i} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="relative overflow-hidden group block" style={{aspectRatio:"1/1"}}
              initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
              transition={{duration:0.6,delay:i*0.04}}>
              <img src={src} alt="Raahi Indian Kitchen" loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{filter:"brightness(0.6) saturate(0.8)"}}/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{background:"rgba(8,25,16,0.5)",border:`1px solid rgba(212,175,88,0.2)`}}/>
            </motion.a>
          ))}
        </div>
      </section>
    </>
  );
}

const Index = () => <><Hero/><HomepageContent/></>;
export default Index;
