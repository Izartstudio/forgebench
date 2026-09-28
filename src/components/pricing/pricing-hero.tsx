import Image from "next/image";

import { ArrowLink } from "@/components/ui/arrow-link";

import styles from "./pricing-hero.module.css";

type Plan = {
  name: string;
  description: string;
  feature: string;
  price?: string;
  priceSuffix?: string;
  meta?: readonly string[];
  action: string;
  href: string;
  tone: "free" | "pro" | "enterprise";
};

const plans: readonly Plan[] = [
  {
    name: "Free",
    description: "The Governed Door,\nFor One Developer",
    feature: "Gateway + Spend Control",
    price: "$0",
    priceSuffix: "/Month",
    meta: ["1 User", "50k Requests"],
    action: "Get Started",
    href: "/sandbox",
    tone: "free",
  },
  {
    name: "Pro",
    description: "Production Governance\nYou Can Prove",
    feature: "+ Audit, Approvals, SSO",
    price: "$19",
    priceSuffix: "/Month",
    meta: ["5 Users", "500k Requests"],
    action: "Contact Sales",
    href: "/demo",
    tone: "pro",
  },
  {
    name: "Enterprise",
    description: "Your Infrastructure,\nYour Whole Fleet",
    feature: "+ Isolation, BYOC, Self-Hosting",
    action: "Contact Sales",
    href: "/demo",
    tone: "enterprise",
  },
];

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <article className={`${styles.card} ${styles[plan.tone]}`}>
      <div className={styles.cardIntro}>
        <h2>{plan.name}</h2>
        <p className={styles.description}>{plan.description}</p>
        <p className={styles.feature}>{plan.feature}</p>
      </div>

      <div className={styles.cardFooter}>
        {plan.price ? (
          <>
            <p className={styles.price}>
              {plan.price}
              <span>{plan.priceSuffix}</span>
            </p>
            <div className={styles.meta}>
              <span>
                <Image
                  src="/icons/pricing/user.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                {plan.meta?.[0]}
              </span>
              <span>
                <Image
                  src="/icons/pricing/database.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                {plan.meta?.[1]}
              </span>
            </div>
          </>
        ) : (
          <div className={styles.enterpriseSpace} aria-hidden="true" />
        )}
        <ArrowLink className={styles.action} href={plan.href} underlineOnHover>
          {plan.action}
        </ArrowLink>
      </div>
    </article>
  );
}

export function PricingHero() {
  return (
    <section className={styles.hero} aria-labelledby="pricing-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <h1 id="pricing-title">Plans &amp; Features</h1>
        <div className={styles.plans}>
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
