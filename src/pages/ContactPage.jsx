import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { COACH_INFO } from '../data/mockData';
import { MessageCircle, Mail, Clock, Send, CheckCircle2, Instagram, Youtube } from 'lucide-react';

export const ContactPage = () => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-12 md:py-20 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {language === 'ar' ? 'تواصل مع الكوتش' : 'Get In Touch'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'ar' ? 'أنا هنا لمساعدتك في اتخاذ الخطوة الصحيحة' : 'Direct Communication & Coaching Inquiries'}
          </h1>
          <p className="text-base text-[#9CA3AF]">
            {language === 'ar'
              ? 'سواء كنت تريد الاستفسار عن باقة معينة، أو مناقشة هدفك الرياضي، تواصل عبر النموذج أو مباشرة مع كابتن مينا على واتساب.'
              : 'Whether you want guidance choosing a package or want to discuss physical goals, reach out below.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#14171D] border border-[#252B35] rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'ar' ? 'قنوات التواصل المباشرة' : 'Direct Channels'}
              </h3>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#1B2028] hover:bg-[#202732] border border-[#252B35] rounded-xl flex items-center gap-4 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs text-[#9CA3AF] block">{language === 'ar' ? 'واتساب مباشر (الرد الأسرع)' : 'WhatsApp (Fastest Response)'}</span>
                    <span className="text-sm font-bold text-white" dir="ltr">{COACH_INFO.contact.whatsappDisplay}</span>
                  </div>
                </a>

                <div className="p-4 bg-[#1B2028] border border-[#252B35] rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E05A32]/10 flex items-center justify-center text-[#E05A32] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#9CA3AF] block">{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</span>
                    <span className="text-sm font-medium text-white">{COACH_INFO.contact.email}</span>
                  </div>
                </div>

                <div className="p-4 bg-[#1B2028] border border-[#252B35] rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#9CA3AF] block">{language === 'ar' ? 'أوقات الرد والمتابعة' : 'Support Hours'}</span>
                    <span className="text-sm font-medium text-white">
                      {language === 'ar' ? 'السبت - الخميس: 10 ص إلى 9 م' : 'Sat – Thu: 10:00 AM – 9:00 PM'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#252B35]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] block mb-3">
                  {language === 'ar' ? 'تابع محتوانا اليومي' : 'Follow Our Content'}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={COACH_INFO.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-[#1B2028] hover:bg-[#252B35] border border-[#252B35] rounded-lg text-xs font-medium text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={COACH_INFO.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-[#1B2028] hover:bg-[#252B35] border border-[#252B35] rounded-lg text-xs font-medium text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <Youtube className="w-4 h-4 text-[#FF0000]" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#14171D] border border-[#252B35] rounded-2xl p-6 sm:p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {language === 'ar' ? 'أرسل رسالة سريعة' : 'Send a Direct Message'}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] mb-6">
                    {language === 'ar'
                      ? 'املأ النموذج وسيقوم كابتن مينا بالرد عليك في غضون 24 ساعة كحد أقصى.'
                      : 'Fill in the fields below and Coach Mina will reply within 24 hours.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'تفاصيل رسالتك أو استفسارك' : 'Your Message / Inquiry'}
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        language === 'ar'
                          ? 'اكتب هدفك، وزنك الحالي، أو أي استفسار عن الباقات...'
                          : 'Describe your current fitness state, primary goal, or specific questions...'
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {language === 'ar' ? 'تم استلام رسالتك بنجاح!' : 'Message Received!'}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
                    {language === 'ar'
                      ? `شكراً لتواصلك يا ${formData.name}. سيقوم كابتن مينا بالرد عليك عبر واتساب أو الهاتف في أقرب وقت.`
                      : `Thank you, ${formData.name}. Coach Mina will personally reach out via WhatsApp or phone shortly.`}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', message: '' });
                    }}
                    className="pt-2 text-xs text-[#E05A32] hover:underline"
                  >
                    {language === 'ar' ? 'إرسال استفسار آخر' : 'Send another inquiry'}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
