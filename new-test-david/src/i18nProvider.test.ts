import { i18nProvider } from "./i18nProvider";

describe('i18nProvider', () => {
  it('should translate to Spanish correctly', () => {
    // Cambiar el idioma a español
    i18nProvider.changeLocale('es');

    // Probar algunas palabras
    expect(i18nProvider.translate('ra.page.dashboard')).toBe('Panel');
    expect(i18nProvider.translate('ra.action.create')).toBe('Crear');
    expect(i18nProvider.translate('ra.page.show', { name: 'Usuario', recordRepresentation: '123' })).toBe(
      'Usuario 123'
    );
  });
});
