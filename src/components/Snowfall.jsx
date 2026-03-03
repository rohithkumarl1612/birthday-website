import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Snowfall = () => {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        const flakes = Array.from({ length: 70 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage
            size: Math.random() * 6 + 2,
            delay: Math.random() * 10,
            duration: Math.random() * 10 + 10,
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        opacity: 0.72,
                        left: `${flake.x}%`,
                        width: flake.size,
                        height: flake.size,
                        top: -10,
                    }}
                    animate={{
                        y: ['0vh', '110vh'],
                        x: [`${flake.x}%`, `${flake.x + (Math.random() * 10 - 5)}%`],
                    }}
                    transition={{
                        duration: flake.duration,
                        repeat: Infinity,
                        delay: flake.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

export default Snowfall;
