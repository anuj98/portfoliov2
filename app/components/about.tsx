import Image from "next/image";
import Link from "next/link";
import styles from "@/app/components/about.module.css";
import Hobby from "@/app/components/hobby";
import { PersonalDetails, Hobby as HobbyDetails } from "@/app/db/models";

export default async function About({
  personalDetails,
  hobbies,
}: {
  personalDetails: PersonalDetails;
  hobbies: HobbyDetails[];
}) {
  const getHobbyItems = () => {
    return hobbies.map((hobby) => (
      <Hobby
        key={hobby.id}
        alt={hobby.name}
        src={hobby.icon_url}
        text={hobby.name}
      />
    ));
  };

  return (
    <section id="about" className={styles.about}>
      <div className={styles.about__intro}>
        <div className={styles.iconLeft}>
          <Image
            alt="Code start tag"
            src="code-start.svg"
            width={100}
            height={100}
          />
        </div>
        <div>
          <div className={styles.about__introGreet}>Hi! I am</div>
          <p className={styles.about__introName}>{personalDetails?.name}</p>
          <div className={styles.about__descriptionGreet}>
            {personalDetails?.summary}
          </div>
          <button
            className={`${styles.about__resume} ${styles.about__resumeSlide}`}
            type="button"
            title="Download Resume"
          >
            <Link
              href={{
                pathname: "/resume",
                query: { doc: personalDetails.resume_url },
              }}
            >
              Check out my resume!
            </Link>
          </button>
        </div>
        <div className={styles.iconRight}>
          <Image
            alt="Code end tag"
            src="code-end.svg"
            width={100}
            height={100}
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
