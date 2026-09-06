// Core Web Vitals collection for the portfolio site.
// Dependency-free, based on PerformanceObserver and the web-vitals APIs
// available in modern browsers. Reports are sent via the analytics transport
// layer so they can be queued and batched like regular events.

import { track } from "./log";

/**
 * Observe a paint metric and report it.
 *
 * @param {string} name - Performance entry name, e.g. "first-contentful-paint".
 * @param {string} eventName - Normalised event name for analytics.
 */
function observePaint(name, eventName) {
  if (typeof PerformanceObserver === "undefined") return;

  try {
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        track(eventName, { value: Math.round(entry.startTime), rating: "good" });
      }
    });
    po.observe({ type: "paint", buffered: true });
  } catch {
    // Unsupported in this browser; ignore silently.
  }
}

/**
 * Observe Largest Contentful Paint (LCP).
 */
function observeLCP() {
  if (typeof PerformanceObserver === "undefined") return;

  try {
    let lastEntry = null;
    const po = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length) {
        lastEntry = entries[entries.length - 1];
      }
    });
    po.observe({ type: "largest-contentful-paint", buffered: true });

    // Report final LCP when the page is hidden, per Google guidance.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && lastEntry) {
        track("web_vital_lcp", {
          value: Math.round(lastEntry.startTime),
          rating: rateLCP(lastEntry.startTime),
        });
      }
    });
  } catch {
    // ignore
  }
}

function rateLCP(value) {
  if (value <= 2500) return "good";
  if (value <= 4000) return "needs-improvement";
  return "poor";
}

/**
 * Observe Cumulative Layout Shift (CLS).
 */
function observeCLS() {
  if (typeof PerformanceObserver === "undefined") return;

  try {
    let clsValue = 0;
    let hadRecentInput = false;
    const sessionEntries = [];

    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          sessionEntries.push(entry);
          clsValue += entry.value;
          hadRecentInput = hadRecentInput || false;
        }
      }
    });
    po.observe({ type: "layout-shift", buffered: true });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        track("web_vital_cls", {
          value: Math.round(clsValue * 1000) / 1000,
          rating: rateCLS(clsValue),
        });
      }
    });
  } catch {
    // ignore
  }
}

function rateCLS(value) {
  if (value <= 0.1) return "good";
  if (value <= 0.25) return "needs-improvement";
  return "poor";
}

/**
 * Observe Interaction to Next Paint (INP), the modern replacement for FID.
 */
function observeINP() {
  if (typeof PerformanceObserver === "undefined") return;

  try {
    let maxEntry = null;
    let maxDuration = 0;

    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // entry.duration is the INP duration.
        if (entry.duration > maxDuration) {
          maxEntry = entry;
          maxDuration = entry.duration;
        }
      }
    });
    po.observe({ type: "event", buffered: true, durationThreshold: 0 });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && maxEntry) {
        track("web_vital_inp", {
          value: Math.round(maxDuration),
          rating: rateINP(maxDuration),
        });
      }
    });
  } catch {
    // ignore
  }
}

function rateINP(value) {
  if (value <= 200) return "good";
  if (value <= 500) return "needs-improvement";
  return "poor";
}

/**
 * Measure Time to First Byte (TTFB) from the navigation timing entry.
 */
function measureTTFB() {
  if (typeof performance === "undefined" || !performance.getEntriesByType) return;

  try {
    const [nav] = performance.getEntriesByType("navigation");
    if (!nav) return;

    const value = nav.responseStart - nav.startTime;
    track("web_vital_ttfb", {
      value: Math.round(value),
      rating: rateTTFB(value),
    });
  } catch {
    // ignore
  }
}

function rateTTFB(value) {
  if (value <= 800) return "good";
  if (value <= 1800) return "needs-improvement";
  return "poor";
}

/**
 * Measure First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
 */
export function initWebVitals() {
  if (typeof window === "undefined") return;

  observePaint("first-contentful-paint", "web_vital_fcp");
  observeLCP();
  observeCLS();
  observeINP();
  measureTTFB();
}
