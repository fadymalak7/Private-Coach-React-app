import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { VIDEOS_DATA } from '../data/mockData';
import { Play, ArrowUpRight } from 'lucide-react';

export const VideosPage = ({ onSelectVideo, onOpenApplication }) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <div className="py-12 md:py-20 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {t.videos.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.videos.title}
          </h1>
          <p className="text-base text-[#9CA3AF]">
            {t.videos.subtitle}
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS_DATA.map((vid) => (
            <div
              key={vid.id}
              className="bg-[#14171D] border border-[#252B35] rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#384150] transition-colors"
              onClick={() => onSelectVideo(vid)}
            >
              <div>
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title[language]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#E05A32] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 end-2 px-2 py-0.5 bg-black/80 text-xs font-mono text-white rounded">
                    {vid.duration}
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="text-xs text-[#E05A32] font-semibold">
                    {vid.category[language]}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#E05A32] transition-colors line-clamp-2">
                    {vid.title[language]}
                  </h3>

                  <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                    {vid.description[language]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-xs font-medium text-[#9CA3AF] group-hover:text-white flex items-center gap-1 transition-colors">
                  <span>{t.cta.watchVideo}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
