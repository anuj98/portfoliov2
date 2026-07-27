import styles from "@/app/components/contacts.module.css";
import Link from "next/link";
import Image from "next/image";

const ICONS = [
  {
    href: (linkedIn: string) => linkedIn,
    alt: "linkedin",
    src: "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/linkedin.svg",
  },
  {
    href: (email: string) => `mailto:${email}`,
    alt: "email",
    src: "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/email.svg",
  },
  {
    href: (gitHub: string) => gitHub,
    alt: "GitHub",
    src: "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/github.svg",
  },
];

export default function Contacts({
  gitHub,
  linkedIn,
  email,
}: {
  gitHub: string;
  linkedIn: string;
  email: string;
}) {
  const hrefs = [linkedIn, email, gitHub];

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <div className={styles.contacts}>
        {ICONS.map((icon, i) => (
          <Link key={icon.alt} href={hrefs[i]} target="_blank">
            <Image
              alt={icon.alt}
              className={styles.icon}
              src={icon.src}
              width={40}
              height={40}
              loading="lazy"
            />
          </Link>
        ))}
        <div className={styles.verticalLine} />
      </div>

      {/* Mobile: horizontal row in page flow */}
      <div className={styles.contactsMobile}>
        {ICONS.map((icon, i) => (
          <Link key={icon.alt} href={hrefs[i]} target="_blank">
            <Image
              alt={icon.alt}
              className={styles.icon}
              src={icon.src}
              width={40}
              height={40}
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
