import { useState } from "react";

/* ── Spinner ─────────────────────────────────────────────── */
export function Spinner({ label = "Loading…" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.2rem",
        padding: "4rem 2rem",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: "3px solid rgba(139,111,71,0.2)",
          borderTopColor: "#C9A96E",
          borderRadius: "50%",
          animation: "spin 0.9s linear infinite",
        }}
      />
      <span
        style={{
          fontSize: "0.78rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8A7D72",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Skeleton shimmer ────────────────────────────────────── */
export function Skeleton({ width = "100%", height = "1rem", style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        background: "linear-gradient(90deg,#e8e1d6 25%,#f0ebe2 50%,#e8e1d6 75%)",
        backgroundSize: "400px 100%",
        animation: "shimmer 1.4s infinite",
        borderRadius: 2,
        ...style,
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div
      style={{
        aspectRatio: "3/2",
        background: "linear-gradient(90deg,#e8e1d6 25%,#f0ebe2 50%,#e8e1d6 75%)",
        backgroundSize: "400px 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

/* ── ErrorState ──────────────────────────────────────────── */
export function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.2rem",
        padding: "4rem 2rem",
        textAlign: "center",
        animation: "fadeIn 0.4s ease",
      }}
    >
      <span style={{ fontSize: "2.5rem" }}>⚠️</span>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.5rem",
          fontWeight: 400,
          color: "var(--dark)",
        }}
      >
        {title}
      </div>
      {message && (
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", maxWidth: 360 }}>{message}</p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: "var(--dark)",
            color: "var(--cream)",
            border: "none",
            padding: "0.75rem 2rem",
            fontSize: "0.8rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          ↻ Try again
        </button>
      )}
    </div>
  );
}

/* ── Badge ───────────────────────────────────────────────── */
export function Badge({ children, variant = "default" }) {
  const bg =
    variant === "dark" ? "var(--dark)" : variant === "sage" ? "var(--sage)" : "var(--gold)";
  const color = variant === "default" ? "var(--dark)" : "var(--cream)";
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        fontSize: "0.7rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        padding: "0.3rem 0.8rem",
      }}
    >
      {children}
    </span>
  );
}

/* ── SectionHeader ───────────────────────────────────────── */
export function SectionHeader({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      {eyebrow && (
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.6rem",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem,4vw,3rem)",
          fontWeight: 300,
          color: "var(--dark)",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1.5rem",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── LazyImage ───────────────────────────────────────────── */
export function LazyImage({ src, alt = "", style = {} }) {
  const [status, setStatus] = useState("loading");
  return (
    <div
      style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%", ...style }}
    >
      {status !== "loaded" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg,#e8e1d6 25%,#f0ebe2 50%,#e8e1d6 75%)",
            backgroundSize: "400px 100%",
            animation: "shimmer 1.4s infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8A7D72",
            fontSize: "1.5rem",
          }}
        >
          {status === "error" ? "🖼️" : ""}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: status === "loaded" ? 1 : 0,
          position: status === "loaded" ? "static" : "absolute",
          transition: "opacity 0.4s ease",
        }}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
