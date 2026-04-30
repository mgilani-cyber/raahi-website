import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INSTAGRAM_URL } from "@/constants";

const G="#d4af58",I="#e8e0cc",T="#0b1e14";

const CHAPTERS = [
  {
    id:"dining", label:"Dining Room",
    photos:[
      { src:"/raahi/11.03.25RaahiIndianKitchen_0013.jpg", caption:"The dining room at Raahi" },
      { src:"/raahi/RAAHI (5).png",                        caption:"Warm lighting, comfortable booths" },
      { src:"/raahi/RAAHI (6).png",                        caption:"Teal velvet, gold lion hardware" },
    ]
  },
  {
    id:"bar", label:"Bar & Lounge",
    photos:[
      { src:"/raahi/RAAHI (7).png",                        caption:"The bar at Raahi" },
      { src:"/raahi/RAAHI (8).png",                        caption:"Crafted cocktails" },
      { src:"/raahi/11.03.25RaahiIndianKitchen_0038.jpg",  caption:"Raahi Hurricane and more" },
    ]
  },
  {
    id:"food", label:"The Food",
    photos:[
      { src:"/raahi/11.03.25RaahiIndianKitchen_0098.jpg",                    caption:"Crafted with care" },
      { src:"/raahi/RAAHI (4)-2.jpg",                                         caption:"From the kitchen" },
      { src:"/raahi/ChatGPT Image Aug 26, 2025 at 01_15_58 PM.png",          caption:"Starters" },
      { src:"/raahi/ChatGPT Image Aug 26, 2025 at 01_18_20 PM.png",          caption:"Mains" },
      { src:"/raahi/ChatGPT Image Aug 26, 2025 at 04_05_41 PM.png",          caption:"Desserts" },
    ]
  },
  {
    id:"ambience", label:"Ambience",
    photos:[
      { src:"/raahi/RAAHI (4).png",                                  caption:"Raahi Indian Kitchen" },
      { src:"/raahi/H.jpg",                                           caption:"A room worth coming back to" },
      { src:"/raahi/Gemini_Generated_Image_w1omz8w1omz8w1om.png",    caption:"The Raahi experience" },
    ]
  },
];

export default function Gallery() {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [photoIdx,   setPhotoIdx]   = useState(0);
  const [direction,  setDirection]  = useState(1);

  const chapter = CHAPTERS[chapterIdx];
  const photo   = chapter.photos[photoIdx];
  const total   = chapter.photos.length;

  const goPhoto = useCallback((dir:number) => {
    const next = photoIdx + dir;
    if (next < 0 || next >= total) return;
    setDirection(dir);
    setPhotoIdx(next);
  }, [photoIdx, total]);

  const goChapter = useCallback((idx:number) => {
    setDirection(idx > chapterIdx ? 1 : -1);
    setChapterIdx(idx);
    setPhotoIdx(0);
  }, [chapterIdx]);

  useEffect(() => {
    const fn = (e:KeyboardEvent) => {
      if (e.key==="ArrowRight") goPhoto(1);
      if (e.key==="ArrowLeft")  goPhoto(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goPhoto]);

  const variants = {
    enter:  (d:number) => ({ opacity:0, x:d>0?80:-80, scale:1.03 }),
    center: { opacity:1, x:0, scale:1 },
    exit:   (d:number) => ({ opacity:0, x:d>0?-80:80, scale:0.97 }),
  };

  return (
    <div style={{ background:T, height:"100vh", overflow:"hidden", position:"fixed", inset:0, zIndex:0 }}>

      {/* Full screen image */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.img key={`${chapterIdx}-${photoIdx}`}
          src={photo.src} alt={photo.caption}
          custom={direction} variants={variants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration:0.65, ease:[0.25,0.46,0.45,0.94] }}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.55)" }}/>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(11,30,20,0.6) 0%,transparent 28%,transparent 58%,rgba(11,30,20,0.92) 100%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(11,30,20,0.35) 0%,transparent 25%,transparent 75%,rgba(11,30,20,0.35) 100%)", pointerEvents:"none" }}/>

      {/* Top label */}
      <div style={{ position:"absolute", top:"88px", left:"48px", zIndex:10 }}>
        <p style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.58em", color:"rgba(212,175,88,0.55)", textTransform:"uppercase", marginBottom:"5px" }}>
          Raahi Indian Kitchen
        </p>
        <AnimatePresence mode="wait">
          <motion.p key={chapterIdx} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.3}}
            style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontStyle:"italic", fontSize:"1.6rem", color:I }}>
            {chapter.label}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Instagram link top right */}
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
        style={{ position:"absolute", top:"96px", right:"48px", zIndex:10, fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.4em", color:"rgba(212,175,88,0.4)", textTransform:"uppercase", textDecoration:"none" }}>
        @raahi_hou
      </a>

      {/* Left arrow */}
      <AnimatePresence>
        {photoIdx > 0 && (
          <motion.button key="left" onClick={() => goPhoto(-1)}
            initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}
            whileHover={{scale:1.1, borderColor:"rgba(212,175,88,0.7)"}}
            style={{ position:"absolute", left:"32px", top:"50%", transform:"translateY(-50%)", zIndex:10,
              width:"54px", height:"54px", borderRadius:"50%",
              border:"1px solid rgba(212,175,88,0.3)", background:"rgba(11,30,20,0.7)",
              backdropFilter:"blur(16px)", color:G, fontSize:"20px", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", transition:"border-color 0.3s" }}>
            ←
          </motion.button>
        )}
      </AnimatePresence>

      {/* Right arrow */}
      <AnimatePresence>
        {(photoIdx < total-1 || chapterIdx < CHAPTERS.length-1) && (
          <motion.button key="right"
            onClick={() => { if(photoIdx < total-1) goPhoto(1); else goChapter(chapterIdx+1); }}
            initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:10}}
            whileHover={{background:"rgba(212,175,88,0.15)", borderColor:"rgba(212,175,88,0.7)"}}
            style={{ position:"absolute", right:"32px", top:"50%", transform:"translateY(-50%)", zIndex:10,
              display:"flex", alignItems:"center", gap:"12px", padding:"14px 26px",
              border:"1px solid rgba(212,175,88,0.35)", background:"rgba(11,30,20,0.7)",
              backdropFilter:"blur(16px)", color:G, cursor:"pointer", transition:"all 0.3s" }}>
            <span style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.32em", textTransform:"uppercase" }}>
              {photoIdx < total-1 ? "Next" : `Enter ${CHAPTERS[chapterIdx+1]?.label}`}
            </span>
            <span style={{ fontSize:"18px" }}>→</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom controls */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:10, padding:"0 48px 44px" }}>

        {/* Caption + counter */}
        <AnimatePresence mode="wait">
          <motion.p key={`${chapterIdx}-${photoIdx}-cap`}
            initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            transition={{duration:0.35}}
            style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", letterSpacing:"0.28em", color:"rgba(232,224,204,0.38)", textTransform:"uppercase", marginBottom:"20px" }}>
            {photo.caption} &nbsp;·&nbsp; {photoIdx+1} / {total}
          </motion.p>
        </AnimatePresence>

        <div style={{ display:"flex", alignItems:"center", gap:"2px" }}>
          {/* Chapter tabs */}
          {CHAPTERS.map((ch,i) => (
            <button key={ch.id} onClick={() => goChapter(i)}
              style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase",
                padding:"10px 18px", cursor:"pointer", backdropFilter:"blur(12px)", transition:"all 0.3s",
                background: chapterIdx===i ? "rgba(212,175,88,0.15)" : "rgba(11,30,20,0.55)",
                border: chapterIdx===i ? "1px solid rgba(212,175,88,0.5)" : "1px solid rgba(212,175,88,0.1)",
                color: chapterIdx===i ? G : "rgba(232,224,204,0.3)" }}>
              {ch.label}
            </button>
          ))}

          {/* Photo dots */}
          <div style={{ marginLeft:"auto", display:"flex", gap:"6px", alignItems:"center" }}>
            {chapter.photos.map((_,i) => (
              <button key={i}
                onClick={() => { setDirection(i>photoIdx?1:-1); setPhotoIdx(i); }}
                style={{ width:i===photoIdx?"22px":"6px", height:"6px", borderRadius:"3px",
                  background:i===photoIdx ? G : "rgba(212,175,88,0.22)",
                  border:"none", cursor:"pointer", transition:"all 0.35s", padding:0 }}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
