'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const orbs = [
  {
    color: 'rgba(37, 99, 235, 0.15)',
    size: { xs: 300, md: 500 },
    top: '-5%',
    left: '-10%',
    duration: 20,
    delay: 0,
  },
  {
    color: 'rgba(6, 182, 212, 0.12)',
    size: { xs: 250, md: 400 },
    top: '30%',
    right: '-8%',
    duration: 25,
    delay: 2,
  },
  {
    color: 'rgba(79, 70, 229, 0.1)',
    size: { xs: 200, md: 350 },
    top: '60%',
    left: '5%',
    duration: 22,
    delay: 4,
  },
  {
    color: 'rgba(37, 99, 235, 0.08)',
    size: { xs: 280, md: 450 },
    bottom: '5%',
    right: '10%',
    duration: 28,
    delay: 1,
  },
  {
    color: 'rgba(6, 182, 212, 0.06)',
    size: { xs: 180, md: 300 },
    top: '15%',
    left: '40%',
    duration: 24,
    delay: 3,
  },
];

export default function BackgroundOrbs() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <MotionBox
          key={i}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.05, 0.95, 1.02, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
          sx={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: { xs: 'blur(60px)', md: 'blur(80px)' },
            ...(orb.top !== undefined && { top: orb.top }),
            ...(orb.bottom !== undefined && { bottom: orb.bottom }),
            ...(orb.left !== undefined && { left: orb.left }),
            ...(orb.right !== undefined && { right: orb.right }),
          }}
        />
      ))}
    </Box>
  );
}
