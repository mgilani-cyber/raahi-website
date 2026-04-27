import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export interface ZoomParallaxItem {
  src: string;
  alt?: string;
  label?: string;
  title?: string;
}

interface SlideProps extends ZoomParallaxItem {
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Slide({ src, alt, label, title, index, total, progress }: SlideProps) {
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const segLen = segEnd - segStart;

  // Ensure monotonically increasing offsets
  const o1 = segStart;
  const o2 = segStart + segLen * 0.1;
  const o3 = segStart + segLen * 0.75;
  const o4 = segEnd;

  const opacity = useTransform(progress, [o1, o2, o3, o4],
    index === 0 ? [1, 1, 0.7, 0] : [0, 1, 1, 0]
  );

  const scale = useTransform(progress, [o1, o2, o3, o4],
    index === 0 ? [1.0, 1.0, 0.94, 0.9] : [1.15, 1.0, 0.98, 0.92]
  );

  const y = useTransform(progress, [segStart, segEnd], ["4%", "-4%"]);

  const t1 = segStart;
  const t2 = segStart + segLen * 0.15;
  const t3 = segStart + segLen * 0.65;
  const t4 = segStart + segLen * 0.85;

  const textOpacity = useTransform(progress, [t1, t2, t3, t4], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ position: "absolute", inset: 0, zIndex: index, opacity }}
    >
      <motion.div style={{ position: "absolute", inset: 0, scale }}>
        <motion.img
          src={src}
          alt={alt || ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            y,
          }}
        />
        {/* gradient overlays */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.55) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)",
        }} />
      </motion.div>

      {/* Text overlay */}
      <motion.div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 3rem 3.5rem",
          opacity: textOpacity,
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            {label && (
              <p style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "9px",
                letterSpacing: "0.5em",
                color: "rgba(201,168,76,0.65)",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
              }}>
                {label}
              </p>
            )}
            {title && (
              <h3 style={{
                fontFamily: '"Cormorant Garamond", Cormorant, serif',
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.1,
              }}>
                {title}
              </h3>
            )}
          </div>
          <span style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.18)",
          }}>
            {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ZoomParallaxProps {
  items: ZoomParallaxItem[];
  className?: string;
  eyebrow?: string;
  heading?: string;
}

const ZoomParallax = ({ items, className = "", eyebrow, heading }: ZoomParallaxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: `${items.length * 100}vh`, position: "relative" }}
    >
      {/* Eyebrow / heading above the sticky area */}
      {(eyebrow || heading) && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          zIndex: 20,
          padding: "2.5rem 3rem 0",
          pointerEvents: "none",
        }}>
          {eyebrow && (
            <p style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.55em",
              color: "rgba(201,168,76,0.5)",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}>
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Cormorant, serif',
              fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.1,
            }}>
              {heading}
            </h2>
          )}
        </div>
      )}

      {/* Sticky viewport */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        background: "hsl(8,60%,2%)",
      }}>
        {items.map((item, i) => (
          <Slide
            key={i}
            {...item}
            index={i}
            total={items.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default ZoomParallax;
