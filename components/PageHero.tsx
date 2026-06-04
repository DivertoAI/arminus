import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  accent?: "blue" | "coral" | "dark";
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, lede, accent = "blue", children }: PageHeroProps) {
  return (
    <section className={`page-hero accent-${accent}`}>
      <div className="page-hero-mesh" />
      <div className="wrap">
        <div className="sec-eyebrow"><span className="ln" /> {eyebrow}</div>
        <h1 className="page-hero-title">{title}</h1>
        {lede && <p className="page-hero-lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
