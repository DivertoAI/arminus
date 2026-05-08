import {
  ArrowRight,
  BriefcaseBusiness,
  BrainCircuit,
  GraduationCap,
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
    slug: "hr-staffing",
    title: "HR Staffing",
    shortTitle: "HR Staffing",
    kicker: "Permanent and contractual",
    summary:
      "Recruitment services for IT, Telecom, Automotive, and Insurance teams, with support across permanent placements, temporary staffing, contract-to-hire, and government projects.",
    description:
      "Arminus delivers recruitment consulting and workforce augmentation support for employers that need domain-aware staffing across IT, Telecom, Automotive, and Insurance.",
    icon: BrainCircuit,
    image: "/team-banner.jpg",
    seoTitle: "HR Staffing Services",
    seoDescription:
      "Arminus HR staffing services cover recruitment, permanent placements, temporary staffing, contract-to-hire, and manpower support for enterprise hiring needs.",
    highlights: ["Permanent placements", "Temporary staffing", "Contract-to-hire", "Government project staffing"],
    sections: [
      {
        title: "Recruitment",
        paragraphs: [
          "Arminus provides recruitment services that help clients identify, cultivate, and retain the right candidates for critical roles.",
          "Its staffing focus remains concentrated in IT, Telecom, Automotive, and Insurance so hiring conversations stay domain-aware and practical."
        ]
      },
      {
        title: "Permanent Placements",
        paragraphs: [
          "Permanent placement support is structured to let clients focus on their core business while Arminus manages sourcing rigor, shortlist quality, and hiring momentum.",
          "The model is designed for employers that need committed employees with the right skill set, aptitude, attitude, and long-term role fit."
        ]
      },
      {
        title: "Temporary Staffing",
        paragraphs: [
          "Arminus also offers temporary staffing support for short-term, seasonal, and project-based workforce needs.",
          "The engagement model can include payroll and employer-of-record handling so the client can scale delivery without carrying the full HR management burden."
        ]
      },
      {
        title: "Contract-to-Hire",
        paragraphs: [
          "For teams that want to evaluate people in live delivery settings before making a permanent commitment, Arminus supports contract-to-hire hiring.",
          "This gives employers first-hand visibility into performance and role fit before absorption."
        ]
      },
      {
        title: "Government Projects",
        paragraphs: [
          "The old Arminus service page also highlights staffing support for government and consulting-led projects across multiple Indian states.",
          "That capability is useful for large-scale programs that need distributed manpower deployment and operational coordination."
        ]
      }
    ]
  },
  {
    slug: "executive-search",
    title: "Executive Search",
    shortTitle: "Executive Search",
    kicker: "CXO and board search",
    summary:
      "Confidential senior hiring for heads of departments, VPs, CXOs, directors, and strategic leadership roles, backed by Arminus domain understanding in technology-led organizations.",
    description:
      "Arminus handles senior and confidential search mandates for organizations that need strong judgment, discretion, and market reach at leadership level.",
    icon: BriefcaseBusiness,
    image: "/home-about-banner.jpg",
    seoTitle: "Executive Search Services",
    seoDescription:
      "Arminus executive search services support CXO, board, VP, director, and strategic leadership hiring across technology-led organizations.",
    highlights: ["CXO placements", "Board-level search", "Confidential mandates", "Technology-led organizations"],
    sections: [
      {
        title: "Leadership Search",
        paragraphs: [
          "Arminus positions executive search as a focused service for CXO and board-level placements handled with professionalism and discretion.",
          "The emphasis is on strategic senior moves where judgment, confidentiality, and employer representation matter."
        ]
      },
      {
        title: "Technology and Functional Reach",
        paragraphs: [
          "The legacy page highlights depth in technology hiring, but also makes clear that the search network extends into finance, HR, and other core organizational functions.",
          "That makes the service relevant for enterprises hiring across both business and delivery leadership roles."
        ]
      },
      {
        title: "What Clients Get",
        bullets: [
          "Senior mandate discovery and role calibration",
          "Confidential market mapping and outreach",
          "Shortlist curation for board, CXO, VP, and director roles",
          "Executive-level coordination through closure"
        ]
      }
    ]
  },
  {
    slug: "resume-writing",
    title: "Resume Writing",
    shortTitle: "Resume Writing",
    kicker: "Freshers to senior executives",
    summary:
      "Resume advisory support focused on right length, right format, clean presentation, and role-fit positioning for fresher, mid-level, and senior executive profiles.",
    description:
      "Arminus offers resume advisory support for candidates who need clearer positioning, better presentation, and a stronger first impression before client review.",
    icon: ArrowRight,
    image: "/banner-one.jpg",
    seoTitle: "Resume Writing Services",
    seoDescription:
      "Arminus resume writing and advisory services support fresher, mid-level, and senior executive profiles with better formatting, clarity, and role-fit presentation.",
    highlights: ["Fresher resumes", "Mid-level resumes", "Senior executive resumes", "Advisory-led improvement"],
    sections: [
      {
        title: "Why It Matters",
        paragraphs: [
          "The legacy Arminus page treats the resume as the first document a client sees before any interview or conversation happens.",
          "That makes quality, clarity, and presentation a practical hiring concern, not just a cosmetic one."
        ]
      },
      {
        title: "Core Guidelines",
        bullets: [
          "Right length of resume",
          "Right format",
          "Pleasing fonts",
          "No grammatical errors",
          "Experience presented properly and clearly"
        ]
      },
      {
        title: "Delivery Model",
        paragraphs: [
          "Arminus positions this as advisory support rather than ghostwriting. Guidance is provided so the candidate can improve the document with the right structure and presentation.",
          "The service is framed across fresher, mid-level, and senior executive resume needs."
        ]
      },
      {
        title: "Contact Route",
        paragraphs: [
          "The original page explicitly routes interested candidates to `resume@arminus.in` for resume-writing support."
        ]
      }
    ]
  },
  {
    slug: "training",
    title: "Training",
    shortTitle: "Training",
    kicker: "HR, technology, and soft skills",
    summary:
      "Training support across recruitment topics, latest technology areas like cloud, AI, DevOps and analytics, and soft-skills tracks such as leadership, communication, and teamwork.",
    description:
      "Arminus training services are positioned around employability, technology readiness, recruitment fundamentals, and soft-skills development.",
    icon: GraduationCap,
    image: "/team-banner-one.jpg",
    seoTitle: "Training Services",
    seoDescription:
      "Arminus training services cover HR-related recruitment topics, technology learning tracks, and soft-skills development for candidates and teams.",
    highlights: ["HR related training", "Technology related training", "Soft-skills training", "Latest technology topics"],
    sections: [
      {
        title: "HR Related",
        paragraphs: [
          "The old site lists HR-related training around basic recruitment, the role of social media in recruitment, and contract staffing topics."
        ]
      },
      {
        title: "Technology Related",
        paragraphs: [
          "Technology training covers current delivery topics such as blockchain, data analytics, cloud computing, artificial intelligence, DevOps, Internet of Things, and machine learning."
        ]
      },
      {
        title: "Soft Skills Training",
        paragraphs: [
          "Soft-skills support includes leadership, communication skills, and teamwork, positioning the training service as both technical and workplace-oriented."
        ]
      }
    ]
  }
];

export function getServiceBySlug(slug: string) {
  return serviceItems.find((service) => service.slug === slug);
}
