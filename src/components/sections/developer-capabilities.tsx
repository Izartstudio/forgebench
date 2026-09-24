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

const agentCapabilities = [
  {
    category: "Coverage",
    title: "One Governed Path",
    description:
      "Every call routed through Forgebench, on the agent's own credential. No agent holds a provider key.",
  },
  {
    category: "Registry",
    title: "An inventory of every agent",
    description:
      "Owner, state, version, tools, spend against ceiling — registered before its first call.",
  },
  {
    category: "Policy",
    title: "Permissions and guardrails, set centrally",
    description:
      "The tools and MCP servers an agent may reach, and what may leave your perimeter. Bound at registration, enforced on every call.",
  },
  {
    category: "Control & Attribution",
    title: "A ceiling before the spend",
    description:
      "Caps per model, agent and key, enforced before the round-trip. Whichever cap is reached first refuses the next call.",
  },
  {
    category: "Guardrails",
    title: "Input-output safety reviews",
    description:
      "PII, secrets and denylist checks off the response path. Flagged against the agent, never blocking.",
  },
  {
    category: "Auditability",
    title: "Tamper-evident audit record",
    description:
      "Every call and every operator action, hash-linked. Editing an entry is detectable.",
  },
] as const;

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

type DeveloperCapabilitiesProps = {
  variant?: "developers" | "agents";
};

export function DeveloperCapabilities({
  variant = "developers",
}: DeveloperCapabilitiesProps) {
  if (variant === "agents") {
    return (
      <section
        className={`${styles.section} ${styles.agentsSection}`}
        aria-labelledby="agent-capabilities-title"
      >
        <div className={`${styles.introduction} ${styles.agentsIntroduction}`}>
          <h2 id="agent-capabilities-title" className={styles.heading}>
            <span>Six Capabilities</span> That Fence
            <br />
            Your Agents
          </h2>
          <p className={styles.summary}>
            Forgebench Gives Every Agent Its Own Credential, Its Own Ceiling
            <br />
            And Its Own Record — So You Can See, Live, Every Call It Makes,
            <br />
            Who Owns It, And What It Costs.
          </p>
        </div>

        <div className={`${styles.gridFrame} ${styles.agentsGridFrame}`}>
          <div className={`${styles.grid} ${styles.agentsGrid}`}>
            {agentCapabilities.map((capability, index) => (
              <article
                className={`${styles.card} ${styles.agentCard} ${index % 2 === 0 ? styles.plain : styles.soft}`}
                key={capability.title}
              >
                <p className={styles.category}>{capability.category}</p>
                <h3>{capability.title}</h3>
                <p className={styles.description}>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
