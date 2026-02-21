import { useState, useEffect, useCallback } from "react";
import api from "@services/api";

export function useItineraries(countryId) {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      setItineraries(await api.fetchItinerariesByCountry(id));
    } catch (e) {
      setError(e.message);
      setItineraries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(countryId);
  }, [countryId, load]);

  return { itineraries, loading, error, retry: () => load(countryId) };
}
