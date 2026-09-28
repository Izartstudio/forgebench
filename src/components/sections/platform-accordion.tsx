"use client";

import { useEffect, useRef, useState } from "react";

import { PlatformProductCard } from "./platform-product-card";
import styles from "./platform-accordion.module.css";

const panels = [
  {
    title: "Registry",
    slug: "registry",
    description:
      "Both on one deployment. Credential issuance and budgets govern AI consumers; agent registration is added when agents reach production.",
    image: "/images/platform/cards/registry.svg",
    width: 741,
    height: 603,
  },
  {
    title: "Gateway",
    slug: "gateway",
    description:
      "A governed entry point for every model request, with credentials, policy and usage controls applied consistently.",
    image: "/images/platform/cards/gateway.svg",
    width: 761,
    height: 556,
  },
  {
    title: "Routing",
    slug: "routing",
    description:
      "Route each request across approved models and providers based on capability, cost and availability.",
    image: "/images/platform/cards/routing.svg",
    width: 761,
    height: 509,
  },
  {
    title: "Guardrails",
    slug: "guardrails",
    description:
      "Apply shared security, privacy and operational policies before requests reach production models.",
    image: "/images/platform/cards/guardrails.svg",
    width: 781,
    height: 545,
  },
  {
    title: "AI Insights",
    slug: "ai-insights",
    description:
      "Understand adoption, model performance and spend across every application and agent in one view.",
    image: "/images/platform/cards/ai-insights.svg",
    width: 755,
    height: 687,
  },
  {
    title: "Observability",
    slug: "observability",
    description:
      "Trace calls from application to model with the context needed to diagnose quality, latency and failures.",
    image: "/images/platform/cards/observability.svg",
    width: 772,
    height: 530,
  },
  {
    title: "Audit",
    slug: "audit",
    description:
      "Maintain a clear record of model activity, ownership and policy decisions for every governed call.",
    image: "/images/platform/cards/audit.svg",
    width: 769,
    height: 592,
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
