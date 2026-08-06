// src/app/providers/I18nProvider.tsx
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import type { ReactNode } from "react";
import en from "../../locales/en/translation.json";
import az from "../../locales/az/translation.json";
import ru from "../../locales/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, az: { translation: az }, ru: { translation: ru } },
  lng: localStorage.getItem("vms-lang") ?? "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export function changeLanguage(lang: "en" | "az" | "ru") {
  i18n.changeLanguage(lang);
  localStorage.setItem("vms-lang", lang);
}