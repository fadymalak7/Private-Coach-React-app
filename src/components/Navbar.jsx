import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { Menu, X, Globe, ArrowUpRight, MessageCircle } from 'lucide-react';
import { COACH_INFO } from '../data/mockData';

export const Navbar = ({ activeTab, onNavigate, onOpenApplication }) => {
  const { language, isRtl, toggleLanguage } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'transformations', label: t.nav.transformations },
    { id: 'packages', label: t.nav.packages },
    { id: 'calculator', label: t.nav.calculator },
    { id: 'faq', label: t.nav.faq },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0C0E12]/90 backdrop-blur-md border-b border-[#252B35]/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-[#E05A32] transition-colors text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05A32]"
        >
          {t.brandName}
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#9CA3AF]">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors relative py-1 focus:outline-none focus-visible:text-white ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'hover:text-[#F3F4F6]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E05A32] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#D1D5DB] bg-[#14171D] hover:bg-[#1B2028] border border-[#252B35] rounded-lg transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05A32]"
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#E05A32]" />
            <span>{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Primary CTA Action */}
          <button
            onClick={() => onOpenApplication()}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#E05A32] hover:bg-[#C94A24] rounded-lg transition-all shadow-sm shadow-[#E05A32]/20 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E05A32] active:scale-[0.98]"
          >
            <span>{t.nav.startNow}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#9CA3AF] hover:text-white lg:hidden rounded-lg hover:bg-[#14171D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05A32]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0C0E12] border-b border-[#252B35] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-start px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#14171D] text-[#E05A32] font-semibold'
                    : 'text-[#D1D5DB] hover:bg-[#14171D]/60 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#252B35] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApplication();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#E05A32] hover:bg-[#C94A24] rounded-lg transition-colors"
            >
              <span>{t.cta.startJourney}</span>
              <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
            </button>

            <a
              href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                language === 'ar'
                  ? 'مرحباً كابتن مينا، أريد الاستفسار عن باقات التدريب والمتابعة أونلاين.'
                  : 'Hello Coach Mina, I would like to inquire about online coaching and personalized packages.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.cta.whatsappDirect}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
