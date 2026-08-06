import styles from "@/app/components/hobbies.module.css";
import Hobby from "@/app/components/hobby";
import { Hobby as HobbyDetails } from "@/app/db/models";

export default function Hobbies({ hobbies }: { hobbies: HobbyDetails[] }) {
  return (
    <section id="hobbies" className={styles.hobbies}>
      <h2 className={styles.sectionHeading}>
        // Things I do when I&apos;m bored
      </h2>

      <div className={styles.hobbies__list}>
        {hobbies.map((hobby) => (
          <Hobby
            key={hobby.id}
            alt={hobby.name}
            src={hobby.icon_url}
            text={hobby.name}
          />
        ))}
      </div>
    </section>
  );
}
