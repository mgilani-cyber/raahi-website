import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RESERVATION_URL, PHONE_NUMBER, EMAIL } from "@/constants";

const T="#113122",R="#a34d26",I="#e8e0cc",D="#0a1f15";

const EVENTS=[
  {num:"01",title:"Private Dining",desc:"Birthdays, anniversaries, family celebrations. We can accommodate private groups in a dedicated space. Call us to discuss menus and arrangements.",cta:"Call to Book"},
  {num:"02",title:"Corporate Events",desc:"Team dinners, client entertainment, office celebrations. We work with businesses across Houston for seamless group dining experiences.",cta:"Get in Touch"},
  {num:"03",title:"Weekend Specials",desc:"Live music, chef's specials, curated menus — follow us on Instagram or call to find out what's happening this weekend at Raahi.",cta:"Follow Us"},
  {num:"04",title:"Catering",desc:"We bring Raahi to you. Indian catering for corporate events, weddings, and private parties across the Houston area. Inquire for custom menus.",cta:"Enquire Now"},
];

export default function BookEvent() {
  return (
    <div style={{background:T,minHeight:"100vh"}}>
      <div style={{background:D,paddingTop:"120px",paddingBottom:"64px",borderBottom:"1px solid rgba(163,77,38,0.15)"}}>
        <div className="container mx-auto px-6">
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.55em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>
            Events & Private Dining
          </motion.p>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.5rem,6vw,5rem)",color:I,lineHeight:0.95,marginBottom:"1rem"}}>
            Make it a night to remember.
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
            style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.45)",maxWidth:"480px",lineHeight:1.85}}>
            From intimate private dinners to large corporate events and catering — Raahi is built for occasions that deserve good food.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS.map((ev,i)=>(
            <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.7}}
              style={{padding:"36px",background:"rgba(163,77,38,0.05)",border:"1px solid rgba(163,77,38,0.14)"}}>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:R,textTransform:"uppercase",marginBottom:"12px"}}>{ev.num}</p>
              <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.8rem",color:I,marginBottom:"16px"}}>{ev.title}</h2>
              <div style={{width:"32px",height:"1px",background:R,marginBottom:"16px"}}/>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"14px",color:"rgba(232,224,204,0.5)",lineHeight:1.85,marginBottom:"24px"}}>{ev.desc}</p>
              <a href={"mailto:"+EMAIL}
                style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(163,77,38,0.7)",textTransform:"uppercase"}}>
                {ev.cta} →
              </a>
            </motion.div>
          ))}
        </div>

        <div style={{marginTop:"64px",padding:"48px",background:"rgba(17,49,34,0.6)",border:"1px solid rgba(163,77,38,0.2)",textAlign:"center"}}>
          <p style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>Get in Touch</p>
          <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",color:I,marginBottom:"1rem"}}>
            Let us take care of your next event.
          </h2>
          <p style={{fontFamily:"Jost,sans-serif",fontSize:"14px",color:"rgba(232,224,204,0.42)",marginBottom:"2rem",maxWidth:"440px",margin:"0 auto 2rem",lineHeight:1.85}}>
            Call us or send an email and we will work with you on a menu, timing and arrangements that fit your occasion.
          </p>
          <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <a href={"tel:+13467680068"} className="btn-primary-outline">{PHONE_NUMBER}</a>
            <a href={"mailto:"+EMAIL} className="btn-dark-filled">Email Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
