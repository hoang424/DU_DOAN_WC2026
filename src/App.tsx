import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Shuffle, Swords, Sparkles, RefreshCw } from 'lucide-react';
import { Header } from './components/Header';
import { CountryModal } from './components/CountryModal';
import { PredictionBar } from './components/PredictionBar';
import { ALL_COUNTRIES, COMMENTS_ADVANTAGE, COMMENTS_UNDERDOG, COMMENTS_EVEN } from './data';
import { Country, MatchPrediction } from './types';

export default function App() {
  // Mặc định chọn Brazil (nhà) và Pháp (khách)
  const [teamA, setTeamA] = useState<Country>(ALL_COUNTRIES[0]); // Brazil
  const [teamB, setTeamB] = useState<Country>(ALL_COUNTRIES[1]); // Pháp

  const [activeModalSlot, setActiveModalSlot] = useState<'A' | 'B' | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [prediction, setPrediction] = useState<MatchPrediction | null>(null);

  const handleSelectCountry = (country: Country) => {
    if (activeModalSlot === 'A') {
      setTeamA(country);
      if (country.id === teamB.id) {
        // Nếu chọn trùng đội B thì tự động đổi đội B sang đội khác
        const another = ALL_COUNTRIES.find((c) => c.id !== country.id) || ALL_COUNTRIES[2];
        setTeamB(another);
      }
    } else if (activeModalSlot === 'B') {
      setTeamB(country);
      if (country.id === teamA.id) {
        // Nếu chọn trùng đội A thì tự động đổi đội A
        const another = ALL_COUNTRIES.find((c) => c.id !== country.id) || ALL_COUNTRIES[2];
        setTeamA(another);
      }
    }
    setPrediction(null); // Đặt lại kết quả khi thay đổi đội bóng
  };

  const handleRandomizeBoth = () => {
    const idxA = Math.floor(Math.random() * ALL_COUNTRIES.length);
    let idxB = Math.floor(Math.random() * ALL_COUNTRIES.length);
    while (idxB === idxA) {
      idxB = Math.floor(Math.random() * ALL_COUNTRIES.length);
    }
    setTeamA(ALL_COUNTRIES[idxA]);
    setTeamB(ALL_COUNTRIES[idxB]);
    setPrediction(null);
  };

  // THUẬT TOÁN MÔ PHỎNG NGẪU NHIÊN MONTE CARLO CHO 2 ĐỘI
  const runMatchSimulation = () => {
    setIsSimulating(true);
    setPrediction(null);

    setTimeout(() => {
      let winsA = 0;
      let draws = 0;
      let winsB = 0;
      const totalSims = 10000;

      // Sức mạnh nền tảng từ đánh giá sao
      const powerA = Math.pow(teamA.stars, 1.7) * 20 + 10; // Lợi thế sân nhà nhẹ
      const powerB = Math.pow(teamB.stars, 1.7) * 20;

      for (let i = 0; i < totalSims; i++) {
        // Biến số phong độ ngẫu nhiên từng trận (Gaussian-like noise)
        const noiseA = (Math.random() + Math.random() + Math.random() - 1.5) * 35;
        const noiseB = (Math.random() + Math.random() + Math.random() - 1.5) * 35;

        const scoreA = powerA + noiseA;
        const scoreB = powerB + noiseB;

        const diff = scoreA - scoreB;

        if (Math.abs(diff) < 12) {
          draws++;
        } else if (diff > 0) {
          winsA++;
        } else {
          winsB++;
        }
      }

      const pctA = Math.round((winsA / totalSims) * 100);
      const pctDraw = Math.round((draws / totalSims) * 100);
      const pctB = 100 - pctA - pctDraw; // Đảm bảo tổng tròn 100%

      // Lời bình luận phân tích
      let badgeA = "";
      let badgeB = "";

      if (pctA > pctB + 15) {
        badgeA = COMMENTS_ADVANTAGE[Math.floor(Math.random() * COMMENTS_ADVANTAGE.length)];
        badgeB = COMMENTS_UNDERDOG[Math.floor(Math.random() * COMMENTS_UNDERDOG.length)];
      } else if (pctB > pctA + 15) {
        badgeB = COMMENTS_ADVANTAGE[Math.floor(Math.random() * COMMENTS_ADVANTAGE.length)];
        badgeA = COMMENTS_UNDERDOG[Math.floor(Math.random() * COMMENTS_UNDERDOG.length)];
      } else {
        badgeA = COMMENTS_EVEN[Math.floor(Math.random() * COMMENTS_EVEN.length)];
        badgeB = COMMENTS_EVEN[Math.floor(Math.random() * COMMENTS_EVEN.length)];
      }

      setPrediction({
        winA: Math.max(pctA, 1),
        draw: Math.max(pctDraw, 1),
        winB: Math.max(pctB, 1),
        badgeA,
        badgeB,
      });

      setIsSimulating(false);

      // Pháo hoa chiến thắng
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Bỏ qua nếu môi trường không hỗ trợ
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-emerald-950 font-sans text-white relative overflow-x-hidden p-4 md:p-8 flex flex-col justify-between selection:bg-yellow-400 selection:text-emerald-950">
      
      {/* Stadium Lights Glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-emerald-400 rounded-full blur-[150px]" />
      </div>

      {/* Pitch Grass Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10 z-0" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.1) 100px, rgba(255,255,255,0.1) 200px)' 
        }} 
      />

      <div className="max-w-5xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-center">
        
        {/* Header */}
        <Header />

        {/* Nút ngẫu nhiên cặp đấu nhanh */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleRandomizeBoth}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-yellow-300 text-xs font-bold transition-all border border-white/10 cursor-pointer active:scale-95 shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Ghép cặp ngẫu nhiên khác</span>
          </button>
        </div>

        {/* KHUNG ĐỐI ĐẦU CHÍNH (THE MAIN BATTLEGROUND) */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-6">
          
          {/* Ô QUỐC GIA 1 (ĐỘI NHÀ) */}
          <div 
            onClick={() => setActiveModalSlot('A')}
            className="lg:col-span-5 bg-white/10 hover:bg-white/15 backdrop-blur-xl border-2 border-white/20 hover:border-yellow-400 rounded-[36px] p-8 md:p-10 text-center shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-yellow-400 text-emerald-950 text-[10px] font-black uppercase px-4 py-1 rounded-bl-2xl tracking-widest shadow">
              Slot Đội Nhà
            </div>

            <span className="text-xs font-black uppercase text-emerald-300 tracking-widest block mb-4 group-hover:text-yellow-300 transition-colors">
              👉 Bấm để chọn quốc gia
            </span>

            <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border-2 border-yellow-400/50 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
              <span className="text-6xl md:text-7xl select-none filter drop-shadow-md">{teamA.flag}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-yellow-300 transition-colors truncate">
              {teamA.name}
            </h2>

            <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 bg-black/30 rounded-full border border-white/10 text-xs text-emerald-200">
              <span>Sức mạnh: {teamA.stars}</span>
              <span className="text-yellow-400">⭐</span>
              <span className="mx-1">•</span>
              <span>{teamA.region}</span>
            </div>
          </div>

          {/* CHỮ VS VÀ NÚT DỰ ĐOÁN Ở GIỮA */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-amber-500 text-emerald-950 rounded-full flex items-center justify-center text-3xl md:text-4xl font-black italic shadow-2xl transform -rotate-12 border-4 border-white animate-pulse">
              VS
            </div>

            <button
              onClick={runMatchSimulation}
              disabled={isSimulating}
              className="mt-6 w-full sm:w-auto lg:w-48 bg-white hover:bg-yellow-300 text-emerald-950 px-6 py-4 rounded-2xl font-black uppercase tracking-tighter text-lg shadow-[0_8px_0_0_#94a3b8] active:shadow-none active:translate-y-2 transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-emerald-950"
            >
              {isSimulating ? (
                <>
                  <Shuffle className="w-6 h-6 animate-spin text-emerald-800" />
                  <span>Đang đoán...</span>
                </>
              ) : (
                <>
                  <Swords className="w-6 h-6 text-emerald-950" />
                  <span>DỰ ĐOÁN</span>
                </>
              )}
            </button>
          </div>

          {/* Ô QUỐC GIA 2 (ĐỘI KHÁCH) */}
          <div 
            onClick={() => setActiveModalSlot('B')}
            className="lg:col-span-5 bg-white/10 hover:bg-white/15 backdrop-blur-xl border-2 border-white/20 hover:border-blue-400 rounded-[36px] p-8 md:p-10 text-center shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-2xl tracking-widest shadow">
              Slot Đội Khách
            </div>

            <span className="text-xs font-black uppercase text-emerald-300 tracking-widest block mb-4 group-hover:text-blue-300 transition-colors">
              👉 Bấm để chọn quốc gia
            </span>

            <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-2 border-blue-400/50 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
              <span className="text-6xl md:text-7xl select-none filter drop-shadow-md">{teamB.flag}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-blue-300 transition-colors truncate">
              {teamB.name}
            </h2>

            <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 bg-black/30 rounded-full border border-white/10 text-xs text-emerald-200">
              <span>Sức mạnh: {teamB.stars}</span>
              <span className="text-yellow-400">⭐</span>
              <span className="mx-1">•</span>
              <span>{teamB.region}</span>
            </div>
          </div>

        </main>

        {/* THANH TỈ LỆ KẾT QUẢ PHÍA DƯỚI */}
        <PredictionBar
          teamA={teamA}
          teamB={teamB}
          prediction={prediction}
        />

        {!prediction && !isSimulating && (
          <div className="text-center mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <Sparkles className="w-6 h-6 text-yellow-400 mx-auto mb-2 animate-bounce" />
            <p className="text-sm text-emerald-200 font-medium">
              Bấm nút <span className="text-yellow-400 font-black">DỰ ĐOÁN</span> ở giữa để hệ thống chạy ngẫu nhiên mô phỏng trận cầu đỉnh cao này!
            </p>
          </div>
        )}

      </div>

      {/* MODAL CHỌN QUỐC GIA */}
      <CountryModal
        isOpen={activeModalSlot !== null}
        onClose={() => setActiveModalSlot(null)}
        onSelect={handleSelectCountry}
        slotTitle={activeModalSlot === 'A' ? `Đội Nhà (${teamA.name})` : `Đội Khách (${teamB.name})`}
      />

      {/* Footer */}
      <footer className="mt-16 text-center py-6 text-xs text-emerald-300/40 border-t border-emerald-800/40 relative z-10">
        <p>⚽ World Cup Match Predictor • Thuật toán Monte Carlo dự đoán ngẫu nhiên tỉ lệ thắng</p>
      </footer>

    </div>
  );
}
