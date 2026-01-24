'use client';

import { Box, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { socialLinks } from '@/data/navigation';

const iconMap: { [key: string]: React.ReactNode } = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  instagram: <InstagramIcon />,
};

export default function SocialLinks() {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {socialLinks.map((link) => (
        <IconButton
          key={link.id}
          component="a"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.ariaLabel}
          sx={{
            color: 'text.secondary',
            border: '1px solid rgba(255,255,255,0.1)',
            '&:hover': {
              color: 'primary.main',
              borderColor: 'primary.main',
              bgcolor: 'rgba(139, 92, 246, 0.1)',
            },
          }}
        >
          {iconMap[link.platform]}
        </IconButton>
      ))}
    </Box>
  );
}
