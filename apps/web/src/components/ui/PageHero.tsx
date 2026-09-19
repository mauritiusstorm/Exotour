interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-content px-6 py-16 sm:py-20 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold sm:text-base">{eyebrow}</p>
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl font-serif text-lg italic text-cream/80 sm:text-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
