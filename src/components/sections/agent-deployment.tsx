import Image from "next/image";

import styles from "./agent-deployment.module.css";

const principles = [
  {
    title: "Governance",
    icon: "/icons/agents/governance.svg",
    description:
      "Agent inventory and identity, tool authorization, guardrails, metering and attribution, release safety, and the record — every component permissively licensed. No copyleft, no SSPL, no BSL, no vendor commercial editions.",
  },
  {
    title: "Identity",
    icon: "/icons/agents/identity.svg",
    description:
      "Single sign-on against your existing provider. Four roles: CTO, engineering manager, platform operator, developer.",
  },
  {
    title: "Tenancy",
    icon: "/icons/agents/tenancy.svg",
    description:
      "Isolated tenant instance. An account and its ceilings map to one environment.",
  },
] as const;

const certifications = [
  { src: "/logos/agents/iso-27001.svg", hoverSrc: "/logos/hover-iso-27001.webp", alt: "ISO 27001 certified", width: 68, height: 75 },
  { src: "/logos/agents/iso-9001.svg", hoverSrc: "/logos/hover-iso-9001.webp", alt: "ISO 9001 certified", width: 55, height: 61 },
  { src: "/logos/aicpa-soc-2.webp", hoverSrc: "/logos/hover-aicpa.webp", alt: "AICPA SOC 2 compliant", width: 69, height: 50 },
] as const;

export function AgentDeployment() {
  return (
    <section className={styles.section} aria-labelledby="agent-deployment-title">
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>Developer Experience</p>
        <h2 id="agent-deployment-title">
          One Deployment,
          <br />
          Inside <span>Your Perimeter</span>,
          <br />
          On <span>Your Terms.</span>
        </h2>

        <div className={styles.certifications} aria-label="Security certifications">
          {certifications.map((certification) => (
            <span className={styles.logoSwap} key={certification.src}>
              <Image
                src={certification.src}
                alt={certification.alt}
                width={certification.width}
                height={certification.height}
              />
              <Image
                src={certification.hoverSrc}
                alt=""
                width={certification.width}
                height={certification.height}
                className={styles.hoverLogo}
              />
            </span>
          ))}
        </div>
      </div>

      <div className={styles.principles}>
        {principles.map((principle) => (
          <article
            className={styles.principle}
            key={principle.title}
          >
            <h3>
              <Image src={principle.icon} alt="" width={24} height={24} />
              <span>{principle.title}</span>
            </h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
