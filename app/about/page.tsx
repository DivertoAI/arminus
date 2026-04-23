import type { Metadata } from "next";
import { Award, Building2, Globe2, UsersRound } from "lucide-react";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Arminus, a global manpower consulting and staffing company serving IT, Telecom, Automotive, and Insurance domains."
};

export default function AboutPage() {
  return (
    <main>
      <section className="subpage-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">About Arminus</span>
            <h1>The Power of Us, rebuilt for a modern hiring market.</h1>
            <p>
              Arminus Software Pvt Ltd provides manpower consulting, staffing, and training services for organizations
              that need reliable talent support across India, USA, and Europe.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <div>
              <span className="eyebrow">Story</span>
              <h2 className="section-title">Collective strength, practical delivery.</h2>
              <p className="section-copy">
                Arminus’ original “Power of Us” idea is simple: individual performance becomes stronger when backed by
                a team, process, and institution. The redesigned site presents that idea in clearer language for
                employers and candidates, while keeping the firm’s global staffing roots intact.
              </p>
              <p className="section-copy">
                The company supports IT, Telecom, Automotive, and Insurance hiring through staff augmentation models
                that let clients focus on their core business while Arminus manages the talent pipeline.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="image-stack">
              <div className="image-main">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=80"
                  alt="Arminus team collaboration concept"
                />
              </div>
              <div className="image-small">
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80"
                  alt="Recruitment leadership discussion"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--soft-sky)" }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Operating Footprint</span>
            <h2 className="section-title">A staffing partner across business regions.</h2>
          </Reveal>
          <div className="grid-4" style={{ marginTop: 34 }}>
            {[
              [Building2, "Kolkata", "Bengal Eco Intelligent Park, Sector V, Salt Lake City."],
              [Building2, "Gurugram", "JMD Megapolis, Sohna Road, Gurugram."],
              [Building2, "Bengaluru", "HSR Layout 5th Sector, Bengaluru."],
              [Globe2, "USA and Europe", "USA presence in New Jersey and Europe-facing Belgium operations."]
            ].map(([Icon, title, copy], index) => {
              const TypedIcon = Icon as typeof Award;
              return (
                <Reveal delay={index * 0.06} key={title as string}>
                  <article className="card service-card">
                    <span className="icon-chip">
                      <TypedIcon size={23} />
                    </span>
                    <h3>{title as string}</h3>
                    <p>{copy as string}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Leadership</span>
            <h2 className="section-title">Experienced operators behind the delivery model.</h2>
          </Reveal>
          <div className="grid-3" style={{ marginTop: 34 }}>
            <article className="card service-card">
              <span className="icon-chip">
                <UsersRound size={23} />
              </span>
              <h3>Pankaj Kathuria</h3>
              <p>
                MD and CEO for India and Europe operations, with decades of software project, delivery, and offshore
                development center experience.
              </p>
            </article>
            <article className="card service-card">
              <span className="icon-chip">
                <Award size={23} />
              </span>
              <h3>Ashok Jindal</h3>
              <p>
                Director with deep IT industry experience across software development, sales, large accounts, and
                staffing operations.
              </p>
            </article>
            <article className="card service-card">
              <span className="icon-chip">
                <Globe2 size={23} />
              </span>
              <h3>Global team</h3>
              <p>
                Recruiters and operations professionals support employer requirements and consultant experience across
                multiple locations.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
