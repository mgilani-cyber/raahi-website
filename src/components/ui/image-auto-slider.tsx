import { useEffect, useRef } from "react";

export interface SliderImage {
  src: string;
  alt?: string;
}

interface ImageAutoSliderProps {
  images: SliderImage[];
  /** Speed in pixels/second — higher = faster. Default 55 */
  speed?: number;
  /** Height of each row in px. Default 220 */
  rowHeight?: number;
  className?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
}

/** Inject CSS once so keyframes are available */
function injectStyles() {
  if (document.getElementById("image-auto-slider-styles")) return;
  const style = document.createElement("style");
  style.id = "image-auto-slider-styles";
  style.textContent = `
    @keyframes ias-scroll-left  { from { transform: translateX(0) } to { transform: translateX(-50%) } }
    @keyframes ias-scroll-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
    .ias-track-left  { animation: ias-scroll-left  var(--ias-duration) linear infinite; }
    .ias-track-right { animation: ias-scroll-right var(--ias-duration) linear infinite; }
    .ias-track-left:hover,
    .ias-track-right:hover { animation-play-state: paused; }
  `;
  document.head.appendChild(style);
}

const ImageAutoSlider = ({
  images,
  speed = 55,
  rowHeight = 220,
  className = "",
  eyebrow,
  heading,
  body,
}: ImageAutoSliderProps) => {
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  useEffect(() => { injectStyles(); }, []);

  if (images.length === 0) return null;

  // Ensure we have enough images to fill the rows
  const doubled = [...images, ...images];
  const rowA = doubled;
  const rowB = [...doubled].reverse();

  // Estimated total width of one copy ≈ rowHeight * aspect ≈ rowHeight * 1.4 per image
  const approxWidth = images.length * rowHeight * 1.45;
  const duration = approxWidth / speed;

  const imgStyle: React.CSSProperties = {
    height: `${rowHeight}px`,
    width: `${rowHeight * 1.42}px`,
    objectFit: "cover",
    flexShrink: 0,
    filter: "brightness(0.6) saturate(0.85)",
    transition: "filter 0.4s ease",
  };

  const trackStyle = (doubleCount: number): React.CSSProperties => ({
    display: "flex",
    gap: "6px",
    width: `calc(${doubleCount} * (${rowHeight * 1.42}px + 6px))`,
    // duration is set via CSS var on parent
  });

  return (
    <div
      className={className}
      style={{ overflow: "hidden", background: "hsl(8,60%,3%)", padding: "3rem 0" }}
    >
      {/* Optional header */}
      {(eyebrow || heading || body) && (
        <div style={{ textAlign: "center", padding: "0 2rem 3rem" }}>
          {eyebrow && (
            <p style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.55em",
              color: "rgba(201,168,76,0.5)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Cormorant, serif',
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}>
              {heading}
            </h2>
          )}
          {body && (
            <p style={{
              fontFamily: "Calibri, 'Gill Sans', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.32)",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}>
              {body}
            </p>
          )}
        </div>
      )}

      {/* Row A — scrolls left */}
      <div
        style={{
          overflow: "hidden",
          marginBottom: "6px",
          // @ts-expect-error css var
          "--ias-duration": `${duration}s`,
        }}
        onMouseEnter={e => { (e.currentTarget.firstChild as HTMLElement).style.animationPlayState = "paused"; }}
        onMouseLeave={e => { (e.currentTarget.firstChild as HTMLElement).style.animationPlayState = "running"; }}
      >
        <div
          ref={rowARef}
          className="ias-track-left"
          style={{
            ...trackStyle(rowA.length),
            // @ts-expect-error css var
            "--ias-duration": `${duration}s`,
          }}
        >
          {[...rowA, ...rowA].map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt || ""}
              style={imgStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.82) saturate(1.05)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.6) saturate(0.85)"; }}
            />
          ))}
        </div>
      </div>

      {/* Row B — scrolls right */}
      <div
        style={{
          overflow: "hidden",
          // @ts-expect-error css var
          "--ias-duration": `${duration * 1.15}s`,
        }}
      >
        <div
          ref={rowBRef}
          className="ias-track-right"
          style={{
            ...trackStyle(rowB.length),
            // @ts-expect-error css var
            "--ias-duration": `${duration * 1.15}s`,
          }}
        >
          {[...rowB, ...rowB].map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt || ""}
              style={imgStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.82) saturate(1.05)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.6) saturate(0.85)"; }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageAutoSlider;
