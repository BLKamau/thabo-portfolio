import { profile } from "../data/profile";
import { track } from "../analytics";
import styles from "./TransmissionDesk.module.css";

function handleCta(name, href) {
  return () => {
    const isOutbound = href.startsWith("http");
    track(name, { href, outbound: isOutbound, location: "transmission_desk" });
  };
}

export default function TransmissionDesk() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={`${styles.grid} container`}>
        <div>
          <p className="mono-label">OFFICIAL TRANSMISSION DESK</p>
          <h2 id="contact-heading" className={styles.heading}>Open to Freelance Work</h2>
          <p className={styles.body}>
            Currently taking on backend, systems-integration, and embedded
            engineering work — briefs, consulting, and collaborations
            welcome.
          </p>
          <a
            className={styles.emailCta}
            href={`mailto:${profile.email}`}
            onClick={handleCta("cta_email", `mailto:${profile.email}`)}
          >
            {profile.email}
          </a>
        </div>

        <div className={styles.panel}>
          <p className={styles.panelLabel}>PUBLIC CHANNELS</p>
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              className={styles.row}
              onClick={handleCta(`cta_social_${s.label.toLowerCase()}`, s.url)}
            >
              <span>{s.label}</span>
              <span className={styles.rowValue}>{s.handle}</span>
            </a>
          ))}
          <a
            href={profile.cvUrl}
            className={styles.row}
            download="Thabo_Mantsima_CV.pdf"
            onClick={handleCta("cta_download_cv", profile.cvUrl)}
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
