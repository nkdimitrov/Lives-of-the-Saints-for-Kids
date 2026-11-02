import en from '../i18n/en.json' with { type: 'json' };

export const LANGS = { en };
export const DEFAULT_LANG = 'en';

/** Translate a UI string key. Falls back to English, then to the key itself. */
export function t(key, lang = DEFAULT_LANG) {
  return (LANGS[lang] && LANGS[lang][key]) ?? en[key] ?? key;
}
