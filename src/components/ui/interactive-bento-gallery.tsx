import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface MediaItemType {
  id: number;
  type: 'video' | 'image';
  title: string;
  desc: string;
  url: string;
  span: string;
}

const MediaItem = ({ item, className, onClick }: { item: MediaItemType; className?: string; onClick?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setIsInView(e.isIntersecting)),
      { root: null, rootMargin: '50px', threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const play = async () => {
      if (!videoRef.current || !isInView || !mounted) return;
      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          await new Promise<void>((resolve) => {
            if (videoRef.current) videoRef.current.oncanplay = () => resolve();
          });
          if (mounted) { setIsBuffering(false); await videoRef.current?.play(); }
        }
      } catch (err) { console.warn('Video playback failed:', err); }
    };
    if (isInView) play();
    else if (videoRef.current) videoRef.current.pause();
    return () => {
      mounted = false;
      if (videoRef.current) { videoRef.current.pause(); }
    };
  }, [isInView]);

  if (item.type === 'video') {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          playsInline muted loop preload="auto"
          style={{ opacity: isBuffering ? 0.7 : 1, transition: 'opacity 0.2s' }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border border-primary/30 border-t-primary animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={item.url} alt={item.title}
      className={`${className} object-cover cursor-pointer`}
      onClick={onClick} loading="lazy" decoding="async"
    />
  );
};

interface GalleryModalProps {
  selectedItem: MediaItemType;
  isOpen: boolean;
  onClose: () => void;
  setSelectedItem: (item: MediaItemType | null) => void;
  mediaItems: MediaItemType[];
}

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed inset-0 z-[100] flex flex-col"
        style={{ background: 'hsl(8,60%,3%)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex-1 flex items-center justify-center p-4 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              className="relative w-full max-w-4xl overflow-hidden"
              style={{ aspectRatio: '16/9' }}
              initial={{ y: 20, scale: 0.97 }}
              animate={{ y: 0, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 30 } }}
              exit={{ y: 20, scale: 0.97, transition: { duration: 0.15 } }}
              onClick={onClose}
            >
              <MediaItem item={selectedItem} className="w-full h-full" onClick={onClose} />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                <h3 className="font-heading text-foreground text-xl md:text-2xl">{selectedItem.title}</h3>
                <p className="font-body text-foreground/50 text-sm mt-1">{selectedItem.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          className="absolute top-4 right-4 w-10 h-10 border border-border/40 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 transition-colors"
          onClick={onClose} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        >
          <X size={16} />
        </motion.button>
      </motion.div>

      {/* Draggable thumbnail dock */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_event, info) => setDockPosition(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
        className="fixed z-[101] left-1/2 bottom-6 -translate-x-1/2 touch-none"
      >
        <div className="border border-primary/25 px-3 py-2 cursor-grab active:cursor-grabbing"
          style={{ background: 'hsl(8,55%,8%)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center -space-x-2">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                style={{ zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index }}
                className={`relative w-9 h-9 shrink-0 overflow-hidden cursor-pointer ${
                  selectedItem.id === item.id ? 'ring-1 ring-primary' : 'hover:ring-1 hover:ring-primary/40'
                }`}
                initial={{ rotate: index % 2 === 0 ? -12 : 12 }}
                animate={{
                  scale: selectedItem.id === item.id ? 1.25 : 1,
                  rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -12 : 12,
                  y: selectedItem.id === item.id ? -8 : 0,
                }}
                whileHover={{ scale: 1.35, rotate: 0, y: -10, transition: { type: 'spring', stiffness: 400 } }}
              >
                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

interface InteractiveBentoGalleryProps {
  mediaItems: MediaItemType[];
  title: string;
  description: string;
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 max-w-6xl">
      {(title || description) && (
        <div className="mb-12 text-center">
          {title && (
            <motion.p className="section-label justify-center flex"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {title}
            </motion.p>
          )}
          {description && (
            <motion.p className="font-body text-foreground/35 text-sm mt-2"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              {description}
            </motion.p>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryModal
            key="modal"
            selectedItem={selectedItem}
            isOpen={true}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={(item) => setSelectedItem(item)}
            mediaItems={items}
          />
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[80px]"
            initial="hidden" animate="visible" exit="hidden"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layoutId={`media-${item.id}`}
                className={`relative overflow-hidden cursor-pointer ${item.span}`}
                onClick={() => !isDragging && setSelectedItem(item)}
                variants={{
                  hidden: { y: 40, scale: 0.95, opacity: 0 },
                  visible: { y: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 350, damping: 25, delay: index * 0.04 } }
                }}
                whileHover={{ scale: 1.015 }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.8}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_event, info) => {
                  setIsDragging(false);
                  const moved = info.offset.x + info.offset.y;
                  if (Math.abs(moved) > 50) {
                    const next = [...items];
                    const dragged = next[index];
                    const target = moved > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
                    next.splice(index, 1);
                    next.splice(target, 0, dragged);
                    setItems(next);
                  }
                }}
              >
                <MediaItem item={item} className="absolute inset-0 w-full h-full" onClick={() => !isDragging && setSelectedItem(item)} />
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end"
                  initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
                  <div className="relative p-3 md:p-4">
                    <h3 className="font-heading text-foreground text-sm md:text-base leading-tight">{item.title}</h3>
                    <p className="font-body text-foreground/55 text-[11px] mt-0.5 line-clamp-1">{item.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveBentoGallery;
