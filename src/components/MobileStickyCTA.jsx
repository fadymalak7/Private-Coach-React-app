import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { COACH_INFO } from '../data/mockData';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export const MobileStickyCTA = ({ onOpenApplication }) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0C0E12]/95 backdrop-blur-md border-t border-[#252B35] px-3 py-2.5 flex items-center gap-2">
      <button
        onClick={onOpenApplication}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-[#E05A32] active:bg-[#C94A24] rounded-lg shadow-sm whitespace-nowrap"
      >
        <span>{t.cta.startJourney}</span>
        <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
      </button>

      <a
        href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(
          language === 'ar'
            ? 'مرحباً كابتن مينا، أريد الاستفسار عن باقات التدريب أونلاين.'
            : 'Hello Coach Mina, I would like to inquire about your coaching plans.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg flex items-center justify-center shrink-0"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
    </div>
  );
};
