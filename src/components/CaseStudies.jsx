import { useState } from "react";
import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyDrawer from "./CaseStudyDrawer";
import styles from "./CaseStudies.module.css";

export default function CaseStudies() {
  const [openStudy, setOpenStudy] = useState(null);

  return (
    <section id="case-studies" className={styles.section}>
      <div className="container">
        <div className={styles.headRow}>
          <p className="mono-label">SECTION II // REPOSITORY</p>
          <h2 className={styles.heading}>Selected Case Studies</h2>
        </div>

        <div className={styles.grid}>
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              onOpen={() => setOpenStudy(study)}
            />
          ))}
        </div>
      </div>

      <CaseStudyDrawer study={openStudy} onClose={() => setOpenStudy(null)} />
    </section>
  );
}
