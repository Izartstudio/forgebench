"use client";

import { useState } from "react";

import { ArrowLink } from "@/components/ui/arrow-link";

import styles from "./faq-section.module.css";

const faqs = [
  {
    question: "Is Forgebench for developers or for agents?",
    answer:
      "Both, on one deployment. Credential issuance, budgets, rate limits, guardrails, attribution and the audit record govern every consumer of AI in the organization; agent registration, tool authorization and release safety are added on top of the same deployment when agents reach production.",
  },
  {
    question:
      "Can we start with developers and add agents later? Or the other way around?",
    answer:
      "Yes. Start with the workload that matters now, then add developers or agents without replacing the governance layer.",
  },
  {
    question: "Does Forgebench build, deploy or orchestrate my agents?",
    answer:
      "No. Forgebench governs the AI traffic, identity, policy, spend and evidence around the agents you already build and run.",
  },
  {
    question: "Does Forgebench govern Cursor, Claude Code or Codex?",
    answer:
      "Yes. Developer tools can be governed through the same credentials, budgets, routing and audit controls as other AI consumers.",
  },
  {
    question: "Which frameworks does it work with?",
    answer:
      "Forgebench is framework-agnostic and sits between your workloads and approved models or providers.",
  },
  {
    question: "Do I have to replace my model gateway or observability stack?",
    answer:
      "No. It can complement the infrastructure you already operate and be introduced without a wholesale platform migration.",
  },
  {
    question: "How is this different from running an AI gateway?",
    answer:
      "A gateway moves traffic. Forgebench adds consumer identity, budgets, policy, ownership, attribution and an evidence-backed audit record.",
  },
  {
    question: "Can I give every developer their own AI budget?",
    answer:
      "Yes. Budgets and limits can be assigned to individual developers, teams, agents and use cases.",
  },
  {
    question:
      "Can I see which developers, teams or agents are driving most of our LLM spend?",
    answer:
      "Yes. Usage and cost are attributed to the responsible consumer and organizational owner.",
  },
  {
    question: "Can I charge model spend back to a team or use case?",
    answer:
      "Yes. Cost attribution makes internal allocation and chargeback possible at the level your organization needs.",
  },
  {
    question: "Can I track each tool call an agent made?",
    answer:
      "Yes. Agent actions and authorized tool calls can be recorded as part of the audit trail.",
  },
  {
    question: "Which models can it reach?",
    answer:
      "It is model-agnostic and can route to the providers and models your organization approves.",
  },
  {
    question: "Can we run it against models inside our own perimeter?",
    answer:
      "Yes. Deployments can govern models and endpoints running inside your controlled environment.",
  },
  {
    question: "Is it self-hosted or SaaS?",
    answer:
      "Deployment is designed to fit the security and operating model of the organization.",
  },
  {
    question:
      "What happens when a credential hits its ceiling or a rate limit?",
    answer:
      "The configured policy is enforced immediately, with the decision retained in the audit record.",
  },
  {
    question: "What stops a call from bypassing Forgebench?",
    answer:
      "Centralized credentials and network policy keep approved model access on the governed path.",
  },
  {
    question: "Can the audit record be altered?",
    answer:
      "The audit system is designed to preserve a dependable record of requests, decisions and actions.",
  },
  {
    question: "How does Forgebench handle PII, secrets and prompt injection?",
    answer:
      "Guardrails and policy controls can inspect and govern requests before they reach production models.",
  },
  {
    question: "What's the licensing position?",
    answer:
      "Licensing is scoped to the deployment and workloads your organization needs to govern.",
  },
] as const;

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.panel}>
        <header className={styles.intro}>
          <p>FAQs</p>
          <h2 id="faq-heading">
            <span>All You Need to Know</span>
            About Forgebench
          </h2>
          <div className={styles.actions}>
            <ArrowLink href="https://example.com" variant="dark">
              Book an AI Audit
            </ArrowLink>
            <ArrowLink href="https://example.com">
              Try Product Walkthrough
            </ArrowLink>
          </div>
        </header>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                className={`${styles.item} ${isActive ? styles.active : ""}`}
                key={faq.question}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{faq.question}</span>
                  <span className={styles.indicator} aria-hidden="true" />
                </button>
                <div
                  className={styles.answer}
                  id={panelId}
                  aria-hidden={!isActive}
                >
                  <div>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
