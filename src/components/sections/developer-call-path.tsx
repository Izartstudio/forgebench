"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./developer-call-path.module.css";

type Frame = {
  eyebrow: string;
  title: string;
  brands?: true;
  points: readonly {
    title: string;
    description: string;
  }[];
};

const frames: readonly Frame[] = [
  {
    eyebrow: "Governed · Credentials and ceilings",
    title: "Three Hundred Developers. Three Hundred Budgets. One Pass.",
    points: [
      {
        title: "Issued From The Console",
        description:
          "One credential with enforceable ceilings and clear attribution per developer, team or feature.",
      },
      {
        title: "Split Across Models",
        description:
          "Split budget allocation across models so no single model consumes the whole.",
      },
      {
        title: "Tagged By Owner, Team And Feature",
        description:
          "Spend rolls up the way you need to charge it back, by owner, team or feature.",
      },
      {
        title: "Revocable Live",
        description:
          "Revoke or narrow a credential and it takes effect on the next call.",
      },
    ],
  },
  {
    eyebrow: "Governed · The call path",
    title: "Every Call, One Route. Refused Before It Costs Anything.",
    points: [
      {
        title: "Credential Authenticated",
        description:
          "Every call made with a Forgebench credential is routed, metered and recorded.",
      },
      {
        title: "Audit Record Opened",
        description: "Before a provider is ever contacted.",
      },
      {
        title: "Rate And Budget Checked",
        description:
          "Per developer, per team, per model, each enforced independently.",
      },
      {
        title: "Attribution On Actuals",
        description:
          "Cost attributed on actuals, and reconciles cleanly against the final invoice.",
      },
    ],
  },
  {
    eyebrow: "Governed · Guardrails and audit",
    title:
      "A Governance Loop That Feeds Your Security Posture. An Audit Record That Proves Every Call.",
    points: [
      {
        title: "What Is Checked",
        description:
          "Personal data, secrets and credentials, and a per-tenant denylist.",
      },
      {
        title: "Two Modes, Never Three",
        description:
          "Guardrails flag and record a violation; nothing is blocked mid-flight.",
      },
      {
        title: "A Named Reason For Every Flag",
        description:
          "Every flagged call names the reason, direction and developer for the flag",
      },
      {
        title: "One Record For Everything",
        description:
          "Model calls, credential changes and policy edits land on one append-only list.",
      },
    ],
  },
  {
    eyebrow: "Measured · Adoption",
    title: "Claude Code, Codex, GitHub Copilot And AWS Kiro, On One Page.",
    points: [
      {
        title: "Four Tools, One Dashboard",
        description:
          "Spend across IDEs aggregated on one console, by person and team.",
      },
      {
        title: "Coverage, Not Guesswork",
        description:
          "Per team adoption and usage metered and reported with actual costs.",
      },
      {
        title: "Cost Attribution",
        description:
          "Month-to-date spend broken down by team, and a highest users' list.",
      },
      {
        title: "Nothing Unattributed",
        description: "The total on the page is the total on the invoice.",
      },
    ],
  },
  {
    eyebrow: "Measured · ROI",
    title: "Not Only What AI Cost You. What It Helped To Ship.",
    brands: true,
    points: [
      {
        title: "Cost Per Unit Of Work",
        description:
          "Spend against commits, pull requests and lines changed — the figures you can put next to a seat licence and defend.",
      },
      {
        title: "Story Points Closed",
        description:
          "Jira read-only, so a PR carries the issue key. Tokens burned against tickets, per developer and team.",
      },
      {
        title: "Output, Not Just Activity",
        description:
          "Spend attributed to PRs raised and merged, commits and edit acceptance.",
      },
    ],
  },
];

const frameDuration = 6500;

function synchronizePageScroll(top: number) {
  window.dispatchEvent(
    new CustomEvent("forgebench:synchronized-scroll", {
      detail: { top },
    }),
  );
}

export function DeveloperCallPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const activeFrameRef = useRef(0);
  const isTimelineActiveRef = useRef(false);
  const hasActivatedRef = useRef(false);
  const geometryRef = useRef({ sectionTop: 0, scrollRange: 0 });
  const [activeFrame, setActiveFrame] = useState(0);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [isTimelineActive, setIsTimelineActive] = useState(false);
  const [skipTrackTransition, setSkipTrackTransition] = useState(false);
  const [timelineRun, setTimelineRun] = useState(0);

  const getCardStep = useCallback(() => {
    const isCompact = window.matchMedia("(max-width: 56.25rem)").matches;
    return window.innerWidth - (isCompact ? 20 : 60);
  }, []);

  const measureSection = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    geometryRef.current = {
      sectionTop: window.scrollY + section.getBoundingClientRect().top,
      scrollRange: Math.max(0, section.offsetHeight - window.innerHeight),
    };
  }, []);

  const getFrameScrollTarget = useCallback((index: number) => {
    const { scrollRange, sectionTop } = geometryRef.current;
    if (scrollRange <= 0) return null;
    const frameStep = scrollRange / (frames.length + 1);

    return sectionTop + frameStep * (index + 1);
  }, []);

  const showFrame = useCallback(
    (index: number, syncScroll = true) => {
      const normalizedIndex = (index + frames.length) % frames.length;
      const isWrapping =
        activeFrameRef.current === frames.length - 1 && normalizedIndex === 0;

      activeFrameRef.current = normalizedIndex;
      setSkipTrackTransition(isWrapping);
      setActiveFrame(normalizedIndex);
      setCarouselOffset(normalizedIndex * getCardStep());
      setTimelineRun((current) => current + 1);

      if (syncScroll) {
        const target = getFrameScrollTarget(normalizedIndex);
        if (target !== null) {
          synchronizePageScroll(target);
        }
      }

      if (isWrapping) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setSkipTrackTransition(false));
        });
      }
    },
    [getCardStep, getFrameScrollTarget],
  );

  const updateFrameFromScroll = useCallback(() => {
    if (!isTimelineActiveRef.current) return;

    const { scrollRange, sectionTop } = geometryRef.current;
    if (scrollRange <= 0) return;
    const frameStep = scrollRange / (frames.length + 1);
    const targetFrame = Math.min(
      frames.length - 1,
      Math.max(
        0,
        Math.round((window.scrollY - sectionTop) / frameStep) - 1,
      ),
    );
    const currentFrame = activeFrameRef.current;

    if (targetFrame === currentFrame) return;

    const nextFrame =
      currentFrame + (targetFrame > currentFrame ? 1 : -1);
    showFrame(nextFrame);
  }, [showFrame]);

  useEffect(() => {
    let animationFrame = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateFrameFromScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const handleResize = () => {
      measureSection();
      setCarouselOffset(activeFrameRef.current * getCardStep());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [getCardStep, measureSection, updateFrameFromScroll]);

  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isActive = entry.isIntersecting && entry.intersectionRatio >= 0.95;
        isTimelineActiveRef.current = isActive;
        setIsTimelineActive(isActive);

        if (isActive && !hasActivatedRef.current) {
          hasActivatedRef.current = true;
          measureSection();
          showFrame(0);
        } else if (isActive) {
          measureSection();
        }
      },
      { threshold: [0, 0.95, 1] },
    );

    observer.observe(sticky);
    return () => observer.disconnect();
  }, [measureSection, showFrame]);

  useEffect(() => {
    const navigation = window.performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (navigation?.type !== "reload") return;

    const timer = window.setTimeout(() => {
      const section = sectionRef.current;
      if (!section) return;

      const bounds = section.getBoundingClientRect();
      if (bounds.top <= 0 && bounds.bottom >= window.innerHeight) {
        showFrame(0);
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, [showFrame]);

  useEffect(() => {
    if (!isTimelineActive) return;

    const timer = window.setTimeout(() => {
      showFrame(activeFrame + 1);
    }, frameDuration);

    return () => window.clearTimeout(timer);
  }, [activeFrame, isTimelineActive, showFrame]);

  const selectFrame = (index: number) => {
    showFrame(index);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Developer governance and measurement"
    >
      <div ref={stickyRef} className={styles.sticky}>
        <nav className={styles.timeline} aria-label="Capability frames">
          {frames.map((item, index) => (
            <button
              type="button"
              className={index === activeFrame ? styles.activeTab : undefined}
              aria-label={`Show ${item.eyebrow}`}
              aria-current={index === activeFrame ? "step" : undefined}
              onClick={() => selectFrame(index)}
              key={item.title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {index < frames.length - 1 && (
                <i aria-hidden="true">
                  <b
                    key={`${index}-${timelineRun}-${activeFrame}`}
                    className={
                      isTimelineActive && index === activeFrame
                        ? styles.timelineAutoProgress
                        : undefined
                    }
                    style={
                      {
                        "--timeline-progress":
                          index < activeFrame ? 1 : 0,
                      } as CSSProperties
                    }
                  />
                </i>
              )}
            </button>
          ))}
        </nav>

        <div className={styles.viewport}>
          <div
            className={`${styles.track} ${isTimelineActive ? styles.trackActive : ""} ${skipTrackTransition ? styles.trackInstant : ""}`}
            style={
              {
                "--carousel-offset": `${carouselOffset}px`,
              } as CSSProperties
            }
            aria-live="polite"
          >
            {frames.map((item, index) => (
              <article
                className={styles.card}
                aria-hidden={index !== activeFrame}
                key={item.title}
              >
                <Image
                  src="/images/developers/call-path/dashboard.png"
                  alt={
                    index === activeFrame
                      ? "Forgebench dashboard showing calls, spend, budget and model usage"
                      : ""
                  }
                  width={735}
                  height={420}
                  sizes="(max-width: 900px) calc(100vw - 4.5rem), 54vw"
                  className={styles.dashboard}
                />
                <header className={styles.frameHeading}>
                  <p className={styles.eyebrow}>{item.eyebrow}</p>
                  <h2>{item.title}</h2>
                  {item.brands && (
                    <div className={styles.brands} aria-label="GitHub and Jira">
                      <Image
                        src="/images/developers/call-path/github.webp"
                        alt="GitHub"
                        width={136}
                        height={67}
                      />
                      <Image
                        src="/images/developers/call-path/jira.webp"
                        alt="Jira"
                        width={87}
                        height={38}
                      />
                    </div>
                  )}
                </header>
                <div
                  className={`${styles.points} ${item.points.length === 3 ? styles.threePoints : ""}`}
                >
                  {item.points.map((point, pointIndex) => (
                    <div key={point.title}>
                      <span>{String(pointIndex + 1).padStart(2, "0")}</span>
                      <h3>{point.title}</h3>
                      <p>{point.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
