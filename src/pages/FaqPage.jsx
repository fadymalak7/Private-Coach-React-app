import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { FAQS_DATA, COACH_INFO } from '../data/mockData';
import { ChevronDown, MessageCircle } from 'lucide-react';

export const FaqPage = () => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [activeCategory, setActiveCategory] = useState('all');
  const [openIds, setOpenIds] = useState(['faq-1', 'faq-3']);

  const categories = [
    { id: 'all', label: { ar: 'جميع الأسئلة', en: 'All Questions' } },
    { id: 'general', label: { ar: 'عام والاشتراك', en: 'General' } },
    { id: 'training', label: { ar: 'التمرين والمتابعة', en: 'Training & Form' } },
    { id: 'nutrition', label: { ar: 'التغذية والدايت', en: 'Nutrition & Diet' } },
    { id: 'payments', label: { ar: 'الدفع والتحويلات', en: 'Payments' } },
  ];

  const filtered = activeCategory === 'all'
    ? FAQS_DATA
    : FAQS_DATA.filter((i) => i.category === activeCategory);

  const toggleFaq = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-12 md:py-20 space-y-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {t.faq.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.faq.title}
          </h1>
          <p className="text-base text-[#9CA3AF]">
            {t.faq.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#14171D] border border-[#252B35] rounded-xl max-w-fit mx-auto mt-8">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === c.id
                    ? 'bg-[#E05A32] text-white shadow-sm'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {c.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {filtered.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-[#14171D] border border-[#252B35] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 focus:outline-none focus-visible:bg-[#1B2028]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question[language]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#9CA3AF] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#E05A32]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#9CA3AF] leading-relaxed border-t border-[#252B35]/50 animate-in fade-in duration-150">
                    {faq.answer[language]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Consultation Box */}
        <div className="mt-14 p-6 bg-[#14171D] border border-[#252B35] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">
              {language === 'ar' ? 'هل لديك حالة خاصة أو استفسار محدد؟' : 'Have a medical condition or specific question?'}
            </h4>
            <p className="text-xs text-[#9CA3AF]">
              {language === 'ar' ? 'تواصل مع كابتن مينا مباشرة وسيجيبك بأمانة كاملة قبل اتخاذ أي قرار.' : 'Speak with Coach Mina directly before committing.'}
            </p>
          </div>
          <a
            href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{t.cta.whatsappDirect}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
