"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./platform-accordion.module.css";

const panels = [
  {
    title: "Registry",
    description:
      "Both on one deployment. Credential issuance and budgets govern AI consumers; agent registration is added when agents reach production.",
  },
  {
    title: "Gateway",
    description:
      "A governed entry point for every model request, with credentials, policy and usage controls applied consistently.",
  },
  {
    title: "Routing",
    description:
      "Route each request across approved models and providers based on capability, cost and availability.",
  },
  {
    title: "Guardrails",
    description:
      "Apply shared security, privacy and operational policies before requests reach production models.",
  },
  {
    title: "AI Insights",
    description:
      "Understand adoption, model performance and spend across every application and agent in one view.",
  },
  {
    title: "Observability",
    description:
      "Trace calls from application to model with the context needed to diagnose quality, latency and failures.",
  },
  {
    title: "Audit",
    description:
      "Maintain a clear record of model activity, ownership and policy decisions for every governed call.",
  },
] as const;

const panelDuration = 8000;

export function PlatformAccordion() {
  const [activePanel, setActivePanel] = useState(0);
  const [timelineRun, setTimelineRun] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const timer = window.setTimeout(() => {
      setActivePanel((current) => (current + 1) % panels.length);
      setTimelineRun((current) => current + 1);
    }, panelDuration);

    return () => window.clearTimeout(timer);
  }, [activePanel, isInView, timelineRun]);

  const selectPanel = (index: number) => {
    setActivePanel(index);
    setTimelineRun((current) => current + 1);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Forgebench platform"
    >
      <div className={styles.frame}>
        <div className={styles.workspace}>
          <div className={styles.accordion}>
            {panels.map((panel, index) => {
              const isActive = activePanel === index;
              const panelId = `platform-panel-${index}`;

              return (
                <div
                  className={`${styles.item} ${isActive ? styles.active : ""}`}
                  key={panel.title}
                >
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => selectPanel(index)}
                  >
                    <span>{panel.title}</span>
                    <span className={styles.indicator} aria-hidden="true" />
                  </button>

                  <div
                    className={styles.panel}
                    id={panelId}
                    aria-hidden={!isActive}
                  >
                    <div className={styles.panelInner}>
                      <p>{panel.description}</p>
                      <div
                        className={styles.mobileMedia}
                        data-panel={panel.title.toLowerCase()}
                        aria-label={`${panel.title} video placeholder`}
                      />
                    </div>
                  </div>
                  {isActive && (
                    <span className={styles.timeline} aria-hidden="true">
                      <span
                        key={`${index}-${timelineRun}-${isInView}`}
                        className={isInView ? styles.timelineProgress : ""}
                      />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className={styles.media}
            data-active-panel={panels[activePanel].title.toLowerCase()}
            aria-label={`${panels[activePanel].title} video placeholder`}
          />
        </div>
      </div>
    </section>
  );
}
