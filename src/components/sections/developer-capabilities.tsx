import Image from "next/image";

import styles from "./developer-capabilities.module.css";

type Capability = {
  category: "Governed" | "Measured";
  title: string;
  description: string;
  icon: "governed" | "measured";
  tone: "plain" | "soft";
};

const capabilities: readonly Capability[] = [
  {
    category: "Governed",
    title: "Credentials",
    description:
      "One credential per developer, per team, or per feature. Issued by you, revocable by you.",
    icon: "governed",
    tone: "plain",
  },
  {
    category: "Measured",
    title: "Adoption",
    description:
      "Who has started, who is reporting, and how much each team is spending across Claude Code, Codex, GitHub Copilot and AWS Kiro.",
    icon: "measured",
    tone: "soft",
  },
  {
    category: "Governed",
    title: "Ceilings",
    description:
      "Caps per developer, team, feature and model, enforced before the call reaches a provider.",
    icon: "governed",
    tone: "soft",
  },
  {
    category: "Measured",
    title: "Impact",
    description:
      "Spend against commits, pull requests and story points closed — cost per unit of work, not cost alone.",
    icon: "measured",
    tone: "plain",
  },
  {
    category: "Governed",
    title: "Record",
    description:
      "Every call routed, metered and recorded. Guardrails on what leaves your perimeter.",
    icon: "governed",
    tone: "plain",
  },
  {
    category: "Measured",
    title: "Privacy",
    description:
      "Counts, scores and model names leave the machine. Prompts and file contents never do.",
    icon: "measured",
    tone: "soft",
  },
];

const capabilityIcons = {
  governed: {
    src: "/images/developers/capability-governed.svg",
    width: 19,
    height: 22,
  },
  measured: {
    src: "/images/developers/capability-measured.svg",
    width: 22,
    height: 22,
  },
} as const;

export function DeveloperCapabilities() {
  return (
    <section className={styles.section} aria-labelledby="capabilities-title">
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>Capabilities</p>
        <h2 id="capabilities-title" className={styles.heading}>
          There Are <span>Two Ways</span> Developers Use AI In Your Org. Drive
          Both On One Console.
        </h2>
        <p className={styles.summary}>
          Govern what they build with your API keys.
          <br />
          Measure how well they use AI to write code.
        </p>
      </div>

      <div className={styles.gridFrame}>
        <div className={styles.grid}>
          {capabilities.map((capability) => (
            <article
              className={`${styles.card} ${styles[capability.tone]}`}
              key={capability.title}
            >
              <div>
                <p className={styles.category}>{capability.category}</p>
                <h3>{capability.title}</h3>
              </div>
              <Image
                src={capabilityIcons[capability.icon].src}
                alt=""
                width={capabilityIcons[capability.icon].width}
                height={capabilityIcons[capability.icon].height}
                className={styles.cardIcon}
              />
              <p className={styles.description}>{capability.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
