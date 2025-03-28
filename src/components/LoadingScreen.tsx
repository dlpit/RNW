import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prevProgress) => {
          // Speed up progress as it gets closer to 100
          const increment = prevProgress < 50 ? 1 : prevProgress < 80 ? 2 : 5;
          const newProgress = Math.min(prevProgress + increment, 100);

          if (newProgress === 100) {
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 1200); // Longer delay to allow for exit animation
          }

          return newProgress;
        });
      }
    }, 20); // Update every 20ms

    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-clan-dark 
      transition-all duration-1000 ${
        isComplete ? "opacity-0 scale-150" : "opacity-100 scale-100"
      }`}
    >
      {/* Welcome text above the logo */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        <span className="gold-gradient-text">Welcome to RNW</span>
      </h1>

      <div className="w-48 md:w-64 animate-pulse mb-8">
        <img
          src="/lovable-uploads/e29eae61-9195-47c9-ae8f-ebed8bf80c4e.png"
          alt="RN:W Clan Logo"
          className="w-full"
        />
      </div>

      <div className="w-64 md:w-80 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 text-clan-gold font-bai">
        <span className="mr-2">{progress}%</span>
        <span className="text-white/70">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
