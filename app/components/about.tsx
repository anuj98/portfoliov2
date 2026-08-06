"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import styles from "@/app/components/about.module.css";
import { PersonalDetails } from "@/app/db/models";
import Button from "./button";
import TypewriterText from "./typewriterText";
import SocialIcon from "./socialIcon";
import ICONS from "./socialIcons";

const ParticleScene = dynamic(() => import("./particleScene"), { ssr: false });

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
  roles,
}: {
  personalDetails: PersonalDetails;
  roles: string[];
}) {
  const { first, last } = splitName(personalDetails?.name ?? "");

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
            <TypewriterText phrases={roles} />
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
            {ICONS.map((icon, i) => (
              <SocialIcon
                key={icon.alt}
                href={icon.href(
                  [personalDetails.linkedin, personalDetails.email, personalDetails.github][i]
                )}
                label={icon.alt}
                icon={<Image src={icon.src} width={17} height={17} alt="" />}
                external={icon.external}
                variant="pill"
              />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
