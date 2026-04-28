import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div style={{ display:"flex", alignItems:"stretch", gap:"8px", height:"420px", width:"100%" }}>
      {images.map((src, idx) => (
        <div key={idx}
          className="relative overflow-hidden cursor-pointer"
          style={{
            flex:"1 1 0%",
            borderRadius:"4px",
            transition:"flex 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
            border:"1px solid rgba(212,175,88,0.1)",
            minWidth:0,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.flex="4 1 0%"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.flex="1 1 0%"; }}>
          <img src={src} alt={`Raahi gallery ${idx+1}`}
            className="w-full h-full object-cover"
            style={{ filter:"brightness(0.65) saturate(0.85)", transition:"filter 0.5s ease, transform 0.7s ease", transform:"scale(1.04)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter="brightness(0.85) saturate(1)"; (e.currentTarget as HTMLElement).style.transform="scale(1.08)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter="brightness(0.65) saturate(0.85)"; (e.currentTarget as HTMLElement).style.transform="scale(1.04)"; }}
          />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(8,25,16,0.85) 0%, transparent 50%)", pointerEvents:"none" }}/>
        </div>
      ))}
    </div>
  );
}
