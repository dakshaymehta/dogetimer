import { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { toPng } from 'html-to-image';
import { TimeLeft } from '@/app/types';
import { ScreenshotOverlay } from './ScreenshotOverlay';
import { createRoot } from 'react-dom/client';

interface ScreenshotButtonProps {
  targetRef: React.RefObject<HTMLElement>;
  darkMode: boolean;
  timeLeft: TimeLeft;
  progress: number;
}

export const ScreenshotButton = ({ darkMode, timeLeft, progress }: ScreenshotButtonProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const takeScreenshot = async () => {
    if (isCapturing) return;

    try {
      setIsCapturing(true);

      // Create container for screenshot
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.width = '800px'; // Fixed width for consistent screenshots
      document.body.appendChild(container);

      // Create React root and render screenshot overlay
      const root = createRoot(container);
      await new Promise<void>(resolve => {
        root.render(
          <ScreenshotOverlay
            timeLeft={timeLeft}
            progress={progress}
            darkMode={darkMode}
          />
        );
        // Wait for render to complete
        setTimeout(resolve, 100);
      });

      try {
        // Create timestamp for filename
        const date = new Date();
        const formattedDate = date.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).replace(/[/:]/g, '-').replace(/,/g, '');

        // Capture the screenshot
        const dataUrl = await toPng(container, {
          quality: 1,
          pixelRatio: 2,
        });

        // Download the image
        const link = document.createElement('a');
        link.download = `doge-timer-${formattedDate}.png`;
        link.href = dataUrl;
        link.click();

        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000);
      } finally {
        // Clean up
        root.unmount();
        document.body.removeChild(container);
      }
    } catch (err) {
      console.error('Error taking screenshot:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={takeScreenshot}
        disabled={isCapturing}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-full
          backdrop-blur-md transition-all duration-300
          ${isCapturing ? 'scale-95 opacity-75' : 'hover:scale-105'}
          ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}
          shadow-lg hover:shadow-xl
          disabled:cursor-not-allowed
        `}
        aria-label="Take screenshot"
      >
        <FaCamera className={`w-5 h-5 ${isCapturing ? 'animate-pulse' : ''} text-white`} />
        <span className="text-white font-medium">
          {isCapturing ? 'Capturing...' : 'Screenshot'}
        </span>
      </button>

      {/* Success Message */}
      <div
        className={`
          absolute top-full left-1/2 -translate-x-1/2 mt-4
          bg-green-500 text-white px-4 py-2 rounded-full
          transform transition-all duration-300
          ${showFeedback ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        `}
      >
        Screenshot saved!
      </div>
    </div>
  );
};
