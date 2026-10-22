import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';
import { ArrowUpRight, CheckCircle2, Clock, MessageCircle } from 'lucide-react';

export const HowItWorksPage = ({ onOpenApplication }) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <div className="py-12 md:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {t.howItWorks.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.howItWorks.title}
          </h1>
          <p className="text-base text-[#9CA3AF]">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="space-y-8 max-w-4xl mx-auto mb-16">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-[#14171D] border border-[#252B35] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#E05A32]/10 border border-[#E05A32]/30 flex items-center justify-center text-[#E05A32] font-mono font-extrabold text-2xl shrink-0">
                {step.step}
              </div>

              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold text-white">
                  {step.title[language]}
                </h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {step.desc[language]}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#D1D5DB]">
                  {idx === 0 && (
                    <span className="flex items-center gap-1.5 text-[#25D366]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {language === 'ar' ? 'خيارات اشتراك مرنة من شهر حتى سنة' : 'Flexible options from 1 to 12 months'}
                    </span>
                  )}
                  {idx === 1 && (
                    <span className="flex items-center gap-1.5 text-[#25D366]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {language === 'ar' ? 'استبيان ذكي من 7 مراحل يغطي كل تفاصيلك' : '7-stage assessment tailored to your schedule'}
                    </span>
                  )}
                  {idx === 2 && (
                    <span className="flex items-center gap-1.5 text-[#25D366]">
                      <Clock className="w-3.5 h-3.5" />
                      {language === 'ar' ? 'تسليم الخطة خلال 48-72 ساعة كحد أقصى' : 'Program delivery within 48–72 hours'}
                    </span>
                  )}
                  {idx === 3 && (
                    <span className="flex items-center gap-1.5 text-[#25D366]">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {language === 'ar' ? 'تعديلات مستمرة عند أي ثبات في الوزن' : 'Dynamic adjustments upon weight plateau'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onOpenApplication}
            className="py-3.5 px-8 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-[#E05A32]/25 inline-flex items-center gap-2"
          >
            <span>{t.cta.startJourney}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};
