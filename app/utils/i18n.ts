// src/utils/i18n.js or i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../locales/en.json';
import hiTranslation from '../locales/hi.json';

i18n
  .use(LanguageDetector) // Automatically detect user's language
  .use(initReactI18next)  // Pass the i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
    },
    fallbackLng: 'en', // Default language
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
