"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ArrowLink } from "@/components/ui/arrow-link";

import styles from "./navbar.module.css";

const navigation = [
  { label: "For Developers", href: "/developers" },
  { label: "For Agents", href: "/agents" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about-us" },
] as const;

const resources = [
  { label: "Blog", href: "/blog" },
  { label: "In Media", href: "/in-media" },
  { label: "Case Studies", href: "/case-studies" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScroll.current;

      setScrolled(current > 24);
      if (menuOpen || current < 120) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    lastScroll.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${hidden ? styles.hidden : ""}`}
    >
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
        {navigation.slice(0, 2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? styles.activeLink : undefined}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <div className={styles.resourceMenu}>
          <Link
            href="/blog"
            className={
              pathname.startsWith("/blog") ||
              pathname.startsWith("/in-media") ||
              pathname.startsWith("/case-studies")
                ? styles.activeLink
                : undefined
            }
          >
            Resources <span className={styles.chevron} aria-hidden="true" />
          </Link>
          <div className={styles.resourceDropdown}>
            {resources.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive(item.href) ? styles.activeResource : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {navigation.slice(2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? styles.activeLink : undefined}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <ArrowLink
          href="mailto:info@seedlinglabs.com?subject=Book%20a%20Forgebench%20Demo"
          className={styles.secondaryAction}
        >
          Book A Demo
        </ArrowLink>
        <ArrowLink
          href="mailto:info@seedlinglabs.com?subject=Request%20Forgebench%20Sandbox%20Access"
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
        {navigation.slice(0, 2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? styles.activeLink : undefined}
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div className={styles.mobileResourceGroup}>
          <span>Resources</span>
          {resources.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? styles.activeLink : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        {navigation.slice(2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? styles.activeLink : undefined}
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
