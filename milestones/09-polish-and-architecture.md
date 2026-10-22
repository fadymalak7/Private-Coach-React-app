# Milestone 9: Polish, Performance & Production Readiness

In this final milestone, you will refine your codebase, audit responsiveness and accessibility, extract reusable custom hooks, handle potential runtime errors gracefully, and conduct a full architecture retrospective.

---

## Task 9.1: Mobile & Responsive Layout Audit

### 1. What You Are Building
A thorough visual and layout review across breakpoints:
- Mobile (`375px - 640px`)
- Tablet (`768px - 1024px`)
- Desktop (`1280px+`)
Ensuring touch targets are at least `44x44px`, form fields don't cause automatic zoom on mobile (`text-base` minimum), and no horizontal scroll leaks exist.

### 2. Core Concepts to Understand
- **Mobile-First CSS Strategy:** Starting with default mobile rules and adding `sm:`, `md:`, `lg:`, `xl:` overrides.
- **Touch Target Accessibility:** Ensuring buttons have adequate padding (`py-3 px-5`) so they are easy to tap on physical mobile devices.
- **Viewport Overflow Prevention:** Spotting and fixing `overflow-x-hidden` or accidental fixed pixel widths (`w-[600px]`) that break mobile screens.

### 3. Recommended Resources
- [Web.dev: Accessible tap targets](https://web.dev/accessible-tap-targets/)
- [Tailwind CSS: Responsive Design](https://tailwindcss.com/docs/responsive-design)

### 4. Implementation Steps
1. Open browser DevTools device emulation mode (iPhone 14 / Pixel 7).
2. Test every tab (Home, Calculator, Transformations, Packages, Application).
3. Verify that the mobile navigation drawer opens and closes without stutter.
4. Verify that the InstaPay transfer and upload steps are effortless to use on a small vertical screen.

### 5. Verification & Acceptance Criteria
- [ ] No horizontal scrolling on any screen size.
- [ ] All buttons and links are comfortably tappable.
- [ ] Text remains crisp and readable across all views.

---

## Task 9.2: Refactoring with Custom Hooks

### 1. What You Are Building
Clean up repetitive logic by creating reusable custom hooks:
- `useLocalStorage(key, initialValue)`: To persist selected language or calculator inputs across browser sessions.
- `useFormWizard(totalSteps)`: To encapsulate `currentStep`, `nextStep`, `prevStep`, `isFirstStep`, and `isLastStep`.

### 2. Core Concepts to Understand
- **Rules of Hooks:** Hooks must be called at the top level of function components and only inside React functions.
- **Encapsulation & Separation of Concerns:** Separating mathematical/business logic from visual JSX markup.

### 3. Recommended Resources
- [React: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

### 4. Implementation Steps
1. Create `/src/my-app/hooks/useFormWizard.js`:
   ```javascript
   import { useState } from 'react';

   export function useFormWizard(totalSteps) {
     const [step, setStep] = useState(1);
     const next = () => setStep(s => Math.min(s + 1, totalSteps));
     const prev = () => setStep(s => Math.max(s - 1, 1));
     const goTo = (target) => setStep(Math.max(1, Math.min(target, totalSteps)));

     return {
       step,
       next,
       prev,
       goTo,
       isFirst: step === 1,
       isLast: step === totalSteps,
       progress: ((step - 1) / (totalSteps - 1)) * 100,
     };
   }
   ```
2. Integrate `useFormWizard` into `ApplicationPage.jsx`.

### 5. Verification & Acceptance Criteria
- [ ] Application page code is noticeably cleaner and easier to read.
- [ ] Wizard behavior remains completely identical.

---

## Task 9.3: Error Boundaries & Fallback States

### 1. What You Are Building
An `ErrorBoundary` wrapper that intercepts unexpected JavaScript runtime exceptions anywhere in the component tree and displays a friendly error card instead of a blank white screen.

### 2. Core Concepts to Understand
- **React Error Boundaries:** Class components using `componentDidCatch` or `getDerivedStateFromError`.
- **User-Friendly Degradation:** Providing a "Try Again" or "Reload App" button.

### 3. Recommended Resources
- [React: Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

### 4. Implementation Steps
1. Create `/src/my-app/components/ErrorBoundary.jsx`.
2. Implement standard React error boundary methods.
3. Wrap around your main application shell in `MyApp.jsx`.

### 5. Verification & Acceptance Criteria
- [ ] Any intentional or accidental error inside a child component is caught gracefully with a branded recovery UI.

---

## Task 9.4: Final Architectural Review & Defense

### 1. What You Are Building
A final review session with your mentor! You will reflect on the entire journey from blank files to a complete, full-featured sports coaching platform.

### 2. Core Concepts to Review
- **Component Lifecycle & State:** How state updates flow down through props.
- **Performance:** Why inline functions vs memoized callbacks matter in larger applications.
- **State Architecture:** Comparing local state (`useState`), global context (`LanguageContext`), and multi-step form state.
- **User Experience:** How instant client feedback, deep links (InstaPay), and photo previews improve conversion rates.

### 3. Verification & Acceptance Criteria
- [ ] You can explain every file and component in your project.
- [ ] You are confident building new React features from scratch independently!

---

## 💡 Submission Instructions
Submit your custom hooks, refactored components, or final questions. Celebrate reaching the finish line of your React rebuild!
