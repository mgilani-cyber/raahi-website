import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { RESERVATION_URL, INSTAGRAM_URL, PHONE_NUMBER, PHONE_SECONDARY, GOOGLE_MAPS_URL } from "@/constants";
import barAtmosphere from "@/assets/bar-atmosphere.jpg";
import barPanoramic  from "@/assets/bar-panoramic.jpg";
import parallaxBg    from "@/assets/parallax-bg.jpg";
import foodDark      from "@/assets/food-dark.jpg";
import foodPlating   from "@/assets/food-plating.jpg";
import womanCocktail from "@/assets/woman-cocktail.jpg";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.png";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import gallery8 from "@/assets/gallery-8.png";

const T="#113122",R="#a34d26",S="#6f8566",I="#e8e0cc",D="#0a1f15";

function FadeUp({children,delay=0,className=""}:{children:React.ReactNode;delay?:number;className?:string}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-40px"});
  return <motion.div ref={ref} className={className} initial={{opacity:0,y:28}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.8,delay,ease:[0.25,0.46,0.45,0.94]}}>{children}</motion.div>;
}

function RevealImg({src,alt="",className="",delay=0}:{src:string;alt?:string;className?:string;delay?:number}) {
  const ref=useRef(null);
  const v=useInView(ref,{once:true,margin:"-8%"});
  return (
    <motion.div ref={ref} className={"overflow-hidden "+className} initial={{clipPath:"inset(18% 0% 18% 0%)"}} animate={v?{clipPath:"inset(0% 0% 0% 0%)"}:{}} transition={{duration:1.1,delay,ease:[0.25,0.46,0.45,0.94]}}>
      <motion.img src={src} alt={alt} className="w-full h-full object-cover" style={{filter:"brightness(0.8)"}} initial={{scale:1.12}} animate={v?{scale:1}:{}} transition={{duration:1.1,delay,ease:[0.25,0.46,0.45,0.94]}} />
    </motion.div>
  );
}

function ParallaxBg({src,children,brightness=0.25,className=""}:{src:string;children:React.ReactNode;brightness?:number;className?:string}) {
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
  const y=useTransform(scrollYProgress,[0,1],["-18%","18%"]);
  return (
    <div ref={ref} className={"relative overflow-hidden "+className}>
      <motion.div className="absolute inset-0 scale-[1.4]" style={{y}}>
        <img src={src} alt="" className="w-full h-full object-cover" style={{filter:`brightness(${brightness})`}} />
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
    return ()=>clearInterval(id);
  },[v,target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const REVIEWS=[
  {q:"There's only a handful of Indian restaurants I'd recommend in Houston. Raahi has entered that list. Chef Akshay has brought amazing flavors and twists to his dishes.",n:"Nisha B."},
  {q:"5 stars for this elegant fine dining restaurant in North Houston. Excellent service, elegant ambience, delicious food — a must-try for north Houstonians!",n:"Shumail N."},
  {q:"Beautiful place with really good flavored food and impeccable service. Definitely recommend the masala chai.",n:"Emaline"},
  {q:"The ambiance is warm and inviting — great for both casual dining and special occasions. Service is friendly and efficient.",n:"Jay S."},
  {q:"The sarson ka saag is definitely the best in Houston. Have that with makki ki roti — you won't regret it.",n:"Nisha B."},
  {q:"A must-try new place for north Houstonians who were otherwise forced to drive south for good Indian food.",n:"Shumail N."},
];

const MARQUEE=["Butter Chicken","Chicken Biryani","Raahi Hurricane","Sarson Da Saag","Mango Lassi","Gol Gappe","Masala Dosa","Lamb Chops","Raahi Margaritas","Gulab Jamun","Palak Paneer","Tandoori Salmon"];

function Hero() {
  const { scrollY } = useScroll();
  const op = useTransform(scrollY, [0, 500], [1, 0]);
  const y  = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <div className="relative" style={{ background: T }}>
      <SmoothScrollHero
        scrollHeight={1500}
        desktopImage="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1800&auto=format&fit=crop&q=85"
        mobileImage="https://raahiindiankitchen.com/wp-content/uploads/2024/08/raahi-appetizer-scaled.jpg"
        initialClipPercentage={25}
        finalClipPercentage={75}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 min-h-screen flex items-center justify-center z-10 pointer-events-none"
        style={{ opacity: op }}
      >
        <div className="text-center px-6 max-w-3xl pointer-events-auto">
          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3}} style={{fontFamily:'Jost,sans-serif',fontSize:'10px',letterSpacing:'0.55em',color:R,textTransform:'uppercase',marginBottom:'2rem'}}>
            Authentic Indian Restaurant · Houston, TX
          </motion.p>
          <motion.h1 initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{delay:0.45,duration:1}} style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontStyle:'italic',fontSize:'clamp(4.5rem,13vw,10rem)',color:I,lineHeight:0.88,marginBottom:'0.6rem'}}>
            Raahi
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}} style={{fontFamily:'Jost,sans-serif',fontSize:'10px',letterSpacing:'0.42em',color:S,textTransform:'uppercase',marginBottom:'2rem'}}>
            Indian Kitchen
          </motion.p>
          <motion.div initial={{width:0}} animate={{width:56}} transition={{delay:0.85,duration:0.55}} style={{height:'1px',background:R,margin:'0 auto 2rem'}} />
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0}} style={{fontFamily:'Jost,sans-serif',fontSize:'15px',color:'rgba(232,224,204,0.45)',lineHeight:1.9,maxWidth:'460px',margin:'0 auto 2.8rem'}}>
            Traditional Indian food, done properly. North Houston's home for butter chicken, biryani, street eats, dosas and a bar worth staying for.
          </motion.p>
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.1}} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">Reserve a Table</a>
            <a href="/menus" className="btn-dark-filled">Explore the Menu</a>
          </motion.div>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}} style={{marginTop:'1.5rem',fontFamily:'Jost,sans-serif',fontSize:'11px',letterSpacing:'0.25em',color:'rgba(232,224,204,0.22)'}}>
            17695 Tomball Pkwy · Houston, TX 77064
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

function HomepageContent() {
  return (
    <>
      {/* MARQUEE */}
      <div style={{background:R,overflow:"hidden",padding:"13px 0"}}>
        <div className="marquee-track">
          {[...MARQUEE,...MARQUEE].map((item,i)=>(
            <span key={i} style={{fontFamily:"Jost,sans-serif",fontSize:"11px",letterSpacing:"0.35em",color:I,textTransform:"uppercase",flexShrink:0}}>
              {item} <span style={{color:"rgba(232,224,204,0.35)",marginLeft:"1.5rem"}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* WELCOME */}
      <section className="py-16 md:py-24" style={{background:T}}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp><p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.55em",color:R,textTransform:"uppercase",marginBottom:"1.5rem"}}>Indian Restaurant · North Houston</p></FadeUp>
              <FadeUp delay={0.06}>
                <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.6rem,5.5vw,4.8rem)",color:I,lineHeight:"0.95",marginBottom:"1.5rem"}}>
                  Houston's favourite<br /><span style={{color:R}}>Indian kitchen.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.55)",lineHeight:1.9,marginBottom:"2rem",maxWidth:"440px"}}>
                  North Houston finally has a proper Indian restaurant worth making the trip for. At Raahi, we cook the way it's meant to be cooked — traditional recipes, fresh ingredients, nothing from a packet. Butter chicken that'll ruin every other version for you. Biryani that smells like your grandmother's kitchen. And a bar menu that keeps things interesting.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">Book a Table</a>
                  <Link to="/menus" className="btn-dark-filled">See the Menu</Link>
                </div>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"11px",color:"rgba(232,224,204,0.2)",marginTop:"1.2rem",letterSpacing:"0.15em"}}>17695 Tomball Pkwy · Houston, TX 77064</p>
              </FadeUp>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <RevealImg src={barAtmosphere} className="h-64 lg:h-80" />
              <RevealImg src={foodDark} className="h-64 lg:h-80 mt-8" delay={0.1} />
            </div>
          </div>
        </div>
      </section>

      {/* WHY RAAHI */}
      <section className="py-16 md:py-20" style={{background:D}}>
        <div className="container mx-auto px-6">
          <FadeUp className="mb-14">
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>Why Raahi</p>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3.2rem)",color:I,maxWidth:"560px"}}>One thousand flavors. One address in Houston.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{border:"1px solid rgba(163,77,38,0.12)"}}>
            {[
              {img:foodPlating,label:"The Food",body:"Every dish comes from a real recipe — not a shortcut. Our sarson da saag has been called the best in Houston. Our butter chicken converts sceptics. North Indian, South Indian, street food, biryani — all under one roof, all done properly."},
              {img:foodDark,label:"The Space",body:"A room that feels right whether you're having a quiet dinner for two or celebrating with the whole family. Warm lighting, comfortable booths, and a team that actually wants you to have a good time."},
              {img:womanCocktail,label:"The Bar",body:"Not many Indian restaurants in Houston take their bar seriously. We do. The Raahi Hurricane, our signature margaritas in five flavours, mango lassi — or just a cold Modelo with your biryani."},
            ].map((item,i)=>(
              <FadeUp key={i} delay={i*0.1}>
                <div style={{background:"rgba(111,133,102,0.05)",height:"100%"}}>
                  <div style={{height:"220px",overflow:"hidden"}}>
                    <img src={item.img} alt={item.label} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.72) saturate(0.85)"}} />
                  </div>
                  <div style={{padding:"28px 24px"}}>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"10px"}}>{item.label}</p>
                    <p style={{fontFamily:"Jost,sans-serif",fontSize:"13.5px",color:"rgba(232,224,204,0.5)",lineHeight:1.85}}>{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section className="py-16 md:py-24" style={{background:T}}>
        <div className="container mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>What to Order</p>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3.2rem)",color:I}}>The dishes people drive across Houston for.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {num:"01",title:"Paneer & Vegetarian",desc:"Palak Paneer, Shahi Paneer, Dal Makhani, Sarson Da Saag — our veg dishes are why meat-eaters order something green."},
              {num:"02",title:"From the Clay Oven",desc:"Tandoori chicken, lamb chops ($24.99), Murg Malai Tikka, Tandoori Salmon. Marinated overnight, cooked in our clay oven."},
              {num:"03",title:"Indian Street Eats",desc:"Gol Gappe, Samosa Chaat, Dahi Bhalla, Aloo Tikki — Houston's best Indian street food, served properly."},
              {num:"04",title:"Biryani",desc:"Chicken, Lamb, Goat, Paneer, Gongura — nine biryanis on the menu. Slow-cooked, aromatic, never rushed."},
            ].map((item,i)=>(
              <FadeUp key={i} delay={i*0.1}>
                <div style={{padding:"28px",background:"rgba(163,77,38,0.06)",border:"1px solid rgba(163,77,38,0.14)",height:"100%"}}>
                  <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.45em",color:R,marginBottom:"14px"}}>{item.num}</p>
                  <h3 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.35rem",color:I,marginBottom:"12px"}}>{item.title}</h3>
                  <p style={{fontFamily:"Jost,sans-serif",fontSize:"13px",color:"rgba(232,224,204,0.5)",lineHeight:1.8}}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="text-center mt-10"><Link to="/menus" className="btn-primary-outline">Full Menu</Link></div>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:R,padding:"52px 0"}}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{v:144,s:"+",l:"Google Reviews"},{v:100,s:"+",l:"Menu Items"},{v:4,s:".9★",l:"Google Rating"},{v:9,s:"",l:"Biryanis to Choose From"}].map((item,i)=>(
              <FadeUp key={i} delay={i*0.1}>
                <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:"clamp(2.5rem,5vw,4rem)",color:I,lineHeight:1}}><CountUp target={item.v} suffix={item.s} /></p>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(232,224,204,0.6)",textTransform:"uppercase",marginTop:"8px"}}>{item.l}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX CTA */}
      <ParallaxBg src={parallaxBg} className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <FadeUp>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"1.5rem"}}>North Houston's Indian Kitchen</p>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.5rem,6vw,5rem)",color:I,lineHeight:1.05,marginBottom:"1.5rem",maxWidth:"700px",margin:"0 auto 1.5rem"}}>
              You shouldn't have to drive to the south side for good Indian food.
            </h2>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.5)",maxWidth:"480px",margin:"0 auto 2.5rem",lineHeight:1.9}}>
              Raahi is on Tomball Pkwy, serving North Houston the kind of Indian food this area has been missing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">Reserve a Table</a>
              <a href="#visit" className="btn-dark-filled">Find Us</a>
            </div>
          </FadeUp>
        </div>
      </ParallaxBg>

      {/* REVIEWS */}
      <section className="py-16 md:py-20" style={{background:D,overflow:"hidden"}}>
        <div className="container mx-auto px-6 mb-12 text-center">
          <FadeUp>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>Google Reviews</p>
            <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3rem)",color:I,marginBottom:"6px"}}>What Houston is saying.</h2>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"13px",color:"rgba(232,224,204,0.35)"}}>4.9 stars · 144 reviews on Google</p>
          </FadeUp>
        </div>
        <div style={{overflow:"hidden"}}>
          <div className="marquee-track" style={{animationDuration:"44s"}}>
            {[...REVIEWS,...REVIEWS].map((r,i)=>(
              <div key={i} style={{flexShrink:0,width:"340px",background:"rgba(111,133,102,0.08)",border:"1px solid rgba(163,77,38,0.15)",padding:"28px",borderRadius:"4px"}}>
                <div style={{display:"flex",gap:"3px",marginBottom:"14px"}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:R,fontSize:"13px"}}>★</span>)}</div>
                <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"14px",color:"rgba(232,224,204,0.75)",lineHeight:1.8,marginBottom:"16px"}}>"{r.q}"</p>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:R,textTransform:"uppercase"}}>— {r.n}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:"40px"}}>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" style={{fontFamily:"Jost,sans-serif",fontSize:"11px",letterSpacing:"0.28em",color:"rgba(163,77,38,0.55)",textTransform:"uppercase"}}>
            Read all reviews on Google →
          </a>
        </div>
      </section>

      {/* VISIT */}
      <ParallaxBg src={barPanoramic} brightness={0.18} className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp><p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"1.5rem"}}>Find Us</p></FadeUp>
              <FadeUp delay={0.06}>
                <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.8rem,5.5vw,5rem)",color:I,lineHeight:"0.92",marginBottom:"2rem"}}>
                  Your table<br /><span style={{color:R}}>is waiting.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">Reserve Now</a>
                  <Link to="/menus" className="btn-dark-filled">View the Menu</Link>
                </div>
              </FadeUp>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"32px"}}>
              {[
                {Icon:MapPin,label:"Address",value:"17695 Tomball Pkwy",sub:"Houston, TX 77064"},
                {Icon:Clock,label:"Hours",value:"Tue–Sun · Lunch & Dinner",sub:"Tue opens 5 PM · All other days 11 AM · Mon closed"},
                {Icon:Phone,label:"Phone",value:PHONE_NUMBER,sub:PHONE_SECONDARY},
              ].map((item,i)=>(
                <FadeUp key={i} delay={0.15+i*0.12}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:"20px"}}>
                    <div style={{flexShrink:0,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(163,77,38,0.22)",background:"rgba(163,77,38,0.06)"}}>
                      <item.Icon size={14} style={{color:"rgba(163,77,38,0.65)"}} />
                    </div>
                    <div>
                      <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.45em",color:"rgba(163,77,38,0.45)",textTransform:"uppercase",marginBottom:"4px"}}>{item.label}</p>
                      <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",color:"rgba(232,224,204,0.8)",fontSize:"1.05rem"}}>{item.value}</p>
                      <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.28)",marginTop:"2px"}}>{item.sub}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
              <FadeUp delay={0.5}>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"6px",fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(163,77,38,0.5)",textTransform:"uppercase"}}>
                  Get Directions <ArrowRight size={10} />
                </a>
              </FadeUp>
            </div>
          </div>
        </div>
      </ParallaxBg>

      {/* INSTAGRAM */}
      <section className="py-16 md:py-20" style={{background:T}}>
        <div className="container mx-auto px-6 mb-12">
          <FadeUp>
            <div className="flex items-end justify-between">
              <div>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"8px"}}>Follow Along</p>
                <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2rem,4vw,3rem)",color:I}}>Find Us on Instagram</h2>
              </div>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hidden md:block"
                style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.38em",color:"rgba(232,224,204,0.3)",textTransform:"uppercase"}}>@raahi_hou</a>
            </div>
          </FadeUp>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px">
          {[gallery1,gallery2,gallery3,gallery4,gallery5,gallery6,gallery7,gallery8].map((src,i)=>(
            <motion.a key={i} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="relative overflow-hidden group block" style={{aspectRatio:"1/1"}}
              initial={{opacity:0,scale:0.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
              transition={{duration:0.6,delay:i*0.06}}>
              <img src={src} alt="Raahi Indian Kitchen Houston" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{filter:"brightness(0.65) saturate(0.85)"}} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background:"rgba(17,49,34,0.45)"}} />
            </motion.a>
          ))}
          <motion.a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center" style={{aspectRatio:"1/1",background:"rgba(111,133,102,0.1)",border:"1px solid rgba(163,77,38,0.1)"}}
            initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.6,delay:0.5}}>
            <div className="text-center p-4">
              <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1rem",color:"rgba(163,77,38,0.65)",marginBottom:"8px"}}>@raahi_hou</p>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.45em",color:"rgba(232,224,204,0.28)",textTransform:"uppercase"}}>Follow Us</p>
            </div>
          </motion.a>
        </div>
      </section>
    </>
  );
}

const Index = () => <><Hero /><HomepageContent /></>;
export default Index;
