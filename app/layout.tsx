import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    default: "Arminus | Global IT Staffing and Workforce Solutions",
    template: "%s | Arminus"
  },
  description:
    "Arminus helps employers hire IT, telecom, automotive, and insurance talent through permanent hiring, contract staffing, executive search, and training-led workforce solutions.",
  openGraph: {
    title: "Arminus | Global IT Staffing and Workforce Solutions",
    description:
      "Premium IT staffing, contract hiring, executive search, and workforce support across India, USA, and Europe.",
    url: "https://arminus.co.in",
    siteName: "Arminus",
    type: "website"
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
              <span className="brand-mark">A</span>
              <span className="brand-text">
                <span className="brand-name">
                  Armin<span>us</span>
                </span>
                <span className="brand-tagline">The Power of Us</span>
              </span>
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
    "@type": "Organization",
    name: "Arminus Software Pvt Ltd",
    url: "https://arminus.co.in",
    email: "contactus@arminus.com",
    telephone: ["+91 33 40601004", "+1 732 481 9410"],
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <div className="page-shell">
          <SiteHeader />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
