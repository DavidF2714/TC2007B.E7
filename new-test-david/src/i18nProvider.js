import { spanishMessages } from "./spanishMessages";
import polyglotI18nProvider from 'ra-i18n-polyglot';

export const i18nProvider = polyglotI18nProvider(
    locale => spanishMessages, "es" // Default locale
);