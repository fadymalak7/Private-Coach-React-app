import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { ARTICLES_DATA } from '../data/mockData';
import { Clock, ArrowUpRight, Search } from 'lucide-react';

export const ArticlesPage = ({ onSelectArticle, onOpenApplication }) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = ARTICLES_DATA.filter((item) => {
    const text = (item.title[language] + ' ' + item.excerpt[language] + ' ' + item.category[language]).toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="py-12 md:py-20 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {t.articles.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.articles.title}
          </h1>
          <p className="text-base text-[#9CA3AF]">
            {t.articles.subtitle}
          </p>

          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute top-1/2 -translate-y-1/2 start-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'ar' ? 'ابحث في موضوعات التغذية والتمرين...' : 'Search articles on nutrition and training...'}
              className="w-full py-2.5 ps-10 pe-4 bg-[#14171D] border border-[#252B35] rounded-xl text-xs text-white placeholder-[#6B7280] focus:border-[#E05A32] outline-none"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="bg-[#14171D] border border-[#252B35] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#384150] transition-colors group cursor-pointer"
              onClick={() => onSelectArticle(art)}
            >
              <div>
                <div className="aspect-video bg-[#0C0E12] overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title[language]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                    <span className="text-[#E05A32] font-semibold">{art.category[language]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime[language]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#E05A32] transition-colors line-clamp-2">
                    {art.title[language]}
                  </h3>

                  <p className="text-xs text-[#9CA3AF] line-clamp-3 leading-relaxed">
                    {art.excerpt[language]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-xs font-semibold text-[#E05A32] flex items-center gap-1">
                  <span>{t.cta.readArticle}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-[#14171D] border border-[#252B35] rounded-2xl text-center max-w-2xl mx-auto space-y-3">
          <h3 className="text-xl font-bold text-white">
            {language === 'ar' ? 'هل تريد تطبيق العلم على جدولك اليومي؟' : 'Ready for a personalized scientific protocol?'}
          </h3>
          <p className="text-xs text-[#9CA3AF]">
            {language === 'ar' ? 'بدل ما تضيع وقتك في التجربة والخطأ، نبني لك خطة محسوبة بالسعرات والتكرار مع كابتن مينا.' : 'Skip the frustrating trial-and-error. Let Coach Mina engineer your bespoke diet and routine.'}
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenApplication}
              className="py-2.5 px-6 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors"
            >
              {t.cta.startJourney}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
