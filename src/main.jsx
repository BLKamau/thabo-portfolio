import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { initAnalytics, initWebVitals } from "./analytics";
import { injectStructuredData } from "./seo/structuredData";
import "./styles/global.css";

initAnalytics();
initWebVitals();
injectStructuredData();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
