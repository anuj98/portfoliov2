"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import styles from "@/app/components/about.module.css";
import Hobby from "@/app/components/hobby";
import { PersonalDetails, Hobby as HobbyDetails } from "@/app/db/models";
import Button from "./button";

const ParticleScene = dynamic(() => import("./particleScene"), { ssr: false });

const ROLES = [
  "Senior Software Engineer",
  "React & Next.js Developer",
  ".NET Specialist",
  "Full-Stack Builder",
];

function TypewriterText({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60
      );
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        35
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, deleting, index, phrases]);

  return (
    <span className={styles.typewriter}>
      {displayed}
      <span className={styles.typewriterCursor} aria-hidden="true">
        |
      </span>
    </span>
  );
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return { first: "", last: name.trim() };
  return {
    first: parts.slice(0, -1).join(" "),
    last: parts[parts.length - 1],
  };
}

export default function About({
  personalDetails,
  hobbies,
}: {
  personalDetails: PersonalDetails;
  hobbies: HobbyDetails[];
}) {
  const { first, last } = splitName(personalDetails?.name ?? "");

  const socials = [
    {
      label: "GitHub",
      href: personalDetails?.github,
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: personalDetails?.linkedin,
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: `mailto:${personalDetails?.email}`,
      icon: <Mail size={17} />,
    },
  ];

  function getHobbyItems() {
    return hobbies.map((hobby) => (
      <Hobby
        key={hobby.id}
        alt={hobby.name}
        src={hobby.icon_url}
        text={hobby.name}
      />
    ));
  }

  return (
    <section id="about" className={styles.about}>
      {/* 3D particle background */}
      <div className={styles.particleBackground} aria-hidden="true">
        <ParticleScene />
      </div>

      {/* Radial glows */}
      <div className={styles.radialGlow} aria-hidden="true">
        <div className={styles.radialGlow__large} />
        <div className={styles.radialGlow__small} />
      </div>

      <div className={styles.about__intro}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className={styles.image_container}
        >
          <Image
            src="/IMG_2403_change.jpg"
            alt="Anuj's profile image"
            height={200}
            width={200}
            className={styles.profileImage}
            priority
          />
        </motion.div>

        <div className={styles.about__intro_details}>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={styles.eyebrow}
          >
            {">"} HELLO, WORLD
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className={styles.about__introName}
          >
            {first && <>{first} </>}
            <span className={styles.nameGlow}>{last}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className={styles.typewriterWrapper}
          >
            <TypewriterText phrases={ROLES} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className={styles.about__descriptionGreet}
          >
            {personalDetails?.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className={styles.actions}
          >
            <Button
              text="Check out my resume!"
              title="Downloa Resume"
              isPrimary={false}
              onClick={() => {
                window.location.href = personalDetails.resume_url;
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className={styles.socials}
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={styles.socialIcon}
                target={social.target}
                rel={social.rel}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className={styles.about__hobbies}
      >
        <p className={styles.about__hobbiesTitle}>{"//"} things I do when I'm bored</p>
        <div className={styles.about__hobbiesList}>{getHobbyItems()}</div>
      </motion.div>
    </section>
  );
}
