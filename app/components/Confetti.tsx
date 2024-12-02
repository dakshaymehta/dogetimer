import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Confetti = () => {
  const [confetti, setConfetti] = useState<Array<{ x: number; y: number; rotation: number; color: string }>>([]);

  useEffect(() => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
    const newConfetti = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: -20,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            rotate: piece.rotation,
          }}
          initial={{ y: '-20vh', x: `${piece.x}%` }}
          animate={{
            y: '120vh',
            x: [
              `${piece.x}%`,
              `${piece.x + (Math.random() * 20 - 10)}%`,
              `${piece.x + (Math.random() * 20 - 10)}%`,
              `${piece.x + (Math.random() * 20 - 10)}%`,
            ],
            rotate: piece.rotation + Math.random() * 720,
          }}
          transition={{
            duration: Math.random() * 2.5 + 2.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};
