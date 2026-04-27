import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { RESERVATION_URL, PHONE_NUMBER, PHONE_SECONDARY, EMAIL, INSTAGRAM_URL, FACEBOOK_URL, GOOGLE_MAPS_URL } from "@/constants";

const HOURS = [
  { day: "Monday",    time: "11 AM – 10 PM" },
  { day: "Tuesday",   time: "5 PM – 10 PM"  },
  { day: "Wednesday", time: "11 AM – 10 PM" },
  { day: "Thursday",  time: "11 AM – 10 PM" },
  { day: "Friday",    time: "11 AM – 10 PM" },
  { day: "Saturday",  time: "11 AM – 10 PM" },
  { day: "Sunday",    time: "11 AM – 10 PM" },
];

const NAV = [
  { label: "Home",         path: "/" },
  { label: "Menu",         path: "/menus" },
  { label: "Gallery",      path: "/gallery" },
  { label: "Events",       path: "/events" },
  { label: "Our Story",    path: "/story" },
  { label: "Reservations", path: "/reservations" },
  { label: "Gift Cards",   path: "/gift-cards" },
];

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const houston = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const day = houston.getDay();
  const h = houston.getHours() + houston.getMinutes() / 60;
  const isOpen = day === 1 ? h >= 11 && h < 22 : day === 2 ? h >= 17 && h < 22 : h >= 11 && h < 22;
  const timeStr = houston.toLocaleTimeString("en-US", { timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit", hour12: true });
  const today = houston.toLocaleString("en-US", { timeZone: "America/Chicago", weekday: "long" });
  return (
    <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: isOpen ? "#4CAF50" : "#E57373", flexShrink: 0 }} />
      <span style={{ fontFamily: "Jost, sans-serif", fontSize: "11px", color: isOpen ? "#4CAF50" : "#E57373" }}>
        {isOpen ? "Open Now" : day === 2 ? "Opens at 5 PM" : "Opens at 11 AM"}
      </span>
      <span style={{ fontFamily: "Jost, sans-serif", fontSize: "11px", color: "rgba(232,224,204,0.25)" }}>{timeStr} CT</span>
    </div>
  );
}

export const Footer = () => {
  const today = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", weekday: "long" });
  return (
    <footer style={{ background: "#0a1f15", borderTop: "1px solid rgba(163,77,38,0.18)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(163,77,38,0.55), transparent)" }} />
      <div className="container mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b" style={{ borderColor: "rgba(232,224,204,0.07)" }}>

          <div className="md:col-span-4">
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", fontSize: "2rem", color: "#e8e0cc", lineHeight: 1 }}>Raahi</p>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "8px", letterSpacing: "0.45em", color: "#a34d26", textTransform: "uppercase", marginTop: "4px", marginBottom: "16px" }}>Indian Kitchen · Houston</p>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "13px", color: "rgba(232,224,204,0.4)", lineHeight: 1.85, maxWidth: "280px", marginBottom: "20px" }}>
              Authentic Indian food in North Houston. Traditional recipes, fresh ingredients, a bar worth staying for. On Tomball Pkwy.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(232,224,204,0.3)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#a34d26")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.3)")}>
                <Instagram size={16} />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(232,224,204,0.3)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#a34d26")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.3)")}>
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: "rgba(163,77,38,0.7)", textTransform: "uppercase", marginBottom: "16px" }}>Navigate</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {NAV.map(n => (
                <li key={n.path}>
                  <Link to={n.path} style={{ fontFamily: "Jost, sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.4)", transition: "color 0.3s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#a34d26")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.4)")}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: "rgba(163,77,38,0.7)", textTransform: "uppercase", marginBottom: "16px" }}>Hours</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {HOURS.map(h => (
                <li key={h.day} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Jost, sans-serif", fontSize: "12px", color: h.day === today ? "#a34d26" : "rgba(232,224,204,0.38)", fontWeight: h.day === today ? 600 : 400 }}>{h.day}</span>
                  <span style={{ fontFamily: "Jost, sans-serif", fontSize: "12px", color: h.day === today ? "rgba(232,224,204,0.75)" : "rgba(232,224,204,0.38)" }}>{h.time}</span>
                </li>
              ))}
            </ul>
            <LiveClock />
          </div>

          <div className="md:col-span-2">
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: "rgba(163,77,38,0.7)", textTransform: "uppercase", marginBottom: "16px" }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Phone", content: <><a href="tel:+13467680068" style={{ display: "block", fontFamily: "Jost, sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.5)" }}>{PHONE_NUMBER}</a><a href="tel:+17132775082" style={{ display: "block", fontFamily: "Jost, sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.5)", marginTop: "2px" }}>{PHONE_SECONDARY}</a></> },
                { label: "Email",   content: <a href={"mailto:" + EMAIL} style={{ fontFamily: "Jost, sans-serif", fontSize: "11px", color: "rgba(232,224,204,0.5)", wordBreak: "break-all" as const }}>{EMAIL}</a> },
                { label: "Address", content: <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Jost, sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.5)", lineHeight: 1.6 }}>17695 Tomball Pkwy<br />Houston, TX 77064</a> },
              ].map(item => (
                <div key={item.label}>
                  <p style={{ fontFamily: "Jost, sans-serif", fontSize: "9px", letterSpacing: "0.35em", color: "rgba(163,77,38,0.5)", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</p>
                  {item.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "28px", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }} className="md:flex-row md:justify-between">
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "10px", letterSpacing: "0.28em", color: "rgba(232,224,204,0.18)", textTransform: "uppercase" }}>
            © {new Date().getFullYear()} Raahi Indian Kitchen · Houston, TX
          </p>
          <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline" style={{ fontSize: "9px", padding: "0.6rem 1.4rem" }}>
            Reserve a Table
          </a>
        </div>
      </div>
    </footer>
  );
};
