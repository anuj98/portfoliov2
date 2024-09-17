"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/app/components/projectCard.module.css";
import { Project } from "../db/models";
import Button from "./button";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  const [explore, setExplore] = useState<boolean>(false);
  return (
    <section className={`${styles.justClass} ${styles.cardWrapper}`}>
      <div className={styles.explore_button}>
        <Button
          text={explore ? "Back" : "Explore"}
          title={explore ? "Click to go back" : "Click to explore"}
          isPrimary={true}
          onClick={() => {
            if (explore) setExplore(false);
            else setExplore(true);
          }}
        />
      </div>
      <div className={styles.card}>
        <div
          className={`${styles.front} ${explore ? styles.transform180 : ""}`}
        >
          <div
            style={{
              background: `url(${project.image_url}) center no-repeat`,
              backgroundSize: "cover",
            }}
            className={styles.projectImage}
          ></div>
        </div>
        <div className={`${styles.back} ${explore ? styles.transform0 : ""}`}>
          <div
            style={{
              background: `url(${project.image_url}) center no-repeat`,
            }}
            className={`${styles.projectImage} ${styles.blur_effect}`}
          ></div>
          <div className={`${styles.listItem__text}`}>
            <div className={styles.projectName}>{project.name}</div>
            <div className="projectCard_project_redirections">
              {project.summary}
              <div>
                <strong>Technologies: </strong>
                {project.technology}
              </div>
              <div className={styles.project_redirections}>
                <Link
                  href={project.link}
                  className={styles.redirection_item}
                  target="_blank"
                >
                  <Image
                    src={
                      "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/redirect-icon.png"
                    }
                    alt={project.name}
                    width={30}
                    height={30}
                  />
                </Link>
                <Link
                  href={project.github}
                  className={styles.redirection_item}
                  target="_blank"
                >
                  <Image
                    src={
                      "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/github.svg"
                    }
                    alt={project.name}
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
