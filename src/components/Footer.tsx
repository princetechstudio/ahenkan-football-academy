import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CONTACT, IMG, NAV, SITE_LINKS } from "../data";
import { FacebookIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-paper text-ink">
      <p
        className="text-outline-royal pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap font-display text-[15vw] uppercase leading-none opacity-60"
        aria-hidden="true"
      >
        Ahenkan FA
      </p>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="grid grid-cols-1 gap-12 border-b border-ink/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={IMG.logo}
                alt="Ahenkan Football Academy crest"
                className="h-14 w-14 rounded-full border-2 border-royal-500/70 object-cover"
              />
              <span className="leading-none">
                <span className="block font-display text-2xl uppercase tracking-wide">
                  Ahenkan <span className="text-royal-500">FA</span>
                </span>
                <span className="mt-1 block font-cond text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/50">
                  Developing Ghana's Future Stars
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-ink/65">
              Premier football academy in Ghana offering youth development programs, elite training
              camps, and community outreach — unearthing world-class talent from Adeiso since 2025.
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center border border-ink/15 text-ink/60 transition-all duration-200 hover:-translate-y-1 hover:border-royal-500 hover:text-royal-500"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center border border-ink/15 text-ink/60 transition-all duration-200 hover:-translate-y-1 hover:border-royal-500 hover:text-royal-500"
              >
                <MailIcon className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.phoneHref}
                aria-label="Call"
                className="flex h-11 w-11 items-center justify-center border border-ink/15 text-ink/60 transition-all duration-200 hover:-translate-y-1 hover:border-royal-500 hover:text-royal-500"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-cond text-sm font-bold uppercase tracking-[0.24em] text-royal-600">Explore</h4>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-ink/65 transition-all duration-200 hover:pl-1.5 hover:text-royal-500"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-cond text-sm font-bold uppercase tracking-[0.24em] text-royal-600">
              ahenkanfootballacademy.com
            </h4>
            <ul className="mt-5 space-y-2.5">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink/65 transition-all duration-200 hover:pl-1.5 hover:text-royal-500"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-cond text-sm font-bold uppercase tracking-[0.24em] text-royal-600">
              Visit & Subscribe
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-ink/65">
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-royal-500" />
                {CONTACT.address}, {CONTACT.region}
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-royal-500" />
                <a href={CONTACT.phoneHref} className="transition-colors hover:text-royal-500">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 shrink-0 text-royal-500" />
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-royal-500">
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            {state === "done" ? (
              <p className="mt-5 border-2 border-royal-500/50 bg-lav-100 px-4 py-3 font-cond text-sm font-bold uppercase tracking-[0.16em] text-royal-700">
                ✓ You're on the list. See you at the grounds.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-5" noValidate>
                <label htmlFor="nl-email" className="sr-only">
                  Email for academy updates
                </label>
                <div className="flex">
                  <input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setState("idle");
                    }}
                    placeholder="you@example.com"
                    className={`min-w-0 flex-1 border-2 bg-lav-50 px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-royal-500 ${
                      state === "error" ? "border-loss" : "border-ink/15"
                    }`}
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-gold-500 px-5 font-cond text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold-400"
                  >
                    Join
                  </button>
                </div>
                {state === "error" && (
                  <p className="mt-2 text-sm font-semibold text-loss">Please enter a valid email.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* bottom strip */}
      <div className="relative mt-0 bg-royal-950">
        <div className="diagonal-stripes absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-7 sm:px-6">
          <p className="font-cond text-sm uppercase tracking-[0.18em] text-paper/55">
            © 2026 Ahenkan Football Academy · Est. 2025
          </p>
          <p className="font-cond text-sm uppercase tracking-[0.18em] text-gold-500">
            Talent · Wisdom · Knowledge at Work
          </p>
        </div>
      </div>
    </footer>
  );
}
