import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { RESERVATION_URL, PHONE_NUMBER, EMAIL, INSTAGRAM_URL, ADDRESS } from "@/constants";

function FooterClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const houston = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const day  = houston.getDay();
  const hour = houston.getHours();

  const isOpen = day !== 1 && (hour >= 11 && hour < 23);

  const timeStr = houston.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });

  return (
    <div className="mt-4 space-y-1">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
        <span className="font-body text-[11px]" style={{ color: isOpen ? "#4CAF50" : "#E57373" }}>
          {isOpen ? "Open Now" : day === 1 ? "Closed Mondays" : "Closed"}
        </span>
        <span className="font-body text-[11px] text-foreground/30">{timeStr} CT</span>
      </div>
    </div>
  );
}

const NAV = [
  { label: "Home",         path: "/"             },
  { label: "Menu",         path: "/menus"        },
  { label: "Gallery",      path: "/gallery"      },
  { label: "Events",       path: "/events"       },
  { label: "Story",        path: "/story"        },
  { label: "Reservations", path: "/reservations" },
  { label: "Catering",     path: "/catering"     },
];

const HOURS = [
  { day: "Monday",         time: "Closed",          closed: true  },
  { day: "Tue – Thu",      time: "11:00 AM – 10 PM"              },
  { day: "Fri – Sat",      time: "11:00 AM – 11 PM"              },
  { day: "Sunday",         time: "11:00 AM – 10 PM"              },
];

export const Footer = () => {
  return (
    <footer className="relative border-t overflow-hidden" style={{ background: "#0a1f15", borderColor: "rgba(163,77,38,0.2)" }}>

      {/* Top rust line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(163,77,38,0.5) 50%, transparent 100%)" }} />

      <div className="container mx-auto px-6 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-14 border-b" style={{ borderColor: "rgba(232,224,204,0.08)" }}>

          {/* Brand */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <p style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem", fontStyle: "italic", color: "#e8e0cc", letterSpacing: "0.05em", lineHeight: 1 }}>Raahi</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "8px", letterSpacing: "0.45em", color: "#a34d26", textTransform: "uppercase", marginTop: "4px" }}>Indian Bistro · Houston</p>
            </div>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(232,224,204,0.5)", maxWidth: "280px" }}>
              Where tradition meets modernity. Authentic Indian flavors crafted with contemporary elegance in the heart of Houston.
            </p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.3em] uppercase transition-colors"
              style={{ color: "rgba(232,224,204,0.35)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#a34d26")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.35)")}>
              <Instagram size={13} /> @raahi.houston
            </a>
          </div>

          {/* Nav */}
          <div className="md:col-span-2 md:col-start-6">
            <p className="section-label mb-5">Navigate</p>
            <ul className="space-y-3">
              {NAV.map(n => (
                <li key={n.path}>
                  <Link to={n.path} className="font-body text-[12px] tracking-wide transition-colors"
                    style={{ color: "rgba(232,224,204,0.45)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#a34d26")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.45)")}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="md:col-span-3">
            <p className="section-label mb-5">Hours</p>
            <ul className="space-y-3">
              {HOURS.map(h => (
                <li key={h.day} className="flex justify-between items-baseline">
                  <span className="font-body text-[12px]" style={{ color: "rgba(232,224,204,0.45)" }}>{h.day}</span>
                  <span className="font-body text-[12px]" style={{ color: h.closed ? "#E57373" : "rgba(232,224,204,0.65)" }}>{h.time}</span>
                </li>
              ))}
            </ul>
            <FooterClock />
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <p className="section-label mb-5">Contact</p>
            <div className="space-y-4">
              <div>
                <p className="font-body text-[9px] tracking-[0.4em] mb-1 uppercase" style={{ color: "#a34d26" }}>Phone</p>
                <a href={`tel:${PHONE_NUMBER}`} className="font-body text-[12px] transition-colors"
                  style={{ color: "rgba(232,224,204,0.55)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#e8e0cc")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.55)")}>
                  {PHONE_NUMBER}
                </a>
              </div>
              <div>
                <p className="font-body text-[9px] tracking-[0.4em] mb-1 uppercase" style={{ color: "#a34d26" }}>Email</p>
                <a href={`mailto:${EMAIL}`} className="font-body text-[12px] transition-colors"
                  style={{ color: "rgba(232,224,204,0.55)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#e8e0cc")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(232,224,204,0.55)")}>
                  {EMAIL}
                </a>
              </div>
              <div>
                <p className="font-body text-[9px] tracking-[0.4em] mb-1 uppercase" style={{ color: "#a34d26" }}>Location</p>
                <p className="font-body text-[12px]" style={{ color: "rgba(232,224,204,0.55)" }}>{ADDRESS}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[10px] tracking-[0.3em]" style={{ color: "rgba(232,224,204,0.2)" }}>
            © {new Date().getFullYear()} RAAHI INDIAN BISTRO · HOUSTON
          </p>
          <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary-outline text-[10px]">
            Reserve a Table
          </a>
        </div>
      </div>
    </footer>
  );
};
