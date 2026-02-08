'use client';

import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTranslations } from 'next-intl';
import { socialLinks } from '@/data/navigation';

const MotionBox = motion.create(Box);

const iconMap: { [key: string]: React.ReactNode } = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  instagram: <InstagramIcon />,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function ContactSection() {
  const t = useTranslations('contactSection');
  return (
    <Box
      id="contact"
      component="section"
      className="bg-about-gradient"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="h2"
            component="h2"
            className="text-gradient-blue"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: 560,
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              lineHeight: 1.7,
            }}
          >
            {t('subtitle')}
          </Typography>
        </MotionBox>

        {/* Content Grid */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          {/* Left - Contact Info Card */}
          <MotionBox
            variants={cardVariants}
            sx={{
              p: { xs: 3, md: 4 },
              bgcolor: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(37, 99, 235, 0.3)',
                bgcolor: 'rgba(255,255,255,0.06)',
                boxShadow: '0 8px 32px rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              {t('cardTitle')}
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', lineHeight: 1.7 }}
            >
              {t('cardDescription')}
            </Typography>

            {/* Email */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: 'rgba(37, 99, 235, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <EmailIcon sx={{ color: 'primary.light', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
                >
                  {t('emailLabel')}
                </Typography>
                <Typography
                  component="a"
                  href="mailto:example@email.com"
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': { color: 'primary.light' },
                    transition: 'color 0.2s',
                  }}
                >
                  example@email.com
                </Typography>
              </Box>
            </Box>

            {/* Location */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: 'rgba(37, 99, 235, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <LocationOnIcon sx={{ color: 'primary.light', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
                >
                  {t('locationLabel')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.primary', fontWeight: 500 }}
                >
                  {t('locationValue')}
                </Typography>
              </Box>
            </Box>

            {/* Social Links */}
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 1.5, fontSize: '0.8rem' }}
              >
                {t('findMeOn')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {socialLinks.map((link) => (
                  <IconButton
                    key={link.id}
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    sx={{
                      color: 'text.secondary',
                      border: '1px solid rgba(255,255,255,0.1)',
                      width: 44,
                      height: 44,
                      '&:hover': {
                        color: 'primary.main',
                        borderColor: 'primary.main',
                        bgcolor: 'rgba(37, 99, 235, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {iconMap[link.platform]}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </MotionBox>

          {/* Right - CTA Card */}
          <MotionBox
            variants={cardVariants}
            sx={{
              p: { xs: 3, md: 4 },
              background:
                'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(8, 145, 178, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(37, 99, 235, 0.15)',
              borderRadius: 4,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: 3,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(37, 99, 235, 0.4)',
                boxShadow: '0 8px 40px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'radial-gradient(circle at 30% 20%, rgba(37, 99, 235, 0.06) 0%, transparent 60%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'rgba(37, 99, 235, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <EmailIcon sx={{ color: 'primary.light', fontSize: 30 }} />
            </Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: 'text.primary', position: 'relative' }}
            >
              {t('ctaTitle')}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.7,
                maxWidth: 320,
                position: 'relative',
              }}
            >
              {t('ctaDescription')}
            </Typography>

            <Button
              component="a"
              href="mailto:example@email.com"
              variant="contained"
              size="large"
              endIcon={<ArrowOutwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 50,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                bgcolor: 'primary.main',
                position: 'relative',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('sendEmail')}
            </Button>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
