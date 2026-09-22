import Link from "next/link";

import styles from "./arrow-link.module.css";

type ArrowLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: "dark" | "plain";
  className?: string;
};

export function ArrowLink({
  children,
  href,
  variant = "plain",
  className,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`${styles.link} ${styles[variant]} ${className ?? ""}`}
    >
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true" />
    </Link>
  );
}
