interface DisclaimerProps {
  darkMode: boolean;
}

export const Disclaimer = ({ darkMode }: DisclaimerProps) => (
  <div 
    className={`${
      darkMode ? 'bg-black/30' : 'bg-black/10'
    } backdrop-blur-md rounded-xl p-6 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300`}
  >
    <p className="text-white/80 text-sm md:text-base leading-relaxed">
      Disclaimer: This website is not affiliated with Dogecoin or any cryptocurrency.
      This is just a fun countdown timer created by a community member. 
      Much wow! 🐕 To the moon! 🚀
    </p>
  </div>
);
