"use client";

import Link from "next/link";
// import Image from "next/image";
import React, { useState } from "react";
// import Logo from "./Logo";
import styles from "./navBar.module.css";

const MENU_LIST = [
  { text: "About", href: "/#about" },
  { text: "Experience", href: "/#experience" },
  { text: "Projects", href: "/#projects" }
];

export default function Navbar() {
  const [navActive, setNavActive] = useState<boolean | null>(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header className={styles.header}>
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
                className={`nav__item ${activeIdx === idx ? styles.active : ""}`}
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
