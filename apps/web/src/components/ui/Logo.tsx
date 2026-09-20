interface LogoProps {
  className?: string;
}

/**
 * Exotour wordmark: "EX" + a mountain-peak/loop mark standing in for the O + "TOUR".
 * The mark is a redrawn interpretation of the brand's paper mockup (line art,
 * twin peaks flowing into an open circle), traced as a single stroke so it
 * reads cleanly at both header and favicon sizes.
 */
export default function Logo({ className = '' }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center font-sans font-semibold uppercase tracking-normal text-navy ${className}`}
    >
      <span>Ex</span>
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="mx-[-0.02em] inline-block h-[0.95em] w-[0.95em] shrink-0 align-[-0.08em]"
      >
        <path
          d="M7.07 22.25
             A 9.5 9.5 0 0 1 7.77 14.25
             L 12 3
             L 16 9
             L 20 3
             L 24.23 14.25
             A 9.5 9.5 0 0 1 25.5 19
             A 9.5 9.5 0 0 1 16 28.5
             A 9.5 9.5 0 0 1 7.77 23.75
             Q 10.5 26 13 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        />
      </svg>
      <span>tour</span>
    </span>
  );
}
