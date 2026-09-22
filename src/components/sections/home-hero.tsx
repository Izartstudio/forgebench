import Image from "next/image";

import { ArrowLink } from "@/components/ui/arrow-link";
import { TypewriterText } from "@/components/ui/typewriter-text";

import styles from "./home-hero.module.css";

const credentials = [
  {
    src: "/logos/iso-27001.svg",
    alt: "ISO 27001 certified",
    width: 68,
    height: 75,
    hoverSrc: "/logos/hover-iso-27001.svg",
  },
  {
    src: "/logos/iso-9001.svg",
    alt: "ISO 9001 certified",
    width: 55,
    height: 61,
    hoverSrc: "/logos/hover-iso-9001.svg",
  },
  {
    src: "/logos/aicpa-soc-2.svg",
    alt: "AICPA SOC 2 compliant",
    width: 69,
    height: 50,
    hoverSrc: "/logos/hover-aicpa.svg",
  },
] as const;

export function HomeHero() {
  return (
    <section
      id="home-top"
      className={styles.hero}
      aria-labelledby="home-hero-title"
    >
      <div className={styles.lead}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Operating plane for Gen AI</p>
          <h1 className={styles.title} id="home-hero-title">
            <TypewriterText />
            <span>With Forgebench</span>
          </h1>
          <div className={styles.actions}>
            <ArrowLink href="/sandbox" variant="dark">
              Try The Sandbox
            </ArrowLink>
            <ArrowLink href="/demo">Book A Demo</ArrowLink>
          </div>
        </div>
      </div>

      <div className={styles.visual}>
        <Image
          src="/images/home/hero-background-card.png"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 66.111vw"
          className={styles.visualImage}
        />
        <Image
          src="/images/home/hero-graph.png"
          alt="Forgebench architecture connecting AI applications and coding assistants to governed models and MCP servers"
          width={903}
          height={420}
          priority
          sizes="(max-width: 767px) 92vw, 61vw"
          className={styles.heroGraph}
        />
      </div>

      <div className={styles.credentials}>
        <div className={styles.statement}>
          <span className={styles.dot} aria-hidden="true" />
          <p>
            Self-hosted &amp;
            <br />
            Model Agnostic
          </p>
        </div>

        {credentials.map((credential) => (
          <div className={styles.credential} key={credential.src}>
            <span className={styles.logoSwap}>
              <Image
                src={credential.src}
                alt={credential.alt}
                width={credential.width}
                height={credential.height}
              />
              {credential.hoverSrc && (
                <Image
                  src={credential.hoverSrc}
                  alt=""
                  width={credential.width}
                  height={credential.height}
                  className={styles.hoverLogo}
                />
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
