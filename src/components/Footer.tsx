import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { OPENTABLE_URL, PHONE_NUMBER, EMAIL, INSTAGRAM_URL } from "@/constants";
import maayaLogo from "@/assets/maaya-logo.png";

function FooterClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const toronto = new Date(now.toLocaleString("en-US", { timeZone: "America/Toronto" }));
  const day  = toronto.getDay();
  const hour = toronto.getHours();

  let isOpen = false;
  if (day === 1) {
    isOpen = false;
  } else if (day === 0) {
    isOpen = hour < 2 || hour >= 16;
  } else if (day === 5 || day === 6) {
    isOpen = hour >= 16 || hour < 2;
  } else {
    isOpen = hour >= 16 && hour < 24;
  }

  const timeStr = toronto.toLocaleTimeString("en-CA", {
    timeZone: "America/Toronto", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });

  return (
    <div className="mt-4 space-y-1">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"}`} />
        <span className="font-body text-[11px]" style={{ color: isOpen ? "#4CAF50" : "#E57373" }}>
          {isOpen ? "Open Now" : (day === 1 ? "Closed today · Back Tuesday" : "Closed")}
        </span>
        <span className="font-body text-[11px] text-foreground/30">{timeStr}</span>
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
];

const HOURS = [
  { day: "Monday",    time: "Closed",        closed: true  },
  { day: "Tue – Thu", time: "4:00 PM – 12 AM"              },
  { day: "Fri – Sat", time: "4:00 PM – 2 AM"               },
  { day: "Sunday",    time: "4:00 PM – 12 AM"              },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/20 overflow-hidden" style={{ background: "hsl(8,60%,3%)" }}>

      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(42,52%,54%,0.35) 50%, transparent 100%)" }}
      />

      {/* Main grid */}
      <div className="container mx-auto px-6 pt-16 md:pt-20 pb-10" style={{ paddingBottom: "max(2.5rem, calc(2.5rem + env(safe-area-inset-bottom)))" }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-14 border-b border-border/15">

          {/* Brand — 4 cols */}
          <div className="md:col-span-4">
            <img src={maayaLogo} alt="Bar Maaya" className="h-10 w-auto mb-6" />
            <p className="font-script italic text-primary/75 text-base mb-4 leading-snug">
              "Look beyond the veil."
            </p>
            <p className="font-body text-[11px] text-foreground/30 leading-relaxed mb-7 max-w-[220px]">
              Eastern ritual meets Western craft.<br />
              Toronto's most immersive cocktail bar.
            </p>
            <div className="flex gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border/30 flex items-center justify-center text-foreground/35 hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Explore — 2 cols */}
          <div className="md:col-span-2 md:col-start-6">
            <p className="font-body text-[9px] tracking-[0.55em] text-foreground/25 uppercase mb-6">Explore</p>
            <nav className="flex flex-col gap-3">
              {NAV.map(l => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="font-body text-[12px] text-foreground/40 hover:text-primary transition-colors duration-300 link-draw w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Hours — 2 cols */}
          <div className="md:col-span-2">
            <p className="font-body text-[9px] tracking-[0.55em] text-foreground/25 uppercase mb-6">Hours</p>
            <div className="flex flex-col gap-3">
              {HOURS.map(h => (
                <div key={h.day} className="flex justify-between gap-4">
                  <span className="font-body text-[11px] text-foreground/35">{h.day}</span>
                  <span className={`font-body text-[11px] ${h.closed ? "text-foreground/18" : "text-foreground/55"}`}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
            <FooterClock />
            <p className="font-script italic text-primary/55 text-sm mt-4">
              Happy Hour: Daily 4–6 PM
            </p>
          </div>

          {/* Contact + Reserve — 2 cols */}
          <div className="md:col-span-2">
            <p className="font-body text-[9px] tracking-[0.55em] text-foreground/25 uppercase mb-6">Contact</p>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href={`https://maps.google.com/?q=244+Adelaide+St+West+Toronto`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[11px] text-foreground/40 hover:text-primary transition-colors link-draw w-fit"
              >
                244 Adelaide St West<br />Toronto, ON
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="font-body text-[11px] text-foreground/40 hover:text-primary transition-colors"
              >
                {PHONE_NUMBER}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="font-body text-[11px] text-foreground/40 hover:text-primary transition-colors break-all"
              >
                {EMAIL}
              </a>
            </div>
            <motion.a
              href={OPENTABLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline text-[10px] block text-center !px-4 !py-2.5"
              whileHover={{ scale: 1.01 }}
            >
              RESERVE
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="font-body text-[10px] text-foreground/18">
            © {new Date().getFullYear()} Bar Maaya. All rights reserved.
          </span>
          <span className="font-body text-[10px] text-foreground/18">
            Designed by{" "}
            <a href="https://theetherealAgency.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors">The Ethereal Agency</a>
          </span>
        </div>
      </div>
    </footer>
  );
};
