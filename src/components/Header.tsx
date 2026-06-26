import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-10 gap-4 pt-4">
      <div className="flex items-center gap-4">
        <div className="bg-yellow-400 p-3.5 rounded-2xl shadow-lg transform hover:-rotate-6 transition-transform duration-300">
          <Trophy className="h-8 w-8 md:h-10 md:w-10 text-emerald-950 fill-current" />
        </div>
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white drop-shadow-md">
            World Cup <span className="text-yellow-400 underline decoration-white/30 decoration-wavy">Predictor</span>
          </h1>
          <p className="text-emerald-200 text-xs md:text-sm font-medium tracking-wide mt-0.5">
            Thuật toán AI ngẫu nhiên mô phỏng trận đấu World Cup
          </p>
        </div>
      </div>

      <div className="bg-emerald-800/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-emerald-400/30 flex items-center gap-2 shadow-lg">
        <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white">
          Chế độ đối đầu trực tiếp • Active
        </span>
      </div>
    </header>
  );
};
