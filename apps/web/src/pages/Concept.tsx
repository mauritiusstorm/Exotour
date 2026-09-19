import { useTranslation } from 'react-i18next';
import PageHero from '@/components/ui/PageHero';
import PageMeta from '@/components/PageMeta';

export default function Concept() {
  const { t } = useTranslation();
  const includedItems = t('concept.included.items', { returnObjects: true }) as string[];
  const formatItems = t('concept.formats.items', { returnObjects: true }) as {
    duration: string;
    name: string;
    description: string;
  }[];

  return (
    <>
      <PageMeta titleKey="concept.hero.title" />
      <PageHero
        eyebrow={t('concept.hero.eyebrow')}
        title={t('concept.hero.title')}
        subtitle={t('concept.hero.subtitle')}
      />

      <section className="section">
        <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{t('concept.observation.eyebrow')}</p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{t('concept.observation.title')}</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/80 sm:text-lg">
          {t('concept.observation.body')}
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-navy">{t('concept.clientProblemTitle')}</h3>
            <p className="mt-3 text-ink/80">{t('concept.clientProblemBody')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-navy">{t('concept.agencyProblemTitle')}</h3>
            <p className="mt-3 text-ink/80">{t('concept.agencyProblemBody')}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F1E9D8]">
        <div className="section">
          <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{t('concept.included.eyebrow')}</p>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{t('concept.included.title')}</h2>

          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {includedItems.map((item) => (
              <li key={item} className="flex gap-3 text-ink/80">
                <span className="mt-1 text-gold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{t('concept.formats.eyebrow')}</p>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{t('concept.formats.title')}</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {formatItems.map((format) => (
            <div key={format.name} className="rounded-2xl border border-gold/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{format.duration}</p>
              <h3 className="mt-2 text-xl font-semibold text-navy">{format.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{format.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
