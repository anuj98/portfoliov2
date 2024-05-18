import styles from "@/app/components/contacts.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Contacts({
  gitHub,
  linkedIn,
  email,
}: {
  gitHub: string;
  linkedIn: string;
  email: string;
}) {
  return (
    <div className={styles.contacts}>
      <Link href={gitHub} target="_blank">
        <Image
          alt="linkedin"
          className={styles.icon}
          src="linkedin.svg"
          width={30}
          height={30}
        />
      </Link>
      <Link href={`mailto:${email}`} target="_blank" >
        <Image
          alt="email"
          className={styles.icon}
          src="email.svg"
          width={30}
          height={30}
        />
      </Link>
      <Link href={linkedIn} target="_blank">
        <Image
          alt="GitHub"
          className={styles.icon}
          src="github.svg"
          width={30}
          height={30}
        />
      </Link>
      <div className={styles.verticalLine}></div>
    </div>
  );
}
