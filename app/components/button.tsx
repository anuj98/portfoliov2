"use client";

import styles from "@/app/components/button.module.css";

export default function Button({
  title,
  text,
  isPrimary,
  onClick,
  className,
}: {
  title: string;
  text: string;
  isPrimary: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={`${styles.btnContainer} ${styles.slide}${className ? ` ${className}` : ""}`}
      type="button"
      title={title}
      onClick={() => onClick?.()}
    >
      {text}
    </button>
  );
}
