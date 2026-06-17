import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";

export const metadata: Metadata = {
  title: "Contact Arminus | IT Staffing Inquiry | Kolkata Gurugram Bengaluru",
  description:
    "Contact Arminus for IT staffing, executive search, Career Labs, or Nubo platform inquiries. Offices in Kolkata (HQ), Gurugram & Bengaluru. We respond within 1 business day.",
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
    value: "+91 9874014979 / +91 3340601004",
    href: "tel:+919874014979",
    note: "Mon – Sat, 9 am – 7 pm IST",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "Arminus Software",
    href: "https://www.linkedin.com/company/665038",
    note: "Follow us or send a message.",
  },
];

const offices = [
  { tag: "Headquarters", name: "Kolkata", addr: "Bengal Eco Intelligent Park, Unit #21, 13th Floor, Tower 1, Block EM, Sector V, Kolkata 700091", focus: "Strategy & leadership", img: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=600&q=80&auto=format&fit=crop" },
  { tag: "NCR Operations", name: "Gurugram", addr: "JMD Megapolis, Sohna Road, Gurugram, Haryana", focus: "Operations & Gov-Tech", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80&auto=format&fit=crop" },
  { tag: "Engineering Desk", name: "Bengaluru", addr: "HSR Layout 5th Sector, Bengaluru, Karnataka", focus: "IT & engineering", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80&auto=format&fit=crop" },
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
                </div>
                <div className="co-body">
                  <h3>{o.name}{o.tag === "Headquarters" ? ` (${o.tag})` : ""}</h3>
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
