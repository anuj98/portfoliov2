"use client";

import {
  ReactNode,
  useEffect,
  createContext,
  useContext,
} from "react";
import styles from "./dialog.module.css";

/* =========================
   Context (optional future use)
========================= */
const DialogContext = createContext<{ onClose?: () => void }>({});

function useDialog() {
  return useContext(DialogContext);
}

/* =========================
   Root Component
========================= */
function Root({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ onClose }}>
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.dialog}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
}

/* =========================
   Header
========================= */
function Header({
  title,
  subtitle,
  meta,
  showClose = true,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  showClose?: boolean;
}) {
  const { onClose } = useDialog();

  return (
    <>
      {showClose && onClose && (
        <button className={styles.closeIcon} onClick={onClose}>
          ×
        </button>
      )}

      <h2 className={styles.title}>{title}</h2>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {meta && <p className={styles.meta}>{meta}</p>}
    </>
  );
}

/* =========================
   Divider
========================= */
function Divider({ label }: { label?: string }) {
  return (
    <div className={styles.divider}>
      {label && <span>{label}</span>}
    </div>
  );
}

/* =========================
   Content
========================= */
function Content({ children }: { children: ReactNode }) {
  return <div className={styles.content}>{children}</div>;
}

/* =========================
   Footer
========================= */
function Footer({ children }: { children: ReactNode }) {
  return <div className={styles.footer}>{children}</div>;
}

/* =========================
   Button
========================= */
function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

/* =========================
   Export (Single Object)
========================= */
export const Dialog = {
  Root,
  Header,
  Divider,
  Content,
  Footer,
  Button,
};