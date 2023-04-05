import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import moment from 'moment';

const urlSubDirectory = process.env.REACT_APP_DASHBOARD_URL_SUBDIRECTORY;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      // http backend options
      loadPath: urlSubDirectory+'/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    initImmediate: false,
    useSuspense: true,
    debug: true,
    interpolation: {
      escapeValue: false,
      format(value, format) {
        if (value instanceof Date) {
          return moment(value).format(format);
        }
        if (typeof value === 'number') {
          return new Intl.NumberFormat().format(value);
        }
        return typeof value;
      }
    }
  });

export default i18n;