'use client';

import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LaunchIcon from '@mui/icons-material/Launch';
import EmailIcon from '@mui/icons-material/Email';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TechBadges from '@/components/ui/TechBadges';
import SocialLinks from '@/components/ui/SocialLinks';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionChip = motion.create(Chip);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

const illustrationVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const,
      delay: 0.5,
    },
  },
};

export default function IntroSection() {
  const t = useTranslations('intro');

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
        overflow: 'hidden',
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
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {/* Badge */}
            <MotionChip
              variants={itemVariants}
              icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
              label={t('badge')}
              sx={{
                alignSelf: 'flex-start',
                bgcolor: 'rgba(37, 99, 235, 0.2)',
                color: 'primary.light',
                fontWeight: 500,
                px: 1,
                '& .MuiChip-icon': {
                  color: 'primary.light',
                },
              }}
            />

            {/* Title */}
            <MotionTypography
              variants={itemVariants}
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {t('title')}
              <br />
              <Box component="span" className="text-gradient-blue">
                {t('titleHighlight')}
              </Box>
            </MotionTypography>

            {/* Subtitle */}
            <MotionTypography
              variants={itemVariants}
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              {t('subtitle')}
            </MotionTypography>

            {/* Description */}
            <MotionTypography
              variants={itemVariants}
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500 }}
            >
              {t('description')}
            </MotionTypography>

            {/* Tech Stack Badges */}
            <MotionBox variants={itemVariants}>
              <TechBadges />
            </MotionBox>

            {/* CTA Buttons */}
            <MotionBox variants={itemVariants} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                    bgcolor: 'rgba(37, 99, 235, 0.1)',
                  },
                }}
              >
                {t('contactBtn')}
              </Button>
            </MotionBox>

            {/* Social Links */}
            <MotionBox variants={itemVariants}>
              <SocialLinks />
            </MotionBox>
          </MotionBox>

          {/* Right Content - Illustration */}
          <MotionBox
            variants={illustrationVariants}
            initial="hidden"
            animate="visible"
            sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'center' }}
          >
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
              {/* Glassmorphism illustration */}
              <Box
                sx={{
                  width: 350,
                  height: 250,
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
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
                    bgcolor: 'rgba(6, 182, 212, 0.08)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 2,
                    border: '1px solid rgba(6, 182, 212, 0.15)',
                    boxShadow: '0 4px 24px rgba(6, 182, 212, 0.1)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 80,
                    height: 80,
                    bgcolor: 'rgba(37, 99, 235, 0.08)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '50%',
                    border: '1px solid rgba(37, 99, 235, 0.15)',
                    boxShadow: '0 4px 24px rgba(37, 99, 235, 0.1)',
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
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
