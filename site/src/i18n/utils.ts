/**
 * i18n utility functions
 */
import { translations, type Locale, defaultLocale } from './translations';

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] ?? translations[defaultLocale];
}

/**
 * Get the locale prefix for a given locale.
 * Returns '' for 'en', '/zh-HK' for 'zh-HK', etc.
 */
export function getLocalePrefix(locale: Locale): string {
  if (locale === 'en') return '';
  return `/${locale}`;
}

/**
 * Given the current URL path and a target locale, return the localized path.
 * e.g. currentPath '/ai-workers' + locale 'zh-HK' => '/zh-HK/ai-workers'
 * e.g. currentPath '/zh-HK/ai-workers' + locale 'en' => '/ai-workers'
 */
export function getLocalizedPath(currentPath: string, targetLocale: Locale): string {
  // Strip any existing locale prefix
  let pathWithoutLocale = currentPath;
  for (const loc of ['zh-HK', 'zh-CN'] as const) {
    if (pathWithoutLocale.startsWith(`/${loc}`)) {
      pathWithoutLocale = pathWithoutLocale.slice(loc.length + 1) || '/';
      break;
    }
  }
  // Ensure leading slash
  if (!pathWithoutLocale.startsWith('/')) {
    pathWithoutLocale = '/' + pathWithoutLocale;
  }
  return getLocalePrefix(targetLocale) + pathWithoutLocale;
}
