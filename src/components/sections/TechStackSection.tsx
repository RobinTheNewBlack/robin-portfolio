'use client';

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CloudIcon from '@mui/icons-material/Cloud';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BarChartIcon from '@mui/icons-material/BarChart';
import BugReportIcon from '@mui/icons-material/BugReport';
import BuildIcon from '@mui/icons-material/Build';
import { techStack } from '@/data/techStack';
import { TechStackCategory } from '@/types';

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
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 },
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
      id={`techstack-tabpanel-${index}`}
      aria-labelledby={`techstack-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

const techStackTabs: { key: TechStackCategory; icon: React.ReactElement }[] = [
  { key: 'programming', icon: <CodeIcon /> },
  { key: 'backend', icon: <StorageIcon /> },
  { key: 'frontend', icon: <WebIcon /> },
  { key: 'database', icon: <DataObjectIcon /> },
  { key: 'cloudDevops', icon: <CloudIcon /> },
  { key: 'ai', icon: <SmartToyIcon /> },
  { key: 'dataScience', icon: <BarChartIcon /> },
  { key: 'testing', icon: <BugReportIcon /> },
  { key: 'tools', icon: <BuildIcon /> },
];

export default function TechStackSection() {
  const t = useTranslations('techStackSection');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getTechByCategory = (category: TechStackCategory) => {
    return techStack.filter((tech) => tech.category === category);
  };

  return (
    <Box
      id="techstack"
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
                px: 2,
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
            {techStackTabs.map((tab, index) => (
              <Tab
                key={tab.key}
                icon={tab.icon}
                iconPosition="start"
                label={t(`tabs.${tab.key}`)}
                id={`techstack-tab-${index}`}
                aria-controls={`techstack-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </MotionBox>

        <AnimatePresence mode="wait">
          {techStackTabs.map((tab, index) => (
            <TabPanel key={tab.key} value={tabValue} index={index}>
              <MotionBox
                key={`techstack-${tab.key}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={staggerContainer}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(6, 1fr)',
                  },
                  gap: 2,
                }}
              >
                {getTechByCategory(tab.key).length > 0 ? (
                  getTechByCategory(tab.key).map((tech) => (
                    <MotionBox key={tech.id} variants={itemVariants}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          bgcolor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.05)',
                            borderColor: 'primary.main',
                            transform: 'translateY(-4px)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            mx: 'auto',
                            mb: 1.5,
                            borderRadius: 2,
                            bgcolor: 'rgba(37, 99, 235, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            {tech.name.charAt(0)}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {tech.name}
                        </Typography>
                      </Paper>
                    </MotionBox>
                  ))
                ) : (
                  <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 8 }}>
                    <Typography color="text.secondary">No items to display</Typography>
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
