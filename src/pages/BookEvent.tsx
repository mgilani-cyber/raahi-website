import { useState } from "react";
import { motion } from "framer-motion";
import { PHONE_NUMBER, EMAIL } from "@/constants";

const T="#113122",R="#a34d26",I="#e8e0cc",D="#0a1f15";

const EVENTS = [
  { num:"01", title:"Private Dining",   img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", desc:"Birthdays, anniversaries, family celebrations. We can accommodate private groups in a dedicated space. Call us to discuss menus and arrangements.", cta:"Call to Book", link:"tel:+13467680068" },
  { num:"02", title:"Corporate Events", img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", desc:"Team dinners, client entertainment, office celebrations. We work with businesses for seamless group dining experiences.", cta:"Get in Touch", link:"mailto:"+EMAIL },
  { num:"03", title:"Weekend Specials", img:"https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80", desc:"Live music, chef specials, curated menus — follow us on Instagram or call to find out what's happening this weekend at Raahi.", cta:"Follow Us", link:"https://www.instagram.com/raahi_hou/" },
  { num:"04", title:"Catering",         img:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", desc:"We bring Raahi to you. Indian catering for corporate events, weddings, and private parties. Inquire for custom menus.", cta:"Enquire Now", link:"mailto:Info@raahiindiankitchen.com" },
];

export default function BookEvent() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ background:T, minHeight:"100vh" }}>

      {/* Hero */}
      <div style={{ background:D, paddingTop:"120px", paddingBottom:"64px", borderBottom:"1px solid rgba(163,77,38,0.15)" }}>
        <div className="container mx-auto px-6">
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:R, textTransform:"uppercase", marginBottom:"1rem" }}>
            Events & Private Dining
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
            style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2.5rem,6vw,5rem)", color:I, lineHeight:0.95, marginBottom:"1rem" }}>
            Make it a night to remember.
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"15px", color:"rgba(232,224,204,0.45)", maxWidth:"480px", lineHeight:1.85 }}>
            From intimate private dinners to large corporate events and catering — Raahi is built for occasions that deserve good food.
          </motion.p>
        </div>
      </div>

      {/* Accordion event cards */}
      <div className="container mx-auto px-6 py-16">
        <div style={{ display:"flex", flexDirection:"row", gap:"8px", height:"520px", width:"100%" }}>
          {EVENTS.map((ev, i) => (
            <div key={i}
              style={{
                position:"relative",
                overflow:"hidden",
                cursor:"pointer",
                flex: active===i ? "4 1 0%" : "1 1 0%",
                borderRadius:"4px",
                transition:"flex 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                border: active===i ? "1px solid rgba(163,77,38,0.5)" : "1px solid rgba(163,77,38,0.15)",
                minWidth:0,
              }}
              onMouseEnter={() => setActive(i)}>

              {/* Background image */}
              <img src={ev.img} alt={ev.title}
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover",
                  filter: active===i ? "brightness(0.5) saturate(0.85)" : "brightness(0.3) saturate(0.7)",
                  transition:"filter 0.6s ease",
                }}/>

              {/* Gradient overlay */}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,31,21,0.97) 0%,rgba(10,31,21,0.3) 60%,transparent 100%)" }}/>

              {/* Top gold line when active */}
              {active===i && (
                <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"linear-gradient(90deg,transparent,#a34d26,transparent)" }}/>
              )}

              {/* Collapsed: vertical label */}
              {active!==i && (
                <div style={{
                  position:"absolute", top:"50%", left:"50%",
                  transform:"translate(-50%,-50%) rotate(90deg)",
                  whiteSpace:"nowrap",
                  fontFamily:"Cormorant Garamond,Georgia,serif",
                  fontStyle:"italic",
                  fontSize:"15px",
                  color:"rgba(232,224,204,0.5)",
                  letterSpacing:"0.05em",
                }}>
                  {ev.title}
                </div>
              )}

              {/* Expanded: full content */}
              {active===i && (
                <motion.div
                  initial={{ opacity:0, y:16 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.4, delay:0.15 }}
                  style={{ position:"absolute", bottom:0, left:0, right:0, padding:"36px" }}>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:R, textTransform:"uppercase", marginBottom:"12px", opacity:0.8 }}>
                    {ev.num}
                  </p>
                  <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.8rem,3vw,2.4rem)", color:I, marginBottom:"14px", lineHeight:1 }}>
                    {ev.title}
                  </h2>
                  <div style={{ width:"36px", height:"1px", background:R, marginBottom:"16px", opacity:0.6 }}/>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"13px", color:"rgba(232,224,204,0.55)", lineHeight:1.85, marginBottom:"24px", maxWidth:"360px" }}>
                    {ev.desc}
                  </p>
                  <a href={ev.link}
                    style={{
                      display:"inline-block",
                      border:"1px solid rgba(163,77,38,0.7)",
                      color:R,
                      padding:"0.65rem 1.6rem",
                      fontFamily:"Jost,sans-serif",
                      fontSize:"10px",
                      letterSpacing:"0.28em",
                      textTransform:"uppercase",
                      textDecoration:"none",
                      transition:"all 0.3s",
                    }}
                    onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background=R; el.style.color=I; }}
                    onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.color=R; }}>
                    {ev.cta} →
                  </a>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop:"64px", padding:"48px", background:"rgba(17,49,34,0.6)", border:"1px solid rgba(163,77,38,0.2)", textAlign:"center" }}>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.45em", color:R, textTransform:"uppercase", marginBottom:"1rem" }}>Get in Touch</p>
          <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:I, marginBottom:"1rem" }}>
            Let us take care of your next event.
          </h2>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:"rgba(232,224,204,0.42)", marginBottom:"2rem", maxWidth:"440px", margin:"0 auto 2rem", lineHeight:1.85 }}>
            Call us or send an email and we will work with you on a menu, timing and arrangements that fit your occasion.
          </p>
          <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
            <a href="tel:+13467680068" className="btn-primary-outline">{PHONE_NUMBER}</a>
            <a href={"mailto:"+EMAIL} className="btn-dark-filled">Email Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
