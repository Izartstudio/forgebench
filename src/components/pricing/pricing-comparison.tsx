"use client";

import { useState } from "react";

import styles from "./pricing-comparison.module.css";

type ComparisonRow = {
  label: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
};

type ComparisonGroup = {
  id: string;
  title: string;
  rows: readonly ComparisonRow[];
};

const groups: readonly ComparisonGroup[] = [
  {
    id: "limits",
    title: "Limits",
    rows: [
      {
        label: "Governed requests / mo",
        free: "10K",
        pro: "500K",
        enterprise: "Custom",
      },
      { label: "Seats", free: "3", pro: "25", enterprise: "Unlimited" },
      { label: "Workspaces", free: "1", pro: "1", enterprise: "Many" },
      { label: "Agents", free: "2", pro: "Unlimited", enterprise: "Unlimited" },
      { label: "MCP servers", free: "2", pro: "25", enterprise: "Custom" },
      {
        label: "Tool calls / mo",
        free: "10K",
        pro: "1M",
        enterprise: "Custom",
      },
      {
        label: "Audit retention",
        free: "—",
        pro: "1 year",
        enterprise: "Configurable",
      },
      {
        label: "Trace retention",
        free: "3 days",
        pro: "30 days",
        enterprise: "Configurable",
      },
    ],
  },
  {
    id: "gateway",
    title: "Gateway",
    rows: [
      { label: "Unified AI gateway", free: true, pro: true, enterprise: true },
      { label: "Provider routing", free: true, pro: true, enterprise: true },
      {
        label: "Custom gateway policies",
        free: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    id: "cost-governance",
    title: "Cost governance",
    rows: [
      { label: "Spend visibility", free: true, pro: true, enterprise: true },
      { label: "Budgets & alerts", free: false, pro: true, enterprise: true },
      { label: "Cost allocation", free: false, pro: true, enterprise: true },
    ],
  },
  {
    id: "observability",
    title: "Observability & audit",
    rows: [
      { label: "Request traces", free: true, pro: true, enterprise: true },
      { label: "Audit logs", free: false, pro: true, enterprise: true },
      { label: "Custom exports", free: false, pro: false, enterprise: true },
    ],
  },
  {
    id: "agents-tools",
    title: "Agents, tools & MCP",
    rows: [
      { label: "Agent inventory", free: true, pro: true, enterprise: true },
      { label: "Tool permissions", free: false, pro: true, enterprise: true },
      { label: "MCP governance", free: false, pro: true, enterprise: true },
    ],
  },
  {
    id: "identity",
    title: "Identity & access",
    rows: [
      {
        label: "Roles & scoped API keys",
        free: true,
        pro: true,
        enterprise: true,
      },
      { label: "OIDC SSO", free: false, pro: true, enterprise: true },
      {
        label: "SCIM provisioning & enforce-SSO",
        free: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    id: "deployment",
    title: "Deployment & infrastructure",
    rows: [
      { label: "Forgebench cloud", free: true, pro: true, enterprise: true },
      {
        label: "Bring your own cloud",
        free: false,
        pro: false,
        enterprise: true,
      },
      {
        label: "Self-hosted deployment",
        free: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    rows: [
      { label: "Documentation", free: true, pro: true, enterprise: true },
      { label: "Email support", free: false, pro: true, enterprise: true },
      { label: "Dedicated support", free: false, pro: false, enterprise: true },
    ],
  },
];

function Value({ value }: { value: string | boolean }) {
  if (typeof value === "string") return <>{value}</>;
  return value ? (
    <span className={styles.check} aria-label="Included">
      ✓
    </span>
  ) : (
    <span aria-label="Not included">—</span>
  );
}

function AccordionGroup({
  group,
  open,
  onToggle,
}: {
  group: ComparisonGroup;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <section className={`${styles.group} ${open ? styles.groupOpen : ""}`}>
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${group.id}-content`}
        >
          <span>{group.title}</span>
          <span className={styles.chevron} aria-hidden="true">
            ⌄
          </span>
        </button>
      </h2>
      <div
        id={`${group.id}-content`}
        className={styles.reveal}
        aria-hidden={!open}
      >
        <div className={styles.rows}>
          {group.rows.map((row) => (
            <div className={styles.row} key={row.label}>
              <div>{row.label}</div>
              <div>
                <Value value={row.free} />
              </div>
              <div>
                <Value value={row.pro} />
              </div>
              <div>
                <Value value={row.enterprise} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingComparison() {
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(["limits"]),
  );
  const toggleGroup = (id: string) =>
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className={styles.comparison} aria-label="Plan feature comparison">
      <div className={styles.scroller}>
        <div className={styles.table}>
          <header className={styles.tableHeader}>
            <p>
              Every Plan Is A Real
              <br />
              Governed Gateway.
            </p>
            <strong>Free</strong>
            <strong>Pro</strong>
            <strong>Enterprise</strong>
          </header>
          {groups.map((group) => (
            <AccordionGroup
              key={group.id}
              group={group}
              open={openGroups.has(group.id)}
              onToggle={() => toggleGroup(group.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
