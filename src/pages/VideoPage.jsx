import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Snowfall from '../components/Snowfall';

const VideoPage = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.0; // Make it play slightly slower
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                background: '#fdf0f5' // Matches HomeScreen background
            }}
        >
            {/* Snow ❄️ */}
            <Snowfall />

            {/* ── Nav ── */}
            <nav style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 28px',
                zIndex: 20,
            }}>
                <motion.button
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'rgba(92, 26, 74, 0.08)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(92, 26, 74, 0.15)',
                        borderRadius: 50, padding: '10px 14px',
                        display: 'flex', alignItems: 'center', gap: 6,
                        color: '#5c1a4a', cursor: 'pointer',
                        fontSize: '0.85rem', fontWeight: 600,
                    }}
                >
                    <ChevronLeft size={18} /> Back
                </motion.button>

                <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                    fontWeight: 700,
                    color: '#7b1d5e',
                    textShadow: '0 2px 16px rgba(180, 50, 120, 0.12)',
                    letterSpacing: '-0.02em',
                }}>
                    Her Video
                </span>

                <motion.button
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                    onClick={() => navigate('/home')}
                    style={{
                        background: 'rgba(92, 26, 74, 0.08)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(92, 26, 74, 0.15)',
                        borderRadius: 50, padding: '10px 14px',
                        display: 'flex', alignItems: 'center', gap: 6,
                        color: '#5c1a4a', cursor: 'pointer',
                    }}
                >
                    <Home size={18} />
                </motion.button>
            </nav>

            {/* ── Video Player — centered ── */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '90px 5% 40px',
                zIndex: 10,
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
                    style={{
                        width: '100%',
                        maxWidth: 600, // Better suited for portrait/square phone videos
                        borderRadius: 24,
                        overflow: 'hidden',
                        boxShadow: '0 40px 100px rgba(180, 50, 120, 0.25), 0 0 0 1px rgba(92, 26, 74, 0.1)',
                        position: 'relative',
                        background: '#1a0b16', // Dark background for a cinematic feel
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <video
                        ref={videoRef}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '75vh',
                            display: 'block',
                            objectFit: 'cover' // Makes it fill the container perfectly
                        }}
                        src="/birthday_video.mp4"
                        controls
                        autoPlay
                        loop
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>

                    {/* Thin border overlay */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        borderRadius: 24,
                        border: '1px solid rgba(92, 26, 74, 0.1)',
                        pointerEvents: 'none',
                    }} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default VideoPage;
