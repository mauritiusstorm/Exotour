import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from '@/routes';
import { useUIStore } from '@/store/useUIStore';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <NavLink to="/" onClick={closeMobileMenu} className="shrink-0">
          <Logo className="text-xl" />
        </NavLink>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navigation principale">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              end={route.path === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap text-sm font-medium transition-colors hover:text-gold ${
                  isActive ? 'text-navy underline decoration-gold decoration-2 underline-offset-8' : 'text-ink/80'
                }`
              }
            >
              {t(route.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <LanguageSwitcher />
          <Button as="link" to="/partenariat#contact" variant="primary">
            {t('nav.cta')}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy xl:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Menu"
          onClick={toggleMobileMenu}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="border-t border-navy/10 bg-cream px-6 pb-6 pt-2 xl:hidden">
          <nav className="flex flex-col gap-4" aria-label="Navigation mobile">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                end={route.path === '/'}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `text-base font-medium ${isActive ? 'text-navy' : 'text-ink/80'}`
                }
              >
                {t(route.labelKey)}
              </NavLink>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between">
            <LanguageSwitcher />
            <Button as="link" to="/partenariat#contact" variant="primary" onClick={closeMobileMenu}>
              {t('nav.cta')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
