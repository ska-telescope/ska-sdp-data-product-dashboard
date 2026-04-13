import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import Backend from 'i18next-http-backend';
import moment from 'moment';


const constructLoadPath = (lng, ns) => {
  if(ns[0] === 'humanreadable'){
    let humanreadable = SKA_DATAPRODUCT_API_URL + '/{{lng}}/{{ns}}';
    return humanreadable;
  } else {
    return './locales/{{lng}}/{{ns}}.json';
  }
}


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: constructLoadPath,
    },
    fallbackLng: 'en',
    lng: 'en',
    ns: ['dpd', 'ivoa', 'login', 'authentication', 'humanreadable'],
    defaultNS: 'dpd',
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