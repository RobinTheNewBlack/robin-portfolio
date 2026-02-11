import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { projects } from '@/data/projects';
import { Box, Typography, Chip, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations();
  const tDetail = await getTranslations('projectDetail');

  const keyFeatures: string[] = [];
  let i = 0;
  while (true) {
    try {
      const feature = t(`${project.keyFeaturesKey}.${i}`);
      if (!feature || feature === `${project.keyFeaturesKey}.${i}`) break;
      keyFeatures.push(feature);
      i++;
    } catch {
      break;
    }
  }

  const projectTitle = t(project.titleKey);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(6,6,17,0.95) 0%, rgba(10,22,40,0.9) 50%, rgba(6,6,17,0.95) 100%)',
        pt: { xs: 10, md: 12 },
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 6,
          }}
        >
          <Link
            href="/#projects"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#a1a1aa',
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            {tDetail('back')}
          </Link>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {tDetail('projects')}
          </Typography>
          <NavigateNextIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {projectTitle}
          </Typography>
        </Box>

        {/* Hero Section - Two columns */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            mb: 6,
          }}
        >
          {/* Left: Title + Description */}
          <Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.75rem', lg: '3.25rem' },
                lineHeight: 1.15,
                mb: 2,
                color: 'text.primary',
              }}
            >
              {projectTitle}
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #ef4444, #f97316)',
                mb: 4,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
              }}
            >
              {t(project.descriptionKey)}
            </Typography>
          </Box>

          {/* Right: Project Image */}
          <Box
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <Box
              component="img"
              src={project.image}
              alt={projectTitle}
              sx={{
                width: '100%',
                height: { xs: 250, md: 350 },
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        </Box>

        {/* Stats + Action Buttons Row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 4,
          }}
        >
          {/* Total Technologies stat card */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 2,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <CodeIcon sx={{ color: 'primary.light', fontSize: 28 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {project.technologies.length}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {tDetail('totalTechnologies')}
              </Typography>
            </Box>
          </Box>

          {/* Key Features count stat card */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 2,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <AutoAwesomeIcon sx={{ color: '#f97316', fontSize: 28 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {keyFeatures.length}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {tDetail('keyFeaturesCount')}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
          {project.liveUrl && (
            <Box
              component="a"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'text.primary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(37,99,235,0.4)',
                },
              }}
            >
              <LaunchIcon sx={{ fontSize: 18 }} />
              {tDetail('liveDemo')}
            </Box>
          )}
          {project.githubUrl && (
            <Box
              component="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'text.primary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(37,99,235,0.4)',
                },
              }}
            >
              <GitHubIcon sx={{ fontSize: 18 }} />
              {tDetail('github')}
            </Box>
          )}
        </Box>

        {/* Bottom Section: Technologies + Key Features */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Technologies Used */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <CodeIcon sx={{ color: 'primary.light', fontSize: 22 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {tDetail('technologiesUsed')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {project.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  icon={<CodeIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: 'rgba(37, 99, 235, 0.15)',
                    color: 'primary.light',
                    border: '1px solid rgba(37, 99, 235, 0.3)',
                    fontSize: '0.85rem',
                    py: 2.5,
                    px: 0.5,
                    '& .MuiChip-icon': {
                      color: 'primary.light',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Key Features */}
          <Box
            sx={{
              borderRadius: 3,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              p: { xs: 3, md: 4 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <AutoAwesomeIcon sx={{ color: '#f97316', fontSize: 22 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {tDetail('keyFeatures')}
              </Typography>
            </Box>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {keyFeatures.map((feature, index) => (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    transition: 'background 0.2s',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.03)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#f97316',
                      flexShrink: 0,
                      mt: 0.8,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
