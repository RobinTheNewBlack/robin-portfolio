'use client';

import { useState } from 'react';
import { Box, Container, Typography, Button, IconButton, TextField, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SendIcon from '@mui/icons-material/Send';
import { useTranslations } from 'next-intl';
import { socialLinks } from '@/data/navigation';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

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

export default function ContactSection() {
  const t = useTranslations('contactSection');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
    }
  };

  const inputStyles = {
    mb: 2,
    '& .MuiInput-underline:before': {
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'rgba(255, 255, 255, 0.5) !important',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'primary.main',
    },
    '& .MuiInputBase-input': {
      color: 'text.primary',
      pb: 1.5,
      fontSize: '0.95rem',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'text.secondary',
      opacity: 0.7,
    },
  };

  return (
    <Box
      id="contact"
      component="section"
      className="bg-about-gradient"
      sx={{ py: { xs: 8, md: 15 }, position: 'relative', overflow: 'hidden' }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: { xs: 8, md: 12 },
          }}
        >
          {/* Left Side */}
          <MotionBox
            variants={fadeInUp}
            sx={{
              flex: 1,
              maxWidth: { md: '500px' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              pt: { md: 2 }
            }}
          >
            {/* Small Contact Header with Dot */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  letterSpacing: '0.2em',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                {t('title').toUpperCase()}
              </Typography>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                }}
              />
            </Box>

            {/* Let's Work Together */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '3.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                mb: 4,
                color: 'text.primary',
                fontFamily: '"Outfit", "Inter", sans-serif',
              }}
            >
              Let&apos;s <span className="text-gradient-blue">Work</span>
              <br />
              Together.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 6,
                fontSize: '1.05rem',
                lineHeight: 1.6,
                maxWidth: '90%',
              }}
            >
              {t('description')}
            </Typography>

            {/* Contact Info (Email & Phone) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
                  mx.nattha963@gmail.com
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <LocalPhoneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
                  085-062-9238
                </Typography>
              </Box>
            </Box>

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 6 }}>
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
          </MotionBox>

          {/* Right Side - Form */}
          <MotionBox
            variants={fadeInUp}
            sx={{
              flex: 1,
              maxWidth: { md: '500px' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pt: { xs: 4, md: 2 }
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <TextField
                id="contact-name"
                name="name"
                placeholder={t('formName')}
                variant="standard"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                sx={inputStyles}
                slotProps={{ htmlInput: { suppressHydrationWarning: true } }}
              />

              <TextField
                id="contact-email"
                name="email"
                type="email"
                placeholder={t('formEmail')}
                variant="standard"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                sx={inputStyles}
                slotProps={{ htmlInput: { suppressHydrationWarning: true } }}
              />

              <TextField
                id="contact-subject"
                name="subject"
                placeholder={t('formSubject')}
                variant="standard"
                value={formData.subject}
                onChange={handleChange}
                required
                fullWidth
                sx={inputStyles}
                slotProps={{ htmlInput: { suppressHydrationWarning: true } }}
              />

              <TextField
                id="contact-message"
                name="message"
                placeholder={t('formMessage')}
                variant="standard"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  ...inputStyles,
                  '& .MuiInputBase-root': {
                    pt: 1,
                  }
                }}
                slotProps={{ htmlInput: { suppressHydrationWarning: true } }}
              />

              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  variant="contained"
                  endIcon={status === 'loading' ? <CircularProgress size={20} color="inherit" /> : <SendIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: 'primary.main',
                    color: '#fff',
                    py: 1.5,
                    px: 4,
                    borderRadius: 50,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                    width: { xs: '100%', sm: 'auto' },
                  }}
                  suppressHydrationWarning
                >
                  {status === 'loading' ? t('formSending') : t('formSubmit')}
                </Button>
              </Box>

              {status === 'success' && (
                <Alert severity="success" sx={{ mt: 2, bgcolor: 'rgba(46, 125, 50, 0.1)', color: '#81c784', '& .MuiAlert-icon': { color: '#81c784' } }}>
                  {t('formSuccess')}
                </Alert>
              )}
              {status === 'error' && (
                <Alert severity="error" sx={{ mt: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#e57373', '& .MuiAlert-icon': { color: '#e57373' } }}>
                  {t('formError')}
                </Alert>
              )}
            </Box>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
