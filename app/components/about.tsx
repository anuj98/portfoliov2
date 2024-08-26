"use client";

import Image from "next/image";
import styles from "@/app/components/about.module.css";
import Hobby from "@/app/components/hobby";
import { PersonalDetails, Hobby as HobbyDetails } from "@/app/db/models";
import Button from "./button";

export default function About({
  personalDetails,
  hobbies,
}: {
  personalDetails: PersonalDetails;
  hobbies: HobbyDetails[];
}) {
  function getHobbyItems() {
    return hobbies.map((hobby) => (
      <Hobby
        key={hobby.id}
        alt={hobby.name}
        src={hobby.icon_url}
        text={hobby.name}
      />
    ));
  }

  return (
    <section id="about" className={styles.about}>
      <div className={styles.about__intro}>
        <div className={styles.image_container}>
          <Image
            src="/IMG_2403_change.jpg"
            alt="Anuj's profile image"
            height={200}
            width={200}
            style={{
              borderRadius: "50%",
              boxShadow: "2px 2px 10px 2px rgb(136, 136, 136)",
            }}
          />
        </div>
        <div className={styles.about__intro_details}>
          <div className={styles.about__introGreet}>Hi! I am</div>
          <p className={styles.about__introName}>{personalDetails?.name}</p>
          <div className={styles.about__descriptionGreet}>
            {personalDetails?.summary}
          </div>
          <Button
            text="Check out my resume!"
            title="Downloa Resume"
            isPrimary={false}
            onClick={() => {
              window.location.href = personalDetails.resume_url;
            }}
          />
        </div>
      </div>
      <div className={styles.about__hobbies}>
        <p className={styles.about__hobbiesTitle}>
          Few things that I like to do when I am bored:
        </p>
        <div className={styles.about__hobbiesList}>{getHobbyItems()}</div>
      </div>
    </section>
  );
}
