import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { SEOHead } from "@/components/SEOHead";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import type { MediaItemType } from "@/components/ui/interactive-bento-gallery";
import ZoomParallax from "@/components/ui/zoom-parallax";
import type { ZoomParallaxItem } from "@/components/ui/zoom-parallax";

import gallery1 from "@/assets/gallery-1.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.png";
import gallery8 from "@/assets/gallery-8.png";
import barAtmosphere from "@/assets/bar-atmosphere.jpg";
import barPanoramic from "@/assets/bar-panoramic.jpg";
import saxNight from "@/assets/sax-night.jpg";
import cocktailAmber from "@/assets/cocktail-amber.jpg";
import djNight from "@/assets/dj-night.jpg";

const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "Smoked Old Fashioned",
    desc: "Our signature tableside experience",
    url: gallery1,
    span: "col-span-2 md:col-span-2 row-span-5",
  },
  {
    id: 2,
    type: "video",
    title: "Bar Maaya After Dark",
    desc: "The atmosphere we craft every night",
    url: "/nights-video.mp4",
    span: "col-span-2 md:col-span-2 row-span-4",
  },
  {
    id: 3,
    type: "image",
    title: "Saffron Cocktail",
    desc: "Eastern flavours, Western craft",
    url: gallery5,
    span: "col-span-1 md:col-span-1 row-span-4",
  },
  {
    id: 4,
    type: "image",
    title: "Cocktail Cheers",
    desc: "Celebrate every moment",
    url: gallery3,
    span: "col-span-1 md:col-span-2 row-span-3",
  },
  {
    id: 5,
    type: "image",
    title: "The Bar",
    desc: "Inside Bar Maaya, Toronto",
    url: barPanoramic,
    span: "col-span-1 md:col-span-1 row-span-4",
  },
  {
    id: 6,
    type: "video",
    title: "Craft in Motion",
    desc: "Every sip, intentional",
    url: "/cocktail-video.mp4",
    span: "col-span-2 md:col-span-2 row-span-4",
  },
  {
    id: 7,
    type: "image",
    title: "The Atmosphere",
    desc: "Amber light, immersive space",
    url: barAtmosphere,
    span: "col-span-1 md:col-span-1 row-span-3",
  },
  {
    id: 8,
    type: "image",
    title: "Live Music Nights",
    desc: "Saxophone under amber light",
    url: saxNight,
    span: "col-span-1 md:col-span-1 row-span-3",
  },
];

const zoomItems: ZoomParallaxItem[] = [
  { src: gallery1, label: "The Experience", title: "Craft Cocktails" },
  { src: barAtmosphere, label: "The Space", title: "Inside Maaya" },
  { src: djNight, label: "The Night", title: "After Dark" },
  { src: gallery5, label: "The Craft", title: "Every Sip" },
  { src: saxNight, label: "Live Music", title: "Under Golden Light" },
];

const Gallery = () => {
  return (
    <>
      <SEOHead
        title="Photo Gallery | Bar Maaya Toronto — Cocktail Bar"
        description="Browse the Bar Maaya gallery — cocktails, live music, Sip & Paint nights, and the immersive atmosphere of Toronto's favourite Entertainment District bar."
        canonical="/gallery"
      />
      <PageHero label="A Look Inside" heading="Gallery" image={barAtmosphere} />

      <section>
        <ZoomParallax items={zoomItems} />
      </section>

      <section className="bg-background">
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title="Gallery"
          description="Drag to rearrange · Click to explore"
        />
      </section>

      <CTABanner />
    </>
  );
};

export default Gallery;
