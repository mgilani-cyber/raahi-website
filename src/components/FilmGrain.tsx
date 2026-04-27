import { useEffect, useRef } from "react";

// Lightweight film grain: draws on a small offscreen canvas then scales up via CSS
export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    // Fixed small size — CSS stretches it, saving ~96% of pixel work
    canvas.width = 256;
    canvas.height = 256;

    let frame = 0;
    function draw() {
      frame++;
      if (frame % 6 === 0) { // ~10fps grain
        const imageData = ctx.createImageData(256, 256);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 22;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      rafRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99990]"
      style={{
        opacity: 0.04,
        mixBlendMode: "screen",
        width: "100vw",
        height: "100vh",
        imageRendering: "pixelated",
      }}
    />
  );
}
