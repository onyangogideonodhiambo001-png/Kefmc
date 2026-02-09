
import React, { useState, useEffect } from 'react';

interface NetworkSpeedTestProps {
  onComplete: (speed: number) => void;
}

const NetworkSpeedTest: React.FC<NetworkSpeedTestProps> = ({ onComplete }) => {
  const [speed, setSpeed] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [progress, setProgress] = useState(0);

  const runTest = () => {
    setIsTesting(true);
    setProgress(0);
    
    // Simulate speed test chunks
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const finalSpeed = +(Math.random() * 15 + 2).toFixed(1); // 2mbps to 17mbps range
          setSpeed(finalSpeed);
          setIsTesting(false);
          setTimeout(() => onComplete(finalSpeed), 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 glass-card rounded-[2rem] border-white/10 w-full max-w-sm mx-auto">
      <div className="text-4xl mb-4">🌐</div>
      <h3 className="font-gaming text-sm text-white mb-2 uppercase tracking-widest">Network Diagnostic</h3>
      <p className="text-[10px] text-white/40 uppercase mb-6 text-center">Minimum 5Mbps Required for Tournament Matches</p>
      
      {!isTesting && speed === 0 ? (
        <button 
          onClick={runTest}
          className="px-8 py-3 green-gradient rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:scale-105 transition-all"
        >
          Begin Test
        </button>
      ) : (
        <div className="w-full space-y-4">
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full green-gradient transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-end">
             <div className="text-3xl font-gaming text-white">
               {isTesting ? '...' : speed} <span className="text-[10px] text-white/30 uppercase">Mbps</span>
             </div>
             <div className="text-[10px] font-black uppercase text-emerald-500 animate-pulse">
               {isTesting ? 'Analyzing' : speed >= 5 ? 'Stable' : 'Unstable'}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSpeedTest;
