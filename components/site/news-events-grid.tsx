import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Medal,
  Newspaper,
  Trophy,
} from "lucide-react";
import {
  formatNewsDate,
  NewsCategory,
  NewsEvent,
  Pagination,
  resolveMediaUrl,
} from "@/lib/school-api";

const filters: { label: string; category?: NewsCategory; icon: typeof Newspaper }[] = [
  { label: "All Updates", icon: Newspaper },
  { label: "Events", category: "Event", icon: CalendarDays },
  { label: "Campus News", category: "News", icon: Newspaper },
  { label: "Achievements", category: "Achievement", icon: Trophy },
];

function filterHref(page: number, category?: NewsCategory) {
  const query = new URLSearchParams();
  if (page > 1) query.set("page", String(page));
  if (category) query.set("category", category);
  const search = query.toString();
  return `/news-events${search ? `?${search}` : ""}`;
}

function StoryCard({ item }: { item: NewsEvent }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-[0_7px_20px_rgba(0,46,94,.08)] transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/news-events/${item.slug}`}>
        <div className="relative h-36 overflow-hidden sm:h-40">
          <img src={resolveMediaUrl(item.image)} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase text-white ${item.category === "Achievement" ? "bg-[#b5005d]" : item.category === "News" ? "bg-[#355f96]" : "bg-[#00818b]"}`}>{item.category}</span>
          <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2 py-1 text-[9px] font-bold text-[#355f96]"><CalendarDays className="mr-1 inline" size={11}/>{formatNewsDate(item.date)}</span>
        </div>
        <div className="p-4">
          <h2 className="line-clamp-2 min-h-9 font-display text-xs font-extrabold leading-4 text-[#214e84] group-hover:text-[#b5005d]">{item.title}</h2>
          <p className="mt-2 line-clamp-2 min-h-8 text-[10px] leading-4 text-[#725e66]">{item.shortDescription}</p>
          <div className="mt-3 flex items-center justify-between"><span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#b5005d]">Read story <ArrowRight size={12}/></span><span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-[#eef4ff] text-[#355f96]">♧</span></div>
        </div>
      </Link>
    </article>
  );
}

export function NewsEventsGrid({
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
  const activeLabel = filters.find((filter) => filter.category === category)?.label ?? "All Updates";
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12 pt-7 md:px-10 md:pb-16">
      <div className="rounded-2xl bg-[#eef4ff] p-2"><nav aria-label="Filter news and events" className="flex flex-wrap gap-2">
        {filters.map(({ label, category: filterCategory, icon: Icon }) => {
          const count = filterCategory ? categoryCounts[filterCategory] : pagination.total;
          return <Link key={label} aria-current={activeLabel === label ? "page" : undefined} href={filterHref(1, filterCategory)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-extrabold transition ${activeLabel === label ? "bg-[#b5005d] text-white shadow-md" : "bg-white text-[#355f96] hover:bg-[#d4e3ff]"}`}><Icon size={13}/>{label}<span className={`rounded-full px-1.5 py-0.5 text-[9px] ${activeLabel === label ? "bg-white/20" : "bg-[#e4efff]"}`}>{count}</span></Link>;
        })}
      </nav></div>
      <div className="flex flex-wrap items-center justify-between gap-2 py-5 text-[10px] text-[#725e66]"><span>Showing {items.length} stories &amp; milestones from The Manthan School, Noida</span><span className="font-semibold text-[#00818b]">✧ &nbsp; Nurturing wonder every day</span></div>
      {items.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <StoryCard key={item.id} item={item}/>)}</div> : <div className="rounded-3xl bg-white px-6 py-16 text-center"><Medal className="mx-auto text-[#355f96]"/><h2 className="mt-3 font-display text-xl font-extrabold text-[#214e84]">No stories found</h2><p className="mt-2 text-sm text-[#725e66]">There are no published updates in this category yet.</p></div>}
      {pagination.totalPages > 1 && <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2"><Link aria-label="Previous page" aria-disabled={pagination.page <= 1} href={filterHref(Math.max(1,pagination.page-1),category)} className={`grid size-8 place-items-center rounded-full bg-white text-[#355f96] shadow-sm ${pagination.page <= 1 ? "pointer-events-none opacity-40" : ""}`}><ChevronLeft size={15}/></Link>{Array.from({length: pagination.totalPages},(_,index)=>index+1).map((number)=><Link key={number} aria-current={number===pagination.page?"page":undefined} href={filterHref(number,category)} className={`grid size-8 place-items-center rounded-full text-[10px] font-bold ${number===pagination.page?"bg-[#b5005d] text-white":"bg-white text-[#355f96] shadow-sm"}`}>{number}</Link>)}<Link aria-label="Next page" aria-disabled={pagination.page >= pagination.totalPages} href={filterHref(Math.min(pagination.totalPages,pagination.page+1),category)} className={`grid size-8 place-items-center rounded-full bg-white text-[#355f96] shadow-sm ${pagination.page >= pagination.totalPages ? "pointer-events-none opacity-40" : ""}`}><ChevronRight size={15}/></Link></nav>}
      <p className="mt-4 text-center text-[10px] text-[#725e66]">Page {pagination.page} of {Math.max(1,pagination.totalPages)} · {pagination.total} published stories</p>
    </section>
  );
}
