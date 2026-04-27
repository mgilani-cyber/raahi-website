import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const NewsletterPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("newsletter_shown")) return;
    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("newsletter_shown", "1");
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
          />
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-[480px] pointer-events-auto"
              style={{
                background: "hsl(8,60%,6%)",
                border: "1px solid rgba(201,168,76,0.22)",
                boxShadow: "0 32px 96px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)",
              }}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Top gold accent line */}
              <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" }} />

              {/* Close button */}
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 text-foreground/30 hover:text-foreground/70 transition-colors p-1.5"
              >
                <X size={16} />
              </button>

              <div className="px-10 py-12">
                {!submitted ? (
                  <>
                    <p style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "9px",
                      letterSpacing: "0.55em",
                      color: "rgba(201,168,76,0.5)",
                      textTransform: "uppercase",
                      marginBottom: "1.25rem",
                    }}>
                      Exclusive Access
                    </p>

                    <h3 style={{
                      fontFamily: '"Cormorant Garamond", Cormorant, serif',
                      fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                      fontStyle: "italic",
                      fontWeight: 300,
                      color: "#fff",
                      lineHeight: 1.1,
                      marginBottom: "1.25rem",
                    }}>
                      Stay In The Know
                    </h3>

                    <p style={{
                      fontFamily: "Calibri, 'Gill Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.32)",
                      lineHeight: 1.75,
                      marginBottom: "2rem",
                    }}>
                      Be first to know about events, exclusive evenings, and special offers — plus <span style={{ color: "rgba(201,168,76,0.8)" }}>10% off</span> your next visit.
                    </p>

                    <form
                      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                      style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          padding: "0.85rem 1rem",
                          fontFamily: "Calibri, 'Gill Sans', sans-serif",
                          fontSize: "13px",
                          color: "#fff",
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.5)"; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                      />
                      <button
                        type="submit"
                        style={{
                          width: "100%",
                          padding: "0.85rem",
                          background: "transparent",
                          border: "1px solid rgba(201,168,76,0.5)",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "9.5px",
                          letterSpacing: "0.45em",
                          textTransform: "uppercase",
                          color: "rgba(201,168,76,0.85)",
                          cursor: "pointer",
                          transition: "background 0.25s, color 0.25s",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = "rgba(201,168,76,0.12)";
                          el.style.color = "rgb(201,168,76)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = "transparent";
                          el.style.color = "rgba(201,168,76,0.85)";
                        }}
                      >
                        Claim My Offer
                      </button>
                    </form>

                    <p style={{
                      fontFamily: "Calibri, 'Gill Sans', sans-serif",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.18)",
                      textAlign: "center",
                      marginTop: "1.25rem",
                    }}>
                      No spam. Unsubscribe anytime.
                    </p>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                    <p style={{
                      fontFamily: '"Cormorant Garamond", Cormorant, serif',
                      fontSize: "2rem",
                      fontStyle: "italic",
                      color: "rgb(201,168,76)",
                      marginBottom: "0.75rem",
                    }}>
                      Welcome to Maaya
                    </p>
                    <p style={{
                      fontFamily: "Calibri, 'Gill Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.35)",
                    }}>
                      Your offer code is on its way. See you soon.
                    </p>
                    <button
                      onClick={() => setShow(false)}
                      style={{
                        marginTop: "2rem",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "9px",
                        letterSpacing: "0.45em",
                        color: "rgba(201,168,76,0.5)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
