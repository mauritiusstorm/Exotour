import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import PageMeta from '@/components/PageMeta';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta titleKey="notFound.title" />
      <div className="section flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-semibold">{t('notFound.title')}</h1>
        <p className="mt-4 max-w-md text-ink/70">{t('notFound.body')}</p>
        <div className="mt-8">
          <Button as="link" to="/" variant="secondary">
            {t('notFound.cta')}
          </Button>
        </div>
      </div>
    </>
  );
}
