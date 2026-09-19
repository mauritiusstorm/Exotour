import { type ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  body?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
}

export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
  tone = 'light'
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const titleColor = tone === 'dark' ? 'text-cream' : 'text-navy';
  const bodyColor = tone === 'dark' ? 'text-cream/80' : 'text-ink/80';

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{eyebrow}</p>
      <h2 className={`text-3xl font-semibold leading-tight sm:text-4xl ${titleColor}`}>{title}</h2>
      {body ? <div className={`mt-4 text-base leading-relaxed sm:text-lg ${bodyColor}`}>{body}</div> : null}
    </div>
  );
}
