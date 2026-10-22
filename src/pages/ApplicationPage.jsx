import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { COACH_INFO, COACHING_PACKAGES } from '../data/mockData';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Activity,
  Dumbbell,
  Utensils,
  Moon,
  ShieldAlert,
  Send,
  FileCheck,
  CreditCard,
  Upload,
  Copy,
  ExternalLink,
  Check,
  Image as ImageIcon,
  Trash2,
  AlertCircle,
} from 'lucide-react';

export const ApplicationPage = ({
  initialPackage = 'advanced',
  onNavigateHome,
}) => {
  const { language, isRtl } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  // Selected package duration (default 3 months)
  const [selectedDuration, setSelectedDuration] = useState(3);

  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: '',
    age: '',
    gender: 'male',
    phone: '',
    email: '',
    cityCountry: '',

    // Step 2: Measurements & Goals
    height: '',
    weight: '',
    targetWeight: '',
    primaryGoal: 'fat-loss',

    // Step 3: Training History (trainingLocation removed per user request)
    experienceLevel: 'intermediate',
    trainingDaysPerWeek: '4',
    availableEquipment: '',

    // Step 4: Nutrition & Diet
    favoriteFoods: '',
    dislikedFoods: '',
    allergiesOrRestrictions: '',
    dailyMealsCount: '3',

    // Step 5: Lifestyle & Daily Habits
    dailyActivityLevel: 'moderate',
    workSchedule: '',
    sleepHours: '7',
    stressLevel: 'moderate',

    // Step 6: Health & Experience
    injuriesOrLimitations: '',
    biggestObstacle: '',

    // Step 7: Package & Notes
    selectedPackage: initialPackage,
    additionalNotes: '',

    // Step 8: Payment & Receipt
    paymentReceipt: null,
    paymentReceiptPreview: '',
    paymentReceiptFileName: '',
    paymentReceiptSize: '',
    transactionRef: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedIpa, setCopiedIpa] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [hasClickedInstaPay, setHasClickedInstaPay] = useState(false);

  const instapayDetails = {
    ipa: 'mina.nashat@instapay',
    phone: '01012345678',
    accountName: language === 'ar' ? 'كابتن مينا نشأت' : 'Coach Mina Nashat',
    appUrl: 'https://ipn.eg',
  };

  const stepIcons = [
    User,
    Activity,
    Dumbbell,
    Utensils,
    Moon,
    ShieldAlert,
    FileCheck,
    CreditCard,
  ];

  // Helper to get active package details
  const activePkg = COACHING_PACKAGES.find((p) => p.id === formData.selectedPackage) || COACHING_PACKAGES[1];
  const activePrice = activePkg.prices[selectedDuration] || activePkg.prices[3];

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'ipa') {
      setCopiedIpa(true);
      setTimeout(() => setCopiedIpa(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({
          ...prev,
          receipt: language === 'ar' ? 'يرجى اختيار ملف صورة صالح (PNG, JPG)' : 'Please select a valid image file (PNG, JPG)',
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          paymentReceipt: file,
          paymentReceiptPreview: event.target?.result,
          paymentReceiptFileName: file.name,
          paymentReceiptSize: (file.size / 1024).toFixed(1) + ' KB',
        }));
        setErrors((prev) => {
          const newErrs = { ...prev };
          delete newErrs.receipt;
          return newErrs;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveReceipt = () => {
    setFormData((prev) => ({
      ...prev,
      paymentReceipt: null,
      paymentReceiptPreview: '',
      paymentReceiptFileName: '',
      paymentReceiptSize: '',
    }));
  };

  const validateStep = (step) => {
    const errs = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        errs.fullName = language === 'ar' ? 'الاسم بالكامل مطلوب' : 'Full name is required';
      }
      if (!formData.phone.trim() || formData.phone.length < 8) {
        errs.phone = language === 'ar' ? 'رقم هاتف / واتساب صالح مطلوب' : 'Valid phone/WhatsApp is required';
      }
      if (!formData.age) {
        errs.age = language === 'ar' ? 'العمر مطلوب' : 'Age is required';
      }
    } else if (step === 2) {
      if (!formData.height) {
        errs.height = language === 'ar' ? 'الطول مطلوب' : 'Height is required';
      }
      if (!formData.weight) {
        errs.weight = language === 'ar' ? 'الوزن مطلوب' : 'Weight is required';
      }
    } else if (step === 8) {
      if (!formData.paymentReceiptPreview) {
        errs.receipt = language === 'ar'
          ? 'يرجى رفع لقطة شاشة لإيصال التحويل عبر إنستاباي للمتابعة وتأكيد الاشتراك'
          : 'Please upload a screenshot of your InstaPay payment receipt to proceed.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(8)) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }, 800);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-[#E05A32] tracking-wider uppercase mb-2 block">
            {language === 'ar' ? 'الخطوة الأولى نحو تحولك مع كابتن مينا' : 'Application & Assessment'}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            {t.application.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            {t.application.subtitle}
          </p>
        </div>

        {!submitted ? (
          <div className="bg-[#14171D] border border-[#252B35] rounded-2xl p-6 sm:p-10 shadow-2xl">
            
            {/* Progress Bar & Indicators */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2 font-medium">
                <span>
                  {t.application.step} {currentStep} {t.application.of} {totalSteps}:{' '}
                  <strong className="text-white">{t.application.steps[currentStep - 1]}</strong>
                </span>
                <span className="tabular-nums font-mono text-[#E05A32]">
                  {Math.round((currentStep / totalSteps) * 100)}%
                </span>
              </div>

              <div className="w-full h-1.5 bg-[#0C0E12] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E05A32] transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>

              {/* Step Icons row */}
              <div className="hidden sm:flex items-center justify-between mt-4">
                {stepIcons.map((Icon, idx) => {
                  const stepNum = idx + 1;
                  const isDone = stepNum < currentStep;
                  const isCurrent = stepNum === currentStep;
                  return (
                    <div
                      key={stepNum}
                      className={`flex flex-col items-center gap-1 transition-colors ${
                        isCurrent
                          ? 'text-[#E05A32]'
                          : isDone
                          ? 'text-[#25D366]'
                          : 'text-[#4B5563]'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                          isCurrent
                            ? 'bg-[#E05A32]/10 border-[#E05A32]'
                            : isDone
                            ? 'bg-[#25D366]/10 border-[#25D366]'
                            : 'bg-[#0C0E12] border-[#252B35]'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-[10px] hidden md:block">
                        {t.application.steps[idx]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Steps Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-white border-b border-[#252B35] pb-2">
                    {language === 'ar' ? '1. البيانات الأساسية ومعلومات التواصل' : '1. Personal Information'}
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'الاسم الثلاثي أو بالكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: محمد عبد الله' : 'e.g. John Doe'}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                    />
                    {errors.fullName && <p className="text-xs text-[#EF4444] mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'العمر (بالسنوات) *' : 'Age *'}
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="28"
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                      />
                      {errors.age && <p className="text-xs text-[#EF4444] mt-1">{errors.age}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'الجنس' : 'Gender'}
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                      >
                        <option value="male">{language === 'ar' ? 'ذكر' : 'Male'}</option>
                        <option value="female">{language === 'ar' ? 'أنثى' : 'Female'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+20 101 234 5678"
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                      />
                      {errors.phone && <p className="text-xs text-[#EF4444] mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'الدولة / المدينة الحالية' : 'Country / City'}
                    </label>
                    <input
                      type="text"
                      value={formData.cityCountry}
                      onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: مصر - القاهرة' : 'e.g. Egypt, Cairo'}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Measurements & Goals */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-white border-b border-[#252B35] pb-2">
                    {language === 'ar' ? '2. القياسات الحالية والهدف الرئيسي' : '2. Biometrics & Objectives'}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'الطول الحالي (سم) *' : 'Height (cm) *'}
                      </label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        placeholder="175"
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                      />
                      {errors.height && <p className="text-xs text-[#EF4444] mt-1">{errors.height}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'الوزن الحالي (كجم) *' : 'Current Weight (kg) *'}
                      </label>
                      <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        placeholder="80"
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                      />
                      {errors.weight && <p className="text-xs text-[#EF4444] mt-1">{errors.weight}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'الوزن المستهدف تقريبياً (كجم)' : 'Target Weight Goal (kg)'}
                    </label>
                    <input
                      type="number"
                      value={formData.targetWeight}
                      onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                      placeholder="72"
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'الهدف الأساسي من الاشتراك' : 'Primary Goal'}
                    </label>
                    <select
                      value={formData.primaryGoal}
                      onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                    >
                      <option value="fat-loss">{language === 'ar' ? 'خسارة دهون وتحديد الجسم' : 'Fat Loss & Physique Leanness'}</option>
                      <option value="muscle-gain">{language === 'ar' ? 'زيادة كتلة عضلية نقية' : 'Lean Muscle Mass Hypertrophy'}</option>
                      <option value="recomp">{language === 'ar' ? 'إعادة تشكيل الجسم (خسارة دهون وبناء عضل معاً)' : 'Body Recomposition (Simultaneous recomp)'}</option>
                      <option value="athletic-performance">{language === 'ar' ? 'رفع اللياقة والقدرة الرياضية' : 'Athletic Conditioning & Performance'}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3: Training History (trainingLocation removed per user instruction) */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-white border-b border-[#252B35] pb-2">
                    {language === 'ar' ? '3. تاريخ التدريب والأدوات المتاحة' : '3. Training Background'}
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'مستوى خبرتك السابقة في التمرين' : 'Lifting Experience Level'}
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                    >
                      <option value="beginner">{language === 'ar' ? 'مبتدئ تماماً (أقل من 6 شهور)' : 'Beginner (under 6 months)'}</option>
                      <option value="intermediate">{language === 'ar' ? 'متوسط (من سنة لـ 3 سنوات)' : 'Intermediate (1 - 3 years)'}</option>
                      <option value="advanced">{language === 'ar' ? 'متقدم (أكثر من 3 سنوات)' : 'Advanced (3+ years)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'عدد أيام التمرين المتاحة أسبوعياً' : 'Available Days / Week'}
                    </label>
                    <select
                      value={formData.trainingDaysPerWeek}
                      onChange={(e) => setFormData({ ...formData, trainingDaysPerWeek: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                    >
                      <option value="3">{language === 'ar' ? '3 أيام' : '3 days'}</option>
                      <option value="4">{language === 'ar' ? '4 أيام (موصى به)' : '4 days (Recommended)'}</option>
                      <option value="5">{language === 'ar' ? '5 أيام' : '5 days'}</option>
                      <option value="6">{language === 'ar' ? '6 أيام' : '6 days'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'المعدات أو الأجهزة المتوفرة لديك حالياً' : 'Available Equipment (Dumbbells, bands, etc.)'}
                    </label>
                    <input
                      type="text"
                      value={formData.availableEquipment}
                      onChange={(e) => setFormData({ ...formData, availableEquipment: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: جيم مجهز بالكامل، أو دامبلز قابلة للتعديل وحبل مقاومة...' : 'e.g. Fully equipped commercial gym, or adjustable dumbbells and bands'}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Nutrition & Diet */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-white border-b border-[#252B35] pb-2">
                    {language === 'ar' ? '4. العادات الغذائية والأكلات المفضلة' : '4. Nutrition & Food Preferences'}
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'الأكلات التي تحبها وتريد إدخالها في خطتك' : 'Favorite Foods You Love'}
                    </label>
                    <input
                      type="text"
                      value={formData.favoriteFoods}
                      onChange={(e) => setFormData({ ...formData, favoriteFoods: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: صدور فراخ، مكرونة، بطاطس مشوية، شوكولاتة دارك...' : 'e.g. Chicken breast, pasta, oats, rice, dark chocolate'}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'أكلات تكرهها تماماً ولا تريد رؤيتها في الدايت' : 'Disliked Foods (Never include)'}
                    </label>
                    <input
                      type="text"
                      value={formData.dislikedFoods}
                      onChange={(e) => setFormData({ ...formData, dislikedFoods: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: سمك، بروكلي، جبن قريش...' : 'e.g. Fish, cottage cheese, mushrooms'}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'حساسية أو قيود طبية' : 'Allergies / Restrictions'}
                      </label>
                      <input
                        type="text"
                        value={formData.allergiesOrRestrictions}
                        onChange={(e) => setFormData({ ...formData, allergiesOrRestrictions: e.target.value })}
                        placeholder={language === 'ar' ? 'مثال: حساسية ألبان، جلوتين...' : 'e.g. Lactose intolerant'}
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'عدد الوجبات المفضلة يومياً' : 'Preferred Meals / Day'}
                      </label>
                      <select
                        value={formData.dailyMealsCount}
                        onChange={(e) => setFormData({ ...formData, dailyMealsCount: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                      >
                        <option value="2">{language === 'ar' ? 'وجبتين (صيام متقطع)' : '2 meals (Intermittent Fasting)'}</option>
                        <option value="3">{language === 'ar' ? '3 وجبات رئيسية' : '3 main meals'}</option>
                        <option value="4">{language === 'ar' ? '3 وجبات وسناك' : '3 meals + 1 snack'}</option>
                        <option value="5">{language === 'ar' ? '4 - 5 وجبات' : '4-5 meals'}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Lifestyle & Daily Habits */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-white border-b border-[#252B35] pb-2">
                    {language === 'ar' ? '5. نمط الحياة وساعات النوم والعمل' : '5. Daily Rhythm & Sleep'}
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'طبيعة عملك ومجهودك البدني اليومي' : 'Work Nature & Daily Activity'}
                    </label>
                    <select
                      value={formData.dailyActivityLevel}
                      onChange={(e) => setFormData({ ...formData, dailyActivityLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                    >
                      <option value="sedentary">{language === 'ar' ? 'عمل مكتبي / قليل الحركة جداً' : 'Sedentary desk job'}</option>
                      <option value="light">{language === 'ar' ? 'حركة خفيفة ووقوف متقطع' : 'Light active / occasional standing'}</option>
                      <option value="moderate">{language === 'ar' ? 'حركة متوسطة ومشي مستمر' : 'Moderate active'}</option>
                      <option value="very-active">{language === 'ar' ? 'عمل ميداني شاق ومجهود بدني عالي' : 'Demanding physical labor'}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'متوسط ساعات النوم ليلاً' : 'Sleep Hours / Night'}
                      </label>
                      <select
                        value={formData.sleepHours}
                        onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                      >
                        <option value="under5">{language === 'ar' ? 'أقل من 5 ساعات' : 'Under 5 hours'}</option>
                        <option value="6">{language === 'ar' ? '6 ساعات' : '6 hours'}</option>
                        <option value="7">{language === 'ar' ? '7 - 8 ساعات (مثالي)' : '7-8 hours (Optimal)'}</option>
                        <option value="9plus">{language === 'ar' ? 'أكثر من 9 ساعات' : '9+ hours'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                        {language === 'ar' ? 'مستوى التوتر وضغوط الحياة' : 'Daily Stress Level'}
                      </label>
                      <select
                        value={formData.stressLevel}
                        onChange={(e) => setFormData({ ...formData, stressLevel: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-xs text-white focus:border-[#E05A32] outline-none"
                      >
                        <option value="low">{language === 'ar' ? 'منخفض وهادئ' : 'Low / Relaxed'}</option>
                        <option value="moderate">{language === 'ar' ? 'متوسط وطبيعي' : 'Moderate'}</option>
                        <option value="high">{language === 'ar' ? 'مرتفع وضغط عمل مستمر' : 'High / Intense work stress'}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Health & Experience */}
              {currentStep === 6 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-white border-b border-[#252B35] pb-2">
                    {language === 'ar' ? '6. التاريخ الصحي والإصابات وأكبر العوائق' : '6. Injuries & Obstacles'}
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'إصابات سابقة أو آلام في المفاصل (ركبة، ظهر، كتف...)' : 'Past Injuries / Joint Sensitivities'}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.injuriesOrLimitations}
                      onChange={(e) => setFormData({ ...formData, injuriesOrLimitations: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: ألم خفيف في أسفل الظهر عند الجلوس الطويل، أو لا توجد إصابات...' : 'e.g. Mild lower back tightness, no severe injuries'}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'ما هو أكبر عائق منعك من الاستمرار في المحاولات السابقة؟' : 'Biggest Obstacle In Previous Attempts'}
                    </label>
                    <input
                      type="text"
                      value={formData.biggestObstacle}
                      onChange={(e) => setFormData({ ...formData, biggestObstacle: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: الملل السريع، الجوع الليلي، عدم وجود متابعة وتشجيع...' : 'e.g. Lack of accountability, night cravings, inconsistent schedule'}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 7: Package Selection & Notes */}
              {currentStep === 7 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-white border-b border-[#252B35] pb-2">
                    {language === 'ar' ? '7. اختيار الباقة ومدة التدريب' : '7. Package & Duration Selection'}
                  </h3>

                  {/* Duration switcher */}
                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-2">
                      {language === 'ar' ? 'مدة الاشتراك المطلوبة:' : 'Subscription Duration:'}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 3, 6, 12].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDuration(d)}
                          className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                            selectedDuration === d
                              ? 'bg-[#E05A32] text-white border-[#E05A32]'
                              : 'bg-[#0C0E12] text-[#D1D5DB] border-[#252B35] hover:border-[#384150]'
                          }`}
                        >
                          {d === 1 && (language === 'ar' ? 'شهر' : '1 Mo')}
                          {d === 3 && (language === 'ar' ? '3 شهور' : '3 Mos')}
                          {d === 6 && (language === 'ar' ? '6 شهور' : '6 Mos')}
                          {d === 12 && (language === 'ar' ? '12 شهر' : '1 Year')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-2">
                      {language === 'ar' ? 'الباقة التي ترغب بالاشتراك فيها:' : 'Select Your Preferred Package:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {COACHING_PACKAGES.map((p) => {
                        const price = p.prices[selectedDuration] || p.prices[3];
                        return (
                          <div
                            key={p.id}
                            onClick={() => setFormData({ ...formData, selectedPackage: p.id })}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              formData.selectedPackage === p.id
                                ? 'bg-[#1B2028] border-[#E05A32] ring-1 ring-[#E05A32]'
                                : 'bg-[#0C0E12] border-[#252B35] hover:border-[#384150]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-white">{p.name[language]}</span>
                              {formData.selectedPackage === p.id && (
                                <CheckCircle2 className="w-4 h-4 text-[#E05A32]" />
                              )}
                            </div>
                            <div className="text-base font-extrabold text-[#E05A32] mb-1 tabular-nums">
                              {price.toLocaleString()} {p.currency[language]}
                            </div>
                            <span className="text-[11px] text-[#9CA3AF] block">{p.followUp[language]}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      {language === 'ar' ? 'أي ملاحظات أو رسالة إضافية تود إخبار كابتن مينا نشأت بها؟' : 'Additional Notes / Questions for Coach Mina'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                      placeholder={language === 'ar' ? 'اكتب أي تفاصيل أخرى ترغب في مشاركتها...' : 'Anything else Coach Mina should know before finalizing your plan...'}
                      className="w-full px-3.5 py-2.5 bg-[#0C0E12] border border-[#252B35] rounded-lg text-sm text-white focus:border-[#E05A32] outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 8: Payment via InstaPay & Receipt Upload (NEW STEP) */}
              {currentStep === 8 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="border-b border-[#252B35] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {language === 'ar' ? '8. الدفع عبر إنستاباي (InstaPay) وتأكيد الإيصال' : '8. InstaPay Payment & Receipt Confirmation'}
                      </h3>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        {language === 'ar' ? 'قم بالتحويل عبر إنستاباي ثم ارفع لقطة شاشة للإيصال لإتمام التسجيل' : 'Transfer via InstaPay and upload the transaction screenshot'}
                      </p>
                    </div>
                    <div className="text-end">
                      <span className="text-xs text-[#9CA3AF] block">{language === 'ar' ? 'المبلغ المطلوب' : 'Due Amount'}</span>
                      <span className="text-lg font-extrabold text-[#E05A32] tabular-nums">
                        {activePrice.toLocaleString()} {activePkg.currency[language]}
                      </span>
                    </div>
                  </div>

                  {/* Summary of Selected Package */}
                  <div className="p-4 bg-[#1B2028] border border-[#252B35] rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#9CA3AF] block">{language === 'ar' ? 'الباقة المختارة:' : 'Selected Package:'}</span>
                      <span className="text-sm font-bold text-white">{activePkg.name[language]}</span>
                    </div>
                    <div className="text-end">
                      <span className="text-xs text-[#9CA3AF] block">{language === 'ar' ? 'المدة:' : 'Duration:'}</span>
                      <span className="text-xs font-semibold text-[#D1D5DB]">
                        {selectedDuration === 1 && (language === 'ar' ? 'شهر واحد' : '1 Month')}
                        {selectedDuration === 3 && (language === 'ar' ? '3 شهور' : '3 Months')}
                        {selectedDuration === 6 && (language === 'ar' ? '6 شهور' : '6 Months')}
                        {selectedDuration === 12 && (language === 'ar' ? '12 شهر' : '1 Year')}
                      </span>
                    </div>
                  </div>

                  {/* Coach InstaPay Details Card */}
                  <div className="p-5 bg-[#0C0E12] border border-[#252B35] rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#E05A32]" />
                        <span>{language === 'ar' ? 'بيانات التحويل على إنستاباي' : 'InstaPay Transfer Details'}</span>
                      </span>
                      <span className="text-[11px] px-2 py-0.5 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded">
                        {language === 'ar' ? 'تحويل فوري متاح 24/7' : 'Instant 24/7 Transfer'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* IPA handle */}
                      <div className="p-3 bg-[#14171D] border border-[#252B35] rounded-lg flex items-center justify-between">
                        <div>
                          <span className="text-[#9CA3AF] block text-[11px]">{language === 'ar' ? 'معرف إنستاباي (IPA):' : 'InstaPay Address (IPA):'}</span>
                          <span className="font-mono font-bold text-white text-xs">{instapayDetails.ipa}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(instapayDetails.ipa, 'ipa')}
                          className="p-1.5 hover:bg-[#1B2028] text-[#9CA3AF] hover:text-white rounded transition-colors"
                          title={language === 'ar' ? 'نسخ المعرف' : 'Copy IPA'}
                        >
                          {copiedIpa ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Phone number */}
                      <div className="p-3 bg-[#14171D] border border-[#252B35] rounded-lg flex items-center justify-between">
                        <div>
                          <span className="text-[#9CA3AF] block text-[11px]">{language === 'ar' ? 'رقم الهاتف لإنستاباي:' : 'Phone Number:'}</span>
                          <span className="font-mono font-bold text-white text-xs" dir="ltr">{instapayDetails.phone}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(instapayDetails.phone, 'phone')}
                          className="p-1.5 hover:bg-[#1B2028] text-[#9CA3AF] hover:text-white rounded transition-colors"
                          title={language === 'ar' ? 'نسخ الرقم' : 'Copy Phone'}
                        >
                          {copiedPhone ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Account Name */}
                    <div className="flex items-center justify-between text-xs text-[#9CA3AF] px-1">
                      <span>{language === 'ar' ? 'اسم الحساب المستلم:' : 'Receiver Account:'}</span>
                      <span className="font-semibold text-white">{instapayDetails.accountName}</span>
                    </div>

                    {/* Direct Button to open InstaPay */}
                    <div className="pt-2">
                      <a
                        href={instapayDetails.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setHasClickedInstaPay(true)}
                        className="w-full py-3.5 px-4 bg-[#742774] hover:bg-[#862e86] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#742774]/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>{language === 'ar' ? 'فتح تطبيق إنستاباي للدفع الآن (InstaPay)' : 'Open InstaPay App To Pay Now'}</span>
                      </a>
                    </div>
                  </div>

                  {/* 3 Step Instruction Guide */}
                  <div className="p-4 bg-[#1B2028] border border-[#252B35] rounded-xl space-y-2 text-xs text-[#D1D5DB]">
                    <div className="font-bold text-white mb-1">
                      {language === 'ar' ? 'خطوات إتمام الدفع:' : 'Payment Instructions:'}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E05A32]/20 text-[#E05A32] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <span>{language === 'ar' ? 'اضغط على زر فتح إنستاباي، أو انسخ معرف الحساب/الرقم وحول مبلغ الباقة.' : 'Tap the button to open InstaPay or copy the IPA/phone and transfer the exact package amount.'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E05A32]/20 text-[#E05A32] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <span>{language === 'ar' ? 'بعد نجاح عملية التحويل، التقط لقطة شاشة (Screenshot) لرسالة أو إيصال نجاح العملية.' : 'After the transfer completes successfully, capture a screenshot of the payment receipt.'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E05A32]/20 text-[#E05A32] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <span>{language === 'ar' ? 'ارجع لهذه الصفحة وارفع صورة الإيصال في المربع بالأسفل، ثم اضغط إرسال الطلب.' : 'Return here and upload the screenshot image below, then hit Submit Application.'}</span>
                    </div>
                  </div>

                  {/* Upload Receipt Box */}
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2 flex items-center justify-between">
                      <span>{language === 'ar' ? 'رفع لقطة شاشة لإيصال تحويل إنستاباي *' : 'Upload InstaPay Transfer Screenshot *'}</span>
                      {formData.paymentReceiptPreview && (
                        <span className="text-[11px] text-[#25D366] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {language === 'ar' ? 'تم اختيار الإيصال' : 'Receipt uploaded'}
                        </span>
                      )}
                    </label>

                    {!formData.paymentReceiptPreview ? (
                      <label className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                        errors.receipt
                          ? 'border-[#EF4444] bg-[#EF4444]/5'
                          : 'border-[#252B35] hover:border-[#E05A32] bg-[#0C0E12]'
                      }`}>
                        <div className="w-12 h-12 rounded-full bg-[#1B2028] flex items-center justify-center text-[#E05A32] mb-3">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-white mb-1">
                          {language === 'ar' ? 'اضغط لاختيار صورة الإيصال أو اسحبها هنا' : 'Click to select receipt screenshot or drag & drop'}
                        </span>
                        <span className="text-[11px] text-[#9CA3AF]">
                          {language === 'ar' ? 'الصيغ المدعومة: PNG, JPG, JPEG (لقطة شاشة من الهاتف)' : 'Supported: PNG, JPG, JPEG (Mobile screenshot)'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleReceiptUpload}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="p-4 bg-[#0C0E12] border border-[#252B35] rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-black border border-[#252B35] shrink-0">
                            <img
                              src={formData.paymentReceiptPreview}
                              alt="InstaPay Receipt"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-xs font-bold text-white block truncate max-w-[200px] sm:max-w-xs">
                              {formData.paymentReceiptFileName}
                            </span>
                            <span className="text-[11px] text-[#9CA3AF] block">
                              {formData.paymentReceiptSize}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveReceipt}
                          className="p-2 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors flex items-center gap-1 text-xs"
                          title={language === 'ar' ? 'حذف الإيصال واختيار غيره' : 'Remove receipt'}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">{language === 'ar' ? 'تغيير' : 'Change'}</span>
                        </button>
                      </div>
                    )}

                    {errors.receipt && (
                      <div className="flex items-center gap-1.5 text-xs text-[#EF4444] mt-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.receipt}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-6 border-t border-[#252B35] flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="py-2.5 px-5 bg-[#1B2028] hover:bg-[#252B35] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    <span>{t.cta.prevStep}</span>
                  </button>
                ) : <div />}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-2.5 px-6 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{t.cta.nextStep}</span>
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3 px-7 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#E05A32]/25 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{language === 'ar' ? 'جاري إرسال الطلب والإيصال...' : 'Submitting Application & Receipt...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{language === 'ar' ? 'إرسال الطلب وتأكيد الدفع' : 'Submit Application & Confirm Payment'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>

          </div>
        ) : (
          /* SUCCESS STATE (Without WhatsApp summary per user instruction) */
          <div className="bg-[#14171D] border border-[#252B35] rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t.application.successTitle}
              </h2>
              <p className="text-sm text-[#9CA3AF] max-w-lg mx-auto leading-relaxed">
                {t.application.successDesc}
              </p>
            </div>

            {/* Application & Payment Confirmation Summary Card */}
            <div className="p-6 bg-[#1B2028] border border-[#252B35] rounded-xl max-w-lg mx-auto text-start space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#E05A32] mb-1">
                {language === 'ar' ? 'بيانات تأكيد الاشتراك:' : 'Enrollment Summary:'}
              </div>

              <div className="space-y-2 text-xs text-[#D1D5DB]">
                <div className="flex justify-between border-b border-[#252B35] pb-1.5">
                  <span className="text-[#9CA3AF]">{language === 'ar' ? 'اسم المشترك:' : 'Client Name:'}</span>
                  <span className="font-bold text-white">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[#252B35] pb-1.5">
                  <span className="text-[#9CA3AF]">{language === 'ar' ? 'الباقة:' : 'Package:'}</span>
                  <span className="font-semibold text-white">{activePkg.name[language]}</span>
                </div>
                <div className="flex justify-between border-b border-[#252B35] pb-1.5">
                  <span className="text-[#9CA3AF]">{language === 'ar' ? 'المبلغ المسدد عبر إنستاباي:' : 'Amount Paid via InstaPay:'}</span>
                  <span className="font-bold text-[#25D366] tabular-nums">{activePrice.toLocaleString()} {activePkg.currency[language]}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[#9CA3AF]">{language === 'ar' ? 'حالة الإيصال:' : 'Receipt Status:'}</span>
                  <span className="text-[#25D366] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {language === 'ar' ? 'تم استلام صورة الإيصال' : 'Screenshot Attached'}
                  </span>
                </div>
              </div>

              {formData.paymentReceiptPreview && (
                <div className="pt-2 border-t border-[#252B35] flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-black border border-[#252B35] shrink-0">
                    <img
                      src={formData.paymentReceiptPreview}
                      alt="Uploaded Receipt"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[11px] text-[#9CA3AF]">
                    <span className="text-white block font-medium">{formData.paymentReceiptFileName}</span>
                    <span>{language === 'ar' ? 'جاري التحقق من صحة العملية من قبل كابتن مينا' : 'Pending verification by Coach Mina'}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={onNavigateHome}
                className="py-3 px-8 bg-[#E05A32] hover:bg-[#C94A24] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                {language === 'ar' ? 'العودة للصفحة الرئيسية' : 'Return to Home'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
