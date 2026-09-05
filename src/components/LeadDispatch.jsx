import { about } from "../data/about";
import BotswanaFlag from "./icons/BotswanaFlag";
import { profile } from "../data/profile";
import QuickTransmit from "./QuickTransmit";
import SkillsPanel from "./SkillsPanel";
import AuthorProfile from "./AuthorProfile";
import styles from "./LeadDispatch.module.css";

export default function LeadDispatch() {
  const [firstParagraph, ...restParagraphs] = about.paragraphs;

  return (
    <section id="hero" className={styles.section}>
      <div className={`${styles.grid} container`}>
        <div className={styles.lead}>
          <div className={styles.metaRow}>
            <span className={styles.dispatchLabel}>{about.dispatchLabel}</span>
            <span className={styles.readTime}>{about.readTime}</span>
          </div>

          <QuickTransmit />

          <h2 className={styles.headline}>{about.heading}</h2>
          <p className={styles.deck}>{about.deck}</p>

          <div className={`${styles.essay} text-columns`}>
            <p className={`${styles.paragraph} drop-cap`}>{firstParagraph}</p>
            {restParagraphs.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className={styles.pullQuote}>
            {about.pullQuote}
          </blockquote>

          <div className={styles.signature}>
            <span>{profile.role}</span>
            <span className={styles.dot} aria-hidden="true">
              &middot;
            </span>
            <span className={styles.locationRow}>
              <BotswanaFlag size={12} style={{ marginRight: "0.4em" }} />
              {profile.location}
            </span>
          </div>

          <a href="#case-studies" className={styles.continueLink}>
            Continue to case studies &rarr;
          </a>
        </div>

        <div className={styles.sidebar}>
          <AuthorProfile />
          <SkillsPanel />
        </div>
      </div>
    </section>
  );
}
