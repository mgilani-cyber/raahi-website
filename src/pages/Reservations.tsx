import { motion } from "framer-motion";
import { RESERVATION_URL, PHONE_NUMBER, PHONE_SECONDARY, GOOGLE_MAPS_URL } from "@/constants";

const T="#113122",R="#a34d26",I="#e8e0cc",D="#0a1f15";

const HOURS=[
  {day:"Monday",time:"11 AM – 10 PM"},
  {day:"Tuesday",time:"5 PM – 10 PM"},
  {day:"Wednesday",time:"11 AM – 10 PM"},
  {day:"Thursday",time:"11 AM – 10 PM"},
  {day:"Friday",time:"11 AM – 10 PM"},
  {day:"Saturday",time:"11 AM – 10 PM"},
  {day:"Sunday",time:"11 AM – 10 PM"},
];

export default function Reservations() {
  return (
    <div style={{background:T,minHeight:"100vh"}}>
      <div style={{background:D,paddingTop:"120px",paddingBottom:"64px",borderBottom:"1px solid rgba(163,77,38,0.15)"}}>
        <div className="container mx-auto px-6">
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.55em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>
            Book a Table
          </motion.p>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.5rem,6vw,5rem)",color:I,lineHeight:0.95,marginBottom:"1rem"}}>
            Reservations
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
            style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.45)",maxWidth:"480px",lineHeight:1.85}}>
            Reserve online in under a minute, or give us a call. Walk-ins are always welcome based on availability.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:R,textTransform:"uppercase",marginBottom:"1.5rem"}}>Reserve Online</p>
            <div style={{background:"rgba(163,77,38,0.06)",border:"1px solid rgba(163,77,38,0.2)",padding:"40px",textAlign:"center"}}>
              <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.8rem",color:I,marginBottom:"12px"}}>Book your table</p>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"13px",color:"rgba(232,224,204,0.45)",lineHeight:1.85,marginBottom:"28px"}}>
                Select your date, time and party size. Instant confirmation sent to your email.
              </p>
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline" style={{display:"inline-block"}}>
                Reserve Now
              </a>
            </div>

            <div style={{marginTop:"24px",padding:"28px",background:"rgba(111,133,102,0.06)",border:"1px solid rgba(163,77,38,0.1)"}}>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:R,textTransform:"uppercase",marginBottom:"16px"}}>Or Call Us</p>
              <a href="tel:+13467680068" style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.4rem",color:I,display:"block",marginBottom:"6px"}}>{PHONE_NUMBER}</a>
              <a href="tel:+17132775082" style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.4rem",color:I,display:"block"}}>{PHONE_SECONDARY}</a>
            </div>

            <div style={{marginTop:"16px",padding:"20px",background:"rgba(163,77,38,0.05)",border:"1px solid rgba(163,77,38,0.1)"}}>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:R,textTransform:"uppercase",marginBottom:"10px"}}>Private Events</p>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"13px",color:"rgba(232,224,204,0.45)",lineHeight:1.75}}>
                Planning a birthday, corporate dinner or special celebration? We accommodate private groups. Call or email us to discuss.
              </p>
            </div>
          </div>

          <div>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:R,textTransform:"uppercase",marginBottom:"1.5rem"}}>Hours & Location</p>
            <div style={{border:"1px solid rgba(163,77,38,0.12)",background:"rgba(17,49,34,0.4)"}}>
              {HOURS.map((h,i)=>{
                const today=new Date().toLocaleString("en-US",{timeZone:"America/Chicago",weekday:"long"});
                const isToday=h.day===today;
                return (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"14px 20px",borderBottom:i<HOURS.length-1?"1px solid rgba(163,77,38,0.08)":"none",background:isToday?"rgba(163,77,38,0.06)":"transparent"}}>
                    <span style={{fontFamily:"Jost,sans-serif",fontSize:"13px",color:isToday?R:"rgba(232,224,204,0.5)",fontWeight:isToday?600:400}}>{h.day}</span>
                    <span style={{fontFamily:"Jost,sans-serif",fontSize:"13px",color:isToday?"rgba(232,224,204,0.8)":"rgba(232,224,204,0.4)"}}>{h.time}</span>
                  </div>
                );
              })}
            </div>

            <div style={{marginTop:"20px",padding:"24px",background:"rgba(111,133,102,0.06)",border:"1px solid rgba(163,77,38,0.1)"}}>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.5em",color:R,textTransform:"uppercase",marginBottom:"12px"}}>Address</p>
              <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.2rem",color:I,marginBottom:"4px"}}>17695 Tomball Pkwy</p>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"13px",color:"rgba(232,224,204,0.45)",marginBottom:"16px"}}>Houston, TX 77064</p>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.3em",color:"rgba(163,77,38,0.6)",textTransform:"uppercase"}}>
                Get Directions →
              </a>
            </div>

            <div style={{marginTop:"16px",padding:"20px",background:"rgba(163,77,38,0.05)",border:"1px solid rgba(163,77,38,0.1)"}}>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.4)",lineHeight:1.75}}>
                Free parking available. Walk-ins welcome. Reservations strongly recommended Friday and Saturday evenings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
