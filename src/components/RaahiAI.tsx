import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, Send, Sparkles, Minus } from "lucide-react";
import { PHONE_NUMBER, PHONE_SECONDARY, EMAIL, GOOGLE_MAPS_URL } from "@/constants";

const G="#d4af58",I="#e8e0cc",T="#081910",D="#0a1f15",R="#a34d26";
const SHIFT4 = "https://reservations.shift4payments.com/#/28a60320-b36c-4294-9eb4-0bc1b1d8e019";

// ── Knowledge base ────────────────────────────────────────────────────────────
const KB: Record<string,string> = {
  hours: `**Our hours:**\n- Monday: 11 AM – 10 PM\n- Tuesday: 5 PM – 10 PM\n- Wednesday–Sunday: 11 AM – 10 PM\n\nNote: Tuesday we open later at 5 PM.`,
  location: `**Find us at:**\n17695 Tomball Pkwy\nHouston, TX 77064\n\nFree parking available on site. [Get Directions →](${GOOGLE_MAPS_URL})`,
  reservation: `I'd love to help you reserve a table! Let me get a few details:\n\n**What date were you thinking?**`,
  menu: `**Our menu covers:**\n\n🥗 **Starters** — Pakoras, Samosas, Street Eats (Gol Gappe, Chaat, Dahi Bhalla)\n🔥 **Tandoor** — Lamb Chops ($24.99), Tandoori Chicken, Salmon, Prawns, Tikkas\n🫓 **Dosas** — Plain, Masala, Mysore, Paneer (from $9.99)\n🍛 **Veg Mains** — Palak Paneer, Shahi Paneer, Dal Makhani, Sarson Da Saag\n🍗 **Chicken** — Butter Chicken, Tikka Masala, Chettinad, Korma (all $16.99)\n🐑 **Lamb & Goat** — Masala, Vindaloo, Korma ($19.99–$21.99)\n🍚 **Biryani** — 9 options: Chicken, Goat, Lamb, Paneer, Gongura and more\n🍹 **Bar** — Raahi Hurricane, Signature Margaritas (5 flavours), Mango Storm\n🍮 **Desserts** — Gulab Jamun, Rasmalai, Kulfi, Faluda\n\n[See Full Menu →](/menus)`,
  butter_chicken: `**Butter Chicken** — $16.99\n\nTandoori chicken in a rich tomato-fenugreek sauce with cream. Our most-ordered dish — guests say it's the best in North Houston.`,
  biryani: `**Our 9 Biryanis:**\n- Veg — $13.99\n- Egg — $14.99\n- Paneer — $15.99\n- Chicken — $16.99 ⭐\n- Gongura Chicken — $16.99\n- Vijaywada Boneless Chicken — $16.99\n- Goat — $19.99\n- Gongura Goat — $19.99\n- Lamb — $21.99`,
  cocktails: `**Signature Cocktails:**\n- Raahi Hurricane — $13 (Rum, Passion Fruit, Pineapple)\n- Raahi Margaritas — $12 (5 flavours: Classic, Blackberry, Mango, Pomegranate, Passion Fruit)\n- Mango Storm — $13 (Dark Rum, Ginger Beer)\n- Blackberry Old Fashioned — $12\n- Saffron G&T — $11\n\n**Mocktails** all $8 · **Lassi** all $5 · **Chai** $3`,
  vegetarian: `**Vegetarian at Raahi:**\n\nExtensive veg menu — Pakoras, all Street Eats, full Dosa Corner, 20+ Veg Mains (Palak Paneer, Shahi Paneer, Dal Bukhara, Sarson Da Saag), Veg & Paneer Biryani, all Paranthas (until 5 PM), all Lassis and Desserts.\n\n[View Veg Menu →](/menus)`,
  parking: `Free parking is available at 17695 Tomball Pkwy. We're in a strip center with easy access.`,
  contact: `📞 ${PHONE_NUMBER}\n📞 ${PHONE_SECONDARY}\n📧 ${EMAIL}\n📍 17695 Tomball Pkwy, Houston TX 77064`,
  about: `**About Raahi Indian Kitchen:**\n\nRaahi — meaning 'traveller' — is an authentic Indian restaurant serving North Houston. Traditional recipes, fresh ingredients, a full bar and a 4.9★ rating on Google from 144+ reviews.\n\nChef Akshay leads the kitchen. Rahul and the team run front-of-house. We cover North Indian, South Indian, street food, biryanis and craft cocktails.`,
  kids: `**Kids Menu:**\n- Fries — $4\n- Chicken Strips — $5\n- Mini Burgers (Paneer/Chicken) — $6\n- Combo (Burger + Fries + Pop) — $10`,
  desserts: `**Desserts:**\n- Gulab Jamun — $5.99 (popular!)\n- Rasmalai — $5.99\n- Carrot Halwa — $5.99\n- Gulab Jamun with Ice Cream — $7.99\n- Faluda — $7.99\n- Ice Cream (1 scoop) — $3`,
  bar: `**Full Bar at Raahi:**\n\nSignature cocktails, 5 margarita flavours, mocktails, Indian lassis and shakes, masala chai, draft and bottled beers, and a full spirits selection including Patron, MacAllan 12yr, Glenlivet and more.`,
};

// ── Reservation flow state machine ────────────────────────────────────────────
type ResStep = "idle"|"date"|"time"|"size"|"name"|"phone"|"confirm";

interface ResData { date:string; time:string; size:string; name:string; phone:string; }

function getResMessage(step:ResStep, data:ResData): string {
  switch(step) {
    case "date":   return "What date would you like to reserve? (e.g. April 28, Tuesday)";
    case "time":   return `Got it — **${data.date}**. What time works for you? (e.g. 7 PM)`;
    case "size":   return `Perfect — **${data.time}** on ${data.date}. How many guests will be joining?`;
    case "name":   return `${data.size} guests — wonderful. May I have your name?`;
    case "phone":  return `Thank you **${data.name}**! And your phone number for the reservation?`;
    case "confirm": return `Here's your booking summary:\n\n📅 **${data.date}**\n🕐 **${data.time}**\n👥 **${data.size} guests**\n👤 **${data.name}**\n📞 **${data.phone}**\n\nClick below to complete your reservation:\n\n[**Reserve Now →**](${SHIFT4})\n\nSee you soon! 🙏`;
    default: return "";
  }
}

function getResponse(q:string, resStep:ResStep, resData:ResData, setResStep:(s:ResStep)=>void, setResData:(d:ResData)=>void): string {
  const lq = q.toLowerCase();

  // Reservation flow
  if (resStep === "date") {
    setResData({...resData, date:q});
    setResStep("time");
    return getResMessage("time", {...resData, date:q});
  }
  if (resStep === "time") {
    setResData({...resData, time:q});
    setResStep("size");
    return getResMessage("size", {...resData, time:q});
  }
  if (resStep === "size") {
    setResData({...resData, size:q});
    setResStep("name");
    return getResMessage("name", {...resData, size:q});
  }
  if (resStep === "name") {
    setResData({...resData, name:q});
    setResStep("phone");
    return getResMessage("phone", {...resData, name:q});
  }
  if (resStep === "phone") {
    const updated = {...resData, phone:q};
    setResData(updated);
    setResStep("confirm");
    return getResMessage("confirm", updated);
  }

  // Trigger reservation
  if (/reserv|book.*table|table.*book|seat|make.*reserv/i.test(lq)) {
    setResStep("date");
    return getResMessage("date", resData);
  }

  if (/hour|open|close|time|when|schedule|tuesday|monday|wednesday|thursday|friday|saturday|sunday/i.test(lq)) return KB.hours;
  if (/location|address|where|tomball|77064|directions?|park|map/i.test(lq)) return KB.location;
  if (/butter.?chicken/i.test(lq)) return KB.butter_chicken;
  if (/biryani|dum.?rice/i.test(lq)) return KB.biryani;
  if (/cocktail|drink|alcohol|bar|beer|rum|gin|tequila|whiskey|vodka|hurricane|margarita/i.test(lq)) return KB.cocktails;
  if (/lassi|chai|coffee|shake|lemonade|mojito|beverage|hot.?drink/i.test(lq)) return KB.cocktails;
  if (/veg|vegetarian|paneer|no.?meat|plant.?based/i.test(lq)) return KB.vegetarian;
  if (/kid|child|junior|family/i.test(lq)) return KB.kids;
  if (/dessert|sweet|gulab|rasmalai|kulfi|halwa|faluda/i.test(lq)) return KB.desserts;
  if (/park/i.test(lq)) return KB.parking;
  if (/contact|phone|email|call|reach/i.test(lq)) return KB.contact;
  if (/about|story|chef|akshay|rahul|history|who/i.test(lq)) return KB.about;
  if (/menu|food|eat|dish|order|serve|what.?have/i.test(lq)) return KB.menu;
  if (/bar|drink|cocktail/i.test(lq)) return KB.bar;

  return `I'd be happy to help! For the most accurate answer, please call us at **${PHONE_NUMBER}** or browse our [menu →](/menus).\n\nI can also help you **reserve a table** — just say "book a table" to get started.`;
}

// ── Message renderer ──────────────────────────────────────────────────────────
function MsgText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <span>
      {lines.map((line, li) => {
        const segs = line.split(/(\.\*[^*]+\.\*|\[[^\]]+\]\([^)]+\))/g);
        return (
          <span key={li}>
            {li > 0 && <br />}
            {segs.map((seg, si) => {
              if (/^\.\*[^*]+\.\*$/.test(seg)) return <strong key={si}>{seg.slice(2,-2)}</strong>;
              const linkMatch = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
              if (linkMatch) {
                const isExt = linkMatch[2].startsWith("http");
                return <a key={si} href={linkMatch[2]} target={isExt?"_blank":undefined} rel={isExt?"noopener noreferrer":undefined}
                  style={{color:G,textDecoration:"underline"}}>{linkMatch[1]}</a>;
              }
              return seg;
            })}
          </span>
        );
      })}
    </span>
  );
}

// ── Main chatbot ──────────────────────────────────────────────────────────────
export function RaahiAI() {
  const [open,     setOpen]     = useState(false);
  const [minimized,setMin]      = useState(false);
  const [input,    setInput]    = useState("");
  const [resStep,  setResStep]  = useState<ResStep>("idle");
  const [resData,  setResData]  = useState<ResData>({date:"",time:"",size:"",name:"",phone:""});
  const [messages, setMessages] = useState<{role:"user"|"ai";text:string}[]>([
    {role:"ai", text:"Namaste! 🙏 I'm Raahi's assistant. I can help with our **menu**, **hours**, **location**, or I can walk you through **reserving a table** step by step.\n\nWhat can I help you with?"},
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);

  const send = useCallback((text:string) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMessages(m => [...m, {role:"user",text:userMsg}]);
    setInput("");
    setTimeout(() => {
      const reply = getResponse(userMsg, resStep, resData, setResStep, setResData);
      setMessages(m => [...m, {role:"ai",text:reply}]);
    }, 380);
  }, [resStep, resData]);

  const QUICK = ["What are your hours?","Book a table","See the menu","Where are you located?","Vegetarian options?"];

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => { setOpen(o => !o); setMin(false); }}
        className="fixed bottom-6 right-6 z-[70] flex items-center justify-center shadow-2xl"
        style={{ width:56, height:56, borderRadius:"50%", background:`linear-gradient(135deg,${G},#b8962e)`, border:"none", cursor:"pointer" }}
        whileHover={{scale:1.1}} whileTap={{scale:0.95}}
        aria-label="Chat with Raahi AI">
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}><X size={20} color={T}/></motion.div>
            : <motion.div key="s" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}}><Sparkles size={20} color={T}/></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat window — draggable */}
      <AnimatePresence>
        {open && (
          <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0}
            initial={{opacity:0,y:20,scale:0.96}}
            animate={{opacity:1,y:0,scale:1}}
            exit={{opacity:0,y:20,scale:0.96}}
            transition={{duration:0.28}}
            className="fixed z-[70] shadow-2xl"
            style={{
              bottom:"88px", right:"16px",
              width:"min(420px,calc(100vw - 2rem))",
              background:"#0c1e14",
              border:`1px solid rgba(212,175,88,0.2)`,
              borderRadius:"4px",
              display:"flex", flexDirection:"column",
              maxHeight: minimized ? "auto" : "580px",
              cursor:"auto",
            }}>

            {/* Header — drag handle */}
            <div
              onPointerDown={e => dragControls.start(e)}
              style={{ padding:"16px 20px", borderBottom:`1px solid rgba(212,175,88,0.12)`, background:"#0f2818", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"grab", borderRadius:"4px 4px 0 0" }}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:G,boxShadow:`0 0 8px ${G}`}}/>
                <div>
                  <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1rem",color:I,lineHeight:1}}>Raahi Assistant</p>
                  <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.3em",color:"rgba(212,175,88,0.55)",textTransform:"uppercase"}}>Always here to help</p>
                </div>
              </div>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={() => setMin(m=>!m)} style={{color:"rgba(232,224,204,0.3)",background:"none",border:"none",cursor:"pointer",padding:"4px"}}>
                  <Minus size={14}/>
                </button>
                <button onClick={() => setOpen(false)} style={{color:"rgba(232,224,204,0.3)",background:"none",border:"none",cursor:"pointer",padding:"4px"}}>
                  <X size={14}/>
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div style={{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"}}>
                  {messages.map((m,i) => (
                    <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                      <div style={{
                        maxWidth:"85%", padding:"12px 14px",
                        background: m.role==="user" ? `linear-gradient(135deg,${G},#b8962e)` : "rgba(212,175,88,0.06)",
                        border: m.role==="user" ? "none" : "1px solid rgba(212,175,88,0.1)",
                        borderRadius:"4px",
                        fontFamily:"Jost,sans-serif", fontSize:"13px",
                        color: m.role==="user" ? T : "rgba(232,224,204,0.78)",
                        lineHeight:1.7,
                        whiteSpace:"pre-wrap",
                      }}>
                        <MsgText text={m.text}/>
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef}/>
                </div>

                {/* Quick replies */}
                {messages.length <= 2 && (
                  <div style={{padding:"0 14px 10px",display:"flex",flexWrap:"wrap",gap:"6px"}}>
                    {QUICK.map(q => (
                      <button key={q} onClick={() => send(q)}
                        style={{fontFamily:"Jost,sans-serif",fontSize:"11px",padding:"6px 12px",border:`1px solid rgba(212,175,88,0.2)`,background:"rgba(212,175,88,0.04)",color:"rgba(212,175,88,0.75)",cursor:"pointer",borderRadius:"2px",transition:"all 0.2s"}}
                        onMouseEnter={e => {(e.currentTarget as HTMLElement).style.background="rgba(212,175,88,0.1)";}}
                        onMouseLeave={e => {(e.currentTarget as HTMLElement).style.background="rgba(212,175,88,0.04)";}}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div style={{padding:"12px 14px",borderTop:`1px solid rgba(212,175,88,0.1)`,display:"flex",gap:"8px"}}>
                  <input value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key==="Enter" && send(input)}
                    placeholder={resStep!=="idle" ? "Type your answer..." : "Ask me anything..."}
                    style={{flex:1,background:"rgba(212,175,88,0.05)",border:`1px solid rgba(212,175,88,0.15)`,color:I,padding:"10px 12px",fontFamily:"Jost,sans-serif",fontSize:"13px",outline:"none",borderRadius:"2px"}}/>
                  <button onClick={() => send(input)}
                    style={{width:40,height:40,background:`linear-gradient(135deg,${G},#b8962e)`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,borderRadius:"2px"}}>
                    <Send size={14} color={T}/>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
