import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/i18n';
import { useUIStore } from '@/store/useUIStore';

interface LanguageSwitcherProps {
  tone?: 'light' | 'dark';
}

export default function LanguageSwitcher({ tone = 'light' }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const setActiveLanguage = useUIStore((state) => state.setActiveLanguage);

  const textColor = tone === 'dark' ? 'text-cream' : 'text-navy';

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${textColor}`} role="group" aria-label="Language">
      {supportedLanguages.map((lng, index) => (
        <span key={lng} className="flex items-center gap-1">
          {index > 0 && <span className="opacity-40">/</span>}
          <button
            type="button"
            onClick={() => {
              void i18n.changeLanguage(lng);
              setActiveLanguage(lng);
            }}
            aria-current={i18n.resolvedLanguage === lng}
            className={`rounded px-1 transition-opacity hover:opacity-100 ${
              i18n.resolvedLanguage === lng ? 'opacity-100 underline underline-offset-4' : 'opacity-50'
            }`}
          >
            {t(`language.${lng}`)}
          </button>
        </span>
      ))}
    </div>
  );
}
