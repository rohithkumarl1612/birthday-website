import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import Snowfall from '../components/Snowfall';

const photos = [
    { id: 1, type: 'jpg' },
    { id: 2, type: 'jpg' },
    { id: 3, type: 'jpeg' },
    { id: 4, type: 'jpeg' },
    { id: 5, type: 'jpeg' },
    { id: 6, type: 'jpeg' },
    { id: 7, type: 'jpeg' },
    { id: 8, type: 'jpeg' },
    { id: 9, type: 'jpg' },
    { id: 10, type: 'jpg' },
    { id: 11, type: 'jpg' },
    { id: 12, type: 'jpg' },
    { id: 13, type: 'jpg' },
];

const MemoryLanePage = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const rotationRef = useRef(0);
    const isDraggingRef = useRef(false);
    const lastXRef = useRef(0);
    const frameRef = useRef();
    
    // Use state only for initial mount and radius updates
    const [radius, setRadius] = useState({ x: 420, z: 300 });

    useEffect(() => {
        const updateRadius = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setRadius({ x: 170, z: 120 });
            } else {
                setRadius({ x: 420, z: 300 });
            }
        };
        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    // The core animation loop - Direct DOM manipulation for butter-smooth 60fps
    useEffect(() => {
        const updateCards = () => {
            if (!containerRef.current) return;
            
            const cards = containerRef.current.children;
            const currentRotation = rotationRef.current;
            const radX = radius.x;
            const radZ = radius.z;

            if (!isDraggingRef.current) {
                rotationRef.current += 0.12; // Continuous slow rotation
            }

            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                const angle = (i / photos.length) * Math.PI * 2;
                const currentAngle = angle + (currentRotation * Math.PI / 180);

                const x = Math.sin(currentAngle) * radX;
                const z = Math.cos(currentAngle) * radZ;
                
                // Depth effects
                const opacity = (z + radZ) / (2 * radZ) * 0.75 + 0.25;
                const scale = (z + radZ) / (2 * radZ) * 0.4 + 0.6;
                const blur = z < 0 ? Math.abs(z) / 20 : 0;
                const zIndex = Math.round(z + 1000);

                // Apply styles directly to bypass React re-renders
                card.style.transform = `translate3d(${x}px, 0, ${z}px) scale(${scale})`;
                card.style.opacity = opacity;
                card.style.zIndex = zIndex;
                card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
            }

            frameRef.current = requestAnimationFrame(updateCards);
        };

        frameRef.current = requestAnimationFrame(updateCards);
        return () => cancelAnimationFrame(frameRef.current);
    }, [radius]); // Only restart when radius changes

    const handlePointerDown = (e) => {
        isDraggingRef.current = true;
        lastXRef.current = e.clientX || (e.touches && e.touches[0].clientX);
    };

    const handlePointerMove = (e) => {
        if (!isDraggingRef.current) return;
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const delta = x - lastXRef.current;
        rotationRef.current += delta * 0.25;
        lastXRef.current = x;
    };

    const handlePointerUp = () => {
        isDraggingRef.current = false;
    };

    return (
        <div 
            className="w-full h-[100dvh] bg-[#fdf0f5] relative overflow-hidden flex flex-col items-center justify-center p-0 m-0 touch-none select-none"
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
        >
            <Snowfall count={40} /> {/* Optimized snowfall for better performance */}

            {/* Navbar */}
            <nav className="absolute top-0 left-0 right-0 p-6 flex items-start justify-between z-[9999] pointer-events-auto">
                <button
                    onClick={() => navigate('/home')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg text-[#5c1a4a] font-bold border border-white/40 active:scale-95 transition-all mt-1"
                >
                    <ChevronLeft size={20} /> <span className="hidden sm:inline">Back</span>
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="font-playfair text-2xl md:text-4xl font-bold text-[#5c1a4a] drop-shadow-sm leading-tight">
                        Gallery
                    </h1>
                    <p className="text-[#5c1a4a]/35 font-bold tracking-[0.3em] text-[10px] md:text-[11px] uppercase mt-1">
                        Scroll the gallery
                    </p>
                </div>

                <button
                    onClick={() => navigate('/home')}
                    className="p-3.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg text-[#5c1a4a] border border-white/40 active:scale-95 transition-all mt-1"
                >
                    <Home size={22} />
                </button>
            </nav>

            {/* Loop Container - Centered better with vertical padding */}
            <div 
                className="relative w-full h-[65vh] flex items-center justify-center mt-12"
                style={{ perspective: '1400px' }}
            >
                <div 
                    ref={containerRef}
                    className="relative w-full h-full flex items-center justify-center"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="absolute bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border-[4px] md:border-[10px] border-white overflow-hidden will-change-transform"
                            style={{
                                width: 'min(300px, 48vw)',
                                aspectRatio: '3 / 4.2',
                                transition: 'none', // Critical for smooth RAF manipulation
                                backfaceVisibility: 'hidden',
                            }}
                        >
                            <div className="w-full h-full relative rounded-[1.4rem] md:rounded-[2.4rem] overflow-hidden">
                                <img
                                    src={new URL(`../memory_lane/photo_${photo.id}.${photo.type}`, import.meta.url).href}
                                    alt={`Memory ${photo.id}`}
                                    className="w-full h-full object-cover rounded-[1.4rem] md:rounded-[2.4rem]"
                                    loading="lazy"
                                    draggable={false}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        const parent = e.target.parentElement;
                                        if (parent && !parent.querySelector('.fallback')) {
                                            const div = document.createElement('div');
                                            div.className = 'fallback absolute inset-0 flex items-center justify-center bg-pink-50 p-6 text-center';
                                            div.innerHTML = `<p class='text-[#5c1a4a]/40 font-bold text-sm'>Memory ${photo.id}</p>`;
                                            parent.appendChild(div);
                                        }
                                    }}
                                />
                                {/* Soft depth overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-[5%] -right-[5%] w-[45vw] h-[45vw] bg-pink-200/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-[5%] -left-[5%] w-[45vw] h-[45vw] bg-purple-100/15 rounded-full blur-[80px] -z-10" />
        </div>
    );
};

export default MemoryLanePage;
