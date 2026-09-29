import Image from "next/image";

import { ArrowLink } from "@/components/ui/arrow-link";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { HeroArchitecture } from "./hero-architecture";
import { CredentialsStrip } from "./credentials-strip";

import styles from "./home-hero.module.css";

export function HomeHero() {
  return (
    <section
      id="home-top"
      className={styles.hero}
      aria-labelledby="home-hero-title"
    >
      <div className={styles.lead}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Operating plane for Enterprise AI</p>
          <h1 className={styles.title} id="home-hero-title">
            <TypewriterText />
            <span>With Forgebench</span>
          </h1>
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
      </div>

      <div className={styles.visual}>
        <Image
          src="/images/home/hero-background-card.webp"
          alt=""
          fill
          preload
          sizes="(max-width: 767px) 100vw, 66.111vw"
          className={styles.visualImage}
        />
        <Image
          src="/images/home/mobile-card-background.png"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
          className={styles.visualImageMobile}
        />
        <HeroArchitecture />
      </div>

      <CredentialsStrip />
    </section>
  );
}
