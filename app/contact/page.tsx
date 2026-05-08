import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { withSiteBasePath } from "@/lib/site-path";
import { ContactHeroLottie } from "@/components/ContactHeroLottie";

export const metadata: Metadata = {
  title: "Contact Arminus for IT Staffing",
  description:
    "Contact Arminus for IT staffing, contract staffing, permanent recruitment, executive search, staff augmentation, candidate support, and workforce consulting.",
  alternates: { canonical: "https://arminus.co.in/contact" },
  keywords: [
    "contact IT staffing company", "hire IT talent India", "contract staffing inquiry",
    "executive search inquiry", "IT recruitment agency contact", "manpower consulting contact"
  ]
};

export default function ContactPage() {
  return (
    <main>
      <section className="hero-v2 inner-hero contact-hero">

        <div className="hero-v2-copy">
          <h1 className="hero-v2-heading inner-heading">
            Let&apos;s start a<br />
            <span className="inner-gradient-text">conversation.</span>
          </h1>

          <span className="hero-v2-redline" aria-hidden="true" />

          <p className="hero-v2-sub">
            Share your hiring requirement, staffing model, location, and timeline.
            The Arminus team responds within one business day.
          </p>

          <div className="hero-v2-actions">
            <Link className="button button-primary" href="mailto:contactus@arminus.com">
              Email Us <ArrowRight size={18} />
            </Link>
            <Link className="button button-outline" href="tel:+913340601004">
              Call IND
            </Link>
          </div>
        </div>

        <div className="hero-v2-visual">
          <Image
            src={withSiteBasePath("/hero-art/dots-grid.png")}
            alt="" aria-hidden="true"
            width={220} height={180}
            className="hero-v2-dotgrid"
          />
          <div className="hero-v2-photo-wrap">
            <span className="hero-v2-blob" aria-hidden="true" />
            <ContactHeroLottie />
          </div>
        </div>

        <Image
          src={withSiteBasePath("/hero-art/bottom-ribbon.png")}
          alt="" aria-hidden="true"
          width={480} height={260}
          className="hero-v2-swoosh inner-swoosh"
        />
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <form className="contact-form" action="mailto:contactus@arminus.com" method="post">
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
            <div className="contact-meta-grid">
              {[
                [MapPin, "Kolkata",  "Bengal Eco Intelligent Park, Sector V, Salt Lake City, Kolkata 700091."],
                [MapPin, "Gurugram", "Unit 1237, 12th floor, JMD Megapolis, Sohna Road, Gurugram 122018."],
                [MapPin, "Bengaluru","365 Shared Space, HSR Layout 5th Sector, Bengaluru 560102."],
                [Phone,  "Phone",    "IND +91 33 40601004 / USA +1 732 481 9410."],
                [Mail,   "Email",    "contactus@arminus.com"],
              ].map(([Icon, title, copy]) => {
                const TypedIcon = Icon as React.ElementType;
                return (
                  <article className="contact-card" key={title as string}>
                    <span className="feature-card-icon" aria-hidden="true">
                      <TypedIcon size={22} strokeWidth={2.1} />
                    </span>
                    <h3>{title as string}</h3>
                    <p>{copy as string}</p>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
