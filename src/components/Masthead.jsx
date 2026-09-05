import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import styles from "./Masthead.module.css";

const NAV_LINKS = [
  { label: "Dispatch", href: "#hero" },
  { label: "Field Specs", href: "#skills" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Transmit", href: "#contact" },
];

function useClock() {
  const [time, setTime] = useState(() => formatTime());
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function formatTime() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default function Masthead() {
  const time = useClock();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 80) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.masthead} ${hidden ? styles.mastheadHidden : ""}`}>
      <div className={`${styles.ticker} container`}>
        <span className={styles.tickerBadge}>
          <span className={styles.pulseDot} aria-hidden="true" />
          {profile.availability}
        </span>
        <span className={styles.tickerMeta}>
          {profile.volumeLine}
        </span>
        <span className={styles.tickerMeta}>
          {profile.timezone} &middot; {time}
        </span>
      </div>

      <hr className="hairline" />

      <div className={`${styles.titleRow} container`}>
        <div>
          <p className={styles.eyebrow}>{profile.role.toUpperCase()}</p>
          <h1 className={styles.title}>{profile.masthead}</h1>
          <p className={styles.deck}>
            Personal dossier of <strong>{profile.name}</strong>
          </p>
        </div>
        <a className={styles.cta} href="#contact">
          Transmit Inquiry
        </a>
      </div>

      <hr className="hairline" />

      <nav className={`${styles.nav} container`} aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
