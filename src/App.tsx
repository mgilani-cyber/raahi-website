import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Layout } from "@/components/Layout";
import { CinemaIntro } from "@/components/CinemaIntro";
import { PageTransition } from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useLenis } from "@/hooks/useLenis";
import Index from "./pages/Index";
import Menus from "./pages/Menus";
import Gallery from "./pages/Gallery";
import BookEvent from "./pages/BookEvent";
import Reservations from "./pages/Reservations";
import Story from "./pages/Story";
import SportsWatchParties from "./pages/events/SportsWatchParties";
import PrivateEvents from "./pages/events/PrivateEvents";
import NotFound from "./pages/NotFound";
import GiftCards from "./pages/GiftCards";

const queryClient = new QueryClient();

function AnimatedRoutes({ revealed }: { revealed: boolean }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/menus" element={<PageTransition><Menus /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/events" element={<PageTransition><BookEvent /></PageTransition>} />
        <Route path="/events/sports-watch-parties" element={<PageTransition><SportsWatchParties /></PageTransition>} />
        <Route path="/events/private-events" element={<PageTransition><PrivateEvents /></PageTransition>} />
        <Route path="/reservations" element={<PageTransition><Reservations /></PageTransition>} />
        <Route path="/story" element={<PageTransition><Story /></PageTransition>} />
        <Route path="/gift-cards" element={<PageTransition><GiftCards /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppInner() {
  useLenis();

  const [revealed, setRevealed] = useState(
    sessionStorage.getItem("introDone") === "true" ||
    sessionStorage.getItem("pourDone") === "true"
  );

  const handleIntroDone = useCallback(() => {
    setRevealed(true);
    window.dispatchEvent(new Event("introComplete"));
  }, []);

  return (
    <>
      <CinemaIntro onDone={handleIntroDone} />
      <div
        style={{
          filter: revealed ? "none" : "blur(var(--site-blur, 24px))",
          transition: "filter 0.4s ease",
          pointerEvents: revealed ? "auto" : "none",
        }}
      >
        <ScrollToTop />
        <Layout>
          <AnimatedRoutes revealed={revealed} />
        </Layout>
      </div>
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
