import { Routes, Route } from "react-router-dom";
import { Navbar } from "@components/layout";
import OverviewPage from "@pages/OverviewPage";
import DetailPage from "@pages/DetailPage";

export default function App() {
  return (
    <>
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
