import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Snowfall from './Snowfall';
import CuteBlob from './CuteBlob';

const IntroScreen = ({ onComplete }) => {
    const message = "On this beautiful day, a girl was born.... Congratulations. You are no longer a teenager. You are now a twenty-year-old. Which means you are now officially 'Dodd Katthe'. Happy Birthday, Akshuuu! I have something special for you today.";
    const words = message.split(" ");

    const [showWords, setShowWords] = useState(false);
    const [stage, setStage] = useState('wishes'); // 'wishes', 'confirm', 'no'

    useEffect(() => {
        const timer = setTimeout(() => setShowWords(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const staggerDelay = 0.15; // seconds per word
    const totalAnimDuration = 1 + words.length * staggerDelay + 1; // 1s startup + stagger + 1s grace

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: staggerDelay, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(4px)',
        },
    };

    const handleEnter = () => {
        setStage('confirm');
    };

    const handleYes = () => {
        onComplete();
    };

    const handleNo = () => {
        setStage('no');
        setTimeout(() => setStage('confirm'), 3000);
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center p-8 animated-mesh-bg overflow-hidden">
            <Snowfall />

            <AnimatePresence mode="wait">
                {stage === 'wishes' && (
                    <motion.div
                        key="wishes"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center"
                    >
                        {showWords && (
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-wrap justify-center max-w-2xl gap-x-2 gap-y-4 text-center"
                            >
                                {words.map((word, index) => (
                                    <motion.span
                                        variants={child}
                                        key={index}
                                        className="text-2xl md:text-3xl font-playfair font-bold text-primary-dark"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: totalAnimDuration, duration: 0.8 }}
                            onClick={handleEnter}
                            className="mt-12 glass-button text-primary-dark font-medium flex items-center gap-2 group"
                        >
                            Your surprise awaits
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </motion.button>
                    </motion.div>
                )}

                {(stage === 'confirm' || stage === 'no') && (
                    <motion.div
                        key="popup"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative z-10"
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute -top-16 -left-16 w-32 h-32 z-20 pointer-events-none"
                        >
                            <CuteBlob className="w-full h-full drop-shadow-2xl" />
                        </motion.div>

                        <div className="glass-card p-10 max-w-sm w-full shadow-2xl relative overflow-visible flex flex-col items-center text-center">
                            <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-6">
                                {stage === 'confirm'
                                    ? "Do you want see what's there for you?"
                                    : "T Muchkond Nodu"}
                            </h2>

                            {stage === 'confirm' ? (
                                <div className="flex gap-4 w-full">
                                    <button
                                        onClick={handleYes}
                                        className="flex-1 py-3 px-6 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all active:scale-95 shadow-lg"
                                    >
                                        Yes!
                                    </button>
                                    <button
                                        onClick={handleNo}
                                        className="flex-1 py-3 px-6 bg-white/50 text-primary-dark border border-primary/20 rounded-xl font-bold hover:bg-white transition-all active:scale-95"
                                    >
                                        No
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                                    className="text-primary font-bold text-lg"
                                >

                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IntroScreen;
