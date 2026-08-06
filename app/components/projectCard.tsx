"use client";

import { useState } from "react";
import { useImageBrightness } from "../hooks/useImageBrightness";
import styles from "@/app/components/projectCard.module.css";
import { Project } from "../db/models";
import Button from "./button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  displayNumber: number;
}

export default function ProjectCard({
  project,
  index,
  displayNumber,
}: ProjectCardProps) {
  const [explore, setExplore] = useState<boolean>(false);
  const { isDark } = useImageBrightness(project.image_url);

  const technologies = project.technology
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  return (
    <section className={`${styles.justClass} ${styles.cardWrapper}`}>
      <div className={styles.explore_button}>
        <Button
          text={explore ? "Back" : "Explore"}
          title={explore ? "Click to go back" : "Click to explore"}
          isPrimary={true}
          onClick={() => setExplore((prev) => !prev)}
          className={isDark === false ? styles.btn_on_light : undefined}
        />
      </div>
      <div className={styles.card}>
        <div className={`${styles.front} ${explore ? styles.transform180 : ""}`}
        >
          <div className={styles.frontImageContainer}>
            <div
              className={`${styles.projectImage} ${styles.frontImageBg}`}
              style={{ backgroundImage: `url(${project.image_url})` }}
            ></div>
            {/* Overlay for text contrast */}
            <div
              className={`${styles.overlay} ${isDark === null ? styles.overlayDefault : isDark ? styles.overlayDark : styles.overlayLight}`}
            ></div>
          </div>
        </div>
        <div className={`${styles.back} ${explore ? styles.transform0 : ""}`}>
          <div
            style={{
              background: `url(${project.image_url}) center no-repeat`,
            }}
            className={`${styles.projectImage} ${styles.blur_effect}`}
          ></div>
          <span className={styles.backIndex} aria-hidden="true">
            {String(displayNumber).padStart(2, "0")}
          </span>
          <div className={`${styles.listItem__text} ${isDark ? styles.dynamicTextDark : styles.dynamicTextLight}`}>
            <div className={styles.projectName}>{project.name}</div>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.tagRow}>
              {technologies.map((tech) => (
                <span key={tech} className={styles.tagPill}>
                  {tech}
                </span>
              ))}
            </div>
            <div className={styles.linkRow}>
              <Link
                href={project.github}
                className={styles.iconLink}
                target="_blank"
                aria-label="View source code"
              >
                <GithubIcon size={14} />
                Source
              </Link>
              <Link
                href={project.link}
                className={styles.iconLink}
                target="_blank"
                aria-label="View live project"
              >
                <ExternalLink size={14} />
                Live
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
