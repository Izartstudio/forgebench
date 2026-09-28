"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./origin-section.module.css";

function AnimatedArrow({ delay }: { delay: number }) {
  return (
    <svg className={styles.arrow} style={{ "--delay": `${delay}ms` } as React.CSSProperties} viewBox="0 0 10 42" aria-hidden="true">
      <path d="M5 1V38M1.8 34.8 5 38l3.2-3.2" pathLength="1" />
    </svg>
  );
}

export function OriginSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .28 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.origin} ${visible ? styles.visible : ""}`} aria-labelledby="origin-title">
      <div className={styles.story}>
        <p className={styles.eyebrow}>Origin</p>
        <h2 id="origin-title">We Were Building With AI.<br />We Knew <span>Governance</span> Had To<br />Scale With It.</h2>
        <p>Forgebench was born inside SeedlingLabs, while we were<br className={styles.desktopBreak} /> building AI-native products ourselves.</p>
      </div>
      <div className={styles.lesson}>
        <p>We saw how quickly AI adoption could grow. We also saw how hard it became to<br className={styles.desktopBreak} /> understand what was happening across it and how something that starts small can<br className={styles.desktopBreak} /> quickly become a mammoth problem to solve.</p>
        <div className={styles.sequence}>
          <p className={styles.line} style={{ "--delay": "0ms" } as React.CSSProperties}>The <span>more AI</span> you build</p>
          <AnimatedArrow delay={260} />
          <p className={styles.line} style={{ "--delay": "600ms" } as React.CSSProperties}>The <span>more</span> you need to see</p>
          <AnimatedArrow delay={860} />
          <p className={styles.line} style={{ "--delay": "1200ms" } as React.CSSProperties}>The <span>more</span> you can control</p>
        </div>
        <p>That became the foundation for Forgebench.</p>
      </div>
    </section>
  );
}
