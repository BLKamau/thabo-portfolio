import styles from "./SkillBar.module.css";

export default function SkillBar({ label, detail, level }) {
  return (
    <div className={styles.row}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        <span className={styles.level}>{level}%</span>
      </div>
      <p className={styles.detail}>{detail}</p>
      <div
        className={styles.track}
        role="img"
        aria-label={`${label}: ${level} percent`}
      >
        <div className={styles.fill} style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}
