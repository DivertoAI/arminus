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
            <img
              src={withSiteBasePath("/arminus-logo.png")}
              alt="Arminus"
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
              <li><a href="tel:+919874014979">+91 9874014979</a></li>
              <li><a href="tel:+913340601004">+91 3340601004</a></li>
              <li style={{ marginTop: '12px' }}>
                <a 
                  href="https://www.linkedin.com/company/665038" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-linkedin"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bot">
          <div>© 2026 Arminus Software Pvt Ltd. All rights reserved.</div>
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
