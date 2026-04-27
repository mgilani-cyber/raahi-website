import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * Drop this on any page to set a unique <title> and <meta name="description">.
 * Requires <HelmetProvider> to wrap the app (see main.tsx).
 */
export const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = "https://barmaaya.com/og-image.jpg",
}: SEOHeadProps) => {
  const siteUrl = "https://barmaaya.com";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* ── Open Graph ── */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Bar Maaya" />
      <meta property="og:locale" content="en_CA" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
