import { LazyImage, Skeleton } from "@components/common";

/* ── DetailHero ──────────────────────────────────────────── */
export function DetailHero({ itinerary }) {
  const countryLabel = itinerary.countryId
    ? itinerary.countryId[0].toUpperCase() + itinerary.countryId.slice(1)
    : "";
  return (
    <div
      style={{
        height: "clamp(42vh, 65vh, 65vh)",
        minHeight: 280,
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        padding: "var(--page-px)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <LazyImage src={itinerary.heroImage} alt={itinerary.title} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top,rgba(26,22,18,0.88) 0%,rgba(26,22,18,0.2) 55%,transparent 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-block",
            background: "var(--gold)",
            color: "var(--dark)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.35rem 0.9rem",
            marginBottom: "0.8rem",
          }}
        >
          {countryLabel} · {itinerary.days} Days
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.9rem, 5vw, 4.5rem)",
            fontWeight: 300,
            color: "white",
            lineHeight: 1.1,
          }}
        >
          {itinerary.title}
        </h1>
      </div>
    </div>
  );
}

/* ── PhotoGallery ────────────────────────────────────────── */
export function PhotoGallery({ images = [] }) {
  if (!images.length) return null;
  const [main, ...rest] = images;
  return (
    /* CSS class handles grid breakpoints (see global.css) */
    <div className="photo-gallery">
      <div className="photo-gallery__main">
        <LazyImage src={main} alt="main" style={{ height: "100%" }} />
      </div>
      {rest.slice(0, 3).map((src, i) => (
        <div key={i} className="photo-gallery__secondary">
          <LazyImage src={src} alt={`gallery ${i + 2}`} style={{ height: "100%" }} />
        </div>
      ))}
    </div>
  );
}

/* ── DetailSectionTitle ──────────────────────────────────── */
function DetailSectionTitle({ icon, children }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(1.4rem, 3vw, 1.75rem)",
        fontWeight: 400,
        color: "var(--dark)",
        borderBottom: "2px solid var(--gold)",
        paddingBottom: "0.6rem",
        marginBottom: "1.2rem",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      {children}
    </h2>
  );
}

/* ── ScheduleSection ─────────────────────────────────────── */
export function ScheduleSection({ schedule = [] }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <DetailSectionTitle icon="📅">Day-by-Day Schedule</DetailSectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {schedule.map((d) => (
          <div
            key={d.day}
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
              padding: "1rem",
              background: "white",
              borderLeft: "3px solid var(--gold)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 300,
                color: "var(--gold)",
                lineHeight: 1,
                minWidth: 40,
                flexShrink: 0,
              }}
            >
              {String(d.day).padStart(2, "0")}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 500, marginBottom: "0.2rem", fontSize: "0.95rem" }}>
                {d.title}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6 }}>
                {d.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MustVisitSection ────────────────────────────────────── */
export function MustVisitSection({ places = [] }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <DetailSectionTitle icon="📍">Must-Visit Places</DetailSectionTitle>
      {/* CSS class handles 1→2 column breakpoint (see global.css) */}
      <div className="must-visit-grid">
        {places.map((p) => (
          <div
            key={p.name}
            style={{
              padding: "1.1rem",
              background: "white",
              borderTop: "3px solid transparent",
              transition: "border-color var(--transition)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
          >
            <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{p.emoji}</div>
            <div style={{ fontWeight: 500, marginBottom: "0.2rem", fontSize: "0.95rem" }}>{p.name}</div>
            <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.55 }}>
              {p.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FoodSection ─────────────────────────────────────────── */
export function FoodSection({ food = [] }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <DetailSectionTitle icon="🍽️">What to Eat</DetailSectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {food.map((f) => (
          <div
            key={f.name}
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              padding: "0.9rem 1rem",
              background: "white",
            }}
          >
            <div style={{ fontSize: "1.7rem", flexShrink: 0 }}>{f.emoji}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: "0.95rem" }}>{f.name}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{f.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SidebarCard ─────────────────────────────────────────── */
function SidebarCard({ title, children }) {
  return (
    <div
      style={{
        background: "white",
        padding: "1.5rem",
        marginBottom: "1.2rem",
        borderTop: "3px solid var(--gold)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.2rem",
          marginBottom: "1.1rem",
          color: "var(--dark)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

/* ── ExpenseSidebar ──────────────────────────────────────── */
export function ExpenseSidebar({ expense }) {
  if (!expense) return null;
  const rows = ["accommodation", "food", "transport", "activities"];
  return (
    <SidebarCard title="💰 Estimated Expenses">
      {rows.map((k) =>
        expense[k] ? (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem 0",
              borderBottom: "1px solid var(--cream)",
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{expense[k].label}</span>
            <span style={{ fontWeight: 500, fontSize: "0.88rem" }}>{expense[k].amount}</span>
          </div>
        ) : null
      )}
      <div
        style={{
          marginTop: "0.75rem",
          padding: "0.75rem",
          background: "var(--dark)",
          color: "var(--cream)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Total Est.
        </span>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>
          {expense.total}
        </span>
      </div>
    </SidebarCard>
  );
}

/* ── StaysSidebar ────────────────────────────────────────── */
export function StaysSidebar({ stays = [] }) {
  return (
    <SidebarCard title="🏨 Recommended Stays">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
        {stays.map((s) => (
          <div key={s.name} style={{ padding: "0.75rem", border: "1px solid var(--border)" }}>
            <div
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: "0.2rem",
              }}
            >
              {s.type}
            </div>
            <div style={{ fontWeight: 500, fontSize: "0.92rem" }}>{s.name}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.15rem" }}>
              {s.pricePerNight} / night
            </div>
          </div>
        ))}
      </div>
    </SidebarCard>
  );
}

/* ── TravelSidebar ───────────────────────────────────────── */
export function TravelSidebar({ travel = [] }) {
  return (
    <SidebarCard title="✈️ Getting Around">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {travel.map((t, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: "0.7rem", fontSize: "0.85rem", lineHeight: 1.5 }}
          >
            <span style={{ flexShrink: 0 }}>{t.icon}</span>
            <span>{t.tip}</span>
          </div>
        ))}
      </div>
    </SidebarCard>
  );
}

/* ── DetailSkeleton ──────────────────────────────────────── */
export function DetailSkeleton() {
  return (
    <div>
      <Skeleton width="100%" height="clamp(42vh,65vh,65vh)" />
      {/* CSS class collapses sidebar below content on mobile */}
      <div className="detail-content-grid">
        <div>
          <Skeleton height="2rem" style={{ width: 220, marginBottom: "1.5rem" }} />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="5rem" style={{ marginBottom: "0.75rem" }} />
          ))}
        </div>
        <div>
          <Skeleton height="12rem" style={{ marginBottom: "1.5rem" }} />
          <Skeleton height="10rem" style={{ marginBottom: "1.5rem" }} />
        </div>
      </div>
    </div>
  );
}
