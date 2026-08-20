import type { ReactElement } from "react";

type IconProps = { className?: string };

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 6.5h17m-17 5.5h17m-17 5.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="m12 2.8 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.1l6.1-.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function QuoteIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M4 13.5C4 8.8 7 5.8 10.5 5v2.6C8.6 8.2 7.4 9.7 7.3 11H10v7H4Zm10 0c0-4.7 3-7.7 6.5-8.5v2.6c-1.9.6-3.1 2.1-3.2 3.4H20v7h-6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v5.2l3.4 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.7 1.5C10.5 19.6 4.4 13.5 3.5 5.7A1.5 1.5 0 0 1 5 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4.5 7.5 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14.5 4H12a4 4 0 0 0-4 4v2.5H5.5V14H8v6.5h3.5V14h2.7l.6-3.5h-3.3V8.2c0-.7.5-1.2 1.2-1.2h1.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BellIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5a4.5 4.5 0 0 1 4.5 4.5V10c0 2.2.8 3.5 2.2 5H5.3c1.4-1.5 2.2-2.8 2.2-5V8a4.5 4.5 0 0 1 4.5-4.5Zm0 17a2.5 2.5 0 0 1-2.4-1.8h4.8A2.5 2.5 0 0 1 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BallIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m12 7.5 4.2 3-1.6 5h-5.2L7.8 10.5Zm0-4.4v4.4m8.6 3-4.4.1M16.3 18l-2.7-2.4M10.4 15.6 7.7 18m-.1-7.4L3.4 11m8.6-7.9L9 7m6-3.9 1.2 3.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrophyIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 4h10v6a5 5 0 0 1-10 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M7 6H4.5a0 0 0 0 0 0 0c0 3 1 5 2.9 5.4M17 6h2.5c0 3-1 5-2.9 5.4M12 15v3m-4 3h8m-6.5-3h5l.8 3H9.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 9.5h17M8 2.8V6m8-3.2V6M7.5 13.5h3m2 0h3m-8 3.5h3m2 0h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function UsersIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 20c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5M15.5 4.9a3.5 3.5 0 0 1 0 6.2M17.5 14.9c2 .8 3.2 2.6 3.5 5.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20.5S3.5 15.5 3.5 9.3A4.8 4.8 0 0 1 12 6.7a4.8 4.8 0 0 1 8.5 2.6c0 6.2-8.5 11.2-8.5 11.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 12h18M12 3c2.7 2.6 4 5.6 4 9s-1.3 6.4-4 9c-2.7-2.6-4-5.6-4-9s1.3-6.4 4-9Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function ChartIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 20V4m0 16h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m7.5 14.5 4-4.5 3 2.8 4.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 20 6v6c0 4.8-3.2 7.9-8 9-4.8-1.1-8-4.2-8-9V6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m8.8 12 2.2 2.2 4.4-4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EyeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function BookIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 6.5C10.5 4.9 8 4.5 4.5 4.5v13.7c3.5 0 6 .5 7.5 2 1.5-1.5 4-2 7.5-2V4.5C16 4.5 13.5 4.9 12 6.5Zm0 0v13.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TargetIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function NewsIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 20h14a2 2 0 0 0 2-2V8h-4M4 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12M4 20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.5 8.5h7M6.5 12h7M6.5 15.5h4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ImageIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="9" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="m5 18 5-5 3 3 3.5-3.5L20.5 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FilmIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.5 4.5v15M16.5 4.5v15M3.5 9h4M3.5 15h4M16.5 9h4M16.5 15h4" stroke="currentColor" strokeWidth="1.5" />
      <path d="m11 10 3.5 2-3.5 2Z" fill="currentColor" />
    </svg>
  );
}

export function WhistleIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M13.5 8H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2.2l7 2.6A6 6 0 1 0 13.5 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="14.5" cy="14" r="1.4" fill="currentColor" />
      <path d="M8 5.5 9.5 8M12.5 4.5 13 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export const WHY_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  book: BookIcon,
  shield: ShieldIcon,
  eye: EyeIcon,
  clock: ClockIcon,
  heart: HeartIcon,
  chart: ChartIcon,
  star: StarIcon,
  globe: GlobeIcon,
};
