import { useEffect } from "react";
import styles from "./CaseStudyDrawer.module.css";

export default function CaseStudyDrawer({ study, onClose }) {
  useEffect(() => {
    if (!study) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [study, onClose]);

  const isOpen = Boolean(study);

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.open : ""}`}
      aria-hidden={!isOpen}
    >
      <div className={styles.backdrop} onClick={onClose} />
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
        {study && (
          <>
            <div className={styles.header}>
              <div>
                <p className={styles.tag}>{study.tag}</p>
                <h3 className={styles.title}>{study.title}</h3>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close dossier"
              >
                &times;
              </button>
            </div>

            <div className={styles.statusRow}>
              <span className={styles.statusDot} aria-hidden="true" />
              {study.status}
            </div>

            <div className={styles.body}>
              {study.body.map((paragraph, i) => (
                <p key={i} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}

              <p className={styles.subhead}>KEY POINTS</p>
              <ul className={styles.highlights}>
                {study.highlights.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <p className={styles.subhead}>STACK</p>
              <div className={styles.stack}>
                {study.stack.map((item) => (
                  <span key={item} className={styles.stackChip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <button type="button" className={styles.closeBottom} onClick={onClose}>
              Close Dossier
            </button>
          </>
        )}
      </div>
    </div>
  );
}
