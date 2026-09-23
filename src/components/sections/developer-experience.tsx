import styles from "./developer-experience.module.css";

const experienceItems = [
  {
    icon: "lock",
    title: "It's Private",
    description:
      "Prompts and file contents stay on the machine. What leaves is only counts, scores and model names, so no one is reading their work over their shoulder.",
  },
  {
    icon: "gauge",
    title: "Their own budget, not a shared one.",
    description:
      "One credential per developer means their rate limit is theirs alone. Somebody else's retry loop can't exhaust a shared quota and stall their afternoon.",
  },
  {
    icon: "bolt",
    title: "Nothing slows their calls down",
    description:
      "Guardrail checks run on the recorded call after it returns. Nothing is held mid-flight, nothing is redacted, and streaming doesn't break.",
  },
  {
    icon: "insights",
    title: "Personalized insights",
    description:
      "A personal view shows them their sessions, spend and working style scored across five dimensions, plus habits like prompts per session, tool mix and parallel agents.",
  },
  {
    icon: "server",
    title: "Nothing to install",
    description:
      "Integrating with IDEs is a settings file the IT team pushes. Developers continue to use the same accounts, in the same way.",
  },
] as const;

type ExperienceIconProps = {
  name: (typeof experienceItems)[number]["icon"];
};

function ExperienceIcon({ name }: ExperienceIconProps) {
  if (name === "lock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="10" width="14" height="11" rx="1" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </svg>
    );
  }

  if (name === "gauge") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 17a8 8 0 1 1 16 0" />
        <path d="m12 17 4-5M4 17h4M16 17h4" />
      </svg>
    );
  }

  if (name === "bolt") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m14 2-9 12h7l-2 8 9-12h-7l2-8Z" />
      </svg>
    );
  }

  if (name === "insights") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 18 5-5 4 3 7-8" />
        <circle cx="3" cy="18" r="1" />
        <circle cx="8" cy="13" r="1" />
        <circle cx="12" cy="16" r="1" />
        <circle cx="19" cy="8" r="1" />
        <path d="M15 5h4M17 3v4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h.01M11 7h6M8 12h.01M11 12h6M8 17h.01M11 17h6" />
    </svg>
  );
}

export function DeveloperExperience() {
  return (
    <section className={styles.section} aria-labelledby="developer-experience-title">
      <header className={styles.heading}>
        <p>Developer Experience</p>
        <h2 id="developer-experience-title">
          Why Developers
          <br />
          <span>Love Forgebench</span>
        </h2>
      </header>

      <div className={styles.items}>
        {experienceItems.map((item) => (
          <article className={styles.item} key={item.title}>
            <div className={styles.itemTitle}>
              <span className={styles.icon}>
                <ExperienceIcon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
            </div>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
