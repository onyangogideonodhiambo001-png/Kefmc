
import React, { useState, useEffect, useMemo } from 'react';

interface Donor {
  id: string;
  name: string;
  amount: number;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  date: string;
}

const TIERS = [
  { name: 'Bronze', min: 1, max: 499, icon: '🥉', color: 'text-orange-400' },
  { name: 'Silver', min: 500, max: 1999, icon: '🥈', color: 'text-slate-300' },
  { name: 'Gold', min: 2000, max: 9999, icon: '🥇', color: 'text-amber-400' },
  { name: 'Platinum', min: 10000, max: Infinity, icon: '💎', color: 'text-emerald-400' },
];

const Donations: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stkStatus, setStkStatus] = useState<'idle' | 'waiting' | 'success'>('idle');
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const savedDonors = JSON.parse(localStorage.getItem('kefmc_donors') || '[]');
    setDonors(savedDonors);
  }, []);

  const sortedDonors = useMemo(() => {
    return [...donors].sort((a, b) => b.amount - a.amount);
  }, [donors]);

  const recentDonors = useMemo(() => {
    return [...donors].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  }, [donors]);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStkStatus('waiting');

    // Simulate STK Push lifecycle
    setTimeout(() => {
      const donationAmount = parseInt(amount);
      const tier = TIERS.find(t => donationAmount >= t.min && donationAmount <= t.max)?.name as Donor['tier'] || 'Bronze';
      
      const newDonor: Donor = {
        id: `d_${Date.now()}`,
        name: name || 'Anonymous Patriot',
        amount: donationAmount,
        tier,
        date: new Date().toISOString(),
      };

      const updatedDonors = [newDonor, ...donors];
      localStorage.setItem('kefmc_donors', JSON.stringify(updatedDonors));
      setDonors(updatedDonors);
      setStkStatus('success');
      
      setTimeout(() => {
        setIsProcessing(false);
        setStkStatus('idle');
        setAmount('');
        setName('');
        setPhone('');
      }, 3000);
    }, 5000);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gold-gradient blur-[150px] opacity-10 pointer-events-none rounded-full"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="font-gaming text-4xl md:text-7xl mb-6 italic text-white leading-tight">
            SUPPORT THE <span className="text-amber-500">LEGACY</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl uppercase tracking-[0.2em] font-bold max-w-2xl mx-auto">
            Your contributions help build the future of Kenyan Esports.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Donation Form */}
        <section className="glass-card p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <path d="M50 10 L90 90 L10 90 Z" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <h2 className="font-gaming text-2xl mb-8 text-white uppercase italic tracking-tighter">Secure Contribution</h2>
          
          <form onSubmit={handleDonate} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Display Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="E.g. Captain Kenya" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">M-Pesa Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="07XX XXX XXX" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Donation Amount (Ksh)</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-gaming text-amber-500">Ksh</span>
                <input 
                  required
                  type="number" 
                  placeholder="0.00" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-20 pr-6 py-6 text-2xl font-gaming text-white focus:outline-none focus:border-amber-500 transition-colors"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[100, 500, 1000, 5000].map(val => (
                <button 
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  className="py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/60 hover:border-amber-500 hover:text-amber-500 transition-all uppercase tracking-widest"
                >
                  +{val}
                </button>
              ))}
            </div>

            <button 
              disabled={isProcessing}
              type="submit"
              className="w-full py-6 gold-gradient rounded-3xl font-gaming font-black text-xl text-navy-900 shadow-xl shadow-amber-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              Initiate Contribution
            </button>
          </form>

          {/* STK Overlay Simulation */}
          {isProcessing && (
            <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-10 animate-fade-in">
              {stkStatus === 'waiting' ? (
                <>
                  <div className="w-20 h-20 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin mb-8"></div>
                  <h3 className="font-gaming text-2xl mb-4 text-white">CHECK YOUR PHONE</h3>
                  <p className="text-white/50 text-sm uppercase tracking-widest leading-relaxed">
                    We've sent an STK Push to <span className="text-amber-500 font-bold">{phone}</span>.<br/> 
                    Enter your M-Pesa PIN to authorize <span className="text-white font-bold">Ksh {amount}</span>.
                  </p>
                  <div className="mt-12 text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">Waiting for confirmation...</div>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(16,185,129,0.5)] animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-gaming text-3xl mb-4 text-emerald-500 italic">TRANSACTION VERIFIED</h3>
                  <p className="text-white/60 text-sm uppercase tracking-widest">
                    Your name is being added to the <span className="text-amber-500 font-bold">Wall of Thanks</span>.
                  </p>
                </>
              )}
            </div>
          )}
        </section>

        {/* Wall of Thanks & Recent Activity */}
        <section className="space-y-12">
          {/* Wall of Thanks */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-gaming text-3xl text-white italic tracking-tighter">WALL OF <span className="text-amber-500">THANKS</span></h2>
                <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.4em] mt-2">National Championship Patrons</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-gaming text-white">{donors.length}</div>
                <div className="text-[8px] text-white/20 uppercase font-black">Total Donors</div>
              </div>
            </div>

            <div className="glass-card rounded-[3rem] border border-white/5 p-2 h-[450px] overflow-y-auto hide-scrollbar space-y-4">
              {sortedDonors.length > 0 ? (
                sortedDonors.map((donor, idx) => {
                  const tierInfo = TIERS.find(t => donor.tier === t.name);
                  return (
                    <div 
                      key={donor.id} 
                      className={`flex items-center gap-6 p-6 rounded-[2rem] border transition-all hover:bg-white/5 animate-fade-in ${idx === 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/5'}`}
                    >
                      <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                        {tierInfo?.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white text-lg">{donor.name}</span>
                          {idx === 0 && (
                            <span className="px-2 py-0.5 bg-amber-500 rounded-[4px] text-[7px] font-black uppercase text-navy-900 animate-pulse">
                              Top Patron
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-1">
                          {donor.tier} Tier • {new Date(donor.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-gaming text-lg ${tierInfo?.color}`}>
                          Ksh {donor.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-10">
                  <div className="text-5xl mb-6 opacity-20">🕊️</div>
                  <p className="text-white/20 uppercase font-black text-xs tracking-[0.3em] italic">
                    The wall is waiting for its first hero.<br/>Be the one to start the legacy.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Donations List */}
          <div className="space-y-6">
            <h3 className="font-gaming text-xs text-white/50 uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Recent Contributions
            </h3>
            
            <div className="glass-card rounded-[2rem] border border-white/5 p-6 space-y-4">
              {recentDonors.length > 0 ? (
                recentDonors.map((donor) => (
                  <div key={`recent-${donor.id}`} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 group">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full group-hover:bg-emerald-500 transition-colors"></div>
                      <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">{donor.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/20 font-black uppercase tracking-tighter">
                        {new Date(donor.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="font-gaming text-xs text-amber-500">Ksh {donor.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-[10px] text-white/10 uppercase font-black tracking-widest">
                  No recent activity found
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {TIERS.map(tier => (
              <div key={tier.name} className="glass-card p-4 rounded-2xl border border-white/5 text-center">
                <div className="text-xl mb-1">{tier.icon}</div>
                <div className="text-[8px] font-black uppercase text-white/30 tracking-tighter">{tier.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Donations;
