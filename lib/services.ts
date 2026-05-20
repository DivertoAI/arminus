import {
  Target,
  Layers,
  RefreshCw,
  Landmark,
  Crown,
  type LucideIcon
} from "lucide-react";

export type ServiceSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ServiceItem = {
  slug: string;
  title: string;
  shortTitle: string;
  kicker: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  image: string;
  seoTitle: string;
  seoDescription: string;
  highlights: string[];
  sections: ServiceSection[];
};

export const serviceItems: ServiceItem[] = [
  {
    slug: "permanent-placement",
    title: "Permanent Placement",
    shortTitle: "Permanent Placement",
    kicker: "Strategic Talent Acquisition",
    summary:
      "We identify leaders and specialists who align with your technical roadmap and corporate culture — backed by a 17-year curated database spanning IT, Telecom, and Automotive sectors.",
    description:
      "Strategic Talent Acquisition. We identify leaders and specialists who align with your technical roadmap and corporate culture. Access to our proprietary, 17-year curated database ensures precision matching for IT, Telecom, and Automotive sectors.",
    icon: Target,
    image: "/team-banner.jpg",
    seoTitle: "Permanent Placement Services",
    seoDescription:
      "Arminus permanent placement services identify leaders and specialists who align with your technical roadmap and corporate culture across IT, Telecom, and Automotive sectors.",
    highlights: [
      "17-year curated talent database",
      "IT, Telecom & Automotive sectors",
      "Offshore deployment support",
      "Precision culture-fit matching"
    ],
    sections: [
      {
        title: "Strategic Talent Acquisition",
        paragraphs: [
          "We identify leaders and specialists who align with your technical roadmap and corporate culture. Access to our proprietary, 17-year curated database ensures precision matching for IT, Telecom, and Automotive sectors.",
          "Our services also meet the offshore requirements of our clients who need highly skilled professionals to be deployed across the world to execute projects within desired deadlines."
        ]
      },
      {
        title: "What We Deliver",
        bullets: [
          "Precision matching against technical and cultural requirements",
          "Sourcing from a 17-year proprietary talent database",
          "Permanent placement across IT, Telecom, and Automotive",
          "Offshore deployment coordination for global project execution"
        ]
      },
      {
        title: "Sectors Covered",
        paragraphs: [
          "Our permanent placement practice is deeply specialised in IT, Telecom, and Automotive — the three verticals where Arminus has built its deepest domain expertise over two decades.",
          "From mid-level specialist roles to senior technical leadership, we cover the full seniority spectrum with structured search and shortlist rigour."
        ]
      }
    ]
  },
  {
    slug: "flexible-staffing",
    title: "Flexible Staffing & Compliance",
    shortTitle: "Flexible Staffing & Compliance",
    kicker: "Operational Agility",
    summary:
      "Scale your workforce seamlessly while Arminus acts as the legal employer — managing payroll, statutory benefits, and all HR administration so you stay focused on delivery.",
    description:
      "Operational Agility. Scale your workforce seamlessly while we manage the complexities of the employment lifecycle. Arminus acts as the legal employer, taking over all HR management tasks including total management of payroll, statutory benefits, and HR administration.",
    icon: Layers,
    image: "/banner-one.jpg",
    seoTitle: "Flexible Staffing & Compliance Services",
    seoDescription:
      "Arminus flexible staffing and compliance services act as the legal employer, managing payroll, statutory benefits, and HR administration so your team can focus on delivery.",
    highlights: [
      "Employer-of-record model",
      "Payroll & statutory compliance",
      "Scalable workforce augmentation",
      "Full HR lifecycle management"
    ],
    sections: [
      {
        title: "Operational Agility",
        paragraphs: [
          "Scale your workforce seamlessly while we manage the complexities of the employment lifecycle. Arminus acts as the legal employer, taking over all HR management tasks including total management of payroll, statutory benefits, and HR administration.",
          "This model lets your business scale delivery capacity without carrying the operational and compliance burden of direct employment."
        ]
      },
      {
        title: "Employer of Record",
        paragraphs: [
          "Arminus assumes full legal employer responsibility — from onboarding through offboarding. That includes statutory registrations, PF/ESI contributions, TDS compliance, and all regulatory filings.",
          "Clients get the productivity of an expanded workforce without the overhead of building HR infrastructure to support it."
        ]
      },
      {
        title: "What's Included",
        bullets: [
          "Complete payroll processing and disbursement",
          "Statutory benefits: PF, ESI, gratuity, and leave",
          "HR administration and employee lifecycle management",
          "Compliance monitoring and regulatory filing",
          "Workforce scaling support for project-based needs"
        ]
      }
    ]
  },
  {
    slug: "contract-to-hire",
    title: "Contract-to-Hire",
    shortTitle: "Contract-to-Hire",
    kicker: "Performance-First Framework",
    summary:
      "Evaluate a candidate's technical proficiency and cultural fit in a real-world environment before making a long-term commitment — the performance-first approach to permanent hiring.",
    description:
      "The 'Performance-First' framework. Evaluate a candidate's technical proficiency and cultural fit in a real-world environment before making a long-term commitment. This service provides effective recruitment for companies who like to select candidates on the basis of first-hand experience.",
    icon: RefreshCw,
    image: "/home-about-banner.jpg",
    seoTitle: "Contract-to-Hire Staffing Services",
    seoDescription:
      "Arminus contract-to-hire services let you evaluate a candidate's technical proficiency and cultural fit in a live environment before making a permanent commitment.",
    highlights: [
      "Real-world performance evaluation",
      "Reduced long-term hiring risk",
      "Culture fit assessment in live delivery",
      "Flexible absorption timeline"
    ],
    sections: [
      {
        title: "The Performance-First Framework",
        paragraphs: [
          "Evaluate a candidate's technical proficiency and cultural fit in a real-world environment before making a long-term commitment. This service provides effective recruitment for companies who like to select candidates on the basis of first-hand experience.",
          "Contract-to-hire gives hiring managers the visibility they need to make confident permanent decisions without the risk of a misaligned direct hire."
        ]
      },
      {
        title: "How It Works",
        bullets: [
          "Candidate placed on a fixed-duration contract engagement",
          "Performance and cultural fit evaluated in live delivery settings",
          "Client decision to absorb, extend, or conclude at contract end",
          "Arminus manages all employer-of-record obligations during the contract phase"
        ]
      },
      {
        title: "Why It Works",
        paragraphs: [
          "The contract phase removes the guesswork of traditional hiring. Both parties — employer and candidate — have the opportunity to validate fit before a permanent commitment is made.",
          "This reduces attrition risk, accelerates onboarding productivity post-absorption, and gives hiring managers data instead of gut instinct."
        ]
      }
    ]
  },
  {
    slug: "gov-tech",
    title: "Gov-Tech & Large Scale Initiatives",
    shortTitle: "Gov-Tech & Large Scale",
    kicker: "Powering National Transformation",
    summary:
      "A trusted partner to the Big 4, QCI, and ICC — Arminus deploys specialised manpower for critical public sector projects across 10+ Indian states, covering Skill Development, Sanitation, Agriculture, and more.",
    description:
      "Powering National Transformation. A trusted partner to the Big 4 (PWC, Deloitte, KPMG, EY), QCI (Quality Council of India) and ICC (Indian Chamber of Commerce), Arminus deploys specialized manpower for critical public sector projects.",
    icon: Landmark,
    image: "/team-banner-one.jpg",
    seoTitle: "Gov-Tech & Large Scale Staffing Initiatives",
    seoDescription:
      "Arminus gov-tech staffing deploys specialized manpower for large-scale public sector projects in partnership with Big 4 firms, QCI, and ICC across 10+ Indian states.",
    highlights: [
      "Big 4 partner: PWC, Deloitte, KPMG, EY",
      "200+ professionals on active government projects",
      "10+ Indian states coverage",
      "Skill Development, Sanitation, Agriculture & more"
    ],
    sections: [
      {
        title: "Powering National Transformation",
        paragraphs: [
          "A trusted partner to the Big 4 (PWC, Deloitte, KPMG, EY), QCI (Quality Council of India) and ICC (Indian Chamber of Commerce), Arminus deploys specialized manpower for critical public sector projects.",
          "We have over 200 persons on our payroll working with various Govt projects like Skill Development, Sanitation, Agriculture, Niti Ayog, Social Services, and Education across 10+ Indian states."
        ]
      },
      {
        title: "Partner Ecosystem",
        bullets: [
          "PWC, Deloitte, KPMG, and EY — Big 4 consulting partnerships",
          "Quality Council of India (QCI)",
          "Indian Chamber of Commerce (ICC)",
          "State and central government project offices"
        ]
      },
      {
        title: "Active Domains",
        bullets: [
          "Skill Development initiatives",
          "Sanitation and public health projects",
          "Agriculture and rural development programs",
          "Niti Ayog advisory projects",
          "Social Services and Education missions"
        ]
      },
      {
        title: "Scale and Reach",
        paragraphs: [
          "With 200+ professionals actively deployed across government mandates at any given time, Arminus brings operational depth that few staffing firms can match in the public sector space.",
          "Our multi-state footprint and compliance infrastructure make us the deployment partner of choice for large-scale national transformation programs."
        ]
      }
    ]
  },
  {
    slug: "executive-search",
    title: "Executive Search & Board Advisory",
    shortTitle: "Executive Search & Board Advisory",
    kicker: "Discretion-Led CXO Search",
    summary:
      "Discretion-led identification of CXO and board-level talent with a proven track record of placing executives in reputed multinationals — especially within the Global IT ecosystem.",
    description:
      "Discretion-led identification of CXO and Board-level talent. Our network extends not just to core senior software professionals but to various other functions like Finance and HR. We have a proven track record of placing board-level executives in the most reputed multinational companies, especially within the Global IT ecosystem.",
    icon: Crown,
    image: "/banner-one.jpg",
    seoTitle: "Executive Search & Board Advisory Services",
    seoDescription:
      "Arminus executive search and board advisory delivers discretion-led CXO and board-level talent identification with a proven track record in the global IT ecosystem.",
    highlights: [
      "CXO and board-level placements",
      "Global IT ecosystem expertise",
      "Finance and HR functional reach",
      "Multinational placement track record"
    ],
    sections: [
      {
        title: "Discretion-Led CXO Search",
        paragraphs: [
          "Discretion-led identification of CXO and Board-level talent. Our network extends not just to core senior software professionals but to various other functions like Finance and HR.",
          "We have a proven track record of placing board-level executives in the most reputed multinational companies, especially within the Global IT ecosystem."
        ]
      },
      {
        title: "What Sets Us Apart",
        bullets: [
          "Confidential mandate management from discovery through closure",
          "Cross-functional reach: Technology, Finance, HR, and Operations",
          "Deep network within the global IT and MNC ecosystem",
          "Board and CXO advisory support beyond transactional search"
        ]
      },
      {
        title: "Mandate Scope",
        paragraphs: [
          "Our executive search practice handles the full seniority spectrum at leadership level — from VP and Director mandates to CTO, CFO, CHRO, and board advisory roles.",
          "Every engagement is handled with the confidentiality and strategic judgment that senior-level moves demand. We work with clients and candidates as trusted advisors, not as transactional recruiters."
        ]
      }
    ]
  }
];

export function getServiceBySlug(slug: string) {
  return serviceItems.find((service) => service.slug === slug);
}
