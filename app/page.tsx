'use client';

import { useEffect, useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { FaFlag, FaCamera, FaShare, FaMoon, FaSun } from 'react-icons/fa';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const SocialLink = ({ href, children, label }: { href: string; children: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors duration-300"
    aria-label={label}
  >
    {children}
  </a>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const timerRef = useRef<HTMLDivElement>(null);
  const tweetRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const targetDate = new Date('July 4, 2026 00:00:00 GMT').getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const takeScreenshot = async () => {
    if (timerRef.current) {
      try {
        const dataUrl = await toPng(timerRef.current, { quality: 0.95 });
        const link = document.createElement('a');
        link.download = `doge-timer-${new Date().toISOString()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error taking screenshot:', err);
      }
    }
  };

  const shareTimer = async () => {
    try {
      await navigator.share({
        title: 'DOGE Timer',
        text: 'Check out this countdown to DOGE\'s self-deletion!',
        url: window.location.href
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

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
    <main className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-[#f4c20d] via-[#e6b800] to-[#ffd700]'
    } flex flex-col items-center justify-center p-4 overflow-x-hidden`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full animate-float opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${darkMode ? 'bg-white/20' : 'bg-white'}`}
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 3 + 2}s linear infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* Theme toggle button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {darkMode ? <FaSun className="w-6 h-6 text-white" /> : <FaMoon className="w-6 h-6 text-white" />}
      </button>

      <div className="relative z-10 text-center max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-12" ref={timerRef}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 animate-bounce flex items-center justify-center gap-3">
            DOGE Timer
            <FaFlag className="text-3xl sm:text-4xl md:text-5xl text-white animate-pulse" />
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 animate-pulse flex items-center justify-center gap-2">
            Counting down to July 4th, 2026 🇺🇸
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className={`${
                darkMode ? 'bg-white/5' : 'bg-white/10'
              } backdrop-blur-md rounded-2xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl`}
            >
              <div className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2 font-mono">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-white/80 text-sm sm:text-lg md:text-xl capitalize">
                {unit}
              </div>
            </div>
          ))}
        </div>

        {/* Screenshot and Share buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={takeScreenshot}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors duration-300 text-white"
          >
            <FaCamera className="w-5 h-5" /> Screenshot
          </button>
          <button
            onClick={shareTimer}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors duration-300 text-white"
          >
            <FaShare className="w-5 h-5" /> Share
          </button>
        </div>

        {/* Tweet section */}
        <div className="mb-12 w-full max-w-xl mx-auto">
          <div className={`${
            darkMode ? 'bg-white/5' : 'bg-white/10'
          } backdrop-blur-md rounded-2xl p-6 border border-white/20 flex justify-center`}>
            <div className="w-full max-w-[550px]" ref={tweetRef}>
              <blockquote className="twitter-tweet">
                <p lang="en" dir="ltr">
                  The final step of <a href="https://twitter.com/DOGE?ref_src=twsrc%5Etfw">@DOGE</a> is to delete itself{' '}
                  <a href="https://t.co/ZCj2NvHm1U">https://t.co/ZCj2NvHm1U</a>
                </p>
                &mdash; Elon Musk (@elonmusk){' '}
                <a href="https://twitter.com/elonmusk/status/1863666221301764462?ref_src=twsrc%5Etfw">
                  December 2, 2024
                </a>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center space-x-6">
            <SocialLink href="https://twitter.com/fibnewtonian" label="Twitter">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://github.com/dakshaymehta" label="GitHub">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </SocialLink>
          </div>

          <div className={`${
            darkMode ? 'bg-black/30' : 'bg-black/10'
          } backdrop-blur-md rounded-xl p-6 max-w-2xl mx-auto`}>
            <p className="text-white/80 text-sm md:text-base">
              Disclaimer: This website is not affiliated with Dogecoin or any cryptocurrency.
              This is just a fun countdown timer. Much wow! 🐕
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
