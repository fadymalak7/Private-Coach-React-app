import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { COACH_INFO } from '../data/mockData';
import { MessageCircle, Instagram, Youtube, Mail, Award } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenApplication }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <footer className="bg-[#090B0E] border-t border-[#252B35] text-[#9CA3AF] pt-16 pb-24 md:pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#252B35]">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <span className="text-xl font-bold tracking-tight text-white block">
              {t.brandName}
            </span>
            <p className="text-sm leading-relaxed text-[#9CA3AF]">
              {t.footer.aboutText}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COACH_INFO.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#14171D] border border-[#252B35] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-[#E05A32] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COACH_INFO.contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#14171D] border border-[#252B35] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-[#E05A32] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#14171D] border border-[#252B35] flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('transformations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.transformations}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.calculator}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Start */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.programs}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-start"
                >
                  {language === 'ar' ? 'باقة الانطلاق (Starter)' : 'Starter Package'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-start"
                >
                  {language === 'ar' ? 'باقة التحول الشامل (Advanced)' : 'Transformation Tier (Advanced)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-start"
                >
                  {language === 'ar' ? 'باقة النخبة الشخصية (VIP Elite)' : 'VIP Elite Mentorship'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenApplication()}
                  className="text-[#E05A32] hover:underline font-medium text-start pt-1 block"
                >
                  {t.cta.applyForCoaching} ←
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Verification */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span dir="ltr">{COACH_INFO.contact.whatsappDisplay}</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E05A32] shrink-0" />
                <span>{COACH_INFO.contact.email}</span>
              </div>
              <div className="pt-2 text-xs text-[#6B7280] leading-relaxed flex items-start gap-1.5">
                <Award className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span>ISSA Certified Master Trainer & Precision Nutrition PN1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>{t.footer.copyright}</p>
          <p className="max-w-xl text-center md:text-start">
            {t.footer.disclaimer}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-[#9CA3AF] transition-colors"
            >
              {t.footer.privacyPolicy}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-[#9CA3AF] transition-colors"
            >
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
