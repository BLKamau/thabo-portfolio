import { profile } from "../data/profile";
import styles from "./QuickTransmit.module.css";

export default function QuickTransmit() {
  return (
    <div className={styles.widget}>
      <div className={styles.row}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{profile.availability}</span>
        <span className={styles.meta}>{profile.responseTime}</span>
      </div>
      <div className={styles.actions}>
        <a className={styles.primary} href={`mailto:${profile.email}`}>
          Transmit Inquiry
        </a>
        <a
          className={styles.secondary}
          href={profile.cvUrl}
          download="Thabo_Mantsima_CV.pdf"
        >
          Download CV
        </a>
        <a
          className={styles.secondary}
          href={profile.socials[0]?.url ?? "#"}
        >
          View GitHub
        </a>
      </div>
    </div>
  );
}
