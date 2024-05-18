import styles from "@/app/page.module.css";
import Navbar from "@/app/components/navBar";
import About from "@/app/components/about";
import Experience from "@/app/components/experience";
import Projects from "@/app/components/projects";
import Contacts from "@/app/components/contacts";
import {
  fetchExperience,
  fetchHobbies,
  fetchPersonalDetails,
  fetchProjects,
} from "@/app/db/data";

export default async function Home() {
  const [personalDetails, hobbies, experienceList, projects] =
    await Promise.all([
      fetchPersonalDetails(),
      fetchHobbies(),
      fetchExperience(),
      fetchProjects(),
    ]);

  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <About personalDetails={personalDetails} hobbies={hobbies} />
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
