
import React, { useMemo, useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { TournamentStage, Player } from '../types';
import LeagueTable from '../components/LeagueTable';
import AIAssistant from '../components/AIAssistant';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const savedSchedule = localStorage.getItem(`kefmc_schedule_${user.id}`);
      if (savedSchedule) {
        setSchedule(JSON.parse(savedSchedule));
      } else {
        const newSchedule = Array.from({length: 6}, (_, i) => ({
          id: `match_${user.id}_${i}`,
          opponent: 'Elite Opponent',
          opponentId: 'E_PRO',
          status: 'UPCOMING',
          time: `Match Day ${i + 1}`
        }));
        setSchedule(newSchedule);
      }
    }
  }, [user]);

  const wardCompetitors = useMemo(() => {
    if (!user) return [];
    
    const allUsers = JSON.parse(localStorage.getItem('kefmc_registered_users') || '[]');
    const list = allUsers
      .filter((u: Player) => u.location.ward === user.location.ward)
      .sort((a: Player, b: Player) => (b.stats.points - a.stats.points) || (a.stats.rank - b.stats.rank));
    
    return list.slice(0, 80);
  }, [user]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-gaming animate-pulse">Synchronizing with Stadium Servers...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const completedMatches = schedule.filter(m => m.status === 'COMPLETED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <AIAssistant />
      
      {/* Profile Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div className="glass-card p-8 rounded-3xl text-center relative overflow-hidden border border-emerald-500/20 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 green-gradient opacity-50"></div>
          
          {user.membership?.isVerified && (
            <div className="absolute top-4 left-4" title="Verified Player">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}

          <button 
            onClick={logout}
            className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          </button>
          
          <div className={`w-24 h-24 rounded-full p-1 mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)] ${user.membership?.isVerified ? 'green-gradient' : 'bg-white/10'}`}>
            <div className="w-full h-full rounded-full bg-navy-900 overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userId}`} alt={user.name} className="w-full h-full object-cover" />
            </div>
          </div>
          
          <h2 className="font-gaming text-xl mb-1 text-white flex items-center justify-center gap-2">
            {user.name}
          </h2>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-4">{user.userId}</p>
          
          <div className="flex flex-col gap-2">
            <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-500 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10">
              {user.stage} Stage
            </div>
            {user.membership?.tier && (
               <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">
                 {user.membership.tier} Member
               </div>
            )}
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">
              {user.location.ward} League
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <h3 className="font-gaming text-[10px] text-white/50 mb-6 uppercase tracking-[0.2em] flex items-center justify-between">
            Your Schedule
            <span className="text-emerald-500">{completedMatches}/6 Played</span>
          </h3>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 hide-scrollbar">
            {schedule.map((match, i) => (
              <div key={match.id} className={`p-4 rounded-xl border flex justify-between items-center transition-all ${match.status === 'COMPLETED' ? 'bg-emerald-500/5 border-emerald-500/20 opacity-50' : 'bg-white/5 border-white/10'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${match.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                  <div>
                    <div className="text-[10px] font-bold text-white">{match.opponent}</div>
                    <div className="text-[8px] text-white/30 uppercase">{match.time}</div>
                  </div>
                </div>
                {match.status !== 'COMPLETED' && (
                  <button 
                    onClick={() => navigate(`/match/${match.id}`)}
                    className="px-3 py-1 bg-white/10 rounded-lg text-[8px] font-black uppercase hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    Play
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-8">
        <section className="glass-card p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="4" strokeDasharray="10 10"/>
            </svg>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-4">
            <div>
              <h2 className="font-gaming text-3xl uppercase italic text-white tracking-tight">
                {user.location.ward} <span className="text-emerald-500">League Standings</span>
              </h2>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black mt-2">Active Competition Group</p>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20">
               <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
               <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Server Live: 1,420 ms</span>
            </div>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto hide-scrollbar rounded-2xl border border-white/5">
            <LeagueTable players={wardCompetitors} highlightPlayerId={user.id} />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <h3 className="font-gaming text-[10px] mb-6 uppercase tracking-widest text-white/50">Performance Metrics</h3>
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="w-full h-32 flex items-end justify-around gap-3 px-4">
                {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
                  <div key={i} className="w-full bg-white/5 rounded-t-xl relative group-hover:bg-emerald-500/10 transition-all duration-500" style={{ height: `${h}%` }}>
                    <div className="absolute inset-x-0 bottom-0 bg-emerald-500/40 rounded-t-xl transition-all" style={{ height: i === 3 ? '100%' : '20%' }}></div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-emerald-500/60 font-black uppercase tracking-[0.2em] mt-8 italic">Analyzing Elo-Rating potential</p>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl flex flex-col justify-center items-center text-center group cursor-pointer border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-500 shadow-xl">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-6 text-white/40 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-gaming text-sm uppercase tracking-widest text-white">SUBMIT RESULT</h3>
          </div>
        </section>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Dashboard;
