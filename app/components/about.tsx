import Image from "next/image";
import styles from "./about.module.css";
import Hobby from "./hobby";

const HOBBY_LIST = [
  { alt: "Gaming hobby", src: "video-games.svg", text: "Gaming" },
  {
    alt: "Video editing hobby",
    src: "video-editing.svg",
    text: "Editing videos",
  },
  {
    alt: "E-sports hobby",
    src: "e-sports.svg",
    text: "Watching E-Sports events",
  },
  {
    alt: "Binge watch hobby",
    src: "tv-screen.svg",
    text: "Watching Podcasts/Netflix shows",
  },
];

export default function About() {
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
          <div className={styles.about__introGreet}>
            Hi! I am
          </div>
          <p className={styles.about__introName}>Anuj Upadhyaya</p>
          <div className={styles.about__descriptionGreet}>
            I am a Senior Software Engineer based in Hyderabad, TS, India, with
            a focus on both front-end and back-end development. My expertise
            lies in creating efficient and user-friendly web applications using
            ReactJS, Next.js, and .NET technologies.
          </div>
          <button
            className={`${styles.about__resume} ${styles.about__resumeSlide}`}
            type="button"
            title="Download Resume"
          >
            Check out my resume!
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
        <div className={styles.about__hobbiesList}>
          {HOBBY_LIST.map((hobby) => (
            <Hobby key={hobby.text} {...hobby} />
          ))}
        </div>
      </div>
    </section>
  );
}
