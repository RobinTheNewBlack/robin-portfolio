'use client';

import { Box, Container, Typography, Button, IconButton, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PublicIcon from '@mui/icons-material/Public';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { socialLinks, stats } from '@/data/navigation';

const MotionBox = motion.create(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const glassBento = {
  borderRadius: 3,
  bgcolor: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
  p: 3,
  height: '100%',
};

const statIconMap: Record<string, React.ReactNode> = {
  code: <CodeIcon sx={{ fontSize: 20, color: 'primary.light' }} />,
  certificate: <WorkspacePremiumIcon sx={{ fontSize: 20, color: 'primary.light' }} />,
  globe: <PublicIcon sx={{ fontSize: 20, color: 'primary.light' }} />,
};

const socialIconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  instagram: <InstagramIcon />,
};

export default function AboutSection() {
  const t = useTranslations('about');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const educationItems = t.raw('education.items') as Array<{
    degree: string;
    institution: string;
    year: string;
  }>;

  const statLabels: Record<string, { label: string }> = {
    projects: { label: t('stats.projects') },
    certificates: { label: t('stats.certificates') },
    experience: { label: t('stats.experience') },
  };

  return (
    <Box
      id="about"
      component="section"
      className="bg-about-gradient"
      sx={{ py: { xs: 8, md: 12 }, overflow: 'hidden' }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <Typography
            variant="h2"
            className="text-gradient-blue"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            {t('title')}
          </Typography>
        </MotionBox>

        {/* ── Bento Grid ── */}
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gridTemplateAreas: {
              xs: `
                "intro"
                "profile"
                "stats"
                "edu"
              `,
              sm: `
                "intro   profile"
                "stats   edu    "
              `,
              md: `
                "intro   intro   profile"
                "stats   edu     edu    "
              `,
            },
          }}
        >
          {/* ── Row 1 / Col 1-2 : Intro Card ── */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            sx={{ gridArea: 'intro' }}
          >
            <Box
              sx={{
                ...glassBento,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography
                variant="overline"
                color="primary.light"
                sx={{ letterSpacing: 2, fontWeight: 600 }}
              >
                {t('greeting')}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {t('name')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.85, textAlign: 'justify', flexGrow: 1, whiteSpace: 'pre-line' }}
              >
                {t('bio')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<LaunchIcon />}
                  onClick={() => window.open('/resume.pdf', '_blank')}
                  sx={{ px: 3, py: 1.2, fontWeight: 600 }}
                >
                  {t('downloadCv')}
                </Button>
              </Box>
            </Box>
          </MotionBox>

          {/* ── Row 1 / Col 3 : Profile Card ── */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            sx={{ gridArea: 'profile' }}
          >
            <Box
              sx={{
                ...glassBento,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: { xs: 340, md: 'auto' },
              }}
            >
              {/* Image + social icons overlay */}
              <Box
                sx={{
                  position: 'relative',
                  flexGrow: 1,
                  overflow: 'hidden',
                  borderRadius: 2,
                }}
              >
                {/* Full image */}
                <Box
                  component="img"
                  src="/images/my_image_1.png"
                  alt="Nattakit Kerdtalay"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                />

                {/* Bottom gradient fade */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(6,6,17,0.85) 0%, rgba(6,6,17,0.2) 45%, transparent 100%)',
                    borderRadius: 2,
                    pointerEvents: 'none',
                  }}
                />

                {/* Social icons — pinned over the image */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1.5,
                  }}
                >
                  {socialLinks.map((link) => (
                    <IconButton
                      key={link.id}
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        color: 'white',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: 'rgba(37,99,235,0.55)',
                          borderColor: 'primary.main',
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      {socialIconMap[link.platform]}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Box>
          </MotionBox>

          {/* ── Row 2 / Col 1 : Stats Card ── */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            sx={{ gridArea: 'stats' }}
          >
            <Box
              sx={{
                ...glassBento,
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
              }}
            >
              <Typography
                variant="h6"
                className="text-gradient-blue"
                sx={{ fontWeight: 700 }}
              >
                {t('stats.title')}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flexGrow: 1 }}>
                {stats.map((stat, i) => (
                  <Box key={stat.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                      <Box
                        sx={{
                          p: 1.25,
                          borderRadius: 2,
                          bgcolor: 'rgba(37, 99, 235, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {statIconMap[stat.icon]}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 0.25, fontSize: '0.9rem' }}
                        >
                          {statLabels[stat.id]?.label}
                        </Typography>
                        <Typography
                          variant="h5"
                          className="text-gradient-blue"
                          sx={{ fontWeight: 800, lineHeight: 1, mr: 5 }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                    </Box>
                    {i < stats.length - 1 && (
                      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </MotionBox>

          {/* ── Row 2 / Col 2-3 : Education Card ── */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            sx={{ gridArea: 'edu' }}
          >
            <Box
              sx={{
                ...glassBento,
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
              }}
            >
              <Typography
                variant="h6"
                className="text-gradient-blue"
                sx={{ fontWeight: 700 }}
              >
                {t('education.title')}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1 }}>
                {educationItems.map((edu, index) => (
                  <MotionBox
                    key={index}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'center',
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        p: 0.75,
                        borderRadius: 1.5,
                        bgcolor: 'rgba(37, 99, 235, 0.12)',
                        display: 'flex',
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    >
                      <SchoolIcon sx={{ color: 'primary.light', fontSize: 18 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.35 }}
                      >
                        {edu.degree}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="primary.main"
                        sx={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', mt: 0.5 }}
                      >
                        {edu.institution}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1.5,
                        bgcolor: 'rgba(37, 99, 235, 0.12)',
                        color: 'primary.light',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        alignSelf: 'center',
                      }}
                    >
                      {edu.year}
                    </Typography>
                  </MotionBox>
                ))}
              </Box>
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
