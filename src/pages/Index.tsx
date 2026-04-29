import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { RESERVATION_URL, INSTAGRAM_URL, PHONE_NUMBER, PHONE_SECONDARY, GOOGLE_MAPS_URL } from "@/constants";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

const G="#d4af58",I="#e8e0cc",T="#0b1e14",D="#0f2818",S="#6f8566";

const SLIDER_IMAGES = [
  "/raahi/11.03.25RaahiIndianKitchen_0013.jpg",
  "/raahi/11.03.25RaahiIndianKitchen_0038.jpg",
  "/raahi/11.03.25RaahiIndianKitchen_0098.jpg",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
  "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=800&q=80",
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
];

function FadeUp({children,delay=0,className=""}:{children:React.ReactNode;delay?:number;className?:string}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-40px"});
  return <motion.div ref={ref} className={className} initial={{opacity:0,y:32}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.9,delay,ease:[0.25,0.46,0.45,0.94]}}>{children}</motion.div>;
}

function SlideIn({children,delay=0,from="left"}:{children:React.ReactNode;delay?:number;from?:"left"|"right"}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-60px"});
  return <motion.div ref={ref} initial={{opacity:0,x:from==="left"?-60:60}} animate={v?{opacity:1,x:0}:{}} transition={{duration:1,delay,ease:[0.25,0.46,0.45,0.94]}}>{children}</motion.div>;
}

function RevealImg({src,alt="",className="",delay=0}:{src:string;alt?:string;className?:string;delay?:number}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-8%"});
  return (
    <motion.div ref={ref} className={"overflow-hidden "+className}
      initial={{clipPath:"inset(15% 0% 15% 0%)"}} animate={v?{clipPath:"inset(0% 0% 0% 0%)"}:{}}
      transition={{duration:1.2,delay,ease:[0.25,0.46,0.45,0.94]}}>
      <motion.img src={src} alt={alt} className="w-full h-full object-cover"
        style={{filter:"brightness(0.82)"}} initial={{scale:1.12}} animate={v?{scale:1}:{}}
        transition={{duration:1.2,delay}} />
    </motion.div>
  );
}

function ParallaxSection({src,children,brightness=0.22,className=""}:{src:string;children:React.ReactNode;brightness?:number;className?:string}) {
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
  {q:"Beautiful place with really good flavored food and impeccable service. Definitely recommend the masala chai.",n:"Emaline"},
  {q:"The ambiance is warm and inviting — great for both casual dining and special occasions.",n:"Jay S."},
  {q:"The sarson ka saag is definitely the best in Houston. Have that with makki ki roti — you won't regret it.",n:"Nisha B."},
  {q:"A must-try for north Houstonians who were otherwise forced to drive south for good Indian food.",n:"Shumail N."},
];

const MARQUEE=["Butter Chicken","Chicken Biryani","Raahi Hurricane","Sarson Da Saag","Mango Lassi","Gol Gappe","Masala Dosa","Lamb Chops","Raahi Margaritas","Gulab Jamun","Palak Paneer","Tandoori Salmon"];

function Hero() {
  const {scrollY}=useScroll();
  const bgY=useTransform(scrollY,[0,700],[0,140]);
  const textY=useTransform(scrollY,[0,500],[0,120]);
  const opacity=useTransform(scrollY,[0,450],[1,0]);

  return (
    <div className="relative overflow-hidden" style={{height:"100vh",minHeight:"600px"}}>
      {/* Background image parallax */}
      <motion.div className="absolute inset-0 scale-[1.15]" style={{y:bgY}}>
        <img src="/raahi/11.03.25RaahiIndianKitchen_0013.jpg"
          alt="Raahi Indian Kitchen"
          className="w-full h-full object-cover"
          style={{filter:"brightness(0.28) saturate(0.65)"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(11,30,20,0.3) 0%,rgba(11,30,20,0.6) 60%,rgba(11,30,20,0.95) 100%)"}}/>
      </motion.div>

      {/* Floating video frame in center */}
      <motion.div className="absolute inset-0 flex items-center justify-center z-[2]" style={{y:bgY,opacity}}>
        <motion.div
          initial={{opacity:0,scale:0.85}}
          animate={{opacity:1,scale:1}}
          transition={{delay:0.6,duration:1.2,ease:[0.25,0.46,0.45,0.94]}}
          style={{
            width:"clamp(280px,45vw,600px)",
            aspectRatio:"16/9",
            border:`1px solid rgba(212,175,88,0.35)`,
            boxShadow:"0 0 80px rgba(212,175,88,0.08), 0 40px 120px rgba(0,0,0,0.6)",
            overflow:"hidden",
            position:"relative",
          }}>
          {/* Top gold line */}
          <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:`linear-gradient(90deg,transparent,${G},transparent)`,zIndex:10}}/>
          {/* Video — use a restaurant atmosphere video */}
          <video
            autoPlay muted loop playsInline
            style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.85) saturate(0.9)"}}
            poster="/raahi/11.03.25RaahiIndianKitchen_0038.jpg">
            <source src="/cocktail-video.mp4" type="video/mp4"/>
            {/* Fallback image if no video */}
            <img src="/raahi/11.03.25RaahiIndianKitchen_0038.jpg" alt="Raahi" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </video>
          {/* Corner accents */}
          <div style={{position:"absolute",top:"10px",left:"10px",width:"20px",height:"1px",background:G,zIndex:10}}/>
          <div style={{position:"absolute",top:"10px",left:"10px",width:"1px",height:"20px",background:G,zIndex:10}}/>
          <div style={{position:"absolute",bottom:"10px",right:"10px",width:"20px",height:"1px",background:G,zIndex:10}}/>
          <div style={{position:"absolute",bottom:"10px",right:"10px",width:"1px",height:"20px",background:G,zIndex:10}}/>
        </motion.div>
      </motion.div>

      {/* Hero text — scrolls away */}
      <motion.div className="absolute inset-0 flex flex-col items-center justify-center z-[3] px-6 text-center pointer-events-none"
        style={{y:textY,opacity}}>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
          style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.65em",color:G,textTransform:"uppercase",marginBottom:"clamp(160px,20vw,240px)"}}>
          Indian Kitchen
        </motion.p>
        {/* Logo */}
        <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.5,duration:1}}>
          <img src="/raahi-logo.png" alt="Raahi Indian Kitchen"
            style={{width:"clamp(200px,28vw,360px)",height:"auto",filter:"brightness(1.1) drop-shadow(0 0 30px rgba(212,175,88,0.25))",marginBottom:"1.5rem"}}
            onError={e=>{
              const img=e.currentTarget as HTMLImageElement;
              img.style.display="none";
              const p=document.createElement("p");
              p.style.cssText=`font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:clamp(4rem,10vw,8rem);color:#e8e0cc;line-height:1;`;
              p.textContent="Raahi";
              img.parentNode?.insertBefore(p,img);
            }}/>
        </motion.div>
        <motion.div initial={{width:0}} animate={{width:"70px"}} transition={{delay:1.1,duration:0.7}}
          style={{height:"1px",background:`linear-gradient(90deg,transparent,${G},transparent)`,margin:"0 auto 1.5rem"}}/>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}}
          style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.45)",lineHeight:1.9,maxWidth:"460px",marginBottom:"2.5rem"}}>
          Traditional Indian food, done properly.
        </motion.p>
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.5}}
          className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
          <Link to="/reservations" className="btn-primary-outline">Reserve a Table</Link>
          <Link to="/menus" className="btn-dark-filled">Explore the Menu</Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[4]"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}>
        <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.55em",color:"rgba(232,224,204,0.2)",textTransform:"uppercase"}}>Scroll</p>
        <motion.div style={{width:1,height:36,background:`linear-gradient(to bottom,${G},transparent)`}}
          animate={{scaleY:[0.3,1,0.3]}} transition={{duration:2,repeat:Infinity}}/>
      </motion.div>
    </div>
  );
}

function HomepageContent() {
  return (
    <>
      {/* MARQUEE */}
      <div style={{background:`linear-gradient(90deg,${D},#0f2818,${D})`,overflow:"hidden",padding:"15px 0",borderTop:`1px solid rgba(212,175,88,0.08)`,borderBottom:`1px solid rgba(212,175,88,0.08)`}}>
        <div className="marquee-track">
          {[...MARQUEE,...MARQUEE].map((item,i)=>(
            <span key={i} style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.42em",color:"rgba(212,175,88,0.55)",textTransform:"uppercase",flexShrink:0}}>
              {item} <span style={{color:"rgba(212,175,88,0.2)",marginLeft:"1.5rem"}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* IMAGE SLIDER */}
      <div style={{background:D,padding:"64px 0 56px",borderBottom:`1px solid rgba(212,175,88,0.06)`}}>
        <div className="container mx-auto px-8 mb-10">
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
      <section className="py-24 md:py-32" style={{background:T}}>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <SlideIn from="left">
              <span className="section-label" style={{marginBottom:"1.2rem",display:"block"}}>Our Kitchen</span>
              <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.8rem,5vw,4.5rem)",color:I,lineHeight:"0.95",marginBottom:"1.5rem"}}>
                Houston's favourite<br/><span style={{color:G}}>Indian kitchen.</span>
              </h2>
              <div className="gold-rule" style={{width:"48px",marginBottom:"1.5rem"}}/>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.5)",lineHeight:1.95,marginBottom:"2rem",maxWidth:"440px"}}>
                At Raahi, we cook the way it's meant to be cooked — traditional recipes, fresh ingredients, nothing from a packet. Butter chicken that'll ruin every other version for you. Biryani that smells like your grandmother's kitchen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/reservations" className="btn-primary-outline">Book a Table</Link>
                <Link to="/menus" className="btn-dark-filled">See the Menu</Link>
              </div>
            </SlideIn>
            <SlideIn from="right" delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <RevealImg src="/raahi/11.03.25RaahiIndianKitchen_0013.jpg" className="h-72 lg:h-96"/>
                <RevealImg src="/raahi/11.03.25RaahiIndianKitchen_0038.jpg" className="h-72 lg:h-96 mt-10" delay={0.15}/>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section style={{background:D,padding:"80px 0",borderTop:`1px solid rgba(212,175,88,0.06)`,borderBottom:`1px solid rgba(212,175,88,0.06)`}}>
        <div className="container mx-auto px-8">
          <FadeUp className="mb-16 text-center">
            <span className="section-label" style={{marginBottom:"1rem",display:"block",textAlign:"center"}}>Why Raahi</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3.2rem)",color:I}}>
              One thousand flavors. One address.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",label:"The Food",body:"Every dish comes from a real recipe — not a shortcut. Our sarson da saag has been called the best. North Indian, South Indian, street food, biryani — all under one roof, all done properly."},
              {img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",label:"The Space",body:"A room that feels right whether you're having a quiet dinner for two or celebrating with the whole family. Warm lighting, comfortable booths, a team that wants you to have a good time."},
              {img:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",label:"The Bar",body:"Not many Indian restaurants take their bar seriously. We do. The Raahi Hurricane, five signature margaritas, mango lassi — or just a cold Modelo with your biryani."},
            ].map((item,i)=>(
              <FadeUp key={i} delay={i*0.15}>
                <div className="luxury-card" style={{overflow:"hidden",height:"100%"}}>
                  <div style={{height:"220px",overflow:"hidden"}}>
                    <img src={item.img} alt={item.label} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.7)",transition:"transform 0.8s ease, filter 0.5s ease"}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1.06)";el.style.filter="brightness(0.85)";}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1)";el.style.filter="brightness(0.7)";}}/>
                    {/* Gold top accent */}
                    <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,transparent,${G},transparent)`}}/>
                  </div>
                  <div style={{padding:"24px",position:"relative"}}>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:G,textTransform:"uppercase",marginBottom:"10px",opacity:0.7}}>{item.label}</p>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"13.5px",color:"rgba(232,224,204,0.45)",lineHeight:1.85}}>{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section className="py-24 md:py-32" style={{background:T}}>
        <div className="container mx-auto px-8">
          <FadeUp className="text-center mb-16">
            <span className="section-label" style={{marginBottom:"1rem",display:"block",textAlign:"center"}}>What to Order</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3.2rem)",color:I}}>
              The dishes people drive across the city for.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {num:"01",title:"Paneer & Vegetarian",desc:"Palak Paneer, Shahi Paneer, Dal Makhani, Sarson Da Saag — our veg dishes convert meat-eaters.",img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80"},
              {num:"02",title:"From the Clay Oven",desc:"Lamb chops ($24.99), Tandoori Chicken, Tandoori Salmon. Marinated overnight.",img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80"},
              {num:"03",title:"Indian Street Eats",desc:"Gol Gappe, Samosa Chaat, Dahi Bhalla, Aloo Tikki. Served properly.",img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"},
              {num:"04",title:"Biryani",desc:"Chicken, Lamb, Goat, Paneer, Gongura — nine biryanis. Slow-cooked, never rushed.",img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80"},
            ].map((item,i)=>(
              <FadeUp key={i} delay={i*0.1}>
                <div className="luxury-card" style={{overflow:"hidden",height:"100%"}}>
                  <div style={{height:"180px",overflow:"hidden"}}>
                    <img src={item.img} alt={item.title} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.7)",transition:"transform 0.7s, filter 0.5s"}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1.08)";el.style.filter="brightness(0.85)";}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1)";el.style.filter="brightness(0.7)";}}/>
                  </div>
                  <div style={{padding:"20px"}}>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.45em",color:G,opacity:0.6,marginBottom:"8px"}}>{item.num}</p>
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

      {/* STATS — gold bar */}
      <section style={{background:`linear-gradient(135deg,${D} 0%,#162b1e 50%,${D} 100%)`,padding:"60px 0",borderTop:`1px solid rgba(212,175,88,0.12)`,borderBottom:`1px solid rgba(212,175,88,0.12)`}}>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{v:144,s:"+",l:"Google Reviews"},{v:100,s:"+",l:"Menu Items"},{v:4,s:".9★",l:"Google Rating"},{v:9,s:"",l:"Biryanis"}].map((item,i)=>(
              <FadeUp key={i} delay={i*0.1}>
                <div style={{padding:"24px 16px",border:`1px solid rgba(212,175,88,0.1)`,background:"rgba(212,175,88,0.03)"}}>
                  <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.8rem,5vw,4.5rem)",color:G,lineHeight:1}}>
                    <CountUp target={item.v} suffix={item.s}/>
                  </p>
                  <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(212,175,88,0.5)",textTransform:"uppercase",marginTop:"8px"}}>{item.l}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX CTA */}
      <ParallaxSection src="/raahi/11.03.25RaahiIndianKitchen_0098.jpg" className="py-28 md:py-40">
        <div className="container mx-auto px-8 text-center">
          <FadeUp>
            <span className="section-label" style={{marginBottom:"1.5rem",display:"block",textAlign:"center"}}>A Table for You</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.5rem,6vw,5.5rem)",color:I,lineHeight:1,marginBottom:"1.5rem",maxWidth:"700px",margin:"0 auto 1.5rem"}}>
              You shouldn't have to drive<br/>for great Indian food.
            </h2>
            <div className="gold-rule" style={{width:"80px",margin:"0 auto 2rem"}}/>
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
        <div className="container mx-auto px-8 mb-14 text-center">
          <FadeUp>
            <span className="section-label" style={{marginBottom:"1rem",display:"block",textAlign:"center"}}>Google Reviews</span>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3rem)",color:I,marginBottom:"6px"}}>What people are saying.</h2>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"11px",color:"rgba(212,175,88,0.35)",letterSpacing:"0.25em"}}>4.9 STARS · 144 REVIEWS ON GOOGLE</p>
          </FadeUp>
        </div>
        <div style={{overflow:"hidden"}}>
          <div className="marquee-track" style={{animationDuration:"48s",gap:"20px"}}>
            {[...REVIEWS,...REVIEWS].map((r,i)=>(
              <div key={i} style={{flexShrink:0,width:"360px",background:"rgba(212,175,88,0.03)",border:`1px solid rgba(212,175,88,0.1)`,padding:"32px",borderRadius:"2px",position:"relative"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:`linear-gradient(90deg,transparent,${G},transparent)`,opacity:0.5}}/>
                <div style={{display:"flex",gap:"3px",marginBottom:"16px"}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:G,fontSize:"12px"}}>★</span>)}</div>
                <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"15px",color:"rgba(232,224,204,0.68)",lineHeight:1.85,marginBottom:"16px"}}>"{r.q}"</p>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.35em",color:"rgba(212,175,88,0.5)",textTransform:"uppercase"}}>— {r.n}</p>
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
      <ParallaxSection src="/raahi/11.03.25RaahiIndianKitchen_0038.jpg" brightness={0.16} className="py-24 md:py-32">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideIn from="left">
              <span className="section-label" style={{marginBottom:"1.5rem",display:"block"}}>Find Us</span>
              <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.8rem,5vw,5rem)",color:I,lineHeight:"0.92",marginBottom:"2rem"}}>
                Your table<br/><span style={{color:G}}>is waiting.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/reservations" className="btn-primary-outline">Reserve Now</Link>
                <Link to="/menus" className="btn-dark-filled">View the Menu</Link>
              </div>
            </SlideIn>
            <SlideIn from="right" delay={0.1}>
              <div style={{display:"flex",flexDirection:"column",gap:"28px"}}>
                {[
                  {Icon:MapPin,label:"Address",value:"17695 Tomball Pkwy",sub:"Houston, TX 77064"},
                  {Icon:Clock,label:"Hours",value:"Tue–Sun · Lunch & Dinner",sub:"Tuesday from 5 PM · Other days 11 AM · Closed Monday"},
                  {Icon:Phone,label:"Phone",value:PHONE_NUMBER,sub:PHONE_SECONDARY},
                ].map((item,i)=>(
                  <motion.div key={i} initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.2+i*0.12,duration:0.8}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:"18px"}}>
                      <div style={{flexShrink:0,width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid rgba(212,175,88,0.2)`,background:"rgba(212,175,88,0.04)"}}>
                        <item.Icon size={14} style={{color:"rgba(212,175,88,0.6)"}}/>
                      </div>
                      <div>
                        <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.48em",color:"rgba(212,175,88,0.42)",textTransform:"uppercase",marginBottom:"4px"}}>{item.label}</p>
                        <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",color:"rgba(232,224,204,0.8)",fontSize:"1.05rem"}}>{item.value}</p>
                        <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.26)",marginTop:"2px"}}>{item.sub}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <motion.a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                  initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.6}}
                  style={{display:"inline-flex",alignItems:"center",gap:"6px",fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(212,175,88,0.45)",textTransform:"uppercase",textDecoration:"none"}}>
                  Get Directions <ArrowRight size={10}/>
                </motion.a>
              </div>
            </SlideIn>
          </div>
        </div>
      </ParallaxSection>

      {/* INSTAGRAM */}
      <section className="py-20" style={{background:T}}>
        <div className="container mx-auto px-8 mb-12">
          <FadeUp>
            <div className="flex items-end justify-between">
              <div>
                <span className="section-label" style={{marginBottom:"8px",display:"block"}}>Follow Along</span>
                <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3rem)",color:I}}>Find Us on Instagram</h2>
              </div>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hidden md:block"
                style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.38em",color:"rgba(212,175,88,0.35)",textTransform:"uppercase",textDecoration:"none"}}>@raahi_hou</a>
            </div>
          </FadeUp>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px">
          {["/raahi/11.03.25RaahiIndianKitchen_0013.jpg","/raahi/11.03.25RaahiIndianKitchen_0038.jpg","/raahi/11.03.25RaahiIndianKitchen_0098.jpg","/raahi/H.jpg","https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400","https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400","https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400","https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400"].map((src,i)=>(
            <motion.a key={i} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="relative overflow-hidden group block" style={{aspectRatio:"1/1"}}
              initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
              transition={{duration:0.6,delay:i*0.05}}>
              <img src={src} alt="Raahi Indian Kitchen" loading="lazy"
                className="w-full h-full object-cover"
                style={{filter:"brightness(0.6) saturate(0.8)",transition:"filter 0.5s, transform 0.6s"}}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.filter="brightness(0.85) saturate(1)";el.style.transform="scale(1.06)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.filter="brightness(0.6) saturate(0.8)";el.style.transform="scale(1)";}}/>
              <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:`linear-gradient(90deg,transparent,${G},transparent)`,opacity:0,transition:"opacity 0.4s"}} className="group-hover:opacity-100"/>
            </motion.a>
          ))}
        </div>
      </section>
    </>
  );
}

const Index = () => <><Hero/><HomepageContent/></>;
export default Index;
