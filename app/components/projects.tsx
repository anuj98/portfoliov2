"use client";

import { Project } from "@/app/db/models";
import styles from "@/app/components/projects.module.css";
import ProjectCard from "./projectCard";
import { useEffect, useRef, useState } from "react";

export default function ProjectsNew({ projects }: { projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Use a ref for the index so the interval always has the current value
  const currentIndexRef = useRef(0);

  const infiniteProjects = [...projects, ...projects, ...projects];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || projects.length === 0) return;

    const scrollNext = () => {
      const card = container.firstElementChild as HTMLElement;
      if (!card) return;

      const cardWidth = card.offsetWidth + 10;

      // 1. Increment the ref value
      currentIndexRef.current++;

      // 2. Calculate the next dot index
      const nextDotIndex = currentIndexRef.current % projects.length;
      setActiveIndex(nextDotIndex);

      // 3. Perform the scroll
      container.scrollTo({
        left: currentIndexRef.current * cardWidth,
        behavior: "smooth",
      });

      // 4. Handle the infinite reset
      if (currentIndexRef.current >= projects.length) {
        setTimeout(() => {
          currentIndexRef.current = 0;
          setActiveIndex(0);
          container.scrollTo({ left: 0, behavior: "auto" });
        }, 500); // Wait for smooth scroll to finish before jumping, keep this time same as transition style for dots
      }
    };

    const intervalId = setInterval(scrollNext, 3000);
    return () => clearInterval(intervalId);
  }, [projects.length]);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.title}>Personal Projects</div>

      <div
        ref={scrollRef}
        className={styles.scrollableContent}
      >
        {infiniteProjects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            style={{ flex: "0 0 auto", margin: "0 5px" }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* --- Progress Dots --- */}
      <div
        className={styles.scrollDotsWrapper}
      >
        {projects.map((project, index) => (
          <div
            key={`${index}-${project.id}`}
            className={styles.scrollDot}
            style={{
              width: activeIndex === index ? "24px" : "8px",
              backgroundColor: activeIndex === index ? "#10b981" : "#cbd5e1",
            }}
          />
        ))}
      </div>
    </section>
  );
}
