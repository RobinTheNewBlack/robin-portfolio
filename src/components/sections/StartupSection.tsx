'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Dialog, IconButton, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CloseIcon from '@mui/icons-material/Close';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MotionBox = motion.create(Box);

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' as const },
    },
};

const startupImages = [
    "/images/startup/pettopia1.png",
    "/images/startup/pettopia2.png",
    "/images/startup/pettopia3.png",
    "/images/startup/pettopia4.png",
    "/images/startup/pettopia5.png",
    "/images/startup/pettopia6.png",
    "/images/startup/pettopia7.png",
    "/images/startup/pettopia8.png",
    "/images/startup/pettopia9.png",
    "/images/startup/pettopia10.png",
    "/images/startup/pettopia11.png",
    "/images/startup/pettopia12.png"
];

export default function StartupSection() {
    const t = useTranslations('startupSection');
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;
            if (e.key === 'ArrowLeft') {
                setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : startupImages.length - 1));
            }
            if (e.key === 'ArrowRight') {
                setSelectedImage((prev) => (prev !== null && prev < startupImages.length - 1 ? prev + 1 : 0));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    return (
        <Box
            id="startup"
            component="section"
            className="bg-about-gradient"
            sx={{
                py: { xs: 8, md: 12 },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                <MotionBox
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    sx={{ textAlign: 'center', mb: 8 }}
                >
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2,
                            py: 1,
                            borderRadius: '20px',
                            bgcolor: 'rgba(56, 189, 248, 0.1)',
                            color: '#38bdf8',
                            mb: 3,
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                        }}
                    >
                        <RocketLaunchIcon sx={{ fontSize: 18 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {t('title')}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            color: '#f8fafc',
                            fontSize: { xs: '2.5rem', md: '3.5rem' }
                        }}
                    >
                        {t('projectName')}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ maxWidth: 700, mx: 'auto', color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8 }}
                    >
                        {t('projectDescription')}
                    </Typography>
                </MotionBox>
            </Container>

            {/* 3D Coverflow Carousel Image Gallery */}
            <MotionBox
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                sx={{
                    position: 'relative',
                    pb: { xs: 8, md: 10 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: { xs: 350, sm: 450, md: 550, lg: 650 },
                    overflow: 'hidden',
                }}
            >
                {/* Left Navigation Arrow */}
                <IconButton
                    onClick={() => setActiveIndex(prev => prev === 0 ? startupImages.length - 1 : prev - 1)}
                    sx={{
                        position: 'absolute',
                        left: { xs: 8, md: 32 },
                        zIndex: 20,
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        display: { xs: 'none', sm: 'flex' }
                    }}
                >
                    <ChevronLeftIcon fontSize="large" />
                </IconButton>

                <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {startupImages.map((src, index) => {
                        let offset = index - activeIndex;
                        if (offset < -Math.floor(startupImages.length / 2)) offset += startupImages.length;
                        else if (offset > Math.floor(startupImages.length / 2)) offset -= startupImages.length;

                        const isActive = offset === 0;
                        const isPrev = offset === -1;
                        const isNext = offset === 1;
                        const isPrev2 = offset === -2;
                        const isNext2 = offset === 2;

                        let scale = 0.4;
                        let x = offset < 0 ? '-180%' : '180%';
                        let zIndex = 1;
                        let opacity = 0;

                        if (isActive) {
                            scale = 1; x = '0%'; zIndex = 10; opacity = 1;
                        } else if (isPrev) {
                            scale = 0.75; x = '-30%'; zIndex = 9; opacity = 0.7;
                        } else if (isNext) {
                            scale = 0.75; x = '30%'; zIndex = 9; opacity = 0.7;
                        } else if (isPrev2) {
                            scale = 0.55; x = '-50%'; zIndex = 8; opacity = 0.3;
                        } else if (isNext2) {
                            scale = 0.55; x = '50%'; zIndex = 8; opacity = 0.3;
                        } else {
                            zIndex = 7;
                        }

                        // Reflection Effect overlay
                        return (
                            <MotionBox
                                key={index}
                                initial={false}
                                animate={{
                                    scale,
                                    x,
                                    opacity,
                                    zIndex,
                                    filter: isActive ? 'blur(0px)' : 'blur(2px)'
                                }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                onClick={() => {
                                    if (isActive) setSelectedImage(index);
                                    else setActiveIndex(index);
                                }}
                                sx={{
                                    position: 'absolute',
                                    width: { xs: '65%', sm: '55%', md: '45%', lg: '40%' },
                                    cursor: isActive ? 'zoom-in' : 'pointer',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: isActive ? '0 25px 50px -12px rgba(0,0,0,0.7)' : '0 10px 30px rgba(0,0,0,0.5)',
                                    border: '1px solid',
                                    borderColor: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                                    pointerEvents: opacity === 0 ? 'none' : 'auto',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={src}
                                    alt={`${t('projectName')} screenshot ${index + 1}`}
                                    loading="lazy"
                                    sx={{
                                        width: '100%',
                                        display: 'block',
                                    }}
                                />
                                {!isActive && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            bgcolor: 'rgba(0,0,0,0.4)',
                                            transition: 'background-color 0.3s',
                                            '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
                                        }}
                                    />
                                )}
                            </MotionBox>
                        );
                    })}
                </Box>

                {/* Right Navigation Arrow */}
                <IconButton
                    onClick={() => setActiveIndex(prev => prev === startupImages.length - 1 ? 0 : prev + 1)}
                    sx={{
                        position: 'absolute',
                        right: { xs: 8, md: 32 },
                        zIndex: 20,
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        display: { xs: 'none', sm: 'flex' }
                    }}
                >
                    <ChevronRightIcon fontSize="large" />
                </IconButton>

                {/* Pagination Dots */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: { xs: 16, md: 32 },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1.5,
                        zIndex: 20,
                    }}
                >
                    {startupImages.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            sx={{
                                width: activeIndex === index ? 32 : 8,
                                height: 8,
                                borderRadius: 4,
                                bgcolor: activeIndex === index ? '#38bdf8' : 'rgba(255,255,255,0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: activeIndex === index ? '#38bdf8' : 'rgba(255,255,255,0.4)',
                                }
                            }}
                        />
                    ))}
                </Box>
            </MotionBox>

            {/* Lightbox Dialog */}
            <Dialog
                open={selectedImage !== null}
                onClose={() => setSelectedImage(null)}
                maxWidth="xl"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
                        m: { xs: 1, sm: 2 }
                    }
                }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                            backdropFilter: 'blur(8px)',
                        }
                    }
                }}
            >
                <Box
                    onClick={() => setSelectedImage(null)}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        outline: 'none',
                    }}
                >
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        sx={{
                            position: 'absolute',
                            top: { xs: 16, sm: 32 },
                            right: { xs: 16, sm: 32 },
                            color: '#fff',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                            zIndex: 10
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : startupImages.length - 1));
                        }}
                        sx={{
                            position: 'absolute',
                            left: { xs: 8, sm: 32 },
                            color: '#fff',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.3)' },
                            zIndex: 10
                        }}
                    >
                        <ChevronLeftIcon fontSize="large" />
                    </IconButton>

                    {selectedImage !== null && (
                        <Box
                            component="img"
                            src={startupImages[selectedImage]}
                            onClick={(e) => e.stopPropagation()}
                            alt="Fullscreen view"
                            sx={{
                                maxWidth: '100%',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            }}
                        />
                    )}

                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage((prev) => (prev !== null && prev < startupImages.length - 1 ? prev + 1 : 0));
                        }}
                        sx={{
                            position: 'absolute',
                            right: { xs: 8, sm: 32 },
                            color: '#fff',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.3)' },
                            zIndex: 10
                        }}
                    >
                        <ChevronRightIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Dialog>
        </Box>
    );
}
