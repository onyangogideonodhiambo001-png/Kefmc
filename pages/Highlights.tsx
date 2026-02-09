
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Highlight } from '../types';

const INITIAL_HIGHLIGHTS: Highlight[] = [
  {
    id: 'v1',
    title: 'Incredible Long Range Curler - Umoja Ward Qualifiers',
    description: 'A classic finesse shot from outside the box by Kimani.',
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70860-536853503_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop',
    authorName: 'Kimani E.',
    authorId: 'KE_FLASH',
    authorVerified: true,
    views: 12400,
    category: 'Goal',
    timestamp: '2 hours ago'
  },
  {
    id: 'v2',
    title: 'Last Minute Tackle to Save the Game',
    description: 'Perfect timing at the edge of the area.',
    videoUrl: 'https://cdn.pixabay.com/video/2020/09/16/49969-459528652_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop',
    authorName: 'Otieno J.',
    authorId: 'LAKE_KING',
    authorVerified: false,
    views: 8900,
    category: 'Tackle',
    timestamp: '5 hours ago'
  },
  {
    id: 'v3',
    title: 'Neymar-style Rainbow Flick & Finish',
    description: 'Pure filth in the Kibera ward league.',
    videoUrl: 'https://cdn.pixabay.com/video/2023/10/23/186256-877717646_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1000&auto=format&fit=crop',
    authorName: 'Mutua S.',
    authorId: 'MACH_FORCE',
    authorVerified: true,
    views: 45000,
    category: 'Skill',
    timestamp: '1 day ago'
  }
];

const Highlights: React.FC = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('kefmc_highlights') || '[]');
    setHighlights(saved.length > 0 ? saved : INITIAL_HIGHLIGHTS);
  }, []);

  const categories = ['All', 'Goal', 'Tackle', 'Skill', 'Full Match'];

  const filteredHighlights = useMemo(() => {
    if (activeCategory === 'All') return highlights;
    return highlights.filter(h => h.category === activeCategory);
  }, [highlights, activeCategory]);

  return (
    <div className="min-h-screen bg-[#050810] pb-24">
      {/* Header / Sub-nav */}
      <div className="sticky top-16 z-40 bg-[#050810]/80 backdrop-blur-md border-b border-white/5 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/40 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <Link 
            to="/upload-highlight" 
            className="w-full md:w-auto px-8 py-2.5 green-gradient rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            Post Highlight
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Ad Mockup (Monetization Demo) */}
        <div className="mb-12 glass-card rounded-[2.5rem] border border-white/5 overflow-hidden group cursor-pointer h-48 md:h-64 relative">
          <div className="absolute top-4 left-4 z-10 bg-amber-500 text-navy-900 text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase">Sponsored Ad</div>
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" 
            alt="Ad Content"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-transparent flex flex-col justify-center p-12">
            <h2 className="font-gaming text-3xl text-white italic mb-2">SAFARICOM 5G</h2>
            <p className="text-white/60 text-sm uppercase font-bold tracking-widest mb-6">Zero Lag. Pure Glory. Play on Kenya's Fastest Network.</p>
            <button className="w-fit px-8 py-3 bg-white text-navy-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors">Learn More</button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredHighlights.map((video) => (
            <div key={video.id} className="group flex flex-col gap-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/5 shadow-xl transition-all group-hover:ring-2 group-hover:ring-emerald-500/50">
                <img src={video.thumbnailUrl} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt={video.title} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-bold text-white tracking-widest">
                  {video.category.toUpperCase()}
                </div>
                {/* Simulated Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/10 mt-1">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.authorId}`} alt={video.authorName} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight group-hover:text-emerald-500 transition-colors mb-1">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-tighter hover:text-white transition-colors cursor-pointer">
                      {video.authorName}
                    </span>
                    {video.authorVerified && (
                      <div className="w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                    {video.views.toLocaleString()} views • {video.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHighlights.length === 0 && (
          <div className="py-24 text-center">
            <div className="text-6xl mb-6 opacity-20">🎥</div>
            <h3 className="font-gaming text-xl text-white/50 italic mb-2 uppercase">No Highlights Yet</h3>
            <p className="text-white/30 text-xs uppercase tracking-widest">Be the first to upload a legendary moment from your ward!</p>
          </div>
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Highlights;
