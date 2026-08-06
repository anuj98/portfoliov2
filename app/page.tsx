import styles from "@/app/page.module.css";
import About from "@/app/components/about";
import Experience from "@/app/components/experience";
import Projects from "@/app/components/projects";
import Hobbies from "@/app/components/hobbies";
import Contacts from "@/app/components/contacts";
import ScrollReveal from "@/app/components/scrollReveal";
import {
  fetchExperience,
  fetchHobbies,
  fetchPersonalDetails,
  fetchProjects,
  fetchSkills,
} from "@/app/db/data";
import Skills from "@/app/components/skills";

export default async function Home() {
  const [personalDetails, hobbies, experienceList, projects, skills] =
    await Promise.all([
      fetchPersonalDetails(),
      fetchHobbies(),
      fetchExperience(),
      fetchProjects(),
      fetchSkills(),
    ]);

  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <main className={styles.main}>
      {/* Animated blob background */}
      <div className={styles.blobContainer} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>

      <div className={styles.contentWrapper}>
        <ScrollReveal>
          <About personalDetails={personalDetails} roles={personalDetails.summarised_roles} />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Skills skills={skills} />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Experience experiences={experienceList} />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Hobbies hobbies={hobbies} />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Projects projects={projects} />
        </ScrollReveal>
      </div>

      <Contacts
        gitHub={personalDetails.github}
        linkedIn={personalDetails.linkedin}
        email={personalDetails.email}
      />
      <footer className={styles.footer}>@{getCurrentYear()} anuju</footer>
    </main>
  );
}
