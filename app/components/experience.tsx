"use client";

import { useState, useRef } from "react";
import { Dialog } from "@/app/components/dialog";
import Button from "./button";
import styles from "@/app/components/experience.module.css";
import { Experience as ExperienceModel } from "../db/models";

interface ExperienceProps {
  experiences: ExperienceModel[];
}

export type Detail = {
  project_summary: string;
  work_done: string[];
  technology: string;
};

export function parseDetails(details: string): Detail[] {
  try {
    // Clean unwanted characters (optional but safer)
    const cleaned = details.replace(/\r\n/g, "").replace(/\n/g, "").trim();

    const parsed = JSON.parse(cleaned);

    // Ensure structure is valid
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => ({
      project_summary: item.project_summary || "",
      work_done: Array.isArray(item.work_done) ? item.work_done : [],
      technology: item.technology || "",
    }));
  } catch (error) {
    console.error("Invalid details JSON:", error);
    return [];
  }
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Experience({ experiences = [] }: ExperienceProps) {
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceModel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  // Group experiences by company
  const companies = Array.from(new Set(experiences.map((exp) => exp.company)));
  const activeCompany = companies[activeCompanyIndex];

  // Sort experiences by start date (newest first for display)
  const sortedExperiences = [...experiences]
    .filter((exp) => exp.company === activeCompany)
    .sort((a, b) => {
      const sd1 = new Date(a.start_date);
      const sd2 = new Date(b.start_date);
      return sd2.getTime() - sd1.getTime(); // Descending order (newest first)
    });

  const scrollTabs = (direction: "left" | "right") => {
    if (tabContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? tabContainerRef.current.scrollLeft - scrollAmount
          : tabContainerRef.current.scrollLeft + scrollAmount;

      tabContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const getDateRange = (startDate: string, endDate: string) => {
    const startDateObj = new Date(startDate);
    const formattedStartDate = `${
      MONTH_NAMES[startDateObj.getMonth()]
    } ${startDateObj.getFullYear()}`;

    const formattedEndDate =
      endDate.length === 0
        ? "Present"
        : `${MONTH_NAMES[new Date(endDate).getMonth()]} ${new Date(
            endDate
          ).getFullYear()}`;

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  const openExperienceDetails = (experience: ExperienceModel) => {
    console.log(experience);
    setSelectedExperience(experience);
    setIsDialogOpen(true);
  };

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.experience__title}>Experience</div>
      <div className={styles.experience__wrapper}>
        <div className={styles.experience__tab_navigation}>
          <button
            className={styles.experience__scroll_button}
            onClick={() => scrollTabs("left")}
          >
            {"<"}
          </button>
          <div
            className={styles.experience__tab_container}
            ref={tabContainerRef}
          >
            {companies.map((company, index) => (
              <button
                key={company}
                onClick={() => setActiveCompanyIndex(index)}
                className={`${styles.experience__tab_button} ${
                  index === activeCompanyIndex
                    ? styles.experience__tab_buttonActive
                    : ""
                }`}
              >
                <span>{company}</span>
              </button>
            ))}
          </div>
          <button
            className={styles.experience__scroll_button}
            onClick={() => scrollTabs("right")}
          >
            {">"}
          </button>
        </div>

        <div className={styles.experience__content}>
          <div className={styles.experience__content_list}>
            {sortedExperiences.map((experience, index) => (
              <div
                key={experience.id}
                className={styles.experience__content_list_item}
              >
                <div className={styles.experienceHeader}>
                  <div className={styles.experienceInfo}>
                    <h3 className={styles.jobTitle}>{experience.job_title}</h3>
                    <p className={styles.companyName}>{experience.company}</p>
                    <p className={styles.location}>{experience.location}</p>
                    <p className={styles.dateRange}>
                      {getDateRange(experience.start_date, experience.end_date)}
                    </p>
                  </div>
                  {experience.details && (
                    <div className={styles.viewDetailsButton}>
                      <Button
                        text="View details"
                        title="View experience details"
                        isPrimary={false}
                        onClick={() => openExperienceDetails(experience)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedExperience && (
        <Dialog.Root open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <Dialog.Header
            title={selectedExperience.job_title}
            subtitle={`${selectedExperience.company} • ${selectedExperience.location}`}
            meta={getDateRange(
              selectedExperience.start_date,
              selectedExperience.end_date
            )}
          />

          <Dialog.Divider label="DETAILS" />

          <Dialog.Content>
            {selectedExperience.details.length === 0 ? (
              <p>No details available</p>
            ) : (
              parseDetails(selectedExperience.details).map((d, index) => (
                <div key={index} className={styles.detailSection}>
                  <p className={styles.detailProject}>
                    <strong>Project:</strong> {d.project_summary}
                  </p>

                  <ul className={styles.detailWorkDone}>
                    {d.work_done.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>

                  <p className={styles.detailTechnology}>
                    <strong>Technology:</strong> {d.technology}
                  </p>
                </div>
              ))
            )}
          </Dialog.Content>

          <Dialog.Footer>
            <Dialog.Button onClick={() => setIsDialogOpen(false)}>
              Close
            </Dialog.Button>
          </Dialog.Footer>
        </Dialog.Root>
      )}
    </section>
  );
}
