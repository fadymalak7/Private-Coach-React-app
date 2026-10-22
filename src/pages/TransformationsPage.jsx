import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { TRANSFORMATIONS_DATA } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';

export const TransformationsPage = ({
  onSelectTransformation,
  onOpenApplication,
}) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? TRANSFORMATIONS_DATA
    : TRANSFORMATIONS_DATA.filter((i) => i.category === filter);

  return (
    <div className="py-12 md:py-20 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {t.transformations.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.transformations.title}
          </h1>
          <p className="text-base text-[#9CA3AF]">
            {t.transformations.subtitle}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-[#14171D] border border-[#252B35] rounded-xl max-w-fit mx-auto">
            {['all', 'fat-loss', 'muscle-gain', 'recomp', 'beginner'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#E05A32] text-white shadow-sm'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {t.transformations.filters[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#14171D] border border-[#252B35] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#384150] transition-colors group"
            >
              <div>
                <div className="relative aspect-[4/3] bg-[#0C0E12] overflow-hidden">
                  <img
                    src={item.afterImage}
                    alt={item.name[language]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 start-3 px-2.5 py-1 text-xs font-semibold bg-black/80 backdrop-blur-sm text-[#E05A32] rounded">
                    {item.categoryLabel[language]}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                    <span>{item.duration[language]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-bold text-[#25D366] tabular-nums">{item.metrics.weightChange[language]}</span>
                    {item.metrics.waistChange && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{item.metrics.waistChange[language]}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {item.name[language]}
                  </h3>

                  <div className="bg-[#1B2028] p-3 rounded-lg border border-[#252B35] text-xs text-[#D1D5DB] space-y-1">
                    <span className="text-[#9CA3AF] block font-medium">
                      {language === 'ar' ? 'الهدف المحقق:' : 'Target Achieved:'}
                    </span>
                    <p className="line-clamp-2">{item.goal[language]}</p>
                  </div>

                  <p className="text-xs text-[#9CA3AF] line-clamp-3 leading-relaxed">
                    {item.story[language]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectTransformation(item)}
                  className="w-full py-3 px-4 bg-[#1B2028] hover:bg-[#252B35] text-xs font-semibold text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t.cta.viewCaseStudy}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 bg-[#14171D] border border-[#252B35] rounded-2xl text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-white">
            {language === 'ar' ? 'هل أنت مستعد لتكون قصة النجاح القادمة؟' : 'Ready to be our next documented success story?'}
          </h3>
          <p className="text-sm text-[#9CA3AF]">
            {language === 'ar'
              ? 'كل ما تحتاجه هو قرار البداية والالتزام بالتوجيهات. كابتن مينا نشأت يتكفل بتفصيل الخطة خطوة بخطوة.'
              : 'All you need is the decision to commit. Coach Mina Nashat takes care of designing every rep and calorie.'}
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenApplication}
              className="py-3 px-8 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              {t.cta.startJourney}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
