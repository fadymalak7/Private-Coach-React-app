import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { COACH_INFO } from '../data/mockData';
import { ShieldCheck, ArrowUpRight, MessageCircle } from 'lucide-react';

export const AboutPage = ({ onOpenApplication }) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <div className="py-12 md:py-20 space-y-16 md:space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {t.coach.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.coach.title}
          </h1>
          <p className="text-base text-[#9CA3AF] leading-relaxed">
            {t.coach.subtitle}
          </p>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden bg-[#14171D] border border-[#252B35] shadow-2xl">
              <img
                src="/src/assets/images/coach_portrait_hero_1791127595581.jpg"
                alt={COACH_INFO.name[language]}
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/5] object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-start">
            <div className="inline-block px-3 py-1 bg-[#14171D] border border-[#252B35] text-xs font-semibold text-[#E05A32] rounded-lg">
              {COACH_INFO.title[language]}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {language === 'ar' ? 'القصة من البداية: كيف تحولت المعاناة إلى شغف بالتدريب؟' : 'The Genesis: How Personal Struggle Became My Life Purpose'}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
              <p>{COACH_INFO.story.origin[language]}</p>
              <p>{COACH_INFO.story.learning[language]}</p>
              <p>{COACH_INFO.story.mission[language]}</p>
              <p>{COACH_INFO.story.today[language]}</p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenApplication}
                className="py-3 px-6 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{t.cta.startJourney}</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
              </button>
              <a
                href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.cta.whatsappDirect}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-[#14171D] border border-[#252B35] rounded-2xl p-8 sm:p-12 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              {t.coach.certificationsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              {language === 'ar'
                ? 'مبني على أسس علمية معتمدة من كبرى المنظمات الرياضية في العالم'
                : 'Formally accredited by internationally recognized fitness and sports science institutions'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COACH_INFO.credentials.map((cred, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#1B2028] border border-[#252B35] rounded-xl flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E05A32]/10 border border-[#E05A32]/20 flex items-center justify-center text-[#E05A32] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {cred[language]}
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    {language === 'ar' ? 'سجل تدريبي موثق وتحديث دوري للمناهج الأكاديمية' : 'Verified credentials with continuous scientific education'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
