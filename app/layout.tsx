import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { withSiteBasePath } from "@/lib/site-path";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["italic"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arminus.co.in"),
  title: {
    default: "Arminus | IT Staffing Company in India",
    template: "%s | Arminus"
  },
  description:
    "Arminus is an IT staffing company in India offering contract staffing, permanent recruitment, executive search, IT staff augmentation, and workforce solutions.",
  keywords: [
    "IT staffing company in India",
    "IT recruitment agency India",
    "contract staffing services",
    "IT staff augmentation",
    "permanent recruitment",
    "executive search India",
    "technology recruitment agency",
    "manpower consulting India",
    "recruitment and staffing firm",
    "Ceipal careers"
  ],
  alternates: {
    canonical: "https://arminus.co.in"
  },
  openGraph: {
    title: "Arminus | IT Staffing Company in India",
    description:
      "Contract staffing, permanent recruitment, executive search, IT staff augmentation, and workforce support across India, USA, and Europe.",
    url: "https://arminus.co.in",
    siteName: "Arminus",
    type: "website",
    images: [
      {
        url: "/arminus-logo.png",
        width: 1580,
        height: 996,
        alt: "Arminus team work"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Arminus | IT Staffing Company in India",
    description:
      "IT staffing, contract staffing, permanent recruitment, executive search, and workforce solutions for technology teams."
  },
  robots: {
    index: true,
    follow: true
  }
};

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/" aria-label="Arminus home">
              <Image
                className="brand-logo"
                src={withSiteBasePath("/arminus-logo.png")}
                alt="Arminus team work"
                width={240}
                height={151}
              />
            </Link>
            <p style={{ marginTop: 18 }}>
              Global manpower consulting and staffing services for IT, Telecom, Automotive, and Insurance teams.
            </p>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/about">About</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h3>Solutions</h3>
            <Link href="/solutions#it-staffing">IT Staffing</Link>
            <Link href="/solutions#contract">Contract Staffing</Link>
            <Link href="/solutions#executive">Executive Search</Link>
            <Link href="/solutions#training">Training</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="mailto:contactus@arminus.com">contactus@arminus.com</a>
            <a href="tel:+913340601004">IND +91 33 40601004</a>
            <a href="tel:+17324819410">USA +1 732 481 9410</a>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Arminus Software Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "StaffingAgency",
    name: "Arminus Software Pvt Ltd",
    url: "https://arminus.co.in",
    email: "contactus@arminus.com",
    telephone: ["+91 33 40601004", "+1 732 481 9410"],
    description:
      "IT staffing company in India offering contract staffing, permanent recruitment, executive search, IT staff augmentation, and workforce solutions.",
    sameAs: [
      "https://www.linkedin.com/company/665038",
      "https://www.facebook.com/ArminusSoftware",
      "https://twitter.com/ArminusSoftware"
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bengal Eco Intelligent Park, Unit #21, 13th Floor, Tower 1, Block EM, Sector V",
      addressLocality: "Kolkata",
      postalCode: "700091",
      addressCountry: "IN"
    }
  };

  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <div className="page-shell">
          <div className="brand-bar" />
          <SiteHeader />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
