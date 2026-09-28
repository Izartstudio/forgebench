import Link from "next/link";

import styles from "./arrow-link.module.css";

type ArrowLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: "dark" | "plain";
  className?: string;
  underlineOnHover?: boolean;
};

export function ArrowLink({
  children,
  href,
  variant = "plain",
  className,
  underlineOnHover = false,
}: ArrowLinkProps) {
  const isDemoLink = href === "/demo";

  return (
    <Link
      href={href}
      className={`${styles.link} ${styles[variant]} ${isDemoLink || underlineOnHover ? styles.underlined : ""} ${className ?? ""}`}
    >
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true" />
    </Link>
  );
}
