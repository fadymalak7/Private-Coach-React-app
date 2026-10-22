import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Play, Clock, MessageCircle } from 'lucide-react';
import { COACH_INFO } from '../data/mockData';

export const VideoPlayerModal = ({ video, onClose }) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) return null;

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

        {/* Video Player Display */}
        <div className="relative rounded-lg overflow-hidden bg-black aspect-video border border-[#252B35] mb-5 group">
          {!isPlaying ? (
            <div className="relative w-full h-full">
              <img
                src={video.thumbnail}
                alt={video.title[language]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-[#E05A32] text-white flex items-center justify-center shadow-xl shadow-[#E05A32]/40 hover:scale-105 active:scale-95 transition-transform"
                  aria-label="Play video"
                >
                  <Play className="w-7 h-7 fill-current translate-x-0.5" />
                </button>
              </div>
              <div className="absolute bottom-3 end-3 px-2 py-1 bg-black/80 text-xs font-mono text-white rounded">
                {video.duration}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#0C0E12] text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E05A32]/20 text-[#E05A32] flex items-center justify-center animate-pulse">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <h4 className="text-sm font-semibold text-white">
                {language === 'ar' ? 'عرض توضيحي للتكنيك' : 'Video Tutorial Stream'}
              </h4>
              <p className="text-xs text-[#9CA3AF] max-w-md">
                {language === 'ar'
                  ? 'هذا مقطع فيديو تعليمي إرشادي مسجل من كابتن مينا نشأت. في البرامج الخاصة يستلم كل مشترك فيديوهات تكنيك مفصلة لكل تمرين في خطته.'
                  : 'This is an educational video tutorial. During active 1-on-1 coaching, you receive personalized video form corrections directly from Coach Mina Nashat.'}
              </p>
              <button
                onClick={() => setIsPlaying(false)}
                className="text-xs text-[#E05A32] hover:underline"
              >
                {language === 'ar' ? 'إعادة العرض' : 'Return to thumbnail'}
              </button>
            </div>
          )}
        </div>

        {/* Video Metadata */}
        <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-2">
          <span className="text-[#E05A32] font-semibold">{video.category[language]}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {video.duration}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
          {video.title[language]}
        </h3>

        <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
          {video.description[language]}
        </p>

        {/* Key Points / Inquiries */}
        <div className="p-4 bg-[#1B2028] border border-[#252B35] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#D1D5DB]">
            <span className="font-semibold block text-white mb-0.5">
              {language === 'ar' ? 'عندك استفسار عن هذا التمرين أو محتاج تصحيح لتكنيكك؟' : 'Have a question on this exercise or need a form check?'}
            </span>
            <span>{language === 'ar' ? 'تواصل مع كابتن مينا مباشرة على واتساب.' : 'Message Coach Mina directly and get fast feedback.'}</span>
          </div>
          <a
            href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(
              language === 'ar'
                ? `مرحباً كابتن مينا، شاهدت فيديو "${video.title.ar}" وأريد الاستفسار عنه.`
                : `Hello Coach Mina, I just watched your video "${video.title.en}" and had a quick question.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{language === 'ar' ? 'اسأل الكوتش عبر واتساب' : 'Ask on WhatsApp'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
