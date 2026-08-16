import { useEffect, useState } from "react";
import { NAV } from "../data";
import { Crest, MailIcon, PhoneIcon } from "./Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* top strip */}
      <div className="relative z-50 border-b border-bone-50/10 bg-pitch-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[13px] sm:px-6">
          <p className="font-cond font-semibold uppercase tracking-[0.22em] text-gold-400">
            GFA Licensed · Grade A Youth Academy
          </p>
          <div className="flex items-center gap-5 text-bone-50/75">
            <span className="hidden items-center gap-2 font-cond uppercase tracking-widest md:flex">
              <span className="text-gold-400">Matchday 12</span>
              <span className="tabular">AHK U17 3–1 Accra Lions</span>
            </span>
            <a
              href="tel:+233245550147"
              className="flex items-center gap-1.5 transition-colors hover:text-gold-400"
            >
              <PhoneIcon className="h-3.5 w-3.5" /> +233 24 555 0147
            </a>
            <a
              href="mailto:trials@ahenkanfootballacademy.com"
              className="hidden items-center gap-1.5 transition-colors hover:text-gold-400 lg:flex"
            >
              <MailIcon className="h-3.5 w-3.5" /> trials@ahenkanfa.com
            </a>
          </div>
        </div>
      </div>

      {/* sticky nav */}
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-bone-50/10 bg-pitch-950/92 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
            : "border-transparent bg-pitch-950/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
          <a href="#top" className="group flex items-center gap-3">
            <Crest className="h-11 w-11 transition-transform duration-300 group-hover:-rotate-6" />
            <span className="leading-none">
              <span className="block font-display text-xl uppercase tracking-wide text-bone-50">
                Ahenkan <span className="text-gold-500">FA</span>
              </span>
              <span className="mt-1 block font-cond text-[11px] font-semibold uppercase tracking-[0.3em] text-bone-50/55">
                Spintex · Accra · Est. 2014
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="nav-link font-cond text-[15px] font-semibold uppercase tracking-[0.18em] text-bone-50/85 transition-colors hover:text-bone-50"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#trials"
              className="group relative hidden overflow-hidden bg-gold-500 px-5 py-2.5 font-cond text-[15px] font-bold uppercase tracking-[0.16em] text-pitch-950 transition-transform duration-200 hover:-translate-y-0.5 sm:block"
            >
              <span className="absolute inset-0 -translate-x-full bg-bone-50 transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative">Book a Trial</span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-bone-50/20 lg:hidden"
            >
              <span
                className={`h-0.5 w-5 bg-bone-50 transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-5 bg-gold-500 transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-5 bg-bone-50 transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-30 flex flex-col justify-center bg-pitch-950/97 px-8 transition-all duration-400 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1">
          {[...NAV, { label: "Book a Trial", href: "#trials" }].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${open ? 80 + i * 50 : 0}ms` }}
              className={`border-b border-bone-50/10 py-4 font-display text-3xl uppercase text-bone-50 transition-all duration-500 hover:pl-3 hover:text-gold-400 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <span className="mr-4 font-cond text-sm text-gold-500">0{i + 1}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <p className="mt-10 font-cond text-sm uppercase tracking-[0.25em] text-bone-50/50">
          Ahenkan — “Miracle” in Twi
        </p>
      </div>
    </>
  );
}
