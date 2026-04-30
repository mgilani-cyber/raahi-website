import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Menus from "./pages/Menus";
import Gallery from "./pages/Gallery";
import BookEvent from "./pages/BookEvent";
import Reservations from "./pages/Reservations";
import Story from "./pages/Story";
import GiftCards from "./pages/GiftCards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Gallery is fullscreen — no Layout wrapper */}
          <Route path="/gallery" element={<Gallery />} />
          {/* All other pages use Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/"             element={<Index />} />
                <Route path="/menus"        element={<Menus />} />
                <Route path="/events"       element={<BookEvent />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/story"        element={<Story />} />
                <Route path="/gift-cards"   element={<GiftCards />} />
                <Route path="*"             element={<NotFound />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
