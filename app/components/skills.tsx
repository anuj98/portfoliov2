"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "@/app/components/skills.module.css";
import { Skill } from "@/app/db/models";

function SkillBar({
  name,
  rating,
  delay,
}: {
  name: string;
  rating: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const pct = Math.round((rating / 5) * 100);

  return (
    <div ref={ref} className={styles.skillBar}>
      <div className={styles.skillBarHeader}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillPercent}>{pct}%</span>
      </div>
      <div className={styles.skillTrack}>
        <motion.div
          className={styles.skillFill}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        >
          <span className={styles.skillDot} />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  function getCategories() {
    let categories: string[] = skills.map((skill) => {
      return skill.category;
    });
    let uniqueCategories = Array.from(new Set([...categories])) as string[];
    return uniqueCategories;
  }

  function getSubCategories(category: string) {
    let subCategories = skills
      .filter((skill) => skill.category === category)
      .map((skill) => skill.subcategory);
    let uniqueSubCategories = Array.from(
      new Set([...subCategories])
    ) as string[];
    return uniqueSubCategories;
  }

  function renderSubCategory(category: string, subCategory: string) {
    let requiredSkills = skills.filter(
      (skill) =>
        skill.category === category && skill.subcategory === subCategory
    );
    return (
      <>
        <div className={styles.skillSubCategory_title}>{subCategory}</div>
        <div>
          {requiredSkills.map((skill, index) => (
            <SkillBar
              key={skill.id}
              name={skill.name}
              rating={skill.rating}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.sectionLabel}>
        <span className={styles.sectionLabelGlyph}>{">"}</span>
        <span className={styles.sectionLabelText}>Skills &amp; Expertise</span>
        <span className={styles.sectionLabelLine} />
      </div>

      <h2 className={styles.heading}>What I work with</h2>
      <p className={styles.description}>
        {`Throughout my journey, I've been driven by a passion for learning and
        self-improvement. Here are some of the skills I've honed along the way.`}
      </p>

      <div className={styles.wrapper}>
        {getCategories().map((category, index) => {
          return (
            <div
              key={`skill-category-${index}`}
              className={styles.skillCategory_wrapper}
            >
              <div className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.skillCategory_title}>{category}</div>
              <>
                {getSubCategories(category).map((subCategory) => {
                  return (
                    <div
                      key={`${category}-${subCategory}`}
                      className={styles.skillSubCategory_wrapper}
                    >
                      {renderSubCategory(category, subCategory)}
                    </div>
                  );
                })}
              </>
            </div>
          );
        })}
      </div>
    </section>
  );
}
