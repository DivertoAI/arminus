import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Arminus for IT staffing, contract hiring, executive search, candidate support, and workforce consulting."
};

export default function ContactPage() {
  return (
    <main>
      <section className="subpage-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1>Send a role brief or speak with the Arminus team.</h1>
            <p>
              Share your hiring requirement, staffing model, location, and timeline. The team can map the next steps for
              sourcing, shortlist movement, and deployment support.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <form className="card service-card contact-form" action="mailto:contactus@arminus.com" method="post">
              <div className="field-grid">
                <input name="name" placeholder="Name" required />
                <input name="company" placeholder="Company" />
              </div>
              <div className="field-grid">
                <input name="email" placeholder="Work email" type="email" required />
                <input name="phone" placeholder="Phone" />
              </div>
              <input name="role" placeholder="Role or staffing requirement" />
              <textarea name="message" placeholder="Tell us about your hiring need" required />
              <button className="button button-primary" type="submit">
                Send inquiry
              </button>
            </form>
          </Reveal>
          <Reveal>
            <div>
              <span className="eyebrow">Offices</span>
              <h2 className="section-title">Reach Arminus across India and abroad.</h2>
              <div className="steps" style={{ marginTop: 28 }}>
                {[
                  [MapPin, "Kolkata", "Bengal Eco Intelligent Park, Sector V, Salt Lake City, Kolkata 700091."],
                  [MapPin, "Gurugram", "Unit 1237, 12th floor, JMD Megapolis, Sohna Road, Gurugram 122018."],
                  [MapPin, "Bengaluru", "365 Shared Space, HSR Layout 5th Sector, Bengaluru 560102."],
                  [Phone, "Phone", "IND +91 33 40601004 / USA +1 732 481 9410."],
                  [Mail, "Email", "contactus@arminus.com"]
                ].map(([Icon, title, copy]) => {
                  const TypedIcon = Icon as typeof MapPin;
                  return (
                    <div className="card service-card" key={title as string} style={{ minHeight: "auto" }}>
                      <span className="icon-chip">
                        <TypedIcon size={22} />
                      </span>
                      <h3>{title as string}</h3>
                      <p>{copy as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
