
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Player, TournamentStage, MembershipTier } from '../types';

interface AuthContextType {
  user: Player | null;
  login: (userId: string) => boolean;
  register: (userData: any) => void;
  logout: () => void;
  upgradeMembership: (tier: MembershipTier) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SEED_NAMES = [
  'Musa O.', 'Jane W.', 'Kimani E.', 'Otieno J.', 'Wambui M.', 'Mutua S.', 
  'Juma K.', 'Achieng L.', 'Maina D.', 'Nyambura S.', 'Kariuki P.', 'Hassan A.',
  'Omar F.', 'Nanjala R.', 'Kibet G.', 'Chepkirui E.', 'Waweru N.', 'Mokeira V.',
  'Kamau S.', 'Mwangi J.', 'Njuguna B.', 'Omondi R.', 'Oduor C.', 'Okoth M.',
  'Saitoti L.', 'Leina P.', 'Nekesa F.', 'Wekesa B.', 'Kiplagat J.', 'Cheruiyot D.'
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('kefmc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userId: string) => {
    const savedUsers = JSON.parse(localStorage.getItem('kefmc_registered_users') || '[]');
    const foundUser = savedUsers.find((u: Player) => u.userId.toLowerCase() === userId.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('kefmc_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (userData: any) => {
    const newPlayer: Player = {
      id: `u_${Date.now()}`,
      name: userData.fullName,
      userId: userData.userId,
      location: {
        ward: userData.ward,
        subCounty: userData.subCounty || 'Nairobi',
        county: 'Nairobi',
        region: 'Nairobi',
      },
      stage: TournamentStage.PREQUALIFY,
      stats: {
        rank: 80,
        points: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalDiff: 0,
      }
    };

    const savedUsers = JSON.parse(localStorage.getItem('kefmc_registered_users') || '[]');
    const wardPlayers = savedUsers.filter((u: Player) => u.location.ward === userData.ward);
    let seededPlayers: Player[] = [];
    
    if (wardPlayers.length < 50) {
      for (let i = 0; i < 79; i++) {
        const seedName = SEED_NAMES[Math.floor(Math.random() * SEED_NAMES.length)];
        seededPlayers.push({
          id: `seed_${userData.ward}_${i}`,
          name: `${seedName} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
          userId: `${seedName.split(' ')[0].toUpperCase()}_${Math.floor(Math.random() * 999)}`,
          location: {
            ward: userData.ward,
            subCounty: userData.subCounty || 'Nairobi',
            county: 'Nairobi',
            region: 'Nairobi',
          },
          stage: TournamentStage.PREQUALIFY,
          stats: {
            rank: i + 1,
            points: Math.floor(Math.random() * 15),
            played: Math.floor(Math.random() * 5),
            won: 0, drawn: 0, lost: 0, goalDiff: 0
          }
        });
      }
    }

    const finalUsers = [...savedUsers, ...seededPlayers, newPlayer];
    localStorage.setItem('kefmc_registered_users', JSON.stringify(finalUsers));
    localStorage.setItem('kefmc_user', JSON.stringify(newPlayer));
    setUser(newPlayer);

    const schedule = Array.from({length: 6}, (_, i) => ({
      id: `match_${newPlayer.id}_${i}`,
      opponent: seededPlayers[i]?.name || 'TBD Elite',
      opponentId: seededPlayers[i]?.userId || 'QUEUING',
      status: 'UPCOMING',
      time: `Match Day ${i + 1}`
    }));
    localStorage.setItem(`kefmc_schedule_${newPlayer.id}`, JSON.stringify(schedule));
  };

  const upgradeMembership = (tier: MembershipTier) => {
    if (!user) return;
    const upgradedUser: Player = {
      ...user,
      membership: {
        tier,
        isVerified: true
      }
    };
    
    setUser(upgradedUser);
    localStorage.setItem('kefmc_user', JSON.stringify(upgradedUser));
    
    const savedUsers = JSON.parse(localStorage.getItem('kefmc_registered_users') || '[]');
    const updatedUsers = savedUsers.map((u: Player) => u.id === user.id ? upgradedUser : u);
    localStorage.setItem('kefmc_registered_users', JSON.stringify(updatedUsers));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kefmc_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, upgradeMembership, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
