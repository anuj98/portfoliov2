import styles from "@/app/components/skills.module.css";
import { Skill } from "../db/models";

export default function Skills({ skills }: { skills: Skill[] }) {
  const getCategories = () => {
    let categories: string[] = skills.map((skill) => {
      return skill.category;
    });
    let uniqueCategoies = Array.from(new Set([...categories])) as string[];
    return uniqueCategoies;
  };

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.title}>Skills</div>
      <div className={styles.description}>
        {`Throughout my journey, I've been driven by a passion for learning and
        self-improvement. Here are some of the skills I've honed along the way.`}
      </div>
      <div className={styles.wrapper}>
        {getCategories().map((category, index) => {
          return (
            <div
              key={`skill-category-${index}`}
              className={styles.skillCategory_wrapper}
            >
              <div className={styles.skillCategory_title}>{category}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
