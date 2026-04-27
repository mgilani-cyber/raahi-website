import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { getLenis } from '@/hooks/useLenis';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  splitAt?: number; // word index at which to split title (1 = first word left, rest right)
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  splitAt,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress]         = useState(0);
  const [showContent, setShowContent]               = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY]               = useState(0);
  const [isMobile, setIsMobile]                     = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (!mediaFullyExpanded) { lenis.stop(); } else { lenis.start(); }
    return () => { getLenis()?.start(); };
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const delta = e.deltaY * 0.0009;
        const next  = Math.min(Math.max(scrollProgress + delta, 0), 1);
        setScrollProgress(next);
        if (next >= 1)       { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
      }
    };

    const handleTouchStart = (e: TouchEvent) => { setTouchStartY(e.touches[0].clientY); };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        const next   = Math.min(Math.max(scrollProgress + deltaY * factor, 0), 1);
        setScrollProgress(next);
        if (next >= 1)       { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll   = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel',      handleWheel      as EventListener, { passive: false });
    window.addEventListener('scroll',     handleScroll);
    window.addEventListener('touchstart', handleTouchStart as EventListener, { passive: false });
    window.addEventListener('touchmove',  handleTouchMove  as EventListener, { passive: false });
    window.addEventListener('touchend',   handleTouchEnd);

    return () => {
      window.removeEventListener('wheel',      handleWheel      as EventListener);
      window.removeEventListener('scroll',     handleScroll);
      window.removeEventListener('touchstart', handleTouchStart as EventListener);
      window.removeEventListener('touchmove',  handleTouchMove  as EventListener);
      window.removeEventListener('touchend',   handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mediaWidth   = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaHeight  = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textShift    = scrollProgress * (isMobile ? 180 : 150);
  const textOpacity  = Math.max(0, 1 - scrollProgress * 1.3);
  const bgOpacity    = Math.max(0, 1 - scrollProgress * 1.5);
  const labelOpacity = Math.max(0, 1 - scrollProgress * 3);

  // Title split — honour explicit splitAt, otherwise auto-split by char count
  const words      = title ? title.split(' ') : [];
  const totalChars = words.reduce((sum, w) => sum + w.length, 0);
  let splitIndex   = 1;

  if (typeof splitAt === 'number') {
    splitIndex = Math.min(Math.max(splitAt, 1), Math.max(words.length - 1, 1));
  } else {
    let charCount = 0;
    for (let i = 0; i < words.length; i++) {
      charCount += words[i].length;
      if (charCount >= totalChars / 2) { splitIndex = i + 1; break; }
    }
  }

  const firstWord    = words.slice(0, splitIndex).join(' ');
  const restOfTitle  = words.slice(splitIndex).join(' ');

  const titleFontSize = isMobile ? '5.8vw' : 'clamp(2.8rem, 5.5vw, 5.5rem)';

  return (
    <div ref={sectionRef} style={{ height: mediaFullyExpanded ? 'auto' : '100vh', overflow: 'visible', position: 'relative' }}>

      {/* ── HERO STAGE ───────────────────────────────────────────────── */}
      <div
        style={{
          position: mediaFullyExpanded ? 'relative' : 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          background: 'hsl(8,60%,2%)',
          zIndex: 10,
        }}
      >
        {/* Background — fades as media grows */}
        <div style={{ position: 'absolute', inset: 0, opacity: bgOpacity, transition: 'opacity 0.05s' }}>
          <img src={bgImageSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.38) saturate(0.85)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, hsl(8,60%,2%) 90%)' }} />
        </div>

        {/* Title — absolutely positioned, split left/right */}
        {title && (
          <div
            style={{
              position: 'absolute',
              top: '50%', left: 0, width: '100%',
              transform: 'translateY(-50%)',
              display: 'flex', justifyContent: 'center', alignItems: 'baseline',
              whiteSpace: 'nowrap', gap: '0.4em', padding: '0 3vw',
              zIndex: 20,
              mixBlendMode: textBlend ? 'difference' : 'normal',
              pointerEvents: 'none', textAlign: 'center',
            }}
          >
            <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: titleFontSize, fontStyle: 'italic', fontWeight: 400, color: '#F5ECD7', lineHeight: 1.1, transform: `translateX(-${textShift * (isMobile ? 2 : 4)}px)`, opacity: textOpacity }}>
              {firstWord}
            </span>
            <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: titleFontSize, fontStyle: 'italic', fontWeight: 400, color: '#F5ECD7', lineHeight: 1.1, transform: `translateX(${textShift * (isMobile ? 2 : 4)}px)`, opacity: textOpacity }}>
              {restOfTitle}
            </span>
          </div>
        )}

        {/* Column: growing media */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 15 }}>

          {/* Growing media box */}
          <div style={{ position: 'relative', width: `${mediaWidth}px`, height: `${mediaHeight}px`, maxWidth: '100vw', overflow: 'hidden' }}>
            {mediaType === 'video' ? (
              <video autoPlay muted loop playsInline preload="metadata" poster={posterSrc}
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 38%' }}>
                <source src={mediaSrc} type="video/mp4" />
              </video>
            ) : (
              <img src={mediaSrc} alt={title || ''} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
            )}

            {/* Date label — inside media, bottom-centre */}
            {date && (
              <div style={{ position: 'absolute', bottom: '22%', left: '50%', transform: 'translateX(-50%)', opacity: labelOpacity, pointerEvents: 'none', textAlign: 'center', whiteSpace: 'nowrap' }}>
                <span style={{ color: '#C9A84C', fontFamily: 'Calibri, Montserrat, sans-serif', fontSize: '10px', letterSpacing: '0.45em', fontWeight: 500 }}>
                  {date}
                </span>
              </div>
            )}

            {/* Scroll hint — overlaid on video frame, bottom-centre */}
            {scrollToExpand && (
              <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', opacity: labelOpacity, textAlign: 'center', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                <p style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(245,236,215,0.6)', textTransform: 'uppercase', margin: 0 }}>
                  {scrollToExpand}
                </p>
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ display: 'block', color: 'rgba(245,236,215,0.35)', fontSize: '15px', marginTop: '8px', lineHeight: 1 }}
                >
                  ↓
                </motion.span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Children — appear after full expansion */}
      {showContent && (
        <motion.div
          style={{ marginTop: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default ScrollExpandMedia;
