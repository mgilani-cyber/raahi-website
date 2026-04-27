import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagneticElement } from '@/components/MagneticElement';

export interface AccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
  label?: string;
  path?: string;
}

interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
}

const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'h-[420px]' : 'h-[56px]'}
      `}
      style={{ borderBottom: '1px solid rgba(184,142,68,0.12)' }}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.55) saturate(0.85)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,2,1,0.85) 0%, rgba(5,2,1,0.3) 60%, transparent 100%)' }} />

      {/* Closed state: title row */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center px-8 justify-between">
          <span className="font-body text-[10px] tracking-[0.45em] text-primary/60 uppercase">{item.label || ''}</span>
          <span className="font-heading text-foreground/70 text-xl">{item.title}</span>
          <span className="font-body text-[10px] tracking-widest text-foreground/25">→</span>
        </div>
      )}

      {/* Open state: full caption */}
      {isActive && (
        <div className="absolute bottom-8 left-8 right-8">
          {item.label && (
            <p className="font-body text-[10px] tracking-[0.5em] text-primary/70 uppercase mb-3">{item.label}</p>
          )}
          <h3 className="font-heading text-foreground text-3xl md:text-4xl leading-tight mb-4">{item.title}</h3>
          {item.path && (
            <Link
              to={item.path}
              className="font-body text-[10px] tracking-[0.38em] text-primary/70 hover:text-primary transition-colors link-draw"
            >
              LEARN MORE →
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

interface LandingAccordionProps {
  items: AccordionItemData[];
  eyebrow?: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function LandingAccordionItem({ items, eyebrow, heading, body, ctaLabel, ctaHref }: LandingAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="container mx-auto px-6 py-24 md:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* Left: Text */}
        <div>
          {eyebrow && (
            <p className="font-body text-[10px] tracking-[0.55em] text-primary/50 uppercase mb-6">{eyebrow}</p>
          )}
          <h2
            className="font-heading text-foreground leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 5vw, 4.5rem)' }}
          >
            {heading}
          </h2>
          <p
            className="font-body text-foreground/40 text-sm leading-[1.85] mb-10 max-w-[340px]"
            style={{ fontFamily: "Calibri, 'Gill Sans', sans-serif" }}
          >
            {body}
          </p>
          {ctaLabel && ctaHref && (
            <MagneticElement>
              <Link to={ctaHref} className="btn-gold-outline text-[10px]">{ctaLabel}</Link>
            </MagneticElement>
          )}
        </div>

        {/* Right: Accordion */}
        <div className="border border-border/20 overflow-hidden">
          {items.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              isActive={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
