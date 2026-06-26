import React from 'react';
import { Sparkles, Trophy, Award } from 'lucide-react';
import { Country, MatchPrediction } from '../types';

interface PredictionBarProps {
  teamA: Country;
  teamB: Country;
  prediction: MatchPrediction | null;
}

export const PredictionBar: React.FC<PredictionBarProps> = ({
  teamA,
  teamB,
  prediction,
}) => {
  if (!prediction) return null;

  const { winA, draw, winB, badgeA, badgeB } = prediction;

  // Tìm ra kết quả khả thi nhất
  const maxVal = Math.max(winA, draw, winB);
  let summaryTitle = "";
  if (maxVal === winA) {
    summaryTitle = `Khả năng thắng của ${teamA.name} vượt trội (${winA}%)`;
  } else if (maxVal === winB) {
    summaryTitle = `Khả năng thắng của ${teamB.name} áp đảo (${winB}%)`;
  } else {
    summaryTitle = `Hai đội ngang tài ngang sức, kịch bản hòa rất cao (${draw}%)`;
  }

  return (
    <footer className="relative z-10 bg-emerald-900/90 backdrop-blur-2xl rounded-3xl p-6 md:p-10 border-2 border-yellow-400/30 shadow-2xl mt-8 animate-fade-in text-white">
      
      {/* Tiêu đề phân tích */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 font-black text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Phân tích thuật toán AI ngẫu nhiên</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">
            Xác suất dự đoán trận đấu
          </h3>
          <p className="text-emerald-300 text-xs md:text-sm mt-1">
            Mô phỏng 10,000 kịch bản đối đầu độc lập giữa {teamA.name} và {teamB.name}
          </p>
        </div>

        <div className="text-left md:text-right bg-black/20 p-4 rounded-2xl border border-white/10 w-full md:w-auto">
          <span className="text-3xl md:text-5xl font-black text-yellow-400 font-mono block">
            {maxVal}%
          </span>
          <span className="block text-xs uppercase font-black text-emerald-200 tracking-wider mt-1">
            {summaryTitle}
          </span>
        </div>
      </div>

      {/* THANH TỈ LỆ NẰM NGANG CHÍNH THỨC (THE PROBABILITY BAR) */}
      <div className="mb-10">
        <div className="h-14 md:h-16 w-full bg-emerald-950 rounded-2xl overflow-hidden flex shadow-inner border-2 border-white/20 p-1 gap-1">
          
          {/* Tỉ lệ thắng Đội A (Home) */}
          {winA > 1 && (
            <div
              style={{ width: `${winA}%` }}
              className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-emerald-950 font-black text-base md:text-xl shadow-md transition-all duration-1000 overflow-hidden relative group"
            >
              <div className="flex items-center gap-1.5 truncate px-2">
                <span className="text-xl md:text-2xl flex-shrink-0">{teamA.flag}</span>
                <span className="truncate uppercase font-black hidden sm:inline">{teamA.name}</span>
                <span className="font-mono tracking-tighter ml-0.5">({winA}%)</span>
              </div>
            </div>
          )}

          {/* Tỉ lệ Hòa (Draw) */}
          {draw > 1 && (
            <div
              style={{ width: `${draw}%` }}
              className="h-full bg-emerald-800/80 hover:bg-emerald-700 rounded-xl flex items-center justify-center text-emerald-100 font-bold text-xs md:text-sm border border-emerald-600/40 transition-all duration-1000 overflow-hidden"
            >
              <span className="truncate px-1">Hòa ({draw}%)</span>
            </div>
          )}

          {/* Tỉ lệ thắng Đội B (Away) */}
          {winB > 1 && (
            <div
              style={{ width: `${winB}%` }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-base md:text-xl shadow-md transition-all duration-1000 overflow-hidden relative group"
            >
              <div className="flex items-center gap-1.5 truncate px-2">
                <span className="font-mono tracking-tighter mr-0.5">({winB}%)</span>
                <span className="truncate uppercase font-black hidden sm:inline">{teamB.name}</span>
                <span className="text-xl md:text-2xl flex-shrink-0">{teamB.flag}</span>
              </div>
            </div>
          )}

        </div>

        <div className="mt-3 flex justify-between text-[11px] uppercase font-black tracking-widest text-emerald-300/80 px-2">
          <span className="text-yellow-400">🔥 {teamA.name} thắng</span>
          <span>⚖️ Tỷ số hòa</span>
          <span className="text-blue-400">⚡ {teamB.name} thắng</span>
        </div>
      </div>

      {/* So sánh trực diện chỉ số 2 đội */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
        
        {/* Đội A */}
        <div className="bg-white/5 border border-yellow-400/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 border border-yellow-400/40">
            {teamA.flag}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-yellow-400">Đội Nhà</span>
              <span className="text-xs text-emerald-300 font-mono">({teamA.stars} ⭐ sức mạnh)</span>
            </div>
            <h4 className="text-xl font-black uppercase tracking-tight text-white mt-0.5">{teamA.name}</h4>
            <p className="text-xs text-emerald-200/80 mt-1 italic">{badgeA}</p>
          </div>
        </div>

        {/* Đội B */}
        <div className="bg-white/5 border border-blue-400/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 border border-blue-400/40">
            {teamB.flag}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-400">Đội Khách</span>
              <span className="text-xs text-emerald-300 font-mono">({teamB.stars} ⭐ sức mạnh)</span>
            </div>
            <h4 className="text-xl font-black uppercase tracking-tight text-white mt-0.5">{teamB.name}</h4>
            <p className="text-xs text-emerald-200/80 mt-1 italic">{badgeB}</p>
          </div>
        </div>

      </div>

    </footer>
  );
};
