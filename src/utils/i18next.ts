import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getAuthIdiom } from "./auth";
import en from "./idiom/en.json";
import es from "./idiom/es.json";

let payload = null;

payload = getAuthIdiom();

let userIdiom: any = "";
let lng: any = "";
let fallbackLng: any = "";

userIdiom = payload;

lng =
  userIdiom === null || userIdiom === undefined
    ? navigator.language
    : userIdiom;

fallbackLng = userIdiom === null || userIdiom === undefined ? lng : userIdiom;

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: fallbackLng,
  lng: lng,
  keySeparator: false,
  detection: {
    checkWhitelist: true,
  },

  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
