'use client';

import { Card, CardContent, CardMedia, Typography, Box, Chip, Link as MuiLink } from '@mui/material';
import { useTranslations } from 'next-intl';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Project } from '@/types';
import { Link } from '@/i18n/navigation';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'rgba(255,255,255,0.03)',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.05)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={project.images[0]}
        alt={t(project.titleKey)}
        sx={{
          height: 300,
          objectFit: 'contain',
          bgcolor: 'background.paper',
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {t(project.titleKey)}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {t(project.descriptionKey)}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {project.technologies.slice(0, 3).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'rgba(37, 99, 235, 0.2)',
                color: 'primary.light',
                fontSize: '0.75rem',
              }}
            />
          ))}
        </Box>
        <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
          {project.liveUrl && (
            <MuiLink
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'primary.light',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {t('projectSection.liveDemo')}
              <LaunchIcon sx={{ fontSize: 16 }} />
            </MuiLink>
          )}
          <Link
            href={`/projects/${project.slug}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#a1a1aa',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            {t('projectSection.details')}
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
