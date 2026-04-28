import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const T="#113122",R="#a34d26",I="#e8e0cc",D="#0a1f15";

const EVENTS = [
  { id:1, title:"Private Dining",     price:75,  img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", desc:"Intimate private dining for birthdays, anniversaries and special occasions. Dedicated space, custom menu options." },
  { id:2, title:"Corporate Events",   price:95,  img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", desc:"Team dinners and client entertainment at Raahi. We handle the food, you focus on the conversation." },
  { id:3, title:"Weekend Specials",   price:55,  img:"https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80", desc:"Live music evenings, chef tasting menus and themed nights. Follow us on Instagram for upcoming events." },
  { id:4, title:"Indian Catering",    price:65,  img:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", desc:"We bring Raahi to your event. Weddings, office parties and private functions across Houston." },
  { id:5, title:"Cooking Experience", price:120, img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", desc:"An exclusive behind-the-scenes experience with Chef Akshay. Learn the secrets behind our most popular dishes." },
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
            border: active===i ? "1px solid rgba(163,77,38,0.5)" : "1px solid rgba(163,77,38,0.15)",
            minWidth:0,
          }}
          onMouseEnter={() => setActive(i)}>
          <img src={ev.img} alt={ev.title}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.42) saturate(0.8)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,31,21,0.96) 0%,rgba(10,31,21,0.2) 60%,transparent 100%)" }}/>
          {active===i && <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:R }}/>}

          {/* Collapsed label */}
          {active!==i && (
            <div style={{
              position:"absolute", top:"50%", left:"50%",
              transform:"translate(-50%,-50%) rotate(90deg)",
              whiteSpace:"nowrap",
              fontFamily:"Cormorant Garamond,Georgia,serif",
              fontStyle:"italic", fontSize:"15px",
              color:"rgba(232,224,204,0.55)",
            }}>
              {ev.title}
            </div>
          )}

          {/* Expanded content */}
          {active===i && (
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"32px" }}>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.4em", color:R, textTransform:"uppercase", marginBottom:"10px" }}>
                Per Person · ${ev.price}
              </p>
              <h3 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"2rem", color:I, marginBottom:"12px" }}>
                {ev.title}
              </h3>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"13px", color:"rgba(232,224,204,0.55)", lineHeight:1.8, marginBottom:"24px", maxWidth:"380px" }}>
                {ev.desc}
              </p>
              <button onClick={() => onSelect(ev)} className="btn-primary-outline" style={{ fontSize:"10px", padding:"0.7rem 1.6rem" }}>
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
  const [loading, setLoading] = useState(false);
  const tickets = parseInt(form.tickets) || 1;
  const total   = tickets * event.price;

  const inputStyle: React.CSSProperties = {
    width:"100%", background:"rgba(111,133,102,0.08)", border:"1px solid rgba(163,77,38,0.2)",
    color:I, padding:"12px 14px", fontFamily:"Jost,sans-serif", fontSize:"13px", outline:"none", borderRadius:"2px",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.4em",
    color:"rgba(163,77,38,0.7)", textTransform:"uppercase", display:"block", marginBottom:"6px",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.open("https://buy.stripe.com/your_payment_link", "_blank");
    setLoading(false);
  };

  return (
    <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ background:"rgba(10,31,21,0.92)" }}
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}>
      <motion.div
        style={{ background:D, border:"1px solid rgba(163,77,38,0.25)", maxWidth:"560px", width:"100%", maxHeight:"90vh", overflowY:"auto" }}
        initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:40, opacity:0 }}
        transition={{ duration:0.35 }}
        onClick={e => e.stopPropagation()}>
        <div style={{ padding:"28px 28px 20px", borderBottom:"1px solid rgba(163,77,38,0.12)", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.45em", color:R, textTransform:"uppercase", marginBottom:"4px" }}>Book Event</p>
            <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.6rem", color:I }}>{event.title}</h2>
          </div>
          <button onClick={onClose} style={{ color:"rgba(232,224,204,0.35)", background:"none", border:"none", cursor:"pointer", fontSize:"20px" }}>x</button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding:"28px", display:"flex", flexDirection:"column", gap:"18px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
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
                <option key={n} value={n} style={{background:D,color:I}}>{n} {n===1?"ticket":"tickets"}</option>
              ))}
            </select>
          </div>
          <div style={{ padding:"16px", background:"rgba(163,77,38,0.07)", border:"1px solid rgba(163,77,38,0.15)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.45)" }}>${event.price} x {tickets} ticket{tickets>1?"s":""}</p>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.35em", color:"rgba(163,77,38,0.6)", textTransform:"uppercase", marginBottom:"2px" }}>Total</p>
              <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.8rem", color:I }}>${total}</p>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary-outline w-full text-center">
            {loading ? "Redirecting..." : "Continue to Payment"}
          </button>
          <p style={{ fontFamily:"Jost,sans-serif", fontSize:"11px", color:"rgba(232,224,204,0.25)", textAlign:"center", lineHeight:1.65 }}>
            You will be taken to Stripe secure payment to complete your booking.
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
      <div style={{ background:D, paddingTop:"120px", paddingBottom:"64px", borderBottom:"1px solid rgba(163,77,38,0.15)" }}>
        <div className="container mx-auto px-6">
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.55em", color:R, textTransform:"uppercase", marginBottom:"1rem" }}>
            Events and Private Dining
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
            style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"clamp(2.5rem,6vw,5rem)", color:I, lineHeight:0.95, marginBottom:"1rem" }}>
            Make it a night to remember.
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"15px", color:"rgba(232,224,204,0.45)", maxWidth:"480px", lineHeight:1.85 }}>
            Hover over an event to explore it, then click Book to reserve your spot.
          </motion.p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <EventAccordion onSelect={setSelected} />
      </div>
      <AnimatePresence>
        {selected && <BookingForm event={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
