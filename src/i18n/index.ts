import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import th from "./locales/th";
import zh from "./locales/zh";
import ja from "./locales/ja";

const supportedLangs = ["en", "th", "zh", "ja"] as const;
type SupportedLang = (typeof supportedLangs)[number];
const storedLang = localStorage.getItem("lang");
const savedLang: SupportedLang = supportedLangs.includes(storedLang as SupportedLang)
  ? (storedLang as SupportedLang)
  : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    th: { translation: th },
    zh: { translation: zh },
    ja: { translation: ja },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
