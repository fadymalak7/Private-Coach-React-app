# Milestone 4: Context API & Bilingual RTL Localization

In this milestone, you will implement bilingual support (**English** and **Arabic**) using React's **Context API**. You will learn how to avoid "prop drilling" and handle dynamic text direction (`dir="rtl"` vs `dir="ltr"`).

---

## Task 4.1: Language Context & Provider Architecture

### 1. What You Are Building
A `LanguageContext` and a `LanguageProvider` component that stores the current active language (`'en'` or `'ar'`) and provides a `toggleLanguage` function to any component in the tree.

### 2. Core Concepts to Understand
- **Prop Drilling Problem:** Passing `lang` and `setLang` through 5 layers of intermediate components just so a nested button can read it.
- **`createContext` & `useContext`:** How React Context creates a broadcast channel where components can consume data anywhere beneath the Provider.
- **Custom Hook Pattern (`useLanguage`):** Encapsulating `useContext(LanguageContext)` with safety checks to ensure consumers are wrapped within the Provider.

### 3. Recommended Resources
- [React: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React: Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)

### 4. Implementation Steps
1. Create `/src/my-app/context/LanguageContext.jsx`.
2. Call `createContext()`:
   ```jsx
   import { createContext, useContext, useState, useEffect } from 'react';
   const LanguageContext = createContext();
   ```
3. Create `LanguageProvider({ children })`:
   - Initialize state: `const [language, setLanguage] = useState('ar');` (default to Arabic for Egyptian audience, or English).
   - Define a toggle function: `const toggleLanguage = () => setLanguage(l => l === 'en' ? 'ar' : 'en');`
   - Provide value object: `{ language, setLanguage, toggleLanguage, isRTL: language === 'ar' }`
4. Export a custom hook:
   ```jsx
   export function useLanguage() {
     const context = useContext(LanguageContext);
     if (!context) {
       throw new Error('useLanguage must be used within a LanguageProvider');
     }
     return context;
   }
   ```
5. Wrap `<MyApp />` or the root inside `<LanguageProvider>` in `MyApp.jsx` or `main.jsx`.

### 5. Verification & Acceptance Criteria
- [ ] Any component can call `const { language, toggleLanguage } = useLanguage()` without receiving props from its parent.
- [ ] Calling `useLanguage()` outside the Provider throws a clear descriptive error.

---

## Task 4.2: Translation Dictionary Structure & Helper

### 1. What You Are Building
A translation dictionary (`translations.js`) containing dual-language strings for navigation links, titles, button labels, and descriptions, along with a translation lookup helper `t(key)`.

### 2. Core Concepts to Understand
- **Internationalization (i18n) Data Structures:** Nested or flat key-value objects for bilingual strings.
- **Graceful Fallbacks:** Returning the translation key or English fallback if an Arabic key is temporarily missing, preventing UI crashes.

### 3. Recommended Resources
- [JavaScript Object Basics on MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)

### 4. Implementation Steps
1. Create `/src/my-app/data/translations.js`.
2. Define dictionaries for `'en'` and `'ar'`:
   ```javascript
   export const translations = {
     en: {
       nav: {
         home: 'Home',
         calculator: 'Calculator',
         transformations: 'Transformations',
         pricing: 'Packages',
         apply: 'Apply Now',
       },
       hero: {
         title: 'Transform Your Body with Coach Mina Nashat',
         subtitle: 'Science-based personal training, customized nutrition plans, and 1-on-1 mentorship.',
         ctaJoin: 'Start Your Journey',
         ctaCalc: 'Calculate Your Macros',
       },
       // Add more sections as you build...
     },
     ar: {
       nav: {
         home: 'الرئيسية',
         calculator: 'حاسبة السعرات',
         transformations: 'قصص النجاح',
         pricing: 'الباقات',
         apply: 'اشترك الآن',
       },
       hero: {
         title: 'غير جسمك للأفضل مع كوتش مينا نشأت',
         subtitle: 'تدريب مبني على أسس علمية، برامج غذائية مخصصة، ومتابعة فردية مستمرة.',
         ctaJoin: 'ابدأ رحلتك الآن',
         ctaCalc: 'احسب سعراتك',
       },
     },
   };
   ```
3. Expose a helper method `t(path)` in `LanguageContext` that retrieves `translations[language][section][key]`, or access `translations[language]` directly.

### 5. Verification & Acceptance Criteria
- [ ] Adding a language toggle button to `Navbar` switches all navigation labels between English and Arabic instantly.
- [ ] No hardcoded text strings in components that use the translation map.

---

## Task 4.3: Dynamic Document Direction (`dir="rtl"` vs `dir="ltr"`)

### 1. What You Are Building
Synchronize the HTML `dir` attribute and CSS fonts dynamically with the selected language so Arabic displays in right-to-left layout with natural Arabic typography, and English displays in left-to-right layout.

### 2. Core Concepts to Understand
- **DOM Side Effects with `useEffect`:** Manipulating `document.documentElement.dir` (`'rtl'` vs `'ltr'`) and `document.documentElement.lang` (`'ar'` vs `'en'`).
- **Tailwind Logical Properties & RTL:** Using `start` and `end` (e.g. `ps-4`, `pe-4`, `text-start`) instead of `left` and `right` for effortless bidirectional UI.

### 3. Recommended Resources
- [MDN: The dir attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
- [Tailwind CSS: Handling Right-to-Left](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)

### 4. Implementation Steps
1. In `LanguageProvider.jsx`, add a `useEffect`:
   ```jsx
   useEffect(() => {
     const isRtl = language === 'ar';
     document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
     document.documentElement.lang = language;
   }, [language]);
   ```
2. In `Navbar.jsx`, render the toggle button with a globe icon or flag badge:
   ```jsx
   <button onClick={toggleLanguage} className="px-3 py-1 rounded border border-zinc-700 hover:border-amber-400">
     {language === 'ar' ? 'English' : 'عربي'}
   </button>
   ```

### 5. Verification & Acceptance Criteria
- [ ] Toggling language changes the document's `dir` attribute immediately.
- [ ] Text flows naturally from right-to-left when Arabic is selected.
- [ ] Flex layouts and margins flip cleanly without horizontal scrolling.

---

## 💡 Submission Instructions
Submit **Tasks 4.1 + 4.2 + 4.3** together or individually. Share your `LanguageContext.jsx`, `translations.js`, and how you connected them to `Navbar.jsx`!
