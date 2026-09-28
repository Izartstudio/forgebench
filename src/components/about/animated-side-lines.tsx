import styles from "./animated-side-lines.module.css";

function VectorLine({ side }: { side: "left" | "right" }) {
  const gradientId = `side-line-gradient-${side}`;

  return (
    <svg
      className={`${styles.line} ${styles[side]}`}
      viewBox="0 0 475 5"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={side === "left" ? 0 : 475}
          y1="2.5"
          x2={side === "left" ? 475 : 0}
          y2="2.5"
        >
          <stop offset="0" stopColor="#ef3022" />
          <stop offset=".45" stopColor="#620b09" />
          <stop offset=".72" stopColor="#ef3022" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={side === "left" ? "M0 2.5H475" : "M475 2.5H0"}
        pathLength="100"
        stroke={`url(#${gradientId})`}
      />
    </svg>
  );
}

export function AnimatedSideLines({ active }: { active: boolean }) {
  return (
    <div className={`${styles.lines} ${active ? styles.active : ""}`}>
      <VectorLine side="left" />
      <VectorLine side="right" />
    </div>
  );
}
