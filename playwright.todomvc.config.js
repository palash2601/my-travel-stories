import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/todomvc.spec.js",
  fullyParallel: false,
  retries: 0,
  reporter: [["html", { open: "never", outputFolder: "playwright-report-todomvc" }], ["list"]],

  use: {
    baseURL: "https://demo.playwright.dev/todomvc/",
    // Screenshot for EVERY test — pass or fail
    screenshot: "on",
    trace: "on",
    video: "off",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // No webServer — we test the live demo site directly
  outputDir: "test-results-todomvc",
});
