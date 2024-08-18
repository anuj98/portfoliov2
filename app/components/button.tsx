"use client";

import styles from "@/app/components/button.module.css";

export default function Button({
  title,
  text,
  isPrimary,
  onClick,
}: {
  title: string;
  text: string;
  isPrimary: boolean,
  onClick?: () => void;
}) {
  return (
    <button
      className={`${styles.btnContainer} ${styles.slide}`}
      type="button"
      title={title}
      onClick={() => onClick?.()}
    >
      {text}
    </button>
  );
}
