import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Arminus | IT Staffing Inquiry | Kolkata Gurugram Bangalore",
  description:
    "Contact Arminus for IT staffing, executive search, Career Labs, or Nubo platform inquiries. Offices in Kolkata (HQ), Gurugram & Bangalore. We respond within 1 business day.",
  keywords: [
    "contact Arminus", "IT staffing inquiry India", "hire IT talent India",
    "recruitment agency contact", "staffing company Kolkata", "staffing company Gurugram",
    "IT recruitment Bangalore", "submit hiring brief India",
  ],
  alternates: { canonical: "https://arminus.co.in/contact" },
};

const offices = [
  { tag: "Headquarters", name: "Kolkata", addr: "Bengal Eco Intelligent Park, Unit #21, 13th Floor, Tower 1, Block EM, Sector V, Kolkata 700091", focus: "Strategy & leadership", email: "contactus@arminus.com", img: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=600&q=80&auto=format&fit=crop" },
  { tag: "NCR Operations", name: "Gurugram", addr: "JMD Megapolis, Sohna Road, Gurugram, Haryana", focus: "Operations & Gov-Tech", email: "contactus@arminus.com", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80&auto=format&fit=crop" },
  { tag: "Engineering Desk", name: "Bangalore", addr: "HSR Layout 5th Sector, Bengaluru, Karnataka", focus: "IT & engineering", email: "contactus@arminus.com", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80&auto=format&fit=crop" },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        accent="blue"
        eyebrow="Contact Arminus"
        title={<>One conversation from <span className="ital blue">the right hire.</span></>}
        lede="Share a brief, ask a question, or just start a conversation. Our team gets back within one business day."
      />

      <section className="section">
        <div className="wrap">
          <div className="contact-layout">
            <div>
              <SectionHead
                eyebrow="Get in touch"
                title={<>Tell us what <span className="ital">you need.</span></>}
                sub="Whether you're hiring, job-seeking, or exploring Nubo — we're one message away."
              />
              <div className="contact-quick">
                <div className="cfq"><div className="cfq-lbl">Email</div><a className="cfq-val" href="mailto:contactus@arminus.com">contactus@arminus.com</a></div>
                <div className="cfq"><div className="cfq-lbl">India</div><a className="cfq-val" href="tel:+913340601004">+91 33 40601004</a></div>
                <div className="cfq"><div className="cfq-lbl">USA</div><a className="cfq-val" href="tel:+17324819410">+1 732 481 9410</a></div>
                <div className="cfq"><div className="cfq-lbl">Offices</div><div className="cfq-val">Kolkata · Gurugram · Bangalore</div></div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="section tint">
        <div className="wrap">
          <SectionHead
            eyebrow="Our offices"
            title={<>Three cities. <span className="ital">Always nearby.</span></>}
          />
          <Reveal stagger className="co-grid">
            {offices.map(o => (
              <div className="co-card" key={o.name}>
                <div className="co-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={o.name} />
                  <span className="co-tag">{o.tag}</span>
                </div>
                <div className="co-body">
                  <h3>{o.name}</h3>
                  <div className="co-line"><div className="co-lbl">Address</div><div className="co-val">{o.addr}</div></div>
                  <div className="co-line"><div className="co-lbl">Focus</div><div className="co-val">{o.focus}</div></div>
                  <div className="co-line"><div className="co-lbl">Email</div><a className="co-val" href={`mailto:${o.email}`}>{o.email}</a></div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
