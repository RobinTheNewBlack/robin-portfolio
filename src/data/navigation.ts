import { NavLink, SocialLink, StatItem } from '@/types';

export const navLinks: NavLink[] = [
  { id: 'home', labelKey: 'nav.home', href: '#home' },
  { id: 'about', labelKey: 'nav.about', href: '#about' },
  { id: 'techStack', labelKey: 'nav.techStack', href: '#techstack' },
  { id: 'experience', labelKey: 'nav.experience', href: '#experience' },
  { id: 'projects', labelKey: 'nav.projects', href: '#projects' },
  { id: 'certificates', labelKey: 'nav.certificates', href: '#certificates' },
  { id: 'contact', labelKey: 'nav.contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    platform: 'github',
    url: 'https://github.com/RobinTheNewBlack',
    ariaLabel: 'GitHub Profile',
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/nattakit-k',
    ariaLabel: 'LinkedIn Profile',
  },
  {
    id: 'instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/mxnattha?igsh=MWVsMG4xZG8ycHMzYg%3D%3D&utm_source=qr',
    ariaLabel: 'Instagram Profile',
  },
];

export const stats: StatItem[] = [
  {
    id: 'projects',
    value: 10,
    labelKey: 'about.stats.projects',
    descKey: 'about.stats.projectsDesc',
    icon: 'code',
  },
  {
    id: 'certificates',
    value: 20,
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
