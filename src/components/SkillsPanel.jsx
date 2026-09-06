import { softwareSkills, hardwareSkills } from "../data/skills";
import SkillBar from "./SkillBar";
import styles from "./SkillsPanel.module.css";

function SkillGroup({ title, skills }) {
  return (
    <div className={styles.group}>
      <p className={styles.groupTitle}>{title}</p>
      {skills.map((skill) => (
        <SkillBar key={skill.label} {...skill} />
      ))}
    </div>
  );
}

export default function SkillsPanel() {
  return (
    <aside id="skills" className={styles.panel} aria-labelledby="skills-heading">
      <p id="skills-heading" className="mono-label">FIELD SPECIFICATIONS // SPEC. 01-A</p>
      <SkillGroup title="SOFTWARE" skills={softwareSkills} />
      <SkillGroup title="HARDWARE" skills={hardwareSkills} />

      <div className={styles.statusWidget}>
        <div className={styles.statusRow}>
          <span className={styles.statusLabel}>CAPACITY STATUS</span>
          <span className={styles.statusValue}>OPEN FOR PROJECTS</span>
        </div>
        <div className={styles.capacityTrack}>
          <div className={styles.capacityFill} style={{ width: "70%" }} />
        </div>
      </div>

    </aside>
  );
}
