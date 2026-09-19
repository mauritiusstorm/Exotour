import { create } from 'zustand';
import type { SupportedLanguage } from '@/i18n';

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UIState {
  activeLanguage: SupportedLanguage;
  setActiveLanguage: (language: SupportedLanguage) => void;

  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  contactFormStatus: ContactFormStatus;
  setContactFormStatus: (status: ContactFormStatus) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeLanguage: 'fr',
  setActiveLanguage: (language) => set({ activeLanguage: language }),

  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  contactFormStatus: 'idle',
  setContactFormStatus: (status) => set({ contactFormStatus: status })
}));
