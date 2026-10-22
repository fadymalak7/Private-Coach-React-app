import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { X, Download, CheckCircle, BookOpen } from 'lucide-react';

export const FreeGuideModal = ({
  isOpen,
  onClose,
  onOpenApplication,
}) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(language === 'ar' ? 'من فضلك أدخل اسمك' : 'Please enter your name');
      return;
    }
    if (!whatsapp.trim() || whatsapp.trim().length < 8) {
      setError(language === 'ar' ? 'من فضلك أدخل رقم واتساب صحيح' : 'Please enter a valid WhatsApp number');
      return;
    }

    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `COACH MINA NASHAT FITNESS COACHING - BEGINNER BLUEPRINT\n\nName: ${name}\nDate: ${new Date().toLocaleDateString()}\n\nKey Principles:\n1. Calorie Balance & Moderate Deficit\n2. 1.8g - 2.0g Protein per kg\n3. Progressive Overload in 45-60 min gym sessions\n4. 7-8 hours deep sleep\n\nFor 1-on-1 coaching with Coach Mina, visit minanashat.com`
    ], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Coach_Mina_Nashat_Blueprint_Guide.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14171D] border border-[#252B35] rounded-xl shadow-2xl p-6 md:p-8 text-[#F3F4F6] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 text-[#9CA3AF] hover:text-white rounded-lg hover:bg-[#1B2028] transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E05A32] mb-2">
              <BookOpen className="w-4 h-4" />
              <span>{t.freeResource.badge}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
              {t.freeResource.title}
            </h3>

            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
              {t.freeResource.subtitle}
            </p>

            <div className="bg-[#1B2028] border border-[#252B35] rounded-lg p-4 mb-6 space-y-2 text-xs text-[#D1D5DB]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{language === 'ar' ? 'طريقة حساب سعراتك بدقة خطوة بخطوة' : 'Exact step-by-step calorie calculation formula'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{language === 'ar' ? 'جدول بدائل أطعمة مرنة بدون حرمان' : 'Flexible food swap cheat sheet'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{language === 'ar' ? 'أهم 5 أخطاء تدريب يجب تفاديها في الجيم' : 'Top 5 beginner lifting traps to avoid'}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#D1D5DB] mb-1.5">
                  {language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.freeResource.namePlaceholder}
                  className="w-full px-4 py-2.5 bg-[#0C0E12] border border-[#252B35] focus:border-[#E05A32] focus:ring-1 focus:ring-[#E05A32] rounded-lg text-sm text-white placeholder-[#6B7280] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D1D5DB] mb-1.5">
                  {language === 'ar' ? 'رقم الواتساب (لاستلام الدليل)' : 'WhatsApp Number (for delivery)'}
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder={t.freeResource.whatsappPlaceholder}
                  className="w-full px-4 py-2.5 bg-[#0C0E12] border border-[#252B35] focus:border-[#E05A32] focus:ring-1 focus:ring-[#E05A32] rounded-lg text-sm text-white placeholder-[#6B7280] outline-none transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-[#EF4444] font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#E05A32] hover:bg-[#C94A24] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{language === 'ar' ? 'جاري التجهيز...' : 'Preparing...'}</span>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{t.freeResource.cta}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white">
              {language === 'ar' ? `أهلاً بك يا ${name}!` : `Welcome, ${name}!`}
            </h3>

            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              {t.freeResource.success}
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleDownloadFile}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#E05A32] hover:bg-[#C94A24] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t.freeResource.downloadDirect}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenApplication();
                }}
                className="w-full py-2.5 px-4 bg-[#1B2028] hover:bg-[#252B35] text-[#D1D5DB] text-xs font-medium rounded-lg transition-colors"
              >
                {t.cta.needAccuratePlan}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
