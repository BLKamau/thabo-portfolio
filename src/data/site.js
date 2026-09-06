// Single source of truth for SEO / site metadata.
// This is used by the structured-data helper and the sitemap generator.

export const site = {
  name: "The Systems Dispatch",
  tagline: "Portfolio of Thabo Mantsima",
  url: "https://thabo-portfolio-beta.vercel.app/",
  locale: "en_GB",
  author: {
    name: "Thabo Mantsima",
    givenName: "Thabo",
    familyName: "Mantsima",
    role: "Mechatronics Engineer & Backend Developer",
    degree: "BEng Mechatronics & Industrial Instrumentation",
    email: "mantsimat@gmail.com",
    phone: "+267---",
    location: {
      city: "Gaborone",
      country: "Botswana",
    },
    image: "/profile-200.jpg",
    sameAs: [
      "https://github.com/BLKamau",
      "https://linkedin.com/in/thabo-mantsima",
    ],
    knowsAbout: [
      "Mechatronics",
      "Backend Engineering",
      "Embedded Systems",
      "Industrial Instrumentation",
      "Machine Learning",
      "Systems Integration",
      "Django",
      "Python",
      "React",
    ],
  },
  socials: {
    github: "https://github.com/BLKamau",
    linkedin: "https://linkedin.com/in/thabo-mantsima",
  },
  pages: [
    { path: "/", priority: 1.0, changefreq: "monthly" },
  ],
};
