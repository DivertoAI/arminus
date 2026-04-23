import type { Metadata } from "next";
import { CeipalEmbed } from "@/components/CeipalEmbed";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore Arminus job openings through the Ceipal ATS career page and submit your resume for IT staffing opportunities."
};

export default function CareersPage() {
  return (
    <main>
      <section className="subpage-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Careers</span>
            <h1>Find roles backed by a staffing team that stays involved.</h1>
            <p>
              Arminus helps candidates discover project, contract, and permanent opportunities with structured
              coordination from application through joining support.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <CeipalEmbed />
          </Reveal>
        </div>
      </section>

      <section className="section-tight" style={{ background: "var(--soft-sky)" }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Candidate Support</span>
            <h2 className="section-title">A cleaner path from profile to opportunity.</h2>
            <p className="section-copy">
              The careers experience is prepared for Ceipal integration and keeps candidate content server-rendered.
              Once the embed code is available, live jobs and resume submission can be activated inside the same
              polished page.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
