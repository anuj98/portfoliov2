import Image from "next/image";
import styles from "@/app/components/hobbies.module.css";

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
    <div className={styles.hobbies__item}>
      <Image alt={alt} src={src} width={100} height={100} loading="lazy" />
      {text}
    </div>
  );
}
