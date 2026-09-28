"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowLink } from "@/components/ui/arrow-link";

import { AnimatedSideLines } from "./animated-side-lines";
import styles from "./final-cta.module.css";

export function FinalCta() {
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
    }, { threshold: .15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="final-cta-title">
      <AnimatedSideLines active={visible} />
      <div className={styles.content}>
        <h2 id="final-cta-title">The Problem Was Real.<br /><span>So We Built For It.</span></h2>
        <ArrowLink href="/demo" variant="dark" className={styles.button}>
          See Forgebench in action
        </ArrowLink>
      </div>
    </section>
  );
}
