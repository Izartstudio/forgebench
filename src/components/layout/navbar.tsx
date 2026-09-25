"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ArrowLink } from "@/components/ui/arrow-link";

import styles from "./navbar.module.css";

const navigation = [
  { label: "For Developers", href: "/developers" },
  { label: "For Agents", href: "/agents" },
  { label: "Resources", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/company" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link
        className={styles.brand}
        href="/#home-top"
        aria-label="Forgebench home"
      >
        <Image
          src="/logos/nav-logo.webp"
          alt="Forgebench"
          width={107}
          height={20}
          sizes="107px"
        />
      </Link>

      <nav className={styles.navigation} aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <ArrowLink href="/demo" className={styles.secondaryAction}>
          Book A Demo
        </ArrowLink>
        <ArrowLink
          href="/sandbox"
          variant="dark"
          className={styles.primaryAction}
        >
          Try The Sandbox
        </ArrowLink>
        <button
          type="button"
          className={`${styles.menuButton} ${menuOpen ? styles.menuOpen : ""}`}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`${styles.mobileNavigation} ${menuOpen ? styles.mobileNavigationOpen : ""}`}
        aria-label="Mobile navigation"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
