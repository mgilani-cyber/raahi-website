import { useState, useEffect } from "react";
import { Tent, Flame, Droplets, Waves, Mountain } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectorOption {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

interface InteractiveSelectorProps {
  options?: SelectorOption[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

// ─── Default camping options ──────────────────────────────────────────────────

const DEFAULT_OPTIONS: SelectorOption[] = [
  {
    title: "Luxury Tent",
    description: "Cozy glamping under the stars",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    icon: <Tent size={24} className="text-white" />,
  },
  {
    title: "Campfire Feast",
    description: "Gourmet s'mores & stories",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    icon: <Flame size={24} className="text-white" />,
  },
  {
    title: "Lakeside Retreat",
    description: "Private dock & canoe rides",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    icon: <Droplets size={24} className="text-white" />,
  },
  {
    title: "Mountain Spa",
    description: "Outdoor sauna & hot tub",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    icon: <Waves size={24} className="text-white" />,
  },
  {
    title: "Guided Adventure",
    description: "Expert-led nature tours",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    icon: <Mountain size={24} className="text-white" />,
  },
];

// ─── Inject keyframe styles once ─────────────────────────────────────────────

function injectStyles() {
  if (document.getElementById("iselector-styles")) return;
  const style = document.createElement("style");
  style.id = "iselector-styles";
  style.textContent = `
    @keyframes iselector-fadeInTop {
      0%   { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0);     }
    }
    .iselector-fadeInTop {
      opacity: 0;
      transform: translateY(-20px);
      animation: iselector-fadeInTop 0.8s ease-in-out forwards;
    }
    .iselector-delay-300 { animation-delay: 0.3s; }
    .iselector-delay-600 { animation-delay: 0.6s; }
  `;
  document.head.appendChild(style);
}

// ─── Component ────────────────────────────────────────────────────────────────

const InteractiveSelector = ({
  options = DEFAULT_OPTIONS,
  eyebrow,
  heading = "Escape in Style",
  subheading = "Discover luxurious camping experiences in nature's most breathtaking spots.",
}: InteractiveSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  // Staggered mount animation — 180ms per panel, exactly as specified
  useEffect(() => {
    injectStyles();
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setAnimatedOptions(prev => [...prev, i]);
        }, 180 * i)
      );
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#222] font-sans text-white">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="w-full max-w-2xl px-6 mt-8 mb-2 text-center">
        {eyebrow && (
          <p
            className="iselector-fadeInTop iselector-delay-300 text-[11px] tracking-[0.4em] uppercase text-gray-400 mb-3"
          >
            {eyebrow}
          </p>
        )}
        <h1 className="iselector-fadeInTop iselector-delay-300 text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg">
          {heading}
        </h1>
        <p className="iselector-fadeInTop iselector-delay-600 text-lg md:text-xl text-gray-300 font-medium max-w-xl mx-auto">
          {subheading}
        </p>
      </div>

      <div className="h-12" />

      {/* ── Options Container — expanding panels ────────────────────────── */}
      <div className="options flex w-full max-w-[900px] min-w-[600px] h-[400px] mx-0 items-stretch overflow-hidden relative">
        {options.map((option, index) => {
          const isActive = activeIndex === index;
          const isAnimated = animatedOptions.includes(index);

          return (
            <div
              key={index}
              onClick={() => handleOptionClick(index)}
              style={{
                // ── Core expand animation (DO NOT CHANGE) ──
                flex: isActive ? "7 1 0%" : "1 1 0%",
                transition: "flex 0.7s ease-in-out, box-shadow 0.4s, background-size 0.7s, border-color 0.4s",

                // ── Stagger mount animation (DO NOT CHANGE) ──
                opacity: isAnimated ? 1 : 0,
                transform: isAnimated ? "translateX(0)" : "translateX(-60px)",

                // ── Background ──
                backgroundImage: `url('${option.image}')`,
                backgroundSize: isActive ? "auto 100%" : "auto 120%",
                backgroundPosition: "center",

                // ── Layout ──
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflow: "hidden",
                cursor: "pointer",
                minWidth: "60px",
                minHeight: "100px",
                margin: 0,
                borderRadius: 0,

                // ── Border & shadow ──
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: isActive ? "#fff" : "#292929",
                boxShadow: isActive
                  ? "0 20px 60px rgba(0,0,0,0.50)"
                  : "0 10px 30px rgba(0,0,0,0.30)",

                backgroundColor: "#18181b",
                backfaceVisibility: "hidden",
                willChange: "flex, opacity, transform",
                zIndex: isActive ? 10 : 1,
              }}
            >
              {/* Shadow gradient (inset bottom — DO NOT CHANGE) */}
              <div
                className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                style={{
                  bottom: isActive ? "0" : "-40px",
                  height: "120px",
                  boxShadow: isActive
                    ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                    : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
                }}
              />

              {/* Icon + text label at bottom */}
              <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-10 pointer-events-none px-4 gap-3 w-full">
                {/* Icon circle */}
                <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 transition-all duration-200">
                  {option.icon}
                </div>

                {/* Text — slides in when active (DO NOT CHANGE) */}
                <div className="info text-white whitespace-pre relative overflow-hidden">
                  <div
                    className="main font-bold text-lg transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(25px)",
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="sub text-base text-gray-300 transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(25px)",
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveSelector;
