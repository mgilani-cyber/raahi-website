import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOOGLE_MAPS_URL, PHONE_NUMBER, PHONE_SECONDARY } from "@/constants";

const T="#081910", G="#d4af58", I="#e8e0cc", D="#0a1f15";
const SHIFT4_URL = "https://reservations.shift4payments.com/#/28a60320-b36c-4294-9eb4-0bc1b1d8e019";

const HOURS=[
  {day:"Monday",    time:"11 AM – 10 PM"},
  {day:"Tuesday",   time:"5 PM – 10 PM"},
  {day:"Wednesday", time:"11 AM – 10 PM"},
  {day:"Thursday",  time:"11 AM – 10 PM"},
  {day:"Friday",    time:"11 AM – 10 PM"},
  {day:"Saturday",  time:"11 AM – 10 PM"},
  {day:"Sunday",    time:"11 AM – 10 PM"},
];

const PARTY_SIZES = ["1 Guest","2 Guests","3 Guests","4 Guests","5 Guests","6 Guests","7 Guests","8 Guests","9+ Guests (call us)"];
const TIMES = [
  "11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM",
];

const inputStyle = {
  width:"100%", background:"rgba(212,175,88,0.04)", border:"1px solid rgba(212,175,88,0.15)",
  color:I, padding:"14px 16px", fontFamily:"Jost,sans-serif", fontSize:"13px",
  outline:"none", borderRadius:"2px", transition:"border-color 0.3s",
};
const labelStyle = {
  fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.45em",
  color:"rgba(212,175,88,0.6)", textTransform:"uppercase" as const, display:"block", marginBottom:"8px",
};

export default function Reservations() {
  const [form, setForm] = useState({ partySize:"2 Guests", date:"", time:"7:00 PM", name:"", email:"", phone:"", notes:"" });
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const currentDay = new Date().toLocaleString("en-US",{timeZone:"America/Chicago",weekday:"long"});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.open(SHIFT4_URL, "_blank");
    }, 800);
  };

  return (
    <div style={{ background:T, minHeight:"100vh" }}>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#081910 0%,#0f2818 50%,#081910 100%)", paddingTop:"120px", paddingBottom:"80px", borderBottom:"1px solid rgba(212,175,88,0.12)", position:"relative", overflow:"hidden" }}>
        {/* Decorative gold circles */}
        <div style={{ position:"absolute", top:"-100px", right:"-100px", width:"400px", height:"400px", borderRadius:"50%", border:"1px solid rgba(212,175,88,0.06)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"280px", height:"280px", borderRadius:"50%", border:"1px solid rgba(212,175,88,0.04)", pointerEvents:"none" }}/>

        <div className="container mx-auto px-6 relative z-10">
          <motion.span initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="section-label" style={{marginBottom:"1.2rem",display:"block"}}>
            Reserve Your Table
          </motion.span>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(3rem,7vw,6rem)", color:I, lineHeight:0.9, marginBottom:"1.5rem" }}>
            Join us for<br /><span style={{color:G}}>an unforgettable</span><br />evening.
          </motion.h1>
          <div className="gold-rule" style={{width:"80px",marginBottom:"1.5rem"}}/>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"15px", color:"rgba(232,224,204,0.45)", maxWidth:"420px", lineHeight:1.9 }}>
            Book your table below — walk-ins always welcome, reservations recommended on weekends.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Booking Form ── */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" onSubmit={handleSubmit}
                  style={{ display:"flex", flexDirection:"column", gap:"20px" }}
                  initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}>

                  <div style={{ padding:"24px", background:"rgba(212,175,88,0.03)", border:"1px solid rgba(212,175,88,0.1)", marginBottom:"8px" }}>
                    <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.3rem", color:I, marginBottom:"4px" }}>Reservation Details</p>
                    <p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.35)" }}>Select your preferred date, time and party size</p>
                  </div>

                  {/* Party size + Date + Time */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"16px" }} className="grid-cols-1 sm:grid-cols-3">
                    <div>
                      <label style={labelStyle}>Party Size</label>
                      <select required style={{...inputStyle,cursor:"pointer"}} value={form.partySize}
                        onChange={e=>setForm(f=>({...f,partySize:e.target.value}))}>
                        {PARTY_SIZES.map(s=>(
                          <option key={s} value={s} style={{background:D,color:I}}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Date</label>
                      <input required type="date" min={today} style={inputStyle} value={form.date}
                        onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
                    </div>
                    <div>
                      <label style={labelStyle}>Time</label>
                      <select required style={{...inputStyle,cursor:"pointer"}} value={form.time}
                        onChange={e=>setForm(f=>({...f,time:e.target.value}))}>
                        {TIMES.map(t=>(
                          <option key={t} value={t} style={{background:D,color:I}}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ height:"1px", background:"rgba(212,175,88,0.1)", margin:"4px 0" }}/>

                  {/* Contact info */}
                  <div style={{ padding:"24px", background:"rgba(212,175,88,0.03)", border:"1px solid rgba(212,175,88,0.1)", marginBottom:"8px" }}>
                    <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.3rem", color:I, marginBottom:"4px" }}>Your Details</p>
                    <p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.35)" }}>So we can confirm your reservation</p>
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input required style={inputStyle} placeholder="Jane Smith" value={form.name}
                        onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input required type="tel" style={inputStyle} placeholder="+1 (713) 000-0000" value={form.phone}
                        onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input required type="email" style={inputStyle} placeholder="jane@example.com" value={form.email}
                      onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
                  </div>

                  <div>
                    <label style={labelStyle}>Special Requests (optional)</label>
                    <textarea style={{...inputStyle,resize:"vertical",minHeight:"80px"}}
                      placeholder="Dietary requirements, celebrations, seating preferences..." value={form.notes}
                      onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/>
                  </div>

                  {/* Summary */}
                  {form.date && (
                    <div style={{ padding:"20px", background:"rgba(212,175,88,0.06)", border:"1px solid rgba(212,175,88,0.2)" }}>
                      <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.45em", color:G, textTransform:"uppercase", marginBottom:"10px" }}>Booking Summary</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"24px" }}>
                        {[
                          {l:"Party", v:form.partySize},
                          {l:"Date",  v:new Date(form.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})},
                          {l:"Time",  v:form.time},
                        ].map(item=>(
                          <div key={item.l}>
                            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", color:"rgba(212,175,88,0.5)", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:"3px" }}>{item.l}</p>
                            <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1rem", color:I }}>{item.v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button type="submit" className="btn-primary-outline" style={{ textAlign:"center", fontSize:"11px" }}>
                    Confirm Reservation →
                  </button>

                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.22)", textAlign:"center", lineHeight:1.7 }}>
                    You will be redirected to our secure reservation system to complete your booking.
                  </p>
                </motion.form>
              ) : (
                <motion.div key="thanks" initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}}
                  style={{ textAlign:"center", padding:"80px 40px", border:"1px solid rgba(212,175,88,0.2)", background:"rgba(212,175,88,0.04)" }}>
                  <div style={{ width:"60px", height:"60px", borderRadius:"50%", border:"1px solid rgba(212,175,88,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", fontSize:"24px" }}>✓</div>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:G, textTransform:"uppercase", marginBottom:"12px" }}>Reservation Received</p>
                  <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"2rem", color:I, marginBottom:"12px" }}>We'll see you soon.</h2>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", color:"rgba(232,224,204,0.45)", lineHeight:1.85 }}>
                    Redirecting you to complete your reservation...<br />
                    If not redirected, <a href={SHIFT4_URL} target="_blank" rel="noopener noreferrer" style={{color:G}}>click here</a>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Sidebar info ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            <div style={{ padding:"28px", background:"rgba(212,175,88,0.04)", border:"1px solid rgba(212,175,88,0.12)" }}>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:G, textTransform:"uppercase", marginBottom:"16px" }}>Hours</p>
              {HOURS.map(h=>(
                <div key={h.day} style={{ display:"flex", justifyContent:"space-between", paddingBottom:"10px", marginBottom:"10px", borderBottom:"1px solid rgba(212,175,88,0.07)" }}>
                  <span style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:h.day===currentDay?G:"rgba(232,224,204,0.4)", fontWeight:h.day===currentDay?600:400 }}>{h.day}</span>
                  <span style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:h.day===currentDay?"rgba(232,224,204,0.8)":"rgba(232,224,204,0.35)" }}>{h.time}</span>
                </div>
              ))}
            </div>

            <div style={{ padding:"28px", background:"rgba(212,175,88,0.04)", border:"1px solid rgba(212,175,88,0.12)" }}>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:G, textTransform:"uppercase", marginBottom:"16px" }}>Contact</p>
              <a href={`tel:+13467680068`} style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.1rem", color:I, display:"block", marginBottom:"8px" }}>{PHONE_NUMBER}</a>
              <a href={`tel:+17132775082`} style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.1rem", color:I, display:"block", marginBottom:"16px" }}>{PHONE_SECONDARY}</a>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.4)", lineHeight:1.7, display:"block" }}>
                17695 Tomball Pkwy<br />Houston, TX 77064
              </a>
            </div>

            <div style={{ padding:"24px", background:"rgba(212,175,88,0.04)", border:"1px solid rgba(212,175,88,0.12)" }}>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.4)", lineHeight:1.85 }}>
                Walk-ins always welcome. For parties of 9 or more, please call us directly. Free parking available on site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
