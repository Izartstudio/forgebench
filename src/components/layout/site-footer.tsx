import Image from "next/image";

import styles from "./site-footer.module.css";

const linkGroups = [
  {
    title: "About Us",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact Us", href: "mailto:info@seedlinglabs.com" },
      {
        label: "SeedlingLabs",
        href: "https://seedlinglabs.com",
        external: true,
      },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Developers", href: "/developers" },
      { label: "Agents", href: "/agents" },
      { label: "Blog", href: "/blog" },
    ],
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
              <a
                href={link.href}
                key={link.label}
                {...("external" in link
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {link.label}
                {"external" in link && (
                  <span className={styles.footerArrow} aria-hidden="true" />
                )}
              </a>
            ))}
          </div>
        ))}
        <div className={`${styles.brandLine} ${styles.mobileBrandLine}`}>
          <p>Every call governed.</p>
          <p>Every dollar accounted for.</p>
          <Image
            src="/logos/logo-footer.webp"
            alt="Forgebench"
            width={321}
            height={60}
            sizes="196px"
          />
        </div>
      </nav>

      <Image
        className={styles.wordmark}
        src="/logos/footer-logo.webp"
        alt="Forgebench"
        width={1440}
        height={272}
        sizes="100vw"
      />

      <div className={`${styles.brandLine} ${styles.desktopBrandLine}`}>
        <p>Every call governed.</p>
        <p>Every dollar accounted for.</p>
        <Image
          src="/logos/logo-footer.webp"
          alt="Forgebench"
          width={321}
          height={60}
          sizes="321px"
        />
      </div>

      <div className={styles.legal}>
        <p>2026 SeedlingLabs. All rights reserved.</p>
        <span />
        <p>
          Self-hosted · Model-agnostic · AI-ready supported · ISO 27001 · ISO
          9001 · SOC 2 Type 1
        </p>
      </div>
    </footer>
  );
}
