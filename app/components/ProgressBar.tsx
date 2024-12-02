import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  darkMode: boolean;
}

export const ProgressBar = ({ progress, darkMode }: ProgressBarProps) => {
  return (
    <div className="w-full space-y-2">
      <motion.div
        className={`w-full h-6 rounded-xl overflow-hidden ${
          darkMode ? 'bg-white/10' : 'bg-black/10'
        } backdrop-blur-lg border border-white/20 shadow-lg relative`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#45B7D1] relative"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                'linear-gradient(90deg, rgba(255,255,255,0) 100%, rgba(255,255,255,0.3) 150%, rgba(255,255,255,0) 200%)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Progress Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm tracking-wider drop-shadow-lg progress-text">
            {progress.toFixed(2)}%
          </span>
        </div>
      </motion.div>

      {/* Date labels */}
      <div className="flex justify-between text-sm text-white/80">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="font-medium"
        >
          Dec 1, 2024
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="font-medium"
        >
          July 4, 2026
        </motion.span>
      </div>
    </div>
  );
};
