import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOOGLE_MAPS_URL, PHONE_NUMBER } from "@/constants";

const T="#081910", G="#d4af58", I="#e8e0cc";
const SHIFT4 = "https://reservations.shift4payments.com/#/28a60320-b36c-4294-9eb4-0bc1b1d8e019";

const SLIDES = [
  "/raahi/raahi-dining-full.png",
  "/raahi/raahi-chairs.png",
  "/raahi/raahi-lounge.png",
  "/raahi/raahi-entrance.png",
];

const HOURS = [
  { day:"Monday",    time:"11 AM – 10 PM" },
  { day:"Tuesday",   time:"5 PM – 10 PM" },
  { day:"Wednesday", time:"11 AM – 10 PM" },
  { day:"Thursday",  time:"11 AM – 10 PM" },
  { day:"Friday",    time:"11 AM – 10 PM" },
  { day:"Saturday",  time:"11 AM – 10 PM" },
  { day:"Sunday",    time:"11 AM – 10 PM" },
];

export default function Reservations() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i+1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background:T, minHeight:"100vh" }}>

      {/* Hero */}
      <div style={{ position:"relative", minHeight:"55vh", display:"flex", alignItems:"center", overflow:"hidden" }}>
        <AnimatePresence mode="wait">
          <motion.img key={idx} src={SLIDES[idx]} alt=""
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:1 }}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.25)" }}/>
        </AnimatePresence>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(8,25,16,0.7),rgba(8,25,16,0.4))" }}/>
        <div style={{ position:"relative", zIndex:1, padding:"120px 60px 60px" }}>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>
            Reserve Your Table
          </p>
          <h1 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2rem,4vw,3.5rem)", color:I, lineHeight:0.95, marginBottom:"1rem" }}>
            Join us for<br/>
            <span style={{ color:G }}>an unforgettable</span><br/>
            evening.
          </h1>
          <div style={{ height:"1px", width:"50px", background:`linear-gradient(90deg,transparent,${G},transparent)`, margin:"1.2rem 0" }}/>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:"rgba(232,224,204,0.45)", lineHeight:1.85, maxWidth:"420px" }}>
            Book your table below — walk-ins always welcome, reservations recommended on weekends.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0" }} className="max-md:block">

        {/* Left — Reserve button */}
        <div style={{ padding:"64px 60px", borderRight:"1px solid rgba(212,175,88,0.1)" }}>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>
            Online Reservations
          </p>
          <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"2rem", color:I, marginBottom:"1rem" }}>
            Reserve a Table
          </h2>
          <div style={{ height:"1px", width:"40px", background:`linear-gradient(90deg,transparent,${G},transparent)`, marginBottom:"1.5rem" }}/>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"13px", color:"rgba(232,224,204,0.45)", lineHeight:1.85, marginBottom:"2rem" }}>
            Click below to book your table instantly through our secure reservation system.
          </p>
          <a href={SHIFT4} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-block", fontFamily:"Jost,sans-serif", fontSize:"11px", letterSpacing:"0.35em",
              textTransform:"uppercase", color:T, background:G, padding:"16px 36px",
              textDecoration:"none", transition:"opacity 0.3s" }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.opacity="0.85"}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.opacity="1"}>
            Book Now →
          </a>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.25)", marginTop:"1rem" }}>
            Powered by Shift4 Payments — secure & instant
          </p>

          <div style={{ marginTop:"48px", paddingTop:"40px", borderTop:"1px solid rgba(212,175,88,0.1)" }}>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.5em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>
              Prefer to call?
            </p>
            <a href={`tel:${PHONE_NUMBER}`}
              style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.4rem", color:I, textDecoration:"none" }}>
              {PHONE_NUMBER}
            </a>
          </div>
        </div>

        {/* Right — Hours + Location */}
        <div style={{ padding:"64px 60px" }}>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1.5rem", opacity:0.7 }}>
            Hours
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"48px" }}>
            {HOURS.map(h => (
              <div key={h.day} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                paddingBottom:"12px", borderBottom:"1px solid rgba(212,175,88,0.07)" }}>
                <span style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", letterSpacing:"0.1em", color:"rgba(232,224,204,0.5)", textTransform:"uppercase" }}>{h.day}</span>
                <span style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"15px", color:I }}>{h.time}</span>
              </div>
            ))}
          </div>

          <div style={{ paddingTop:"32px", borderTop:"1px solid rgba(212,175,88,0.1)" }}>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>
              Location
            </p>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.2rem", color:I, textDecoration:"none", lineHeight:1.5, display:"block" }}>
              17695 Tomball Pkwy<br/>Houston, TX 77064
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
