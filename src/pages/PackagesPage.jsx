import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { COACHING_PACKAGES, COACH_INFO } from '../data/mockData';
import { CheckCircle2, ArrowUpRight, MessageCircle } from 'lucide-react';

export const PackagesPage = ({ onOpenApplication, onNavigate }) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [duration, setDuration] = useState(3);

  return (
    <div className="py-12 md:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {t.packages.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.packages.title}
          </h1>
          <p className="text-base text-[#9CA3AF]">
            {t.packages.subtitle}
          </p>

          <div className="inline-flex items-center gap-1 p-1 bg-[#14171D] border border-[#252B35] rounded-xl mt-8">
            {[1, 3, 6, 12].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  duration === d
                    ? 'bg-[#E05A32] text-white shadow-sm'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {d === 1 && t.packages.durations.month1}
                {d === 3 && t.packages.durations.months3}
                {d === 6 && t.packages.durations.months6}
                {d === 12 && t.packages.durations.months12}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {COACHING_PACKAGES.map((pkg) => {
            const price = pkg.prices[duration];
            const monthlyEquivalent = Math.round(price / duration);

            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  pkg.recommended
                    ? 'bg-[#181C23] border-2 border-[#E05A32] shadow-xl shadow-[#E05A32]/10 scale-100 lg:-translate-y-2'
                    : 'bg-[#14171D] border border-[#252B35]'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-[#E05A32] text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                    {t.packages.mostPopular}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {pkg.name[language]}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] mb-6 min-h-[32px]">
                    {pkg.subtitle[language]}
                  </p>

                  <div className="mb-6 pb-6 border-b border-[#252B35]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white tabular-nums">
                        {price.toLocaleString()}
                      </span>
                      <span className="text-sm font-semibold text-[#9CA3AF]">
                        {pkg.currency[language]}
                      </span>
                    </div>
                    <span className="text-xs text-[#9CA3AF] block mt-1">
                      {duration > 1 && (
                        <span className="text-[#25D366] font-medium">
                          {language === 'ar'
                            ? `(يعادل ${monthlyEquivalent.toLocaleString()} ${pkg.currency.ar}/شهر)`
                            : `(approx. ${monthlyEquivalent.toLocaleString()} ${pkg.currency.en}/mo)`}
                          {' · '}
                        </span>
                      )}
                      {pkg.period[language]}
                    </span>
                  </div>

                  <div className="space-y-2.5 mb-6 text-xs text-[#D1D5DB]">
                    <div className="flex items-center justify-between border-b border-[#252B35]/60 pb-2">
                      <span className="text-[#9CA3AF]">{language === 'ar' ? 'المتابعة الدورية:' : 'Check-in Cadence:'}</span>
                      <span className="font-semibold text-white">{pkg.followUp[language]}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#252B35]/60 pb-2">
                      <span className="text-[#9CA3AF]">{language === 'ar' ? 'تعديل الخطة:' : 'Plan Adjustments:'}</span>
                      <span className="font-semibold text-white">{pkg.planUpdates[language]}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[#9CA3AF]">{language === 'ar' ? 'وسيلة الدعم:' : 'Support Channel:'}</span>
                      <span className="font-semibold text-white">{pkg.supportMethod[language]}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] block mb-2">
                      {language === 'ar' ? 'تفاصيل المزايا:' : 'Included Features:'}
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#D1D5DB]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                        <span>{feat[language]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onOpenApplication(pkg.id)}
                    className={`w-full py-3 px-4 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      pkg.recommended
                        ? 'bg-[#E05A32] hover:bg-[#C94A24] text-white shadow-[#E05A32]/30'
                        : 'bg-[#1B2028] hover:bg-[#252B35] text-white'
                    }`}
                  >
                    <span>{t.cta.subscribeNow}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Assistance */}
        <div className="bg-[#14171D] border border-[#252B35] rounded-2xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-start">
            <h4 className="text-lg font-bold text-white">
              {language === 'ar' ? 'محتار أي باقة هي الأنسب لهدفك الحالي؟' : 'Unsure which package fits your current situation?'}
            </h4>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              {language === 'ar'
                ? 'تواصل مع كابتن مينا نشأت مباشرة على واتساب، وسيرشدك للباقة المثالية.'
                : 'Message Coach Mina Nashat directly on WhatsApp for an honest recommendation.'}
            </p>
          </div>
          <a
            href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(
              language === 'ar' ? 'مرحباً كابتن مينا، محتار بين الباقات ومحتاج استشارة سريعة.' : 'Hello Coach Mina, I need help deciding between your coaching tiers.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{language === 'ar' ? 'استشر كابتن مينا على واتساب' : 'Consult Coach Mina on WhatsApp'}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
