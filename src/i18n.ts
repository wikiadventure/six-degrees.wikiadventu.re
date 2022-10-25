import { usePreferredLanguages } from '@vueuse/core';
import { computed } from 'vue';
import { createI18n } from 'vue-i18n';

const languages = usePreferredLanguages()

export const langs = {
  en : "English",//English
  fr : "Français",//French
  de : "Deutsch",//German
  es : "Español",//Spanish
  it : "Italiano",//Italian
  eo : "Esperanto",//Esperanto
  pt : "Português",//Portugues
  el : "Eλληνικά",//Greek
  sv : "Svenska",//Swedish
} as const;

export const langsKey = Object.keys(langs);

export type LangType = typeof langs;

export type LangLabel = LangType[keyof LangType];

export type Lang = keyof LangType;

const localLang = usePreferredLanguages().value[0];
var computedLocalLang = (localLang?.split("-")[0] || "en") as Lang;
if (!langsKey.includes(computedLocalLang)) computedLocalLang = "en";

export const i18n = createI18n({
  legacy: false,
  locale: computedLocalLang,
  fallbackLocale: "en"
});
  
export const currentLang = i18n.global.locale;
