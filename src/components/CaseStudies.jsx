import { useState } from "react";
import { caseStudies } from "../data/caseStudies";
import { track } from "../analytics";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyDrawer from "./CaseStudyDrawer";
import styles from "./CaseStudies.module.css";

export default function CaseStudies() {
  const [openStudy, setOpenStudy] = useState(null);

  const handleOpen = (study) => {
    setOpenStudy(study);
    track("case_study_open", { id: study.id, title: study.title });
  };

  const handleClose = () => {
    if (openStudy) {
      track("case_study_close", { id: openStudy.id });
    }
    setOpenStudy(null);
  };

  return (
    <section id="case-studies" className={styles.section} aria-labelledby="case-studies-heading">
      <div className="container">
        <div className={styles.headRow}>
          <p className="mono-label">SECTION II // REPOSITORY</p>
          <h2 id="case-studies-heading" className={styles.heading}>Selected Case Studies</h2>
        </div>

        <div className={styles.grid} role="list" aria-label="Selected case studies">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              onOpen={() => handleOpen(study)}
            />
          ))}
        </div>
      </div>

      <CaseStudyDrawer study={openStudy} onClose={handleClose} />
    </section>
  );
}
