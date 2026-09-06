import styles from "./CaseStudyCard.module.css";

export default function CaseStudyCard({ study, onOpen }) {
  return (
    <article className={styles.card} role="listitem">
      <div className={styles.head}>
        <span className={styles.number}>DISPATCH {study.number}</span>
        <span className={styles.tag}>{study.tag}</span>
      </div>
      <h3 className={styles.title}>{study.title}</h3>
      <p className={styles.summary}>{study.summary}</p>
      <div className={styles.stack}>
        {study.stack.slice(0, 3).map((item) => (
          <span key={item} className={styles.stackChip}>
            {item}
          </span>
        ))}
      </div>
      <button type="button" className={styles.inspect} onClick={onOpen} aria-label={`Inspect ${study.title} dossier`}>
        Inspect Dossier &rarr;
      </button>
    </article>
  );
}
