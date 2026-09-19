import { useTranslation } from 'react-i18next';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/ContactForm';
import PageMeta from '@/components/PageMeta';

export default function Partnership() {
  const { t } = useTranslation();
  const items = t('partnership.response.items', { returnObjects: true }) as {
    title: string;
    body: string;
    tag: string;
  }[];

  return (
    <>
      <PageMeta titleKey="partnership.hero.title" />
      <PageHero
        eyebrow={t('partnership.hero.eyebrow')}
        title={t('partnership.hero.title')}
        subtitle={t('partnership.hero.subtitle')}
      />

      <section className="section">
        <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{t('partnership.response.eyebrow')}</p>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{t('partnership.response.title')}</h2>

        <div className="mt-10 grid gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 border-l-4 border-gold py-2 pl-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-1 text-ink/80">{item.body}</p>
              </div>
              <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-cream border border-gold/50 px-4 py-1.5 text-xs font-semibold text-navy">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F1E9D8]">
        <div className="section">
          <p className="eyebrow mb-3 text-sm uppercase tracking-widest sm:text-base">{t('partnership.structure.eyebrow')}</p>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{t('partnership.structure.title')}</h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/80 sm:text-lg">
            {t('partnership.structure.body')}
          </p>

          <div className="mt-10 rounded-2xl border border-gold bg-[#EDE2C8] p-8 sm:p-10">
            <h3 className="text-lg font-semibold text-navy sm:text-xl">{t('partnership.structure.exclusivityTitle')}</h3>
            <p className="mt-3 max-w-3xl text-ink/80">{t('partnership.structure.exclusivityBody')}</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gold to-gold-light">
        <div className="mx-auto max-w-content px-6 py-16 text-center sm:py-20 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">{t('partnership.ctaBand.title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy/80">{t('partnership.ctaBand.body')}</p>
        </div>
      </section>

      <section id="contact" className="section scroll-mt-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{t('contact.title')}</h2>
          <p className="mt-3 text-ink/70">{t('contact.subtitle')}</p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
