"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import styles from "./outcomes-section.module.css";

const outcomes = [
  {
    number: "01",
    title:
      "More Teams Building And Shipping On AI— Because Every New Consumer Is Bounded Before The First Call",
    visual: "teams",
  },
  {
    number: "02",
    title:
      "Clear Mapping Of Developer Use To ROI — With Every Developer Session Scored For Efficiency And Mapped To PRs",
    visual: "roi",
  },
  {
    number: "03",
    title:
      "Spend You Can Predict Before The Invoice — Because Every Dollar Has An Owner And A Ceiling Before It's Spent",
    visual: "spend",
  },
  {
    number: "04",
    title:
      "AI Use You Can Prove — Because Every Call And Every Operator Action Lands On One Hash-Linked Record",
    visual: "audit",
  },
] as const;

function TeamsVisual() {
  return (
    <div className={`${styles.visual} ${styles.teamsVisual}`}>
      <div className={`${styles.uiCard} ${styles.teamsCard}`}>
        <div className={styles.uiHeading}>
          <span>Teams</span>
          <span className={styles.add}>+</span>
        </div>
        {[
          ["Product", "12", "pink"],
          ["Engineering", "28", "blue"],
          ["Design", "8", "purple"],
          ["Growth", "6", "green"],
        ].map(([name, value, color]) => (
          <div className={styles.teamRow} key={name}>
            <i className={styles[color]} />
            <span>{name}</span>
            <small>{value}</small>
          </div>
        ))}
      </div>
      <svg className={styles.connector} viewBox="0 0 74 2" aria-hidden="true">
        <path d="M1 1H73" pathLength="1" />
        <circle cx="73" cy="1" r="1" />
      </svg>
      <div className={`${styles.uiCard} ${styles.consumerCard}`}>
        <span>New Consumer Bound</span>
        <Image
          src="/icons/home/seal-check.svg"
          alt=""
          width={20}
          height={20}
          className={styles.sealIcon}
        />
      </div>
    </div>
  );
}

function RoiVisual() {
  return (
    <div className={`${styles.visual} ${styles.roiVisual}`}>
      <div className={styles.metric}>
        <span>Developer Sessions</span>
        <strong>256</strong>
        <em>↑ 32%</em>
        <div className={styles.bars} aria-hidden="true">
          {[28, 52, 34, 58, 42, 70, 82, 94].map((height, index) => (
            <i
              key={index}
              style={{ "--bar-height": `${height}%` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
      <div className={styles.metric}>
        <span>Efficiency Score</span>
        <strong>87</strong>
        <em>↑ 12%</em>
        <svg
          className={styles.areaChart}
          viewBox="0 0 220 80"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="outcome-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff5d4f" stopOpacity=".28" />
              <stop offset="1" stopColor="#ff5d4f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className={styles.areaFill}
            d="M0 72C30 62 56 50 84 42C113 33 130 48 157 38C179 30 199 17 220 8V80H0Z"
          />
          <path
            className={styles.graphLine}
            pathLength="1"
            d="M0 72C30 62 56 50 84 42C113 33 130 48 157 38C179 30 199 17 220 8"
          />
        </svg>
      </div>
    </div>
  );
}

function SpendVisual() {
  return (
    <div className={`${styles.visual} ${styles.spendVisual}`}>
      <div className={`${styles.uiCard} ${styles.spendCard}`}>
        <div className={styles.uiHeading}>
          <span>Monthly Spend</span>
          <mark>62%</mark>
        </div>
        <div className={styles.amount}>
          $12,480 <small>/ 20,000</small>
        </div>
        <div className={styles.spendDetail}>
          <div className={styles.progress}>
            <span />
          </div>
          {["Inference", "Storage", "Tools"].map((item, index) => (
            <div className={styles.costRow} key={item}>
              <i className={styles[["pink", "blue", "purple"][index]]} />
              <span>{item}</span>
              <small>{["$6,240", "$3,120", "$3,120"][index]}</small>
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.uiCard} ${styles.ownerCard}`}>
        <div className={styles.uiHeading}>
          <span>Owner</span>
          <Image
            src="/icons/home/owner.svg"
            alt=""
            width={25}
            height={25}
            className={styles.ownerIcon}
          />
        </div>
        <p>James Anderson</p>
        <small>Engineering</small>
        <hr />
        <p>Spend Ceiling</p>
        <strong>$20,000</strong>
      </div>
    </div>
  );
}

function AuditVisual() {
  return (
    <div className={`${styles.visual} ${styles.auditVisual}`}>
      <div className={styles.auditCard}>
        {[
          ["Call Completed", "10:24 AM", "View"],
          ["Operator Action", "10:24 AM", "Dispatched"],
          ["Record Hash", "10:24 AM", "# 0x9a3f...E1b2"],
        ].map(([label, time, status], index) => (
          <div className={styles.auditRow} key={label}>
            <i className={index === 0 ? styles.pink : ""} />
            <span>
              {label}
              <small>{time}</small>
            </span>
            <mark className={styles[`status${index}`]}>{status}</mark>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OutcomesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-outcome-card]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.cardVisible);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.45,
        rootMargin: "0px 0px -8%",
      },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="outcomes-heading"
    >
      <div className={styles.headingBlock}>
        <p>Outcomes</p>
        <h2 id="outcomes-heading">
          <span>One Console To</span>
          <span>Drive Your ROI On AI</span>
        </h2>
      </div>

      <div className={styles.window}>
        <div className={styles.windowBar} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className={styles.grid}>
          {outcomes.map((outcome) => (
            <article
              className={styles.outcome}
              data-outcome-card
              key={outcome.number}
            >
              <header>
                <span>{outcome.number}</span>
                <h3>{outcome.title}</h3>
              </header>
              {outcome.visual === "teams" ? <TeamsVisual /> : null}
              {outcome.visual === "roi" ? <RoiVisual /> : null}
              {outcome.visual === "spend" ? <SpendVisual /> : null}
              {outcome.visual === "audit" ? <AuditVisual /> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
