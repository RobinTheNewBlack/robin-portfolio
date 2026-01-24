'use client';

import { Box, Container, Typography, Button, Avatar } from '@mui/material';
import { useTranslations } from 'next-intl';
import DownloadIcon from '@mui/icons-material/Download';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StatCard from '@/components/ui/StatCard';
import { stats } from '@/data/navigation';

export default function AboutSection() {
  const t = useTranslations('about');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      id="about"
      component="section"
      className="bg-about-gradient"
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 20 }} />
            {t('tagline')}
            <AutoAwesomeIcon sx={{ fontSize: 20 }} />
          </Typography>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
            gap: 6,
            alignItems: 'center',
          }}
        >
          {/* Left Content - Text */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4" color="primary.light">
              {t('greeting')}
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700 }}
            >
              {t('name')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.8,
                textAlign: 'justify',
              }}
            >
              {t('bio')}
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{ px: 3, py: 1.5 }}
              >
                {t('downloadCv')}
              </Button>
              <Button
                variant="outlined"
                startIcon={<CodeIcon />}
                onClick={() => scrollToSection('portfolio')}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(139, 92, 246, 0.1)',
                  },
                }}
              >
                {t('viewProjects')}
              </Button>
            </Box>
          </Box>

          {/* Right Content - Profile Image */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Avatar
              sx={{
                width: { xs: 250, md: 300 },
                height: { xs: 250, md: 300 },
                border: '4px solid',
                borderColor: 'rgba(139, 92, 246, 0.5)',
                bgcolor: 'background.paper',
                fontSize: '4rem',
              }}
            >
              EZR
            </Avatar>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 8,
          }}
        >
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              label={t(stat.labelKey.replace('about.', ''))}
              description={t(stat.descKey.replace('about.', ''))}
              icon={stat.icon}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
