import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { EMAIL, PHONE_NUMBER } from "@/constants";
import maayaLogo from "@/assets/maaya-logo.png";

// ─── Shared style tokens ──────────────────────────────────────────────────────
const INPUT: React.CSSProperties = {
  background: "#0A0804",
  border: "none",
  borderBottom: "1px solid rgba(201,168,76,0.25)",
  color: "#F5ECD7",
  padding: "12px 0",
  fontFamily: "Calibri, var(--font-body), sans-serif",
  fontSize: 16,
  width: "100%",
  outline: "none",
  display: "block",
};

const LABEL: React.CSSProperties = {
  fontFamily: "Calibri, var(--font-body), sans-serif",
  fontSize: 11,
  letterSpacing: "0.15em",
  color: "#C9A84C",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 6,
};

const FIELD_DIVIDER: React.CSSProperties = {
  borderTop: "1px solid rgba(201,168,76,0.08)",
  margin: "24px 0",
};

// ─── Card 1: Standard gift card — dark marble front ──────────────────────────
function StandardCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "63%",
        borderRadius: 12,
        overflow: "hidden",
        background: "linear-gradient(135deg, #1c1008 0%, #2a1a08 25%, #1a1208 50%, #0f0804 100%)",
        boxShadow: hovered
          ? "0 30px 80px rgba(0,0,0,0.7)"
          : "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Diagonal texture overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(45deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 12px)",
      }} />
      {/* Content layer */}
      <div style={{ position: "absolute", inset: 0, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Top-right: 2×2 chip dots */}
        <div style={{ alignSelf: "flex-end", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(201,168,76,0.4)" }} />
          ))}
        </div>
        {/* Bottom-left: logo + name */}
        <div>
          <img
            src={maayaLogo}
            alt="Bar Maaya"
            style={{ height: 24, width: "auto", filter: "brightness(0) invert(1)", display: "block", marginBottom: 4 }}
          />
          <p style={{ fontFamily: "Calibri, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(245,236,215,0.7)", margin: 0 }}>
            BAR MAAYA
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Card 2: Corporate gift card ─────────────────────────────────────────────
function CorporateCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "63%",
        borderRadius: 12,
        overflow: "hidden",
        background: "#0D0B07",
        border: "1px solid rgba(201,168,76,0.3)",
        boxShadow: hovered
          ? "0 30px 80px rgba(0,0,0,0.7)"
          : "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        {/* Gold logo */}
        <img
          src={maayaLogo}
          alt="Bar Maaya"
          style={{ height: 28, width: "auto", filter: "brightness(0) saturate(100%) invert(72%) sepia(50%) saturate(400%) hue-rotate(5deg)" }}
        />
        {/* Three-line placeholder */}
        <div style={{ textAlign: "center", lineHeight: 1.3 }}>
          {["YOUR", "LOGO", "HERE"].map(word => (
            <p key={word} style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "rgba(201,168,76,0.35)", margin: 0 }}>
              {word}
            </p>
          ))}
        </div>
        {/* Bottom-left BAR MAAYA */}
        <p style={{ position: "absolute", bottom: 16, left: 20, fontFamily: "Calibri, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(245,236,215,0.7)", margin: 0 }}>
          BAR MAAYA
        </p>
      </div>
    </div>
  );
}

// ─── Card 3: Back-of-card (balance check) ────────────────────────────────────
function BalanceCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "63%",
        borderRadius: 12,
        overflow: "hidden",
        background: "#e8dcc8",
        boxShadow: hovered
          ? "0 30px 80px rgba(0,0,0,0.7)"
          : "0 20px 60px rgba(0,0,0,0.6)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Top area */}
        <div style={{ padding: "12px 14px", paddingBottom: 0 }}>
          <p style={{ fontFamily: "Calibri, sans-serif", fontSize: 7.5, color: "#5a4a3a", lineHeight: 1.4, margin: 0, maxWidth: "88%" }}>
            Use this card for purchases at Bar Maaya, Toronto. The card value will be applied to food, beverages, and gratuity. Cards are non-refundable.
          </p>
          <div style={{ borderTop: "0.5px solid rgba(90,74,58,0.3)", margin: "10px 0" }} />
          <p style={{ fontFamily: "Calibri, sans-serif", fontSize: 9, color: "#2a1a08", letterSpacing: "0.1em", margin: "0 0 6px 0" }}>
            CARD#: ••••&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;••••
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "Calibri, sans-serif", fontSize: 9, color: "#2a1a08" }}>PIN:</span>
            <span style={{ display: "inline-block", background: "#0A0804", width: 60, height: 14, borderRadius: 2 }} />
          </div>
        </div>
        {/* Bottom black bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "28%", background: "#0A0804", borderRadius: "0 0 12px 12px" }} />
      </div>
    </div>
  );
}

// ─── Gift Card Column ─────────────────────────────────────────────────────────
function GiftCardColumn({
  card, title, description, ctaLabel, onCta,
}: {
  card: React.ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
  onCta: () => void;
}) {
  const [ctaHovered, setCtaHovered] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {card}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "normal", fontSize: 26, color: "#F5ECD7", marginTop: 28, marginBottom: 10 }}>
        {title}
      </h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#8C7A5E", lineHeight: 1.65, margin: 0, flex: 1 }}>
        {description}
      </p>
      <button
        onClick={onCta}
        onMouseEnter={() => setCtaHovered(true)}
        onMouseLeave={() => setCtaHovered(false)}
        style={{
          background: "none",
          border: "none",
          borderBottom: `1px solid ${ctaHovered ? "#C9A84C" : "rgba(245,236,215,0.5)"}`,
          color: ctaHovered ? "#C9A84C" : "#F5ECD7",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          letterSpacing: "0.08em",
          padding: "0 0 3px 0",
          cursor: "pointer",
          marginTop: 20,
          alignSelf: "flex-start",
          transition: "color 0.2s, border-color 0.2s",
          display: "inline-block",
        }}
      >
        {ctaLabel}
      </button>
    </div>
  );
}

// ─── Purchase Modal ───────────────────────────────────────────────────────────
type DeliveryType = "now" | "later";

function PurchaseModal({ onClose }: { onClose: () => void }) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fromName, setFromName] = useState("");
  const [message, setMessage] = useState("");
  const [delivery, setDelivery] = useState<DeliveryType>("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = () => {
    const amt = selectedAmount ?? parseFloat(customAmount);
    if (!amt || isNaN(amt) || amt < 25 || amt > 500) {
      alert("Please select or enter an amount between $25 and $500.");
      return;
    }
    if (!recipientName.trim()) { alert("Please enter the recipient's name."); return; }
    if (!recipientEmail.trim()) { alert("Please enter the recipient's email."); return; }
    if (recipientEmail !== confirmEmail) {
      setEmailError("Email addresses do not match.");
      return;
    }
    setEmailError("");
    const params = new URLSearchParams({ product: "gift-card", amount: String(amt), recipient: recipientEmail });
    window.location.href = `/payment?${params.toString()}`;
  };

  const AMOUNTS = [50, 100, 150, 200];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.85)",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px 16px 40px 16px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
        onPointerDown={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#1E160D",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: 8,
          maxWidth: 560,
          width: "100%",
          flexShrink: 0,
          padding: 40,
        }}
      >
        {/* Close button */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, zIndex: 10, background: "none", border: "none", cursor: "pointer", color: "#C9A84C", padding: 4, display: "flex" }}>
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: 28, paddingRight: 32 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 26, color: "#F5ECD7", margin: 0 }}>
            Purchase a Gift Card
          </h2>
        </div>

        {/* Gift Amount */}
        <div>
          <span style={LABEL}>Gift Amount</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {AMOUNTS.map(amt => {
              const active = selectedAmount === amt;
              return (
                <button
                  key={amt}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  style={{
                    background: active ? "#2a1a08" : "#15100A",
                    border: active ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.2)",
                    color: "#F5ECD7",
                    padding: "14px 20px",
                    cursor: "pointer",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    borderRadius: 2,
                    transition: "all 0.2s",
                  }}
                >
                  ${amt}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid rgba(201,168,76,0.25)" }}>
            <span style={{ fontFamily: "Calibri, sans-serif", fontSize: 15, color: "#F5ECD7", marginRight: 6 }}>$</span>
            <input
              type="number"
              value={customAmount}
              onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
              placeholder="Custom ($25–$500)"
              style={{ ...INPUT, borderBottom: "none", flex: 1 }}
            />
          </div>
        </div>

        <div style={FIELD_DIVIDER} />

        {/* Recipient Name */}
        <div style={{ marginBottom: 20 }}>
          <label style={LABEL}>Recipient's Name</label>
          <input type="text" value={recipientName} onChange={e => setRecipientName(e.target.value)} style={INPUT} />
        </div>

        {/* Recipient Email */}
        <div style={{ marginBottom: 20 }}>
          <label style={LABEL}>Recipient's Email</label>
          <input type="email" value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)} style={INPUT} />
        </div>

        {/* Confirm Email */}
        <div>
          <label style={LABEL}>Confirm Email</label>
          <input
            type="email"
            value={confirmEmail}
            onChange={e => setConfirmEmail(e.target.value)}
            onBlur={() => {
              if (confirmEmail && recipientEmail !== confirmEmail) setEmailError("Email addresses do not match.");
              else setEmailError("");
            }}
            style={INPUT}
          />
          {emailError && <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,90,90,0.85)", marginTop: 6 }}>{emailError}</p>}
        </div>

        <div style={FIELD_DIVIDER} />

        {/* From Name */}
        <div style={{ marginBottom: 20 }}>
          <label style={LABEL}>Your Name</label>
          <input type="text" value={fromName} onChange={e => setFromName(e.target.value)} style={INPUT} />
        </div>

        {/* Message */}
        <div>
          <label style={LABEL}>Personal Message (Optional)</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value.slice(0, 255))}
            placeholder="Write something meaningful..."
            rows={3}
            style={{ ...INPUT, resize: "none" }}
          />
          <p style={{ fontFamily: "Calibri, sans-serif", fontSize: 11, color: "rgba(201,168,76,0.4)", textAlign: "right", marginTop: 4 }}>
            {message.length}/255
          </p>
        </div>

        <div style={FIELD_DIVIDER} />

        {/* Delivery */}
        <div>
          <span style={LABEL}>Delivery</span>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {(["now", "later"] as DeliveryType[]).map(d => {
              const active = delivery === d;
              return (
                <button
                  key={d}
                  onClick={() => setDelivery(d)}
                  style={{
                    background: active ? "rgba(201,168,76,0.1)" : "transparent",
                    border: active ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.25)",
                    color: active ? "#C9A84C" : "rgba(245,236,215,0.5)",
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontFamily: "Calibri, var(--font-body), sans-serif",
                    fontSize: 13,
                    borderRadius: 2,
                    transition: "all 0.2s",
                  }}
                >
                  {d === "now" ? "Send Now" : "Schedule for Later"}
                </button>
              );
            })}
          </div>
          <AnimatePresence>
            {delivery === "later" && (
              <motion.div
                key="schedule"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
                  <div style={{ flex: 1 }}>
                    <label style={LABEL}>Date</label>
                    <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} style={{ ...INPUT, colorScheme: "dark" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={LABEL}>Time</label>
                    <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} style={{ ...INPUT, colorScheme: "dark" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            height: 52,
            background: "#C9A84C",
            color: "#0A0804",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Playfair Display', serif",
            fontSize: 14,
            letterSpacing: "0.12em",
            borderRadius: 2,
            marginTop: 24,
          }}
        >
          Add to Cart →
        </button>
        <p style={{ fontFamily: "Calibri, var(--font-body), sans-serif", fontSize: 11, color: "#8C7A5E", textAlign: "center", marginTop: 14 }}>
          Gift cards never expire · Valid for all Bar Maaya experiences
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Balance Modal ────────────────────────────────────────────────────────────
function BalanceModal({ onClose }: { onClose: () => void }) {
  const [cardNumber, setCardNumber] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.85)",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px 16px 40px 16px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
        onPointerDown={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
        style={{ position: "relative", background: "#1E160D", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 8, maxWidth: 560, width: "100%", flexShrink: 0, padding: 36 }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, zIndex: 10, background: "none", border: "none", cursor: "pointer", color: "#C9A84C", padding: 4, display: "flex" }}>
          <X size={18} />
        </button>
        <div style={{ marginBottom: 24, paddingRight: 32 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 24, color: "#F5ECD7", margin: 0 }}>Check Balance</h2>
        </div>
        <label style={LABEL}>Enter your card number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          placeholder="16-digit card number"
          style={{ ...INPUT, marginBottom: 20 }}
        />
        <button
          onClick={() => setChecked(true)}
          style={{ width: "100%", height: 48, background: "#C9A84C", color: "#0A0804", border: "none", cursor: "pointer", fontFamily: "'Playfair Display', serif", fontSize: 14, letterSpacing: "0.1em", borderRadius: 2 }}
        >
          Check Balance
        </button>
        {checked && (
          <p style={{ fontFamily: "Calibri, var(--font-body), sans-serif", fontSize: 13, color: "#8C7A5E", marginTop: 16, lineHeight: 1.6, textAlign: "center" }}>
            Please call us or visit the bar to check your balance: {PHONE_NUMBER}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
type ModalState = "purchase" | "balance" | null;

const GiftCards = () => {
  const [modal, setModal] = useState<ModalState>(null);

  return (
    <div style={{ background: "#0A0804", minHeight: "100vh" }}>
      <SEOHead
        title="Gift Cards | Bar Maaya Toronto"
        description="Give the gift of Bar Maaya. Digital, printable, and corporate gift cards for Toronto's most immersive cocktail bar."
        canonical="/gift-cards"
      />

      {/* ── SECTION 1: PAGE HEADING ────────────────────────────────────────── */}
      <div style={{ width: "100%", padding: "100px 0 60px", textAlign: "center" }}>
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#F5ECD7",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Share the Maaya Experience
          </motion.h1>
        </div>
      </div>

      {/* ── SECTION 2: THREE COLUMNS ───────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(24px, 6.7vw, 80px) 100px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(32px, 4vw, 48px)",
        }}>
          <GiftCardColumn
            card={<StandardCard />}
            title="Gift Cards"
            description="Digital and physical gift cards. The perfect way to share an extraordinary evening at Bar Maaya."
            ctaLabel="Buy Now"
            onCta={() => setModal("purchase")}
          />
          <GiftCardColumn
            card={<CorporateCard />}
            title="Corporate Gift Cards"
            description="Starting from orders of $500. Contact us to discuss volume pricing, bonus cards, and custom card design for your team or clients."
            ctaLabel="Corporate Enquiries →"
            onCta={() => {
              window.location.href = `mailto:${EMAIL}?subject=Corporate%20Gift%20Card%20Enquiry`;
            }}
          />
          <GiftCardColumn
            card={<BalanceCard />}
            title="Gift Card Balance"
            description="Check your remaining balance to stay informed and plan your next extraordinary evening at Bar Maaya."
            ctaLabel="Check Balance →"
            onCta={() => setModal("balance")}
          />
        </div>
      </div>

      {/* ── SECTION 3: TERMS ───────────────────────────────────────────────── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 clamp(24px, 6.7vw, 80px) clamp(60px, 8vw, 100px)" }}>
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.12)", marginBottom: 60 }} />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "normal", fontSize: 22, color: "#F5ECD7", marginBottom: 28 }}>
          Terms
        </h2>
        {[
          "Bar Maaya gift cards are available as digital cards delivered instantly by email or as a printable PDF. Orders are processed immediately and digital cards are sent within minutes of purchase. Please ensure the recipient's email address is correct before completing your order.",
          "Gift cards are non-refundable and cannot be exchanged for cash or redeemed for their monetary value. Lost or stolen gift cards will not be replaced without proof of purchase and the original card number. Unauthorised resale of gift cards is strictly prohibited.",
          `Gift cards purchased through unauthorised third parties are not valid or redeemable at Bar Maaya. For assistance, enquiries, or to report a lost card, please contact us directly at ${EMAIL}.`,
          "In limited circumstances, promotional gift cards may carry an expiry date, which will be clearly communicated at the time of issue. Standard gift cards purchased directly from Bar Maaya do not expire.",
        ].map((para, i) => (
          <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#8C7A5E", lineHeight: 1.8, marginBottom: i < 3 ? 20 : 0 }}>
            {para}
          </p>
        ))}
      </div>

      {/* ── MODALS ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modal === "purchase" && <PurchaseModal onClose={() => setModal(null)} />}
        {modal === "balance" && <BalanceModal onClose={() => setModal(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default GiftCards;
