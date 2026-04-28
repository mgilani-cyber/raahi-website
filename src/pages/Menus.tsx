import { RaahiMenuFX } from "@/components/ui/raahi-menu-fx";
import { RESERVATION_URL } from "@/constants";

const I = "#e8e0cc", R = "#a34d26", D = "#0a1f15";

export default function Menus() {
  return (
    <div style={{ background: D, minHeight: "100vh" }}>
      <div style={{ background: D, borderBottom: "1px solid rgba(163,77,38,0.15)", paddingTop: "120px", paddingBottom: "56px" }}>
        <div className="container mx-auto px-6">
          <p style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", letterSpacing: "0.55em", color: R, textTransform: "uppercase", marginBottom: "1rem" }}>Raahi Indian Kitchen</p>
          <h1 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", fontSize: "clamp(2.5rem,6vw,5rem)", color: I, lineHeight: 0.95 }}>Our Menu</h1>
          <p style={{ fontFamily: "Jost,sans-serif", fontSize: "15px", color: "rgba(232,224,204,0.45)", maxWidth: "520px", lineHeight: 1.85 }}>From tandoori starters to slow-cooked biryanis. Fresh every day in North Houston.</p>
        </div>
      </div>
      <RaahiMenuFX />
      <div style={{ background: D, borderTop: "1px solid rgba(163,77,38,0.15)", padding: "64px 0" }}>
        <div className="container mx-auto px-6 text-center">
          <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", fontSize: "clamp(2rem,4vw,3rem)", color: I, marginBottom: "1rem" }}>Come in. We will take care of the rest.</h2>
          <p style={{ fontFamily: "Jost,sans-serif", fontSize: "14px", color: "rgba(232,224,204,0.4)", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: 1.85 }}>Walk-ins welcome. Reservations recommended on weekends.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-outline">Reserve a Table</a>
            <a href="tel:+13467680068" className="btn-dark-filled">Call Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
