'use client';

import { useState, useCallback, useEffect } from 'react';
import { Box, Container, Typography, Button, Chip, IconButton, alpha } from '@mui/material';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WorkIcon from '@mui/icons-material/Work';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Link } from '@/i18n/navigation';
import type { ProjectCategory } from '@/types';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

// --- Animation Variants ---

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// --- Category Config ---

const categoryConfig: Record<
  ProjectCategory,
  {
    labelKey: string;
    icon: React.ReactElement;
    gradient: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  internal: {
    labelKey: 'categoryInternal',
    icon: <CodeIcon sx={{ fontSize: 16 }} />,
    gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: '#60a5fa',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  freelance: {
    labelKey: 'categoryFreelance',
    icon: <WorkIcon sx={{ fontSize: 16 }} />,
    gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
    color: '#fb923c',
    bgColor: 'rgba(249, 115, 22, 0.15)',
    borderColor: 'rgba(249, 115, 22, 0.3)',
  },
  personal: {
    labelKey: 'categoryPersonal',
    icon: <LightbulbIcon sx={{ fontSize: 16 }} />,
    gradient: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
    color: '#22d3ee',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
};

// --- Props ---

interface ProjectDetailClientProps {
  project: {
    slug: string;
    title: string;
    subtitle?: string;
    description: string;
    images: string[];
    technologies: string[];
    keyFeatures: string[];
    responsibilities?: string[];
    liveUrl?: string;
    githubUrl?: string;
    category: ProjectCategory;
  };
  prevProject: { slug: string; title: string };
  nextProject: { slug: string; title: string };
}

// --- Component ---

export default function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
}: ProjectDetailClientProps) {
  const t = useTranslations('projectDetail');
  const catConfig = categoryConfig[project.category];

  // --- Carousel State ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const hasMultipleImages = project.images.length > 1;

  const goToImage = useCallback(
    (index: number) => {
      setSlideDirection(index > currentImageIndex ? 1 : -1);
      setCurrentImageIndex(index);
    },
    [currentImageIndex],
  );

  const goNext = useCallback(() => {
    setSlideDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project.images.length]);

  const goPrev = useCallback(() => {
    setSlideDirection(-1);
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length,
    );
  }, [project.images.length]);

  useEffect(() => {
    if (!hasMultipleImages) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasMultipleImages, goNext, goPrev]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#030305',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 10, md: 14 },
        pb: 10,
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '80vh',
          background: `radial-gradient(circle, ${alpha(catConfig.color, 0.15)} 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>

        {/* Top Navigation Row */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: 6 }}
        >
          <Link
            href="/#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              padding: '10px 20px',
              borderRadius: '24px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            {t('back')}
          </Link>
        </MotionBox>

        {/* 2-Column Editorial Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '4fr 7fr' },
            gap: { xs: 6, lg: 10 },
            alignItems: 'start',
          }}
        >
          {/* LEFT COLUMN: Sticky Project Metadata */}
          <Box
            sx={{
              position: { lg: 'sticky' },
              top: { lg: 120 },
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <MotionBox variants={fadeIn} sx={{ mb: 3 }}>
                <Chip
                  icon={catConfig.icon}
                  label={t(catConfig.labelKey)}
                  sx={{
                    bgcolor: catConfig.bgColor,
                    color: catConfig.color,
                    border: `1px solid ${catConfig.borderColor}`,
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    px: 1,
                    py: 2.5,
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)',
                    '& .MuiChip-icon': { color: catConfig.color },
                  }}
                />
              </MotionBox>

              <motion.h1
                variants={fadeIn}
                style={{
                  margin: '0 0 24px 0',
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#f8fafc',
                  }}
                >
                  {project.title}
                  {project.subtitle && (
                    <Box
                      component="span"
                      sx={{
                        display: 'block',
                        fontSize: { xs: '1.5rem', md: '2rem', lg: '2.25rem' },
                        color: '#cbd5e1',
                        fontWeight: 600,
                        mt: 1,
                      }}
                    >
                      {project.subtitle}
                    </Box>
                  )}
                </Typography>
              </motion.h1>

              <MotionTypography
                variants={fadeIn}
                variant="body1"
                sx={{
                  color: '#94a3b8',
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                {project.description}
              </MotionTypography>

              {/* Action Buttons */}
              <MotionBox variants={fadeIn} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {project.liveUrl && (
                  <Button
                    component="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    endIcon={<LaunchIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: '30px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      background: '#fff',
                      color: '#0f172a',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        background: '#f1f5f9',
                        boxShadow: `0 10px 40px ${alpha('#fff', 0.2)}`,
                      },
                    }}
                  >
                    {t('liveDemo')}
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    component="a"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    endIcon={<GitHubIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: '30px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      borderColor: 'rgba(255,255,255,0.2)',
                      color: '#f8fafc',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#fff',
                        bgcolor: 'rgba(255,255,255,0.05)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {t('github')}
                  </Button>
                )}
              </MotionBox>
            </MotionBox>

            {/* Technologies Section */}
            {project.technologies && project.technologies.length > 0 && (
              <MotionBox
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                sx={{
                  mt: 2,
                  pt: 4,
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#f8fafc', mb: 3, fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('technologiesUsed')}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {project.technologies.map((tech) => (
                    <Box
                      key={tech}
                      sx={{
                        px: 2,
                        py: 0.8,
                        borderRadius: '8px',
                        bgcolor: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#94a3b8',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          color: '#fff',
                          borderColor: alpha(catConfig.color, 0.5),
                        },
                      }}
                    >
                      {tech}
                    </Box>
                  ))}
                </Box>
              </MotionBox>
            )}
          </Box>

          {/* RIGHT COLUMN: Scrollable Media & Tech Specs */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

            {/* Immersive Image Carousel */}
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={slideUp}
              sx={{
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                bgcolor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 120px ${alpha(catConfig.color, 0.1)}`,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 350, md: 500, lg: 600 },
                  width: '100%',
                }}
              >
                <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                  <motion.img
                    key={currentImageIndex}
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    custom={slideDirection}
                    initial={{ x: slideDirection > 0 ? '100%' : '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: slideDirection > 0 ? '-100%' : '100%', opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                </AnimatePresence>

                {/* Glassmorphic Arrows */}
                {hasMultipleImages && (
                  <>
                    <IconButton
                      onClick={goPrev}
                      sx={{
                        position: 'absolute',
                        left: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(15, 23, 42, 0.6) !important',
                        backdropFilter: 'blur(12px)',
                        color: '#fff',
                        width: 56,
                        height: 56,
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: `${alpha(catConfig.color, 0.8)} !important`,
                          transform: 'translateY(-50%) scale(1.1)',
                        },
                      }}
                    >
                      <ChevronLeftIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                    <IconButton
                      onClick={goNext}
                      sx={{
                        position: 'absolute',
                        right: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(15, 23, 42, 0.6) !important',
                        backdropFilter: 'blur(12px)',
                        color: '#fff',
                        width: 56,
                        height: 56,
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: `${alpha(catConfig.color, 0.8)} !important`,
                          transform: 'translateY(-50%) scale(1.1)',
                        },
                      }}
                    >
                      <ChevronRightIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                  </>
                )}

                {/* Floating Thumbnail Strip */}
                {hasMultipleImages && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 24,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: 1.5,
                      p: 1.5,
                      bgcolor: 'rgba(15, 23, 42, 0.7)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '20px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      maxWidth: '90%',
                      overflowX: 'auto',
                      '&::-webkit-scrollbar': { display: 'none' },
                    }}
                  >
                    {project.images.map((img, index) => (
                      <Box
                        key={index}
                        onClick={() => goToImage(index)}
                        sx={{
                          flexShrink: 0,
                          width: 80,
                          height: 56,
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          position: 'relative',
                          border: index === currentImageIndex
                            ? `2px solid ${catConfig.color}`
                            : '2px solid transparent',
                          transition: 'all 0.3s ease',
                          opacity: index === currentImageIndex ? 1 : 0.5,
                          '&:hover': { opacity: 1 },
                        }}
                      >
                        <Box
                          component="img"
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </MotionBox>

            {/* Clean Tech & Features Layout */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, mt: 4 }}>

              {/* Key Features (Clean Grid Stack) */}
              <MotionBox
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <AutoAwesomeIcon sx={{ color: catConfig.color, fontSize: 20 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                    {t('keyFeatures')}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3
                }}>
                  {project.keyFeatures.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 3,
                        borderRadius: '16px',
                        bgcolor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.04)',
                          borderColor: alpha(catConfig.color, 0.3),
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      <Typography sx={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem' }}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </MotionBox>

              {/* Responsibilities Section */}
              {project.responsibilities && project.responsibilities.length > 0 && (
                <MotionBox
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideUp}
                  sx={{
                    pt: 6,
                    borderTop: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <AssignmentTurnedInIcon sx={{ color: catConfig.color, fontSize: 20 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                      {t('responsibilities')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {project.responsibilities.map((resp, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 26,
                            height: 26,
                            borderRadius: '8px',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#f8fafc',
                            flexShrink: 0,
                            mt: 0.2,
                          }}
                        >
                          <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                        </Box>
                        <Typography sx={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem' }}>
                          {resp}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </MotionBox>
              )}
            </Box>
          </Box>
        </Box>

        {/* ═══ Project Navigation ═══ */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 12,
            pt: 5,
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Link href={`/projects/${prevProject.slug}`} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                color: '#94a3b8',
                transition: 'all 0.3s ease',
                '&:hover': { color: '#fff', '& .icon': { transform: 'translateX(-4px)' } },
              }}
            >
              <ArrowBackIcon className="icon" sx={{ fontSize: 20, transition: 'transform 0.3s ease' }} />
              <Box>
                <Typography variant="caption" sx={{ display: 'block', color: '#64748b', mb: 0.5 }}>
                  {t('previousProject')}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {prevProject.title}
                </Typography>
              </Box>
            </Box>
          </Link>

          <Link href="/#projects" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8',
                transition: 'all 0.3s ease',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', transform: 'scale(1.1)' },
              }}
            >
              {/* 4 dots arranged in a 2x2 grid to represent "all projects" grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                <Box sx={{ width: 6, height: 6, bgcolor: 'currentColor', borderRadius: '2px' }} />
                <Box sx={{ width: 6, height: 6, bgcolor: 'currentColor', borderRadius: '2px' }} />
                <Box sx={{ width: 6, height: 6, bgcolor: 'currentColor', borderRadius: '2px' }} />
                <Box sx={{ width: 6, height: 6, bgcolor: 'currentColor', borderRadius: '2px' }} />
              </Box>
            </Box>
          </Link>

          <Link href={`/projects/${nextProject.slug}`} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                color: '#94a3b8',
                textAlign: 'right',
                transition: 'all 0.3s ease',
                '&:hover': { color: '#fff', '& .icon': { transform: 'translateX(4px)' } },
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ display: 'block', color: '#64748b', mb: 0.5 }}>
                  {t('nextProject')}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {nextProject.title}
                </Typography>
              </Box>
              <ArrowForwardIcon className="icon" sx={{ fontSize: 20, transition: 'transform 0.3s ease' }} />
            </Box>
          </Link>
        </MotionBox>

      </Container>
    </Box>
  );
}
