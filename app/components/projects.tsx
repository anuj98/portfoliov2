import { Project } from "@/app/db/models";
import styles from "@/app/components/projects.module.css";
import ProjectCard from "./projectCard";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.title}>Personal Projects</div>
      <div className={styles.projectWrapper}>
        {projects.map((project, index) => {
          return <div key={index} className={styles.listItem}><ProjectCard project={project} /></div>;
        })}
      </div>
    </section>
  );
}
