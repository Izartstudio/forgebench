"use client";

import { useEffect, useRef, useState } from "react";

import { PlatformProductCard } from "./platform-product-card";
import styles from "./platform-accordion.module.css";

const panels = [
  {
    title: "Registry",
    slug: "registry",
    description:
      "Every developer key and agent in production, with its owner, version, what it may reach, and its ceiling.",
  },
  {
    title: "Gateway",
    slug: "gateway",
    description:
      "Every call routes through Forgebench, because nobody holds the provider key. A call over its ceiling is refused, so it costs nothing.",
  },
  {
    title: "Routing",
    slug: "routing",
    description:
      "Model-choice spend comparisons on your real workload, itemized by credential and call. A recommendation and one step on the console to action it.",
  },
  {
    title: "Guardrails",
    slug: "guardrails",
    description:
      "Apply shared security, privacy and operational policies before requests reach production models.",
  },
  {
    title: "AI Insights",
    slug: "ai-insights",
    description:
      "Understand adoption, model performance and spend across every application and agent in one view.",
  },
  {
    title: "Observability",
    slug: "observability",
    description:
      "Trace calls from application to model with the context needed to diagnose quality, latency and failures.",
  },
  {
    title: "Audit",
    slug: "audit",
    description:
      "Maintain a clear record of model activity, ownership and policy decisions for every governed call.",
  },
] as const;

const panelDuration = 7000;

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

  const active = panels[activePanel];
  const animationKey = `${active.slug}-${timelineRun}-${isInView}`;

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
                      <p className={styles.description}>{panel.description}</p>
                      <div
                        className={styles.mobileMedia}
                        aria-label={`${panel.title} product demonstration`}
                      >
                        {isActive && (
                          <PlatformProductCard
                            type={panel.slug}
                            className={`${styles.productCard} ${styles.mobileProductCard}`}
                            animationKey={`mobile-${panel.slug}-${timelineRun}-${isInView}`}
                          />
                        )}
                      </div>
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
            data-active-panel={active.slug}
            aria-label={`${active.title} product demonstration`}
          >
            <PlatformProductCard
              type={active.slug}
              className={styles.productCard}
              animationKey={animationKey}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
