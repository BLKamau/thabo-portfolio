import { profile } from "../data/profile";
import styles from "./AuthorProfile.module.css";

export default function AuthorProfile() {
  return (
    <aside className={styles.author} aria-labelledby="author-heading">
      <p id="author-heading" className={styles.authorLabel}>ABOUT THE AUTHOR</p>
      <div className={styles.authorCard}>
        <img
          className={styles.authorPhoto}
          src="/profile-200.jpg"
          alt={`Portrait of ${profile.name}`}
          width="80"
          height="80"
          loading="lazy"
        />
        <div className={styles.authorInfo}>
          <p className={styles.authorName}>{profile.name}</p>
          <p className={styles.authorRole}>{profile.role}</p>
          <p className={styles.authorDegree}>{profile.degree}</p>
          <a className={styles.authorPhone} href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            {profile.phone}
          </a>
        </div>
      </div>
    </aside>
  );
}
