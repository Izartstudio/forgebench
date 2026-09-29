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
    question: "How is an agent control plane different from an AI gateway?",
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
    question: "How does it handle observability and cost tracking?",
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
    question:
      "Can I trace an agent action back to the user or application that initiated it?",
    answer:
      "Yes. Every governed call carries a correlated identity chain across the principal, agent, run and trace ID. This lets you trace an agent's activity back to the user or application that initiated the workflow.",
  },
  {
    question:
      "Can I immediately revoke an agent's access if it starts behaving unexpectedly?",
    answer:
      "Yes. You can revoke or rotate its key, deactivate its identity, remove its tool access, change its policy, or set its budget to zero. The change takes effect on the agent's next request.",
  },
  {
    question: "Can I configure approval requirements for specific agent tools?",
    answer:
      "Yes. You can apply approval-required policies to selected tools, so an agent can use a tool only when the required approval condition is met.",
  },
  {
    question: "Can I limit how often an agent calls a specific tool?",
    answer:
      "Yes. Tool-level call ceilings can be configured for authorized tools, allowing you to control how frequently an agent can invoke them.",
  },
] as const;

const homepageFaqs = [
  {
    question: "Is Forgebench for developers or for agents?",
    answer:
      "Both, on one deployment. Credential issuance, budgets, rate limits, guardrails, attribution and the audit record govern every consumer of AI in the organization; agent registration, tool authorization and release safety are added on top of the same deployment when agents reach production.",
  },
  {
    question:
      "Can we start with developers and add agents later? Or the other way around?",
    answer:
      "Yes. The credentials, ceilings, guardrails and record stay exactly as they are — nothing to migrate, and nothing to buy twice.",
  },
  {
    question: "Does Forgebench build, deploy or orchestrate my agents?",
    answer:
      "No. Forgebench governs what already runs. It doesn't build, deploy, host or orchestrate agents, and it doesn't restructure their logic.",
  },
  {
    question: "Does Forgebench govern Cursor, Claude Code or Codex?",
    answer:
      "Yes, your developer kit is metered at individual developer and team level for efficiency and style of usage against 5 parameters.",
  },
  {
    question: "Which frameworks does it work with?",
    answer:
      "Any. LangGraph, CrewAI, Microsoft's agent framework, or your own — connecting an agent is a one-time endpoint change.",
  },
  {
    question: "Do I have to replace my model gateway or observability stack?",
    answer:
      "No. Both arrive inside Forgebench, already wired to the registry, the ceilings and the record, so there's nothing to integrate between them.",
  },
  {
    question: "How is this different from running an AI gateway?",
    answer:
      "A gateway meters by key and only sees the calls that were routed to it, so the figure tells you what was spent and not who spent it. Forgebench holds the credential, the registry, the bindings and the record around that gateway, so the inventory, the spend figure and the audit trail are complete rather than partial.",
  },
  {
    question: "Can I give every developer their own AI budget?",
    answer:
      "Yes. Three hundred developers can be issued three hundred credentials in one pass, and a single budget can be split across models — a $300 monthly allowance can be $100 on one provider and $100 on another, so no one model consumes the whole allocation.",
  },
  {
    question:
      "Can I see which developers, teams or agents are driving most of our LLM spend?",
    answer:
      "Yes. Cost attributes to the credential, its owner, the team, the model and the use case as it is incurred, so the ranking is by name rather than by shared API key.",
  },
  {
    question: "Can I charge model spend back to a team or use case?",
    answer:
      "Yes. Because attribution happens as the cost is incurred rather than by splitting an invoice afterwards, the team is charged on actuals and the figure reconciles against the provider invoice.",
  },
  {
    question: "Can I track each tool call an agent made?",
    answer:
      "Yes. Tool calls and model calls land on the same record against the same credential, so you can see exactly which tools each agent called and when.",
  },
  {
    question: "Which models can it reach?",
    answer:
      "One interface reaches a frontier LLM API or a model inside your perimeter, and the same controls apply to both.",
  },
  {
    question: "Can we run it against models inside our own perimeter?",
    answer:
      "Yes. Forgebench is self-hosted in your own infrastructure and reaches in-perimeter models through the same interface as any provider.",
  },
  {
    question: "Is it self-hosted or SaaS?",
    answer: "Self-hosted, in your own infrastructure.",
  },
  {
    question:
      "What happens when a credential hits its ceiling or a rate limit?",
    answer:
      "Caps apply per developer, team, agent, feature and model, and whichever cap is reached first refuses the next call. A refused call never reaches a provider, so it costs nothing, and the owner named at issuance is warned on the way up rather than after the invoice.",
  },
  {
    question: "What stops a call from bypassing Forgebench?",
    answer:
      "No developer or agent holds a provider key of its own — each authenticates with a credential that belongs only to it, and every route to a provider runs through the control plane. A compromised consumer exposes a revocable credential rather than your model account.",
  },
  {
    question: "Can the audit record be altered?",
    answer:
      "Each entry is hash-linked to the one before it, so an entry that is edited or deleted is detectable. The chain is re-verifiable on demand.",
  },
  {
    question: "How does Forgebench handle PII, secrets and prompt injection?",
    answer:
      "Personal data, secrets and denylist checks are evaluated on every call and recorded off the response path — findings are flagged against the credential that made the call, and nothing is held or redacted mid-flight. Prompt-injection defence, jailbreak defence, content moderation and output-schema conformance stay with the model provider.",
  },
  {
    question: "What's the licensing position?",
    answer:
      "Every component is permissively licensed — no copyleft, no SSPL, no BSL, and no vendor commercial editions.",
  },
] as const;

const developerFaqs = [
  {
    question: "What does Forgebench govern for developers using AI?",
    answer:
      "The API keys your organization issues. Every call made with a Forgebench credential is routed through one path, checked against a ceiling and a rate limit, scanned for what leaves your perimeter, and recorded — with the cost attributed to the developer, team or feature the credential belongs to.",
  },
  {
    question:
      "Can you cap what a developer spends on Claude Code or GitHub Copilot?",
    answer:
      "No. Those run on your company's own vendor accounts and seat subscriptions, so the spend never passes through Forgebench and there's nothing for us to hold. We integrate read-only and report what each person and team is spending, alongside the work it produced. Caps, rate limits and guardrails apply to the credentials you issue through Forgebench.",
  },
  {
    question: "Which coding assistants do you support?",
    answer:
      "Claude Code, Codex, GitHub Copilot and AWS Kiro — which between them cover most of what enterprises have deployed. The integrations are read-only and use the accounts your company has already issued.",
  },
  {
    question: "Do developers have to install anything?",
    answer:
      "For Claude Code, no — it's a managed-settings file pushed through your MDM. Codex and the working-style profile sync through a small CLI that runs at session end. Jira and GitHub are read-only connections made once, centrally.",
  },
  {
    question: "What leaves a developer's machine?",
    answer:
      "Counts, scores and model names. Prompt text and file contents never do.",
  },
  {
    question: "Can developers be measured individually?",
    answer:
      "That's your choice, and it's configurable rather than assumed. There's an aggregate-only mode with a minimum group size, team-lead scoping so a lead sees only their own team, and a personal view where each developer sees their own record.",
  },
  {
    question: "How do you connect spend to output?",
    answer:
      "A session ties to its branch, the branch to its pull request, and the pull request to the Jira issue it closed. That gives you cost per commit, per pull request and per 1K lines, and tokens spent against story points closed. Sessions without Git context are excluded from those figures rather than estimated.",
  },
  {
    question: "Do I have to give every developer their own credential?",
    answer:
      "No, but one credential per developer is what gives you attribution per developer. Share one across a team and the attribution is per team — the granularity is a choice, not a constraint.",
  },
  {
    question: "What happens when a developer hits a ceiling?",
    answer:
      "Caps apply per developer, team, feature and model, and whichever is reached first refuses the next call. A refused call reaches no provider and costs nothing, and the owner named on the credential is warned on the way up rather than after the invoice.",
  },
  {
    question: "Does this replace my model gateway or observability stack?",
    answer:
      "Both arrive inside Forgebench, already wired to the credentials, the ceilings and the record, so there's nothing to integrate between them.",
  },
  {
    question: "Do guardrails block or delay a response?",
    answer:
      "No. Input and output are evaluated from the recorded call after it returns, so a check never delays a response or breaks streaming. Every flagged call names the check that fired.",
  },
  {
    question: "Is it self-hosted?",
    answer:
      "Yes, in your own infrastructure, and it reaches models inside your perimeter through the same interface as any provider.",
  },
  {
    question: "Can we govern agents in production too?",
    answer:
      "Yes, on the same deployment. Agent registration, tool authorization and release safety are added on top of the credentials, ceilings, guardrails and record described here.",
  },
  {
    question: "Can Forgebench govern AI usage across multiple model providers?",
    answer:
      "Yes. Forgebench provides a common governance and visibility layer for AI usage across different model providers, allowing organizations to manage usage, attribution and policy through a single control layer rather than managing each provider separately.",
  },
  {
    question:
      "Can Forgebench work with AI infrastructure we have already built?",
    answer:
      "Yes. Forgebench is designed to work alongside existing AI infrastructure rather than requiring an organization to replace its existing model or AI stack. It can provide the governance, attribution and control layer around the infrastructure already in place.",
  },
  {
    question: "Can Forgebench work with AWS Bedrock?",
    answer:
      "Yes. Forgebench can integrate with deployed models through enterprise AI infrastructure such as AWS Bedrock and provide a unified view of governed AI usage.",
  },
  {
    question: "Can Forgebench work with Azure OpenAI Foundry?",
    answer:
      "Yes. Forgebench can integrate with deployed models through Azure OpenAI Foundry to provide a unified view of AI usage while supporting enterprise deployment and data-privacy requirements.",
  },
  {
    question: "How does Forgebench integrate with our existing SSO and RBAC?",
    answer:
      "Forgebench supports standard SSO and RBAC integrations. Developers can use the organization's existing identity infrastructure, while Forgebench maintains the credentials and usage records needed for AI governance. Agents are registered as distinct identities when separate attribution and controls are required.",
  },
  {
    question:
      "What happens if an application calls an AI provider directly instead of going through Forgebench?",
    answer:
      "Forgebench can only govern and record traffic that passes through its controlled endpoint. A direct call using an independent provider credential does not appear in the Forgebench ledger. Organizations can compare provider-reported spend with Forgebench-metered spend to identify potential ungoverned AI usage.",
  },
  {
    question: "Can we make Forgebench the mandatory path for AI calls?",
    answer:
      "Yes, when deployed with the appropriate network controls. In a network-enforced deployment, workloads can be configured so that model providers and external endpoints are reachable only through Forgebench. This makes governance an enforced network path rather than an application-level choice.",
  },
  {
    question: "Can we restrict which models a developer or team can use?",
    answer:
      "Yes. Model access can be controlled through the policies associated with the credentials issued to developers, teams or features. This allows organizations to define which approved models can be used in a given context.",
  },
] as const;

export function FaqSection({
  variant = "default",
}: {
  variant?: "default" | "homepage" | "developers";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const items =
    variant === "homepage"
      ? homepageFaqs
      : variant === "developers"
        ? developerFaqs
        : faqs;

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <JsonLd data={faqPageSchema(items)} />
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
          {items.map((faq, index) => {
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
