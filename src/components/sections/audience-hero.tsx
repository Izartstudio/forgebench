import Image from "next/image";
import type { ReactNode } from "react";

import { ArrowLink } from "@/components/ui/arrow-link";

import styles from "./audience-hero.module.css";

type AudienceHeroProps = {
  id: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  children?: ReactNode;
};

export function AudienceHero({
  id,
  eyebrow,
  title,
  description,
  image,
  children,
}: AudienceHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby={id}>
      <div className={styles.copy}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <h1 id={id}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <ArrowLink
            href="mailto:info@seedlinglabs.com?subject=Request%20Forgebench%20Sandbox%20Access"
            variant="dark"
          >
            Try The Sandbox
          </ArrowLink>
          <ArrowLink href="mailto:info@seedlinglabs.com?subject=Book%20a%20Forgebench%20Demo">
            Book A Demo
          </ArrowLink>
        </div>
      </div>

      <div className={styles.visual}>
        {image ? (
          <div className={styles.visualFrame}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              sizes="(max-width: 767px) 116vw, 72vw"
              className={styles.visualImage}
            />
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
