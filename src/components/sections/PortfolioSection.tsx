'use client';

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import { useTranslations } from 'next-intl';
import CodeIcon from '@mui/icons-material/Code';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BuildIcon from '@mui/icons-material/Build';
import ProjectCard from '@/components/ui/ProjectCard';
import CertificateCard from '@/components/ui/CertificateCard';
import TechStackGrid from '@/components/ui/TechStackGrid';
import { projects } from '@/data/projects';
import { certificates } from '@/data/certificates';

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
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              color: 'primary.main',
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
        </Box>

        {/* Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
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
                '&.Mui-selected': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  color: 'text.primary',
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
        </Box>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TechStackGrid />
        </TabPanel>
      </Container>
    </Box>
  );
}
