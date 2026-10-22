import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Clock, Bookmark, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const ArticleModal = ({
  article,
  onClose,
  onOpenApplication,
}) => {
  const { language, isRtl } = useLanguage();

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#14171D] border border-[#252B35] rounded-xl shadow-2xl p-6 md:p-8 text-[#F3F4F6] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 text-[#9CA3AF] hover:text-white rounded-lg hover:bg-[#1B2028] transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Metadata (Zero-Pill discipline: unboxed text with ·) */}
        <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-2">
          <span className="text-[#E05A32] font-semibold">{article.category[language]}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime[language]}
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.date}</span>
        </div>

        <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-6">
          {article.title[language]}
        </h2>

        {/* Feature Image */}
        <div className="rounded-lg overflow-hidden bg-[#0C0E12] aspect-video border border-[#252B35] mb-6">
          <img
            src={article.image}
            alt={article.title[language]}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-[#1B2028] border border-[#252B35] p-5 rounded-lg mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E05A32] mb-3 flex items-center gap-1.5">
            <Bookmark className="w-4 h-4" />
            <span>{language === 'ar' ? 'الخلاصة العملية السريعة' : 'Key Takeaways'}</span>
          </h4>
          <ul className="space-y-2">
            {article.keyTakeaways[language].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#D1D5DB]">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Paragraphs */}
        <div className="space-y-4 text-sm sm:text-base text-[#9CA3AF] leading-relaxed mb-8">
          {article.content[language].map((paragraph, index) => (
            <p key={index} className="text-[#D1D5DB]">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author Footer & Call To Action */}
        <div className="p-5 rounded-lg bg-[#0C0E12] border border-[#252B35] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h5 className="text-sm font-semibold text-white">
              {language === 'ar' ? 'هل تريد تطبيق هذا العلم على جسمك؟' : 'Ready to apply this science to your body?'}
            </h5>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              {language === 'ar' ? 'يصمم لك كابتن مينا خطة مبنية بالكامل على طبيعة استجابة هرموناتك وجسمك.' : 'Custom protocols tailored to your hormonal and metabolic profile.'}
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenApplication();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-5 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            <span>{language === 'ar' ? 'ابدأ خطتك الآن' : 'Start Your Plan'}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
