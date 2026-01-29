'use client';

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
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
  { key: 'internal', icon: <CodeIcon /> },
  { key: 'freelance', icon: <WorkIcon /> },
  { key: 'side', icon: <LightbulbIcon /> },
];

export default function ProjectSection() {
  const t = useTranslations('projectSection');
  const [tabValue, setTabValue] = useState(0);

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
            sx={{
              bgcolor: 'rgba(255,255,255,0.03)',
              borderRadius: 2,
              p: 0.5,
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .MuiTab-root': {
                minHeight: 48,
                px: 3,
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
            {projectTabs.map((tab, index) => (
              <Tab
                key={tab.key}
                icon={tab.icon}
                iconPosition="start"
                label={t(`tabs.${tab.key}`)}
                id={`project-tab-${index}`}
                aria-controls={`project-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </MotionBox>

        <AnimatePresence mode="wait">
          {projectTabs.map((tab, index) => (
            <TabPanel key={tab.key} value={tabValue} index={index}>
              <MotionBox
                key={`projects-${tab.key}`}
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
