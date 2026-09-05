import { profile } from "../data/profile";
import styles from "./TransmissionDesk.module.css";

export default function TransmissionDesk() {
  return (
    <section id="contact" className={styles.section}>
      <div className={`${styles.grid} container`}>
        <div>
          <p className="mono-label">OFFICIAL TRANSMISSION DESK</p>
          <h2 className={styles.heading}>Open to Freelance Work</h2>
          <p className={styles.body}>
            Currently taking on backend, systems-integration, and embedded
            engineering work — briefs, consulting, and collaborations
            welcome.
          </p>
          <a className={styles.emailCta} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>

        <div className={styles.panel}>
          <p className={styles.panelLabel}>PUBLIC CHANNELS</p>
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} className={styles.row}>
              <span>{s.label}</span>
              <span className={styles.rowValue}>{s.handle}</span>
            </a>
          ))}
          <a
            href={profile.cvUrl}
            className={styles.row}
            download="Thabo_Mantsima_CV.pdf"
          >
            <span>Curriculum Vitae</span>
            <span className={styles.rowValue}>Download</span>
          </a>
        </div>

        <div className={styles.panel}>
          <p className={styles.panelLabel}>AVAILABILITY</p>
          <div className={styles.row}>
            <span>Status</span>
            <span className={styles.rowValueAccent}>Open</span>
          </div>
          <div className={styles.row}>
            <span>Response time</span>
            <span className={styles.rowValue}>~24h</span>
          </div>
          <div className={styles.row}>
            <span>Timezone</span>
            <span className={styles.rowValue}>{profile.timezone}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
