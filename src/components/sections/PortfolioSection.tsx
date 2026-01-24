'use client';

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CodeIcon from '@mui/icons-material/Code';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BuildIcon from '@mui/icons-material/Build';
import ProjectCard from '@/components/ui/ProjectCard';
import CertificateCard from '@/components/ui/CertificateCard';
import TechStackGrid from '@/components/ui/TechStackGrid';
import { projects } from '@/data/projects';
import { certificates } from '@/data/certificates';

const MotionBox = motion.create(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

export default function PortfolioSection() {
  const t = useTranslations('portfolio');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabs = [
    { label: t('tabs.projects'), icon: <CodeIcon /> },
    { label: t('tabs.certificates'), icon: <WorkspacePremiumIcon /> },
    { label: t('tabs.techStack'), icon: <BuildIcon /> },
  ];

  return (
    <Box
      id="portfolio"
      component="section"
      className="bg-portfolio-gradient"
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
          sx={{ textAlign: 'center', mb: 6 }}
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
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            {t('subtitle')}
          </Typography>
        </MotionBox>

        {/* Tabs */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              bgcolor: 'rgba(255,255,255,0.03)',
              borderRadius: 2,
              p: 0.5,
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .MuiTab-root': {
                minHeight: 48,
                px: 4,
                borderRadius: 1.5,
                color: 'text.secondary',
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  color: 'text.primary',
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.03)',
                },
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                id={`portfolio-tab-${index}`}
                aria-controls={`portfolio-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </MotionBox>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          <TabPanel value={tabValue} index={0}>
            <MotionBox
              key="projects"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={staggerContainer}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {projects.map((project, index) => (
                <MotionBox
                  key={project.id}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <ProjectCard project={project} />
                </MotionBox>
              ))}
            </MotionBox>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <MotionBox
              key="certificates"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={staggerContainer}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {certificates.map((certificate, index) => (
                <MotionBox
                  key={certificate.id}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <CertificateCard certificate={certificate} />
                </MotionBox>
              ))}
            </MotionBox>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <MotionBox
              key="techstack"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <TechStackGrid />
            </MotionBox>
          </TabPanel>
        </AnimatePresence>
      </Container>
    </Box>
  );
}
