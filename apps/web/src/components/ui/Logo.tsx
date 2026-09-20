import logoSrc from '@/assets/logo/exotour-logo.png';

interface LogoProps {
  className?: string;
}

/**
 * The client-supplied Exotour wordmark, cut out from its paper-mockup
 * photo (see /apps/web/src/assets/logo). `className` should set a height
 * (e.g. `h-9`) — width follows automatically from the image's own ratio.
 */
export default function Logo({ className = '' }: LogoProps) {
  return <img src={logoSrc} alt="Exotour" className={`block w-auto ${className}`} />;
}
