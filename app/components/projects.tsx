import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/db/models";
import styles from "@/app/components/projects.module.css";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.title}>Personal Projects</div>
      {projects.map((project, index) => {
        if (index % 2 == 0) {
          return (
            <Link
              href={project.link}
              key={project.id}
              className={styles.listItem}
            >
              <Image
                src={project.image_url}
                alt={project.name}
                width={500}
                height={300}
                className={`${styles.listItem__image}`}
              />
              <div className={`${styles.leftMargin} ${styles.listItem__text}`}>
                <div className={styles.listItem__name}>{project.name}</div>
                {project.summary}
                <div>
                  <strong>Technologies: </strong>
                  {project.technology}
                </div>
              </div>
            </Link>
          );
        } else {
          return (
            <Link
              href={project.link}
              key={project.id}
              className={styles.listItem}
            >
              <div className={styles.listItem__text}>
                <div className={styles.listItem__name}>{project.name}</div>
                {project.summary}
                <div>
                  <strong>Technologies: </strong>
                  {project.technology}
                </div>
              </div>
              <Image
                src={project.image_url}
                alt={project.name}
                width={500}
                height={300}
                className={`${styles.leftMargin} ${styles.listItem__image}`}
              />
            </Link>
          );
        }
      })}
    </section>
  );
}
