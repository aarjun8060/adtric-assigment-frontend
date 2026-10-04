"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SiteThemeSwitcher } from "./theme-switcher";
import { cn } from "@/lib/utils";

const NAV = [
  //{ label: "About Us", href: "#" },
  { label: "Academics", href: "#" },
  //{ label: "Beyond Academics", href: "#" },
  // { label: "Campus and Facilities", href: "#" },
  { label: "Results and Media", href: "/news-events" },
  { label: "Admissions", href: "/enquiry" },
  { label: "Contact", href: "#" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_rgba(0,46,94,0.06)]">
      <div className="bg-secondary text-secondary-foreground py-1.5 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[11px] uppercase tracking-wider hidden sm:inline text-white/70">
              Campus:
            </span>
            <div className="inline-flex items-center p-0.5 rounded-full bg-black/25">
              <a
                className="font-sans text-[11px] px-3 py-0.5 rounded-full text-white/70 hover:text-white transition-colors"
                href="#"
              >
                GREATER NOIDA WEST
              </a>
              <span className="font-sans text-[11px] px-3 py-0.5 rounded-full bg-primary text-primary-foreground shadow-sm font-bold">
                NOIDA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <div className="hidden md:flex items-center gap-3 font-sans text-[11px]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-accent">
                  call
                </span>
                Front Office: 0120-7133925
              </span>
              <span>•</span>
              <a className="hover:text-white transition-colors" href="#">
                Pay Fees
              </a>
              <span>•</span>
              <a className="hover:text-white transition-colors" href="#">
                Careers
              </a>
            </div>
            <SiteThemeSwitcher />
            <div className="flex items-center gap-2 pl-1">
              {["public", "photo_camera", "smart_display", "share"].map(
                (icon) => (
                  <a
                    key={icon}
                    aria-label={icon}
                    className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center text-white hover:bg-primary transition-colors"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {icon}
                    </span>
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-20 bg-card">
        <div className="h-20 max-w-7xl mx-auto px-4 lg:px-12 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 group min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center shadow-[0_4px_12px_rgba(53,95,150,0.25)] group-hover:scale-105 transition-transform shrink-0">
              <span className="material-symbols-outlined text-secondary-foreground text-[26px]">
                school
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-[18px] font-bold text-foreground leading-tight tracking-tight truncate">
                THE MANTHAN SCHOOL
              </span>
              <span className="font-sans text-[11px] text-primary tracking-wide truncate">
                get, dream, fly •{" "}
                <span className="text-muted-foreground font-medium">
                  A MANTHAN INITIATIVE (NOIDA)
                </span>
              </span>
            </div>
          </Link>

          <nav className="site-desktop-nav hidden xl:flex items-center gap-5">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "font-sans text-[13px] font-semibold text-muted-foreground hover:text-primary transition-colors",
                  item.href !== "#" &&
                    pathname.startsWith(item.href) &&
                    "text-primary font-bold",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="site-menu-button"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="material-symbols-outlined text-[20px]">
                {open ? "close" : "menu"}
              </span>
            </button>
            <Link
              href="/enquiry"
              className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-primary-foreground font-serif text-[12px] uppercase tracking-wider px-4 sm:px-6 py-2.5 rounded-full shadow-[0_6px_18px_rgba(181,0,93,0.35)] transition-all"
            >
              <span>ENQUIRE NOW</span>
              <span className="material-symbols-outlined text-[16px] hidden sm:inline">
                arrow_forward
              </span>
            </Link>
            <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary items-center justify-center">
              <span className="material-symbols-outlined text-primary-foreground text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>

        <nav
          className={cn("xl:hidden", open && "site-mobile-open")}
          hidden={!open}
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-sans text-[14px] font-semibold text-muted-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
