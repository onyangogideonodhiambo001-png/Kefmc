
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NAIROBI_WARDS, NAIROBI_SUB_COUNTIES } from '../constants';
import { useAuth } from '../context/AuthContext';

const PAYMENT_AGENTS = [
  { id: 'mpesa', name: 'M-Pesa', icon: '🟢', color: 'border-emerald-500 bg-emerald-500/10' },
  { id: 'airtel', name: 'Airtel Money', icon: '🔴', color: 'border-red-500 bg-red-500/10' },
  { id: 'tkash', name: 'T-Kash', icon: '🔵', color: 'border-blue-500 bg-blue-500/10' },
  { id: 'equity', name: 'Equity EazzyPay', icon: '🏦', color: 'border-amber-700 bg-amber-700/10' },
  { id: 'card', name: 'Visa/Mastercard', icon: '💳', color: 'border-slate-400 bg-slate-400/10' },
];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState('mpesa');
  const [formData, setFormData] = useState({
    fullName: '',
    userId: '',
    phone: '',
    email: '',
    ward: '',
    subCounty: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing delay with selected agent
    setTimeout(() => {
      register(formData);
      setLoading(false);
      navigate('/dashboard');
    }, 2500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="glass-card p-8 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 gold-gradient blur-[80px] opacity-20"></div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="font-gaming text-3xl mb-1 text-white uppercase italic">Register</h1>
            <p className="text-white/50 text-sm">Join the championship for just <span className="text-emerald-500 font-bold">Ksh 50</span></p>
          </div>
          <Link to="/login" className="text-xs font-bold text-white/40 hover:text-emerald-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
            Already Registered?
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Player Details */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 border-b border-white/5 pb-2">1. Player Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Enter your real name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">eFootball User ID</label>
                <input 
                  required
                  type="text" 
                  placeholder="Game User ID"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-gaming text-sm"
                  value={formData.userId}
                  onChange={(e) => setFormData({...formData, userId: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="07XX XXX XXX"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">Select Ward</label>
                <select 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.ward}
                  onChange={(e) => setFormData({...formData, ward: e.target.value})}
                >
                  <option value="" disabled className="bg-navy-900">Choose Ward</option>
                  {NAIROBI_WARDS.map(w => (
                    <option key={w} value={w} className="bg-navy-900">{w}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Payment Agent Selection */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 border-b border-white/5 pb-2">2. Secure Payment (Ksh 50)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {PAYMENT_AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                    selectedAgent === agent.id 
                    ? `${agent.color} scale-105 shadow-lg` 
                    : 'bg-white/5 border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <span className="text-2xl mb-2">{agent.icon}</span>
                  <span className="text-[8px] font-black uppercase text-center leading-tight">{agent.name}</span>
                  {selectedAgent === agent.id && (
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
            <input required type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-white/20 bg-black text-emerald-500" />
            <label htmlFor="terms" className="text-[10px] leading-relaxed text-white/50 uppercase font-bold tracking-tighter">
              I agree to the Fair Play policy, Anti-Cheating rules, and the finality of admin decisions. Media rights belong to KeFMC.
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 green-gradient rounded-2xl font-gaming font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center shadow-xl shadow-emerald-900/20"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing {PAYMENT_AGENTS.find(a => a.id === selectedAgent)?.name}...
              </span>
            ) : `Pay Ksh 50 via ${PAYMENT_AGENTS.find(a => a.id === selectedAgent)?.name}`}
          </button>
          
          <p className="text-center text-[9px] text-white/20 uppercase font-bold tracking-widest">
            Transactions are secured by Industry Standard Encryption
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
