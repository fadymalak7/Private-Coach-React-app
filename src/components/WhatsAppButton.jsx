import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { COACH_INFO } from '../data/mockData';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const { language, isRtl } = useLanguage();

  const prefilledMessage = encodeURIComponent(
    language === 'ar'
      ? 'مرحباً كابتن مينا، أريد الاستفسار عن باقات التدريب والمتابعة أونلاين.'
      : 'Hello Coach Mina, I would like to inquire about online coaching and personalized packages.'
  );

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className={`fixed z-30 bottom-20 md:bottom-6 ${
        isRtl ? 'left-4 md:left-6' : 'right-4 md:right-6'
      } flex items-center gap-2 group`}
    >
      <span className="hidden sm:inline-block px-3 py-1.5 text-xs font-medium text-white bg-[#14171D] border border-[#252B35] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {language === 'ar' ? 'تواصل مع كابتن مينا على واتساب' : 'Chat with Coach Mina on WhatsApp'}
      </span>
      <a
        href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}?text=${prefilledMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        aria-label="WhatsApp Direct Chat"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </aside>
  );
};
