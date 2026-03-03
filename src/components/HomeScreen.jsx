import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Video, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Photo1 from '../Photo1.svg';
import Snowfall from './Snowfall';

const HomeScreen = () => {
    const navigate = useNavigate();

    const [hasVisited, setHasVisited] = React.useState(() => {
        return sessionStorage.getItem('hasVisitedHome') === 'true';
    });

    React.useEffect(() => {
        if (!hasVisited) {
            sessionStorage.setItem('hasVisitedHome', 'true');
        }
    }, [hasVisited]);

    const cards = [
        {
            title: "Her Magazine",
            icon: <BookOpen className="w-7 h-7" />,
            description: "About just you.",
            gradient: 'from-pink-100 to-pink-200',
            accent: 'text-pink-700',
            bgAccent: 'bg-pink-700/10',
            onClick: () => navigate('/magazine'),
        },
        {
            title: "Her Video",
            icon: <Video className="w-7 h-7" />,
            description: "A video for you",
            gradient: 'from-purple-100 to-purple-200',
            accent: 'text-purple-700',
            bgAccent: 'bg-purple-700/10',
            onClick: () => navigate('/video'),
        },
        {
            title: "Gallery",
            icon: <Heart className="w-7 h-7" />,
            description: "Your memories",
            gradient: 'from-rose-100 to-rose-200',
            accent: 'text-rose-700',
            bgAccent: 'bg-rose-700/10',
            onClick: () => navigate('/gallery'),
        },
    ];

    return (
        <div className="bg-[#fdf0f5] min-h-screen overflow-x-hidden">

            {/* ── HERO: Responsive Full-Screen Photo ── */}
            <section className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
                <img
                    src={Photo1}
                    alt="Birthday"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                    draggable={false}
                />

                {/* Overlays for better depth and readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdf0f5] via-transparent to-black/10 pointer-events-none" />

                {/* Snow Effect */}
                <Snowfall />

                {/* Scroll Cue (Higher z-index and better positioning) */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
                >
                    <span className="text-[0.65rem] font-bold tracking-[0.2em] text-pink-900/40 uppercase">
                        scroll
                    </span>
                    <div className="w-[18px] h-[28px] border-2 border-pink-900/20 rounded-full flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                            className="w-1 h-2 bg-pink-900/30 rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ── CONTENT SECTION ── */}
            <section className="px-6 py-20 max-w-6xl mx-auto">

                {/* Birthday Wish */}
                <motion.div
                    initial={hasVisited ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <motion.p
                        initial={hasVisited ? { letterSpacing: '0.04em', opacity: 1 } : { letterSpacing: '0.25em', opacity: 0 }}
                        whileInView={{ letterSpacing: '0.04em', opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
                        style={{
                            margin: 0,
                            fontFamily: "'Pinyon Script', cursive",
                            fontSize: 'clamp(2.4rem, 7vw, 4.5rem)',
                            color: '#7b1d5e',
                            lineHeight: 1.2,
                            textShadow: '0 2px 20px rgba(180,50,120,0.15)',
                        }}
                    >
                        Wish you Happy Birthday Akshu💝
                    </motion.p>
                    <motion.div
                        initial={hasVisited ? { scaleX: 1 } : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
                        className="h-0.5 w-32 md:w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-[#c2185b] to-transparent"
                    />
                </motion.div>

                <motion.h2
                    initial={hasVisited ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center font-cormorant italic text-2xl md:text-4xl font-semibold text-[#5c1a4a] mb-12"
                >
                    Your special day awaits
                </motion.h2>

                {/* Cards Grid: Responsive 1 col on mobile, 3 col on desktop */}
                <motion.div
                    initial={hasVisited ? "show" : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.15 } },
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                >
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
                            }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={card.onClick}
                            className={`bg-gradient-to-br ${card.gradient} rounded-[2rem] p-8 cursor-pointer shadow-sm hover:shadow-xl border border-white/50 transition-all duration-300 flex flex-col gap-6`}
                        >
                            {/* Icon Bubble */}
                            <div className={`w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center ${card.accent} shadow-sm backdrop-blur-md`}>
                                {card.icon}
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className={`font-playfair font-bold text-xl md:text-2xl ${card.accent.replace('700', '900')}`}>
                                    {card.title}
                                </h3>
                                <p className="font-inter text-sm md:text-base text-black/60 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                            <div className={`mt-auto font-bold text-sm tracking-wide ${card.accent} opacity-80`}>
                                Open Experience →
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default HomeScreen;
