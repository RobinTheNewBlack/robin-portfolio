'use client';

import { Box, Chip } from '@mui/material';
import { heroTechStack } from '@/data/techStack';

export default function TechBadges() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {heroTechStack.map((tech) => (
        <Chip
          key={tech}
          label={tech}
          variant="outlined"
          sx={{
            borderColor: 'rgba(255,255,255,0.2)',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'rgba(139, 92, 246, 0.1)',
            },
          }}
        />
      ))}
    </Box>
  );
}
