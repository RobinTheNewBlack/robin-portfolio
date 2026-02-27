'use client';

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Paper, useMediaQuery, useTheme } from '@mui/material';
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
import AppsIcon from '@mui/icons-material/Apps';
import LockIcon from '@mui/icons-material/Lock';
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
      {value === index && <Box sx={{ pt: 0 }}>{children}</Box>}
    </div>
  );
}

const largerIcons = new Set(['node', 'express', 'fastapi', 'langchain', 'langgraph', 'langsmith', 'pandas', 'numpy', 'cypress']);

const techStackTabs: { key: TechStackCategory | 'all'; icon: React.ReactElement }[] = [
  { key: 'all', icon: <AppsIcon /> },
  { key: 'programming', icon: <CodeIcon /> },
  { key: 'backend', icon: <DataObjectIcon /> },
  { key: 'frontend', icon: <WebIcon /> },
  { key: 'authentication', icon: <LockIcon /> },
  { key: 'database', icon: <StorageIcon /> },
  { key: 'cloudDevops', icon: <CloudIcon /> },
  { key: 'ai', icon: <SmartToyIcon /> },
  { key: 'dataScience', icon: <BarChartIcon /> },
  { key: 'testing', icon: <BugReportIcon /> },
  { key: 'tools', icon: <BuildIcon /> },
];

export default function TechStackSection() {
  const t = useTranslations('techStackSection');
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          sx={{ textAlign: 'left', mb: 6 }}
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
            sx={{ maxWidth: 600 }}
          >
            {t('subtitle')}
          </Typography>
        </MotionBox>

        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            orientation={isMobile ? 'horizontal' : 'vertical'}
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
              minWidth: { md: 200 },
              flexShrink: 0,
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
                px: isMobile ? 1.5 : 2,
                py: isMobile ? 0.75 : 1,
                borderRadius: 2,
                color: 'text.secondary',
                transition: 'all 0.3s ease',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-start',
                textAlign: 'center',
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
            {techStackTabs.map((tab, index) => (
              <Tab
                key={tab.key}
                icon={tab.icon}
                iconPosition={isMobile && tabValue !== index ? 'top' : 'start'}
                label={isMobile ? (tabValue === index ? t(`tabs.${tab.key}`) : undefined) : t(`tabs.${tab.key}`)}
                id={`techstack-tab-${index}`}
                aria-controls={`techstack-tabpanel-${index}`}
              />
            ))}
          </Tabs>

          <Box sx={{ flexGrow: 1 }}>
            <AnimatePresence mode="wait">
              {techStackTabs.map((tab, index) => {
                const items = tab.key === 'all' ? techStack : getTechByCategory(tab.key as TechStackCategory);
                const isAllTab = tab.key === 'all';

                return (
                  <TabPanel key={tab.key} value={tabValue} index={index}>
                    <Box
                      sx={{
                        ...(isAllTab && {
                          maxHeight: { xs: 'calc((100px + 16px) * 4)', sm: 'calc((120px + 16px) * 4)', md: 'calc((130px + 16px) * 4)' },
                          overflowY: 'auto',
                          pr: 1,
                          '&::-webkit-scrollbar': {
                            width: 6,
                          },
                          '&::-webkit-scrollbar-track': {
                            bgcolor: 'rgba(255,255,255,0.02)',
                            borderRadius: 3,
                          },
                          '&::-webkit-scrollbar-thumb': {
                            bgcolor: 'rgba(255,255,255,0.1)',
                            borderRadius: 3,
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,0.2)',
                            },
                          },
                        }),
                      }}
                    >
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
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(4, 1fr)',
                          },
                          gap: 2,
                        }}
                      >
                        {items.length > 0 ? (
                          items.map((tech) => (
                            <MotionBox key={tech.id} variants={itemVariants}>
                              <Paper
                                sx={{
                                  p: 3,
                                  textAlign: 'center',
                                  bgcolor: 'rgba(255,255,255,0.02)',
                                  backdropFilter: 'blur(12px)',
                                  WebkitBackdropFilter: 'blur(12px)',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                  borderRadius: 3,
                                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.06)',
                                    borderColor: 'rgba(37, 99, 235, 0.4)',
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 32px rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
                                  },
                                }}
                              >
                                <Box
                                  sx={{
                                    width: largerIcons.has(tech.icon) ? 80 : 48,
                                    height: 48,
                                    mx: 'auto',
                                    mb: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={`/images/techstacks/${tech.icon}.png`}
                                    alt={tech.name}
                                    sx={{
                                      width: largerIcons.has(tech.icon) ? 80 : 64,
                                      height: largerIcons.has(tech.icon) ? 80 : 64,
                                      objectFit: 'contain',
                                    }}
                                  />
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
                    </Box>
                  </TabPanel>
                );
              })}
            </AnimatePresence>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
