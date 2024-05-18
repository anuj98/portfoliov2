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
          src="https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/linkedin.svg"
          width={40}
          height={40}
        />
      </Link>
      <Link href={`mailto:${email}`} target="_blank" >
        <Image
          alt="email"
          className={styles.icon}
          src="https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/email.svg"
          width={40}
          height={40}
        />
      </Link>
      <Link href={linkedIn} target="_blank">
        <Image
          alt="GitHub"
          className={styles.icon}
          src="https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/github.svg"
          width={40}
          height={40}
        />
      </Link>
      <div className={styles.verticalLine}></div>
    </div>
  );
}
