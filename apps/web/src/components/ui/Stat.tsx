interface StatProps {
  value: string;
  label: string;
  tone?: 'light' | 'dark';
}

export default function Stat({ value, label, tone = 'light' }: StatProps) {
  const wrapper =
    tone === 'dark'
      ? 'rounded-2xl bg-navy-light/60 px-6 py-8 text-center'
      : 'px-6 py-8 text-center';
  const labelColor = tone === 'dark' ? 'text-cream/70' : 'text-ink/70';

  return (
    <div className={wrapper}>
      <p className="font-serif text-4xl font-semibold text-gold sm:text-5xl">{value}</p>
      <p className={`mt-2 text-sm ${labelColor}`}>{label}</p>
    </div>
  );
}
