import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import deCommon from './locales/de/common.json';
import enCommon from './locales/en/common.json';

const resources = {
    en: { common: enCommon },
    de: { common: deCommon },
};

const i18nInitPromise = i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['de', 'en'],
        resources,
        returnEmptyString: false,
        debug: false,
        fallbackLng: 'en',
        fallbackNS: 'common',
    });

export { i18nInitPromise };
export default i18next;
