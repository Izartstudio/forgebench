"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Trace every Agent",
  "Bind every Developer",
  "Cap every Dollar",
  "Prove every Call",
] as const;

export function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(phrases[0].length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    let delay = isDeleting ? 42 : 72;

    if (!isDeleting && characterCount === phrase.length) delay = 1500;
    const timer = window.setTimeout(() => {
      if (!isDeleting && characterCount === phrase.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && characterCount === 1) {
        setPhraseIndex((current) => (current + 1) % phrases.length);
        setCharacterCount(1);
        setIsDeleting(false);
        return;
      }

      setCharacterCount((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [characterCount, isDeleting, phraseIndex]);

  return (
    <span aria-label={phrases[phraseIndex]}>
      <span aria-hidden="true">
        {phrases[phraseIndex].slice(0, characterCount)}
      </span>
      <i aria-hidden="true" />
    </span>
  );
}
