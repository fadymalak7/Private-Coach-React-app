import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { ArrowUpRight, Calculator, AlertCircle } from 'lucide-react';

export const CalculatorPage = ({ onOpenApplication }) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('82');
  const [height, setHeight] = useState('178');
  const [age, setAge] = useState('29');
  const [activity, setActivity] = useState(1.4);
  const [goal, setGoal] = useState('fatLoss');

  const [result, setResult] = useState(() => {
    const w = 82;
    const h = 178;
    const a = 29;
    const bmi = parseFloat((w / Math.pow(h / 100, 2)).toFixed(1));
    const bmr = Math.round(10 * w + 6.25 * h - 5 * a + 5);
    const tdee = Math.round(bmr * 1.4);
    const targetCalories = Math.round(tdee * 0.80);
    const protein = Math.round(w * 2.0);
    const fats = Math.round((targetCalories * 0.25) / 9);
    const carbs = Math.max(50, Math.round((targetCalories - (protein * 4 + fats * 9)) / 4));

    return {
      bmi,
      bmiCategory: { ar: 'وزن زائد خفيف', en: 'Overweight (Mild)' },
      bmr,
      tdee,
      targetCalories,
      protein,
      carbs,
      fats,
      weeklyTarget: { ar: 'نزول 0.5 إلى 0.8 كجم أسبوعياً', en: '0.5 to 0.8 kg fat loss/week' },
    };
  });

  const handleCalculate = (e) => {
    e.preventDefault();
    const w = parseFloat(weight) || 75;
    const h = parseFloat(height) || 175;
    const a = parseFloat(age) || 27;

    const bmiVal = parseFloat((w / Math.pow(h / 100, 2)).toFixed(1));
    let bmiCat = { ar: 'وزن مثالي', en: 'Normal Weight' };
    if (bmiVal < 18.5) bmiCat = { ar: 'نحافة', en: 'Underweight' };
    else if (bmiVal >= 25 && bmiVal < 30) bmiCat = { ar: 'وزن زائد', en: 'Overweight' };
    else if (bmiVal >= 30) bmiCat = { ar: 'سمنة', en: 'Obese' };

    let bmrVal = 10 * w + 6.25 * h - 5 * a;
    bmrVal = gender === 'male' ? bmrVal + 5 : bmrVal - 161;

    const tdeeVal = Math.round(bmrVal * activity);

    let targetCal = tdeeVal;
    let weeklyRate = { ar: 'تثبيت الوزن وتحسين القوام', en: 'Maintenance & Recomposition' };

    if (goal === 'fatLoss') {
      targetCal = Math.round(tdeeVal * 0.80);
      weeklyRate = { ar: 'نزول 0.5 إلى 0.8 كجم أسبوعياً', en: '0.5 to 0.8 kg fat loss/week' };
    } else if (goal === 'mildDeficit') {
      targetCal = Math.round(tdeeVal * 0.88);
      weeklyRate = { ar: 'نزول 0.3 إلى 0.5 كجم أسبوعياً', en: '0.3 to 0.5 kg fat loss/week' };
    } else if (goal === 'leanBulk') {
      targetCal = Math.round(tdeeVal * 1.10);
      weeklyRate = { ar: 'زيادة 0.25 إلى 0.4 كجم عضل أسبوعياً', en: '0.25 to 0.4 kg lean gain/week' };
    }

    const proteinGrams = Math.round(w * 2.0);
    const fatGrams = Math.round((targetCal * 0.25) / 9);
    const remaining = targetCal - (proteinGrams * 4 + fatGrams * 9);
    const carbGrams = Math.max(50, Math.round(remaining / 4));

    setResult({
      bmi: bmiVal,
      bmiCategory: bmiCat,
      bmr: Math.round(bmrVal),
      tdee: tdeeVal,
      targetCalories: targetCal,
      protein: proteinGrams,
      carbs: carbGrams,
      fats: fatGrams,
      weeklyTarget: weeklyRate,
    });
  };

  return (
    <div className="py-12 md:py-20 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {t.calculator.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.calculator.title}
          </h1>
          <p className="text-base text-[#9CA3AF]">
            {t.calculator.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form */}
          <div className="lg:col-span-6 bg-[#14171D] border border-[#252B35] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#E05A32]" />
              <span>{language === 'ar' ? 'أدخل بياناتك الفيسيولوجية' : 'Enter Your Biometric Data'}</span>
            </h3>

            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.gender}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                      gender === 'male'
                        ? 'bg-[#E05A32] text-white border-[#E05A32]'
                        : 'bg-[#0C0E12] text-[#D1D5DB] border-[#252B35]'
                    }`}
                  >
                    {t.calculator.male}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                      gender === 'female'
                        ? 'bg-[#E05A32] text-white border-[#E05A32]'
                        : 'bg-[#0C0E12] text-[#D1D5DB] border-[#252B35]'
                    }`}
                  >
                    {t.calculator.female}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                    {t.calculator.weight}
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
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
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                    min="120"
                    max="230"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.age}
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                  min="14"
                  max="90"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.activity}
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                >
                  <option value={1.2}>{t.calculator.activityLevels.sedentary}</option>
                  <option value={1.375}>{t.calculator.activityLevels.light}</option>
                  <option value={1.55}>{t.calculator.activityLevels.moderate}</option>
                  <option value={1.725}>{t.calculator.activityLevels.active}</option>
                  <option value={1.9}>{t.calculator.activityLevels.extraActive}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  {t.calculator.goal}
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                >
                  <option value="fatLoss">{t.calculator.goals.fatLoss}</option>
                  <option value="mildDeficit">{t.calculator.goals.mildDeficit}</option>
                  <option value="maintenance">{t.calculator.goals.maintenance}</option>
                  <option value="leanBulk">{t.calculator.goals.leanBulk}</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                {t.calculator.calculateBtn}
              </button>
            </form>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-6 space-y-6">
            {result && (
              <div className="bg-[#14171D] border border-[#252B35] rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {t.calculator.resultsTitle}
                  </h3>
                  <p className="text-xs text-[#9CA3AF]">
                    {language === 'ar' ? 'تقديرات مبنية على معادلة ميفلين-سانت جيور المعترف بها عالمياً' : 'Calculations based on the clinically validated Mifflin-St Jeor formula'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1B2028] p-4 rounded-xl border border-[#252B35]">
                    <span className="text-xs text-[#9CA3AF] block mb-1">{t.calculator.bmrLabel}</span>
                    <span className="text-2xl font-bold text-white tabular-nums">
                      {result.bmr} <span className="text-xs font-normal text-[#9CA3AF]">{language === 'ar' ? 'سعرة' : 'kcal'}</span>
                    </span>
                  </div>

                  <div className="bg-[#1B2028] p-4 rounded-xl border border-[#252B35]">
                    <span className="text-xs text-[#9CA3AF] block mb-1">{t.calculator.tdeeLabel}</span>
                    <span className="text-2xl font-bold text-white tabular-nums">
                      {result.tdee} <span className="text-xs font-normal text-[#9CA3AF]">{language === 'ar' ? 'سعرة' : 'kcal'}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-r from-[#1B2028] to-[#25201B] border border-[#E05A32]/40">
                  <span className="text-xs font-bold text-[#E05A32] uppercase tracking-wider block mb-1">
                    {t.calculator.targetCalories}
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-extrabold text-white tabular-nums">
                      {result.targetCalories}
                    </span>
                    <span className="text-sm font-semibold text-[#D1D5DB]">
                      {language === 'ar' ? 'سعرة حرارية / اليوم' : 'calories / day'}
                    </span>
                  </div>
                  <span className="text-xs text-[#25D366] font-medium block">
                    {result.weeklyTarget[language]}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">
                    {language === 'ar' ? 'توزيع الماكروز المقترح يومياً' : 'Recommended Daily Macronutrients'}
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-[#0C0E12] p-4 rounded-xl border border-[#252B35]">
                      <span className="text-xs text-[#9CA3AF] block mb-1">{t.calculator.macros.protein}</span>
                      <span className="text-xl font-bold text-white tabular-nums">{result.protein}g</span>
                      <span className="text-[10px] text-[#9CA3AF] block mt-1">{result.protein * 4} kcal</span>
                    </div>

                    <div className="bg-[#0C0E12] p-4 rounded-xl border border-[#252B35]">
                      <span className="text-xs text-[#9CA3AF] block mb-1">{t.calculator.macros.carbs}</span>
                      <span className="text-xl font-bold text-white tabular-nums">{result.carbs}g</span>
                      <span className="text-[10px] text-[#9CA3AF] block mt-1">{result.carbs * 4} kcal</span>
                    </div>

                    <div className="bg-[#0C0E12] p-4 rounded-xl border border-[#252B35]">
                      <span className="text-xs text-[#9CA3AF] block mb-1">{t.calculator.macros.fats}</span>
                      <span className="text-xl font-bold text-white tabular-nums">{result.fats}g</span>
                      <span className="text-[10px] text-[#9CA3AF] block mt-1">{result.fats * 9} kcal</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-[#1B2028] rounded-xl border border-[#252B35] space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-[#9CA3AF]">
                    <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>{t.calculator.disclaimer}</span>
                  </div>
                  <button
                    onClick={onOpenApplication}
                    className="w-full py-3 px-4 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{t.cta.needAccuratePlan}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
