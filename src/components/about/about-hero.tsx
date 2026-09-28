import Image from "next/image";

import styles from "./about-hero.module.css";

const agents = [
  { kind: "DEVELOPER KEY", title: "webhook-relay-staging", tags: "# fk_test_03L1M6X4...   Google", tone: "edge" },
  { kind: "DEVELOPER KEY", title: "cdn-origin-prod", tags: "# pk_dev_05C3D8Z...   Cohere", tone: "edge" },
  { kind: "DEVELOPER KEY", title: "data-pipeline-test", tags: "# fk_prod_07G5H0...   Mistral AI", tone: "edge" },
  { kind: "DEVELOPER KEY", title: "ml-inference-dev", tags: "# pk_live_09K7L2D...   Anthropic", tone: "edge" },
  { kind: "AI AGENT", title: "Shipping - tracker 1.8", tags: "#Anthropic_4f8kqw92a1b   gemini-pro", tone: "warm" },
  { kind: "AI AGENT", title: "Check-out - assist 2.1", tags: "#OpenAI_87sgadf513f   gpt-4o", active: true },
  { kind: "AI AGENT", title: "Search - ranker 2.0", tags: "#Mistral_n9gy17lzk6d   command-r+" },
  { kind: "AI AGENT", title: "Returns - handler 3.0", tags: "#Anthropic_xlcw86tnq2i   claude-3", tone: "dark" },
  { kind: "DEVELOPER KEY", title: "search-index-prod", tags: "# sk_prod_19KDN5...   Meta AI", tone: "warm" },
  { kind: "DEVELOPER KEY", title: "mobile-payments-staging", tags: "# sk_live_06E4F9A7...   Perplexity" },
  { kind: "DEVELOPER KEY", title: "web-checkout-prod", tags: "# fk_live_dev_0IJ8M...   OpenAI", active: true },
  { kind: "DEVELOPER KEY", title: "api-gateway-prod", tags: "# gk_live_87Q1...   Groq", tone: "dark" },
] as const;

const cardWall = [...agents, ...agents.slice(0, 8)];

function CardIcon({ src, label }: { src: string; label: string }) {
  return (
    <span className={styles.iconCell} aria-label={label}>
      <Image src={src} alt="" width={17} height={17} />
    </span>
  );
}

function AgentCard({
  agent,
  active,
}: {
  agent: (typeof agents)[number];
  active: boolean;
}) {
  return (
    <article className={`${styles.card} ${active ? styles.cardActive : ""} ${"tone" in agent ? styles[agent.tone] : ""}`}>
      <p className={styles.cardKind}>
        <Image
          src={agent.kind === "AI AGENT" ? "/icons/about/person.svg" : "/icons/about/route.svg"}
          alt=""
          width={11}
          height={11}
        />
        {agent.kind}
      </p>
      <h3><i aria-hidden="true" />{agent.title}</h3>
      <p className={styles.tags}>{agent.tags}</p>
      <div className={styles.cardIcons} aria-hidden="true">
        <CardIcon src="/icons/about/person.svg" label="Identity" />
        <CardIcon src="/icons/about/stacks.svg" label="Stack" />
        <CardIcon src="/icons/about/route.svg" label="Route" />
        <CardIcon src="/icons/about/arrow-range.svg" label="Range" />
      </div>
    </article>
  );
}

export function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-title">
      <div className={styles.statement}>
        <div className={styles.statementInner}>
          <p className={styles.eyebrow}>About Forgebench</p>
          <h1 id="about-title">
            <span>AI Should Move Fast.</span>
            Organizations Should Still<br />Know Where It&apos;s Going.
          </h1>
        </div>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.challenge}>
        <div className={styles.cardField}>
          <div className={styles.cards}>
            {cardWall.map((agent, index) => (
              <AgentCard
                key={`${agent.title}-${index}`}
                agent={agent}
                active={index < agents.length && "active" in agent && agent.active === true}
              />
            ))}
          </div>
        </div>
        <div className={styles.challengeCopy}>
          <p>AI Is Moving From Experimentation Into Production And<br className={styles.desktopBreak} /> Spreading Across Models, Agents, Applications, And Teams.<br className={styles.desktopBreak} /> That Creates A New Challenge:</p>
          <h2><span>Visibility</span> &amp; <span>Control.</span></h2>
          <p className={styles.built}>
            <i aria-hidden="true" />
            <span>So We Built <strong>Forgebench.</strong></span>
          </p>
        </div>
      </div>
    </section>
  );
}
