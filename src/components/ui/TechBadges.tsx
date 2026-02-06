'use client';

import { Box, Chip } from '@mui/material';
import { introTechStack } from '@/data/techStack';

export default function TechBadges() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {introTechStack.map((tech) => (
        <Chip
          key={tech}
          label={tech}
          variant="outlined"
          sx={{
            borderColor: 'rgba(255,255,255,0.2)',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'rgba(37, 99, 235, 0.1)',
            },
          }}
        />
      ))}
    </Box>
  );
}
