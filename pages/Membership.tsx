
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MembershipTier } from '../types';

const MEMBERSHIP_TIERS: { tier: MembershipTier; price: number; color: string; benefits: string[]; icon: string }[] = [
  {
    tier: 'Bronze',
    price: 199,
    color: 'border-orange-500 bg-orange-500/5',
    icon: '🥉',
    benefits: ['Verified Player Badge', 'Basic Match Analytics', 'Ward Level Recognition']
  },
  {
    tier: 'Silver',
    price: 499,
    color: 'border-slate-300 bg-slate-300/5',
    icon: '🥈',
    benefits: ['Bronze Benefits', 'Priority Match Validation', 'Custom Profile Banner', 'Exclusive Discord Role']
  },
  {
    tier: 'Gold',
    price: 999,
    color: 'border-amber-400 bg-amber-400/5',
    icon: '🥇',
    benefits: ['Silver Benefits', 'Featured on Ward Table', 'Direct Admin Support', 'Early Access to Events']
  },
  {
    tier: 'Platinum',
    price: 1999,
    color: 'border-emerald-400 bg-emerald-400/5',
    icon: '💎',
    benefits: ['Gold Benefits', 'Global Feature Spot', 'VIP Tournament Entry', 'Exclusive Merch Access']
  }
];

const Membership: React.FC = () => {
  const { user, upgradeMembership } = useAuth();
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSubscribe = (tier: MembershipTier) => {
    setSelectedTier(tier);
  };

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return;
    
    setIsProcessing(true);
    
    // Simulate STK Push
    setTimeout(() => {
      upgradeMembership(selectedTier);
      setIsProcessing(false);
      navigate('/dashboard');
    }, 4000);
  };

  return (
    <div className="min-h-screen pb-24">
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 green-gradient blur-[120px] opacity-10 rounded-full"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-gaming text-4xl md:text-6xl mb-6 italic text-white uppercase tracking-tighter">
            GET <span className="text-emerald-500">VERIFIED</span>
          </h1>
          <p className="text-white/50 text-lg uppercase tracking-[0.2em] font-bold">
            Unlock premium features and professional status
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {!selectedTier ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MEMBERSHIP_TIERS.map((item) => (
              <div 
                key={item.tier} 
                className={`glass-card p-8 rounded-[2.5rem] border-2 flex flex-col transition-all duration-500 hover:-translate-y-2 ${item.color} ${user?.membership?.tier === item.tier ? 'ring-4 ring-emerald-500/50' : ''}`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-gaming text-2xl text-white mb-1 uppercase italic">{item.tier}</h3>
                <div className="text-emerald-500 font-gaming text-xl mb-6">Ksh {item.price} <span className="text-[10px] text-white/30 uppercase">/ Month</span></div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {item.benefits.map((benefit, i) => (
                    <li key={i} className="text-[11px] text-white/60 uppercase font-bold tracking-wider flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSubscribe(item.tier)}
                  className={`w-full py-4 rounded-2xl font-gaming font-black text-xs uppercase tracking-widest transition-all ${user?.membership?.tier === item.tier ? 'bg-white/10 text-white cursor-default' : 'green-gradient hover:scale-105 shadow-lg'}`}
                >
                  {user?.membership?.tier === item.tier ? 'Current Plan' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto animate-fade-in">
            <div className="glass-card p-10 rounded-[3rem] border-2 border-emerald-500/20 relative overflow-hidden">
              <button 
                onClick={() => setSelectedTier(null)}
                className="absolute top-6 left-6 text-white/40 hover:text-white"
              >
                ← Back
              </button>
              
              <div className="text-center mt-6">
                <div className="text-5xl mb-4">
                  {MEMBERSHIP_TIERS.find(t => t.tier === selectedTier)?.icon}
                </div>
                <h2 className="font-gaming text-2xl mb-1 uppercase italic text-white">Confirm Subscription</h2>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-10">
                  {selectedTier} Membership • Ksh {MEMBERSHIP_TIERS.find(t => t.tier === selectedTier)?.price}
                </p>

                <form onSubmit={processPayment} className="space-y-6">
                  <div className="text-left">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 ml-2">M-Pesa Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="07XX XXX XXX" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    disabled={isProcessing}
                    type="submit"
                    className="w-full py-6 green-gradient rounded-3xl font-gaming font-black text-lg shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Pay with M-Pesa'}
                  </button>
                </form>

                <p className="text-[9px] text-white/20 mt-8 uppercase tracking-[0.2em] leading-relaxed">
                  By clicking subscribe, you agree to an STK push being sent to your phone. Finality of payment confirms verification.
                </p>
              </div>

              {isProcessing && (
                <div className="absolute inset-0 bg-navy-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center animate-fade-in">
                   <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mb-8"></div>
                   <h3 className="font-gaming text-2xl text-white mb-4">CHECK YOUR PHONE</h3>
                   <p className="text-white/50 text-xs uppercase tracking-widest leading-relaxed">
                     An STK push has been sent to <span className="text-emerald-500 font-bold">{phone}</span>.<br/>Enter your PIN to complete verification.
                   </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Membership;
