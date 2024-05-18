"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/app/components/navBar.module.css";

const MENU_LIST = [
  { text: "About", href: "/" },
  { text: "Experience", href: "#experience" },
  { text: "Projects", href: "#projects" },
];

export default function Navbar() {
  const [navActive, setNavActive] = useState<boolean | null>(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsSticky(window.scrollY >= 40);
    });
  });

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      <nav className={styles.nav}>
        <Link href="/">
          <h1 className={styles.logo}>AU</h1>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={styles.nav__menubar}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div
          className={`${navActive ? styles.active : ""} ${
            styles.nav__menulist
          }`}
        >
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <Link
                className={`nav__item ${
                  activeIdx === idx ? styles.active : ""
                }`}
                href={menu.href}
              >
                {menu.text}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}
