import Image from "next/image";

import styles from "./site-footer.module.css";

const linkGroups = [
  {
    title: "Deployment & Security",
    links: ["Docs", "Quick Start", "Github", "Changelog"],
  },
  {
    title: "Resources",
    links: [
      "Blog",
      "Trust Centre",
      "Forgebench for Developers using AI",
      "Forgebench for Agent Management",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "News", "Pricing", "Contact Us", "Seedling Labs ↗"],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.links} aria-label="Footer navigation">
        {linkGroups.map((group) => (
          <div className={styles.group} key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <a href="#" key={link}>
                {link}
              </a>
            ))}
          </div>
        ))}
        <div className={`${styles.brandLine} ${styles.mobileBrandLine}`}>
          <p>Every call governed.</p>
          <p>Every dollar accounted for.</p>
          <Image
            src="/logos/logo-footer.svg"
            alt="Forgebench"
            width={321}
            height={60}
            sizes="196px"
          />
        </div>
      </nav>

      <Image
        className={styles.wordmark}
        src="/logos/footer-logo.svg"
        alt="Forgebench"
        width={1440}
        height={272}
        sizes="100vw"
      />

      <div className={`${styles.brandLine} ${styles.desktopBrandLine}`}>
        <p>Every call governed.</p>
        <p>Every dollar accounted for.</p>
        <Image
          src="/logos/logo-footer.svg"
          alt="Forgebench"
          width={321}
          height={60}
          sizes="321px"
        />
      </div>

      <div className={styles.legal}>
        <p>2026 Seedling Labs. All rights reserved.</p>
        <span />
        <p>
          Self-hosted · Model-agnostic · AI-ready supported · ISO 27001 · ISO
          9001 · SOC 2 Type 1
        </p>
      </div>
    </footer>
  );
}
