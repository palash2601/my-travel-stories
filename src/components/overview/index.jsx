import { useState } from "react";
import { useItineraries } from "@hooks/useItineraries";
import { LazyImage, Badge, SkeletonCard, ErrorState } from "@components/common";

/* ── HeroBanner ──────────────────────────────────────────── */
export function HeroBanner({ onCtaClick }) {
  return (
    <section
      style={{
        height: "100svh",  /* svh = safe viewport height (handles mobile browser chrome) */
        minHeight: "540px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 var(--page-px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <LazyImage
          src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80"
          alt="Europe"
        />
      </div>

      {/* overlay — heavier on mobile so text reads over image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(115deg,rgba(245,240,232,0.97) 0%,rgba(245,240,232,0.82) 55%,rgba(245,240,232,0.2) 100%)",
        }}
      />

      {/* content */}
      <div style={{ position: "relative", zIndex: 2, animation: "fadeUp 0.7s ease both", maxWidth: "100%" }}>
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "var(--rust)",
            marginBottom: "1.2rem",
          }}
        >
          European Travel Advisory
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.4rem, 8vw, 6.5rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--dark)",
            marginBottom: "1.2rem",
          }}
        >
          Discover <em style={{ fontStyle: "italic", color: "var(--brown)" }}>Europe</em>
          <br />
          as it was meant to be
        </h1>
        <p
          style={{
            fontSize: "clamp(0.88rem, 2vw, 1rem)",
            color: "var(--muted)",
            maxWidth: 420,
            lineHeight: 1.75,
            marginBottom: "2.5rem",
          }}
        >
          Curated itineraries crafted by expert travellers. Every detail considered, every moment
          unforgettable.
        </p>
        <button
          onClick={onCtaClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.7rem",
            background: "var(--dark)",
            color: "var(--cream)",
            border: "none",
            padding: "0.9rem 2rem",
            fontSize: "0.78rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Explore Destinations ↓
        </button>
      </div>
    </section>
  );
}

/* ── ItineraryCard ───────────────────────────────────────── */
export function ItineraryCard({ itinerary, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onClick(itinerary)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        aspectRatio: "3/2",
        border: "none",
        background: "none",
        padding: 0,
        textAlign: "left",
        width: "100%",
        cursor: "pointer",
        /* Ensure touch-friendly tap target */
        WebkitAppearance: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.55s ease",
        }}
      >
        <LazyImage src={itinerary.thumbnail} alt={itinerary.title} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top,rgba(26,22,18,0.85) 0%,transparent 60%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1.2rem",
        }}
      >
        <div style={{ marginBottom: "0.3rem" }}>
          <Badge>{itinerary.days} Days</Badge>
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.1rem, 3vw, 1.35rem)",
            fontWeight: 400,
            color: "white",
            lineHeight: 1.2,
          }}
        >
          {itinerary.title}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "0.9rem",
          right: "0.9rem",
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "0.85rem",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      >
        →
      </div>
    </button>
  );
}

/* ── CountryAccordion ────────────────────────────────────── */
export function CountryAccordion({ country, isOpen, onToggle, onItineraryClick }) {
  const { itineraries, loading, error, retry } = useItineraries(isOpen ? country.id : null);
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem 0",
          background: "none",
          border: "none",
          width: "100%",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            fontWeight: 400,
            color: hovered ? "var(--rust)" : "var(--dark)",
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
            transition: "color var(--transition)",
            minWidth: 0,      /* allow text to shrink */
          }}
        >
          <span style={{ fontSize: "clamp(1.4rem, 4vw, 1.9rem)", flexShrink: 0 }}>{country.flag}</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {country.name}
          </span>
        </span>

        <span style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
          <span
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "none",  /* hidden on very small screens — set via CSS below */
            }}
            className="accordion-count"
          >
            {country.itineraryCount} Itinerar{country.itineraryCount > 1 ? "ies" : "y"}
          </span>
          <span
            style={{
              fontSize: "1.5rem",
              color: "var(--gold)",
              display: "inline-block",
              userSelect: "none",
              transform: isOpen ? "rotate(45deg)" : "rotate(0)",
              transition: "transform 0.3s ease",
            }}
          >
            +
          </span>
        </span>
      </button>

      {isOpen && (
        <div style={{ paddingBottom: "2rem", animation: "fadeUp 0.3s ease" }}>
          {loading && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))",
                gap: "1rem",
              }}
            >
              {Array.from({ length: country.itineraryCount }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}
          {error && !loading && (
            <ErrorState title="Couldn't load itineraries" message={error} onRetry={retry} />
          )}
          {!loading && !error && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))",
                gap: "1rem",
              }}
            >
              {itineraries.map((itin) => (
                <ItineraryCard key={itin.id} itinerary={itin} onClick={onItineraryClick} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
