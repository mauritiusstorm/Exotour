import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from '@/routes';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between lg:px-8">
        <div>
          <p className="font-serif text-2xl font-semibold">
            <span className="text-navy">Exo</span>
            <span className="text-gold">tour</span>
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3" aria-label="Navigation secondaire">
          {routes.map((route) => (
            <NavLink key={route.path} to={route.path} end={route.path === '/'} className="text-sm text-ink/70 hover:text-navy">
              {t(route.labelKey)}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-navy/10">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-6 text-xs text-ink/60 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>{t('footer.tagline')}</p>
          <p>{t('footer.credit')}</p>
        </div>
      </div>
    </footer>
  );
}
