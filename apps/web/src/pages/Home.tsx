import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import Stat from '@/components/ui/Stat';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import PageMeta from '@/components/PageMeta';

export default function Home() {
  const { t } = useTranslation();

  const stats = ['groupSize', 'guideRatio', 'formats', 'investment'] as const;

  return (
    <>
      <PageMeta titleKey="home.hero.title" />

      <section className="bg-navy">
        <div className="mx-auto max-w-content px-6 py-20 sm:py-28 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold sm:text-base">
            {t('home.hero.eyebrow')}
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg italic leading-relaxed text-cream/80 sm:text-xl">
            {t('home.hero.subtitle')}
          </p>
          <div className="mt-8">
            <Button as="link" to="/partenariat#contact" variant="primary">
              {t('nav.cta')}
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{t('home.about.eyebrow')}</p>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{t('home.about.title')}</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/80 sm:text-lg">{t('home.about.body')}</p>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((key) => (
            <Stat key={key} value={t(`stats.${key}.value`)} label={t(`stats.${key}.label`)} />
          ))}
        </div>
      </section>

      <PhotoPlaceholder alt={t('home.imageAlt')} className="h-[28rem] w-full sm:h-[32rem]" />

      <section className="bg-cream">
        <div className="section">
          <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{t('home.difference.eyebrow')}</p>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{t('home.difference.title')}</h2>

          <div className="mt-10 rounded-2xl bg-navy p-8 sm:p-10">
            <h3 className="font-serif text-xl font-semibold text-cream sm:text-2xl">
              {t('home.difference.calloutTitle')}
            </h3>
            <p className="mt-3 max-w-3xl text-cream/80">{t('home.difference.calloutBody')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
