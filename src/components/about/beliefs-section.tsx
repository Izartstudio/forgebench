"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatedSideLines } from "./animated-side-lines";
import styles from "./beliefs-section.module.css";

const sideMarks = ["//", "//", "//", "//", "//", "//"];

export function BeliefsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.beliefs} ${visible ? styles.visible : ""}`}
      aria-labelledby="beliefs-title"
    >
      <AnimatedSideLines active={visible} />

      <div className={styles.content}>
        <p className={styles.eyebrow}>What We Believe</p>
        <h2 id="beliefs-title">
          Visibility Before <span>Optimization</span>
          <br />
          <span>Control</span> While You Scale.
        </h2>
        <p className={styles.description}>
          Forgebench gives organizations visibility into AI activity
          <br className={styles.desktopBreak} /> and spend, attribution across users and systems, and
          <br className={styles.desktopBreak} /> the controls to govern AI as adoption grows.
        </p>
      </div>

      <div className={styles.manifesto}>
        <div className={styles.marks} aria-hidden="true">
          {sideMarks.map((mark, index) => <span key={`left-${index}`}>{mark}</span>)}
        </div>
        <p>
          <span>Not To Slow AI Down.</span>
          <br />
          To Help Organizations Move With <strong>Confidence.</strong>
        </p>
        <div className={`${styles.marks} ${styles.marksRight}`} aria-hidden="true">
          {sideMarks.map((_, index) => <span key={`right-${index}`}>\\</span>)}
        </div>
      </div>
    </section>
  );
}
