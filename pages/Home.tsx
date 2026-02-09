
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import { SPONSORS } from '../constants';
import { Sponsor } from '../types';

const NAVIGATION_PORTAL = [
  {
    id: 'p1',
    title: 'Register & Play',
    desc: 'Join the Ward League',
    icon: '🎮',
    path: '/register',
    color: 'emerald',
    badge: 'Ksh 50'
  },
  {
    id: 'p2',
    title: 'Highlights Hub',
    desc: 'Goals, Tackles & Skills',
    icon: '🎥',
    path: '/highlights',
    color: 'red',
    badge: 'Trending'
  },
  {
    id: 'p3',
    title: 'Live Standings',
    desc: 'National Leaderboard',
    icon: '📊',
    path: '/leaderboard',
    color: 'emerald',
    badge: 'Live'
  },
  {
    id: 'p4',
    title: 'Prize Pool',
    desc: 'Rewards & Cash',
    icon: '💰',
    path: '/prizes',
    color: 'amber',
    badge: '1 Million'
  },
  {
    id: 'p5',
    title: 'Get Verified',
    desc: 'Elite Memberships',
    icon: '💎',
    path: '/membership',
    color: 'emerald',
    badge: 'Premium'
  },
  {
    id: 'p6',
    title: 'Wall of Thanks',
    desc: 'Support the Legacy',
    icon: '🤝',
    path: '/donate',
    color: 'amber',
    badge: 'Donate'
  }
];

const SponsorAd: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
  return (
    <div className="w-full h-48 md:h-64 rounded-[2rem] overflow-hidden glass-card relative border border-white/10 group cursor-pointer">
      {sponsor.videoUrl ? (
        <video 
          src={sponsor.videoUrl}
          autoPlay muted loop playsInline
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000"
        />
      ) : (
        <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-all duration-700" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-2">{sponsor.label}</span>
        <h3 className="font-gaming text-xl md:text-3xl text-white italic">{sponsor.name}</h3>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const titleSponsor = SPONSORS.find(s => s.category === 'TITLE');

  return (
    <div className="flex flex-col gap-12 pb-32">
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <video 
            src="https://cdn.pixabay.com/video/2021/04/12/70860-536853503_large.mp4" 
            autoPlay muted loop playsInline 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-6">
            Official National Esports Platform
          </div>
          <h1 className="text-4xl md:text-8xl font-gaming font-black italic tracking-tighter leading-none mb-6">
            KENYA <br/> <span className="text-emerald-500">eFOOTBALL</span>
          </h1>
          <p className="text-white/50 text-xs md:text-base max-w-xl mx-auto mb-10 font-bold uppercase tracking-widest leading-relaxed">
            Choose your journey. From Ward Qualifiers to National Glory.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 green-gradient rounded-full font-gaming font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/40">
              Enter Tournament
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR PAGE (PORTAL GRID) */}
      <section className="px-4 max-w-7xl mx-auto w-full -mt-24 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NAVIGATION_PORTAL.map((item) => (
            <Link 
              key={item.id} 
              to={item.path} 
              className="glass-card p-8 rounded-[2.5rem] border border-white/5 flex flex-col hover:border-emerald-500/40 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-5xl`}>{item.icon}</div>
              <div className="flex justify-between items-start mb-6">
                <div className="text-3xl">{item.icon}</div>
                <span className={`px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest ${item.color === 'emerald' ? 'bg-emerald-500' : item.color === 'amber' ? 'bg-amber-500 text-navy-900' : 'bg-red-500'} text-white`}>
                  {item.badge}
                </span>
              </div>
              <h3 className="font-gaming text-lg text-white mb-2 uppercase italic group-hover:text-emerald-500 transition-colors">{item.title}</h3>
              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-tight">{item.desc}</p>
              
              <div className="mt-8 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-emerald-500/0 group-hover:text-emerald-500/100 transition-all duration-500">
                Access Page ↗
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. KICKOFF COUNTDOWN */}
      <section className="px-4 max-w-7xl mx-auto w-full">
        <CountdownTimer />
      </section>

      {/* 4. FEATURED SPONSOR */}
      <section className="px-4 max-w-7xl mx-auto w-full">
        {titleSponsor && <SponsorAd sponsor={titleSponsor} />}
      </section>

      {/* 5. QUICK LEADERBOARD TEMPLATE */}
      <section className="px-4 max-w-7xl mx-auto w-full">
        <div className="glass-card p-10 rounded-[4rem] border border-white/5 text-center flex flex-col items-center">
          <h2 className="font-gaming text-2xl md:text-4xl text-white italic mb-4">WARD COMPETITION LIVE</h2>
          <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.4em] mb-10 max-w-md">The top 80 players in each ward are currently battling for advancement.</p>
          <Link to="/leaderboard" className="px-12 py-4 border-2 border-emerald-500/30 rounded-full font-gaming text-[10px] text-emerald-500 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
            Open Full Leaderboard
          </Link>
        </div>
      </section>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;
