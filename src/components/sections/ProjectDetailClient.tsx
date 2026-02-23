'use client';

import { useState, useCallback, useEffect } from 'react';
import { Box, Container, Typography, Button, Chip, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WorkIcon from '@mui/icons-material/Work';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { Link } from '@/i18n/navigation';
import type { ProjectCategory } from '@/types';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionChip = motion.create(Chip);

// --- Animation Variants ---

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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const,
      delay: 0.3,
    },
  },
};

const chipContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const chipItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut' as const,
    },
  },
};

const featureContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
};

// --- Category Config ---

const categoryConfig: Record<
  ProjectCategory,
  {
    labelKey: string;
    icon: React.ReactElement;
    bgcolor: string;
    color: string;
    borderColor: string;
  }
> = {
  internal: {
    labelKey: 'categoryInternal',
    icon: <CodeIcon sx={{ fontSize: 16 }} />,
    bgcolor: 'rgba(37, 99, 235, 0.2)',
    color: '#3b82f6',
    borderColor: 'rgba(37, 99, 235, 0.3)',
  },
  freelance: {
    labelKey: 'categoryFreelance',
    icon: <WorkIcon sx={{ fontSize: 16 }} />,
    bgcolor: 'rgba(249, 115, 22, 0.2)',
    color: '#fb923c',
    borderColor: 'rgba(249, 115, 22, 0.3)',
  },
  personal: {
    labelKey: 'categoryPersonal',
    icon: <LightbulbIcon sx={{ fontSize: 16 }} />,
    bgcolor: 'rgba(6, 182, 212, 0.2)',
    color: '#22d3ee',
    borderColor: 'rgba(6, 182, 212, 0.3)',
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
        background:
          'linear-gradient(180deg, rgba(6,6,17,0.95) 0%, rgba(10,22,40,0.9) 50%, rgba(6,6,17,0.95) 100%)',
        pt: { xs: 10, md: 12 },
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* === Section A: Breadcrumb === */}
        <MotionBox
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 6,
          }}
        >
          <Link
            href="/#projects"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#a1a1aa',
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            {t('back')}
          </Link>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('projects')}
          </Typography>
          <NavigateNextIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {project.title}
          </Typography>
        </MotionBox>

        {/* === Section B: Hero === */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ mb: 6 }}
        >
          {/* Category Badge */}
          <MotionChip
            variants={itemVariants}
            icon={catConfig.icon}
            label={t(catConfig.labelKey)}
            sx={{
              mb: 2,
              bgcolor: catConfig.bgcolor,
              color: catConfig.color,
              border: `1px solid ${catConfig.borderColor}`,
              fontWeight: 500,
              px: 1,
              '& .MuiChip-icon': {
                color: catConfig.color,
              },
            }}
          />

          {/* Title */}
          <MotionBox variants={itemVariants}>
            <Typography
              variant="h2"
              component="h1"
              className="text-gradient-blue"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.75rem', lg: '3.25rem' },
                lineHeight: 1.15,
                mb: 3,
              }}
            >
              {project.title}
            </Typography>
          </MotionBox>

          {/* Description */}
          <MotionTypography
            variants={itemVariants}
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              maxWidth: 700,
              mb: 4,
            }}
          >
            {project.description}
          </MotionTypography>

          {/* Hero Image Carousel */}
          <MotionBox
            variants={imageVariants}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow:
                '0 8px 40px rgba(37, 99, 235, 0.15), 0 0 80px rgba(37, 99, 235, 0.05)',
              position: 'relative',
            }}
          >
            {/* Image with AnimatePresence */}
            <Box sx={{ position: 'relative', height: { xs: 280, md: 450, lg: 500 }, overflow: 'hidden' }}>
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
            </Box>

            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <IconButton
                  onClick={goPrev}
                  aria-label="Previous image"
                  sx={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    width: 44,
                    height: 44,
                    border: '1px solid rgba(255,255,255,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(37, 99, 235, 0.6)',
                      borderColor: 'rgba(37, 99, 235, 0.5)',
                      transform: 'translateY(-50%) scale(1.1)',
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
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    width: 44,
                    height: 44,
                    border: '1px solid rgba(255,255,255,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(37, 99, 235, 0.6)',
                      borderColor: 'rgba(37, 99, 235, 0.5)',
                      transform: 'translateY(-50%) scale(1.1)',
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
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    bgcolor: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {project.images.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => goToImage(index)}
                      sx={{
                        width: index === currentImageIndex ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        bgcolor:
                          index === currentImageIndex
                            ? 'primary.light'
                            : 'rgba(255,255,255,0.35)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor:
                            index === currentImageIndex
                              ? 'primary.light'
                              : 'rgba(255,255,255,0.6)',
                        },
                      }}
                    />
                  ))}
                </Box>

                {/* Image Counter */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    fontFamily: 'var(--font-geist-mono)',
                  }}
                >
                  {currentImageIndex + 1} / {project.images.length}
                </Box>
              </>
            )}
          </MotionBox>
        </MotionBox>

        {/* === Section C: Stats + Action Buttons === */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-panel"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            p: { xs: 3, md: 4 },
            mb: 6,
          }}
        >
          {/* Stats */}
          <MotionBox
            variants={itemVariants}
            sx={{
              display: 'flex',
              gap: { xs: 3, md: 5 },
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CodeIcon sx={{ color: 'primary.light', fontSize: 24 }} />
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1 }}
                >
                  {project.technologies.length}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {t('totalTechnologies')}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AutoAwesomeIcon sx={{ color: '#f97316', fontSize: 24 }} />
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1 }}
                >
                  {project.keyFeatures.length}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {t('keyFeaturesCount')}
                </Typography>
              </Box>
            </Box>
          </MotionBox>

          {/* Action Buttons */}
          <MotionBox
            variants={itemVariants}
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
          >
            {project.liveUrl && (
              <Button
                component="a"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                endIcon={<LaunchIcon />}
                sx={{ px: 3 }}
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
                  px: 3,
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(37, 99, 235, 0.1)',
                  },
                }}
              >
                {t('github')}
              </Button>
            )}
          </MotionBox>
        </MotionBox>

        {/* === Section D: Technologies + Key Features === */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            mb: 8,
          }}
        >
          {/* Technologies Used */}
          <MotionBox
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="glass-panel"
            sx={{ p: { xs: 3, md: 4 } }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <CodeIcon sx={{ color: 'primary.light', fontSize: 22 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {t('technologiesUsed')}
              </Typography>
            </Box>
            <MotionBox
              variants={chipContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
            >
              {project.technologies.map((tech) => (
                <MotionBox key={tech} variants={chipItemVariants}>
                  <Chip
                    label={tech}
                    icon={<CodeIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      bgcolor: 'rgba(37, 99, 235, 0.15)',
                      color: 'primary.light',
                      border: '1px solid rgba(37, 99, 235, 0.3)',
                      fontSize: '0.85rem',
                      py: 2.5,
                      px: 0.5,
                      '& .MuiChip-icon': {
                        color: 'primary.light',
                      },
                    }}
                  />
                </MotionBox>
              ))}
            </MotionBox>
          </MotionBox>

          {/* Key Features */}
          <MotionBox
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="glass-panel-strong"
            sx={{ p: { xs: 3, md: 4 } }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <AutoAwesomeIcon sx={{ color: '#f97316', fontSize: 22 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {t('keyFeatures')}
              </Typography>
            </Box>
            <motion.ul
              variants={featureContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {project.keyFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={featureItemVariants}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    transition: 'background 0.2s',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'primary.light',
                      opacity: 0.7,
                      minWidth: 24,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Box
                    sx={{
                      width: 2,
                      height: 20,
                      bgcolor: 'rgba(249, 115, 22, 0.4)',
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                  >
                    {feature}
                  </Typography>
                </motion.li>
              ))}
            </motion.ul>
          </MotionBox>
        </Box>

        {/* === Section E: Project Navigation === */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
            gap: 3,
          }}
        >
          {/* Previous Project */}
          <MotionBox variants={itemVariants}>
            <Link
              href={`/projects/${prevProject.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <Box
                className="glass-panel"
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(37, 99, 235, 0.4)',
                    transform: 'translateX(-4px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <ArrowBackIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('previousProject')}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    pl: 3.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {prevProject.title}
                </Typography>
              </Box>
            </Link>
          </MotionBox>

          {/* View All Projects */}
          <MotionBox
            variants={itemVariants}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              component={Link}
              href="/#projects"
              variant="outlined"
              sx={{
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'text.primary',
                whiteSpace: 'nowrap',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(37, 99, 235, 0.1)',
                },
              }}
            >
              {t('viewAllProjects')}
            </Button>
          </MotionBox>

          {/* Next Project */}
          <MotionBox variants={itemVariants}>
            <Link
              href={`/projects/${nextProject.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <Box
                className="glass-panel"
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  textAlign: 'right',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(37, 99, 235, 0.4)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5,
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('nextProject')}
                  </Typography>
                  <ArrowForwardIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    pr: 3.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {nextProject.title}
                </Typography>
              </Box>
            </Link>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
