"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./deployment-timeline.module.css";

const phases = [
  {
    week: "Week 1",
    activeWeek: "Week 1",
    title: "Planning & Setup",
    description:
      "Scope one live workflow and a pilot group of 10–25 developers. Lock identity and SCIM sources, provider accounts, 2–8 agents and MCP servers, guardrails, data-policy defaults, and access both ways.",
    exit: "EXIT: Pilot plan signed.",
    image: "/images/home/deployment/week-1.png",
  },
  {
    week: "Weeks 2–3",
    activeWeek: "Week 2–3",
    title: "Build & Govern",
    description:
      "Platform live: gateway, SSO and SCIM, provider keys and spend caps, pilot developer keys. Then on the same tenant: console telemetry, team import, data policy. Then agents — registered, MCP servers bound, tool policy and approval chains set.",
    exit: "EXIT: Three proofs: one governed path for every machine and developer in the pilot, enforced ceilings, live agent version rollback.",
    image: "/images/home/deployment/week-2-3.png",
  },
  {
    week: "Weeks 3–4",
    activeWeek: "Week 4",
    title: "Review & Sign-off",
    description:
      "Signed usage export produced and verified by finance. Runbooks reviewed with your ops lead and the admin walkthrough delivered. Success criteria reviewed with security, finance and engineering.",
    exit: "EXIT: One of two — criteria signed off and production scope agreed",
    image: "/images/home/deployment/week-4.png",
  },
] as const;

const foundations = [
  {
    title: "Integration",
    lead: "Host-provisioned. Change an endpoint.",
    body: "Developers and agents keep working exactly as they do now; the only change is which key they hold.",
  },
  {
    title: "Identity & Tenancy",
    lead: "Dedicated instance on Forgebench cloud.",
    body: "Or self-hosted in your Kubernetes cluster with your identity provider, WAF, and network policies.",
  },
  {
    title: "Security",
    lead: "Single sign-on against your existing provider.",
    body: "With a fully visible working set. Four roles: CTO, engineering manager, platform operator, developer.",
  },
] as const;

type DeploymentTimelineProps = {
  variant?: "default" | "developers";
};

export function DeploymentTimeline({
  variant = "default",
}: DeploymentTimelineProps) {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section
      className={`${styles.section} ${variant === "developers" ? styles.developers : ""}`}
      aria-labelledby="deployment-heading"
    >
      <header className={styles.heading}>
        <p>Deployment &amp; Implementation</p>
        <h2 id="deployment-heading">
          Runs <span>In Your Environment.</span>
          <br />
          Proved And Signed-Off In 4 Weeks.
        </h2>
      </header>

      <div className={styles.workspace}>
        <p className={styles.where}>
          Where it runs. Your infrastructure, your identity provider, your
          policies.
        </p>

        <div className={styles.foundations}>
          {foundations.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <strong>{item.lead}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <p className={styles.phasesLabel}>
          Three phases, each exiting on evidence.
        </p>

        <div className={styles.phases}>
          {phases.map((phase, index) => {
            const isActive = activePhase === index;

            return (
              <article
                className={`${styles.phase} ${isActive ? styles.active : ""}`}
                key={phase.week}
              >
                <button
                  type="button"
                  className={styles.phaseHitbox}
                  aria-label={`Show ${phase.week}: ${phase.title}`}
                  aria-pressed={isActive}
                  onClick={() => setActivePhase(index)}
                />
                <Image
                  className={styles.phaseBackground}
                  src="/images/home/deployment/card-bg.png"
                  alt=""
                  fill
                  sizes="(max-width: 767px) calc(100vw - 60px), 62vw"
                />

                <div className={styles.phaseTrigger}>
                  <span>{isActive ? phase.activeWeek : phase.week}</span>
                </div>

                <div className={styles.phaseContent} aria-hidden={!isActive}>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                  <Image
                    className={styles.productImage}
                    src={phase.image}
                    alt="Forgebench overview showing governed AI usage, budget and spend metrics"
                    width={623}
                    height={339}
                    sizes="(max-width: 767px) calc(100vw - 92px), 46vw"
                  />
                  <span className={styles.exit}>{phase.exit}</span>
                </div>

                <span className={styles.collapsedLabel}>
                  <span>
                    {phase.title === "Review & Sign-off" ? (
                      <>
                        Review &amp;
                        <br /> Sign-off
                      </>
                    ) : (
                      phase.title
                    )}
                  </span>
                  <i aria-hidden="true" />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
