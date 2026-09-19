export interface RouteDef {
  path: string;
  labelKey: string;
}

export const routes: RouteDef[] = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/qui-sommes-nous', labelKey: 'nav.about' },
  { path: '/notre-technologie', labelKey: 'nav.technology' },
  { path: '/le-concept', labelKey: 'nav.concept' },
  { path: '/comment-ca-marche', labelKey: 'nav.howItWorks' },
  { path: '/partenariat', labelKey: 'nav.partnership' }
];
