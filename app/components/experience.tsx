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
  const [selectedTab, setSelectedTab] = useState<{
    id: string;
    index: number;
  }>({ id: "", index: 0 });

  function sortExperience() {
    return experienceList.sort((a, b) => {
      const sd1 = new Date(a.start_date);
      const sd2 = new Date(b.start_date);
      return sd1.getTime() - sd2.getTime();
    });
  }

  useEffect(() => {
    const list = sortExperience();
    if (list.length > 0)
      setSelectedTab({ id: list[list.length - 1].id, index: list.length - 1 });
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

  const renderExperienceDetails = () => {
    const selectedExperience = experienceList.find(
      (experience) => experience.id === selectedTab.id
    );
    if (selectedExperience && selectedExperience.details.length > 0) {
      const details: Detail[] = JSON.parse(selectedExperience.details);
      return (
        <div className={styles.experience__detail_wrapper}>
          {details.map((detail) => {
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
          })}
        </div>
      );
    }
    return <></>;
  };

  function renderCheckMark() {
    return (
      <span className={styles.checkmark}>
        <div className={styles.checkmark_stem}></div>
        <div className={styles.checkmark_kick}></div>
      </span>
    );
  }

  function renderExperienceTimeline() {
    const data = sortExperience();
    return (
      <div className={styles.experience__timeline}>
        {data.map((experience, index) => (
          <div key={experience.id} className={styles.level}>
            <div
              className={`${styles.line} ${
                index <= selectedTab.index
                  ? styles.line_dark
                  : styles.line_light
              }`}
            ></div>
            <div className={styles.timeline_point}>
              <div className={styles.timeline_detail}>
                <p>{experience.company}</p>
                <p>{experience.job_title}</p>
                <p>
                  {getDateRange(experience.start_date, experience.end_date)}
                </p>
              </div>
              <div
                className={`${styles.circle} ${
                  index <= selectedTab.index
                    ? styles.circle_dark
                    : styles.circle_light
                }`}
                onClick={() =>
                  setSelectedTab({ id: experience.id, index: index })
                }
              >
                <div
                  className={`${
                    selectedTab.id === experience.id ? styles.inner_circle : ""
                  }`}
                ></div>
                {index < selectedTab.index ? renderCheckMark() : <></>}
              </div>
            </div>
          </div>
        ))}
        <div className={styles.line_dotted}></div>
      </div>
    );
  }

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.experience__title}>Experience</div>
      {/* For tabs */}
      <div className={styles.experience__wrapper}>
        {renderExperienceTimeline()}
        {/* For tab content */}
        {renderExperienceDetails()}
      </div>
    </section>
  );
}
