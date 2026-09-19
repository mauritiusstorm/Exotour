interface PhotoPlaceholderProps {
  alt: string;
  className?: string;
}

/**
 * Stands in for the real photography called for by the design brief
 * (hikers, the device, groups on the trail). Swap the `src` for actual
 * assets in /src/assets/images once available — the alt text documents
 * exactly what each shot should show.
 */
export default function PhotoPlaceholder({ alt, className = '' }: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-gold/40 ${className}`}
    >
      <span className="sr-only">{alt}</span>
    </div>
  );
}
