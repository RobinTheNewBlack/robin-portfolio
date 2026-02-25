'use client';

import { useState, useCallback, useEffect } from 'react';
import { Box, Container, Typography, Button, Chip, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Link } from '@/i18n/navigation';
import type { ProjectCategory } from '@/types';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

// --- Animation Variants ---

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
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
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
  },
  freelance: {
    labelKey: 'categoryFreelance',
    icon: <WorkIcon sx={{ fontSize: 16 }} />,
    gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
    color: '#fb923c',
    bgColor: 'rgba(249, 115, 22, 0.12)',
    borderColor: 'rgba(249, 115, 22, 0.25)',
  },
  personal: {
    labelKey: 'categoryPersonal',
    icon: <LightbulbIcon sx={{ fontSize: 16 }} />,
    gradient: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
    color: '#22d3ee',
    bgColor: 'rgba(6, 182, 212, 0.12)',
    borderColor: 'rgba(6, 182, 212, 0.25)',
  },
};

// --- Props ---

interface ProjectDetailClientProps {
  project: {
    slug: string;
    title: string;
    description: string;
    images: string[];
    technologies: string[];
    keyFeatures: string[];
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
        background: 'linear-gradient(180deg, #060611 0%, #0a1628 40%, #060611 100%)',
        pt: { xs: 10, md: 12 },
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* ═══ Back Button ═══ */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{ mb: 4 }}
        >
          <Link
            href="/#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#a1a1aa',
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '8px 16px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            {t('back')}
          </Link>
        </MotionBox>

        {/* ═══ Hero Section: Image Carousel ═══ */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={slideUp}
          sx={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            mb: 5,
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 100px rgba(37, 99, 235, 0.08)',
          }}
        >
          {/* Main Image */}
          <Box
            sx={{
              position: 'relative',
              height: { xs: 300, md: 480, lg: 540 },
              bgcolor: 'rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} - ${currentImageIndex + 1}`}
                custom={slideDirection}
                initial={{ x: slideDirection > 0 ? '100%' : '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDirection > 0 ? '-100%' : '100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <IconButton
                  onClick={goPrev}
                  aria-label="Previous image"
                  sx={{
                    position: 'absolute',
                    left: { xs: 8, md: 16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(12px)',
                    color: '#fff',
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    border: '1px solid rgba(255,255,255,0.12)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(37, 99, 235, 0.6)',
                      borderColor: 'rgba(37, 99, 235, 0.5)',
                      transform: 'translateY(-50%) scale(1.08)',
                    },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  onClick={goNext}
                  aria-label="Next image"
                  sx={{
                    position: 'absolute',
                    right: { xs: 8, md: 16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(12px)',
                    color: '#fff',
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    border: '1px solid rgba(255,255,255,0.12)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(37, 99, 235, 0.6)',
                      borderColor: 'rgba(37, 99, 235, 0.5)',
                      transform: 'translateY(-50%) scale(1.08)',
                    },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>

                {/* Dot Indicators */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 0.75,
                    px: 2,
                    py: 1,
                    borderRadius: 5,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {project.images.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => goToImage(index)}
                      sx={{
                        width: index === currentImageIndex ? 20 : 8,
                        height: 8,
                        borderRadius: 4,
                        bgcolor:
                          index === currentImageIndex
                            ? '#fff'
                            : 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          bgcolor:
                            index === currentImageIndex
                              ? '#fff'
                              : 'rgba(255,255,255,0.55)',
                        },
                      }}
                    />
                  ))}
                </Box>

                {/* Image Counter Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-geist-mono)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {currentImageIndex + 1} / {project.images.length}
                </Box>
              </>
            )}
          </Box>

          {/* Thumbnail Strip */}
          {hasMultipleImages && (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                p: 1.5,
                bgcolor: 'rgba(0,0,0,0.4)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                overflowX: 'auto',
                '&::-webkit-scrollbar': { height: 4 },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'rgba(255,255,255,0.15)',
                  borderRadius: 2,
                },
              }}
            >
              {project.images.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => goToImage(index)}
                  sx={{
                    flexShrink: 0,
                    width: { xs: 80, md: 100 },
                    height: { xs: 52, md: 64 },
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: index === currentImageIndex
                      ? '2px solid rgba(59, 130, 246, 0.8)'
                      : '2px solid transparent',
                    opacity: index === currentImageIndex ? 1 : 0.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      border: index === currentImageIndex
                        ? '2px solid rgba(59, 130, 246, 0.8)'
                        : '2px solid rgba(255,255,255,0.25)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </MotionBox>

        {/* ═══ Project Header: Badge + Title + Description + Actions ═══ */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          sx={{ mb: 6 }}
        >
          {/* Category Badge */}
          <MotionBox variants={fadeIn} sx={{ mb: 2 }}>
            <Chip
              icon={catConfig.icon}
              label={t(catConfig.labelKey)}
              sx={{
                bgcolor: catConfig.bgColor,
                color: catConfig.color,
                border: `1px solid ${catConfig.borderColor}`,
                fontWeight: 600,
                fontSize: '0.8rem',
                px: 1,
                '& .MuiChip-icon': { color: catConfig.color },
              }}
            />
          </MotionBox>

          <motion.h1
            variants={fadeIn}
            style={{
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #e2e8f0, #fff, #93c5fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <Typography
              variant="h2"
              component="span"
              sx={{
                fontWeight: 'inherit',
                fontSize: { xs: '2rem', md: '2.75rem', lg: '3.5rem' },
                lineHeight: 'inherit',
                background: 'inherit',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {project.title}
            </Typography>
          </motion.h1>

          {/* Description */}
          <MotionTypography
            variants={fadeIn}
            variant="body1"
            sx={{
              color: 'rgba(161, 161, 170, 0.9)',
              lineHeight: 1.85,
              fontSize: { xs: '0.95rem', md: '1.08rem' },
              maxWidth: 720,
              mb: 4,
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
                  px: 3.5,
                  py: 1.2,
                  borderRadius: 2.5,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  background: catConfig.gradient,
                  boxShadow: `0 4px 20px ${catConfig.bgColor}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 30px ${catConfig.bgColor}`,
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
                  px: 3.5,
                  py: 1.2,
                  borderRadius: 2.5,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  borderColor: 'rgba(255,255,255,0.15)',
                  color: 'text.primary',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: catConfig.color,
                    bgcolor: catConfig.bgColor,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t('github')}
              </Button>
            )}
          </MotionBox>
        </MotionBox>



        {/* ═══ Info Cards: Technologies + Key Features ═══ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '5fr 7fr' },
            gap: { xs: 4, lg: 6 },
            mb: 10,
          }}
        >
          {/* Left: Technologies */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideUp}
            sx={{
              position: 'relative',
              p: { xs: 3, md: 4.5 },
              borderRadius: '24px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }
            }}
          >
            {/* Elegant Background Glow */}
            <Box
              sx={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '140%',
                height: '140%',
                background: 'radial-gradient(circle at top left, rgba(59,130,246,0.1), transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Section Header */}
            <Box sx={{ position: 'relative', zIndex: 1, mb: 4, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <CodeIcon sx={{ color: '#93c5fd', fontSize: 24 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                    {t('technologiesUsed')}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(161,161,170,0.8)' }}>
                  {project.technologies.length} {t('totalTechnologies').toLowerCase()}
                </Typography>
              </Box>
            </Box>

            {/* Tech Badges Grid */}
            <MotionBox
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {project.technologies.map((tech) => (
                <MotionBox key={tech} variants={scaleIn}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 2.5,
                      py: 1.2,
                      borderRadius: '12px',
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
                      color: '#e2e8f0',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'linear-gradient(145deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)',
                        borderColor: 'rgba(96,165,250,0.4)',
                        color: '#fff',
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.15)',
                      }
                    }}
                  >
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: catConfig.gradient, mr: 1.5, boxShadow: `0 0 8px ${catConfig.color}` }} />
                    {tech}
                  </Box>
                </MotionBox>
              ))}
            </MotionBox>
          </MotionBox>

          {/* Right: Key Features */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideUp}
            sx={{
              position: 'relative',
              p: { xs: 3, md: 4.5 },
              borderRadius: '24px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }
            }}
          >
            {/* Elegant Background Glow */}
            <Box
              sx={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '140%',
                height: '140%',
                background: 'radial-gradient(circle at top right, rgba(249,115,22,0.08), transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Section Header */}
            <Box sx={{ position: 'relative', zIndex: 1, mb: 4, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <AutoAwesomeIcon sx={{ color: '#fdba74', fontSize: 24 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                    {t('keyFeatures')}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(161,161,170,0.8)' }}>
                  {project.keyFeatures.length} {t('keyFeaturesCount').toLowerCase()}
                </Typography>
              </Box>
            </Box>

            {/* Features List */}
            <MotionBox
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'relative', zIndex: 1 }}
            >
              {project.keyFeatures.map((feature, index) => (
                <MotionBox
                  key={index}
                  variants={fadeIn}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2.5,
                    p: 3,
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '4px',
                      height: '100%',
                      background: catConfig.gradient,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      background: 'rgba(255,255,255,0.04)',
                      transform: 'translateX(6px)',
                      borderColor: 'rgba(255,255,255,0.08)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      '&::before': {
                        opacity: 1,
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      mt: 0.25,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: '8px',
                      background: catConfig.bgColor,
                      color: catConfig.color,
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#e2e8f0',
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                      fontWeight: 400,
                    }}
                  >
                    {feature}
                  </Typography>
                </MotionBox>
              ))}
            </MotionBox>
          </MotionBox>
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
            pt: 4,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Previous */}
          <Link
            href={`/projects/${prevProject.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'text.primary' },
                '&:hover .arrow': { transform: 'translateX(-3px)' },
              }}
            >
              <ArrowBackIcon className="arrow" sx={{ fontSize: 16, transition: 'transform 0.2s ease' }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {prevProject.title}
              </Typography>
            </Box>
          </Link>

          {/* View All */}
          <Link
            href="/#projects"
            style={{ textDecoration: 'none' }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                transition: 'color 0.2s ease',
                display: { xs: 'none', sm: 'block' },
                '&:hover': { color: 'text.primary' },
              }}
            >
              {t('viewAllProjects')}
            </Typography>
          </Link>

          {/* Next */}
          <Link
            href={`/projects/${nextProject.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'text.primary' },
                '&:hover .arrow': { transform: 'translateX(3px)' },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {nextProject.title}
              </Typography>
              <ArrowForwardIcon className="arrow" sx={{ fontSize: 16, transition: 'transform 0.2s ease' }} />
            </Box>
          </Link>
        </MotionBox>
      </Container>
    </Box>
  );
}
