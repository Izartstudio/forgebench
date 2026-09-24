"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

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
  variant?: "default" | "developers" | "agents";
};

// Edit this block when the agents-page timeline needs its own copy.
export const agentsTimelineCopy = {
  eyebrow: "Deployment & Implementation",
  headingStart: "Runs",
  headingAccent: "In Your Environment.",
  headingEnd: "Proved And Signed-Off In 4 Weeks.",
  where:
    "Where it runs. Your infrastructure, your identity provider, your policies.",
  phasesLabel: "Three phases, each exiting on evidence.",
  foundations,
  phases,
  phaseImages: [
    "/images/home/deployment/week-1.png",
    "/images/home/deployment/week-2-3.png",
    "/images/home/deployment/week-4.png",
  ],
  phaseImageAlts: [
    "Forgebench planning and setup overview",
    "Forgebench agent governance implementation overview",
    "Forgebench review and sign-off overview",
  ],
} as const;

export function DeploymentTimeline({
  variant = "default",
}: DeploymentTimelineProps) {
  const copy = variant === "agents" ? agentsTimelineCopy : {
    eyebrow: "Deployment & Implementation",
    headingStart: "Runs",
    headingAccent: "In Your Environment.",
    headingEnd: "Proved And Signed-Off In 4 Weeks.",
    where:
      "Where it runs. Your infrastructure, your identity provider, your policies.",
    phasesLabel: "Three phases, each exiting on evidence.",
    foundations,
    phases,
    phaseImages: phases.map((phase) => phase.image),
    phaseImageAlts: phases.map(
      () => "Forgebench overview showing governed AI usage, budget and spend metrics",
    ),
  } as const;
  const [activePhase, setActivePhase] = useState(0);
  const phaseRefs = useRef<Array<HTMLElement | null>>([]);
  const previousRectsRef = useRef<Map<number, DOMRect>>(new Map());
  const movementAnimationsRef = useRef<Animation[]>([]);

  useLayoutEffect(() => {
    const previousRects = previousRectsRef.current;
    if (previousRects.size === 0) return;

    movementAnimationsRef.current.forEach((animation) => animation.cancel());
    movementAnimationsRef.current = [];

    phaseRefs.current.forEach((phase, index) => {
      const previousRect = previousRects.get(index);
      if (!phase || !previousRect) return;

      const nextRect = phase.getBoundingClientRect();
      const deltaX = previousRect.left - nextRect.left;
      const deltaY = previousRect.top - nextRect.top;

      if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) return;

      movementAnimationsRef.current.push(
        phase.animate(
          [
            { transform: `translate3d(${deltaX}px, ${deltaY}px, 0)` },
            { transform: "translate3d(0, 0, 0)" },
          ],
          {
            duration: 520,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          },
        ),
      );
    });

    previousRects.clear();
  }, [activePhase]);

  const selectPhase = (index: number) => {
    if (index === activePhase) return;

    const shouldAnimate =
      window.matchMedia("(max-width: 56.25rem)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldAnimate) {
      previousRectsRef.current = new Map(
        phaseRefs.current.flatMap((phase, phaseIndex) =>
          phase ? [[phaseIndex, phase.getBoundingClientRect()] as const] : [],
        ),
      );
    }

    setActivePhase(index);
  };

  return (
    <section
      className={`${styles.section} ${variant === "developers" || variant === "agents" ? styles.developers : ""}`}
      aria-labelledby={`${variant}-deployment-heading`}
    >
      <header className={styles.heading}>
        <p>{copy.eyebrow}</p>
        <h2 id={`${variant}-deployment-heading`}>
          {copy.headingStart} <span>{copy.headingAccent}</span>
          <br />
          {copy.headingEnd}
        </h2>
      </header>

      <div className={styles.workspace}>
        <p className={styles.where}>{copy.where}</p>

        <div className={styles.foundations}>
          {copy.foundations.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <strong>{item.lead}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <p className={styles.phasesLabel}>{copy.phasesLabel}</p>

        <div className={styles.phases}>
          {copy.phases.map((phase, index) => {
            const isActive = activePhase === index;

            return (
              <article
                className={`${styles.phase} ${isActive ? styles.active : ""}`}
                ref={(phase) => {
                  phaseRefs.current[index] = phase;
                }}
                key={phase.week}
              >
                <button
                  type="button"
                  className={styles.phaseHitbox}
                  aria-label={`Show ${phase.week}: ${phase.title}`}
                  aria-pressed={isActive}
                  onClick={() => selectPhase(index)}
                />
                {variant === "default" && (
                  <Image
                    className={styles.phaseBackground}
                    src="/images/home/deployment/card-bg.png"
                    alt=""
                    fill
                    sizes="(max-width: 767px) calc(100vw - 60px), 62vw"
                  />
                )}

                <div className={styles.phaseTrigger}>
                  <span>{isActive ? phase.activeWeek : phase.week}</span>
                </div>

                <div className={styles.phaseContent} aria-hidden={!isActive}>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                  <Image
                    className={styles.productImage}
                    src={copy.phaseImages[index]}
                    alt={copy.phaseImageAlts[index]}
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
