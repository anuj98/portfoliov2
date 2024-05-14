import styles from "./page.module.css";
import Navbar from "./components/navBar";
import About from "./components/about";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <About />
    </main>
  );
}
