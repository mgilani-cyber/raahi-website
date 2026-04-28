import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const T="#081910",G="#d4af58",I="#e8e0cc",D="#0c1e14";

const EVENTS = [
  { id:1, title:"Private Dining",     price:75,  img:"/raahi/11.03.25RaahiIndianKitchen_0013.jpg", desc:"Intimate private dining for birthdays, anniversaries and special occasions. Dedicated space, custom menu options." },
  { id:2, title:"Corporate Events",   price:95,  img:"/raahi/11.03.25RaahiIndianKitchen_0038.jpg", desc:"Team dinners and client entertainment at Raahi. We handle the food, you focus on the conversation." },
  { id:3, title:"Weekend Specials",   price:55,  img:"/raahi/11.03.25RaahiIndianKitchen_0098.jpg", desc:"Live music evenings, chef tasting menus and themed nights. Follow us on Instagram for upcoming events." },
  { id:4, title:"Indian Catering",    price:65,  img:"/raahi/RAAHI (4)-2.jpg",                      desc:"We bring Raahi to your event. Weddings, office parties and private functions." },
  { id:5, title:"Cooking Experience", price:120, img:"/raahi/RAAHI (5).png",                        desc:"An exclusive behind-the-scenes experience with Chef Akshay. Learn the secrets behind our most popular dishes." },
];

const GALLERY_IMAGES = [
  "/raahi/11.03.25RaahiIndianKitchen_0013.jpg",
  "/raahi/11.03.25RaahiIndianKitchen_0038.jpg",
  "/raahi/11.03.25RaahiIndianKitchen_0098.jpg",
  "/raahi/RAAHI (4)-2.jpg",
  "/raahi/RAAHI (5).png",
  "/raahi/RAAHI (6).png",
];

function EventAccordion({ onSelect }: { onSelect: (ev: typeof EVENTS[0]) => void }) {
  const [active, setActive] = useState(0);
  return (
    <div style={{ display:"flex", flexDirection:"row", alignItems:"stretch", gap:"8px", height:"520px", width:"100%" }}>
      {EVENTS.map((ev, i) => (
        <div key={ev.id}
          style={{
            position:"relative", overflow:"hidden", cursor:"pointer",
            flex: active===i ? "4 1 0%" : "1 1 0%",
            borderRadius:"4px",
            transition:"flex 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
            border: active===i ? `1px solid rgba(212,175,88,0.4)` : "1px solid rgba(212,175,88,0.1)",
            minWidth:0,
          }}
          onMouseEnter={() => setActive(i)}>
          <img src={ev.img} alt={ev.title}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.4) saturate(0.8)", transition:"filter 0.5s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter="brightness(0.55) saturate(0.9)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter="brightness(0.4) saturate(0.8)"}
          />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(8,25,16,0.97) 0%,rgba(8,25,16,0.2) 60%,transparent 100%)" }}/>
          {active===i && <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,transparent,${G},transparent)` }}/>}

          {active!==i && (
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%) rotate(90deg)", whiteSpace:"nowrap", fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"15px", color:"rgba(232,224,204,0.5)" }}>
              {ev.title}
            </div>
          )}

          {active===i && (
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"32px" }}>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.4em", color:G, textTransform:"uppercase", marginBottom:"10px", opacity:0.8 }}>
                Per Person · ${ev.price}
              </p>
              <h3 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"2rem", color:I, marginBottom:"12px" }}>
                {ev.title}
              </h3>
              <div style={{ width:"40px", height:"1px", background:G, marginBottom:"16px", opacity:0.5 }}/>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"13px", color:"rgba(232,224,204,0.52)", lineHeight:1.85, marginBottom:"24px", maxWidth:"360px" }}>
                {ev.desc}
              </p>
              <button onClick={() => onSelect(ev)}
                style={{ border:`1px solid ${G}`, color:G, padding:"0.7rem 1.8rem", fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", background:"transparent", cursor:"pointer", transition:"all 0.3s" }}
                onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background=G; el.style.color="#081910"; }}
                onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.color=G; }}>
                Book This Event
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function BookingForm({ event, onClose }: { event: typeof EVENTS[0]; onClose: () => void }) {
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", phone:"", tickets:"1" });
  const tickets = parseInt(form.tickets) || 1;
  const total   = tickets * event.price;

  const inputStyle: React.CSSProperties = {
    width:"100%", background:"rgba(212,175,88,0.04)", border:"1px solid rgba(212,175,88,0.15)",
    color:I, padding:"13px 16px", fontFamily:"Jost,sans-serif", fontSize:"13px", outline:"none", borderRadius:"2px",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.45em",
    color:"rgba(212,175,88,0.6)", textTransform:"uppercase", display:"block", marginBottom:"8px",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open("https://buy.stripe.com/your_payment_link", "_blank");
  };

  return (
    <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ background:"rgba(8,25,16,0.94)" }}
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}>
      <motion.div
        style={{ background:"#0c1e14", border:"1px solid rgba(212,175,88,0.2)", maxWidth:"540px", width:"100%", maxHeight:"90vh", overflowY:"auto", borderRadius:"2px" }}
        initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:40, opacity:0 }}
        transition={{ duration:0.35 }}
        onClick={e => e.stopPropagation()}>
        <div style={{ padding:"28px", borderBottom:"1px solid rgba(212,175,88,0.1)", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.45em", color:G, textTransform:"uppercase", marginBottom:"6px", opacity:0.7 }}>Book Event</p>
            <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.8rem", color:I }}>{event.title}</h2>
          </div>
          <button onClick={onClose} style={{ color:"rgba(232,224,204,0.3)", background:"none", border:"none", cursor:"pointer", fontSize:"22px", lineHeight:1 }}>×</button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding:"28px", display:"flex", flexDirection:"column", gap:"18px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input required style={inputStyle} placeholder="Jane" value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))}/>
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input required style={inputStyle} placeholder="Smith" value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))}/>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input required type="email" style={inputStyle} placeholder="jane@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
          </div>
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input required type="tel" style={inputStyle} placeholder="+1 (713) 000-0000" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/>
          </div>
          <div>
            <label style={labelStyle}>Number of Tickets</label>
            <select required style={{...inputStyle,cursor:"pointer"}} value={form.tickets} onChange={e=>setForm(f=>({...f,tickets:e.target.value}))}>
              {[1,2,3,4,5,6,7,8,9,10].map(n=>(
                <option key={n} value={n} style={{background:"#0c1e14",color:I}}>{n} {n===1?"ticket":"tickets"}</option>
              ))}
            </select>
          </div>
          <div style={{ padding:"18px", background:"rgba(212,175,88,0.06)", border:"1px solid rgba(212,175,88,0.15)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", color:"rgba(232,224,204,0.45)" }}>${event.price} × {tickets} ticket{tickets>1?"s":""}</p>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.35em", color:"rgba(212,175,88,0.5)", textTransform:"uppercase", marginBottom:"3px" }}>Total</p>
              <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"2rem", color:G }}>${total}</p>
            </div>
          </div>
          <button type="submit"
            style={{ border:`1px solid ${G}`, color:G, padding:"0.9rem 2rem", fontFamily:"Jost,sans-serif", fontSize:"11px", letterSpacing:"0.25em", textTransform:"uppercase", background:"transparent", cursor:"pointer", transition:"all 0.4s", position:"relative", overflow:"hidden" }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background=G; el.style.color="#081910"; }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.color=G; }}>
            Continue to Payment →
          </button>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.22)", textAlign:"center", lineHeight:1.7 }}>
            You will be taken to our secure payment page to complete your booking.
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function BookEvent() {
  const [selected, setSelected] = useState<typeof EVENTS[0] | null>(null);

  return (
    <div style={{ background:T, minHeight:"100vh" }}>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#081910,#0f2818,#081910)", paddingTop:"120px", paddingBottom:"64px", borderBottom:"1px solid rgba(212,175,88,0.1)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"350px", height:"350px", borderRadius:"50%", border:"1px solid rgba(212,175,88,0.05)", pointerEvents:"none" }}/>
        <div className="container mx-auto px-6 relative z-10">
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:G, textTransform:"uppercase", marginBottom:"1rem", opacity:0.7 }}>
            Events and Private Dining
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
            style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2.8rem,6vw,5.5rem)", color:I, lineHeight:0.95, marginBottom:"1.5rem" }}>
            Make it a night<br/>to remember.
          </motion.h1>
          <div style={{ width:"60px", height:"1px", background:`linear-gradient(90deg,transparent,${G},transparent)`, marginBottom:"1.5rem" }}/>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"15px", color:"rgba(232,224,204,0.42)", maxWidth:"480px", lineHeight:1.9 }}>
            Hover over an event to explore it, then click Book to reserve your spot.
          </motion.p>
        </div>
      </div>

      {/* Accordion */}
      <div className="container mx-auto px-6 py-16">
        <EventAccordion onSelect={setSelected} />
      </div>

      {/* Image Gallery */}
      <div style={{ background:D, padding:"0 0 80px", borderTop:"1px solid rgba(212,175,88,0.08)" }}>
        <div className="container mx-auto px-6 pt-16 mb-10">
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:"rgba(212,175,88,0.6)", textTransform:"uppercase", marginBottom:"10px" }}>
            The Experience
          </p>
          <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:I }}>
            A glimpse inside Raahi.
          </h2>
        </div>
        <div className="container mx-auto px-6">
          <div style={{ display:"flex", alignItems:"stretch", gap:"8px", height:"400px", width:"100%" }}>
            {GALLERY_IMAGES.map((src, idx) => (
              <div key={idx}
                className="relative overflow-hidden cursor-pointer"
                style={{ flex:"1 1 0%", borderRadius:"4px", transition:"flex 0.6s cubic-bezier(0.25,0.46,0.45,0.94)", border:"1px solid rgba(212,175,88,0.08)", minWidth:0, overflow:"hidden" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.flex="4 1 0%"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.flex="1 1 0%"; }}>
                <img src={src} alt={`Raahi ${idx+1}`}
                  className="w-full h-full object-cover"
                  style={{ filter:"brightness(0.6) saturate(0.85)", transition:"filter 0.5s, transform 0.7s" }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.filter="brightness(0.85) saturate(1)"; el.style.transform="scale(1.06)"; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.filter="brightness(0.6) saturate(0.85)"; el.style.transform="scale(1)"; }}
                />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(8,25,16,0.7) 0%,transparent 60%)", pointerEvents:"none" }}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <BookingForm event={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* Image Gallery */}
      <div style={{ background:"#0c1e14", padding:"0 0 80px", borderTop:"1px solid rgba(212,175,88,0.08)" }}>
        <div className="container mx-auto px-6 pt-16 mb-10">
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", color:"rgba(212,175,88,0.6)", textTransform:"uppercase", marginBottom:"10px" }}>
            The Experience
          </p>
          <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:"#e8e0cc" }}>
            A glimpse inside Raahi.
          </h2>
        </div>
        <div className="container mx-auto px-6">
          <div style={{ display:"flex", alignItems:"stretch", gap:"8px", height:"400px", width:"100%" }}>
            {[
              "/raahi/11.03.25RaahiIndianKitchen_0013.jpg",
              "/raahi/11.03.25RaahiIndianKitchen_0038.jpg",
              "/raahi/11.03.25RaahiIndianKitchen_0098.jpg",
              "/raahi/RAAHI (4)-2.jpg",
              "/raahi/RAAHI (5).png",
              "/raahi/RAAHI (6).png",
            ].map((src, idx) => (
              <div key={idx}
                className="relative overflow-hidden cursor-pointer"
                style={{ flex:"1 1 0%", borderRadius:"4px", transition:"flex 0.6s cubic-bezier(0.25,0.46,0.45,0.94)", border:"1px solid rgba(212,175,88,0.08)", minWidth:0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.flex="4 1 0%"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.flex="1 1 0%"; }}>
                <img src={src} alt={`Raahi ${idx+1}`}
                  className="w-full h-full object-cover"
                  style={{ filter:"brightness(0.6) saturate(0.85)", transition:"filter 0.5s, transform 0.7s", transform:"scale(1.04)" }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.filter="brightness(0.85) saturate(1)"; el.style.transform="scale(1.08)"; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.filter="brightness(0.6) saturate(0.85)"; el.style.transform="scale(1.04)"; }}
                />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(8,25,16,0.8) 0%,transparent 60%)", pointerEvents:"none" }}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
