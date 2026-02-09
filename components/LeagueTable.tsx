
import React from 'react';
import { Player } from '../types';

interface LeagueTableProps {
  players: Player[];
  highlightPlayerId?: string;
}

const LeagueTable: React.FC<LeagueTableProps> = ({ players, highlightPlayerId }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 font-gaming text-[10px] uppercase tracking-wider text-emerald-500">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Player</th>
            <th className="px-4 py-3">Ward</th>
            <th className="px-4 py-3">Stage</th>
            <th className="px-4 py-3 text-center">PTS</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {players.map((player) => (
            <tr 
              key={player.id} 
              className={`hover:bg-white/5 transition-colors ${player.id === highlightPlayerId ? 'bg-emerald-500/20 border-l-4 border-l-emerald-500' : ''}`}
            >
              <td className="px-4 py-4 font-bold">{player.stats.rank}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700">
                    <img src={player.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.userId}`} alt={player.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{player.name}</div>
                    <div className="text-[10px] text-white/50">{player.userId}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-white/70">{player.location.ward}</td>
              <td className="px-4 py-4">
                <span className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase font-bold text-white/70">
                  {player.stage}
                </span>
              </td>
              <td className="px-4 py-4 text-center font-gaming text-amber-400">{player.stats.points}</td>
              <td className="px-4 py-4">
                <span className={`flex items-center gap-2 ${player.stats.rank <= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${player.stats.rank <= 80 ? 'bg-emerald-500' : 'bg-amber-500 shadow-lg'}`}></div>
                  <span className="text-[11px] font-bold uppercase tracking-tight">
                    {player.stats.rank <= 80 ? 'Qualified' : 'Pending'}
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
