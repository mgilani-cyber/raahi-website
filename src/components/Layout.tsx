import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FilmGrain } from "./FilmGrain";
import { AmbientSound } from "./AmbientSound";
import { MaayaAI } from "./MaayaAI";
import { NewsletterPopup } from "./NewsletterPopup";
import { ReservationProvider } from "@/contexts/ReservationContext";
import { ReservationWidget } from "./ReservationWidget";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReservationProvider>
      <div className="min-h-screen bg-background">
        <FilmGrain />
        <Navbar />
        {/* pt-16 matches mobile header height (64px), pt-20 matches desktop (80px) */}
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <AmbientSound />
        <MaayaAI />
        <NewsletterPopup />
        <ReservationWidget />
      </div>
    </ReservationProvider>
  );
};
