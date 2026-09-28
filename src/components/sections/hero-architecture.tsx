import styles from "./hero-architecture.module.css";

function AiApps() {
  return (
    <div className={`${styles.endpoint} ${styles.sourceCard}`}>
      <div className={styles.endpointTitle}>AI Apps</div>
      <div className={styles.list}>
        <span>
          <i>◆</i>Chat Assistants
        </span>
        <span>
          <i>♟</i>Customer Facing Agents
        </span>
        <span>
          <i>✣</i>Internal Apps
        </span>
      </div>
    </div>
  );
}

function CodingAssistants() {
  return (
    <div className={`${styles.endpoint} ${styles.sourceCard}`}>
      <div className={styles.endpointTitle}>Coding Assistants</div>
      <div className={styles.brandGrid}>
        <span>
          <b className={styles.claudeMark}>✳</b>Claude Code
        </span>
        <span>Codex</span>
        <span>
          <b>◉</b>Copilot
        </span>
        <span>
          <b>⬟</b>CURSOR
        </span>
      </div>
    </div>
  );
}

function ModelTargets() {
  return (
    <div className={`${styles.endpoint} ${styles.targetCard}`}>
      <div className={styles.endpointTitle}>1000+ LLMs</div>
      <div className={`${styles.logoGrid} ${styles.modelGrid}`}>
        <span className={styles.azure}>A</span>
        <span className={styles.openAi}>◉</span>
        <span>✳</span>
        <span className={styles.gemini}>✦</span>
        <span className={styles.anthropic}>AI</span>
        <span className={styles.mistral}>M</span>
      </div>
      <div className={styles.endpointFooter}>
        <span>Open Source</span>
        <span>Finetuned</span>
      </div>
    </div>
  );
}

function McpTargets() {
  return (
    <div className={`${styles.endpoint} ${styles.targetCard}`}>
      <div className={styles.endpointTitle}>MCP Servers</div>
      <div className={`${styles.logoGrid} ${styles.mcpGrid}`}>
        <span className={styles.slack}>✣</span>
        <span className={styles.gmail}>M</span>
        <span className={styles.atlassian}>◆</span>
        <span className={styles.github}>●</span>
      </div>
    </div>
  );
}

function Core() {
  return (
    <div className={styles.core}>
      <div className={styles.coreTitle}>Forgebench</div>
      <div className={styles.coreColumns}>
        <div className={styles.coreColumn}>
          <strong>Build</strong>
          <small>Configured before the call</small>
          <span className={styles.wideCell}>Credentials Registry</span>
          <div className={styles.splitCells}>
            <span>Federation policy</span>
            <span>Budgets</span>
          </div>
        </div>
        <div className={styles.coreColumn}>
          <strong>Run</strong>
          <small>On the call path</small>
          <div className={styles.splitCells}>
            <span>Gateway</span>
            <span>Guardrails</span>
          </div>
          <span className={styles.wideCell}>Observability</span>
        </div>
      </div>
      <div className={styles.control}>
        <strong>Control</strong>
        <small>Reads everything build and run produce</small>
        <div className={styles.splitCells}>
          <span>Audit</span>
          <span>Optimization</span>
        </div>
      </div>
    </div>
  );
}

function Connectors() {
  return (
    <>
      <svg
        className={styles.desktopConnectors}
        viewBox="0 0 903 420"
        aria-hidden="true"
      >
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.sourceTop}`}
          d="M170 98H196V210"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.sourceBottom}`}
          d="M170 318H196V210"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.sourceMerge}`}
          d="M196 210H216"
        />
        <path
          className={`${styles.arrowHead} ${styles.sourceArrow}`}
          d="M209 204L216 210L209 216"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetStem}`}
          d="M686 210H706"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetTop}`}
          d="M706 210V108H732"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetBottom}`}
          d="M706 210V312H732"
        />
        <path
          className={`${styles.arrowHead} ${styles.targetArrow}`}
          d="M725 102L732 108L725 114M725 306L732 312L725 318"
        />
      </svg>
      <svg
        className={styles.mobileConnectors}
        viewBox="0 0 276 474"
        aria-hidden="true"
      >
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.sourceTop}`}
          d="M68 95V106H138"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.sourceBottom}`}
          d="M208 95V106H138"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.sourceMerge}`}
          d="M138 106V145"
        />
        <path
          className={`${styles.arrowHead} ${styles.sourceArrow}`}
          d="M132 138L138 145L144 138"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetStem}`}
          d="M138 319V358"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetTop}`}
          d="M138 358H68V370"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetBottom}`}
          d="M138 358H208V370"
        />
        <path
          className={`${styles.arrowHead} ${styles.targetArrow}`}
          d="M62 363L68 370L74 363M202 363L208 370L214 363"
        />
      </svg>
    </>
  );
}

export function HeroArchitecture() {
  return (
    <div className={styles.architecture}>
      <Connectors />
      <div className={styles.sources}>
        <AiApps />
        <CodingAssistants />
      </div>
      <Core />
      <div className={styles.targets}>
        <ModelTargets />
        <McpTargets />
      </div>
    </div>
  );
}
