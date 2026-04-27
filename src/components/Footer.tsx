import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { RESERVATION_URL, PHONE_NUMBER, PHONE_SECONDARY, EMAIL, INSTAGRAM_URL, FACEBOOK_URL, ADDRESS, GOOGLE_MAPS_URL } from "@/constants";

function FooterClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const houston = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const day  = houston.getDay(); // 0=Sun,1=Mon,2=Tue...6=Sat
  const hour = houston.getHours();
  const min  = houston.getMinutes();
  const timeDecimal = hour + min / 60;

  // Real hours:
  // Mon: 11am–10pm
  // Tue: 5pm–10pm
  // Wed–Sun: 11am–10pm
  let isOpen = false;
  if (day === 1) {
    isOpen = timeDecimal >= 11 && timeDecimal < 22; // Mon 11am–10pm
  } else if (day === 2) {
    isOpen = timeDecimal >= 17 && timeDecimal < 22; // Tue 5pm–10pm
  } else {
    isOpen = timeDecimal >= 11 && timeDecimal < 22; // Wed–Sun 11am–10pm
  }

  const timeStr = houston.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit", hour12: true,
  });

  const closingNote = day === 2 ? "Opens at 5 PM today" : "Opens at 11 AM";

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", color: isOpen ? "#4CAF50" : "#E57373" }}>
          {isOpen ? "Open Now" : closingNote}
        </span>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "rgba(232,224,204,0.25)" }}>
          {timeStr} CT
        </span>
      </div>
    </div>
  );
}

const NAV = [
  { label: "Home",         path: "/" },
  { label: "Menu",         path: "/menus" },
  { label: "Gallery",      path: "/gallery" },
  { label: "Events",       path: "/events" },
  { label: "Our Story",    path: "/story" },
  { label: "Reservations", path: "/reservations" },
  { label: "Gift Cards",   path: "/gift-cards" },
];

// Real hours from Google
const HOURS = [
  { day: "Monday",    time: "11 a.m. – 10 p.m." },
  { day: "Tuesday",   time: "5 p.m. – 10 p.m." },
  { day: "Wednesday", time: "11 a.m. – 10 p.m." },
  { day: "Thursday",  time: "11 a.m. – 10 p.m." },
  { day: "Friday",    time: "11 a.m. – 10 p.m." },
  { day: "Saturday",  time: "11 a.m. – 10 p.m." },
  { day: "Sunday",    time: "11 a.m. – 10 p.m." },
];

const TEAL  = "#113122";
const RUST  = "#a34d26";
const IVORY = "#e8e0cc";

export const Footer = () => {
  const now    = new Date();
  const today  = now.toLocaleString("en-US", { timeZone: "America/Chicago", weekday: "long" });

  return (
    <footer className="relative border-t overflow-hidden" style={{ background: "#0a1f15", borderColor: "rgba(163,77,38,0.18)" }}>

      {/* Top rust gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(163,77,38,0.55) 50%, transparent 100%)" }} />

      <div className="container mx-auto px-6 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-14 border-b"
          style={{ borderColor: "rgba(232,224,204,0.07)" }}>

          {/* Brand col */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "2rem", color: IVORY, lineHeight: 1 }}>Raahi</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "8px", letterSpacing: "0.45em", color: RUST, textTransform: "uppercase", marginTop: "4px" }}>
                Indian Kitchen · Houston
              </p>
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "rgba(232,224,204,0.42)", lineHeight: 1.85, maxWidth: "280px", marginBottom: "1.5rem" }}>
              Authentic Indian food in North Houston. Traditional recipes, fresh ingredients, a bar worth staying for. On Tomball Pkwy since 2024.
            </p>
            <div className="flex gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                style={{ color: "rgba(232,224,204,0.3)", transition: "color 0.3s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = RUST)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.3)")}>
                <Instagram size={16} />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                style={{ color: "rgba(232,224,204,0.3)", transition: "color 0.3s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = RUST)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.3)")}>
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Nav col */}
          <div className="md:col-span-2 md:col-start-6">
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: "rgba(163,77,38,0.7)", textTransform: "uppercase", marginBottom: "1.2rem" }}>
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV.map(n => (
                <li key={n.path}>
                  <Link to={n.path}
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.4)", transition: "color 0.3s", letterSpacing: "0.05em" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = RUST)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.4)")}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours col */}
          <div className="md:col-span-3">
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: "rgba(163,77,38,0.7)", textTransform: "uppercase", marginBottom: "1.2rem" }}>
              Hours
            </p>
            <ul className="space-y-2">
              {HOURS.map(h => {
                const isToday = h.day === today;
                return (
                  <li key={h.day} className="flex justify-between items-baseline gap-4">
                    <span style={{
                      fontFamily: "'Jost', sans-serif", fontSize: "12px",
                      color: isToday ? RUST : "rgba(232,224,204,0.38)",
                      fontWeight: isToday ? 600 : 400,
                    }}>
                      {h.day}
                    </span>
                    <span style={{
                      fontFamily: "'Jost', sans-serif", fontSize: "12px",
                      color: isToday ? "rgba(232,224,204,0.75)" : "rgba(232,224,204,0.38)",
                    }}>
                      {h.time}
                    </span>
                  </li>
                );
              })}
            </ul>
            <FooterClock />
          </div>

          {/* Contact col */}
          <div className="md:col-span-2">
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: "rgba(163,77,38,0.7)", textTransform: "uppercase", marginBottom: "1.2rem" }}>
              Contact
            </p>
            <div className="space-y-4">
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.35em", color: "rgba(163,77,38,0.5)", textTransform: "uppercase", marginBottom: "4px" }}>Phone</p>
                <a href={`tel:+13467680068`}
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.5)", display: "block", transition: "color 0.3s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = IVORY)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.5)")}>
                  {PHONE_NUMBER}
                </a>
                <a href={`tel:+17132775082`}
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.5)", display: "block", marginTop: "2px", transition: "color 0.3s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = IVORY)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.5)")}>
                  {PHONE_SECONDARY}
                </a>
              </div>
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.35em", color: "rgba(163,77,38,0.5)", textTransform: "uppercase", marginBottom: "4px" }}>Email</p>
                <a href={`mailto:${EMAIL}`}
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.5)", transition: "color 0.3s", wordBreak: "break-all" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = IVORY)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.5)")}>
                  {EMAIL}
                </a>
              </div>
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.35em", color: "rgba(163,77,38,0.5)", textTransform: "uppercase", marginBottom: "4px" }}>Address</p>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "rgba(232,224,204,0.5)", lineHeight: 1.6, transition: "color 0.3s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = IVORY)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.5)")}>
                  17695 Tomball Pkwy<br />Houston, TX 77064
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.28em", color: "rgba(232,224,204,0.18)", textTransform: "uppercase" }}>
            © {new Date().getFullYear()} Raahi Indian Kitchen · Houston, TX
          </p>
          <div className="flex items-center gap-6">
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(232,224,204,0.22)", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = RUST)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.22)")}>
              Get Directions
            </a>
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline" style={{ fontSize: "9px", padding: "0.6rem 1.4rem" }}>
              Reserve a Table
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
