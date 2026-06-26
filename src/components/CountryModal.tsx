import React, { useState } from 'react';
import { Search, X, Globe, Star } from 'lucide-react';
import { ALL_COUNTRIES, REGIONS } from '../data';
import { Country } from '../types';

interface CountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  slotTitle: string;
}

export const CountryModal: React.FC<CountryModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  slotTitle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Tất cả');

  if (!isOpen) return null;

  const filteredCountries = ALL_COUNTRIES.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'Tất cả' || c.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-gradient-to-b from-emerald-900 via-slate-900 to-emerald-950 border-2 border-yellow-400/40 rounded-[32px] shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-emerald-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-400 text-emerald-950 rounded-xl font-black">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold block">
                Chọn quốc gia tham chiến
              </span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase italic text-yellow-400">
                {slotTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white bg-white/10 hover:bg-red-500/80 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-6 pb-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm quốc gia (vd: Brazil, Việt Nam, Nhật Bản, Pháp...)"
              autoFocus
              className="w-full pl-12 pr-4 py-3.5 bg-emerald-950/80 border-2 border-emerald-500/30 rounded-2xl text-white placeholder-emerald-300/50 font-bold focus:outline-none focus:border-yellow-400 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Region Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex-shrink-0 ${
                  selectedRegion === region
                    ? 'bg-yellow-400 text-emerald-950 shadow-md scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-emerald-200 border border-white/10'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách lưới các quốc gia */}
        <div className="flex-grow overflow-y-auto p-6 pt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {filteredCountries.length === 0 ? (
            <div className="col-span-full py-12 text-center text-emerald-300/60 font-medium">
              Không tìm thấy quốc gia phù hợp với "{searchQuery}"
            </div>
          ) : (
            filteredCountries.map((country) => (
              <button
                key={country.id}
                onClick={() => {
                  onSelect(country);
                  onClose();
                }}
                className="group bg-white/5 hover:bg-yellow-400/15 border-2 border-white/10 hover:border-yellow-400 rounded-2xl p-4 text-center transition-all duration-200 flex flex-col items-center justify-between cursor-pointer active:scale-95 shadow-lg"
              >
                <div className="w-14 h-14 bg-emerald-950/60 rounded-full flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                  <span className="text-3xl select-none">{country.flag}</span>
                </div>
                
                <span className="font-black text-sm text-white group-hover:text-yellow-300 uppercase tracking-tight block truncate w-full mb-1">
                  {country.name}
                </span>

                <div className="flex items-center justify-center gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-3 h-3 ${
                        idx < country.stars
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/15 fill-white/10'
                      }`}
                    />
                  ))}
                </div>
              </button>
            ))
          )}
        </div>

        <div className="px-6 py-3 bg-emerald-950/90 border-t border-white/10 text-center text-[11px] text-emerald-300/60 italic">
          Bấm vào quốc gia bất kỳ để áp dụng ngay vào màn hình đối đầu
        </div>

      </div>
    </div>
  );
};
