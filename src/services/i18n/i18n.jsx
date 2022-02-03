/* istanbul ignore next */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import moment from 'moment';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    initImmediate: false,
    useSuspense: true,
    debug: true,
    interpolation: {
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
