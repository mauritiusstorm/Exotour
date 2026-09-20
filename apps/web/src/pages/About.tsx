import { useTranslation } from 'react-i18next';
import PageHero from '@/components/ui/PageHero';
import Photo from '@/components/ui/Photo';
import Stat from '@/components/ui/Stat';
import PageMeta from '@/components/PageMeta';
import aboutGroup from '@/assets/images/about-group.jpg';

export default function About() {
  const { t } = useTranslation();
  const stats = ['groupSize', 'guideRatio', 'formats', 'investment'] as const;

  return (
    <>
      <PageMeta titleKey="about.hero.title" />
      <PageHero eyebrow={t('about.hero.eyebrow')} title={t('about.hero.title')} subtitle={t('about.hero.subtitle')} />

      <section className="section">
        <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{t('about.conviction.eyebrow')}</p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{t('about.conviction.title')}</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/80 sm:text-lg">{t('about.conviction.body')}</p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-navy">{t('about.notTitle')}</h3>
            <p className="mt-3 text-ink/80">{t('about.notBody')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-navy">{t('about.areTitle')}</h3>
            <p className="mt-3 text-ink/80">{t('about.areBody')}</p>
          </div>
        </div>
      </section>

      <Photo src={aboutGroup} alt={t('about.imageAlt')} className="h-[26rem] w-full sm:h-[30rem]" />

      <section className="bg-navy">
        <div className="section">
          <p className="mb-3 text-sm uppercase tracking-widest text-gold sm:text-base">{t('about.figures.eyebrow')}</p>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            {t('about.figures.title')}
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((key) => (
              <Stat key={key} tone="dark" value={t(`stats.${key}.value`)} label={t(`stats.${key}.label`)} />
            ))}
          </div>

          <p className="mt-8 max-w-3xl font-serif text-sm italic text-cream/70 sm:text-base">
            {t('about.figures.note')}
          </p>
        </div>
      </section>
    </>
  );
}
