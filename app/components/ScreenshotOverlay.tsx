import { TimeLeft } from '@/app/types';
import { ProgressBar } from './ProgressBar';
import { TimerDisplay } from './TimerDisplay';

interface ScreenshotOverlayProps {
  timeLeft: TimeLeft;
  progress: number;
  darkMode: boolean;
}

export const ScreenshotOverlay = ({ timeLeft, progress, darkMode }: ScreenshotOverlayProps) => {
  return (
    <div className={`space-y-8 p-8 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-[#f4c20d]'}`}>
      <div className="screenshot-content">
        <ProgressBar progress={progress} darkMode={darkMode} />
      </div>
      <div className="screenshot-content">
        <TimerDisplay timeLeft={timeLeft} darkMode={darkMode} />
      </div>
    </div>
  );
};
