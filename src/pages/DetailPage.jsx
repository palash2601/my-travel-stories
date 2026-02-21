import { useParams } from "react-router-dom";
import { useItineraryDetail } from "@hooks/useItineraryDetail";
import { ErrorState } from "@components/common";
import {
  DetailHero,
  PhotoGallery,
  ScheduleSection,
  MustVisitSection,
  FoodSection,
  ExpenseSidebar,
  StaysSidebar,
  TravelSidebar,
  DetailSkeleton,
} from "@components/detail";
import { Footer } from "@components/layout";

export default function DetailPage() {
  const { id } = useParams();
  const { itinerary, loading, error, retry } = useItineraryDetail(id);

  if (loading) return <DetailSkeleton />;

  if (error) {
    return (
      <div style={{ paddingTop: "8rem" }}>
        <ErrorState title="Couldn't load itinerary" message={error} onRetry={retry} />
      </div>
    );
  }

  if (!itinerary) return null;

  return (
    <>
      <DetailHero itinerary={itinerary} />
      <PhotoGallery images={itinerary.gallery} />

      {/*
        .detail-content-grid (global.css):
          mobile  → 1 column, stacked
          ≥960px  → 1fr 320px side-by-side
          ≥1200px → 1fr 360px side-by-side
      */}
      <div className="detail-content-grid">
        <div>
          <ScheduleSection schedule={itinerary.schedule} />
          <MustVisitSection places={itinerary.mustVisit} />
          <FoodSection food={itinerary.food} />
        </div>
        <aside>
          <ExpenseSidebar expense={itinerary.expense} />
          <StaysSidebar stays={itinerary.stays} />
          <TravelSidebar travel={itinerary.travel} />
        </aside>
      </div>

      <Footer />
    </>
  );
}
