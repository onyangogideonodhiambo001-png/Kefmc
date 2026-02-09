
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NetworkSpeedTest from '../components/NetworkSpeedTest';

const MatchRoom: React.FC = () => {
  const { matchId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'speedtest' | 'lobby' | 'playing' | 'result'>('speedtest');
  const [userSpeed, setUserSpeed] = useState(0);
  const [opponentSpeed, setOpponentSpeed] = useState(0);
  const [stability, setStability] = useState(100);
  const [reason, setReason] = useState('');
  const [matchResult, setMatchResult] = useState<'WIN' | 'LOSS' | 'REVOKED' | null>(null);

  const handleSpeedComplete = (speed: number) => {
    setUserSpeed(speed);
    if (speed < 5) {
      setReason('Your network speed is below 5Mbps threshold.');
      setMatchResult('REVOKED');
      setStep('result');
    } else {
      // Simulate finding opponent speed
      const oppSpeed = +(Math.random() * 12 + 3).toFixed(1);
      setOpponentSpeed(oppSpeed);
      setStep('lobby');
    }
  };

  const startMatch = () => {
    if (opponentSpeed < 5) {
      setReason('Opponent network speed is below 5Mbps. Match revoked and rescheduled.');
      setMatchResult('REVOKED');
      setStep('result');
    } else {
      setStep('playing');
    }
  };

  useEffect(() => {
    if (step === 'playing') {
      const interval = setInterval(() => {
        setStability(prev => {
          const drop = Math.random() * 5;
          const next = prev - drop;
          if (next < 20) {
             clearInterval(interval);
             setReason('Network latency critical. Auto-loss triggered for stability violation.');
             setMatchResult('LOSS');
             setStep('result');
             return 0;
          }
          return next;
        });
      }, 2000);
      
      // Randomly simulate an opponent disconnect win
      const oppDisconnect = setTimeout(() => {
        if (step === 'playing') {
          clearInterval(interval);
          setReason('Opponent disconnected or lagged out. Victory awarded automatically.');
          setMatchResult('WIN');
          setStep('result');
        }
      }, 15000);

      return () => {
        clearInterval(interval);
        clearTimeout(oppDisconnect);
      };
    }
  }, [step]);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[#050810]">
      {step === 'speedtest' && (
        <div className="animate-fade-in w-full max-w-md">
          <h2 className="font-gaming text-2xl text-white mb-8 text-center uppercase italic">Pre-Match <span className="text-emerald-500">Check</span></h2>
          <NetworkSpeedTest onComplete={handleSpeedComplete} />
        </div>
      )}

      {step === 'lobby' && (
        <div className="glass-card p-10 rounded-[3rem] border border-white/5 w-full max-w-lg text-center animate-fade-in">
          <h2 className="font-gaming text-3xl text-white mb-10 uppercase italic">Lobby <span className="text-emerald-500">Ready</span></h2>
          
          <div className="flex justify-between items-center gap-8 mb-12">
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-20 h-20 rounded-full green-gradient p-1">
                <div className="w-full h-full rounded-full bg-navy-900 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.userId}`} alt="Me" />
                </div>
              </div>
              <div className="text-xs font-gaming text-white uppercase">{user?.name.split(' ')[0]}</div>
              <div className="text-[10px] text-emerald-500 font-black">{userSpeed} Mbps</div>
            </div>
            
            <div className="text-4xl font-gaming text-white/10 italic">VS</div>

            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-20 h-20 rounded-full bg-red-500/20 p-1">
                <div className="w-full h-full rounded-full bg-navy-900 overflow-hidden opacity-50">
                   <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
                </div>
              </div>
              <div className="text-xs font-gaming text-white/40 uppercase">Opponent</div>
              <div className={`text-[10px] font-black ${opponentSpeed >= 5 ? 'text-emerald-500' : 'text-red-500 animate-pulse'}`}>
                {opponentSpeed} Mbps
              </div>
            </div>
          </div>

          <button 
            onClick={startMatch}
            className="w-full py-5 green-gradient rounded-2xl font-gaming font-black text-sm uppercase tracking-widest text-white shadow-xl shadow-emerald-900/20"
          >
            Enter Stadium
          </button>
        </div>
      )}

      {step === 'playing' && (
        <div className="w-full max-w-4xl glass-card p-12 rounded-[4rem] border border-emerald-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
             <div className="h-full green-gradient transition-all duration-1000" style={{ width: `${stability}%` }}></div>
          </div>
          
          <div className="flex justify-between items-center mb-16">
            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              Match In Progress
            </div>
            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
              Stability: {stability.toFixed(0)}%
            </div>
          </div>

          <div className="py-20">
            <h1 className="font-gaming text-5xl md:text-7xl text-white italic mb-4 opacity-10 select-none">GAMEPLAY</h1>
            <p className="text-white/20 uppercase text-xs tracking-[0.5em] animate-pulse">Synchronizing Input Streams</p>
          </div>

          <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/10 text-left">
            <h4 className="text-[10px] font-black text-red-500 uppercase mb-2">Automated Referee System</h4>
            <p className="text-[9px] text-white/40 uppercase leading-relaxed font-bold tracking-tight">
              Any network drop below 20% stability will result in an immediate forfeit. Disconnecting without a valid timeout results in a 3-0 loss simulation.
            </p>
          </div>
        </div>
      )}

      {step === 'result' && (
        <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 w-full max-w-md text-center animate-fade-in">
          <div className={`text-6xl mb-8 ${matchResult === 'WIN' ? 'animate-bounce' : ''}`}>
            {matchResult === 'WIN' ? '🏆' : matchResult === 'REVOKED' ? '🔄' : '❌'}
          </div>
          <h2 className="font-gaming text-4xl text-white mb-4 uppercase italic">
            {matchResult === 'WIN' ? 'Victory' : matchResult === 'REVOKED' ? 'Revoked' : 'Forfeit'}
          </h2>
          <p className="text-xs text-white/40 uppercase font-black tracking-widest mb-10 leading-relaxed">
            {reason}
          </p>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-gaming text-[10px] text-white uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      )}

      <style>{`
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MatchRoom;
