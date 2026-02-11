'use client';

import { Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { navLinks } from '@/data/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ bgcolor: 'background.default', height: '100%', pt: 2 }}>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.id} disablePadding>
            <ListItemButton onClick={() => scrollToSection(link.href)}>
              <ListItemText
                primary={t(link.id)}
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ px: 2, mt: 2 }}>
        <LanguageSwitcher />
      </Box>
    </Box>
  );

  return (
    <>
      {/* Floating Navbar */}
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

        {/* Navigation Links */}
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

        {/* Language Switcher */}
        <Box sx={{ mx: 1 }}>
          <LanguageSwitcher />
        </Box>

      </Box>

      {/* Mobile Navbar */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          right: 16,
          zIndex: 1100,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderRadius: 50,
          bgcolor: 'rgba(20, 20, 30, 0.5)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Logo */}
        <Box
          component="a"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#home');
          }}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0a0a0f',
            }}
          >
            E
          </Box>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: 'background.default',
          },
        }}
      >
        {drawer}
      </Drawer>

    </>
  );
}
