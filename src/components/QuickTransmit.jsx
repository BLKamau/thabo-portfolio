import { profile } from "../data/profile";
import { track } from "../analytics";
import styles from "./QuickTransmit.module.css";

function handleCta(name, href) {
  return () => {
    const isOutbound = href.startsWith("http");
    track(name, { href, outbound: isOutbound, location: "quick_transmit" });
  };
}

export default function QuickTransmit() {
  return (
    <nav className={styles.widget} aria-label="Quick transmit actions">
      <div className={styles.row}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{profile.availability}</span>
        <span className={styles.meta}>{profile.responseTime}</span>
      </div>
      <div className={styles.actions}>
        <a
          className={styles.primary}
          href={`mailto:${profile.email}`}
          onClick={handleCta("cta_email", `mailto:${profile.email}`)}
        >
          Transmit Inquiry
        </a>
        <a
          className={styles.secondary}
          href={profile.cvUrl}
          download="Thabo_Mantsima_CV.pdf"
          onClick={handleCta("cta_download_cv", profile.cvUrl)}
        >
          Download CV
        </a>
        <a
          className={styles.secondary}
          href={profile.socials[0]?.url ?? "#"}
          onClick={handleCta("cta_github", profile.socials[0]?.url ?? "#")}
        >
          View GitHub
        </a>
      </div>
    </nav>
  );
}
