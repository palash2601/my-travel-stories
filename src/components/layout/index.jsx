import { Link, useLocation, useNavigate } from "react-router-dom";

/* ── Navbar ──────────────────────────────────────────────── */
export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDetailPage = pathname.startsWith("/itinerary/");

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        /* --page-px from global.css responds to viewport width */
        padding: "1.2rem var(--page-px)",
        background: "rgba(245,240,232,0.93)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.25rem, 4vw, 1.55rem)",
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "var(--dark)",
          textDecoration: "none",
        }}
      >
        Via<span style={{ color: "var(--gold)", fontStyle: "italic" }}>Europa</span>
      </Link>

      {isDetailPage && (
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--brown)",
            background: "none",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          ← <span>All Itineraries</span>
        </button>
      )}
    </nav>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer
      style={{
        background: "var(--dark)",
        color: "rgba(245,240,232,0.55)",
        padding: "4rem var(--page-px) 2.5rem",
        textAlign: "center",
      }}
    >
      <Link
        to="/"
        style={{
          display: "block",
          fontFamily: "var(--font-serif)",
          fontSize: "2rem",
          color: "var(--cream)",
          marginBottom: "1rem",
          textDecoration: "none",
        }}
      >
        Via<span style={{ color: "var(--gold)", fontStyle: "italic" }}>Europa</span>
      </Link>
      <p
        style={{
          fontSize: "0.85rem",
          lineHeight: 1.8,
          maxWidth: 380,
          margin: "0 auto 2.5rem",
        }}
      >
        Crafting unforgettable European journeys since 2012. Every itinerary personally vetted by
        our travel specialists.
      </p>
      <div style={{ width: 60, height: 1, background: "var(--gold)", margin: "0 auto 2rem" }} />
      <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", opacity: 0.45 }}>
        © 2025 ViaEuropa. All rights reserved.
      </p>
    </footer>
  );
}
