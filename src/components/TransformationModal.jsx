import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, Target, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const TransformationModal = ({
  transformation,
  onClose,
  onOpenApplication,
}) => {
  const { language, isRtl } = useLanguage();

  if (!transformation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#14171D] border border-[#252B35] rounded-xl shadow-2xl p-6 md:p-8 text-[#F3F4F6] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 text-[#9CA3AF] hover:text-white rounded-lg hover:bg-[#1B2028] transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Client Name & Metadata */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-1">
            <span className="text-[#E05A32] font-semibold">{transformation.categoryLabel[language]}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {transformation.duration[language]}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {transformation.name[language]}
          </h3>
        </div>

        {/* Images & Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative rounded-lg overflow-hidden bg-[#0C0E12] aspect-square border border-[#252B35]">
            <img
              src={transformation.afterImage}
              alt={transformation.name[language]}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 start-2 px-2.5 py-1 text-xs font-semibold bg-black/75 backdrop-blur-sm text-white rounded">
              {language === 'ar' ? 'النتيجة بعد الالتزام' : 'Transformed Physique'}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 bg-[#1B2028] p-5 rounded-lg border border-[#252B35]">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">
                {language === 'ar' ? 'أرقام التحول الموثقة' : 'Verified Milestones'}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-[#252B35] pb-2">
                  <span className="text-[#9CA3AF]">{language === 'ar' ? 'فارق الوزن' : 'Weight Change'}</span>
                  <span className="font-bold text-[#25D366] tabular-nums">{transformation.metrics.weightChange[language]}</span>
                </div>
                {transformation.metrics.bodyFatChange && (
                  <div className="flex justify-between items-center text-sm border-b border-[#252B35] pb-2">
                    <span className="text-[#9CA3AF]">{language === 'ar' ? 'نسبة الدهون' : 'Body Fat'}</span>
                    <span className="font-bold text-white tabular-nums">{transformation.metrics.bodyFatChange[language]}</span>
                  </div>
                )}
                {transformation.metrics.waistChange && (
                  <div className="flex justify-between items-center text-sm border-b border-[#252B35] pb-2">
                    <span className="text-[#9CA3AF]">{language === 'ar' ? 'محيط الخصر' : 'Waist Size'}</span>
                    <span className="font-bold text-white tabular-nums">{transformation.metrics.waistChange[language]}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-[#9CA3AF] block mb-1">
                {language === 'ar' ? 'الهدف المبدئي:' : 'Initial Goal:'}
              </span>
              <p className="text-xs font-medium text-[#F3F4F6]">
                {transformation.goal[language]}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Story & Strategy */}
        <div className="space-y-4 mb-6 text-sm text-[#D1D5DB] leading-relaxed">
          <div className="bg-[#0C0E12] p-4 rounded-lg border border-[#252B35]">
            <h5 className="text-xs font-semibold text-[#E05A32] uppercase mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'التحدي الأكبر قبل الاشتراك' : 'The Core Challenge'}</span>
            </h5>
            <p className="text-xs text-[#9CA3AF]">
              {transformation.challenge[language]}
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white mb-2">
              {language === 'ar' ? 'تفاصيل الخطة وكيف وصلنا للنتيجة:' : 'The Strategy & Execution:'}
            </h5>
            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
              {transformation.story[language]}
            </p>
          </div>

          <div className="bg-[#1B2028] p-4 rounded-lg border border-[#252B35] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
            <p className="text-xs text-[#D1D5DB]">
              {transformation.resultsSummary[language]}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#252B35]">
          <button
            onClick={() => {
              onClose();
              onOpenApplication();
            }}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <span>{language === 'ar' ? 'ابدأ تحولك مع كابتن مينا نشأت' : 'Start Your Transformation with Coach Mina'}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 bg-[#1B2028] hover:bg-[#252B35] text-[#D1D5DB] text-xs font-medium rounded-lg transition-colors"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
