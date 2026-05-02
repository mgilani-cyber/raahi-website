import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { RESERVATION_URL, INSTAGRAM_URL, PHONE_NUMBER, PHONE_SECONDARY, GOOGLE_MAPS_URL } from "@/constants";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

const G="#d4af58",I="#e8e0cc",T="#0b1e14",D="#0f2818";

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
  "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=800&q=80",
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
  "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
  "/raahi/11.03.25RaahiIndianKitchen_0013.jpg",
  "/raahi/11.03.25RaahiIndianKitchen_0038.jpg",
  "/raahi/11.03.25RaahiIndianKitchen_0098.jpg",
];

function FadeUp({children,delay=0,className=""}:{children:React.ReactNode;delay?:number;className?:string}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-40px"});
  return <motion.div ref={ref} className={className} initial={{opacity:0,y:28}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.85,delay,ease:[0.25,0.46,0.45,0.94]}}>{children}</motion.div>;
}

function SlideIn({children,delay=0,from="left"}:{children:React.ReactNode;delay?:number;from?:"left"|"right"}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-60px"});
  return <motion.div ref={ref} initial={{opacity:0,x:from==="left"?-50:50}} animate={v?{opacity:1,x:0}:{}} transition={{duration:0.9,delay,ease:[0.25,0.46,0.45,0.94]}}>{children}</motion.div>;
}

function RevealImg({src,alt="",className="",delay=0}:{src:string;alt?:string;className?:string;delay?:number}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-8%"});
  return (
    <motion.div ref={ref} className={"overflow-hidden "+className}
      initial={{clipPath:"inset(15% 0% 15% 0%)"}} animate={v?{clipPath:"inset(0% 0% 0% 0%)"}:{}}
      transition={{duration:1.1,delay,ease:[0.25,0.46,0.45,0.94]}}>
      <motion.img src={src} alt={alt} className="w-full h-full object-cover"
        style={{filter:"brightness(0.82)"}} initial={{scale:1.1}} animate={v?{scale:1}:{}}
        transition={{duration:1.1,delay}}/>
    </motion.div>
  );
}

function ParallaxSection({src,children,brightness=0.25,className=""}:{src:string;children:React.ReactNode;brightness?:number;className?:string}) {
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
  const y=useTransform(scrollYProgress,[0,1],["-15%","15%"]);
  return (
    <div ref={ref} className={"relative overflow-hidden "+className}>
      <motion.div className="absolute inset-0 scale-[1.35]" style={{y}}>
        <img src={src} alt="" className="w-full h-full object-cover" style={{filter:`brightness(${brightness})`}}/>
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CountUp({target,suffix=""}:{target:number;suffix?:string}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-60px"});
  const [val,setVal]=useState(0);
  useEffect(()=>{
    if(!v)return;
    const frames=108;let f=0;
    const ease=(t:number)=>1-Math.pow(1-t,3);
    const id=setInterval(()=>{f++;setVal(Math.round(ease(f/frames)*target));if(f>=frames)clearInterval(id);},1000/60);
    return()=>clearInterval(id);
  },[v,target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const REVIEWS=[
  {q:"There's only a handful of Indian restaurants I'd recommend in Houston. Raahi has entered that list. Chef Akshay has brought amazing flavors and twists to his dishes.",n:"Nisha B."},
  {q:"5 stars for this elegant fine dining restaurant. Excellent service, elegant ambience, delicious food.",n:"Shumail N."},
  {q:"Beautiful place with really good flavored food and impeccable service.",n:"Emaline"},
  {q:"The ambiance is warm and inviting — great for both casual dining and special occasions.",n:"Jay S."},
  {q:"The sarson ka saag is definitely the best in Houston. With makki ki roti — you won't regret it.",n:"Nisha B."},
  {q:"A must-try for north Houstonians who were otherwise forced to drive south for good Indian food.",n:"Shumail N."},
];

const MARQUEE=["Butter Chicken","Chicken Biryani","Raahi Hurricane","Sarson Da Saag","Mango Lassi","Gol Gappe","Masala Dosa","Lamb Chops","Raahi Margaritas","Gulab Jamun","Palak Paneer","Tandoori Salmon"];

function Hero() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/raahi/11.03.25RaahiIndianKitchen_0038.jpg"
      bgImageSrc="/raahi/11.03.25RaahiIndianKitchen_0013.jpg"
      title="Raahi Indian Kitchen"
      subtitle="Traditional Indian food, done properly."
      scrollToExpand="Scroll to enter"
    />
  );
}

function HomepageContent() {
  return (
    <>
      {/* MARQUEE */}
      <div style={{background:`linear-gradient(90deg,${D},#0f2818,${D})`,overflow:"hidden",padding:"14px 0",borderTop:"1px solid rgba(212,175,88,0.07)",borderBottom:"1px solid rgba(212,175,88,0.07)"}}>
        <div className="marquee-track">
          {[...MARQUEE,...MARQUEE].map((item,i)=>(
            <span key={i} style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.4em",color:"rgba(212,175,88,0.52)",textTransform:"uppercase",flexShrink:0}}>
              {item} <span style={{color:"rgba(212,175,88,0.2)",marginLeft:"1.5rem"}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* IMAGE SLIDER */}
      <div style={{background:D,padding:"56px 0 48px"}}>
        <div className="container mx-auto px-8 mb-10">
          <FadeUp>
            <span className="section-label" style={{marginBottom:"8px",display:"block"}}>Inside Raahi</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(1.6rem,3vw,2.4rem)",color:I}}>A taste of what's waiting.</h2>
          </FadeUp>
        </div>
        <ImageAutoSlider images={FOOD_IMAGES} height="260px" speed={32}/>
      </div>

      {/* WELCOME */}
      <section className="py-20 md:py-28" style={{background:T}}>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideIn from="left">
              <span className="section-label" style={{marginBottom:"1rem",display:"block"}}>Our Kitchen</span>
              <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.2rem,4vw,3.8rem)",color:I,lineHeight:"0.97",marginBottom:"1.2rem"}}>
                Houston's favourite<br/><span style={{color:G}}>Indian kitchen.</span>
              </h2>
              <div className="gold-rule" style={{width:"40px",marginBottom:"1.2rem"}}/>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"14px",color:"rgba(232,224,204,0.48)",lineHeight:1.9,marginBottom:"1.8rem",maxWidth:"420px"}}>
                At Raahi, we cook the way it's meant to be cooked — traditional recipes, fresh ingredients, nothing from a packet. Butter chicken that'll ruin every other version for you. Biryani that smells like your grandmother's kitchen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/reservations" className="btn-primary-outline" style={{fontSize:"10px",padding:"0.7rem 1.8rem"}}>Book a Table</Link>
                <Link to="/menus" className="btn-dark-filled" style={{fontSize:"10px",padding:"0.7rem 1.8rem"}}>See the Menu</Link>
              </div>
            </SlideIn>
            <SlideIn from="right" delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                <RevealImg src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80" className="h-64 lg:h-80"/>
                <RevealImg src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80" className="h-64 lg:h-80 mt-8" delay={0.15}/>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section style={{background:D,padding:"72px 0",borderTop:"1px solid rgba(212,175,88,0.06)",borderBottom:"1px solid rgba(212,175,88,0.06)"}}>
        <div className="container mx-auto px-8">
          <FadeUp className="mb-14 text-center">
            <span className="section-label" style={{marginBottom:"0.8rem",display:"block",textAlign:"center"}}>Why Raahi</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",color:I}}>
              One thousand flavors. One address.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",label:"The Food",body:"Every dish comes from a real recipe. Our sarson da saag has been called the best. North Indian, South Indian, street food, biryani — all done properly."},
              {img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",label:"The Space",body:"A room that feels right whether you're having a quiet dinner for two or celebrating. Warm lighting, comfortable booths, a team that cares."},
              {img:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",label:"The Bar",body:"The Raahi Hurricane, five signature margaritas, mango lassi — or a cold Modelo with your biryani. We take our bar seriously."},
            ].map((item,i)=>(
              <FadeUp key={i} delay={i*0.12}>
                <div className="luxury-card" style={{overflow:"hidden"}}>
                  <div style={{height:"200px",overflow:"hidden",position:"relative"}}>
                    <img src={item.img} alt={item.label} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.68)",transition:"transform 0.7s, filter 0.5s"}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1.06)";el.style.filter="brightness(0.82)";}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1)";el.style.filter="brightness(0.68)";}}/>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,transparent,${G},transparent)`,opacity:0.6}}/>
                  </div>
                  <div style={{padding:"20px"}}>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.48em",color:G,textTransform:"uppercase",marginBottom:"8px",opacity:0.7}}>{item.label}</p>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"13px",color:"rgba(232,224,204,0.44)",lineHeight:1.82}}>{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section className="py-20 md:py-28" style={{background:T}}>
        <div className="container mx-auto px-8">
          <FadeUp className="text-center mb-14">
            <span className="section-label" style={{marginBottom:"0.8rem",display:"block",textAlign:"center"}}>What to Order</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",color:I}}>
              The dishes people drive across the city for.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {num:"01",title:"Paneer & Vegetarian",desc:"Palak Paneer, Shahi Paneer, Dal Makhani, Sarson Da Saag.",img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80"},
              {num:"02",title:"From the Clay Oven",desc:"Lamb chops ($24.99), Tandoori Chicken, Tandoori Salmon.",img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80"},
              {num:"03",title:"Indian Street Eats",desc:"Gol Gappe, Samosa Chaat, Dahi Bhalla, Aloo Tikki.",img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"},
              {num:"04",title:"Biryani",desc:"Nine biryanis — Chicken, Lamb, Goat, Paneer, Gongura.",img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80"},
            ].map((item,i)=>(
              <FadeUp key={i} delay={i*0.08}>
                <div className="luxury-card" style={{overflow:"hidden"}}>
                  <div style={{height:"160px",overflow:"hidden"}}>
                    <img src={item.img} alt={item.title} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.68)",transition:"transform 0.6s, filter 0.5s"}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1.08)";el.style.filter="brightness(0.82)";}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1)";el.style.filter="brightness(0.68)";}}/>
                  </div>
                  <div style={{padding:"18px"}}>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.42em",color:G,opacity:0.6,marginBottom:"6px"}}>{item.num}</p>
                    <h3 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.2rem",color:I,marginBottom:"6px"}}>{item.title}</h3>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.4)",lineHeight:1.75}}>{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menus" className="btn-primary-outline" style={{fontSize:"10px",padding:"0.7rem 2rem"}}>Full Menu</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:`linear-gradient(135deg,${D},#162b1e,${D})`,padding:"52px 0",borderTop:"1px solid rgba(212,175,88,0.1)",borderBottom:"1px solid rgba(212,175,88,0.1)"}}>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{v:144,s:"+",l:"Google Reviews"},{v:100,s:"+",l:"Menu Items"},{v:4,s:".9★",l:"Google Rating"},{v:9,s:"",l:"Biryanis"}].map((item,i)=>(
              <FadeUp key={i} delay={i*0.08}>
                <div style={{padding:"20px 12px",border:"1px solid rgba(212,175,88,0.1)",background:"rgba(212,175,88,0.03)"}}>
                  <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.2rem,4vw,3.5rem)",color:G,lineHeight:1}}>
                    <CountUp target={item.v} suffix={item.s}/>
                  </p>
                  <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.3em",color:"rgba(212,175,88,0.48)",textTransform:"uppercase",marginTop:"6px"}}>{item.l}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX CTA */}
      <ParallaxSection src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1920&q=80" className="py-24 md:py-36">
        <div className="container mx-auto px-8 text-center">
          <FadeUp>
            <span className="section-label" style={{marginBottom:"1.2rem",display:"block",textAlign:"center"}}>A Table for You</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,5vw,4.5rem)",color:I,lineHeight:1.05,marginBottom:"1.2rem",maxWidth:"640px",margin:"0 auto 1.2rem"}}>
              You shouldn't have to drive for great Indian food.
            </h2>
            <div className="gold-rule" style={{width:"60px",margin:"0 auto 1.8rem"}}/>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"14px",color:"rgba(232,224,204,0.45)",maxWidth:"420px",margin:"0 auto 2rem",lineHeight:1.9}}>
              Raahi is right here — come in once and you'll understand why the regulars keep coming back.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/reservations" className="btn-primary-outline" style={{fontSize:"10px",padding:"0.7rem 1.8rem"}}>Reserve a Table</Link>
              <Link to="/story" className="btn-dark-filled" style={{fontSize:"10px",padding:"0.7rem 1.8rem"}}>Our Story</Link>
            </div>
          </FadeUp>
        </div>
      </ParallaxSection>

      {/* REVIEWS */}
      <section className="py-18" style={{background:D,overflow:"hidden"}}>
        <div className="container mx-auto px-8 mb-12 text-center">
          <FadeUp>
            <span className="section-label" style={{marginBottom:"0.8rem",display:"block",textAlign:"center"}}>Google Reviews</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",color:I,marginBottom:"4px"}}>What people are saying.</h2>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",color:"rgba(212,175,88,0.35)",letterSpacing:"0.25em"}}>4.9 STARS · 144 REVIEWS</p>
          </FadeUp>
        </div>
        <div style={{overflow:"hidden"}}>
          <div className="marquee-track" style={{animationDuration:"48s",gap:"16px"}}>
            {[...REVIEWS,...REVIEWS].map((r,i)=>(
              <div key={i} style={{flexShrink:0,width:"320px",background:"rgba(212,175,88,0.03)",border:"1px solid rgba(212,175,88,0.09)",padding:"24px",position:"relative"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:`linear-gradient(90deg,transparent,${G},transparent)`,opacity:0.4}}/>
                <div style={{display:"flex",gap:"3px",marginBottom:"12px"}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:G,fontSize:"11px"}}>★</span>)}</div>
                <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"14px",color:"rgba(232,224,204,0.65)",lineHeight:1.82,marginBottom:"12px"}}>"{r.q}"</p>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.35em",color:"rgba(212,175,88,0.45)",textTransform:"uppercase"}}>— {r.n}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:"32px"}}>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
            style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.28em",color:"rgba(212,175,88,0.38)",textTransform:"uppercase",textDecoration:"none"}}>
            Read all reviews →
          </a>
        </div>
      </section>

      {/* VISIT */}
      <ParallaxSection src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80" brightness={0.18} className="py-20 md:py-28">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <SlideIn from="left">
              <span className="section-label" style={{marginBottom:"1.2rem",display:"block"}}>Find Us</span>
              <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.2rem,4.5vw,4rem)",color:I,lineHeight:"0.94",marginBottom:"1.8rem"}}>
                Your table<br/><span style={{color:G}}>is waiting.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/reservations" className="btn-primary-outline" style={{fontSize:"10px",padding:"0.7rem 1.8rem"}}>Reserve Now</Link>
                <Link to="/menus" className="btn-dark-filled" style={{fontSize:"10px",padding:"0.7rem 1.8rem"}}>View the Menu</Link>
              </div>
            </SlideIn>
            <SlideIn from="right" delay={0.1}>
              <div style={{display:"flex",flexDirection:"column",gap:"22px"}}>
                {[
                  {Icon:MapPin,label:"Address",value:"17695 Tomball Pkwy",sub:"Houston, TX 77064"},
                  {Icon:Clock,label:"Hours",value:"Tue–Sun · Open for Dining",sub:"Tuesday from 5 PM · All other days 11 AM · Closed Monday"},
                  {Icon:Phone,label:"Phone",value:PHONE_NUMBER,sub:PHONE_SECONDARY},
                ].map((item,i)=>(
                  <motion.div key={i} initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.15+i*0.1,duration:0.8}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:"16px"}}>
                      <div style={{flexShrink:0,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(212,175,88,0.18)",background:"rgba(212,175,88,0.04)"}}>
                        <item.Icon size={13} style={{color:"rgba(212,175,88,0.58)"}}/>
                      </div>
                      <div>
                        <p style={{fontFamily:"Jost,sans-serif",fontSize:"8px",letterSpacing:"0.48em",color:"rgba(212,175,88,0.42)",textTransform:"uppercase",marginBottom:"3px"}}>{item.label}</p>
                        <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",color:"rgba(232,224,204,0.78)",fontSize:"1rem"}}>{item.value}</p>
                        <p style={{fontFamily:"Jost,sans-serif",fontSize:"11px",color:"rgba(232,224,204,0.26)",marginTop:"1px"}}>{item.sub}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:"6px",fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.3em",color:"rgba(212,175,88,0.42)",textTransform:"uppercase",textDecoration:"none",marginTop:"4px"}}>
                  Get Directions <ArrowRight size={9}/>
                </a>
              </div>
            </SlideIn>
          </div>
        </div>
      </ParallaxSection>

      {/* INSTAGRAM EMBED */}
      <section className="py-18 md:py-24" style={{background:T}}>
        <div className="container mx-auto px-8 mb-10">
          <FadeUp>
            <div className="flex items-end justify-between">
              <div>
                <span className="section-label" style={{marginBottom:"6px",display:"block"}}>Follow Along</span>
                <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(1.8rem,3.5vw,2.6rem)",color:I}}>
                  Find Us on Instagram
                </h2>
              </div>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hidden md:block"
                style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.38em",color:"rgba(212,175,88,0.35)",textTransform:"uppercase",textDecoration:"none"}}>
                @raahi_hou
              </a>
            </div>
          </FadeUp>
        </div>
        {/* Instagram grid using Raahi's real images */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px">
          {[
            "/raahi/11.03.25RaahiIndianKitchen_0013.jpg",
            "/raahi/11.03.25RaahiIndianKitchen_0038.jpg",
            "/raahi/11.03.25RaahiIndianKitchen_0098.jpg",
            "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
            "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
            "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
            "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400",
          ].map((src,i)=>(
            <motion.a key={i} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="relative overflow-hidden block" style={{aspectRatio:"1/1"}}
              initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
              transition={{duration:0.5,delay:i*0.04}}>
              <img src={src} alt="Raahi Indian Kitchen" loading="lazy"
                className="w-full h-full object-cover"
                style={{filter:"brightness(0.62) saturate(0.82)",transition:"filter 0.5s, transform 0.6s"}}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.filter="brightness(0.88) saturate(1)";el.style.transform="scale(1.06)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.filter="brightness(0.62) saturate(0.82)";el.style.transform="scale(1)";}}/>
              <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:`linear-gradient(90deg,transparent,${G},transparent)`,opacity:0,transition:"opacity 0.4s"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.opacity="1";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.opacity="0";}}/>
            </motion.a>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"24px"}}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
            style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.35em",color:"rgba(212,175,88,0.4)",textTransform:"uppercase",textDecoration:"none"}}>
            Follow @raahi_hou →
          </a>
        </div>
      </section>
    </>
  );
}

const Index = () => <><Hero/><HomepageContent/></>;
export default Index;
