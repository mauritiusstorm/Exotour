import { useTranslation } from 'react-i18next';
import PageHero from '@/components/ui/PageHero';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import PageMeta from '@/components/PageMeta';

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('howItWorks.steps', { returnObjects: true }) as {
    number: string;
    title: string;
    description: string;
  }[];

  return (
    <>
      <PageMeta titleKey="howItWorks.hero.title" />
      <PageHero
        eyebrow={t('howItWorks.hero.eyebrow')}
        title={t('howItWorks.hero.title')}
        subtitle={t('howItWorks.hero.subtitle')}
      />

      <section className="section">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number}>
              <p className="font-serif text-3xl font-semibold text-gold">{step.number}</p>
              <h3 className="mt-2 text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <PhotoPlaceholder alt={t('howItWorks.imageAlt')} className="h-[26rem] w-full sm:h-[30rem]" />

      <section className="bg-navy">
        <div className="section">
          <p className="mb-3 text-sm uppercase tracking-widest text-gold sm:text-base">
            {t('howItWorks.summary.eyebrow')}
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            {t('howItWorks.summary.title')}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {t('howItWorks.summary.body')}
          </p>
        </div>
      </section>
    </>
  );
}
