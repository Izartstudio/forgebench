import Image from "next/image";

import styles from "./platform-product-card.module.css";

type CardType =
  | "registry"
  | "gateway"
  | "routing"
  | "guardrails"
  | "ai-insights"
  | "observability"
  | "audit";

const agents = [
  ["Fraud & Transaction Triage Agent", "Claude Opus 4.8", "6"],
  ["Financial Reconciliation Agent", "Claude Sonnet 4.5", "4"],
  ["Customer Support Resolution Agent", "Llama 4 Maverick", "8"],
  ["Risk Review Agent", "Gemini 3.1 Pro", "4"],
  ["Invoice Reconciliation Agent", "Claude Haiku 4.5", "5"],
  ["Compliance Monitoring Agent", "Mistral Large 2", "3"],
  ["Portfolio Analysis Agent", "DeepSeek V3.1", "7"],
  ["Identity Verification Agent", "Gemma 3 27B", "3"],
  ["Treasury Operations Agent", "Command R+", "5"],
  ["Dispute Resolution Agent", "GPT-OSS 120B", "4"],
];

const models = [
  "Claude Opus 5.5",
  "Claude Fable 5.1",
  "Claude Sonnet 5",
  "Claude Sonnet 4.5",
  "Claude Haiku 4.5",
  "Kimi K2",
  "Qwen3 235B Instruct",
  "DeepSeek V3.1",
  "Llama 4 Maverick",
  "Mistral Large 2",
  "Gemma 3 27B",
  "GLM-4.5",
  "Command R+",
  "GPT-OSS 120B",
  "Qwen3 Coder",
  "DeepSeek R1",
  "Llama 3.3 70B",
  "Mistral Small 3.1",
  "Kimi K2 Thinking",
];
const traceNames = [
  "Fraud & Transaction Triage",
  "Financial Reconciliation",
  "Support Resolution",
  "Risk Review",
  "Compliance Monitoring",
  "Invoice Reconciliation",
  "Refund Review",
];

function Header({
  title,
  tabs,
  count,
}: {
  title: string;
  tabs: string[];
  count: string;
}) {
  return (
    <header className={styles.header}>
      <strong>{title}</strong>
      <nav>
        {tabs.map((tab, i) => (
          <span className={i === 0 ? styles.selectedTab : ""} key={tab}>
            {tab}
          </span>
        ))}
      </nav>
      <small>{count}</small>
    </header>
  );
}

function Rows({ rows, columns = 3 }: { rows: string[][]; columns?: number }) {
  return (
    <div className={styles.rows} data-columns={columns}>
      {rows.map((row, index) => (
        <div
          className={styles.row}
          style={{ "--row": index } as React.CSSProperties}
          key={`${row[0]}-${index}`}
        >
          {row.slice(0, columns).map((cell, cellIndex) => (
            <span key={`${cell}-${cellIndex}`}>
              {cellIndex === 0 && <i />}
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Modal({
  kind,
}: {
  kind: "registry" | "gateway" | "guardrails" | "observability" | "audit";
}) {
  if (kind === "gateway")
    return (
      <aside className={`${styles.modal} ${styles.gatewayModal}`}>
        <b>Governed completion</b>
        <em>COMPLETED</em>
        <p>Fraud & Transaction Triage Agent</p>
        <div className={styles.metrics}>
          <span>
            MODEL<strong>Claude Opus 5.5</strong>
          </span>
          <span>
            CREDENTIAL<strong>fraud-triage</strong>
          </span>
        </div>
        <div className={`${styles.metrics} ${styles.gatewayMetrics}`}>
          <span>
            BUDGET<strong>$46 / $50</strong>
          </span>
          <span>
            CALL COST<strong>$0.067</strong>
          </span>
          <span>
            POLICY<strong>configured</strong>
          </span>
          <span>
            AUDIT<strong>ready</strong>
          </span>
        </div>
        <p>
          <a>trace_8f2…</a>　provider key withheld · response completed
        </p>
      </aside>
    );
  if (kind === "guardrails")
    return (
      <aside className={`${styles.assetModal} ${styles.findingAsset}`}>
        <Image
          src="/images/platform/details/fraud-transaction.svg"
          alt="Fraud and transaction guardrail findings"
          width={471}
          height={275}
        />
        <span className={styles.assetLineMask} />
        <span className={styles.assetLineMask} />
        <span className={styles.assetLineMask} />
        <span className={styles.assetLineMask} />
      </aside>
    );
  if (kind === "observability")
    return (
      <aside className={`${styles.assetModal} ${styles.observabilityAsset}`}>
        <Image
          src="/images/platform/details/fraud-observability.svg"
          alt="Fraud and transaction observability trace"
          width={482}
          height={362}
        />
        <span className={styles.assetLineMask} />
        <span className={styles.assetLineMask} />
        <span className={styles.assetLineMask} />
        <span className={styles.assetLineMask} />
      </aside>
    );
  if (kind === "audit")
    return (
      <aside className={`${styles.modal} ${styles.auditModal}`}>
        <b>policy.update #47058</b>
        <em>CHAIN VERIFIED</em>
        <p>2h ago · operator action</p>
        <div className={styles.metrics}>
          <span>
            ACTOR<strong>John Doe</strong>
          </span>
          <span>
            RESOURCE<strong>fraud-triage</strong>
          </span>
          <span>
            API KEY<strong>fraud-key-01</strong>
          </span>
        </div>
        <h6>RECORDED CHANGE</h6>
        <div className={styles.recordedChange}>
          Outbound PII <span>report-only</span> → <em>configured</em>
        </div>
        <h6>HASH CHAIN</h6>
        <div className={styles.hashChain}>
          …e104 ───── <b>686578a0…be22</b> ───── <em>ready</em>
        </div>
        <p>
          LINKED TRACE　<a>Fraud & Transaction Triage · trace_8f2…</a>
        </p>
      </aside>
    );
  return (
    <aside className={`${styles.modal} ${styles.registryModal}`}>
      <b>Fraud & Transaction Triage</b>
      <em>ACTIVE</em>
      <p>Production identity</p>
      <div className={styles.metrics}>
        <span>
          PINNED MODEL<strong>claude-opus-4-8</strong>
        </span>
        <span>
          OWNER<strong>sarah.chen@fintechdemo…</strong>
        </span>
      </div>
      <h6>MONTHLY CEILING</h6>
      <div className={styles.budget}>
        <strong>$46</strong>
        <span>/ $50</span>
        <i />
      </div>
      <h6>REACH</h6>
      <div className={styles.reach}>
        <span>3 MCP</span>
        <span>3 registry tools</span>
      </div>
      <h6>RECENT TOOL CALLS</h6>
      {["get_account", "run_query", "get_transaction"].map((x, i) => (
        <div
          className={styles.toolCall}
          style={{ "--row": i } as React.CSSProperties}
          key={x}
        >
          {x}
          <span>● allowed</span>
          <em>{["263 ms", "1,127 ms", "128 ms"][i]}</em>
        </div>
      ))}
    </aside>
  );
}

function Registry() {
  return (
    <>
      <Header
        title="Registry"
        tabs={["Agents", "MCP", "Tools"]}
        count="18 agents"
      />
      <div className={styles.columnLabels} data-columns="3">
        <span>AGENT</span>
        <span>MODEL</span>
        <span>TOOLS</span>
      </div>
      <Rows rows={agents} />
      <Modal kind="registry" />
    </>
  );
}

function Gateway() {
  return (
    <>
      <Header
        title="Gateway"
        tabs={["Models", "Providers", "Credentials"]}
        count="18 models"
      />
      <div className={styles.columnLabels} data-columns="6">
        <span>MODEL</span>
        <span>PROVIDER</span>
        <span>CONTEXT</span>
        <span>INPUT</span>
        <span>OUTPUT</span>
        <span>STATUS</span>
      </div>
      <Rows
        columns={6}
        rows={models.map((name, i) => [
          name,
          [
            "Anthropic",
            "Anthropic",
            "Anthropic",
            "Anthropic",
            "Anthropic",
            "Moonshot AI",
            "Alibaba",
            "DeepSeek",
            "Meta",
            "Mistral AI",
            "Google",
            "Zhipu AI",
            "Cohere",
            "OpenAI",
          ][i] || "Moonshot AI",
          i % 3 ? "200K" : "1M",
          i % 2 ? "$0.80" : "$4.00",
          i % 2 ? "$2.00" : "$20.00",
          "Available",
        ])}
      />
      <aside className={styles.providerCard}>
        <Image
          className={styles.claudeLogo}
          src="/images/platform/details/claude-logo.svg"
          alt="Claude"
          width={73}
          height={19}
        />
        <p>Anthropic · all currently-active models</p>
        {[
          "Claude Fable 5.1",
          "Claude Mythos 5.1 · invite-only",
          "Claude Fable 5",
          "Claude Mythos 5",
          "Claude Opus 5.5",
          "Claude Opus 5",
        ].map((m, i) => (
          <span style={{ "--row": i } as React.CSSProperties} key={m}>
            {m}
            <em>Active</em>
          </span>
        ))}
      </aside>
      <Modal kind="gateway" />
    </>
  );
}

function Routing() {
  return (
    <>
      <Header
        title="Routing"
        tabs={["Recommendations", "Benchmarks"]}
        count="12 alternatives"
      />
      <div className={styles.compare}>
        <div>
          <small>CURRENT MODEL</small>
          <b>Claude Opus 5.5</b>
          <span>QUALITY　96　　 LATENCY　1420 ms　　 COST　$0.067</span>
        </div>
        <div className={styles.recommended}>
          <small>FORGEBENCH RECOMMENDED</small>
          <b>Qwen3 235B Instruct</b>
          <span>QUALITY　94　　 LATENCY　1180 ms　　 COST　$0.041</span>
        </div>
      </div>
      <div className={styles.columnLabels} data-columns="6">
        <span>ALTERNATIVE</span>
        <span>QUALITY</span>
        <span>LATENCY</span>
        <span>COST</span>
        <span>CONTEXT</span>
        <span>RATIONALE</span>
      </div>
      <Rows
        columns={6}
        rows={[
          ["Kimi K2", "93", "1290 ms", "$0.038", "256K", "long-context triage"],
          [
            "DeepSeek V3.1",
            "92",
            "1350 ms",
            "$0.029",
            "128K",
            "lowest governed cost",
          ],
          [
            "Llama 4 Maverick",
            "90",
            "980 ms",
            "$0.035",
            "1M",
            "lowest latency",
          ],
          ["Mistral Large 2", "89", "1210 ms", "$0.052", "128K", "stable JSON"],
          ["Claude Sonnet 5", "93", "760 ms", "$0.031", "1M", "balanced"],
          [
            "Claude Haiku 4.5",
            "86",
            "420 ms",
            "$0.014",
            "200K",
            "high throughput",
          ],
          ["Gemma 3 27B", "84", "880 ms", "$0.019", "128K", "compact"],
          ["GLM-4.5", "88", "1010 ms", "$0.044", "128K", "tool use"],
          ["Command R+", "87", "1160 ms", "$0.061", "128K", "retrieval"],
          [
            "Qwen3 Coder",
            "90",
            "1080 ms",
            "$0.033",
            "256K",
            "structured output",
          ],
        ]}
      />
    </>
  );
}

function Guardrails() {
  return (
    <>
      <Header
        title="Guardrails"
        tabs={["Trace findings", "Policies"]}
        count="14 traces"
      />
      <div className={styles.columnLabels} data-columns="8">
        <span>TIME</span>
        <span>TRACE / AGENT</span>
        <span>MODEL</span>
        <span>STATUS</span>
        <span>POLICY</span>
        <span>PII</span>
        <span>SECRET</span>
        <span>DENY</span>
      </div>
      <Rows
        columns={8}
        rows={traceNames.map((name, i) => [
          `12:${41 - i}`,
          name,
          models[i % models.length],
          "Done",
          i % 2 ? "secrets" : "outbound-pii",
          String(i % 3),
          String((i + 1) % 3),
          String((i + 2) % 3),
        ])}
      />
      <Modal kind="guardrails" />
    </>
  );
}

function Insights() {
  const bars = [
    ["Claude Code", 78, "purple"],
    ["Cursor", 45, "orange"],
    ["Codex", 28, "green"],
    ["GitHub Copilot", 13, "yellow"],
    ["Kiro", 9, "pink"],
  ] as const;
  return (
    <>
      <div className={styles.insightsBackdrop} aria-hidden="true">
        <Image
          src="/images/platform/cards/adoption.svg"
          alt=""
          width={755}
          height={543}
          sizes="(max-width: 900px) 94vw, 48rem"
        />
      </div>
      <aside className={styles.profile}>
        <b>
          <i>JD</i> John Doe
        </b>
        <p>john.doe@gmail.com</p>
        <div className={styles.statGrid}>
          {[
            ["159.4M", "TOTAL TOKENS"],
            ["$597.73", "TOTAL COST"],
            ["197", "ACTIVE DAYS"],
            ["809.2K", "AVERAGE A DAY"],
          ].map(([v, l]) => (
            <span key={l}>
              <strong>{v}</strong>
              <small>{l}</small>
            </span>
          ))}
        </div>
        <div className={styles.profileFacts}>
          <span>
            Current streak <b>0 days · best 31</b>
          </span>
          <span>
            Best day <b>$17.97 · Fri 11 Sept</b>
          </span>
          <span>
            Favourite model <b>Claude Opus 4.8</b>
          </span>
        </div>
        <Image
          className={styles.purpleGraph}
          src="/images/platform/details/purple-square.svg"
          alt="A year of AI activity"
          width={479}
          height={111}
        />
        <h6>BY TOOL</h6>
        {bars.map(([name, value, color], i) => (
          <div
            className={styles.toolBar}
            style={{ "--row": i } as React.CSSProperties}
            key={name}
          >
            <b>{name}</b>
            <span>
              <i className={styles[color]} style={{ width: `${value}%` }} />
            </span>
            <em>{value}%</em>
            <small>{["72.3M", "41.7M", "25.7M", "11.8M", "7.9M"][i]}</small>
          </div>
        ))}
        <footer>
          <b>Open full report →</b>
          <span>Copy profile URL</span>
        </footer>
      </aside>
    </>
  );
}

function Observability() {
  return (
    <>
      <Header
        title="Observability"
        tabs={["Traces", "Sessions"]}
        count="13 traces"
      />
      <div className={styles.columnLabels} data-columns="7">
        <span>TIME</span>
        <span>TRACE / AGENT</span>
        <span>MODEL</span>
        <span>STATUS</span>
        <span>LATENCY</span>
        <span>TOKENS</span>
        <span>COST</span>
      </div>
      <Rows
        columns={7}
        rows={traceNames.map((name, i) => [
          `12:${41 - i}`,
          name,
          models[i % models.length],
          "OK",
          `${760 + i * 110} ms`,
          `${1884 + i * 57}`,
          `$0.0${31 + i}`,
        ])}
      />
      <Modal kind="observability" />
    </>
  );
}

function Audit() {
  return (
    <>
      <Header title="Audit" tabs={["Events", "API keys"]} count="14 events" />
      <div className={styles.columnLabels} data-columns="7">
        <span>EVENT</span>
        <span>WHEN</span>
        <span>ACTOR</span>
        <span>RESOURCE</span>
        <span>API KEY</span>
        <span>STATE</span>
        <span>ROW HASH</span>
      </div>
      <Rows
        columns={7}
        rows={[
          "policy.update #47058",
          "api_key.create",
          "agent.task.create",
          "guardrail.policy.update",
          "credential.rotate",
          "trace.export",
          "routing.update",
        ].map((name, i) => [
          name,
          i < 4 ? `${i + 2}h` : `${i - 3}d`,
          i % 2 ? "Jane Doe" : "John Doe",
          i % 2 ? "api-key-ops" : "fraud-triage",
          "fraud-key-01",
          "ready",
          i % 2 ? "7c11…a803" : "686578a0…be22",
        ])}
      />
      <Modal kind="audit" />
    </>
  );
}

const cards = {
  registry: Registry,
  gateway: Gateway,
  routing: Routing,
  guardrails: Guardrails,
  "ai-insights": Insights,
  observability: Observability,
  audit: Audit,
};

export function PlatformProductCard({
  type,
  className,
  animationKey,
}: {
  type: CardType;
  className?: string;
  animationKey: string;
}) {
  const Card = cards[type];
  return (
    <article
      key={animationKey}
      className={`${styles.card} ${className ?? ""}`}
      data-card={type}
      aria-label={`${type} interface in Forgebench`}
    >
      <Card />
    </article>
  );
}
