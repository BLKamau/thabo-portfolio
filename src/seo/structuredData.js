import { site } from "../data/site";
import { caseStudies } from "../data/caseStudies";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author.name,
  givenName: site.author.givenName,
  familyName: site.author.familyName,
  jobTitle: site.author.role,
  alumniOf: site.author.degree,
  email: `mailto:${site.author.email}`,
  telephone: site.author.phone,
  url: site.url,
  image: `${site.url}${site.author.image}`,
  sameAs: site.author.sameAs,
  knowsAbout: site.author.knowsAbout,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.author.location.city,
    addressCountry: site.author.location.country,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  author: {
    "@type": "Person",
    name: site.author.name,
  },
};

function caseStudyToCreativeWork(study) {
  return {
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    url: `${site.url}/#case-studies/${study.id}`,
    about: study.tag,
    keywords: study.stack.join(", "),
  };
}

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: caseStudies.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: caseStudyToCreativeWork(study),
  })),
};

const schemas = [personSchema, websiteSchema, portfolioSchema];

/**
 * Serialise the JSON-LD schemas as a single script tag string.
 * Used for server-side rendering or static injection.
 */
export function renderStructuredData() {
  return `<script type="application/ld+json">${JSON.stringify(schemas)}</script>`;
}

/**
 * Inject the structured data into the document head if it is not already there.
 * Safe to call multiple times (React StrictMode, for example).
 */
export function injectStructuredData() {
  if (typeof document === "undefined") return;

  const id = "structured-data";
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = JSON.stringify(schemas);
  document.head.appendChild(script);
}
