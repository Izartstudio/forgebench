"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const revealSelector = [
  "main h1",
  "main h2",
  "main h3",
  "main p",
  "main article strong",
  "main button > span:first-child",
  "footer h2",
  "footer p",
  "footer a",
].join(",");

export function SiteMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    const handleSynchronizedScroll = (event: Event) => {
      const { top } = (event as CustomEvent<{ top: number }>).detail;
      lenis.scrollTo(top, { immediate: true, force: true });
    };

    window.addEventListener(
      "forgebench:synchronized-scroll",
      handleSynchronizedScroll,
    );

    let animationFrame = 0;
    const animateScroll = (time: number) => {
      lenis.raf(time);
      animationFrame = window.requestAnimationFrame(animateScroll);
    };
    animationFrame = window.requestAnimationFrame(animateScroll);

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );

    if (reducedMotion) {
      elements.forEach((element) =>
        element.classList.add("text-reveal-visible"),
      );
    }

    const observer = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("text-reveal-visible");
              observer?.unobserve(entry.target);
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -5%" },
        );

    elements.forEach((element, index) => {
      element.classList.add("text-reveal");
      element.style.setProperty("--reveal-delay", `${(index % 3) * 45}ms`);
      observer?.observe(element);
    });

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener(
        "forgebench:synchronized-scroll",
        handleSynchronizedScroll,
      );
      lenis.destroy();
    };
  }, []);

  return null;
}
