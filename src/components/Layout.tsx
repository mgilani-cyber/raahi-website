import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FilmGrain } from "./FilmGrain";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <FilmGrain />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
