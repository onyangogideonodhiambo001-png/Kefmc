
import React from 'react';
import { TournamentStage } from '../types';

const Prizes: React.FC = () => {
  const prizePool = 1000000;
  
  const prizeDistribution = [
    {
      stage: 'National Finals',
      total: '450,000 Ksh',
      breakdown: [
        { label: '1st Place (Champion)', amount: '250,000 Ksh', count: 1, icon: '🏆' },
        { label: '2nd Place', amount: '120,000 Ksh', count: 1, icon: '🥈' },
        { label: '3rd Place', amount: '80,000 Ksh', count: 1, icon: '🥉' },
      ]
    },
    {
      stage: 'Special Awards',
      total: '100,000 Ksh',
      breakdown: [
        { label: 'Tournament MVP', amount: '50,000 Ksh', count: 1, icon: '⭐' },
        { label: 'Golden Boot (Top Scorer)', amount: '50,000 Ksh', count: 1, icon: '👟' },
      ]
    },
    {
      stage: 'Regional & County Rewards',
      total: '450,000 Ksh',
      breakdown: [
        { label: 'Regional Champions', amount: '20,000 Ksh', count: 5, icon: '🌍' },
        { label: 'County Elite (Top 10)', amount: '15,000 Ksh', count: 10, icon: '🏙️' },
        { label: 'Best Ward Players', amount: '6,666 Ksh', count: 30, icon: '🏘️' },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Header */}
      <section className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 gold-gradient blur-[120px] opacity-20 pointer-events-none"></div>
        <h1 className="font-gaming text-4xl md:text-6xl mb-4 text-white">CHAMPIONSHIP PRIZES</h1>
        <div className="inline-block px-8 py-4 gold-gradient rounded-2xl shadow-[0_0_50px_rgba(217,119,6,0.3)]">
          <span className="text-sm font-black uppercase tracking-[0.3em] block mb-1">Total Prize Pool</span>
          <span className="font-gaming text-3xl md:text-5xl font-black">KSH 1,000,000</span>
        </div>
        <p className="mt-8 text-white/50 font-bold uppercase tracking-widest text-xs">
          Splitted across the Top 50 Elite Players of Kenya
        </p>
      </section>

      {/* Prize Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {prizeDistribution.map((group) => (
          <div key={group.stage} className="glass-card rounded-3xl p-8 flex flex-col border-t-4 border-t-amber-500">
            <h2 className="font-gaming text-lg mb-2 text-white italic">{group.stage}</h2>
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-8 flex items-center gap-2">
              <span className="h-px flex-grow bg-amber-500/20"></span>
              Sub-Total: {group.total}
              <span className="h-px flex-grow bg-amber-500/20"></span>
            </div>

            <div className="space-y-6 flex-grow">
              {group.breakdown.map((prize, idx) => (
                <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="text-3xl">{prize.icon}</div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{prize.count > 1 ? `${prize.count} Winners` : 'Single Winner'}</div>
                    <div className="font-bold text-sm text-white">{prize.label}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-gaming text-amber-500 text-sm">{prize.amount}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
               <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Sponsored by Title Partners</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Benefits */}
      <section className="mt-20 glass-card p-12 rounded-[3rem] text-center border border-emerald-500/20">
        <h3 className="font-gaming text-2xl mb-8">Beyond the Cash</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'E-Certificates', icon: '📜' },
            { label: 'Partner Merch', icon: '👕' },
            { label: 'Data Bundles', icon: '📶' },
            { label: 'Exclusive Badges', icon: '🎖️' }
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-white/40 mb-6 italic">Ready to claim your share of the million?</p>
        <button className="green-gradient px-12 py-5 rounded-full font-gaming font-black text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform">
          Register & Compete
        </button>
      </div>
    </div>
  );
};

export default Prizes;
