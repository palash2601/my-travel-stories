import { COUNTRIES, ITINERARIES } from "@data/mockData";

const DELAY = Number(import.meta.env.VITE_API_SIMULATED_DELAY) || 900;
const FAILURE_RATE = 0; // set to e.g. 0.3 to test error-state UI

const _fetch = (data, delay = DELAY) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        return reject(new Error("Network error: failed to reach the server."));
      }
      if (data === null || data === undefined) {
        return reject(new Error("404: Resource not found."));
      }
      resolve(data);
    }, delay)
  );

const api = {
  fetchCountries: () => _fetch([...COUNTRIES]),

  fetchItinerariesByCountry: (countryId) => {
    const list = ITINERARIES[countryId];
    if (!list) return _fetch(null);
    return _fetch(
      list.map(({ id, countryId: cId, title, days, thumbnail }) => ({
        id,
        countryId: cId,
        title,
        days,
        thumbnail,
      }))
    );
  },

  fetchItineraryById: (id) => {
    for (const list of Object.values(ITINERARIES)) {
      const found = list.find((it) => it.id === id);
      if (found) return _fetch({ ...found });
    }
    return _fetch(null);
  },
};

export default api;
