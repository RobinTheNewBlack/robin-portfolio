'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { navLinks } from '@/data/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const navIcons: Record<string, React.ReactNode> = {
  home: <HomeRoundedIcon fontSize="small" />,
  about: <PersonRoundedIcon fontSize="small" />,
  techStack: <CodeRoundedIcon fontSize="small" />,
  projects: <FolderRoundedIcon fontSize="small" />,
  certificates: <WorkspacePremiumRoundedIcon fontSize="small" />,
  experience: <BusinessCenterRoundedIcon fontSize="small" />,
  contact: <EmailRoundedIcon fontSize="small" />,
};

export default function Navbar() {
  const t = useTranslations('nav');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight / 2;
      let current = navLinks[0].href.replace('#', '');

      for (const link of navLinks) {
        const sectionId = link.href.replace('#', '');
        const el = document.getElementById(sectionId);
        if (!el) continue;
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        if (elTop <= scrollMid) {
          current = sectionId;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* ── Desktop Floating Navbar ── */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1100,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          borderRadius: 50,
          bgcolor: 'rgba(20, 20, 30, 0.5)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        {navLinks.map((link) => (
          <Button
            key={link.id}
            onClick={() => scrollToSection(link.href)}
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem',
              fontWeight: 500,
              px: 2,
              py: 0.75,
              borderRadius: 50,
              textTransform: 'none',
              '&:hover': {
                color: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {t(link.id)}
          </Button>
        ))}

        <Box sx={{ mx: 1 }}>
          <LanguageSwitcher />
        </Box>
      </Box>

      {/* ── Mobile: Language Switcher (top-right) ── */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1100,
          display: { xs: 'flex', md: 'none' },
        }}
      >
        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 50,
            bgcolor: 'rgba(20, 20, 30, 0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}
        >
          <LanguageSwitcher />
        </Box>
      </Box>

      {/* ── Mobile: Floating Bottom Dock ── */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1100,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          gap: 0.5,
          px: 1.5,
          py: 1,
          borderRadius: 50,
          bgcolor: 'rgba(20, 20, 30, 0.65)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        }}
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <Tooltip key={link.id} title={t(link.id)} placement="top" arrow>
              <IconButton
                onClick={() => scrollToSection(link.href)}
                size="small"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  color: isActive ? 'white' : 'rgba(255, 255, 255, 0.45)',
                  bgcolor: isActive
                    ? 'primary.main'
                    : 'transparent',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    color: 'white',
                    bgcolor: isActive
                      ? 'primary.dark'
                      : 'rgba(255, 255, 255, 0.12)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {navIcons[link.id]}
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>
    </>
  );
}
