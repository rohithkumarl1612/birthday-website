import React from 'react';
import { motion } from 'framer-motion';
import Photo1 from '../Photo1.svg';

const HeroSection = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
            width: '80%',
            maxWidth: 900,
            margin: '0 auto 2rem auto',
            borderRadius: 28,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
            aspectRatio: '16 / 9',
        }}
    >
        <img
            src={Photo1}
            alt="Birthday"
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
            }}
            draggable={false}
        />
    </motion.div>
);

export default HeroSection;
