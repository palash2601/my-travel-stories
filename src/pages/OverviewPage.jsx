import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCountries } from "@hooks/useCountries";
import { SectionHeader, Skeleton, ErrorState } from "@components/common";
import { CountryAccordion, HeroBanner } from "@components/overview";
import { Footer } from "@components/layout";

export default function OverviewPage() {
  const navigate = useNavigate();
  const { countries, loading, error, retry } = useCountries();
  const [openCountry, setOpenCountry] = useState(
    () => sessionStorage.getItem("openCountry") || null
  );
  const didScrollRef = useRef(false);

  const toggle = (id) => {
    setOpenCountry((prev) => {
      const next = prev === id ? null : id;
      if (next) sessionStorage.setItem("openCountry", next);
      else sessionStorage.removeItem("openCountry");
      return next;
    });
  };

  // After countries load, scroll the restored accordion into view (offset for fixed navbar)
  useEffect(() => {
    if (!loading && openCountry && !didScrollRef.current) {
      didScrollRef.current = true;
      setTimeout(() => {
        const el = document.getElementById(`country-${openCountry}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 72 - 16;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 50);
    }
  }, [loading, openCountry]);

  const scrollTo = () =>
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" });

  const handleSelectItinerary = (itin) => navigate(`/itinerary/${itin.id}`);

  return (
    <>
      <HeroBanner onCtaClick={scrollTo} />

      <section
        id="destinations"
        style={{ padding: "var(--section-py) var(--page-px)" }}
      >
        <SectionHeader eyebrow="Our Destinations" title="Choose Your Country" />

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[220, 260, 200].map((w, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                <Skeleton height="2.2rem" style={{ width: Math.min(w, 280) }} />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <ErrorState title="Couldn't load destinations" message={error} onRetry={retry} />
        )}

        {!loading &&
          !error &&
          countries.map((country) => (
            <CountryAccordion
              key={country.id}
              country={country}
              isOpen={openCountry === country.id}
              onToggle={() => toggle(country.id)}
              onItineraryClick={handleSelectItinerary}
            />
          ))}

        {!loading && !error && countries.length > 0 && (
          <div style={{ borderBottom: "1px solid var(--border)" }} />
        )}
      </section>

      <Footer />
    </>
  );
}
