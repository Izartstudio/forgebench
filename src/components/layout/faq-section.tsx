"use client";

import { useState } from "react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema } from "@/lib/seo/schema";

import styles from "./faq-section.module.css";

export const faqs = [
  {
    question: "What is an agent control plane?",
    answer:
      "Forgebench is the layer that registers every agent before its first call, gives each one its own credential, binds the tools and MCP servers it may reach, caps what it may spend, and records what it did. It sits between the agents you've built and the providers and tools they call.",
  },
  {
    question:
      "How is an agent control plane different from an AI gateway?",
    answer:
      "A gateway meters by key and sees only the calls routed to it, so the figure tells you what was spent and not who spent it. A control plane holds the registry, the identity, the tool bindings and the record around that gateway, so the inventory, the spend figure and the audit trail are complete rather than partial.",
  },
  {
    question: "Does Forgebench build, deploy or orchestrate agents?",
    answer:
      "No. Forgebench governs the agents you've built. It doesn't orchestrate them, host them, or restructure their logic.",
  },
  {
    question: "Can I use it with any agent framework?",
    answer:
      "Yes — LangGraph, CrewAI, Microsoft's agent framework, or your own. One client change, once.",
  },
  {
    question: "What does registering an agent involve?",
    answer:
      "To register an agent on Forgebench, you need to name the agent, its owner, and tag it to the features it serves. That mints a unique agent identity, adds its tool bindings, and creates the inventory row everything else is governed against.",
  },
  {
    question: "Do I have to replace my model gateway or observability stack?",
    answer:
      "No. It can complement the infrastructure you already operate and be introduced without a wholesale platform migration.",
  },
  {
    question: "Can an agent call a tool it wasn't bound to?",
    answer:
      "No. The MCP servers and tools an agent may reach are an allowlist decided at registration, and a tool call outside it is refused before the tool runs.",
  },
  {
    question: "What happens when an agent hits a ceiling?",
    answer:
      "Caps apply per model, per agent and per key, and whichever is reached first refuses the call. A refused call reaches no provider and costs nothing, and alerts go to the owner named at registration, before the ceiling rather than after the invoice.",
  },
  {
    question:
      "How does it handle observability and cost tracking?",
    answer:
      "Observability arrives inside the deployment and opens straight from the call record rather than as a separate system to search. Recorded cost is actual, not estimated — reconciled to the cost the gateway reports — and spend rolls up by agent, owner, model, key and the product feature the agent serves.",
  },
  {
    question: "Do guardrails block or delay a response?",
    answer:
      "No. Input and output are evaluated from the recorded call after it returns, never before the request leaves, so a check never delays a response or breaks streaming. Every flagged call names the check that fired, in which direction, on which agent.",
  },
  {
    question: "Can I audit agents and roll back a bad version?",
    answer:
      "Every governed call and every operator action lands on one hash-linked record, so editing or deleting an entry breaks the chain and the break is detectable. Each version is captured with the governance in force when it ran, and a version that starts costing more is rolled back on its own, live, while the others keep running.",
  },
  {
    question: "Is it suitable for regulated environments?",
    answer:
      "It's self-hosted in your own infrastructure, runs against models inside your perimeter, and holds ISO 27001, ISO 9001 and SOC 2 Type 1. Every component is permissively licensed — nothing for your legal review to unpick.",
  },
  {
    question: "Can I trace an agent action back to the user or application that initiated it?",
    answer:
      "Yes. Every governed call carries a correlated identity chain across the principal, agent, run and trace ID. This lets you trace an agent's activity back to the user or application that initiated the workflow.",
  },
  {
    question: "Can I immediately revoke an agent's access if it starts behaving unexpectedly?",
    answer:
      "Yes. You can revoke or rotate its key, deactivate its identity, remove its tool access, change its policy, or set its budget to zero. The change takes effect on the agent's next request.",
  },
  {
    question:
      "Can I configure approval requirements for specific agent tools?",
    answer:
      "Yes. You can apply approval-required policies to selected tools, so an agent can use a tool only when the required approval condition is met.",
  },
  {
    question: "Can I limit how often an agent calls a specific tool?",
    answer:
      "Yes. Tool-level call ceilings can be configured for authorized tools, allowing you to control how frequently an agent can invoke them.",
  },
 
] as const;

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <JsonLd data={faqPageSchema(faqs)} />
      <div className={styles.panel}>
        <header className={styles.intro}>
          <p>FAQs</p>
          <h2 id="faq-heading">
            <span>All You Need to Know</span>
            About Forgebench
          </h2>
          <div className={styles.actions}>
            <ArrowLink
              href="mailto:info@seedlinglabs.com?subject=Book%20an%20AI%20Audit"
              variant="dark"
            >
              Book an AI Audit
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
