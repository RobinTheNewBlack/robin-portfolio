'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PublicIcon from '@mui/icons-material/Public';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

interface StatCardProps {
  value: number;
  label: string;
  description: string;
  icon: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  code: <CodeIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
  certificate: <WorkspacePremiumIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
  globe: <PublicIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
};

export default function StatCard({ value, label, description, icon }: StatCardProps) {
  return (
    <Card
      sx={{
        bgcolor: 'rgba(255,255,255,0.03)',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.05)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'rgba(37, 99, 235, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {iconMap[icon] || iconMap.code}
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            {value}
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <ArrowOutwardIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        </Box>
      </CardContent>
    </Card>
  );
}
