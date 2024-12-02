'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useCountdown } from './hooks/useCountdown';
import { FaFlag, FaMoon, FaSun } from 'react-icons/fa';
import { TimerDisplay } from './components/TimerDisplay';
import { SocialLinks } from './components/SocialLinks';
import { Disclaimer } from './components/Disclaimer';
import { Tweet } from './components/Tweet';
import { ScreenshotButton } from './components/ScreenshotButton';
import { ShareButton } from './components/ShareButton';
import { Confetti } from './components/Confetti';
import { ProgressBar } from './components/ProgressBar';

const TARGET_DATE = new Date('July 4, 2026 00:00:00 GMT');
const START_DATE = new Date('December 1, 2024');

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function HomeContent() {
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const timerRef = useRef<HTMLDivElement>(null);
  const timeLeft = useCountdown(TARGET_DATE);

  const calculateProgress = () => {
    const now = new Date().getTime();
    const total = TARGET_DATE.getTime() - START_DATE.getTime();
    const elapsed = now - START_DATE.getTime();
    const progress = (elapsed / total) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-8">
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <main 
      className={`
        min-h-screen transition-all duration-500
        ${darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-[#f4c20d] via-[#e6b800] to-[#ffd700]'
        }
        flex flex-col items-center justify-center p-4 overflow-x-hidden
      `}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="particles absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`particle absolute rounded-full ${darkMode ? 'bg-white/20' : 'bg-white'}`}
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
              }}
            />
          ))}
        </div>
      </div>

      {showConfetti && <Confetti />}

      {/* Theme Toggle */}
      <motion.div className="fixed top-4 right-4 flex gap-4">
        <motion.button
          onClick={() => setShowConfetti(prev => !prev)}
          className="p-3 rounded-full backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle confetti"
        >
          <span className="text-2xl">🎉</span>
        </motion.button>
        <motion.button
          onClick={toggleDarkMode}
          className="p-3 rounded-full backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <FaSun className="w-6 h-6 text-white animate-spin-slow" />
          ) : (
            <FaMoon className="w-6 h-6 text-white animate-bounce-subtle" />
          )}
        </motion.button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8"
      >
        {/* Title Section */}
        <motion.div 
          className="mb-12" 
          variants={itemVariants}
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <motion.span
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                DOGE Timer
              </motion.span>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaFlag className="text-3xl sm:text-4xl md:text-5xl text-white" />
              </motion.div>
            </h1>
            <motion.div
              className="absolute -inset-4 bg-white/10 rounded-lg -z-10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/90"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Counting down to July 4th, 2026 🇺🇸
          </motion.p>
        </motion.div>

        {/* Timer Section with Progress Bar */}
        <motion.div 
          ref={timerRef}
          className={`screenshot-section space-y-8 p-8 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-[#f4c20d]'}`}
          variants={itemVariants}
        >
          {/* Progress Bar */}
          <div className="screenshot-content">
            <ProgressBar progress={calculateProgress()} darkMode={darkMode} />
          </div>

          {/* Timer Display */}
          <div className="screenshot-content">
            <TimerDisplay timeLeft={timeLeft} darkMode={darkMode} />
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <ScreenshotButton 
            targetRef={timerRef.current}
            darkMode={darkMode}
            timeLeft={timeLeft}
            progress={calculateProgress()}
          />
          <ShareButton darkMode={darkMode} />
        </motion.div>

        {/* Tweet Section */}
        <motion.div variants={itemVariants}>
          <Tweet darkMode={darkMode} />
        </motion.div>

        {/* Social Links and Disclaimer */}
        <motion.div 
          className="space-y-8"
          variants={itemVariants}
        >
          <SocialLinks />
          <Disclaimer darkMode={darkMode} />
        </motion.div>
      </motion.div>
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
