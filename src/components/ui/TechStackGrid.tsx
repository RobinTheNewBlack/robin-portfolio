'use client';

import { Box, Typography, Paper } from '@mui/material';
import { techStack } from '@/data/techStack';

export default function TechStackGrid() {
  return (
    <Box
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
      {techStack.map((tech) => (
        <Paper
          key={tech.id}
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
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {tech.category}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
