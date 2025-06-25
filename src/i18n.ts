import { usePreferredLanguages, useStorage } from '@vueuse/core';
import type { WritableComputedRef } from 'vue';
import { createI18n } from 'vue-i18n';

const languages = usePreferredLanguages()

export const langs = {
  en : "English",//English
  fr : "Français",//French
  de : "Deutsch",//German
  // es : "Español",//Spanish
  it : "Italiano",//Italian
  eo : "Esperanto",//Esperanto
  // pt : "Português",//Portugues
  // el : "Eλληνικά",//Greek
  // sv : "Svenska",//Swedish
} as const;

export const langsKey = Object.keys(langs);

export type LangType = typeof langs;

export type LangLabel = LangType[keyof LangType];

export type Lang = keyof LangType;

const localLang = usePreferredLanguages().value[0];
const computedLocalLang = (localLang?.split("-")[0] || "en") as Lang;

export const i18n = createI18n({
  legacy: false,
  locale: computedLocalLang,
  fallbackLocale: "en"
});


export const currentLang = useStorage<Lang>("lang", i18n.global.locale as WritableComputedRef<Lang>);
// Fix falsy value in storage
if (!langsKey.includes(currentLang.value)) currentLang.value = "en";
const [_,l] = window.location.pathname.split("/");
if (langsKey.includes(l)) currentLang.value = l as Lang;
