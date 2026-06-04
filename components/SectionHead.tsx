import { ReactNode } from "react";

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "split" | "center";
}

export function SectionHead({ eyebrow, title, sub, align = "split" }: SectionHeadProps) {
  return (
    <div className={`sec-head${align === "center" ? " center" : ""}`}>
      <div>
        <div className="sec-eyebrow"><span className="ln" /> {eyebrow}</div>
        <h2 className="sec-title">{title}</h2>
      </div>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}
