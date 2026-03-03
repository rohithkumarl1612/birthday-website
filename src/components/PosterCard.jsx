import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const PosterCard = ({ imageSrc, title, description }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.05 }}
            className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-rosegold to-primary p-1 shadow-2xl cursor-pointer"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 grid place-content-center rounded-xl bg-white/40 shadow-lg backdrop-blur-md"
            >
                <img
                    src={imageSrc || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800"}
                    alt={title}
                    className="h-full w-full object-cover rounded-lg"
                    style={{ transform: "translateZ(50px)" }}
                />
                <div
                    className="absolute bottom-4 left-4 right-4 text-primary-dark"
                    style={{ transform: "translateZ(100px)" }}
                >
                    <p className="text-center text-xl font-bold font-playfair">{title}</p>
                    <p className="text-center text-xs opacity-70 font-inter">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default PosterCard;
