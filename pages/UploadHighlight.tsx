
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Highlight } from '../types';

const UploadHighlight: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Goal' as Highlight['category'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop',
    monetize: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem('kefmc_highlights') || '[]');
      const newVideo: Highlight = {
        id: `h_${Date.now()}`,
        title: formData.title,
        description: formData.description,
        videoUrl: '#',
        thumbnailUrl: formData.thumbnailUrl,
        authorName: user.name,
        authorId: user.userId,
        authorVerified: !!user.membership?.isVerified,
        views: 0,
        category: formData.category,
        timestamp: 'Just now'
      };
      
      localStorage.setItem('kefmc_highlights', JSON.stringify([newVideo, ...saved]));
      setLoading(false);
      navigate('/highlights');
    }, 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="font-gaming text-2xl text-white mb-6">UNAUTHORIZED ACCESS</h2>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-8">You must be registered and logged in to post highlights.</p>
        <button onClick={() => navigate('/login')} className="px-10 py-4 green-gradient rounded-full font-gaming font-black text-xs uppercase tracking-widest">Login Now</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto glass-card p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 green-gradient blur-[100px] opacity-10"></div>
        
        <div className="text-center mb-10">
          <h1 className="font-gaming text-3xl text-white italic tracking-tight mb-2 uppercase">POST <span className="text-emerald-500">HIGHLIGHT</span></h1>
          <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.4em]">Broadcast your greatness to the nation</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-2">Video Title</label>
              <input 
                required
                type="text" 
                placeholder="E.g. Sick Finesse Goal from Kibera Ward Finals"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-2">Description</label>
              <textarea 
                placeholder="Tell the community about this play..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors h-24"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-2">Category</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as Highlight['category']})}
                >
                  <option value="Goal" className="bg-navy-900">Top Goal</option>
                  <option value="Tackle" className="bg-navy-900">Incredible Tackle</option>
                  <option value="Skill" className="bg-navy-900">Insane Skill</option>
                  <option value="Full Match" className="bg-navy-900">Match Replay</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-2">Thumbnail URL (Mock)</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors opacity-50 cursor-not-allowed"
                  disabled
                  value={formData.thumbnailUrl}
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 space-y-4">
             <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] font-black uppercase text-emerald-500 mb-1">Monetization Ready</h4>
                  <p className="text-[8px] text-white/30 uppercase tracking-widest leading-tight max-w-[200px]">Allow ads to play on your video for future revenue sharing.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.monetize} onChange={() => setFormData({...formData, monetize: !formData.monetize})} className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 green-gradient rounded-3xl font-gaming font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-emerald-900/20"
          >
            {loading ? 'Processing Video...' : 'Publish to Nation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadHighlight;
