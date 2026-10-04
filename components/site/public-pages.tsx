import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";
import { NewsCategory, NewsEvent, Pagination, formatNewsDate, resolveMediaUrl } from "@/lib/school-api";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { NewsEventsGrid } from "@/components/site/news-events-grid";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-canvas min-h-screen pt-[112px] font-[var(--font-body)]">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

function Wave({ color = "#f8f9ff" }: { color?: string }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-px left-0 block h-7 w-full md:h-12"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
    >
      <path
        fill={color}
        d="M0 23c120 44 216 54 344 27s205-25 326 0 227 29 352 0 260-37 418-2v32H0z"
      />
    </svg>
  );
}

function TrustPoints() {
  const points = [
    [
      Clock3,
      "Callback within one working day",
      "Personal counselling from our experienced early years educators who understand each milestone.",
    ],
    [
      Sparkles,
      "No obligation & transparent guidance",
      "Clear understanding of age criteria, transparent fee structures, and experiential curriculum pathways.",
    ],
    [
      MapPin,
      "Campus visit & classroom trial",
      "Experience our vibrant play zones, sensory gardens, certified air purifiers, and CCTV-enabled care rooms.",
    ],
  ] as const;
  return (
    <div className="mt-7 space-y-5">
      {points.map(([Icon, title, description]) => (
        <div className="flex gap-3" key={title}>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#355f96]">
            <Icon size={19} />
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-white">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-white/75">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EventDiaryPage({ items }: { items: NewsEvent[] }) {
  return (
    <PublicShell>
      <main className="relative overflow-hidden bg-[#b5005d] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[.1]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <section className="relative mx-auto max-w-7xl px-5 pb-14 pt-12 md:px-10 md:pb-16 md:pt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.17em] text-[#ffd9e1]">
                <span>▣</span> Campus happenings
              </p>
              <h1 className="mt-2 font-display text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl">
                The event diary
              </h1>
              <div className="mt-2 h-1 w-40 rounded-full bg-[#43d9e7]" />
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
                News, events and celebrations that create joyful moments
                throughout the academic year.
              </p>
            </div>
            <Link
              href="/news-events"
              className="mb-1 inline-flex items-center gap-3 rounded-full border-2 border-white px-5 py-3 text-xs font-extrabold uppercase transition hover:bg-white hover:text-[#b5005d]"
            >
              All news &amp; events <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[2rem] bg-white text-[#101c29] shadow-[0_12px_30px_rgba(29,0,23,.2)]"
              >
                <Link href={`/news-events/${item.slug}`}>
                  <div className="relative h-48 overflow-hidden sm:h-52">
                    <img
                      src={resolveMediaUrl(item.image)}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-[#00818b] px-3 py-1 text-[10px] font-extrabold uppercase text-white">
                      {item.category}
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-[#001c3a]/90 px-3 py-1 text-[10px] font-bold text-white">
                      <CalendarDays className="mr-1 inline" size={12} />
                      {formatNewsDate(item.date)}
                    </span>
                  </div>
                  <div className="flex min-h-44 flex-col p-5">
                    <h2 className="font-display text-lg font-extrabold leading-snug">
                      {item.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#725e66]">
                      {item.shortDescription}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#e4efff] pt-3">
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#b5005d]">
                        Read more <ArrowRight size={14} />
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-lg text-[#e2bdc6]"
                      >
                        ♡
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-24 pt-8 md:grid-cols-[.82fr_1.18fr] md:px-10 md:pb-28 md:pt-8">
          <div className="pt-1">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.15em] text-[#ffd9e1]">
              ✿ &nbsp;Admissions open 2026–27
            </p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
              Admission enquiry
            </h2>
            <div className="mt-2 h-1 w-32 rounded-full bg-[#43d9e7]" />
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/85">
              Tell us about your child. Our dedicated admissions team will
              personally call you back to walk you through our warm community.
            </p>
            <TrustPoints />
            <div className="mt-6 flex max-w-md gap-3 rounded-3xl bg-[#8e0047] p-4">
              {items[0]?.image && <img src={resolveMediaUrl(items[0].image)} alt="A Manthan learner" className="h-16 w-20 rounded-xl object-cover" />}
              <div>
                <p className="text-sm font-extrabold">
                  Need immediate assistance?
                </p>
                <p className="mt-1 text-xs text-white/75">
                  Direct help desk line active 8am–5pm
                </p>
                <a
                  href="tel:01207133925"
                  className="mt-2 block text-xs font-bold"
                >
                  ☎ 0120-7133925 / 8010-180-180
                </a>
              </div>
            </div>
          </div>
          <EnquiryForm />
        </section>
        <Wave color="#001c3a" />
      </main>
    </PublicShell>
  );
}

export function AdmissionEnquiryPage() {
  return (
    <PublicShell>
      <main className="bg-[#b5005d] px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[.8fr_1.2fr]">
          <section className="pt-5 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#ffd9e1]">
              Admissions open 2026–27
            </p>
            <h1 className="mt-3 font-display text-4xl font-black uppercase">
              Admission enquiry
            </h1>
            <div className="mt-2 h-1 w-32 rounded bg-[#43d9e7]" />
            <p className="mt-4 max-w-md text-sm leading-6 text-white/85">
              Tell us about your child. Our dedicated admissions team will
              personally call you back to walk you through our warm community.
            </p>
            <TrustPoints />
          </section>
          <EnquiryForm />
        </div>
      </main>
    </PublicShell>
  );
}

export function NewsEventsPage({
  items,
  pagination,
  category,
  categoryCounts,
}: {
  items: NewsEvent[];
  pagination: Pagination;
  category?: NewsCategory;
  categoryCounts: Record<NewsCategory, number>;
}) {
  return (
    <PublicShell>
      <main className="bg-[#f8f9ff]">
        <section className="relative overflow-hidden bg-[#001c3a] px-5 pb-14 pt-9 text-center text-white md:px-10 md:pb-16 md:pt-12">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-semibold">
            <Link href="/">Home</Link>
            <ChevronRight size={12} />
            <span>News &amp; Events</span>
          </div>
          <span className="absolute left-[12%] top-8 text-5xl text-[#43d9e7]/20">
            ♧
          </span>
          <span className="absolute right-[16%] top-8 rotate-12 text-5xl text-[#a6c8ff]/25">
            ➤
          </span>
          <span className="absolute left-[23%] top-1/2 text-3xl text-[#43d9e7]/20">
            ☆
          </span>
          <p className="text-xs font-extrabold uppercase tracking-[.17em] text-[#43d9e7]">
            The Manthan School · Noida
          </p>
          <h1 className="mx-auto mt-2 max-w-3xl font-display text-4xl font-black uppercase sm:text-5xl">
            News &amp; Events
          </h1>
          <div className="mx-auto mt-2 h-1 w-48 rounded-full bg-[#e01276]" />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80">
            Explore the vibrant celebrations, student triumphs, and everyday
            discoveries across our nurturing Noida campus.
          </p>
          <span className="mt-4 inline-flex rounded-full bg-[#00818b]/30 px-4 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-[#85f3ff]">
            ● &nbsp; Session 2026–27 campus updates &amp; highlights
          </span>
          <Wave color="#f8f9ff" />
        </section>
        <NewsEventsGrid items={items} pagination={pagination} category={category} categoryCounts={categoryCounts} />
        <section className="relative overflow-hidden bg-[#001c3a] px-5 py-12 text-white md:px-10 md:py-14">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-[#85f3ff]">
                ◉ &nbsp; Admissions open 2026–27
              </p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-black uppercase leading-tight">
                Bring your child. Watch one session. Decide after that.
              </h2>
              <p className="mt-3 max-w-xl text-xs leading-5 text-white/70">
                Visit us during active school hours, Monday to Friday. Witness
                our joyful inquiry classrooms, experiential STEAM spaces, and
                dedicated care team firsthand.
              </p>
            </div>
            <Link
              href="/enquiry"
              className="shrink-0 rounded-full bg-[#b5005d] px-6 py-3 text-xs font-extrabold uppercase"
            >
              Enquire about admission{" "}
              <ArrowRight className="ml-2 inline" size={15} />
            </Link>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}

function LatestUpdates({ items }: { items: NewsEvent[] }) {
  return (
    <aside className="rounded-3xl border border-[#d7e4f5] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between"><h2 className="font-display text-sm font-extrabold uppercase text-[#355f96]">Latest updates</h2><span className="rounded-full bg-[#e4efff] px-2 py-1 text-[9px] font-bold uppercase text-[#00666e]">Bulletin</span></div>
      <div className="mt-4 space-y-4">{items.map((item) => <Link href={`/news-events/${item.slug}`} key={item.id} className="flex gap-3"><img src={resolveMediaUrl(item.image)} alt="" className="size-14 shrink-0 rounded-xl object-cover"/><span className="min-w-0"><span className="block text-[10px] font-bold text-[#b5005d]">{formatNewsDate(item.date)}</span><span className="mt-1 line-clamp-2 block text-xs font-bold leading-4 text-[#101c29]">{item.title}</span></span></Link>)}</div>
      <Link href="/news-events" className="mt-4 inline-flex items-center gap-1 text-[10px] font-extrabold text-[#b5005d]">View all stories <ArrowRight size={12}/></Link>
    </aside>
  );
}

export function PublicArticlePage({ article, latest }: { article: NewsEvent; latest: NewsEvent[] }) {
  const paragraphs = (article.content || article.shortDescription).split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const readMinutes = Math.max(1, Math.ceil((article.content || "").split(/\s+/).length / 200));
  return (
    <PublicShell>
      <main className="bg-[#f8f9ff]">
        <section className="relative overflow-hidden bg-[#001c3a] px-5 pb-12 pt-5 text-white md:px-10 md:pb-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] text-white/65"><Link href="/">Home</Link><ChevronRight size={12}/><Link href="/news-events">News &amp; Events</Link><ChevronRight size={12}/><span className="text-white">{article.title}</span></div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold"><span className="rounded-full bg-[#00818b] px-3 py-1 uppercase">✦ {article.category}</span><span className="rounded-full bg-white/10 px-3 py-1"><CalendarDays className="mr-1 inline" size={12}/>{formatNewsDate(article.date)}</span><span className="rounded-full bg-white/10 px-3 py-1">◷ {readMinutes} min read</span></div>
            <h1 className="mt-3 max-w-4xl font-display text-3xl font-black uppercase leading-[1.06] sm:text-5xl">{article.title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/80">{article.shortDescription}</p>
            <p className="mt-4 text-[10px] font-semibold text-white/75"><span className="mr-2 inline-grid size-6 place-items-center rounded-full bg-[#e01276]">M</span>The Manthan School Editorial Desk<br/><span className="ml-8 text-[#43d9e7]">◉ Sector 78 Campus, Noida</span></p>
          </div><span className="absolute right-[10%] top-10 rotate-12 text-4xl text-white/15">➤</span><Wave/>
        </section>
        <article className="mx-auto grid max-w-7xl gap-6 px-5 py-7 md:grid-cols-[minmax(0,1fr)_290px] md:px-10 md:py-9">
          <div className="min-w-0"><div className="relative overflow-hidden rounded-2xl bg-[#d7e4f5]"><img src={resolveMediaUrl(article.image)} alt={article.title} className="aspect-[1.75] w-full object-cover"/><span className="absolute left-3 top-3 rounded-full bg-[#001c3a]/85 px-3 py-1 text-[9px] font-extrabold uppercase text-white">◉ {article.category} · The Manthan School</span></div><div className="mt-5 space-y-5 text-sm leading-7 text-[#5a3f47]">{paragraphs.map((paragraph,index)=><p key={`${index}-${paragraph.slice(0,24)}`}>{paragraph}</p>)}</div><div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-[#e4efff] bg-white px-4 py-3 text-[10px]"><Link href="/news-events" className="inline-flex items-center gap-1 font-bold text-[#355f96]"><ArrowLeft size={13}/> Back to all news &amp; events</Link><span className="text-[#8e6f77]">Share this story: &nbsp; ◉ &nbsp; f &nbsp; ↗ &nbsp; ♡</span></div></div>
          <aside className="space-y-5"><div className="rounded-2xl border border-[#d7e4f5] bg-white p-5 shadow-sm"><p className="text-[9px] font-extrabold uppercase tracking-widest text-[#b5005d]">Admission 2027–28</p><h2 className="mt-1 font-display text-lg font-extrabold uppercase text-[#355f96]">Experience Manthan firsthand</h2><p className="mt-2 text-[10px] leading-4 text-[#5a3f47]">Admissions are open for Session 2027–28. Book a personalised classroom walkthrough today.</p><EnquiryFormCompact/><p className="mt-3 rounded-full bg-[#eef4ff] px-3 py-2 text-center text-[9px] font-bold text-[#355f96]">☎ Call us back instantly: 0120-7133925</p></div><LatestUpdates items={latest}/></aside>
        </article>
        <section className="bg-[#eef4ff] px-5 py-10 md:px-10"><div className="mx-auto max-w-7xl"><div className="mb-5 flex items-end justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-widest text-[#b5005d]">Discover more stories</p><h2 className="mt-1 font-display text-2xl font-extrabold uppercase text-[#355f96]">More from the event diary</h2></div><Link href="/news-events" className="text-xs font-bold text-[#b5005d]">View all <ArrowRight className="ml-1 inline" size={14}/></Link></div><div className="grid gap-4 md:grid-cols-3">{latest.map((story)=><Link key={story.id} href={`/news-events/${story.slug}`} className="group overflow-hidden rounded-2xl bg-white"><img src={resolveMediaUrl(story.image)} alt={story.title} className="h-36 w-full object-cover transition group-hover:scale-[1.02]"/><div className="p-4"><span className="text-[9px] font-extrabold uppercase text-[#00818b]">{story.category} · {formatNewsDate(story.date)}</span><h3 className="mt-2 line-clamp-2 text-xs font-extrabold text-[#355f96]">{story.title}</h3><p className="mt-2 text-[10px] font-bold text-[#b5005d]">Read story →</p></div></Link>)}</div></div></section>
        <section className="bg-[#001c3a] px-5 py-12 text-center text-white md:px-10"><p className="mx-auto inline-flex rounded-full bg-white/10 px-3 py-1 text-[9px] font-bold text-[#85f3ff]">OPEN CLASSROOMS, EVERY WEEK</p><h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-black uppercase">Bring your child. Watch one session. Decide after that.</h2><p className="mx-auto mt-3 max-w-xl text-xs text-white/70">Experience our experiential learning ateliers, meet our caring educators, and witness joyful discovery in action.</p><Link href="/enquiry" className="mt-5 inline-flex rounded-full bg-[#b5005d] px-6 py-3 text-xs font-extrabold uppercase">Enquire about admission <ArrowRight className="ml-2 inline" size={14}/></Link></section>
      </main>
    </PublicShell>
  );
}

function EnquiryFormCompact() {
  return (
    <div className="mt-4 space-y-2">
      <input
        aria-label="Parent full name"
        placeholder="Parent’s Full Name *"
        className="h-9 w-full rounded-md bg-[#eef4ff] px-3 text-[10px] outline-none focus:ring-2 focus:ring-[#98c0fd]"
      />
      <input
        aria-label="Mobile number"
        placeholder="Mobile Number *"
        className="h-9 w-full rounded-md bg-[#eef4ff] px-3 text-[10px] outline-none focus:ring-2 focus:ring-[#98c0fd]"
      />
      <select
        aria-label="Grade applying for"
        className="h-9 w-full rounded-md bg-[#eef4ff] px-3 text-[10px] text-[#5a3f47]"
      >
        <option>Grade Applying For *</option>
        <option>Kindergarten</option>
        <option>Grade 1</option>
      </select>
      <Link
        href="/enquiry"
        className="block rounded-full bg-[#b5005d] px-4 py-2.5 text-center text-[10px] font-extrabold uppercase text-white"
      >
        Quick enquiry <ArrowRight className="ml-2 inline" size={12} />
      </Link>
    </div>
  );
}
