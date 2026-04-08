'use client';

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';
import { ProjectCategory } from '@/types';

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
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

const projectTabs: { key: ProjectCategory; icon: React.ReactElement }[] = [
  { key: 'personal', icon: <LightbulbIcon /> },
  { key: 'internal', icon: <CodeIcon /> },
  { key: 'freelance', icon: <WorkIcon /> },
];

export default function ProjectSection() {
  const t = useTranslations('projectSection');
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getProjectsByCategory = (category: ProjectCategory) => {
    return projects.filter((project) => project.category === category);
  };

  return (
    <Box
      id="projects"
      component="section"
      className="bg-about-gradient"
      sx={{
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
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
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              bgcolor: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 3,
              p: 0.5,
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .MuiTabs-flexContainer': {
                gap: 0.5,
              },
              '& .MuiTabs-scrollButtons': {
                color: 'text.secondary',
                '&.Mui-disabled': { opacity: 0.3 },
              },
              '& .MuiTab-root': {
                minHeight: 48,
                px: isMobile ? 1.5 : 3,
                py: isMobile ? 0.75 : 1,
                borderRadius: 2,
                color: 'text.secondary',
                transition: 'all 0.3s ease',
                minWidth: isMobile ? 'auto' : undefined,
                whiteSpace: 'nowrap',
                '&.Mui-selected': {
                  bgcolor: 'rgba(255,255,255,0.06)',
                  color: 'text.primary',
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                },
              },
            }}
          >
            {projectTabs.map((tab, index) => (
              <Tab
                key={tab.key}
                icon={tab.icon}
                iconPosition={isMobile ? 'top' : 'start'}
                label={t(`tabs.${tab.key}`)}
                id={`project-tab-${index}`}
                aria-controls={`project-tabpanel-${index}`}
                suppressHydrationWarning
              />
            ))}
          </Tabs>
        </MotionBox>

        <AnimatePresence mode="wait">
          {projectTabs.filter((_, index) => index === tabValue).map((tab) => (
            <TabPanel key={tab.key} value={tabValue} index={tabValue}>
              <MotionBox
                key={`projects-${tab.key}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={staggerContainer}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 4,
                }}
              >
                {getProjectsByCategory(tab.key).length > 0 ? (
                  getProjectsByCategory(tab.key).map((project, idx) => (
                    <MotionBox
                      key={project.id}
                      variants={cardVariants}
                      custom={idx}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      <ProjectCard project={project} />
                    </MotionBox>
                  ))
                ) : (
                  <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 8 }}>
                    <Typography color="text.secondary">{t('noProjects')}</Typography>
                  </Box>
                )}
              </MotionBox>
            </TabPanel>
          ))}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
