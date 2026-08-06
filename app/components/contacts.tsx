import styles from "@/app/components/contacts.module.css";
import Image from "next/image";
import SocialIcon from "./socialIcon";
import ICONS from "./socialIcons";

export default function Contacts({
  gitHub,
  linkedIn,
  email,
}: {
  gitHub: string;
  linkedIn: string;
  email: string;
}) {
  const hrefs = [linkedIn, email, gitHub];

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <div className={styles.contacts}>
        {ICONS.map((icon, i) => (
          <SocialIcon
            key={icon.alt}
            href={hrefs[i]}
            label={icon.alt}
            icon={<Image src={icon.src} width={18} height={18} alt="" />}
            external={icon.external}
            variant="icon"
          />
        ))}
        <div className={styles.verticalLine} />
      </div>

      {/* Mobile: horizontal row in page flow */}
      <div className={styles.contactsMobile}>
        {ICONS.map((icon, i) => (
          <SocialIcon
            key={icon.alt}
            href={hrefs[i]}
            label={icon.alt}
            icon={<Image src={icon.src} width={18} height={18} alt="" />}
            external={icon.external}
            variant="icon"
          />
        ))}
      </div>
    </>
  );
}
