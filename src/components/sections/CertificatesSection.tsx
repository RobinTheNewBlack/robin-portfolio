'use client';

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudIcon from '@mui/icons-material/Cloud';
import FunctionsIcon from '@mui/icons-material/Functions';
import CertificateCard from '@/components/ui/CertificateCard';
import { certificates } from '@/data/certificates';
import { CertificateCategory } from '@/types';

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
      id={`certificate-tabpanel-${index}`}
      aria-labelledby={`certificate-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

const certificateTabs: { key: CertificateCategory; icon: React.ReactElement }[] = [
  { key: 'programming', icon: <CodeIcon /> },
  { key: 'ai', icon: <SmartToyIcon /> },
  { key: 'computerFundamental', icon: <ComputerIcon /> },
  { key: 'devops', icon: <CloudIcon /> },
  { key: 'mathematics', icon: <FunctionsIcon /> },
];

export default function CertificatesSection() {
  const t = useTranslations('certificateSection');
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getCertificatesByCategory = (category: CertificateCategory) => {
    return certificates.filter((cert) => cert.category === category);
  };

  return (
    <Box
      id="certificates"
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
            {certificateTabs.map((tab, index) => (
              <Tab
                key={tab.key}
                icon={tab.icon}
                iconPosition={isMobile && tabValue !== index ? 'top' : 'start'}
                label={isMobile ? (tabValue === index ? t(`tabs.${tab.key}`) : undefined) : t(`tabs.${tab.key}`)}
                id={`certificate-tab-${index}`}
                aria-controls={`certificate-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </MotionBox>

        <AnimatePresence mode="wait">
          {certificateTabs.filter((_, index) => index === tabValue).map((tab) => (
            <TabPanel key={tab.key} value={tabValue} index={tabValue}>
              <MotionBox
                key={`certificates-${tab.key}`}
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
                {getCertificatesByCategory(tab.key).length > 0 ? (
                  getCertificatesByCategory(tab.key).map((certificate, idx) => (
                    <MotionBox
                      key={certificate.id}
                      variants={cardVariants}
                      custom={idx}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      <CertificateCard certificate={certificate} />
                    </MotionBox>
                  ))
                ) : (
                  <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 8 }}>
                    <Typography color="text.secondary">{t('noCertificates')}</Typography>
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
