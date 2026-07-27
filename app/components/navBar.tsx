"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "@/app/components/navBar.module.css";
import ThemeToggle from "@/app/components/themeToggle";

const MENU_LIST = [
  { text: "About", href: "/" },
  { text: "Experience", href: "/#experience" },
  { text: "Projects", href: "/#projects" },
  { text: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [navActive, setNavActive] = useState<boolean | null>(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  const close = () => setNavActive(false);

  return (
    <>
      {/* Backdrop — closes drawer on outside click */}
      {navActive && (
        <div className={styles.backdrop} onClick={close} aria-hidden="true" />
      )}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>AU</h1>
          </Link>
          <div className={styles.nav__actions}>
            <ThemeToggle />
            <button
              onClick={() => setNavActive(!navActive)}
              className={styles.nav__menubar}
              aria-label="Open menu"
              aria-expanded={!!navActive}
            >
              <div></div>
              <div></div>
              <div></div>
            </button>
          </div>
          <div
            className={`${navActive ? styles.active : ""} ${styles.nav__menulist}`}
          >
            <button
              className={styles.nav__closeBtn}
              onClick={close}
              aria-label="Close menu"
            >
              ✕
            </button>
            {MENU_LIST.map((menu, idx) => (
              <div
                onClick={() => {
                  setActiveIdx(idx);
                  close();
                }}
                key={menu.text}
              >
                <Link
                  className={`${styles.nav__item}${activeIdx === idx ? ` ${styles.active}` : ""}`}
                  href={menu.href}
                >
                  {menu.text}
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
