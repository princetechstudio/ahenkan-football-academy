import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const variantClass =
    variant === "left"
      ? "reveal reveal-left"
      : variant === "right"
        ? "reveal reveal-right"
        : variant === "scale"
          ? "reveal reveal-scale"
          : "reveal";
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  return (
    <div ref={ref} style={style} className={`${variantClass} ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function useCountUp(end: number, duration = 1800, start: boolean) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(end);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start, reduced]);
  return value;
}

const GLYPHS = "AHENKTMIRL#/·";

export function useScramble(text: string, active: boolean) {
  const reduced = usePrefersReducedMotion();
  const [output, setOutput] = useState(reduced ? text : "");
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setOutput(text);
      return;
    }
    let frame = 0;
    const total = 34;
    const id = window.setInterval(() => {
      frame++;
      const progress = frame / total;
      const solved = Math.floor(text.length * progress);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < solved || text[i] === " ") out += text[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(out);
      if (frame >= total) {
        setOutput(text);
        window.clearInterval(id);
      }
    }, 38);
    return () => window.clearInterval(id);
  }, [text, active, reduced]);
  return output;
}

export function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = new Date(target).getTime() - now;
  const past = diff <= 0;
  const d = Math.max(0, Math.floor(diff / 86_400_000));
  const h = Math.max(0, Math.floor((diff / 3_600_000) % 24));
  const m = Math.max(0, Math.floor((diff / 60_000) % 60));
  const s = Math.max(0, Math.floor((diff / 1000) % 60));
  return { d, h, m, s, past };
}

export function Kicker({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "royal" }) {
  return (
    <p
      className={`font-cond text-sm font-semibold uppercase tracking-[0.28em] ${
        tone === "royal" ? "text-royal-500" : "text-gold-500"
      }`}
    >
      <span
        className={`mr-3 inline-block h-2 w-2 translate-y-[-1px] ${
          tone === "royal" ? "bg-royal-500" : "bg-gold-500"
        }`}
      />
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  sub,
  onDark = false,
  align = "left",
}: {
  kicker: string;
  title: string;
  sub?: string;
  onDark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal>
        <Kicker tone={onDark ? "gold" : "royal"}>{kicker}</Kicker>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`mt-4 font-display text-4xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl ${
            onDark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={170}>
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed ${align === "center" ? "mx-auto" : ""} ${
              onDark ? "text-paper/70" : "text-ink/65"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function PageHead({
  kicker,
  title,
  sub,
  crumb,
}: {
  kicker: string;
  title: string;
  sub?: string;
  crumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-40 lg:pb-20 lg:pt-48">
      <div className="pitch-lines absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-royal-500/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold-500/10 blur-[100px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <p className="flex items-center gap-2 font-cond text-sm font-semibold uppercase tracking-[0.24em] text-paper/45">
          <Link to="/" className="transition-colors hover:text-gold-500">
            Home
          </Link>
          <span className="text-gold-500">/</span>
          <span className="text-paper/70">{crumb}</span>
        </p>
        <Reveal>
          <Kicker>{kicker}</Kicker>
        </Reveal>
        <h1 className="mt-4 font-display text-5xl uppercase leading-[0.92] text-paper sm:text-6xl lg:text-7xl">
          <span className="mask-line">
            <span style={{ animationDelay: "0.1s" }}>{title}</span>
          </span>
        </h1>
        {sub && (
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">{sub}</p>
          </Reveal>
        )}
        <div className="anim-glow mt-10 h-1 w-24 bg-gold-500" aria-hidden="true" />
      </div>
    </section>
  );
}

export function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}
