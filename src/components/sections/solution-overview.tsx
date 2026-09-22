import Image from "next/image";

import styles from "./solution-overview.module.css";

const capabilities = [
  {
    label: "Build",
    description: "Inventory and binding of everything using AI",
    icon: "/icons/home/build.svg",
  },
  {
    label: "Run",
    description: "One governed path with caps, guardrails and telemetry",
    icon: "/icons/home/run.svg",
  },
  {
    label: "Control",
    description:
      "Cost optimized routing recommendations. Evidence surface for every call.",
    icon: "/icons/home/control.svg",
  },
] as const;

export function SolutionOverview() {
  return (
    <section className={styles.section} aria-labelledby="solution-heading">
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>Solution</p>
        <h2 className={styles.heading} id="solution-heading">
          Forgebench gives every developer, app and agent their own credential
          ceiling, and record — so you can see, live, every call that&apos;s
          touching AI, who owns it, what it costs, and how that cost can be
          optimized.
        </h2>
      </div>

      <div className={styles.capabilities}>
        {capabilities.map((capability) => (
          <article className={styles.capability} key={capability.label}>
            <div className={styles.content}>
              <h3>{capability.label}</h3>
              <p>{capability.description}</p>
            </div>
            <Image
              src={capability.icon}
              alt=""
              width={76}
              height={76}
              className={styles.icon}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
