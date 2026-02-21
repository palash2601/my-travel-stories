import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@components/layout";
import OverviewPage from "@pages/OverviewPage";
import DetailPage from "@pages/DetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    // On back/forward navigation (POP), let the page handle its own scroll restoration
    if (navType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 72 }}>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/itinerary/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </>
  );
}
