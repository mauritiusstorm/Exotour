import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from '@/locales/fr/translation.json';
import en from '@/locales/en/translation.json';

export const supportedLanguages = ['fr', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en }
    },
    fallbackLng: 'fr',
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false
    },
    // French is the default language regardless of browser locale, per spec.
    // Only an explicit choice via the language switcher (persisted below)
    // should ever move the site to English.
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'exotour-language'
    }
  });

export default i18n;
