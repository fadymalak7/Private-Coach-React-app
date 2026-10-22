import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import {
  COACH_INFO,
  COMMON_PAIN_POINTS,
  PHILOSOPHY_PILLARS,
  SERVICES_BREAKDOWN,
  HOW_IT_WORKS_STEPS,
  TRANSFORMATIONS_DATA,
  TESTIMONIALS_DATA,
  COACHING_PACKAGES,
  ARTICLES_DATA,
  VIDEOS_DATA,
  FAQS_DATA,
} from '../data/mockData';
import {
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  Award,
  Sparkles,
  BookOpen,
  Play,
  Flame,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export const HomePage = ({
  onNavigate,
  onOpenApplication,
  onOpenFreeGuide,
  onSelectTransformation,
  onSelectArticle,
  onSelectVideo,
}) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  // Pricing duration selector: 1 | 3 | 6 | 12 months
  const [selectedDuration, setSelectedDuration] = useState(3);

  // Transformations category filter
  const [transFilter, setTransFilter] = useState('all');

  // FAQ accordion open states
  const [openFaqId, setOpenFaqId] = useState('faq-1');

  // Interactive inline calculator state
  const [calcGender, setCalcGender] = useState('male');
  const [calcWeight, setCalcWeight] = useState('78');
  const [calcHeight, setCalcHeight] = useState('176');
  const [calcAge, setCalcAge] = useState('28');
  const [calcActivity, setCalcActivity] = useState(1.4);
  const [calcGoal, setCalcGoal] = useState('fatLoss');
  const [calcResult, setCalcResult] = useState(null);

  const handleInlineCalculate = (e) => {
    e.preventDefault();
    const w = parseFloat(calcWeight) || 75;
    const h = parseFloat(calcHeight) || 175;
    const a = parseFloat(calcAge) || 27;

    // Mifflin-St Jeor formula
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = calcGender === 'male' ? bmr + 5 : bmr - 161;

    const tdee = Math.round(bmr * calcActivity);

    let targetCalories = tdee;
    if (calcGoal === 'fatLoss') targetCalories = Math.round(tdee * 0.80);
    else if (calcGoal === 'mildDeficit') targetCalories = Math.round(tdee * 0.88);
    else if (calcGoal === 'leanBulk') targetCalories = Math.round(tdee * 1.10);

    const proteinGrams = Math.round(w * 2.0);
    const fatGrams = Math.round((targetCalories * 0.25) / 9);
    const remainingCalories = targetCalories - (proteinGrams * 4 + fatGrams * 9);
    const carbGrams = Math.max(50, Math.round(remainingCalories / 4));

    setCalcResult({
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      protein: proteinGrams,
      carbs: carbGrams,
      fats: fatGrams,
    });
  };

  const filteredTransformations = transFilter === 'all'
    ? TRANSFORMATIONS_DATA
    : TRANSFORMATIONS_DATA.filter((item) => item.category === transFilter);

  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 md:pt-14 overflow-hidden">
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#E05A32]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#E05A32]">
                <Flame className="w-4 h-4" />
                <span>{t.hero.badge}</span>
              </div>

              <div className="space-y-2">
                <p className="text-lg md:text-xl font-medium text-[#9CA3AF]">
                  {t.hero.headlinePre}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
                  {t.hero.headlineMain}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed">
                {t.hero.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => onOpenApplication()}
                  className="flex items-center justify-center gap-2.5 py-3.5 px-7 text-sm font-semibold text-white bg-[#E05A32] hover:bg-[#C94A24] rounded-lg shadow-lg shadow-[#E05A32]/25 transition-all active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05A32]"
                >
                  <span>{t.cta.startJourney}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('how-it-works-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-medium text-[#D1D5DB] bg-[#14171D] hover:bg-[#1B2028] border border-[#252B35] rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>{t.cta.learnProcess}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#252B35]/70 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#9CA3AF]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>{language === 'ar' ? 'اعتماد دولي ISSA' : 'ISSA Certified Coach'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>{language === 'ar' ? 'متابعة شخصية 1-on-1' : 'Direct 1-on-1 Mentorship'}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>{language === 'ar' ? 'خطط مفصلة بدون حرمان' : 'Zero Restrictive Starvation'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden bg-[#14171D] border border-[#252B35] shadow-2xl">
                  <img
                    src="/src/assets/images/coach_portrait_hero_1791127595581.jpg"
                    alt={COACH_INFO.name[language]}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/5] object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0C0E12] via-[#0C0E12]/60 to-transparent p-6 pt-16">
                    <div className="text-white">
                      <span className="text-lg font-bold block">{COACH_INFO.name[language]}</span>
                      <span className="text-xs text-[#9CA3AF] block">{COACH_INFO.title[language]}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -start-4 sm:-start-6 bg-[#14171D]/95 backdrop-blur-md border border-[#252B35] rounded-xl p-3.5 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E05A32]/10 border border-[#E05A32]/20 flex items-center justify-center text-[#E05A32]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#9CA3AF] block">
                      {language === 'ar' ? 'الخبرة الميدانية' : 'Proven Track Record'}
                    </span>
                    <span className="text-sm font-bold text-white tabular-nums">
                      {language === 'ar' ? '+8 سنوات تدريب عملي' : '8+ Years Coaching'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF / STATS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#14171D] border border-[#252B35] rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x lg:rtl:divide-x-reverse divide-[#252B35]">
              {COACH_INFO.stats.map((stat, index) => (
                <div key={index} className={`pt-4 lg:pt-0 ${index === 0 ? 'pt-0' : ''} text-center lg:text-start lg:px-4`}>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#9CA3AF]">
                    {stat.label[language]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              {t.problemSection.title}
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              {t.problemSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMON_PAIN_POINTS.map((item) => (
              <div
                key={item.id}
                className="bg-[#14171D] border border-[#252B35] rounded-xl p-6 flex flex-col justify-between hover:border-[#384150] transition-colors"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono font-semibold text-[#E05A32] block">
                    0{item.id}
                  </span>
                  <h3 className="text-base font-semibold text-white leading-snug">
                    {item.question[language]}
                  </h3>
                </div>

                <div className="mt-5 pt-4 border-t border-[#252B35] text-xs text-[#9CA3AF] leading-relaxed">
                  <span className="text-white font-medium block mb-1">
                    {language === 'ar' ? 'الحل معنا:' : 'Our Solution:'}
                  </span>
                  {item.solution[language]}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onOpenApplication()}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#E05A32] hover:text-[#f26e47] transition-colors"
            >
              <span>{language === 'ar' ? 'تعال نحدد مشكلتك ونحلها بخطة متفصلة ليك مع كابتن مينا' : 'Let us diagnose your roadblocks and engineer your plan with Coach Mina'}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. COACHING PHILOSOPHY */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
              {t.philosophy.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              {t.philosophy.title}
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              {t.philosophy.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHILOSOPHY_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-[#14171D] border border-[#252B35] rounded-xl p-6 flex flex-col justify-between hover:border-[#E05A32]/40 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#E05A32] block mb-3">
                    {pillar.number}.
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
                    {pillar.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {pillar.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES BREAKDOWN */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
              {t.services.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              {t.services.title}
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_BREAKDOWN.map((service) => (
              <div
                key={service.id}
                className="bg-[#14171D] border border-[#252B35] rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {service.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-5">
                    {service.desc[language]}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#252B35] space-y-2">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#D1D5DB]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                      <span>{item[language]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section id="how-it-works-section" className="relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
              {t.howItWorks.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              {t.howItWorks.title}
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-[#14171D] border border-[#252B35] rounded-xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-mono font-extrabold text-[#E05A32] block mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {step.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {step.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onOpenApplication()}
              className="py-3 px-8 text-xs font-semibold text-white bg-[#E05A32] hover:bg-[#C94A24] rounded-lg transition-colors shadow-sm"
            >
              {t.cta.startJourney}
            </button>
          </div>
        </div>
      </section>

      {/* 7. TRANSFORMATIONS / RESULTS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
                {t.transformations.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                {t.transformations.title}
              </h2>
              <p className="text-sm text-[#9CA3AF]">
                {t.transformations.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-[#14171D] border border-[#252B35] rounded-lg overflow-x-auto">
              {['all', 'fat-loss', 'muscle-gain', 'recomp', 'beginner'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTransFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    transFilter === cat
                      ? 'bg-[#E05A32] text-white shadow-sm'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  {t.transformations.filters[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTransformations.map((item) => (
              <div
                key={item.id}
                className="bg-[#14171D] border border-[#252B35] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#384150] transition-colors group"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#0C0E12] overflow-hidden">
                    <img
                      src={item.afterImage}
                      alt={item.name[language]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 start-2.5 px-2 py-0.5 text-[11px] font-medium bg-black/75 backdrop-blur-sm text-[#E05A32] rounded">
                      {item.categoryLabel[language]}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                      <span>{item.duration[language]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-bold text-[#25D366] tabular-nums">{item.metrics.weightChange[language]}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {item.name[language]}
                    </h3>

                    <p className="text-xs text-[#9CA3AF] line-clamp-2">
                      {item.goal[language]}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectTransformation(item)}
                    className="w-full py-2.5 px-3 bg-[#1B2028] hover:bg-[#252B35] text-xs font-semibold text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{t.cta.viewCaseStudy}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('transformations')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D1D5DB] hover:text-white transition-colors"
            >
              <span>{language === 'ar' ? 'عرض جميع قصص النجاح والتحولات الكاملة' : 'View all transformation case studies'}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. CLIENT STORIES & TESTIMONIALS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
              {t.testimonials.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              {t.testimonials.title}
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS_DATA.map((tItem) => (
              <div
                key={tItem.id}
                className="bg-[#14171D] border border-[#252B35] rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F59E0B] text-xs mb-3">
                    {Array.from({ length: tItem.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed italic mb-5">
                    "{tItem.quote[language]}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#252B35] space-y-1">
                  <span className="text-sm font-bold text-white block">
                    {tItem.name[language]}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                    <span>{tItem.roleOrLocation[language]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#E05A32] font-medium">{tItem.goal[language]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. MEET YOUR COACH */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#14171D] border border-[#252B35] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
              
              <div className="lg:col-span-5 relative">
                <div className="rounded-xl overflow-hidden bg-[#0C0E12] aspect-[3/4] border border-[#252B35]">
                  <img
                    src="/src/assets/images/coach_portrait_hero_1791127595581.jpg"
                    alt={COACH_INFO.name[language]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6 text-start">
                <div>
                  <span className="text-xs font-semibold text-[#E05A32] uppercase tracking-wider block mb-2">
                    {t.coach.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                    {t.coach.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#9CA3AF]">
                    {t.coach.subtitle}
                  </p>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                  <p>{COACH_INFO.story.origin[language]}</p>
                  <p>{COACH_INFO.story.learning[language]}</p>
                  <p>{COACH_INFO.story.today[language]}</p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">
                    {t.coach.certificationsTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {COACH_INFO.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        <span>{cred[language]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onNavigate('about')}
                    className="w-full sm:w-auto py-3 px-6 text-xs font-semibold text-white bg-[#E05A32] hover:bg-[#C94A24] rounded-lg transition-colors"
                  >
                    {t.cta.knowMyStory}
                  </button>

                  <a
                    href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-5 text-xs font-medium text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t.cta.whatsappDirect}</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 10. PACKAGES */}
      <section id="pricing-section" className="relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
              {t.packages.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              {t.packages.title}
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              {t.packages.subtitle}
            </p>

            <div className="inline-flex items-center gap-1 p-1 bg-[#14171D] border border-[#252B35] rounded-lg mt-6">
              {[1, 3, 6, 12].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedDuration === duration
                      ? 'bg-[#E05A32] text-white shadow-sm'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  {duration === 1 && t.packages.durations.month1}
                  {duration === 3 && t.packages.durations.months3}
                  {duration === 6 && t.packages.durations.months6}
                  {duration === 12 && t.packages.durations.months12}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {COACHING_PACKAGES.map((pkg) => {
              const price = pkg.prices[selectedDuration];
              const monthlyEquivalent = Math.round(price / selectedDuration);

              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                    pkg.recommended
                      ? 'bg-[#181C23] border-2 border-[#E05A32] shadow-xl shadow-[#E05A32]/10 scale-100 lg:-translate-y-2'
                      : 'bg-[#14171D] border border-[#252B35]'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-[#E05A32] text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                      {t.packages.mostPopular}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {pkg.name[language]}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] mb-6 min-h-[32px]">
                      {pkg.subtitle[language]}
                    </p>

                    <div className="mb-6 pb-6 border-b border-[#252B35]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                          {price.toLocaleString()}
                        </span>
                        <span className="text-sm font-semibold text-[#9CA3AF]">
                          {pkg.currency[language]}
                        </span>
                      </div>
                      <span className="text-xs text-[#9CA3AF] block mt-1">
                        {selectedDuration > 1 && (
                          <span className="text-[#25D366] font-medium">
                            {language === 'ar'
                              ? `(يعادل ${monthlyEquivalent.toLocaleString()} ${pkg.currency.ar}/شهر)`
                              : `(approx. ${monthlyEquivalent.toLocaleString()} ${pkg.currency.en}/mo)`}
                            {' · '}
                          </span>
                        )}
                        {pkg.period[language]}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6 text-xs text-[#D1D5DB]">
                      <div className="flex items-center justify-between border-b border-[#252B35]/60 pb-1.5">
                        <span className="text-[#9CA3AF]">{language === 'ar' ? 'المتابعة:' : 'Check-ins:'}</span>
                        <span className="font-semibold text-white">{pkg.followUp[language]}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#252B35]/60 pb-1.5">
                        <span className="text-[#9CA3AF]">{language === 'ar' ? 'تعديل الخطة:' : 'Updates:'}</span>
                        <span className="font-semibold text-white">{pkg.planUpdates[language]}</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5">
                        <span className="text-[#9CA3AF]">{language === 'ar' ? 'الدعم:' : 'Support:'}</span>
                        <span className="font-semibold text-white">{pkg.supportMethod[language]}</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-8">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] block mb-2">
                        {language === 'ar' ? 'ما يشمله البرنامج:' : 'What is included:'}
                      </span>
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#D1D5DB]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                          <span>{feat[language]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => onOpenApplication(pkg.id)}
                      className={`w-full py-3 px-4 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                        pkg.recommended
                          ? 'bg-[#E05A32] hover:bg-[#C94A24] text-white shadow-[#E05A32]/30'
                          : 'bg-[#1B2028] hover:bg-[#252B35] text-white'
                      }`}
                    >
                      <span>{t.cta.subscribeNow}</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FREE RESOURCE LEAD MAGNET */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#14171D] via-[#1B2028] to-[#14171D] border border-[#252B35] rounded-2xl p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4 text-start">
                <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase block">
                  {t.freeResource.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {t.freeResource.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
                  {t.freeResource.subtitle}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#D1D5DB]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                    {language === 'ar' ? 'ملف PDF جاهز للتحميل المباشر' : 'Instant downloadable PDF file'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                    {language === 'ar' ? 'بدون أي التزام مالي' : '100% Free, zero commitment'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
                <button
                  onClick={onOpenFreeGuide}
                  className="w-full sm:w-auto py-3.5 px-7 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg shadow-lg shadow-[#E05A32]/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.freeResource.cta}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 12. FITNESS CALCULATOR */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
              {t.calculator.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              {t.calculator.title}
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              {t.calculator.subtitle}
            </p>
          </div>

          <div className="bg-[#14171D] border border-[#252B35] rounded-2xl p-6 sm:p-10">
            <form onSubmit={handleInlineCalculate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.gender}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcGender('male')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      calcGender === 'male'
                        ? 'bg-[#E05A32] text-white border-[#E05A32]'
                        : 'bg-[#0C0E12] text-[#D1D5DB] border-[#252B35] hover:border-[#384150]'
                    }`}
                  >
                    {t.calculator.male}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcGender('female')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      calcGender === 'female'
                        ? 'bg-[#E05A32] text-white border-[#E05A32]'
                        : 'bg-[#0C0E12] text-[#D1D5DB] border-[#252B35] hover:border-[#384150]'
                    }`}
                  >
                    {t.calculator.female}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.weight}
                </label>
                <input
                  type="number"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                  min="35"
                  max="250"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.height}
                </label>
                <input
                  type="number"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                  min="120"
                  max="230"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.age}
                </label>
                <input
                  type="number"
                  value={calcAge}
                  onChange={(e) => setCalcAge(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                  min="14"
                  max="90"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.activity}
                </label>
                <select
                  value={calcActivity}
                  onChange={(e) => setCalcActivity(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                >
                  <option value={1.2}>{t.calculator.activityLevels.sedentary}</option>
                  <option value={1.375}>{t.calculator.activityLevels.light}</option>
                  <option value={1.55}>{t.calculator.activityLevels.moderate}</option>
                  <option value={1.725}>{t.calculator.activityLevels.active}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.goal}
                </label>
                <select
                  value={calcGoal}
                  onChange={(e) => setCalcGoal(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                >
                  <option value="fatLoss">{t.calculator.goals.fatLoss}</option>
                  <option value="mildDeficit">{t.calculator.goals.mildDeficit}</option>
                  <option value="maintenance">{t.calculator.goals.maintenance}</option>
                  <option value="leanBulk">{t.calculator.goals.leanBulk}</option>
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-4 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                >
                  {t.calculator.calculateBtn}
                </button>
              </div>
            </form>

            {calcResult && (
              <div className="mt-8 pt-8 border-t border-[#252B35] animate-in fade-in duration-200">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                  {t.calculator.resultsTitle}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#1B2028] p-4 rounded-xl border border-[#252B35]">
                    <span className="text-xs text-[#9CA3AF] block mb-1">{t.calculator.bmrLabel}</span>
                    <span className="text-2xl font-extrabold text-white tabular-nums">
                      {calcResult.bmr} <span className="text-xs font-normal text-[#9CA3AF]">{language === 'ar' ? 'سعرة' : 'kcal'}</span>
                    </span>
                  </div>

                  <div className="bg-[#1B2028] p-4 rounded-xl border border-[#252B35]">
                    <span className="text-xs text-[#9CA3AF] block mb-1">{t.calculator.tdeeLabel}</span>
                    <span className="text-2xl font-extrabold text-white tabular-nums">
                      {calcResult.tdee} <span className="text-xs font-normal text-[#9CA3AF]">{language === 'ar' ? 'سعرة' : 'kcal'}</span>
                    </span>
                  </div>

                  <div className="bg-[#1B2028] p-4 rounded-xl border border-[#E05A32]/40">
                    <span className="text-xs text-[#E05A32] font-semibold block mb-1">{t.calculator.targetCalories}</span>
                    <span className="text-2xl font-extrabold text-[#E05A32] tabular-nums">
                      {calcResult.targetCalories} <span className="text-xs font-normal text-white">{language === 'ar' ? 'سعرة/يوم' : 'kcal/day'}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-[#0C0E12] p-3 rounded-lg border border-[#252B35]">
                    <span className="text-xs text-[#9CA3AF] block">{t.calculator.macros.protein}</span>
                    <span className="text-base font-bold text-white tabular-nums">{calcResult.protein}g</span>
                  </div>
                  <div className="bg-[#0C0E12] p-3 rounded-lg border border-[#252B35]">
                    <span className="text-xs text-[#9CA3AF] block">{t.calculator.macros.carbs}</span>
                    <span className="text-base font-bold text-white tabular-nums">{calcResult.carbs}g</span>
                  </div>
                  <div className="bg-[#0C0E12] p-3 rounded-lg border border-[#252B35]">
                    <span className="text-xs text-[#9CA3AF] block">{t.calculator.macros.fats}</span>
                    <span className="text-base font-bold text-white tabular-nums">{calcResult.fats}g</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#1B2028] rounded-xl border border-[#252B35]">
                  <p className="text-xs text-[#9CA3AF] text-center sm:text-start">
                    {t.calculator.disclaimer}
                  </p>
                  <button
                    onClick={() => onOpenApplication()}
                    className="w-full sm:w-auto py-2.5 px-5 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                  >
                    {t.cta.needAccuratePlan}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 13. ARTICLES */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
                {t.articles.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                {t.articles.title}
              </h2>
              <p className="text-sm text-[#9CA3AF]">
                {t.articles.subtitle}
              </p>
            </div>

            <button
              onClick={() => onNavigate('articles')}
              className="text-xs font-semibold text-[#D1D5DB] hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>{t.articles.allCategories}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES_DATA.map((art) => (
              <div
                key={art.id}
                className="bg-[#14171D] border border-[#252B35] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#384150] transition-colors group cursor-pointer"
                onClick={() => onSelectArticle(art)}
              >
                <div>
                  <div className="aspect-video bg-[#0C0E12] overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title[language]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                      <span className="text-[#E05A32] font-semibold">{art.category[language]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.readTime[language]}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#E05A32] transition-colors line-clamp-2">
                      {art.title[language]}
                    </h3>

                    <p className="text-xs text-[#9CA3AF] line-clamp-3">
                      {art.excerpt[language]}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="text-xs font-medium text-[#E05A32] flex items-center gap-1">
                    <span>{t.cta.readArticle}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. VIDEOS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
                {t.videos.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                {t.videos.title}
              </h2>
              <p className="text-sm text-[#9CA3AF]">
                {t.videos.subtitle}
              </p>
            </div>

            <button
              onClick={() => onNavigate('videos')}
              className="text-xs font-semibold text-[#D1D5DB] hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>{language === 'ar' ? 'عرض مكتبة الفيديو كاملة' : 'View all video guides'}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEOS_DATA.slice(0, 3).map((vid) => (
              <div
                key={vid.id}
                className="bg-[#14171D] border border-[#252B35] rounded-xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#384150] transition-colors"
                onClick={() => onSelectVideo(vid)}
              >
                <div>
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title[language]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-[#E05A32] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 end-2 px-1.5 py-0.5 bg-black/80 text-[10px] font-mono text-white rounded">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-xs text-[#E05A32] font-semibold">
                      {vid.category[language]}
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#E05A32] transition-colors line-clamp-2">
                      {vid.title[language]}
                    </h3>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="text-xs font-medium text-[#9CA3AF] group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>{t.cta.watchVideo}</span>
                    <ArrowUpRight className={`w-3 h-3 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. FAQ ACCORDION */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
              {t.faq.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              {t.faq.title}
            </h2>
            <p className="text-sm text-[#9CA3AF]">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#14171D] border border-[#252B35] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
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

          <div className="mt-8 text-center text-xs text-[#9CA3AF]">
            {language === 'ar' ? 'لديك سؤال آخر لم تجد إجابته؟' : 'Have another question not answered above?'}{' '}
            <a
              href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>{language === 'ar' ? 'اسأل كابتن مينا على واتساب مباشرة' : 'Ask Coach Mina on WhatsApp directly'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 16. FINAL CTA */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1A1D24] via-[#14171D] to-[#0C0E12] border border-[#252B35] p-8 sm:p-14 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="text-xs font-semibold text-[#E05A32] tracking-widest uppercase block">
                {language === 'ar' ? 'ابدأ الآن' : 'Take The Leap'}
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {language === 'ar' ? 'جاهز تبدأ بشكل مختلف ومستدام؟' : 'Ready To Transform With Science & Precision?'}
              </h2>

              <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                {language === 'ar'
                  ? 'الخطوة الأولى بسيطة جداً: اختر باقتك، املأ الاستبيان، ودع كابتن مينا نشأت يتولى تخطيط كل تفصيلة في تدريبك وتغذيتك.'
                  : 'The first step is straightforward: select your package, submit your assessment, and let Coach Mina Nashat engineer every variable of your fitness journey.'}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onOpenApplication()}
                  className="w-full sm:w-auto py-3.5 px-8 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs sm:text-sm font-bold rounded-lg shadow-lg shadow-[#E05A32]/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t.cta.startJourney}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>

                <a
                  href={`https://wa.me/${COACH_INFO.contact.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3.5 px-6 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.cta.whatsappDirect}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
