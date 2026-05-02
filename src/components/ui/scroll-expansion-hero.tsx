import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  subtitle?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  subtitle,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleWheel = (e: Event) => {
      const we = e as globalThis.WheelEvent;
      if (mediaFullyExpanded && we.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        we.preventDefault();
      } else if (!mediaFullyExpanded) {
        we.preventDefault();
        const delta = we.deltaY * 0.0009;
        const next = Math.min(Math.max(scrollProgress + delta, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
      }
    };

    const handleTouchStart = (e: Event) => {
      setTouchStartY((e as TouchEvent).touches[0].clientY);
    };

    const handleTouchMove = (e: Event) => {
      const te = e as TouchEvent;
      if (!touchStartY) return;
      const deltaY = touchStartY - te.touches[0].clientY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        te.preventDefault();
      } else if (!mediaFullyExpanded) {
        te.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        const next = Math.min(Math.max(scrollProgress + deltaY * factor, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
        setTouchStartY(te.touches[0].clientY);
      }
    };

    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', () => setTouchStartY(0));

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const mediaW = 320 + scrollProgress * (isMobile ? 600 : 1200);
  const mediaH = 380 + scrollProgress * (isMobile ? 220 : 420);
  const textX  = scrollProgress * (isMobile ? 160 : 140);
  const firstWord = title ? title.split(' ')[0] : '';
  const rest      = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} style={{ overflowX:'hidden' }}>
      <section style={{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100dvh' }}>
        <div style={{ position:'relative', width:'100%', display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100dvh' }}>

          {/* Background */}
          <motion.div style={{ position:'absolute', inset:0, zIndex:0 }}
            initial={{ opacity:0 }} animate={{ opacity: 1 - scrollProgress }} transition={{ duration:0.1 }}>
            <img src={bgImageSrc} alt="Background"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}/>
            <div style={{ position:'absolute', inset:0, background:'rgba(8,25,16,0.55)' }}/>
          </motion.div>

          {/* Center content */}
          <div style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100dvh', position:'relative', zIndex:10 }}>

            {/* Expanding media box */}
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
              width:`${mediaW}px`, height:`${mediaH}px`, maxWidth:'95vw', maxHeight:'85vh',
              boxShadow:'0 0 50px rgba(0,0,0,0.4)', borderRadius:'12px', overflow:'hidden' }}>
              {mediaType === 'video' ? (
                <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
              ) : (
                <img src={mediaSrc} alt={title}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
              )}
              <motion.div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.35)', borderRadius:'12px' }}
                animate={{ opacity: 0.6 - scrollProgress * 0.5 }} transition={{ duration:0.2 }}/>
            </div>

            {/* Title text splits apart as media expands */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', position:'relative', zIndex:10, gap:'8px', pointerEvents:'none' }}>
              <motion.h1 style={{ transform:`translateX(-${textX}vw)`,
                fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic',
                fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'#e8e0cc', margin:0, lineHeight:0.9 }}>
                {firstWord}
              </motion.h1>
              <motion.h1 style={{ transform:`translateX(${textX}vw)`,
                fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic',
                fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'#d4af58', margin:0, lineHeight:0.9 }}>
                {rest}
              </motion.h1>
              {subtitle && (
                <motion.p animate={{ opacity: 1 - scrollProgress * 2 }}
                  style={{ fontFamily:'Jost,sans-serif', fontSize:'11px', letterSpacing:'0.4em',
                    color:'rgba(232,224,204,0.55)', textTransform:'uppercase', marginTop:'16px' }}>
                  {subtitle}
                </motion.p>
              )}
              {scrollToExpand && !mediaFullyExpanded && (
                <motion.p animate={{ opacity: scrollProgress > 0.1 ? 0 : 1 }}
                  style={{ fontFamily:'Jost,sans-serif', fontSize:'10px', letterSpacing:'0.35em',
                    color:'rgba(212,175,88,0.6)', textTransform:'uppercase', marginTop:'48px',
                    transform:`translateX(${textX}vw)` }}>
                  {scrollToExpand}
                </motion.p>
              )}
            </div>
          </div>

          {/* Content shown after full expansion */}
          <motion.div style={{ width:'100%' }}
            initial={{ opacity:0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration:0.7 }}>
            {children}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
