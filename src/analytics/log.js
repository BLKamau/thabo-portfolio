// Analytics transport layer for the portfolio site.
// Sends small, privacy-safe events to a configurable endpoint using
// navigator.sendBeacon when available, falling back to fetch.
// No cookies, no fingerprinting, no PII beyond the user-agent string.

const ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT || "";
const DEBUG = import.meta.env.DEV || import.meta.env.VITE_ANALYTICS_DEBUG === "true";

const STORAGE_KEY = "analytics_queue";
const MAX_QUEUE_SIZE = 100;
const FLUSH_INTERVAL_MS = 30_000;

let sessionId = null;
let flushTimer = null;
let isUnloading = false;

function getSessionId() {
  if (sessionId) return sessionId;
  const key = "analytics_session_id";
  const existing = sessionStorage.getItem(key);
  if (existing) {
    sessionId = existing;
    return sessionId;
  }
  sessionId = generateId();
  sessionStorage.setItem(key, sessionId);
  return sessionId;
}

function generateId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function readQueue() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue.slice(-MAX_QUEUE_SIZE)));
  } catch {
    // Storage may be unavailable or full; drop queued events.
  }
}

function now() {
  return new Date().toISOString();
}

function basePayload() {
  return {
    type: "event",
    session: getSessionId(),
    url: location.href,
    path: location.pathname + location.search,
    referrer: document.referrer || null,
    ts: now(),
    ua: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    language: navigator.language || null,
  };
}

function enqueue(event) {
  const queue = readQueue();
  queue.push(event);
  writeQueue(queue);
}

function canSend() {
  return typeof navigator !== "undefined" && ENDPOINT;
}

function postEvents(events) {
  const body = JSON.stringify(events);
  const blob = new Blob([body], { type: "application/json; charset=UTF-8" });

  if (typeof navigator.sendBeacon === "function" && isUnloading) {
    try {
      return navigator.sendBeacon(ENDPOINT, blob);
    } catch {
      return false;
    }
  }

  return fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "omit",
  })
    .then((res) => res.ok)
    .catch(() => false);
}

export async function flush() {
  if (!canSend()) return;

  const queue = readQueue();
  if (!queue.length) return;

  const ok = await postEvents(queue);
  if (ok) {
    writeQueue([]);
    if (DEBUG) console.log("[analytics] flushed", queue.length);
  } else if (DEBUG) {
    console.log("[analytics] flush failed, events remain queued");
  }
}

function scheduleFlush() {
  if (flushTimer) clearInterval(flushTimer);
  flushTimer = setInterval(() => {
    if (!isUnloading) flush();
  }, FLUSH_INTERVAL_MS);
}

function bindUnload() {
  window.addEventListener("beforeunload", () => {
    isUnloading = true;
    flush();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flush();
    }
  });
}

/**
 * Track a named event.
 *
 * @param {string} name - Event name, e.g. "page_view", "cta_click", "case_study_open".
 * @param {Record<string, unknown>} [metadata] - Extra event metadata.
 */
export function track(name, metadata = {}) {
  const event = {
    ...basePayload(),
    id: generateId(),
    name,
    metadata: {
      ...metadata,
      // Add the current scroll depth if the caller did not supply one.
      scrollDepth: metadata.scrollDepth ?? getScrollDepth(),
    },
  };

  if (DEBUG) {
    console.log("[analytics] track", event);
  }

  if (ENDPOINT) {
    enqueue(event);
  }
}

function getScrollDepth() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (!docHeight) return 0;
  return Math.min(100, Math.round((scrollTop / docHeight) * 100));
}

/**
 * Initialise the analytics queue. Safe to call multiple times.
 */
export function initAnalytics() {
  if (typeof window === "undefined") return;

  scheduleFlush();
  bindUnload();
  track("page_view", { title: document.title });
}

/**
 * Get a snapshot of the current queue for debugging / testing.
 */
export function getQueue() {
  return readQueue();
}
