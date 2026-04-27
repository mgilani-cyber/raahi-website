import { cn } from "@/lib/utils";
import { useState } from "react";

export type EventGalleryId = "sip-paint" | "sports" | "birthday" | "corporate";

interface GalleryEvent {
  id: EventGalleryId;
  label: string;
  title: string;
  description: string;
  image: string;
}

const EVENTS: GalleryEvent[] = [
  {
    id: "sip-paint",
    label: "EVERY SATURDAY",
    title: "Sip & Paint",
    description: "Every Saturday · Pick up a brush, create something beautiful, and enjoy the atmosphere of Bar Maaya.",
    image: "/events/sip-paint.png",
  },
  {
    id: "sports",
    label: "WATCH PARTY",
    title: "Sports Watch Party",
    description: "Watch Party · Reserve your table, pick your game, and enjoy the party with $8 drinks all match long.",
    image: "/events/watch-party.png",
  },
  {
    id: "birthday",
    label: "CELEBRATE IN STYLE",
    title: "Birthday Packages",
    description: "Celebrate in Style · Every package includes an on-the-house tiramisu cake. Groups of 2 to 40.",
    image: "/events/birthday.png",
  },
  {
    id: "corporate",
    label: "FOR YOUR TEAM",
    title: "Corporate Events",
    description: "For Your Team · Private venue, custom menus, and full event coordination for your next corporate gathering.",
    image: "/events/corporate.png",
  },
];

interface ImageGalleryProps {
  onBook: (id: EventGalleryId) => void;
  className?: string;
}

export default function ImageGallery({ onBook, className }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <>
      {/* Desktop: horizontal accordion */}
      <div
        className={cn(
          "hidden md:flex items-stretch gap-[3px] w-full",
          className
        )}
        style={{ height: "580px" }}
      >
        {EVENTS.map((event, idx) => {
          const isActive = activeIdx === idx;
          const isInactive = activeIdx !== null && !isActive;
          return (
            <div
              key={event.id}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isActive ? "3 1 0%" : isInactive ? "0.4 1 0%" : "1 1 0%",
                transition: "flex 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                minWidth: 0,
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              onClick={() => onBook(event.id)}
            >
              {/* Image */}
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                className="h-full w-full object-cover object-center"
                style={{
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />

              {/* Base dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(10,8,4,0.88) 0%, rgba(10,8,4,0.35) 50%, rgba(10,8,4,0.1) 100%)"
                    : "linear-gradient(to top, rgba(10,8,4,0.75) 0%, rgba(10,8,4,0.45) 100%)",
                  transition: "background 0.4s ease",
                }}
              />

              {/* Collapsed: vertical label */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  opacity: isActive ? 0 : 1,
                  transition: "opacity 0.2s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: "Calibri, 'Gill Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.45em",
                    color: "rgba(245,236,215,0.45)",
                    textTransform: "uppercase",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {event.title}
                </p>
              </div>

              {/* Expanded: full content */}
              <div
                className="absolute inset-0 flex flex-col justify-end px-7 pb-10 pointer-events-none"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s",
                }}
              >
                <p
                  style={{
                    fontFamily: "Calibri, 'Gill Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.45em",
                    color: "rgba(201,168,76,0.8)",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  {event.label}
                </p>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.6rem, 2.4vw, 2.6rem)",
                    color: "#F5ECD7",
                    lineHeight: 1.1,
                    marginBottom: "12px",
                  }}
                >
                  {event.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Calibri, 'Gill Sans', sans-serif",
                    fontSize: "13px",
                    color: "rgba(245,236,215,0.72)",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                    maxWidth: "340px",
                  }}
                >
                  {event.description}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); onBook(event.id); }}
                  className="pointer-events-auto"
                  style={{
                    fontFamily: "Calibri, 'Gill Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    color: "#C9A84C",
                    background: "transparent",
                    border: "1px solid rgba(201,168,76,0.65)",
                    padding: "11px 22px",
                    minHeight: "44px",
                    cursor: "pointer",
                    display: "inline-block",
                    transition: "background 0.25s ease, border-color 0.25s ease",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.1)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.9)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.65)";
                  }}
                >
                  RESERVE A TABLE
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: 2×2 tappable grid */}
      <div className="grid grid-cols-2 gap-[3px] md:hidden w-full">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            className="relative overflow-hidden cursor-pointer active:opacity-90"
            style={{ height: "220px" }}
            onClick={() => onBook(event.id)}
          >
            <img
              src={event.image}
              alt={event.title}
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,8,4,0.85) 0%, rgba(10,8,4,0.25) 60%, transparent 100%)" }}
            />
            <div className="absolute inset-0 flex flex-col justify-end px-4 pb-5">
              <p
                style={{
                  fontFamily: "Calibri, 'Gill Sans', sans-serif",
                  fontSize: "8px",
                  letterSpacing: "0.35em",
                  color: "rgba(201,168,76,0.8)",
                  textTransform: "uppercase",
                  marginBottom: "5px",
                }}
              >
                {event.label}
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', 'Crimson Pro', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "18px",
                  color: "#F5ECD7",
                  lineHeight: 1.15,
                  marginBottom: "10px",
                }}
              >
                {event.title}
              </h3>
              <button
                onClick={(e) => { e.stopPropagation(); onBook(event.id); }}
                style={{
                  fontFamily: "Calibri, 'Gill Sans', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  color: "#C9A84C",
                  background: "transparent",
                  border: "1px solid rgba(201,168,76,0.6)",
                  padding: "8px 14px",
                  minHeight: "36px",
                  cursor: "pointer",
                  display: "inline-block",
                  textTransform: "uppercase",
                  alignSelf: "flex-start",
                }}
              >
                BOOK
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
