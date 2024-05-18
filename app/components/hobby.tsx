import Image from "next/image";
import styles from "@/app/components/about.module.css";

export default function Hobby({
  alt,
  src,
  text,
}: {
  alt: string;
  src: string;
  text: string;
}) {
  return (
    <div className={styles.about__hobbiesItem}>
      <Image alt={alt} src={src} width={100} height={100} />
      {text}
    </div>
  );
}
