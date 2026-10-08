"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatedSideLines } from "@/components/about/animated-side-lines";
import { ArrowLink } from "@/components/ui/arrow-link";

import styles from "./contact-actions.module.css";

export type ContactAction = { label: string; href: string };

export function ContactActions({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: ContactAction[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="contact-actions-title"
    >
      <AnimatedSideLines active={visible} />
      <div className={styles.content}>
        <h2 id="contact-actions-title">{title}</h2>
        <p>{description}</p>
        <div className={styles.actions}>
          {actions.map((action) => (
            <ArrowLink
              key={action.label}
              href={action.href}
              variant="dark"
              className={styles.action}
            >
              {action.label}
            </ArrowLink>
          ))}
        </div>
      </div>
    </section>
  );
}
