import Image from "next/image";
import Link from "next/link";
import { withSiteBasePath } from "@/lib/site-path";

interface FooterProps {
  stats?: boolean;
}

export function Footer({ stats = false }: FooterProps) {
  return (
    <footer className="footer">
      <div className="wrap">
        {stats && (
          <div className="footer-stats">
            <div className="fstat"><div className="fstat-num">17+</div><div className="fstat-lbl">Years of recruiting</div></div>
            <div className="fstat"><div className="fstat-num">175+</div><div className="fstat-lbl">Clients served</div></div>
            <div className="fstat"><div className="fstat-num">15K+</div><div className="fstat-lbl">Professionals placed</div></div>
            <div className="fstat"><div className="fstat-num">600K+</div><div className="fstat-lbl">Active talent pool</div></div>
          </div>
        )}

        <div className="footer-top">
          <div className="footer-brand">
            <Image
              src={withSiteBasePath("/arminus-logo.png")}
              alt="Arminus"
              width={160}
              height={48}
              className="logo-img"
            />
            <p>
              <em style={{ fontFamily: "var(--font-serif)" }}>Powered by Humans. Accelerated by AI.</em>
              <br /><br />
              Headquartered in Kolkata, with offices in Gurugram &amp; Bangalore.
              Strategic talent solutions, Career Labs, and Nubo Native Platform — since 2009.
            </p>
          </div>

          <div className="footer-col">
            <h5>Solutions</h5>
            <ul>
              <li><Link href="/solutions">Permanent Placement</Link></li>
              <li><Link href="/solutions">Flexible Staffing</Link></li>
              <li><Link href="/solutions">Contract-to-Hire</Link></li>
              <li><Link href="/solutions">Gov-Tech</Link></li>
              <li><Link href="/solutions">Executive Search</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/career-labs">Career Labs</Link></li>
              <li><Link href="/nubo">Nubo (NNP)</Link></li>
              <li><Link href="/careers">Careers · Jobs portal</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Reach us</h5>
            <ul>
              <li><a href="mailto:contactus@arminus.in">contactus@arminus.in</a></li>
              <li><a href="tel:+913340601004">+91 33 40601004</a></li>
              <li>
                <a href="https://www.linkedin.com/company/665038" target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bot">
          <div>© 2025 Arminus Software Pvt Ltd. All rights reserved.</div>
          <div className="links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
