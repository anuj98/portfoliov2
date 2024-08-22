"use client";

import { useState, useEffect } from "react";
import styles from "@/app/components/experience.module.css";
import { Experience as ExperienceModel, Detail } from "@/app/db/models";

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

export default function Experience({
  experienceList,
}: {
  experienceList: ExperienceModel[];
}) {
  const [selectedTabId, setSelectedTabId] = useState("");

  function sortExperience() {
    return experienceList.sort((a, b) => {
      const sd1 = new Date(a.start_date);
      const sd2 = new Date(b.start_date);
      return sd2.getTime() - sd1.getTime();
    });
  }

  useEffect(() => {
    const list = sortExperience();
    if (list.length > 0) setSelectedTabId(list[0].id);
  }, [experienceList]);

  function getDateRange(startDate: string, endDate: string) {
    const startDateObj = new Date(startDate);

    const formattedStartDateObj = `${
      MONTH_NAMES[startDateObj.getMonth()]
    } ${startDateObj.getFullYear()}`;

    let formattedEndDateObj;
    if (endDate.length === 0) {
      formattedEndDateObj = "Present";
    } else {
      const endDateObj = new Date(endDate);
      formattedEndDateObj = `${
        MONTH_NAMES[endDateObj.getMonth()]
      } ${endDateObj.getFullYear()}`;
    }

    return `${formattedStartDateObj} - ${formattedEndDateObj}`;
  }

  const getExperienceDetails = () => {
    const selectedExperience = experienceList.find(
      (experience) => experience.id === selectedTabId
    );
    if (selectedExperience && selectedExperience.details.length > 0) {
      const details: Detail[] = JSON.parse(selectedExperience.details);
      return details.map((detail) => {
        return (
          <div
            key={detail.project_summary}
            className={styles.experience__detail}
          >
            <div className={styles.projectSummary}>
              {detail.project_summary}
            </div>
            <ul className={styles.workDone}>
              {detail.work_done.map((work) => (
                <li key={`${detail.project_summary} ${work}`}>{work}</li>
              ))}
            </ul>
            <div className={styles.technology}>
              <strong>Technology: </strong>
              {detail.technology}
            </div>
          </div>
        );
      });
    }
    return <></>;
  };

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.experience__title}>Experience</div>
      {/* For tabs */}
      <div className={styles.experience__wrapper}>
        <div className={styles.experience__list}>
          {sortExperience().map((experience) => (
            <div
              key={experience.id}
              className={`${styles.experiece__listItem} ${
                selectedTabId === experience.id
                  ? styles.experience__listItemSelected
                  : ""
              }`}
              onClick={() => setSelectedTabId(experience.id)}
            >
              <div>{experience.company}</div>
              <div>{experience.job_title}</div>
              <div className={styles.experiece__listItemDate}>
                {getDateRange(experience.start_date, experience.end_date)}
              </div>
            </div>
          ))}
        </div>
        {/* For tab content */}
        <div className={styles.experience__detailWrapper}>
          {getExperienceDetails()}
        </div>
      </div>
    </section>
  );
}
