import { NavLink, SocialLink, StatItem } from '@/types';

export const navLinks: NavLink[] = [
  { id: 'home', labelKey: 'nav.home', href: '#home' },
  { id: 'about', labelKey: 'nav.about', href: '#about' },
  { id: 'portfolio', labelKey: 'nav.portfolio', href: '#portfolio' },
  { id: 'contact', labelKey: 'nav.contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    platform: 'github',
    url: 'https://github.com',
    ariaLabel: 'GitHub Profile',
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    url: 'https://linkedin.com',
    ariaLabel: 'LinkedIn Profile',
  },
  {
    id: 'instagram',
    platform: 'instagram',
    url: 'https://instagram.com',
    ariaLabel: 'Instagram Profile',
  },
];

export const stats: StatItem[] = [
  {
    id: 'projects',
    value: 11,
    labelKey: 'about.stats.projects',
    descKey: 'about.stats.projectsDesc',
    icon: 'code',
  },
  {
    id: 'certificates',
    value: 7,
    labelKey: 'about.stats.certificates',
    descKey: 'about.stats.certificatesDesc',
    icon: 'certificate',
  },
  {
    id: 'experience',
    value: 3,
    labelKey: 'about.stats.experience',
    descKey: 'about.stats.experienceDesc',
    icon: 'globe',
  },
];
