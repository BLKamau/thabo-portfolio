import { about } from "../data/about";
import BotswanaFlag from "./icons/BotswanaFlag";
import { profile } from "../data/profile";
import { site } from "../data/site";
import { track } from "../analytics";
import QuickTransmit from "./QuickTransmit";
import SkillsPanel from "./SkillsPanel";
import AuthorProfile from "./AuthorProfile";
import styles from "./LeadDispatch.module.css";

export default function LeadDispatch() {
  const [firstParagraph, ...restParagraphs] = about.paragraphs;

  return (
    <section id="hero" className={styles.section} aria-label="Lead dispatch">
      <div className={`${styles.grid} container`}>
        <article className={styles.lead}>
          <header className={styles.metaRow}>
            <span className={styles.dispatchLabel}>{about.dispatchLabel}</span>
            <span className={styles.readTime}>{about.readTime}</span>
          </header>

          <QuickTransmit />

          <h1 className={styles.headline}>{about.heading}</h1>
          <p className={styles.deck}>{about.deck}</p>

          <div className={`${styles.essay} text-columns`}>
            <p className={`${styles.paragraph} drop-cap`}>{firstParagraph}</p>
            {restParagraphs.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className={styles.pullQuote} cite={site.url}>
            {about.pullQuote}
          </blockquote>

          <footer className={styles.signature}>
            <span>{profile.role}</span>
            <span className={styles.dot} aria-hidden="true">
              &middot;
            </span>
            <span className={styles.locationRow}>
              <BotswanaFlag size={12} style={{ marginRight: "0.4em" }} />
              {profile.location}
            </span>
          </footer>

          <a
            href="#case-studies"
            className={styles.continueLink}
            onClick={() => track("nav_click", { label: "Continue to case studies", href: "#case-studies", location: "lead_dispatch" })}
          >
            Continue to case studies &rarr;
          </a>
        </article>

        <div className={styles.sidebar}>
          <AuthorProfile />
          <SkillsPanel />
        </div>
      </div>
    </section>
  );
}
