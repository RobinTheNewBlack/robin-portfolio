export type ProjectCategory = 'internal' | 'freelance' | 'side';

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  detailsUrl?: string;
  featured: boolean;
  category: ProjectCategory;
}

export type CertificateCategory = 'programming' | 'ai' | 'computerFundamental' | 'devops' | 'mathematics';

export interface Certificate {
  id: string;
  titleKey: string;
  issuerKey: string;
  date: string;
  image: string;
  credentialUrl?: string;
  category: CertificateCategory;
}

export type TechStackCategory =
  | 'programming'
  | 'backend'
  | 'frontend'
  | 'database'
  | 'cloudDevops'
  | 'ai'
  | 'dataScience'
  | 'testing'
  | 'tools';

export interface TechStackItem {
  id: string;
  name: string;
  icon: string;
  category: TechStackCategory;
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

export interface ExperienceProject {
  topic: string;
  bullets: string[];
}

export interface Experience {
  id: string;
  positionKey: string;
  companyKey: string;
  yearKey: string;
  responsibilityKey: string;
  projectsKey: string;
  logo?: string;
}
