import styles from "./pilot-cta.module.css";

export function PilotCta() {
  return (
    <section className={styles.section} aria-labelledby="pilot-heading">
      <div className={styles.card}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Next steps</p>
          <h2 id="pilot-heading">
            Prove It On Your Own Workload.
            <br />
            Four Weeks, And Every Phase
            <br />
            Exits On Evidence.
          </h2>
          <p className={styles.description}>
            A fixed four-week pilot in your own environment — 10 to 25
            developers,
            <br className={styles.desktopBreak} /> and the two or three agents
            already running in production.
            <br />
            You don&apos;t commit to a platform to run it.
          </p>
        </div>

        <aside className={styles.actionCard} aria-label="Start a pilot">
          <h3>
            Find Out What Your Organization Spends
            <br className={styles.desktopBreak} /> On AI, And Who Spent It.
          </h3>
          <p>Four weeks. Your environment. Evidence at every phase.</p>
          <a href="#contact" className={styles.button}>
            <span>Start a Pilot</span>
            <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
