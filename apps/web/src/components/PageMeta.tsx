import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface PageMetaProps {
  titleKey: string;
}

export default function PageMeta({ titleKey }: PageMetaProps) {
  const { t, i18n } = useTranslation();
  const pageTitle = t(titleKey);

  useEffect(() => {
    document.title = `${pageTitle} — Exotour`;
  }, [pageTitle]);

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? 'fr';
  }, [i18n.resolvedLanguage]);

  return null;
}
