import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { getServiceBySlug, serviceItems } from "@/lib/services";
import { withSiteBasePath } from "@/lib/site-path";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return serviceItems.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.seoTitle} | Arminus`,
    description: service.seoDescription,
    alternates: {
      canonical: `https://arminus.co.in/services/${service.slug}`
    }
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <section className="subpage-hero">
        <div className="container service-detail-grid">
          <Reveal className="split-copy-card detail-card">
            <span className="eyebrow">Services</span>
            <h1 className="section-title">{service.shortTitle}</h1>
            <p className="section-copy">{service.description}</p>
            <div className="service-detail-links" style={{ marginTop: 22 }}>
              {service.highlights.map((item) => (
                <div className="service-detail-link" key={item}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="image-frame tall">
              <Image
                src={withSiteBasePath(service.image)}
                alt={service.shortTitle}
                fill
                sizes="(max-width: 1180px) 100vw, 42vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container service-detail-grid">
          <div className="service-detail-main">
            {service.sections.map((section, index) => (
              <Reveal delay={index * 0.05} key={section.title}>
                <section className="service-detail-section">
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? (
                    <ul className="service-detail-list">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}
          </div>

          <aside className="service-detail-rail">
            <Reveal>
              <div className="service-detail-cta">
                <p className="service-kicker">{service.kicker}</p>
                <h3>Need this service?</h3>
                <p>Discuss requirements, candidate profile, location, hiring model, or training scope with Arminus.</p>
                <Link className="button button-primary" href="/contact" style={{ marginTop: 18 }}>
                  Talk to Arminus <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="service-detail-cta">
                <h3>All Services</h3>
                <div className="service-detail-links">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.slug}
                      className={item.slug === service.slug ? "service-detail-link current" : "service-detail-link"}
                      href={`/services/${item.slug}`}
                    >
                      <span>{item.shortTitle}</span>
                      <span>{item.kicker}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </main>
  );
}
