import { useEffect, useRef } from 'react';

interface TweetProps {
  darkMode: boolean;
}

export const Tweet = ({ darkMode }: TweetProps) => {
  const tweetRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="mb-12 w-full max-w-xl mx-auto transform hover:scale-105 transition-all duration-300">
      <div 
        className={`${
          darkMode ? 'bg-white/5' : 'bg-white/10'
        } backdrop-blur-md rounded-2xl p-6 border border-white/20 flex justify-center shadow-lg hover:shadow-xl`}
      >
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
  );
};
