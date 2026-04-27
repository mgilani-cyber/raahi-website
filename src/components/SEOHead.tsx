import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export function SEOHead({ title, description, canonical }: SEOHeadProps) {
  useEffect(() => {
    if (title) document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && description) desc.setAttribute("content", description);
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon && canonical) canon.setAttribute("href", `https://raahi-website-drab.vercel.app${canonical}`);
  }, [title, description, canonical]);
  return null;
}
