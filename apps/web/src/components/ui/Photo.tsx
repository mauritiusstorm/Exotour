interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Photo({ src, alt, className = '' }: PhotoProps) {
  return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
}
