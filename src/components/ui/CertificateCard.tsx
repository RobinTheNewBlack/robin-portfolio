'use client';

import { Card, CardContent, CardMedia, Typography, Link, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import LaunchIcon from '@mui/icons-material/Launch';
import { Certificate } from '@/types';

interface CertificateCardProps {
  certificate: Certificate;
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const t = useTranslations();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'rgba(255,255,255,0.03)',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.05)',
        },
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: 180,
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Certificate Image
        </Typography>
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {t(certificate.titleKey)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {t(certificate.issuerKey)} | {certificate.date}
          </Typography>
          {certificate.credentialUrl && (
            <Link
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.light',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <LaunchIcon sx={{ fontSize: 18 }} />
            </Link>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
