export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  detailsUrl?: string;
  featured: boolean;
}

export interface Certificate {
  id: string;
  titleKey: string;
  issuerKey: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface NavLink {
  id: string;
  labelKey: string;
  href: string;
}

export interface SocialLink {
  id: string;
  platform: 'github' | 'linkedin' | 'instagram';
  url: string;
  ariaLabel: string;
}

export interface StatItem {
  id: string;
  value: number;
  labelKey: string;
  descKey: string;
  icon: string;
}
