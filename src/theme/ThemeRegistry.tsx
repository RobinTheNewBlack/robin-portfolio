'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from './theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function ThemeRegistry({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
