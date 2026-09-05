import { profile } from "../data/profile";
import BotswanaFlag from "./icons/BotswanaFlag";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div>
          <h3 className={styles.title}>{profile.masthead}</h3>
          <p className={styles.desc}>
            An ongoing dossier of mechatronics, embedded systems, and backend
            engineering work.
          </p>
        </div>
        <div className={styles.meta}>
          <p className={styles.location}>
            <BotswanaFlag size={14} style={{ marginRight: "0.4em" }} />
            {profile.location}
          </p>
          <p className={styles.copyright}>
            &copy; {year} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
