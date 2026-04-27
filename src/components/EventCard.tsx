import { Link } from "react-router-dom";


interface EventCardProps {
  time: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  externalLink?: boolean;
}

export const EventCard = ({ time, title, description, buttonText = "RESERVE YOUR TABLE", buttonLink, externalLink }: EventCardProps) => {
  const href = buttonLink || ;
  const isExternal = externalLink ?? !buttonLink;

  return (
    <div className="relative group overflow-hidden min-h-[350px] flex flex-col justify-end">
      <div className="image-placeholder absolute inset-0 z-0">{title} Image</div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-[1]" />
      <div className="relative z-10 p-6 md:p-8">
        <p className="font-script italic text-primary text-sm mb-2">{time}</p>
        <h3 className="font-heading text-foreground text-xl md:text-2xl mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
        {isExternal ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn-gold-outline text-xs inline-block">
            {buttonText}
          </a>
        ) : (
          <Link to={href} className="btn-gold-outline text-xs inline-block">
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};
