import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const G="#d4af58",I="#e8e0cc",T="#081910",D="#0c1e14";

const inputStyle = {
  width:"100%", background:"rgba(212,175,88,0.04)",
  border:"1px solid rgba(212,175,88,0.15)", color:I,
  padding:"13px 16px", fontFamily:"Jost,sans-serif",
  fontSize:"13px", outline:"none", borderRadius:"2px",
  transition:"border-color 0.3s",
} as React.CSSProperties;

const labelStyle = {
  fontFamily:"Jost,sans-serif", fontSize:"9px",
  letterSpacing:"0.45em", color:"rgba(212,175,88,0.6)",
  textTransform:"uppercase" as const, display:"block", marginBottom:"8px",
};

const EVENTS = [
  { id:"catering",  label:"Catering",        num:"01", img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=90", desc:"We bring Raahi to your event. Weddings, office parties, private functions." },
  { id:"birthday",  label:"Birthdays",        num:"02", img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=90", desc:"Make it memorable. Private space, custom menu, dedicated service." },
  { id:"corporate", label:"Corporate Events",  num:"03", img:"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=90", desc:"Team dinners, client entertainment, seamless group dining." },
  { id:"custom",    label:"Custom Event",      num:"04", img:"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=90", desc:"Something unique? Tell us about it. Ticket price: $40 per person.", price:40 },
];

function CateringForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ firstName:"", lastName:"", phone:"", email:"", guests:"", event:"", date:"", notes:"" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        eventType: modal || "catering",
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        guests: form.guests,
        event: form.event,
        date: form.date,
        notes: form.notes,
      };
      await fetch("https://script.google.com/macros/s/AKfycbyHB2emc8X67DV7qUwO8uAYBr20mPP8ipJVqGWL1OF5HGpyWTi-N8PGmAlsp7tPme7I/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
    } catch(err) {
      console.log("Sheet error", err);
    }
    setSent(true);
  };

  return (
    <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ background:"rgba(8,25,16,0.96)", backdropFilter:"blur(16px)" }}
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}>
      <motion.div style={{ background:D, border:"1px solid rgba(212,175,88,0.2)", maxWidth:"600px", width:"100%", maxHeight:"90vh", overflowY:"auto" }}
        initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:40, opacity:0 }}
        transition={{ duration:0.35 }} onClick={e => e.stopPropagation()}>

        <div style={{ padding:"28px", borderBottom:"1px solid rgba(212,175,88,0.1)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.45em", color:G, textTransform:"uppercase", marginBottom:"4px", opacity:0.7 }}>Enquiry</p>
            <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.8rem", color:I }}>Catering & Events</h2>
          </div>
          <button onClick={onClose} style={{ color:"rgba(232,224,204,0.3)", background:"none", border:"none", cursor:"pointer", fontSize:"22px" }}>×</button>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ padding:"28px", display:"flex", flexDirection:"column", gap:"18px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
              <div><label style={labelStyle}>First Name</label><input required style={inputStyle} placeholder="Jane" value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))}/></div>
              <div><label style={labelStyle}>Last Name</label><input required style={inputStyle} placeholder="Smith" value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))}/></div>
            </div>
            <div><label style={labelStyle}>Phone Number</label><input required type="tel" style={inputStyle} placeholder="+1 (713) 000-0000" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></div>
            <div><label style={labelStyle}>Email Address</label><input required type="email" style={inputStyle} placeholder="jane@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
            <div><label style={labelStyle}>Number of Guests</label>
              <select required style={{...inputStyle,cursor:"pointer"}} value={form.guests} onChange={e=>setForm(f=>({...f,guests:e.target.value}))}>
                <option value="">Select...</option>
                {["10-20","21-50","51-100","101-200","200+"].map(o=><option key={o} value={o} style={{background:D,color:I}}>{o} guests</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Type of Event</label>
              <select required style={{...inputStyle,cursor:"pointer"}} value={form.event} onChange={e=>setForm(f=>({...f,event:e.target.value}))}>
                <option value="">Select...</option>
                {["Wedding","Birthday","Corporate Dinner","Office Party","Private Celebration","Other"].map(o=><option key={o} value={o} style={{background:D,color:I}}>{o}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Preferred Date</label><input type="date" style={inputStyle} value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
            <div><label style={labelStyle}>Additional Details</label>
              <textarea style={{...inputStyle,resize:"vertical",minHeight:"90px"}} placeholder="Tell us about your event, dietary requirements, special requests..." value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/>
            </div>
            <button type="submit" className="btn-primary-outline" style={{ textAlign:"center" }}>Submit Enquiry</button>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.25)", textAlign:"center" }}>We will get back to you within 24 hours.</p>
          </form>
        ) : (
          <div style={{ padding:"60px 28px", textAlign:"center" }}>
            <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"2rem", color:I, marginBottom:"12px" }}>Thank you!</p>
            <div style={{ height:"1px", width:"50px", background:`linear-gradient(90deg,transparent,${G},transparent)`, margin:"0 auto 16px" }}/>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"13px", color:"rgba(232,224,204,0.4)", lineHeight:1.85 }}>We have received your enquiry and will be in touch within 24 hours.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CustomEventForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ firstName:"", lastName:"", phone:"", email:"", tickets:"1" });
  const tickets = parseInt(form.tickets)||1;
  const [loading, setLoading] = useState(false);
  const total = tickets * 40;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stripeUrl = `https://buy.stripe.com/eVqfZg8ldcZ6dxUe3X83C00?prefilled_email=${encodeURIComponent(form.email)}&quantity=${tickets}&prefilled_promo_code=&locale=auto`;
    window.open(stripeUrl, "_blank");
  };

  return (
    <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ background:"rgba(8,25,16,0.96)", backdropFilter:"blur(16px)" }}
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}>
      <motion.div style={{ background:D, border:"1px solid rgba(212,175,88,0.2)", maxWidth:"540px", width:"100%", maxHeight:"90vh", overflowY:"auto" }}
        initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:40, opacity:0 }}
        transition={{ duration:0.35 }} onClick={e => e.stopPropagation()}>

        <div style={{ padding:"28px", borderBottom:"1px solid rgba(212,175,88,0.1)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.45em", color:G, textTransform:"uppercase", marginBottom:"4px", opacity:0.7 }}>Book Tickets · $40 per person</p>
            <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.8rem", color:I }}>Custom Event</h2>
          </div>
          <button onClick={onClose} style={{ color:"rgba(232,224,204,0.3)", background:"none", border:"none", cursor:"pointer", fontSize:"22px" }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding:"28px", display:"flex", flexDirection:"column", gap:"18px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
            <div><label style={labelStyle}>First Name</label><input required style={inputStyle} placeholder="Jane" value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))}/></div>
            <div><label style={labelStyle}>Last Name</label><input required style={inputStyle} placeholder="Smith" value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))}/></div>
          </div>
          <div><label style={labelStyle}>Phone Number</label><input required type="tel" style={inputStyle} placeholder="+1 (713) 000-0000" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></div>
          <div><label style={labelStyle}>Email Address</label><input required type="email" style={inputStyle} placeholder="jane@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
          <div><label style={labelStyle}>Number of Tickets</label>
            <select required style={{...inputStyle,cursor:"pointer"}} value={form.tickets} onChange={e=>setForm(f=>({...f,tickets:e.target.value}))}>
              {[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n} style={{background:D,color:I}}>{n} {n===1?"ticket":"tickets"}</option>)}
            </select>
          </div>
          <div style={{ padding:"16px", background:"rgba(212,175,88,0.06)", border:"1px solid rgba(212,175,88,0.15)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.45)" }}>$40 × {tickets} ticket{tickets>1?"s":""}</p>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.35em", color:"rgba(212,175,88,0.5)", textTransform:"uppercase", marginBottom:"2px" }}>Total</p>
              <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.8rem", color:G }}>${total}</p>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary-outline" style={{ textAlign:"center", opacity:loading?0.6:1 }}>{loading ? "Redirecting..." : "Continue to Payment →"}</button>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.25)", textAlign:"center" }}>You will be taken to Stripe secure payment.</p>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function BookEvent() {
  const [modal, setModal] = useState<string|null>(null);
  const [active, setActive] = useState(0);

  return (
    <div style={{ background:T, minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#081910,#0f2818,#081910)", paddingTop:"120px", paddingBottom:"64px", borderBottom:"1px solid rgba(212,175,88,0.1)" }}>
        <div className="container mx-auto px-6">
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>
            Events & Private Dining
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
            style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2.5rem,6vw,5rem)", color:I, lineHeight:0.95, marginBottom:"1rem" }}>
            Make it a night to remember.
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"15px", color:"rgba(232,224,204,0.45)", maxWidth:"480px", lineHeight:1.85 }}>
            From intimate private dinners to large corporate events — Raahi is built for occasions that deserve great food.
          </motion.p>
        </div>
      </div>

      {/* Event cards accordion */}
      <div className="container mx-auto px-6 py-16">
        <div style={{ display:"flex", flexDirection:"row", gap:"8px", height:"520px", width:"100%" }}>
          {EVENTS.map((ev, i) => (
            <div key={ev.id}
              style={{
                position:"relative", overflow:"hidden", cursor:"pointer",
                backgroundImage:`url(${ev.img})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            flex: active===i ? "4 1 0%" : "1 1 0%",
                borderRadius:"4px",
                transition:"flex 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                border: active===i ? "1px solid rgba(212,175,88,0.45)" : "1px solid rgba(212,175,88,0.1)",
                minWidth:0,
    
              }}
              onMouseEnter={() => setActive(i)}>

              {active===i && <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,transparent,${G},transparent)` }}/>}

              {active!==i && (
                <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%) rotate(90deg)", whiteSpace:"nowrap",
                  fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"15px", color:"rgba(232,224,204,0.45)" }}>
                  {ev.label}
                </div>
              )}

              {active===i && (
                <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.15 }}
                  style={{ position:"absolute", bottom:0, left:0, right:0, padding:"36px" }}>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:G, textTransform:"uppercase", marginBottom:"12px", opacity:0.8 }}>{ev.num}</p>
                  <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.8rem,3vw,2.4rem)", color:I, marginBottom:"14px" }}>{ev.label}</h2>
                  <div style={{ width:"36px", height:"1px", background:G, marginBottom:"16px", opacity:0.5 }}/>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"13px", color:"rgba(232,224,204,0.52)", lineHeight:1.85, marginBottom:"24px", maxWidth:"360px" }}>{ev.desc}</p>
                  <button
                    onClick={() => setModal(ev.id)}
                    style={{ border:`1px solid ${G}`, color:G, padding:"0.7rem 1.8rem", fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.28em", textTransform:"uppercase", background:"transparent", cursor:"pointer", transition:"all 0.3s" }}
                    onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=G; el.style.color=T; }}
                    onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.color=G; }}>
                    {ev.price ? "Book Tickets →" : "Enquire Now →"}
                  </button>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {(modal==="catering"||modal==="birthday"||modal==="corporate") && <CateringForm onClose={()=>setModal(null)}/>}
        {modal==="custom" && <CustomEventForm onClose={()=>setModal(null)}/>}
      </AnimatePresence>
    </div>
  );
}
