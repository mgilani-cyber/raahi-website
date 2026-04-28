import React from 'react';

interface ImageAutoSliderProps {
  images: string[];
  height?: string;
  speed?: number;
}

export const ImageAutoSlider: React.FC<ImageAutoSliderProps> = ({
  images,
  height = "280px",
  speed = 28,
}) => {
  const doubled = [...images, ...images];
  return (
    <>
      <style>{`
        @keyframes raahi-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .raahi-slider-track {
          animation: raahi-scroll ${speed}s linear infinite;
        }
        .raahi-slider-wrap {
          mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .raahi-slide-item {
          transition: transform 0.35s ease, filter 0.35s ease;
        }
        .raahi-slide-item:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
        }
      `}</style>
      <div className="w-full overflow-hidden raahi-slider-wrap">
        <div className="raahi-slider-track flex gap-4 w-max">
          {doubled.map((src, i) => (
            <div key={i} className="raahi-slide-item flex-shrink-0 overflow-hidden"
              style={{ width: "300px", height, borderRadius: "4px" }}>
              <img src={src} alt={`Raahi Indian Kitchen Houston ${(i % images.length) + 1}`}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.82) saturate(0.9)" }}
                loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
