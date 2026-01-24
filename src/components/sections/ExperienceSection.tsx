'use client';

import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { experiences } from '@/data/experiences';

const MotionBox = motion.create(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const timelineLineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function ExperienceSection() {
  const t = useTranslations();

  const getItemVariants = (index: number, isEven: boolean) => ({
    hidden: {
      opacity: 0,
      x: isEven ? 50 : -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.2,
      },
    },
  });

  const getDescriptionVariants = (index: number, isEven: boolean) => ({
    hidden: {
      opacity: 0,
      x: isEven ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.2 + 0.1,
      },
    },
  });

  return (
    <Box
      id="experience"
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
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              mb: 2,
            }}
          >
            {t('experience.title')}
          </Typography>
        </MotionBox>

        {/* Timeline Container */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: 1000,
            mx: 'auto',
          }}
        >
          {/* Vertical Timeline Line - Desktop */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={timelineLineVariants}
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              bottom: 0,
              width: 3,
              background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.8) 0%, rgba(6, 182, 212, 0.8) 100%)',
              borderRadius: 2,
              transformOrigin: 'top',
            }}
          />

          {/* Vertical Timeline Line - Mobile */}
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={timelineLineVariants}
            sx={{
              display: { xs: 'block', md: 'none' },
              position: 'absolute',
              left: 20,
              top: 0,
              bottom: 0,
              width: 3,
              background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.8) 0%, rgba(6, 182, 212, 0.8) 100%)',
              borderRadius: 2,
              transformOrigin: 'top',
            }}
          />

          {/* Experience Items */}
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 1;

            return (
              <Box
                key={exp.id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: isEven ? 'row-reverse' : 'row' },
                  mb: 6,
                  position: 'relative',
                }}
              >
                {/* Left/Right Content - Position Info */}
                <MotionBox
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={getItemVariants(index, isEven)}
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    flex: 1,
                    justifyContent: isEven ? 'flex-start' : 'flex-end',
                    pr: isEven ? 0 : 6,
                    pl: isEven ? 6 : 0,
                    textAlign: isEven ? 'left' : 'right',
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 0.5,
                      }}
                    >
                      {t(exp.positionKey)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'primary.light',
                        mb: 0.5,
                      }}
                    >
                      {t(exp.companyKey)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      {exp.year}
                    </Typography>
                  </Box>
                </MotionBox>

                {/* Timeline Dot - Desktop */}
                <MotionBox
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={dotVariants}
                  transition={{ delay: index * 0.2 }}
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'relative',
                    width: 40,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    pt: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      border: '3px solid',
                      borderColor: 'background.default',
                      boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                      zIndex: 1,
                    }}
                  />
                </MotionBox>

                {/* Timeline Dot - Mobile */}
                <MotionBox
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={dotVariants}
                  transition={{ delay: index * 0.2 }}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    position: 'absolute',
                    left: 12,
                    top: 4,
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      border: '3px solid',
                      borderColor: 'background.default',
                      boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                      zIndex: 1,
                    }}
                  />
                </MotionBox>

                {/* Right/Left Content - Description */}
                <MotionBox
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={getDescriptionVariants(index, isEven)}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    flex: 1,
                    justifyContent: isEven ? 'flex-end' : 'flex-start',
                    pl: isEven ? 0 : 6,
                    pr: isEven ? 6 : 0,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: 400,
                      p: 3,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.05)',
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      {t(exp.descriptionKey)}
                    </Typography>
                  </Box>
                </MotionBox>

                {/* Mobile Content */}
                <MotionBox
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, delay: index * 0.15 },
                    },
                  }}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    pl: 6,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 0.5,
                    }}
                  >
                    {t(exp.positionKey)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.light',
                      mb: 0.5,
                    }}
                  >
                    {t(exp.companyKey)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'block',
                      mb: 1.5,
                    }}
                  >
                    {exp.year}
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      {t(exp.descriptionKey)}
                    </Typography>
                  </Box>
                </MotionBox>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
