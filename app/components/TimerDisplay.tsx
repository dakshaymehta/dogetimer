import { TimeLeft } from '../hooks/useCountdown';
import { motion } from 'framer-motion';

interface TimerDisplayProps {
  timeLeft: TimeLeft;
  darkMode: boolean;
}

const timerVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }),
  pulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const glowVariants = {
  initial: { opacity: 0 },
  hover: { 
    opacity: 0.3,
    background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
    transition: { duration: 0.3 }
  }
};

const numberVariants = {
  update: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  }
};

export const TimerDisplay = ({ timeLeft, darkMode }: TimerDisplayProps) => {
  const timeUnits = Object.entries(timeLeft);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
      {timeUnits.map(([unit, value], index) => (
        <motion.div
          key={unit}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={timerVariants}
          whileHover={{ scale: 1.05 }}
          className={`
            timer-card relative overflow-hidden
            ${darkMode ? 'bg-white/5' : 'bg-white/10'}
            backdrop-blur-md rounded-2xl p-4 sm:p-6
            border border-white/20 shadow-lg
            group
          `}
          role="timer"
          aria-label={`${value} ${unit}`}
          data-unit={unit}
        >
          {/* Background Glow Effect */}
          <motion.div
            className="absolute inset-0"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
          />
          
          {/* Value Display */}
          <div className="relative">
            <motion.div
              key={value} 
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2 font-mono relative time-value"
              variants={numberVariants}
              initial={false}
              animate="update"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {value.toString().padStart(2, '0')}
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Unit Label */}
            <div className="text-white/80 text-sm sm:text-lg md:text-xl capitalize group-hover:text-white transition-colors duration-300">
              {unit}
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-white/50 transition-colors duration-300" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 group-hover:border-white/50 transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 group-hover:border-white/50 transition-colors duration-300" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-white/50 transition-colors duration-300" />
        </motion.div>
      ))}
    </div>
  );
};
