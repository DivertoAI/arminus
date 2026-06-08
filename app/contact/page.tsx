import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";

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

const channels = [
  {
    icon: "✉",
    label: "Email us",
    value: "contactus@arminus.in",
    href: "mailto:contactus@arminus.in",
    note: "We respond within one business day.",
  },
  {
    icon: "☎",
    label: "Call us",
    value: "+91 33 40601004",
    href: "tel:+913340601004",
    note: "Mon – Sat, 9 am – 7 pm IST",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "Arminus Software",
    href: "https://www.linkedin.com/company/665038",
    note: "Follow us or send a message.",
  },
];

const offices = [
  { tag: "Headquarters", name: "Kolkata", addr: "Bengal Eco Intelligent Park, Unit #21, 13th Floor, Tower 1, Block EM, Sector V, Kolkata 700091", focus: "Strategy & leadership", img: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=600&q=80&auto=format&fit=crop" },
  { tag: "NCR Operations", name: "Gurugram", addr: "JMD Megapolis, Sohna Road, Gurugram, Haryana", focus: "Operations & Gov-Tech", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80&auto=format&fit=crop" },
  { tag: "Engineering Desk", name: "Bangalore", addr: "HSR Layout 5th Sector, Bengaluru, Karnataka", focus: "IT & engineering", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80&auto=format&fit=crop" },
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

      {/* REACH US */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Get in touch"
            title={<>Reach us <span className="ital">directly.</span></>}
            sub="No ticketing systems. No bots. A real person from our team reads every message."
            align="center"
          />
          <Reveal stagger className="contact-channels">
            {channels.map(c => (
              <a key={c.label} href={c.href} className="contact-channel" target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                <div className="cc-icon">{c.icon}</div>
                <div className="cc-lbl">{c.label}</div>
                <div className="cc-val">{c.value}</div>
                <div className="cc-note">{c.note}</div>
              </a>
            ))}
          </Reveal>
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
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="nnp-cta-block">
              <h2>Ready to find your next great hire?</h2>
              <p>Tell us about the role. We&apos;ll come back within one business day with a research plan and market read.</p>
              <Link href="mailto:contactus@arminus.in" className="btn btn-blue">Email us now <span className="arrow">→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
