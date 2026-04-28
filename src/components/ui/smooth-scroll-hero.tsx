import * as React from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

interface SmoothScrollHeroProps {
  scrollHeight?: number;
  desktopImage: string;
  mobileImage?: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
  overlay?: boolean;
}

const SmoothScrollHeroBackground: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1400,
  desktopImage,
  mobileImage,
  initialClipPercentage = 22,
  finalClipPercentage = 78,
  overlay = true,
}) => {
  const { scrollY } = useScroll();
  const clipStart = useTransform(scrollY, [0, scrollHeight], [initialClipPercentage, 0]);
  const clipEnd   = useTransform(scrollY, [0, scrollHeight], [finalClipPercentage, 100]);
  const clipPath  = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const bgSize    = useTransform(scrollY, [0, scrollHeight + 500], ["170%", "100%"]);

  return (
    <motion.div className="sticky top-0 h-screen w-full" style={{ clipPath, willChange: "clip-path" }}>
      {mobileImage && (
        <motion.div className="absolute inset-0 md:hidden"
          style={{ backgroundImage: `url(${mobileImage})`, backgroundSize: bgSize, backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
      )}
      <motion.div className={"absolute inset-0 " + (mobileImage ? "hidden md:block" : "")}
        style={{ backgroundImage: `url(${desktopImage})`, backgroundSize: bgSize, backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
      {overlay && <div className="absolute inset-0" style={{ background: "rgba(10,31,21,0.52)" }} />}
    </motion.div>
  );
};

const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = (props) => {
  const h = props.scrollHeight ?? 1400;
  return (
    <div style={{ height: `calc(${h}px + 100vh)` }} className="relative w-full">
      <SmoothScrollHeroBackground {...props} />
    </div>
  );
};

export default SmoothScrollHero;
