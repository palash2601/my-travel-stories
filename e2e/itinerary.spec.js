// @ts-check
import { test, expect } from "@playwright/test";

const BASE_URL = "https://my-travel-stories.vercel.app";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate to the homepage and wait for the hero to be visible.
 * @param {import('@playwright/test').Page} page */
async function gotoHome(page) {
  await page.goto(BASE_URL);
  await expect(
    page.getByRole("heading", { name: /Discover Europe as it was meant to be/i })
  ).toBeVisible();
}

/** Scroll the destinations section into view by clicking the CTA button.
 * @param {import('@playwright/test').Page} page */
async function openDestinations(page) {
  await page.getByRole("button", { name: /Explore Destinations/i }).click();
  await expect(
    page.getByRole("heading", { name: "Choose Your Country" })
  ).toBeVisible();
}

// ---------------------------------------------------------------------------
// 1. Homepage
// ---------------------------------------------------------------------------

test.describe("Homepage", () => {
  test("has correct page title", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/ViaEuropa/i);
  });

  test("hero section shows tagline and CTA button", async ({ page }) => {
    await gotoHome(page);
    await expect(page.getByText("European Travel Advisory")).toBeVisible();
    await expect(
      page.getByText(/Curated itineraries crafted by expert travellers/i)
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Explore Destinations/i })
    ).toBeVisible();
  });

  test("logo link returns to homepage", async ({ page }) => {
    await page.goto(`${BASE_URL}/itinerary/swiss-alps-7`);
    await page.getByRole("link", { name: "ViaEuropa" }).first().click();
    await expect(page).toHaveURL(BASE_URL + "/");
  });

  test("footer shows copyright and brand", async ({ page }) => {
    await gotoHome(page);
    await expect(page.getByText(/© 2025 ViaEuropa/i)).toBeVisible();
    await expect(
      page.getByText(/Crafting unforgettable European journeys since 2012/i)
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 2. Destinations accordion
// ---------------------------------------------------------------------------

test.describe("Destinations accordion", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
    await openDestinations(page);
  });

  test("lists all three countries", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /Switzerland/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Netherlands/i })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Italy/i })).toBeVisible();
  });

  test("Switzerland expands to show 2 itineraries", async ({ page }) => {
    await page.getByRole("button", { name: /Switzerland/i }).click();
    await expect(
      page.getByRole("button", { name: /Swiss Alps Explorer/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Geneva & Zürich City Break/i })
    ).toBeVisible();
  });

  test("Netherlands expands to show Amsterdam & Beyond itinerary", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Netherlands/i }).click();
    await expect(
      page.getByRole("button", { name: /Amsterdam & Beyond/i })
    ).toBeVisible();
  });

  test("Italy expands to show 2 itineraries", async ({ page }) => {
    await page.getByRole("button", { name: /Italy/i }).click();
    await expect(
      page.getByRole("button", { name: /Rome, Florence & Tuscany/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Venice & Amalfi Coast/i })
    ).toBeVisible();
  });

  test("itinerary cards show duration badges", async ({ page }) => {
    await page.getByRole("button", { name: /Switzerland/i }).click();
    await expect(page.getByText("7 Days").first()).toBeVisible();
    await expect(page.getByText("4 Days").first()).toBeVisible();
  });

  test("clicking an itinerary card navigates to its detail page", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Switzerland/i }).click();
    await page
      .getByRole("button", { name: /Swiss Alps Explorer/i })
      .first()
      .click();
    await expect(page).toHaveURL(`${BASE_URL}/itinerary/swiss-alps-7`);
  });
});

// ---------------------------------------------------------------------------
// 3. Swiss Alps Explorer — /itinerary/swiss-alps-7
// ---------------------------------------------------------------------------

test.describe("Swiss Alps Explorer itinerary", () => {
  const URL = `${BASE_URL}/itinerary/swiss-alps-7`;

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await expect(
      page.getByRole("heading", { name: "Swiss Alps Explorer" })
    ).toBeVisible();
  });

  test("displays country and duration in header", async ({ page }) => {
    await expect(page.getByText("Switzerland · 7 Days")).toBeVisible();
  });

  test("shows all 7 days in the schedule", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Day-by-Day Schedule/i })
    ).toBeVisible();

    // "Jungfraujoch" appears in multiple sections; use first() to avoid strict mode violations
    const dayTitles = [
      "Zürich Arrival",
      "Lucerne & Lake",
      "Grindelwald Hike",
      "Interlaken",
      "Bern",
      "Departure",
    ];
    for (const title of dayTitles) {
      await expect(page.getByText(title, { exact: true })).toBeVisible();
    }
    // "Jungfraujoch" appears in schedule, must-visit, and getting-around sections
    await expect(page.getByText("Jungfraujoch").first()).toBeVisible();
  });

  test("schedule day descriptions are accurate", async ({ page }) => {
    await expect(
      page.getByText(/Check in, explore Bahnhofstrasse and old town/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Chapel Bridge, Lion Monument, take a lake cruise/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Top of Europe — Eiger views, eternal snow plateau/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Alpine trails, First Cliff Walk, glacier views/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Paragliding optional, lakeside walks, hot chocolate/i)
    ).toBeVisible();
    await expect(
      page.getByText(/UNESCO old town, bear park, clock tower/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Last fondue, souvenir shopping, fly home/i)
    ).toBeVisible();
  });

  test("must-visit places section lists key attractions", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Must-Visit Places/i })
    ).toBeVisible();
    // "Jungfraujoch" appears in schedule, must-visit and getting-around — use first()
    await expect(page.getByText("Jungfraujoch").first()).toBeVisible();
    await expect(page.getByText("Chapel Bridge", { exact: true })).toBeVisible();
    await expect(page.getByText("Bern Old Town", { exact: true })).toBeVisible();
    await expect(page.getByText("Rhine Falls", { exact: true })).toBeVisible();
  });

  test("must-visit place descriptions are present", async ({ page }) => {
    await expect(
      page.getByText(/Highest railway station in Europe at 3,454m/i)
    ).toBeVisible();
    await expect(
      page.getByText(/14th-century wooden bridge over the Reuss/i)
    ).toBeVisible();
    await expect(
      page.getByText(/The largest plain waterfall in Europe/i)
    ).toBeVisible();
  });

  test("what to eat section shows Swiss cuisine", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /What to Eat/i })
    ).toBeVisible();
    await expect(page.getByText("Cheese Fondue")).toBeVisible();
    await expect(page.getByText("Rösti")).toBeVisible();
    await expect(page.getByText("Raclette")).toBeVisible();
    await expect(page.getByText("Birchermüesli")).toBeVisible();
  });

  test("estimated expenses sidebar shows correct breakdown", async ({
    page,
  }) => {
    await expect(page.getByText(/Estimated Expenses/i)).toBeVisible();
    await expect(page.getByText("€1,750", { exact: true })).toBeVisible(); // Accommodation
    await expect(page.getByText("€490", { exact: true })).toBeVisible(); // Food & Dining
    // €380 appears as Transport AND as "€380 / night" for Widder Hotel — use exact match
    await expect(page.getByText("€380", { exact: true })).toBeVisible(); // Transport
    await expect(page.getByText("€320", { exact: true })).toBeVisible(); // Activities
    await expect(page.getByText("€2,940", { exact: true })).toBeVisible(); // Total
  });

  test("estimated expenses labels are correct", async ({ page }) => {
    await expect(page.getByText("Accommodation")).toBeVisible();
    await expect(page.getByText("Food & Dining")).toBeVisible();
    await expect(page.getByText("Transport")).toBeVisible();
    await expect(page.getByText("Activities")).toBeVisible();
    await expect(page.getByText(/Total Est\./i)).toBeVisible();
  });

  test("recommended stays sidebar lists hotels with prices", async ({
    page,
  }) => {
    await expect(page.getByText(/Recommended Stays/i)).toBeVisible();
    await expect(page.getByText("Widder Hotel")).toBeVisible();
    await expect(page.getByText("€380 / night")).toBeVisible();
    await expect(page.getByText("Hotel Schweizerhof")).toBeVisible();
    await expect(page.getByText("€280 / night")).toBeVisible();
    await expect(page.getByText("Grindelwald Grand")).toBeVisible();
    await expect(page.getByText("€220 / night")).toBeVisible();
  });

  test("recommended stays hotel categories are shown", async ({ page }) => {
    await expect(page.getByText("Luxury")).toBeVisible();
    await expect(page.getByText("Heritage")).toBeVisible();
    await expect(page.getByText("Mountain Resort")).toBeVisible();
  });

  test("getting around section has transport tips", async ({ page }) => {
    await expect(page.getByText(/Getting Around/i)).toBeVisible();
    await expect(
      page.getByText(/Fly into Zürich International \(ZRH\)/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Swiss Travel Pass covers trains, boats & buses/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Cogwheel trains to Jungfraujoch included/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Rental car recommended for rural valleys/i)
    ).toBeVisible();
  });

  test("back button navigates to homepage", async ({ page }) => {
    // Navigate via the UI to build browser history, then use the back button
    await gotoHome(page);
    await openDestinations(page);
    await page.getByRole("button", { name: /Switzerland/i }).click();
    await page.getByRole("button", { name: /Swiss Alps Explorer/i }).first().click();
    await expect(page).toHaveURL(`${BASE_URL}/itinerary/swiss-alps-7`);
    await page.getByRole("button", { name: /All Itineraries/i }).click();
    await expect(page).toHaveURL(BASE_URL + "/");
  });
});

// ---------------------------------------------------------------------------
// 4. Amsterdam & Beyond — /itinerary/amsterdam-5
// ---------------------------------------------------------------------------

test.describe("Amsterdam & Beyond itinerary", () => {
  const URL = `${BASE_URL}/itinerary/amsterdam-5`;

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await expect(
      page.getByRole("heading", { name: "Amsterdam & Beyond" })
    ).toBeVisible();
  });

  test("displays country and duration in header", async ({ page }) => {
    await expect(page.getByText("Netherlands · 5 Days")).toBeVisible();
  });

  test("shows all 5 days in the schedule", async ({ page }) => {
    const days = [
      "Canal Ring & Arrival",
      "Museums & Markets",
      "Tulip Fields & Windmills",
      "The Hague & Delft",
      "Departure",
    ];
    for (const title of days) {
      await expect(page.getByText(title)).toBeVisible();
    }
  });

  test("schedule day descriptions are accurate", async ({ page }) => {
    await expect(
      page.getByText(/Jordaan neighbourhood, canal cruise, Rijksmuseum/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Van Gogh Museum, Albert Cuyp Market, Heineken Experience/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Keukenhof Gardens.*Zaanse Schans windmills/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Peace Palace, Delftware pottery studios/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Morning at Nine Streets, fly home from AMS/i)
    ).toBeVisible();
  });

  test("must-visit places section is complete", async ({ page }) => {
    // "Rijksmuseum" and "Van Gogh Museum" also appear in day descriptions — use exact match
    await expect(page.getByText("Rijksmuseum", { exact: true })).toBeVisible();
    await expect(page.getByText("Keukenhof", { exact: true })).toBeVisible();
    await expect(page.getByText("Zaanse Schans", { exact: true })).toBeVisible();
    await expect(page.getByText("Van Gogh Museum", { exact: true })).toBeVisible();
  });

  test("what to eat section shows Dutch cuisine", async ({ page }) => {
    await expect(page.getByText("Stroopwafels")).toBeVisible();
    await expect(page.getByText("Herring (Haring)")).toBeVisible();
    await expect(page.getByText("Dutch Pancakes")).toBeVisible();
    await expect(page.getByText("Bitterballen")).toBeVisible();
  });

  test("estimated expenses shows correct total", async ({ page }) => {
    await expect(page.getByText("€900")).toBeVisible(); // Accommodation
    await expect(page.getByText("€350")).toBeVisible(); // Food & Dining
    await expect(page.getByText("€150")).toBeVisible(); // Transport
    await expect(page.getByText("€220")).toBeVisible(); // Activities
    await expect(page.getByText("€1,620")).toBeVisible(); // Total
  });

  test("recommended stays sidebar lists hotels", async ({ page }) => {
    await expect(page.getByText("Hotel V Nesplein")).toBeVisible();
    await expect(page.getByText("Conservatorium Hotel")).toBeVisible();
    await expect(page.getByText("Pulitzer Amsterdam")).toBeVisible();
  });

  test("getting around includes Amsterdam-specific tips", async ({ page }) => {
    await expect(
      page.getByText(/Fly into Amsterdam Schiphol \(AMS\)/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Rent a bike — best way to explore the city/i)
    ).toBeVisible();
    await expect(
      page.getByText(/NS trains to Hague, Delft, Rotterdam/i)
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 5. Rome, Florence & Tuscany — /itinerary/rome-florence-10
// ---------------------------------------------------------------------------

test.describe("Rome, Florence & Tuscany itinerary", () => {
  const URL = `${BASE_URL}/itinerary/rome-florence-10`;

  test("displays country, duration and heading", async ({ page }) => {
    await page.goto(URL);
    await expect(
      page.getByRole("heading", { name: /Rome, Florence & Tuscany/i })
    ).toBeVisible();
    await expect(page.getByText("Italy · 10 Days")).toBeVisible();
  });

  test("back button works from Italy itinerary", async ({ page }) => {
    // Navigate via the UI to build browser history first
    await gotoHome(page);
    await openDestinations(page);
    await page.getByRole("button", { name: /Italy/i }).click();
    await page.getByRole("button", { name: /Rome, Florence & Tuscany/i }).first().click();
    await expect(page).toHaveURL(URL);
    await page.getByRole("button", { name: /All Itineraries/i }).click();
    await expect(page).toHaveURL(BASE_URL + "/");
  });
});

// ---------------------------------------------------------------------------
// 6. Navigation — direct URL access
// ---------------------------------------------------------------------------

test.describe("Direct URL navigation", () => {
  test("swiss-alps-7 is directly accessible", async ({ page }) => {
    await page.goto(`${BASE_URL}/itinerary/swiss-alps-7`);
    await expect(
      page.getByRole("heading", { name: "Swiss Alps Explorer" })
    ).toBeVisible();
  });

  test("amsterdam-5 is directly accessible", async ({ page }) => {
    await page.goto(`${BASE_URL}/itinerary/amsterdam-5`);
    await expect(
      page.getByRole("heading", { name: "Amsterdam & Beyond" })
    ).toBeVisible();
  });

  test("rome-florence-10 is directly accessible", async ({ page }) => {
    await page.goto(`${BASE_URL}/itinerary/rome-florence-10`);
    await expect(
      page.getByRole("heading", { name: /Rome, Florence & Tuscany/i })
    ).toBeVisible();
  });
});
