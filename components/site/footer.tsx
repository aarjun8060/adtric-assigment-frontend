import Link from "next/link";
import { MessageCircle } from "lucide-react";

const columns = [
  {
    title: "Programmes",
    links: [
      "Early Years (Toddlers)",
      "Pre-Primary Wing",
      "Primary School",
      "Middle School",
      "Senior Secondary",
      "STEAM & Robotics",
    ],
  },
  {
    title: "Admissions 2027–28",
    links: [
      "Admission Criteria",
      "Fee Structure",
      "Online Application",
      "Transport Routes",
      "Age Eligibility Chart",
      "Scholarship Schemes",
    ],
  },
  {
    title: "Parent Portal",
    links: [
      "ERP Login",
      "Pay School Fees",
      "Academic Calendar",
      "School Circulars",
      "Photo & Video Gallery",
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#001c3a] text-white">
      <div className="mx-auto grid max-w-7xl gap-9 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1fr_1fr] lg:px-10 lg:py-14">
        <div>
          <Link href="/" className="font-display text-lg font-extrabold">
            ◉ THE MANTHAN SCHOOL
          </Link>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#43d9e7]">
            Noida • CBSE affiliated
          </p>
          <p className="mt-4 max-w-sm text-xs leading-5 text-white/70">
            Fostering curious minds, resilient hearts, and limitless potential
            through inquiry-based experiential education from Pre-Primary
            through Senior Secondary.
          </p>
          <Link
            href="/enquiry"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00818b] px-4 py-2 text-xs font-bold"
          >
            <MessageCircle size={14} /> WhatsApp Admissions Desk
          </Link>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs font-extrabold uppercase tracking-wider">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-white/70">
              {column.links.map((label) => (
                <li key={label}>
                  <Link
                    href={
                      label.includes("Admission") ? "/enquiry" : "/news-events"
                    }
                    className="hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider">
            Contact &amp; Visit
          </h3>
          <p className="mt-4 text-xs leading-5 text-white/70">
            Sector 78, Noida,
            <br />
            Uttar Pradesh 201301
          </p>
          <a
            href="tel:01207133925"
            className="mt-3 block text-xs text-white/70"
          >
            0120-7133925 / 8010-180-180
          </a>
          <a
            href="mailto:info@themanthanschool.org"
            className="mt-2 block text-xs text-white/70"
          >
            info@themanthanschool.org
          </a>
          <Link
            href="/enquiry"
            className="mt-4 inline-block rounded-full bg-white px-4 py-2 text-[10px] font-extrabold uppercase text-[#001c3a]"
          >
            Book a campus visit
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 text-[10px] text-white/60 lg:px-10">
          <div className="flex flex-wrap gap-4">
            <span>Mandatory Public Disclosure</span>
            <span>Careers</span>
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Sitemap</span>
          </div>
          <span>© 2026 The Manthan School. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
