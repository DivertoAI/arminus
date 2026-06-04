import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arminus.co.in"),
  title: {
    default: "Arminus | IT Staffing & Recruitment Company India",
    template: "%s | Arminus",
  },
  description:
    "Arminus is a pan-India IT staffing company with 17+ years experience. We deliver permanent placement, contract staffing, executive search & Gov-Tech deployments across Kolkata, Gurugram & Bangalore.",
  keywords: [
    "IT staffing company India",
    "IT recruitment agency India",
    "permanent placement India",
    "contract staffing services India",
    "executive search India",
    "manpower consulting India",
    "IT staff augmentation",
    "Gov-Tech staffing India",
    "technology recruitment India",
    "offshore staffing India",
  ],
  openGraph: {
    title: "Arminus | IT Staffing & Recruitment Company India",
    description:
      "Pan-India IT staffing company with 17+ years experience. Permanent placement, contract staffing, executive search & Gov-Tech deployments.",
    url: "https://arminus.co.in",
    siteName: "Arminus",
    type: "website",
    images: [{ url: "/arminus-logo.png", width: 800, height: 400, alt: "Arminus Software" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arminus | IT Staffing & Recruitment Company India",
    description:
      "Pan-India IT staffing company with 17+ years experience in permanent placement, contract staffing & executive search.",
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "StaffingAgency",
  name: "Arminus Software Pvt Ltd",
  url: "https://arminus.co.in",
  logo: "https://arminus.co.in/assets/arminus-logo.png",
  description:
    "Pan-India IT staffing company offering permanent placement, contract staffing, executive search, Gov-Tech deployments and Career Labs services.",
  foundingDate: "2009",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 200 },
  email: "contactus@arminus.com",
  telephone: ["+91-33-40601004", "+1-732-481-9410"],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Bengal Eco Intelligent Park, Unit #21, 13th Floor, Tower 1, Block EM, Sector V",
    addressLocality: "Kolkata",
    postalCode: "700091",
    addressCountry: "IN",
  },
  areaServed: ["India", "United States", "Europe"],
  sameAs: [
    "https://www.linkedin.com/company/665038",
    "https://www.facebook.com/ArminusSoftware",
    "https://twitter.com/ArminusSoftware",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IT Staffing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Permanent Placement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flexible Staffing & Compliance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Contract-to-Hire" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gov-Tech Staffing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Executive Search" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://jobsapi.ceipal.com" />
        <link rel="preconnect" href="https://careerapi.ceipal.com" />
        <link rel="dns-prefetch" href="https://jobsapi.ceipal.com" />
        <link rel="dns-prefetch" href="https://careerapi.ceipal.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Nav />
        {children}
        <Footer stats />
      </body>
    </html>
  );
}
