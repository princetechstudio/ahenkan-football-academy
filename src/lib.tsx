import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

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
    <div
      ref={ref}
      style={style}
      className={`${variantClass} ${inView ? "is-in" : ""} ${className}`}
    >
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

const GLYPHS = "AKHENMIRCL#/·";

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

export function Kicker({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`font-cond text-sm font-semibold uppercase tracking-[0.28em] ${
        dark ? "text-pitch-700" : "text-gold-500"
      }`}
    >
      <span className="mr-3 inline-block h-2 w-2 translate-y-[-1px] bg-gold-500" />
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  sub,
  dark = false,
  align = "left",
}: {
  kicker: string;
  title: string;
  sub?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal>
        <Kicker dark={dark}>{kicker}</Kicker>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`mt-4 font-display text-4xl leading-[0.95] uppercase sm:text-5xl lg:text-6xl ${
            dark ? "text-pitch-900" : "text-bone-50"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={170}>
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed ${
              align === "center" ? "mx-auto" : ""
            } ${dark ? "text-pitch-800/80" : "text-bone-50/70"}`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
