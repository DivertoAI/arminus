import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { FooterWrapper } from "@/components/FooterWrapper";

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
  metadataBase: new URL("https://www.arminus.co.in"),
  title: {
    default: "Arminus | IT Staffing & Recruitment Company India",
    template: "%s | Arminus",
  },
  description:
    "Arminus is a pan-India IT staffing company with 17+ years experience. We deliver permanent placement, contract staffing, executive search & Gov-Tech deployments across Kolkata, Gurugram & Bengaluru.",
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
    url: "https://www.arminus.co.in",
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "StaffingAgency",
  name: "Arminus Software Pvt Ltd",
  url: "https://www.arminus.co.in",
  logo: "https://www.arminus.co.in/arminus-logo.png",
  description:
    "Pan-India IT staffing company offering permanent placement, contract staffing, executive search, Gov-Tech deployments and Career Labs services.",
  foundingDate: "2009",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 200 },
  email: "contactus@arminus.in",
  telephone: ["+91-9874014979", "+91-33-40601004", "+1-732-481-9410"],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Bengal ECO Intelligent Park, Unit No. 21, 13th Floor, Plot No. 3, Block EM, Sector V, Bidhannagar, Salt Lake City",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "700091",
    addressCountry: "IN",
  },
  location: [
    {
      "@type": "Place",
      name: "Arminus Kolkata (Headquarters)",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bengal ECO Intelligent Park, Unit No. 21, 13th Floor, Plot No. 3, Block EM, Sector V, Bidhannagar, Salt Lake City",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        postalCode: "700091",
        addressCountry: "IN",
      },
    },
    {
      "@type": "Place",
      name: "Arminus Gurugram",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit No. 1237, JMD Megapolis, 12th Floor, Sohna Road, Sector 48",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        postalCode: "122018",
        addressCountry: "IN",
      },
    },
    {
      "@type": "Place",
      name: "Arminus Bengaluru",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Site No. 5, House No. 272, Yelahanka RTO Bypass Road, P.O. Inganayakanahalli, P.S. Rajankunte, Aryan Public School, Vinayaka Layout",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560064",
        addressCountry: "IN",
      },
    },
  ],
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
        <meta name="color-scheme" content="light only" />
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
        <FooterWrapper />
      </body>
    </html>
  );
}
