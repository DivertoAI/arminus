import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { BigCTA } from "@/components/BigCTA";
import { withSiteBasePath } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "About Arminus | 17 Years IT Staffing Excellence | India",
  description:
    "Founded in 2009, Arminus has placed 15,000+ professionals and served 175+ clients across IT, Telecom, Automotive & Government sectors. Leadership team from IIT Delhi, IIM Calcutta, Accenture & TCS.",
  keywords: [
    "Arminus Software about", "IT staffing company history India", "manpower consulting firm India",
    "technology recruitment firm", "Pankaj Kathuria Arminus", "IIT IIM staffing company",
    "IT staffing Kolkata", "recruitment agency Gurugram", "staffing company Bangalore",
  ],
  alternates: { canonical: "https://arminus.co.in/about" },
};

const stats = [
  { num: "17+", lbl: "Years of recruiting" },
  { num: "175+", lbl: "Clients served" },
  { num: "15K+", lbl: "Professionals placed" },
  { num: "600K+", lbl: "Active talent pool" },
];

const offices = [
  { tag: "Headquarters", name: "Kolkata", d: "Strategy, leadership and our central recruitment engine. Bengal Eco Intelligent Park, Sector V.", img: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=900&q=80&auto=format&fit=crop" },
  { tag: "NCR Operations", name: "Gurugram", d: "Account operations and large-scale Gov-Tech deployments. JMD Megapolis, Sohna Road.", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80&auto=format&fit=crop" },
  { tag: "Engineering Desk", name: "Bangalore", d: "IT and engineering specialist recruitment. HSR Layout 5th Sector.", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&auto=format&fit=crop" },
];

const leaders = [
  {
    name: "Pankaj Kathuria", role: "MD & CEO", rev: false,
    pull: "44 years architecting the global software landscape.",
    bio: "With a distinguished career spanning 44 years, Pankaj is a veteran architect of the global software landscape. His expertise encompasses the entire lifecycle of technology delivery — from hands-on engineering to orchestrating mission-critical projects and establishing large-scale Offshore Development Centers (ODCs) for world-class enterprises. His portfolio includes leading multi-million dollar initiatives for organizations such as HBO Singapore and Puerto Rico Telephone Company (USA).",
    edu: [["Engineering", "Thapar Institute of Engineering & Technology"], ["Management", "IIM Calcutta"]],
    img: "/pankaj.jpg",
  },
  {
    name: "Ashok Jindal", role: "Director — Operations", rev: true,
    pull: "40 years; the operational backbone of Arminus.",
    bio: "With 40 years of experience, Ashok is the operational backbone of Arminus. Before joining forces with Pankaj in 2012, he held senior leadership roles at Tata and PCL. A specialist in high-value account management, Ashok has orchestrated multi-million dollar deals for industry leaders including Tata Motors, Mahindra, and HAL. He oversees Gurugram and NCR operations with a technology-first approach.",
    edu: [["Engineering", "B.Tech, IIT Delhi"], ["Management", "Masters, University of Waterloo, Canada"]],
    img: "/ashok.jpg",
  },
  {
    name: "Tania Kathuria", role: "Director — Strategy & Growth", rev: false,
    pull: "Building scalable revenue engines and global partnerships.",
    bio: "Tania is a growth-focused leader dedicated to building scalable revenue engines and global partnerships. At Arminus, she spearheads strategic direction and international expansion. Her background includes key positions at Accenture and Tata Consultancy Services (TCS), where she led go-to-market initiatives across global markets.",
    edu: [["Education", "MBA, NMIMS Mumbai"], ["Leads", "Strategy & global growth"]],
    img: "/tania.jpg",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        accent="blue"
        eyebrow="About Arminus"
        title={<>Empowering innovation through <span className="ital blue">top talent.</span></>}
        lede="Nearly two decades of specialist recruitment, a proprietary talent database, and a leadership team with deep pedigree across global delivery and large-account operations."
      />

      {/* MISSION */}
      <section className="about-mission">
        <div className="wrap">
          <div className="about-mission-grid">
            <Reveal>
              <div>
                <div className="sec-eyebrow"><span className="ln" /> Our philosophy</div>
                <h2 className="sec-title">The Power of <span className="ital">Us.</span></h2>
                <p className="sec-sub" style={{ maxWidth: "56ch", marginTop: "18px" }}>
                  The &lsquo;Power of Us&rsquo; is a fusion of technology and empathy. By empowering our teams with
                  generative AI tools, we spend less time on paperwork and more time on what matters —
                  building relationships with India&apos;s top professionals.
                </p>
                <div className="pow-tagline" style={{ marginTop: "24px" }}>
                  <span className="pow-tagline-pre">Powered by Humans.</span>
                  <span className="pow-tagline-post">Accelerated by AI.</span>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="about-stats">
                {stats.map(s => (
                  <div className="ast" key={s.lbl}>
                    <div className="ast-num">{s.num}</div>
                    <div className="ast-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="section tint">
        <div className="wrap">
          <SectionHead
            eyebrow="Where we are"
            title={<>Rooted in India. <span className="ital">Built to reach further.</span></>}
            sub="A pan-India footprint that puts our recruiters close to both clients and talent."
          />
          <Reveal stagger className="office-grid">
            {offices.map(o => (
              <article className="office-card" key={o.name}>
                <div className="office-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={o.name} />
                  <div className="ovl" />
                  <span className="office-tag">{o.tag}</span>
                </div>
                <div className="office-body"><h3>{o.name}</h3><p>{o.d}</p></div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* LEADERS */}
      <section className="leaders-section" id="leadership">
        <div className="wrap">
          <SectionHead
            eyebrow="Leadership"
            title={<>Built by people who&apos;ve <span className="ital">done it before.</span></>}
            sub="Three leaders. 84+ combined years of building global delivery, large-account operations, and revenue engines that scale across markets."
          />
          <div className="leaders-stack">
            {leaders.map(l => (
              <Reveal key={l.name}>
                <div className={`leader-grid ${l.rev ? "rev" : ""}`}>
                  <div className="leader-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={withSiteBasePath(l.img)} alt={l.name} />
                    <span className="leader-photo-tag">{l.role}</span>
                  </div>
                  <div className="leader-text">
                    <div className="leader-name">{l.name}</div>
                    <p className="leader-pull">{l.pull}</p>
                    <p className="leader-bio">{l.bio}</p>
                    <div className="leader-edu">
                      {l.edu.map(e => (
                        <div key={e[0]}><div className="ek">{e[0]}</div><div className="ed">{e[1]}</div></div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BigCTA
        heading={<>Let&apos;s build something <span className="ital">together.</span></>}
        lede="Whether you're hiring, looking for your next role, or exploring Nubo — our team is one conversation away."
        primary={{ href: "/contact", label: "Get in touch" }}
        secondary={{ href: "/careers", label: "See open roles" }}
      />
    </main>
  );
}
