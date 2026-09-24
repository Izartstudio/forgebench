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

export type CallPathFrame = {
  eyebrow: string;
  title: string;
  image?: string;
  imageAlt?: string;
  brands?: true;
  points: readonly {
    title: string;
    description: string;
  }[];
};

export const developerCallPathFrames: readonly CallPathFrame[] = [
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

// This is the agents-page content source. Replace any frame text or image here
// without changing the developer page or the shared animation component.
export const agentsCallPathFrames: readonly CallPathFrame[] = [
  {
    eyebrow: "Registry · How an agent gets governed",
    title: "One Short Form, Before The Agent’s First Call",
    image: "/images/developers/call-path/dashboard.png",
    imageAlt: "Forgebench agent registry and governance dashboard",
    points: [
      {
        title: "Register",
        description:
          "Name the agent, name its owner, and tag it to the features it serves.",
      },
      {
        title: "Provision",
        description:
          "A unique agent identity is minted, and tool bindings are added to its allowlist.",
      },
      {
        title: "Inventory Row",
        description:
          "The agent appears with owner, tags, state, version and last seen. Listed, but not active.",
      },
      {
        title: "Governed On First Call",
        description:
          "The first call flips it live; there's no separate path for an agent.",
      },
    ],
  },
  {
    eyebrow: "Coverage · The governed call path",
    title: "Every Call, One Route. Refused Before It Costs Anything.",
    image: "/images/developers/call-path/dashboard.png",
    imageAlt: "Forgebench governed agent call-path dashboard",
    points: [
      {
        title: "Credential Authenticated",
        description:
          "The agent's identity and policy are resolved from its own credential.",
      },
      {
        title: "Audit Record Opened",
        description: "Before a provider is ever contacted.",
      },
      {
        title: "Rate And Budget Checked",
        description:
          "Per model, agent and key, each enforced independently. Whichever cap is reached first refuses the call.",
      },
      {
        title: "Metered And Recorded",
        description:
          "Actual cost is attributed to the named agent as it's incurred, and guardrail checks run on the recorded call.",
      },
    ],
  },
  {
    eyebrow: "Policy · Federation and tool authorization",
    title: "An Agent Reaches What You Bind It To, And Nothing Else",
    image: "/images/developers/call-path/dashboard.png",
    imageAlt: "Forgebench agent policy and tool authorization dashboard",
    points: [
      {
        title: "Bound At Registration",
        description:
          "The MCP servers and tools an agent may reach are an allowlist, decided when it's registered.",
      },
      {
        title: "Enforced On Every Call",
        description:
          "Guardrails flag and record a violation; nothing is blocked mid-flight.",
      },
      {
        title: "Three Decisions Per Tool",
        description:
          "Allow, deny, or require approval — with a justification requirement where you need one.",
      },
      {
        title: "Revocable Live",
        description:
          "Revoke a tool or an entire MCP server during an incident. It takes effect on the next tool call, with no deploy.",
      },
    ],
  },
  {
    eyebrow: "Control · Cost control at the agent level",
    title: "A Ceiling That Refuses The Call, And A Number That Reconciles With The Invoice.",
    image: "/images/developers/call-path/dashboard.png",
    imageAlt: "Forgebench agent cost-control dashboard",
    points: [
      {
        title: "Three Dimensions, Enforced Independently",
        description:
          "A cap per model, per agent and per key. Each is checked on the same call, and whichever is reached first refuses it.",
      },
      {
        title: "Enforced Before The Round-Trip",
        description:
          "A refused call reaches no provider and costs nothing — a refusal, not a report after the money is gone.",
      },
      {
        title: "Recorded Cost Is Actual, Not Estimated",
        description:
          "Reconciled to the cost the gateway reports for the call, so attribution and the provider invoice agree.",
      },
      {
        title: "Attribution Beyond The Credential",
        description:
          "Spend rolls up by agent, owner, model, key and the product feature the agent serves — not only by the key it used.",
      },
    ],
  },
  {
    eyebrow: "Auditability · The record",
    title: "One Record. Every Governed Call And Every Operator Action.",
    image: "/images/developers/call-path/dashboard.png",
    imageAlt: "Forgebench tamper-evident agent audit dashboard",
    points: [
      {
        title: "Hash-Linked Entries",
        description:
          "Each entry is cryptographically linked to the one before it, so editing or deleting an entry breaks the chain and the break is detectable. The chain is re-verifiable on demand.",
      },
      {
        title: "Append-Only Record",
        description:
          "Model calls, tool calls, registrations, credential changes, policy edits, pauses and retirements — one list, in order, append-only.",
      },
      {
        title: "Evidence Surface For The Whole Call",
        description:
          "Agent, version, prompt version, credential, model, tokens, actual cost, latency and outcome, plus the guardrail, rate-limit and budget result, all in one console.",
      },
      {
        title: "A Refusal Is Diagnosable",
        description:
          "A refused call names what refused it — guardrail, rate limit or budget — so an incident can be diagnosed live, without writing a query.",
      },
    ],
  },
  {
    eyebrow: "Guardrails · Safety and governance record",
    title: "A Governance Loop That Feeds Your Security Posture",
    image: "/images/developers/call-path/dashboard.png",
    imageAlt: "Forgebench agent guardrails and governance dashboard",
    points: [
      {
        title: "What Is Checked",
        description:
          "Personal data, secrets and credentials, and a per-tenant denylist of banned terms and competitor names check on the recorded input and output.",
      },
      {
        title: "Two Modes, Never Three",
        description:
          "Flag surfaces and records a violation; log records it quietly. Nothing is blocked or redacted mid-flight.",
      },
      {
        title: "A Named Reason, Not A Silent Miss",
        description:
          "Every flagged call names the check that fired — which check, in which direction, on which agent.",
      },
      {
        title: "Tighten Without Shipping",
        description:
          "Policy changes take effect on the next call, and a platform default covers any agent nobody has configured.",
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

type DeveloperCallPathProps = {
  variant?: "developers" | "agents";
  frames?: readonly CallPathFrame[];
};

export function DeveloperCallPath({
  variant = "developers",
  frames: suppliedFrames,
}: DeveloperCallPathProps = {}) {
  const frames = suppliedFrames ??
    (variant === "agents" ? agentsCallPathFrames : developerCallPathFrames);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const mobileScrollLockRef = useRef(false);
  const mobileScrollFrameRef = useRef(0);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUserScrollingRef = useRef(false);
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
    (index: number, syncScroll = true, cyclicAdvance = false) => {
      const normalizedIndex = (index + frames.length) % frames.length;
      const isWrapping =
        cyclicAdvance &&
        activeFrameRef.current === frames.length - 1 &&
        normalizedIndex === 0;

      activeFrameRef.current = normalizedIndex;
      setSkipTrackTransition(isWrapping);
      setActiveFrame(normalizedIndex);
      setCarouselOffset(normalizedIndex * getCardStep());
      setTimelineRun((current) => current + 1);

      const isMobileCarousel = window.matchMedia("(max-width: 56.25rem)").matches;

      if (syncScroll && !isMobileCarousel) {
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
    if (window.matchMedia("(max-width: 56.25rem)").matches) return;

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

    // The user's scroll position is the source of truth here. Updating it again
    // creates a feedback loop with smooth scrolling and makes the sticky frame
    // visibly jump between adjacent positions.
    showFrame(targetFrame, false);
  }, [showFrame]);

  useEffect(() => {
    let animationFrame = 0;
    const handleScroll = () => {
      isUserScrollingRef.current = true;
      if (scrollIdleTimerRef.current !== null) {
        clearTimeout(scrollIdleTimerRef.current);
      }
      scrollIdleTimerRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
        scrollIdleTimerRef.current = null;
      }, 450);

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
      if (scrollIdleTimerRef.current !== null) {
        clearTimeout(scrollIdleTimerRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [getCardStep, measureSection, updateFrameFromScroll]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !window.matchMedia("(max-width: 56.25rem)").matches) return;

    mobileScrollLockRef.current = true;
    viewport.scrollTo({
      left: activeFrame * getCardStep(),
      behavior: skipTrackTransition ? "auto" : "smooth",
    });

    const timer = window.setTimeout(() => {
      mobileScrollLockRef.current = false;
    }, skipTrackTransition ? 50 : 750);

    return () => window.clearTimeout(timer);
  }, [activeFrame, getCardStep, skipTrackTransition]);

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
          showFrame(0, false);
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
        showFrame(0, false);
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, [showFrame]);

  useEffect(() => {
    if (!isTimelineActive) return;

    let timer: ReturnType<typeof setTimeout>;
    const advanceWhenIdle = () => {
      if (isUserScrollingRef.current) {
        timer = setTimeout(advanceWhenIdle, 500);
        return;
      }

      // Auto-advance the cards without moving the page underneath the user.
      showFrame(activeFrame + 1, false, true);
    };

    timer = setTimeout(advanceWhenIdle, frameDuration);

    return () => clearTimeout(timer);
  }, [activeFrame, isTimelineActive, showFrame]);

  const selectFrame = (index: number) => {
    showFrame(index);
  };

  const handleMobileCarouselScroll = () => {
    if (mobileScrollLockRef.current) return;

    window.cancelAnimationFrame(mobileScrollFrameRef.current);
    mobileScrollFrameRef.current = window.requestAnimationFrame(() => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const nextFrame = Math.min(
        frames.length - 1,
        Math.max(0, Math.round(viewport.scrollLeft / getCardStep())),
      );

      if (nextFrame !== activeFrameRef.current) {
        showFrame(nextFrame, false);
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label={
        variant === "agents"
          ? "Agent governance and measurement"
          : "Developer governance and measurement"
      }
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

        <div
          ref={viewportRef}
          className={styles.viewport}
          data-lenis-prevent
          onScroll={handleMobileCarouselScroll}
          onPointerDown={() => {
            mobileScrollLockRef.current = false;
          }}
        >
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
                  src={
                    item.image ??
                    "/images/developers/call-path/dashboard.png"
                  }
                  alt={
                    index === activeFrame
                      ? item.imageAlt ??
                        "Forgebench dashboard showing calls, spend, budget and model usage"
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
        <button
          type="button"
          className={styles.mobileNudge}
          aria-label="Show next timeline card"
          onClick={() => showFrame(activeFrame + 1, false, true)}
        />
      </div>
    </section>
  );
}
