
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(userId);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('User ID not found. Have you registered yet?');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 gold-gradient blur-[80px] opacity-10"></div>
        
        <h1 className="font-gaming text-3xl mb-2 text-white text-center">Player Login</h1>
        <p className="text-white/50 mb-8 text-center text-sm">Enter your eFootball User ID to access your dashboard</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-500 p-4 rounded-xl text-xs mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">eFootball User ID</label>
            <input 
              required
              type="text" 
              placeholder="e.g. K_MWA_ESPORTS"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors font-gaming text-sm"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 green-gradient rounded-xl font-gaming font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Access Dashboard
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-white/40">New player?</p>
          <Link to="/register" className="text-emerald-500 font-bold hover:underline text-sm mt-1 inline-block">
            Register for the Championship
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
