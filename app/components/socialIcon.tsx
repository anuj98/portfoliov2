import Link from "next/link";
import styles from "@/app/components/socialIcon.module.css";

export default function SocialIcon({
  href,
  label,
  icon,
  external = false,
  variant = "pill",
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  variant?: "pill" | "icon";
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`${styles.link} ${variant === "pill" ? styles.pill : styles.iconBox}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className={styles.iconWrapper}>{icon}</span>
      {variant === "pill" && <span className={styles.label}>{label}</span>}
    </Link>
  );
}
