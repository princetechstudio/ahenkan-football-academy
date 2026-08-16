import { Link } from "react-router-dom";
import { IMG } from "../data";
import { useMedia } from "../hooks/useContent";
import { PageHead, Reveal, SectionHead } from "../lib";
import { youtubeEmbed } from "../supabase";
import { ArrowIcon, BallIcon, StarIcon } from "../components/Icons";

function VideoCard({ url, title, caption }: { url: string; title: string; caption: string }) {
  const embed = youtubeEmbed(url);
  return (
    <article className="group flex h-full flex-col overflow-hidden border-2 border-pitch-900/15 bg-bone-50 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-600 hover:shadow-[0_20px_50px_rgba(8,32,21,0.16)]">
      <div className="relative bg-pitch-950">
        {embed ? (
          <iframe
            src={embed}
            title={title}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={url} controls preload="metadata" className="aspect-video w-full" />
        )}
        <span className="absolute left-0 top-4 bg-gold-500 px-3 py-1 font-cond text-[11px] font-bold uppercase tracking-[0.18em] text-pitch-950">
          ▶ Video
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl uppercase leading-snug tracking-wide">{title}</h3>
        {caption && <p className="mt-2 text-sm leading-relaxed text-pitch-900/65">{caption}</p>}
      </div>
    </article>
  );
}

export default function Media() {
  const media = useMedia();
  const videos = media.filter((m) => m.kind === "video");
  const images = media.filter((m) => m.kind === "image");

  return (
    <>
      <PageHead
        crumb="Media"
        kicker="Training Videos · Matchday Photos"
        title="Media Centre"
        sub="Videos and photographs from the Ahenkan Grounds — uploaded by our media team, fresh from every session and matchday."
      />

      {/* videos */}
      <section className="relative bg-bone-100 py-24 text-pitch-900 lg:py-28">
        <span
          className="text-outline-dark pointer-events-none absolute right-0 top-6 select-none font-display text-[17vw] uppercase leading-none opacity-60 lg:text-[190px]"
          aria-hidden="true"
        >
          Watch
        </span>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            kicker="Watch the Academy"
            title="Training Videos"
            sub="Session highlights, drills and matchday footage — watch how world-class habits are built, one repetition at a time."
          />

          {videos.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((v, i) => (
                <Reveal key={v.id} delay={(i % 3) * 100}>
                  <VideoCard url={v.url} title={v.title} caption={v.caption} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={150}>
              <div className="relative mt-14 overflow-hidden border-2 border-pitch-900/15 bg-pitch-900 text-bone-50">
                <div className="pitch-lines absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="relative grid grid-cols-1 items-center gap-10 p-8 sm:p-12 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="flex items-center gap-3 font-cond text-sm font-bold uppercase tracking-[0.26em] text-gold-500">
                      <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-gold-500" />
                      Media team on standby
                    </p>
                    <h3 className="mt-4 font-display text-3xl uppercase leading-tight sm:text-4xl">
                      The cameras are warming up. <span className="text-gold-500">First footage drops soon.</span>
                    </h3>
                    <p className="mt-4 max-w-xl leading-relaxed text-bone-50/70">
                      Our admin uploads training videos and matchday clips straight from the grounds
                      — check back after the next session, or follow us on Facebook so you never miss
                      a upload.
                    </p>
                    <a
                      href="https://www.facebook.com/p/Ahenkan-Football-Academy-61571776081864/"
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-7 inline-flex items-center gap-3 bg-gold-500 px-6 py-3.5 font-cond text-base font-bold uppercase tracking-[0.14em] text-pitch-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400"
                    >
                      Watch on Facebook
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </a>
                  </div>
                  <div className="lg:col-span-5">
                    <figure className="relative overflow-hidden border-2 border-gold-500/60">
                      <img
                        src={IMG.team}
                        alt="Ahenkan Football Academy team and staff"
                        className="anim-kenburns aspect-[4/3] w-full object-cover"
                      />
                      <figcaption className="absolute bottom-0 left-0 bg-pitch-950/90 px-4 py-2 font-cond text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
                        Backstage at the grounds
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* gallery */}
      <section className="relative bg-bone-50 py-24 text-pitch-900 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            kicker="From the Grounds"
            title="Photo Gallery"
            sub="Every week at Adeiso in pictures — uploaded by the academy media team after training and matchdays."
          />

          {images.length > 0 ? (
            <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {images.map((img, i) => (
                <Reveal key={img.id} delay={(i % 3) * 90} variant="scale" className="mb-5 break-inside-avoid">
                  <figure className="group relative overflow-hidden border-2 border-pitch-900/15">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-pitch-950/90 px-4 py-3 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="font-cond text-sm font-bold uppercase tracking-[0.16em] text-gold-400">
                        {img.title}
                      </p>
                      {img.caption && <p className="mt-0.5 text-xs text-bone-50/70">{img.caption}</p>}
                    </figcaption>
                    <span className="absolute right-3 top-3 h-2 w-2 bg-gold-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={150}>
              <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {[IMG.drill, IMG.keeper, IMG.match, IMG.pitch, IMG.hero].map((src, i) => (
                  <figure
                    key={src + i}
                    className={`group relative overflow-hidden border-2 border-pitch-900/15 ${i % 2 === 1 ? "sm:translate-y-4" : ""}`}
                  >
                    <img
                      src={src}
                      alt="Ahenkan academy moments"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    />
                    <span className="absolute bottom-2 left-2 h-2 w-2 bg-gold-500" />
                  </figure>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={200}>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-2 border-pitch-900/15 bg-bone-100 px-7 py-6">
              <p className="flex items-center gap-4 font-display text-2xl uppercase sm:text-3xl">
                <BallIcon className="h-8 w-8 text-gold-600" />
                Are you the media admin? <span className="text-pitch-600">Upload from your computer.</span>
              </p>
              <Link
                to="/admin"
                className="group inline-flex items-center gap-3 bg-pitch-700 px-7 py-3.5 font-cond text-base font-bold uppercase tracking-[0.14em] text-bone-50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pitch-600"
              >
                Open the CMS
                <ArrowIcon className="h-5 w-5 text-gold-400 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center font-cond text-sm font-semibold uppercase tracking-[0.2em] text-pitch-900/45">
              <StarIcon className="h-4 w-4 text-gold-600" />
              Talent · Wisdom · Knowledge at Work
              <StarIcon className="h-4 w-4 text-gold-600" />
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
