"use client";
import * as React from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

interface iISmoothScrollHeroProps {
  scrollHeight?: number;
  desktopImage: string;
  mobileImage: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  const { scrollY } = useScroll();
  const clipStart = useTransform(scrollY, [0, scrollHeight], [initialClipPercentage, 0]);
  const clipEnd = useTransform(scrollY, [0, scrollHeight], [finalClipPercentage, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const backgroundSize = useTransform(scrollY, [0, scrollHeight + 500], ["170%", "100%"]);
  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{ clipPath, willChange: "transform, opacity", background: "#113122" }}
    >
      <motion.div
        className="absolute inset-0 md:hidden"
        style={{ backgroundImage: `url(${mobileImage})`, backgroundSize, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      />
      <motion.div
        className="absolute inset-0 hidden md:block"
        style={{ backgroundImage: `url(${desktopImage})`, backgroundSize, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(17,49,34,0.25) 0%, rgba(17,49,34,0.65) 100%)" }} />
    </motion.div>
  );
};

const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = (props) => {
  return (
    <div style={{ height: `calc(${props.scrollHeight ?? 1500}px + 100vh)` }} className="relative w-full">
      <SmoothScrollHeroBackground {...props} />
    </div>
  );
};

export default SmoothScrollHero;
