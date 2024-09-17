"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Project } from "@/app/db/models";
import styles from "@/app/components/projects.module.css";
import ProjectCard from "./projectCard";

export default function Projects({ projects }: { projects: Project[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.title}>Personal Projects</div>
      <Slider {...settings}>
        {projects.map((project, index) => {
          return (
            <div className={styles.projectWrapper} key={index}>
              <div className={styles.listItem}>
                <ProjectCard project={project} />
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
