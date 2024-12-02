import { useState } from 'react';
import { FaShare, FaCheck, FaCopy } from 'react-icons/fa';

interface ShareButtonProps {
  darkMode: boolean;
}

export const ShareButton = ({ darkMode }: ShareButtonProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const shareTimer = async () => {
    if (isSharing) return;
    setIsSharing(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'DOGE Timer',
          text: 'Check out this countdown to DOGE\'s self-deletion!',
          url: window.location.href
        });
        showFeedbackMessage('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showFeedbackMessage('Link copied to clipboard!');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Error sharing:', err);
        showFeedbackMessage('Failed to share');
      }
    } finally {
      setIsSharing(false);
    }
  };

  const showFeedbackMessage = (message: string) => {
    setFeedbackMessage(message);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={shareTimer}
        disabled={isSharing}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-full
          backdrop-blur-md transition-all duration-300 transform
          ${isSharing ? 'scale-95 opacity-75' : 'hover:scale-110'}
          ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}
          shadow-lg hover:shadow-xl
          disabled:cursor-not-allowed
        `}
        aria-label="Share timer"
      >
        {isSharing ? (
          <FaCopy className="w-5 h-5 text-white animate-pulse" />
        ) : (
          <FaShare className="w-5 h-5 text-white" />
        )}
        <span className="text-white font-medium">
          {isSharing ? 'Sharing...' : 'Share'}
        </span>
      </button>

      {/* Feedback Message */}
      <div
        className={`
          absolute top-full left-1/2 -translate-x-1/2 mt-4
          bg-green-500 text-white px-4 py-2 rounded-full
          transform transition-all duration-300 whitespace-nowrap
          ${showFeedback ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        `}
      >
        <span className="flex items-center gap-2">
          <FaCheck className="w-4 h-4" />
          {feedbackMessage}
        </span>
      </div>
    </div>
  );
};
