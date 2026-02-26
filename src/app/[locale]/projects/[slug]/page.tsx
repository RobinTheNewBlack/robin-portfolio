import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { projects } from '@/data/projects';
import ProjectDetailClient from '@/components/sections/ProjectDetailClient';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const t = await getTranslations();

  // Resolve subtitle if exists
  const subtitle = project.subtitleKey && t.has(project.subtitleKey)
    ? t(project.subtitleKey)
    : undefined;

  // Resolve key features
  const keyFeatures: string[] = [];
  let i = 0;
  while (t.has(`${project.keyFeaturesKey}.${i}`)) {
    keyFeatures.push(t(`${project.keyFeaturesKey}.${i}`));
    i++;
  }

  // Resolve responsibilities
  const responsibilities: string[] = [];
  if (project.responsibilitiesKey) {
    let j = 0;
    while (t.has(`${project.responsibilitiesKey}.${j}`)) {
      responsibilities.push(t(`${project.responsibilitiesKey}.${j}`));
      j++;
    }
  }

  // Compute prev/next with circular wrap
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  return (
    <ProjectDetailClient
      project={{
        slug: project.slug,
        title: t(project.titleKey),
        subtitle,
        description: t(project.descriptionKey),
        images: project.images,
        technologies: project.technologies,
        keyFeatures,
        responsibilities,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        category: project.category,
      }}
      prevProject={{
        slug: projects[prevIndex].slug,
        title: t(projects[prevIndex].titleKey),
      }}
      nextProject={{
        slug: projects[nextIndex].slug,
        title: t(projects[nextIndex].titleKey),
      }}
    />
  );
}
