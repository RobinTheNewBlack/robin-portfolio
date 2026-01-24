'use client';

import { Box, Container, Typography, Button, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import DownloadIcon from '@mui/icons-material/Download';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StatCard from '@/components/ui/StatCard';
import { stats } from '@/data/navigation';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionAvatar = motion.create(Avatar);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

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
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          sx={{ textAlign: 'center', mb: 8 }}
        >
          <Typography
            variant="h2"
            className="text-gradient-blue"
            sx={{
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
        </MotionBox>

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
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <MotionTypography variants={fadeInLeft} variant="h4" color="primary.light">
              {t('greeting')}
            </MotionTypography>
            <MotionTypography
              variants={fadeInLeft}
              variant="h3"
              sx={{ fontWeight: 700 }}
            >
              {t('name')}
            </MotionTypography>
            <MotionTypography
              variants={fadeInLeft}
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.8,
                textAlign: 'justify',
              }}
            >
              {t('bio')}
            </MotionTypography>

            {/* Buttons */}
            <MotionBox variants={fadeInLeft} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
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
                    bgcolor: 'rgba(37, 99, 235, 0.1)',
                  },
                }}
              >
                {t('viewProjects')}
              </Button>
            </MotionBox>
          </MotionBox>

          {/* Right Content - Profile Image */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <MotionAvatar
              src="/images/my_image_1.png"
              alt="Nattakit Kerdtalay"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              sx={{
                width: { xs: 250, md: 300 },
                height: { xs: 250, md: 300 },
                border: '4px solid',
                borderColor: 'rgba(37, 99, 235, 0.5)',
                bgcolor: 'background.paper',
              }}
            />
          </MotionBox>
        </Box>

        {/* Stats Cards */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 8,
          }}
        >
          {stats.map((stat, index) => (
            <MotionBox
              key={stat.id}
              variants={scaleIn}
              custom={index}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <StatCard
                value={stat.value}
                label={t(stat.labelKey.replace('about.', ''))}
                description={t(stat.descKey.replace('about.', ''))}
                icon={stat.icon}
              />
            </MotionBox>
          ))}
        </MotionBox>
      </Container>
    </Box>
  );
}
