'use client';

import { Card, CardContent, CardMedia, Typography, Box, Chip, Link } from '@mui/material';
import { useTranslations } from 'next-intl';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations();
  const tPortfolio = useTranslations('portfolio');

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
        component="div"
        sx={{
          height: 200,
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {t(project.titleKey)}
        </Typography>
      </CardMedia>
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
                bgcolor: 'rgba(139, 92, 246, 0.2)',
                color: 'primary.light',
                fontSize: '0.75rem',
              }}
            />
          ))}
        </Box>
        <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
          {project.liveUrl && (
            <Link
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
              {tPortfolio('liveDemo')}
              <LaunchIcon sx={{ fontSize: 16 }} />
            </Link>
          )}
          {project.detailsUrl && (
            <Link
              href={project.detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'text.primary' },
              }}
            >
              {tPortfolio('details')}
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
