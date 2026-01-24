'use client';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'th', label: 'TH' },
];

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newLocale: string | null) => {
    if (newLocale && newLocale !== currentLocale) {
      startTransition(() => {
        document.cookie = `next_locale=${newLocale};path=/;max-age=31536000`;
        window.location.reload();
      });
    }
  };

  return (
    <ToggleButtonGroup
      value={currentLocale}
      exclusive
      onChange={handleChange}
      disabled={isPending}
      size="small"
      sx={{
        bgcolor: 'rgba(255,255,255,0.1)',
        borderRadius: 50,
        overflow: 'hidden',
        '& .MuiToggleButton-root': {
          color: 'rgba(255,255,255,0.7)',
          border: 'none',
          px: 2,
          py: 0.5,
          fontSize: '0.8rem',
          fontWeight: 500,
          borderRadius: 50,
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 50,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          },
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.15)',
          },
        },
      }}
    >
      {locales.map((locale) => (
        <ToggleButton key={locale.code} value={locale.code}>
          {locale.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
