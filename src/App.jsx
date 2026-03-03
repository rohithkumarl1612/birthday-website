import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';
import MagazinePage from './pages/MagazinePage';
import VideoPage from './pages/VideoPage';
import MemoryLanePage from './pages/MemoryLanePage';
import confetti from 'canvas-confetti';

function AppContent() {
  const [stage, setStage] = useState('intro');
  const navigate = useNavigate();
  const location = useLocation();

  const handleIntroComplete = () => {
    setStage('home');
    navigate('/home');
  };

  useEffect(() => {
    if (location.pathname === '/home') {
      setStage('home');
      // Trigger birthday confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FFB6C1', '#E0BFB8', '#F7E7CE']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FFB6C1', '#E0BFB8', '#F7E7CE']
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IntroScreen onComplete={handleIntroComplete} />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/magazine" element={<MagazinePage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/gallery" element={<MemoryLanePage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
