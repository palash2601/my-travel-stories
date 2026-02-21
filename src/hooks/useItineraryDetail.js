import { useState, useEffect, useCallback } from "react";
import api from "@services/api";

export function useItineraryDetail(itineraryId) {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setItinerary(null);
    try {
      setItinerary(await api.fetchItineraryById(id));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(itineraryId);
  }, [itineraryId, load]);

  return { itinerary, loading, error, retry: () => load(itineraryId) };
}
