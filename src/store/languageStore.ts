import { atom } from 'nanostores';
export type Language = 'en' | 'es';
export const language = atom<Language>('es');
export function toggleLanguage() {
  const current = language.get();
  language.set(current === 'es' ? 'en' : 'es');
}