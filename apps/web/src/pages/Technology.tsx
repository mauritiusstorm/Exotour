import { useTranslation } from 'react-i18next';
import PageHero from '@/components/ui/PageHero';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import PageMeta from '@/components/PageMeta';

export default function Technology() {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta titleKey="technology.hero.title" />
      <PageHero
        eyebrow={t('technology.hero.eyebrow')}
        title={t('technology.hero.title')}
        subtitle={t('technology.hero.subtitle')}
      />

      <section className="section">
        <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{t('technology.how.eyebrow')}</p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{t('technology.how.title')}</h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <PhotoPlaceholder alt={t('technology.imageAlt')} className="h-80 w-full rounded-2xl sm:h-96" />

          <div className="grid gap-8">
            <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{t('technology.how.body')}</p>

            <div>
              <h3 className="text-xl font-semibold text-navy">{t('technology.changesTitle')}</h3>
              <p className="mt-3 text-ink/80">{t('technology.changesBody')}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-navy">{t('technology.notReplaceTitle')}</h3>
            <p className="mt-3 text-ink/80">{t('technology.notReplaceBody')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-navy">{t('technology.supervisionTitle')}</h3>
            <p className="mt-3 text-ink/80">{t('technology.supervisionBody')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
