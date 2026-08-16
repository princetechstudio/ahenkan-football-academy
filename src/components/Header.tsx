import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CONTACT, IMG, NAV } from "../data";
import { CloseIcon, FacebookIcon, MailIcon, MenuIcon, PhoneIcon, PinIcon } from "./Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* utility bar */}
      <div
        className={`hidden overflow-hidden bg-royal-900 text-paper/85 transition-all duration-500 md:block ${
          scrolled ? "max-h-0" : "max-h-12"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-6 font-cond text-sm tracking-wide">
            <a href={CONTACT.phoneHref} className="flex items-center gap-2 transition-colors hover:text-gold-500">
              <PhoneIcon className="h-3.5 w-3.5 text-gold-500" /> {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 transition-colors hover:text-gold-500">
              <MailIcon className="h-3.5 w-3.5 text-gold-500" /> {CONTACT.email}
            </a>
          </div>
          <div className="flex items-center gap-6 font-cond text-sm tracking-wide">
            <span className="flex items-center gap-2">
              <PinIcon className="h-3.5 w-3.5 text-gold-500" /> {CONTACT.address}
            </span>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Ahenkan Football Academy on Facebook"
              className="transition-colors hover:text-gold-500"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* main nav */}
      <div
        className={`border-b transition-all duration-500 ${
          scrolled
            ? "border-royal-500/25 bg-paper/95 shadow-[0_10px_40px_rgba(94,0,138,0.12)] backdrop-blur-md"
            : "border-ink/8 bg-paper/85 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={IMG.logo}
              alt="Ahenkan Football Academy crest"
              className="h-12 w-12 rounded-full border-2 border-royal-500/70 object-cover shadow-[0_0_0_3px_rgba(255,255,255,1),0_6px_18px_rgba(94,0,138,0.25)] transition-transform duration-300 group-hover:scale-105"
            />
            <span className="leading-none">
              <span className="block font-display text-xl uppercase tracking-wide text-ink">
                Ahenkan <span className="text-royal-500">FA</span>
              </span>
              <span className="mt-1 block font-cond text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/50">
                Talent · Wisdom · Knowledge
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `nav-link font-cond text-base font-semibold uppercase tracking-[0.14em] transition-colors ${
                    isActive ? "nav-active text-royal-600" : "text-ink/75 hover:text-ink"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden items-center gap-2 bg-gold-500 px-5 py-2.5 font-cond text-base font-bold uppercase tracking-[0.12em] text-ink shadow-[0_6px_20px_rgba(255,255,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 sm:inline-flex"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-royal-500 hover:text-royal-500 lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* mobile panel */}
        <div
          className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.2,1)] lg:hidden ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="space-y-1 border-t border-ink/10 bg-paper px-4 py-4 sm:px-6" aria-label="Mobile">
              {NAV.map((n, i) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-ink/10 px-2 py-3 font-cond text-xl font-semibold uppercase tracking-[0.14em] transition-colors ${
                      isActive ? "text-royal-600" : "text-ink/80 hover:text-royal-500"
                    }`
                  }
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {n.label}
                  <span className="font-display text-sm text-royal-300">0{i + 1}</span>
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mt-4 block bg-gold-500 px-5 py-3.5 text-center font-cond text-lg font-bold uppercase tracking-[0.14em] text-ink"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
