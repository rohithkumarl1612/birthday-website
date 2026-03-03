import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Stack from '../components/ui/Stack';
import { ChevronLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Snowfall from '../components/Snowfall';

const magazineFrames = [
    new URL('../magzine/frame_1.svg', import.meta.url).href,
    new URL('../magzine/frame_2.svg', import.meta.url).href,
    new URL('../magzine/frame_3.svg', import.meta.url).href,
    new URL('../magzine/frame_4.svg', import.meta.url).href,
    new URL('../magzine/frame_5.svg', import.meta.url).href,
].reverse();

const MagazinePage = () => {
    const navigate = useNavigate();
    const stackRef = useRef(null);

    const cards = magazineFrames.map((frame, i) => (
        <div key={i} className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-lg">
            <img
                src={frame}
                alt={`Magazine Page ${i + 1}`}
                className="w-full h-full object-contain"
                draggable={false}
            />
        </div>
    ));

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

            {/* ── Nav: Matching VideoPage Style ── */}
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
                    Birthday Magazine
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

            <main style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '100px 5% 60px',
                zIndex: 10,
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: 900,
                    aspectRatio: '16 / 9',
                    position: 'relative',
                }}>
                    <Stack
                        ref={stackRef}
                        cards={cards}
                        sensitivity={150}
                        sendToBackOnClick={true}
                        randomRotation={true}
                        autoplay={false}
                    />
                </div>
            </main>

            <div style={{
                position: 'absolute', bottom: 20, left: 0, right: 0,
                textAlign: 'center',
                zIndex: 20,
            }}>
                <p style={{
                    color: 'rgba(92, 26, 74, 0.4)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}>
                    Tap cards to flip through
                </p>
            </div>
        </motion.div>
    );
};

export default MagazinePage;
