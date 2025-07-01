import styles from "@/app/page.module.css";
import About from "@/app/components/about";
import Experience from "@/app/components/experience";
import Projects from "@/app/components/projects";
import Contacts from "@/app/components/contacts";
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
      <div className={styles.contentWrapper}>
        <About personalDetails={personalDetails} hobbies={hobbies} />
        <Skills skills={skills} />
        <Experience experienceList={experienceList} />
        <Projects projects={projects} />
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
