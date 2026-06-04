import Link from "next/link";
import { ReactNode } from "react";

interface BigCTAProps {
  heading: ReactNode;
  lede?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}

export function BigCTA({ heading, lede, primary, secondary }: BigCTAProps) {
  return (
    <section className="section" id="cta">
      <div className="bigcta">
        <h2>{heading}</h2>
        {lede && <p>{lede}</p>}
        <div className="bigcta-row">
          {primary && (
            <Link href={primary.href} className="btn btn-blue">
              {primary.label} <span className="arrow">→</span>
            </Link>
          )}
          {secondary && (
            <Link href={secondary.href} className="btn btn-ghost">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
