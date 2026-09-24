import Image from "next/image";

import styles from "./credentials-strip.module.css";

const credentials = [
  { src: "/logos/iso-27001.webp", alt: "ISO 27001 certified", width: 68, height: 75, hoverSrc: "/logos/hover-iso-27001.webp" },
  { src: "/logos/iso-9001.webp", alt: "ISO 9001 certified", width: 55, height: 61, hoverSrc: "/logos/hover-iso-9001.webp" },
  { src: "/logos/aicpa-soc-2.webp", alt: "AICPA SOC 2 compliant", width: 69, height: 50, hoverSrc: "/logos/hover-aicpa.webp" },
] as const;

export function CredentialsStrip() {
  return (
    <section className={styles.credentials} aria-label="Security certifications">
      <div className={styles.statement}>
        <span className={styles.dot} aria-hidden="true" />
        <p>Self-hosted &amp;<br />Model Agnostic</p>
      </div>
      {credentials.map((credential) => (
        <div className={styles.credential} key={credential.src}>
          <span className={styles.logoSwap}>
            <Image src={credential.src} alt={credential.alt} width={credential.width} height={credential.height} />
            <Image src={credential.hoverSrc} alt="" width={credential.width} height={credential.height} className={styles.hoverLogo} />
          </span>
        </div>
      ))}
    </section>
  );
}
