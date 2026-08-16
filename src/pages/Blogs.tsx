import { useState } from "react";
import { BLOGS } from "../data";
import { PageHead, Reveal } from "../lib";
import { ArrowIcon, StarIcon } from "../components/Icons";

export default function Blogs() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const featured = BLOGS.find((b) => b.featured) ?? BLOGS[0];
  const rest = BLOGS.filter((b) => b.id !== featured.id);

  return (
    <>
      <PageHead
        crumb="Blogs"
        kicker="News from the Grounds"
        title="Academy Blogs"
        sub="Announcements, development insight and community stories from Ahenkan Football Academy — updated from the touchline."
      />

      <section className="relative bg-bone-100 py-20 text-pitch-900 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* featured */}
          <Reveal variant="left">
            <article
              className={`group grid grid-cols-1 overflow-hidden border-2 transition-all duration-300 lg:grid-cols-12 ${
                expanded === featured.id
                  ? "border-gold-600 bg-bone-50 shadow-[0_28px_70px_rgba(8,32,21,0.18)]"
                  : "border-pitch-900/15 bg-bone-50 hover:border-gold-600 hover:shadow-[0_20px_50px_rgba(8,32,21,0.14)]"
              }`}
            >
              <div className="relative overflow-hidden lg:col-span-6">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="h-full min-h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-0 top-6 bg-gold-500 px-4 py-1.5 font-cond text-sm font-bold uppercase tracking-[0.18em] text-pitch-950">
                  ★ Featured
                </span>
              </div>
              <div className="flex flex-col p-7 sm:p-10 lg:col-span-6">
                <p className="flex items-center gap-3">
                  <span className="bg-pitch-700 px-2.5 py-1 font-cond text-xs font-bold uppercase tracking-[0.16em] text-bone-50">
                    {featured.cat}
                  </span>
                  <span className="tabular font-cond text-sm font-semibold uppercase tracking-widest text-pitch-900/50">
                    {featured.date}
                  </span>
                </p>
                <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-wide sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 leading-relaxed text-pitch-900/70">
                  {expanded === featured.id ? featured.full : featured.excerpt}
                </p>
                <button
                  onClick={() => setExpanded(expanded === featured.id ? null : featured.id)}
                  className="group/b mt-7 inline-flex items-center gap-3 self-start font-cond text-base font-bold uppercase tracking-[0.16em] text-pitch-600 transition-colors hover:text-gold-700"
                >
                  {expanded === featured.id ? "Show less" : "Read full story"}
                  <ArrowIcon className={`h-4 w-4 transition-transform duration-300 ${expanded === featured.id ? "rotate-90" : "group-hover/b:translate-x-1.5"}`} />
                </button>
              </div>
            </article>
          </Reveal>

          {/* grid */}
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((n, i) => {
              const open = expanded === n.id;
              return (
                <Reveal key={n.id} delay={(i % 3) * 100}>
                  <article
                    className={`flex h-full flex-col border-2 bg-bone-50 transition-all duration-300 ${
                      open
                        ? "border-gold-600 shadow-[0_20px_50px_rgba(8,32,21,0.16)]"
                        : "border-pitch-900/15 hover:-translate-y-1.5 hover:border-gold-600 hover:shadow-[0_18px_44px_rgba(8,32,21,0.14)]"
                    }`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={n.img}
                        alt={n.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                      />
                      <span className="absolute left-0 top-4 bg-pitch-950 px-3 py-1 font-cond text-xs font-bold uppercase tracking-[0.18em] text-gold-500">
                        {n.cat}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="tabular flex items-center gap-2 font-cond text-xs font-bold uppercase tracking-[0.18em] text-pitch-900/45">
                        <StarIcon className="h-3 w-3 text-gold-600" /> {n.date}
                      </p>
                      <h3 className="mt-3 font-display text-xl uppercase leading-snug tracking-wide">{n.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-pitch-900/65">
                        {open ? n.full : n.excerpt}
                      </p>
                      <button
                        onClick={() => setExpanded(open ? null : n.id)}
                        className="group/b mt-auto inline-flex items-center gap-2 self-start pt-5 font-cond text-sm font-bold uppercase tracking-[0.14em] text-pitch-600 transition-colors hover:text-gold-700"
                      >
                        {open ? "Show less" : "Read more"}
                        <ArrowIcon className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-90" : "group-hover/b:translate-x-1"}`} />
                      </button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
