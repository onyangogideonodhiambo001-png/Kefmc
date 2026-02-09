
import React, { useState, useMemo } from 'react';
import { TournamentStage, Player, Sponsor } from '../types';
import { SPONSORS, NAIROBI_WARDS } from '../constants';
import LeagueTable from '../components/LeagueTable';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'sponsors' | 'settings'>('overview');
  
  // Retrieve registered users from localStorage
  const allPlayers: Player[] = useMemo(() => {
    return JSON.parse(localStorage.getItem('kefmc_registered_users') || '[]');
  }, []);

  const totalRevenue = allPlayers.length * 50;
  
  const stats = [
    { label: 'Total Players', value: allPlayers.length, icon: '👥', color: 'text-emerald-500' },
    { label: 'Revenue (Ksh)', value: totalRevenue.toLocaleString(), icon: '💰', color: 'text-amber-500' },
    { label: 'Active Wards', value: new Set(allPlayers.map(p => p.location.ward)).size, icon: '📍', color: 'text-blue-500' },
    { label: 'Pending Results', value: 12, icon: '📝', color: 'text-red-500' },
  ];

  // Fix: Explicitly type PlayerRow with React.FC to correctly handle the 'key' prop in map()
  const PlayerRow: React.FC<{ player: Player }> = ({ player }) => (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="px-6 py-4 text-xs font-bold text-white/80">{player.userId}</td>
      <td className="px-6 py-4">
        <div className="text-xs font-bold text-white">{player.name}</div>
        <div className="text-[10px] text-white/30 uppercase">{player.location.ward}</div>
      </td>
      <td className="px-6 py-4">
        <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
          {player.stage}
        </span>
      </td>
      <td className="px-6 py-4 text-center text-xs font-mono">{player.stats.points}</td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button className="p-2 hover:bg-emerald-500/20 rounded-lg text-emerald-500 transition-colors" title="Verify Result">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors" title="Disqualify">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-[#050810] pb-20">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="font-gaming text-3xl md:text-4xl text-white italic tracking-tighter">
              COMMAND <span className="text-emerald-500">CENTER</span>
            </h1>
            <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.4em] mt-2">Tournament Administrative Oversight</p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {(['overview', 'players', 'sponsors', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-emerald-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(s => (
                <div key={s.label} className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-current opacity-20 ${s.color}`}></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Live</span>
                  </div>
                  <div className={`text-3xl font-gaming font-black mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Distribution Graph Simulation */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5">
              <h3 className="font-gaming text-xs text-white/50 mb-8 uppercase tracking-[0.3em]">Registration Trend (Ward Distribution)</h3>
              <div className="h-64 flex items-end justify-between gap-4 px-4">
                {NAIROBI_WARDS.slice(0, 12).map((ward, i) => {
                  const height = Math.floor(Math.random() * 80) + 20;
                  return (
                    <div key={ward} className="w-full flex flex-col items-center gap-4 group">
                      <div className="w-full bg-white/5 rounded-t-xl relative overflow-hidden h-full">
                        <div 
                          className="absolute bottom-0 w-full green-gradient transition-all duration-1000 group-hover:opacity-80" 
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                      <span className="text-[8px] text-white/20 font-black uppercase tracking-tighter rotate-45 origin-left whitespace-nowrap">{ward}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-3xl border border-white/5">
                 <h3 className="font-gaming text-xs text-white/50 mb-6 uppercase tracking-[0.3em]">Recent Activity</h3>
                 <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-lg font-black">
                          {i}
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs font-bold">New Player Registered</p>
                          <p className="text-[10px] text-white/40">Assigned to Kayole North League</p>
                        </div>
                        <span className="text-[9px] text-white/20 font-black">2m ago</span>
                     </div>
                   ))}
                 </div>
              </div>
              <div className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full border-2 border-emerald-500/20 flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full green-gradient animate-pulse"></div>
                </div>
                <h3 className="font-gaming text-lg mb-2">Stage Advancement</h3>
                <p className="text-white/40 text-xs mb-8 max-w-xs">Ready to close the Ward Prequalify stage? This will promote the top 80 players from each ward.</p>
                <button className="px-10 py-4 green-gradient rounded-full font-gaming font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-emerald-500/20">
                  Trigger Advancement
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'players' && (
          <div className="glass-card rounded-[2.5rem] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="font-gaming text-xs text-white/50 uppercase tracking-[0.3em]">Master Player Registry</h3>
              <div className="flex gap-4 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search User ID or Name..." 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors w-full md:w-64"
                />
                <button className="bg-white/5 border border-white/10 p-2 rounded-xl text-white/60 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                  <tr>
                    <th className="px-6 py-4">User ID</th>
                    <th className="px-6 py-4">Player Details</th>
                    <th className="px-6 py-4">Stage</th>
                    <th className="px-6 py-4 text-center">Pts</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allPlayers.length > 0 ? (
                    allPlayers.map(p => <PlayerRow key={p.id} player={p} />)
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center text-white/20 uppercase font-black text-xs italic tracking-widest">
                        No players registered yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sponsors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPONSORS.map(sponsor => (
              <div key={sponsor.id} className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col group">
                <div className="h-40 rounded-2xl overflow-hidden mb-6 relative">
                  <img src={sponsor.logo} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" alt={sponsor.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-0.5 bg-emerald-500 rounded text-[7px] font-black uppercase text-white tracking-widest mb-1 block w-fit">
                      {sponsor.category}
                    </span>
                    <h4 className="font-gaming text-sm text-white">{sponsor.name}</h4>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase">
                    <span>Visibility</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase">
                    <span>Video Ad Mode</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={!!sponsor.videoUrl} className="sr-only peer" />
                      <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                </div>
                
                <button className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/60 transition-all border border-white/5">
                  Update Assets
                </button>
              </div>
            ))}
            <button className="glass-card rounded-3xl p-6 border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center group hover:border-emerald-500/30 transition-all min-h-[300px]">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h4 className="font-gaming text-xs text-white/50 uppercase tracking-widest">Add New Partner</h4>
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5">
               <h3 className="font-gaming text-xs text-white/50 mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                 System Configuration
               </h3>
               
               <div className="space-y-8">
                 <div className="flex flex-col gap-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Global Announcement Banner</label>
                   <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors h-24"
                    placeholder="E.g. Registration closes in 48 hours! Claim your spot now."
                   ></textarea>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="flex flex-col gap-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Registration Fee (Ksh)</label>
                     <input type="number" defaultValue={50} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                   </div>
                   <div className="flex flex-col gap-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Admin Contact Email</label>
                     <input type="email" defaultValue="admin@kefmc.co.ke" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                   </div>
                 </div>

                 <div className="pt-6 border-t border-white/5 flex justify-end">
                    <button className="px-10 py-4 green-gradient rounded-full font-gaming font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                      Save System Changes
                    </button>
                 </div>
               </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] border border-red-500/10 bg-red-500/5">
              <h3 className="font-gaming text-xs text-red-500 mb-6 uppercase tracking-[0.3em]">Danger Zone</h3>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <p className="text-xs font-bold text-white mb-1">Reset Tournament Data</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-tighter">This will clear all players, matches, and statistics. Irreversible.</p>
                </div>
                <button className="px-8 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Hard Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
