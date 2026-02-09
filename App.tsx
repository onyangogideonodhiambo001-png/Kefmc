
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Prizes from './pages/Prizes';
import AdminDashboard from './pages/AdminDashboard';
import Donations from './pages/Donations';
import Membership from './pages/Membership';
import Highlights from './pages/Highlights';
import UploadHighlight from './pages/UploadHighlight';
import MatchRoom from './pages/MatchRoom';
import { AuthProvider, useAuth } from './context/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-card px-4 py-3 md:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 green-gradient rounded-lg flex items-center justify-center font-gaming text-xl shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-transform group-hover:scale-110">
            K
          </div>
          <div className="flex flex-col">
            <h1 className="font-gaming text-sm md:text-lg font-black tracking-tighter text-white group-hover:text-emerald-500 transition-colors">KeFMC</h1>
            <span className="hidden md:block text-[7px] uppercase tracking-[0.3em] font-bold text-white/40">National Authority</span>
          </div>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-[10px] uppercase font-bold tracking-widest text-white/60 hover:text-emerald-500 transition-colors">Home</Link>
          <Link to="/highlights" className="text-[10px] uppercase font-bold tracking-widest text-white/60 hover:text-emerald-500 transition-colors">Highlights Hub</Link>
          <Link to="/prizes" className="text-[10px] uppercase font-bold tracking-widest text-white/60 hover:text-emerald-500 transition-colors">Prizes</Link>
          <Link to="/membership" className="text-[10px] uppercase font-bold tracking-widest text-white/60 hover:text-emerald-500 transition-colors">Membership</Link>
          <Link to="/donate" className="text-[10px] uppercase font-black tracking-widest text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
            <span>💎</span> Donate
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
             <Link to="/dashboard" className="flex items-center gap-3 bg-white/5 pl-4 pr-1 py-1 rounded-full border border-white/10 hover:border-emerald-500/50 transition-all">
               <span className="hidden md:block text-[9px] font-black text-emerald-500 uppercase tracking-widest">{user.name.split(' ')[0]}</span>
               <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-emerald-500/30">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userId}`} alt="Profile" />
               </div>
             </Link>
          ) : (
            <Link to="/login" className="px-6 py-2 green-gradient rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

const MobileNav: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/highlights', label: 'Hub', icon: '🎥' },
    { path: '/dashboard', label: 'Play', icon: '🎮' },
    { path: '/prizes', label: 'Prizes', icon: '🏆' },
    { path: '/membership', label: 'Elite', icon: '💎' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex justify-around items-center">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={`flex flex-col items-center gap-1 transition-all ${location.pathname === item.path ? 'text-emerald-500 scale-110' : 'text-white/40'}`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-white/5 py-12 px-4 mt-auto mb-20 lg:mb-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 green-gradient rounded flex items-center justify-center font-gaming text-lg">K</div>
          <h2 className="font-gaming text-xl text-white">KeFMC</h2>
        </div>
        <div className="flex gap-8 text-[9px] uppercase font-black tracking-widest text-white/20">
          <Link to="/privacy" className="hover:text-emerald-500">Privacy</Link>
          <Link to="/terms" className="hover:text-emerald-500">Terms</Link>
          <Link to="/sponsors" className="hover:text-emerald-500">Sponsors</Link>
          <Link to="/admin" className="hover:text-amber-500">Admin</Link>
        </div>
        <p className="text-[9px] uppercase font-bold tracking-widest text-white/10 italic">© 2024 KeFMC National Authority</p>
      </div>
    </footer>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#050810]">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/donate" element={<Donations />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/upload-highlight" element={<UploadHighlight />} />
          <Route path="/match/:matchId" element={<MatchRoom />} />
          <Route path="/leaderboard" element={<div className="p-20 text-center font-gaming text-2xl uppercase italic text-emerald-500">Global Leaderboard Coming Soon</div>} />
          <Route path="/sponsors" element={<div className="p-20 text-center font-gaming text-2xl uppercase italic text-amber-500">Corporate Partnership Hub</div>} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
