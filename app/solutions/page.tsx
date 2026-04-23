import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, GraduationCap, SearchCheck, Timer, UserCheck, UsersRound } from "lucide-react";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Staffing Solutions",
  description:
    "Explore Arminus IT staffing, contract staffing, permanent hiring, contract-to-hire, executive search, and training solutions."
};

const solutions = [
  {
    id: "it-staffing",
    title: "IT Staffing",
    icon: UsersRound,
    copy: "Permanent and project hiring for technology teams across software engineering, cloud, data, AI, DevOps, support, and delivery roles."
  },
  {
    id: "contract",
    title: "Contract Staffing",
    icon: Timer,
    copy: "Short-term, long-term, onsite, offshore, and hybrid staffing models for urgent delivery needs and controlled workforce scaling."
  },
  {
    id: "permanent",
    title: "Permanent Hiring",
    icon: UserCheck,
    copy: "End-to-end sourcing, screening, shortlist, interview movement, and offer closure support for full-time roles."
  },
  {
    id: "contract-to-hire",
    title: "Contract-to-Hire",
    icon: BriefcaseBusiness,
    copy: "A practical model for teams that want to validate role fit, culture fit, and delivery performance before permanent conversion."
  },
  {
    id: "executive",
    title: "Executive Search",
    icon: SearchCheck,
    copy: "Senior and confidential hiring for department heads, VPs, CXOs, directors, and leaders in technology-led organizations."
  },
  {
    id: "training",
    title: "Training and Talent Development",
    icon: GraduationCap,
    copy: "Recruitment training, technology training, and soft-skills enablement across topics like AI, cloud, data analytics, IoT, and DevOps."
  }
];

export default function SolutionsPage() {
  return (
    <main>
      <section className="subpage-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Solutions</span>
            <h1>Flexible staffing models for serious technology teams.</h1>
            <p>
              Arminus combines specialist recruitment, domain knowledge, and global delivery support to help employers
              hire permanent employees, contract consultants, and senior leaders.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Reveal delay={index * 0.06} key={solution.id}>
                  <article className="card service-card" id={solution.id}>
                    <span className="icon-chip">
                      <Icon size={23} />
                    </span>
                    <h3>{solution.title}</h3>
                    <p>{solution.copy}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: "var(--soft-sky)" }}>
        <div className="container split">
          <Reveal>
            <div>
              <span className="eyebrow">Delivery Model</span>
              <h2 className="section-title">From role brief to joining support.</h2>
              <p className="section-copy">
                The engagement starts with clarity: required skills, domain context, location, urgency, budget, and
                deployment model. From there, Arminus manages sourcing, screening, shortlist quality, interview
                coordination, and onboarding support.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="card service-card">
              <h3>Best fit for</h3>
              <p>
                Employers hiring technology talent across multiple locations, teams looking for faster shortlist
                movement, and organizations that need a staffing partner who can support both clients and consultants.
              </p>
              <Link className="button button-primary" style={{ marginTop: 24 }} href="/contact">
                Discuss a requirement <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
