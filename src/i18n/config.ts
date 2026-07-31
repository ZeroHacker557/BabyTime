import uz from './dictionaries/uz.json';
import ru from './dictionaries/ru.json';
import en from './dictionaries/en.json';

export const locales = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'uz';

/** Shown in the language switcher. */
export const localeNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: 'Русский',
  en: 'English',
};

export const localeShortNames: Record<Locale, string> = {
  uz: 'UZ',
  ru: 'RU',
  en: 'EN',
};

/** `hreflang` values — note uz-Latn, since we ship the Latin script. */
export const hreflangs: Record<Locale, string> = {
  uz: 'uz-Latn-UZ',
  ru: 'ru-UZ',
  en: 'en',
};

const dictionaries = { uz, ru, en } as const;

/** The UZ dictionary is the contract: RU and EN must match its shape. */
export type Dictionary = typeof uz;

export function getDictionary(locale: string): Dictionary {
  return (dictionaries[locale as Locale] ?? dictionaries[defaultLocale]) as Dictionary;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
