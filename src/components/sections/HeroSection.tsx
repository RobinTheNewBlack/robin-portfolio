'use client';

import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { useTranslations } from 'next-intl';
import LaunchIcon from '@mui/icons-material/Launch';
import EmailIcon from '@mui/icons-material/Email';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TechBadges from '@/components/ui/TechBadges';
import SocialLinks from '@/components/ui/SocialLinks';

export default function HeroSection() {
  const t = useTranslations('hero');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      id="home"
      component="section"
      className="bg-about-gradient"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 4, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          {/* Left Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Badge */}
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
              label={t('badge')}
              sx={{
                alignSelf: 'flex-start',
                bgcolor: 'rgba(139, 92, 246, 0.2)',
                color: 'primary.light',
                fontWeight: 500,
                px: 1,
                '& .MuiChip-icon': {
                  color: 'primary.light',
                },
              }}
            />

            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {t('title')}
              <br />
              <Box component="span" sx={{ color: 'primary.main' }}>
                {t('titleHighlight')}
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              {t('subtitle')}
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500 }}
            >
              {t('description')}
            </Typography>

            {/* Tech Stack Badges */}
            <TechBadges />

            {/* CTA Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<LaunchIcon />}
                onClick={() => scrollToSection('portfolio')}
                sx={{
                  px: 4,
                  py: 1.5,
                }}
              >
                {t('projectsBtn')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                endIcon={<EmailIcon />}
                onClick={() => scrollToSection('contact')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(139, 92, 246, 0.1)',
                  },
                }}
              >
                {t('contactBtn')}
              </Button>
            </Box>

            {/* Social Links */}
            <SocialLinks />
          </Box>

          {/* Right Content - Illustration */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 500,
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Placeholder illustration using MUI components */}
              <Box
                sx={{
                  width: 350,
                  height: 250,
                  bgcolor: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: 4,
                  border: '2px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    bgcolor: 'rgba(6, 182, 212, 0.2)',
                    borderRadius: 2,
                    border: '2px solid rgba(6, 182, 212, 0.3)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 80,
                    height: 80,
                    bgcolor: 'rgba(139, 92, 246, 0.2)',
                    borderRadius: '50%',
                    border: '2px solid rgba(139, 92, 246, 0.3)',
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: 'primary.main',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                  }}
                >
                  {'</>'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
