import Image from "next/image";

import styles from "./hero-architecture.module.css";

function AiApps() {
  return (
    <div className={`${styles.endpoint} ${styles.sourceCard}`}>
      <div className={styles.endpointTitle}>AI Apps</div>
      <div className={styles.list}>
        <span>
          <Image
            className={styles.appIcon}
            src="/icons/home/chat-assistant.svg"
            alt=""
            width={11}
            height={11}
          />
          Chat Assistants
        </span>
        <span>
          <Image
            className={styles.appIcon}
            src="/icons/home/customer-facing.svg"
            alt=""
            width={11}
            height={11}
          />
          Customer Facing Agents
        </span>
        <span>
          <Image
            className={styles.appIcon}
            src="/icons/home/internal-apps.svg"
            alt=""
            width={11}
            height={11}
          />
          Internal Apps
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
          <Image
            className={`${styles.brandLogo} ${styles.claudeLogo}`}
            src="/icons/home/claude-logo.svg"
            alt="Claude Code"
            width={65}
            height={17}
          />
        </span>
        <span>
          <Image
            className={styles.brandLogo}
            src="/images/developers/codex-logo.svg"
            alt="Codex"
            width={112}
            height={20}
          />
        </span>
        <span>
          <Image
            className={styles.brandLogo}
            src="/images/developers/copilot-logo.webp"
            alt="GitHub Copilot"
            width={261}
            height={90}
          />
        </span>
        <span>
          <Image
            className={styles.brandLogo}
            src="/icons/home/cursor-logo.svg"
            alt="Cursor"
            width={27}
            height={7}
          />
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
        <span>
          <Image
            className={styles.modelLogo}
            src="/icons/home/first-model-logo.svg"
            alt="Model provider"
            width={13}
            height={13}
          />
        </span>
        <span>
          <Image
            className={styles.modelLogo}
            src="/icons/home/openai.svg"
            alt="OpenAI"
            width={13}
            height={13}
          />
        </span>
        <span>
          <Image
            className={styles.modelLogo}
            src="/icons/home/logo-finetuned.svg"
            alt="Finetuned model"
            width={20}
            height={20}
          />
        </span>
        <span className={styles.gemini}>✦</span>
        <span>
          <Image
            className={styles.modelLogo}
            src="/icons/home/a-logo.svg"
            alt="Anthropic"
            width={13}
            height={13}
          />
        </span>
        <span>
          <Image
            className={styles.modelLogo}
            src="/icons/home/m-logo.svg"
            alt="Mistral"
            width={13}
            height={13}
          />
        </span>
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
        <span>
          <Image
            className={styles.mcpLogo}
            src="/icons/home/slack.svg"
            alt="Slack"
            width={15}
            height={15}
          />
        </span>
        <span>
          <Image
            className={styles.mcpLogo}
            src="/icons/home/mail.svg"
            alt="Mail"
            width={15}
            height={15}
          />
        </span>
        <span>
          <Image
            className={styles.mcpLogo}
            src="/icons/home/mcp-3.svg"
            alt="MCP integration"
            width={15}
            height={15}
          />
        </span>
        <span>
          <Image
            className={styles.mcpLogo}
            src="/icons/home/github.svg"
            alt="GitHub"
            width={15}
            height={15}
          />
        </span>
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
        <rect
          className={`${styles.junction} ${styles.sourceJunction}`}
          x="192.5"
          y="206.5"
          width="7"
          height="7"
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
        <rect
          className={`${styles.junction} ${styles.targetJunction}`}
          x="702.5"
          y="206.5"
          width="7"
          height="7"
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
          className={`${styles.connectorPath} ${styles.sourceMerge} ${styles.standardMobileSource}`}
          d="M138 106V145"
        />
        <path
          className={`${styles.arrowHead} ${styles.sourceArrow} ${styles.standardMobileSource}`}
          d="M132 138L138 145L144 138"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.sourceMerge} ${styles.narrowSourcePath}`}
          d="M138 106V137"
        />
        <path
          className={`${styles.arrowHead} ${styles.sourceArrow} ${styles.narrowSourceArrow}`}
          d="M132 130L138 137L144 130"
        />
        <rect
          className={`${styles.junction} ${styles.sourceJunction}`}
          x="135"
          y="103"
          width="6"
          height="6"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetStem} ${styles.standardMobileTarget}`}
          d="M138 319V358"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetTop} ${styles.standardMobileTarget}`}
          d="M138 358H68V370"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetBottom} ${styles.standardMobileTarget}`}
          d="M138 358H208V370"
        />
        <path
          className={`${styles.arrowHead} ${styles.targetArrow} ${styles.standardMobileTarget}`}
          d="M62 363L68 370L74 363M202 363L208 370L214 363"
        />
        <rect
          className={`${styles.junction} ${styles.targetJunction} ${styles.standardMobileTarget}`}
          x="135"
          y="355"
          width="6"
          height="6"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetStem} ${styles.narrowTargetPath}`}
          d="M138 319V350"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetTop} ${styles.narrowTargetPath}`}
          d="M138 350H68V362"
        />
        <path
          pathLength="1"
          className={`${styles.connectorPath} ${styles.targetBottom} ${styles.narrowTargetPath}`}
          d="M138 350H208V362"
        />
        <path
          className={`${styles.arrowHead} ${styles.targetArrow} ${styles.narrowTargetArrow}`}
          d="M62 355L68 362L74 355M202 355L208 362L214 355"
        />
        <rect
          className={`${styles.junction} ${styles.targetJunction} ${styles.narrowTargetPath}`}
          x="135"
          y="347"
          width="6"
          height="6"
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
