"use client";

import { useEffect } from "react";

export function ReloadScrollRestoration() {
  useEffect(() => {
    const storageKey = `forgebench-scroll:${window.location.pathname}`;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    let frame = 0;
    let isRestoring = false;

    const savePosition = () => {
      if (isRestoring) return;
      window.sessionStorage.setItem(storageKey, String(window.scrollY));
    };

    const savePositionOnScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(savePosition);
    };

    const navigation = window.performance.getEntriesByType("navigation")[0] as
      PerformanceNavigationTiming | undefined;

    if (navigation?.type === "reload") {
      const savedPosition = Number(window.sessionStorage.getItem(storageKey));

      if (Number.isFinite(savedPosition)) {
        isRestoring = true;
        const restorePosition = () => {
          const root = document.documentElement;
          const previousBehavior = root.style.scrollBehavior;
          root.style.scrollBehavior = "auto";
          window.scrollTo(0, savedPosition);
          root.style.scrollBehavior = previousBehavior;
        };

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(restorePosition);
        });
        window.addEventListener("load", restorePosition, { once: true });
        void document.fonts.ready.then(restorePosition);
        window.setTimeout(restorePosition, 250);
        window.setTimeout(() => {
          restorePosition();
          isRestoring = false;
        }, 700);
      }
    }

    window.addEventListener("scroll", savePositionOnScroll, { passive: true });
    window.addEventListener("beforeunload", savePosition);
    window.addEventListener("pagehide", savePosition);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", savePositionOnScroll);
      window.removeEventListener("beforeunload", savePosition);
      window.removeEventListener("pagehide", savePosition);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}
