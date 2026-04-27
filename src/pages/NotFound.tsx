import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#113122", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "0 24px" }}>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.5em", color: "#a34d26", textTransform: "uppercase", marginBottom: "1rem" }}>
        404
      </p>
      <h1 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", fontSize: "clamp(3rem, 8vw, 6rem)", color: "#e8e0cc", lineHeight: 0.95, marginBottom: "1.5rem" }}>
        Lost on the journey?
      </h1>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", color: "rgba(232,224,204,0.42)", maxWidth: "380px", lineHeight: 1.85, marginBottom: "2.5rem" }}>
        The page you're looking for doesn't exist. But a table at Raahi Indian Kitchen does.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/" className="btn-primary-outline">Back to Home</Link>
        <Link to="/menus" className="btn-dark-filled">See the Menu</Link>
      </div>
    </div>
  );
}
