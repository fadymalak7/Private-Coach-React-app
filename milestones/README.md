# Mina Nashat Fitness App — React Learning Roadmap

Welcome to your structured, hands-on React mentorship! 

This curriculum is designed to guide you in rebuilding the complete **Coach Mina Nashat Fitness Platform** from scratch, by hand. You will not simply copy and paste existing code—you will learn the *why*, *how*, and *architecture* behind every component, hook, state interaction, and UI element.

---

## 🎯 How This Mentorship Works

### 1. Dual Version Setup
- **Version A (Reference App):** Located in `/src/App.jsx`, `/src/components/`, `/src/pages/`. This is the completed, functional benchmark. You can run it, inspect its UI, click around, and see how the finished product behaves.
- **Version B (Your Implementation):** You will write all your new code in `/src/my-app/`. This isolates your work completely, keeping the reference intact while allowing you to build from the ground up.

### 2. Flexible Batch Submissions
You are completely in control of your learning pace:
- You can submit **1 task at a time** if you want deep, granular feedback on a specific component or concept.
- You can submit **2, 3, or 4 tasks in a single batch** when you feel comfortable and want a comprehensive review of a feature or full milestone.

Whenever you are ready for review, simply share your code and mention the tasks you completed (e.g., *"I completed Milestone 1: Tasks 1.1, 1.2, and 1.3. Here is my code..."*).

### 3. Review & Mentorship Flow for Every Submission
When you submit your code, your mentor will:
1. **Analyze your implementation:** Review syntax, structure, readability, and React conventions.
2. **Highlight strengths & improvements:** Pinpoint what you did well and identify areas where code can be simplified or made more idiomatic.
3. **Debug together (Hint-First):** If there are bugs or edge cases, provide targeted hints rather than giving away the answer immediately.
4. **Knowledge Check:** Ask 2-3 conceptual questions to confirm that you truly understand the concepts (e.g., *why state was placed where it was*, *how re-renders work*, etc.).

---

## 🗺️ Milestone Overview

| Milestone | Title | Focus & Key Concepts |
|---|---|---|
| **[Milestone 1](./01-foundations-and-shell.md)** | Foundations & Shell | React 19 JSX, component tree, layout wrapper, dark aesthetic |
| **[Milestone 2](./02-reusable-layout-and-props.md)** | Reusable Layout & Props | Navbar, Footer, WhatsApp floating CTA, passing and validating props |
| **[Milestone 3](./03-state-and-navigation.md)** | State & Navigation | `useState`, conditional rendering, tab routing, mobile drawer |
| **[Milestone 4](./04-context-and-localization.md)** | Context API & Bilingual RTL | `createContext`, `useContext`, English/Arabic dictionaries, `dir="rtl"` |
| **[Milestone 5](./05-presentational-pages.md)** | Presentational Pages & Grid | Hero, Coach Bio, Transformation cards, Pricing packages, FAQ accordion |
| **[Milestone 6](./06-interactive-calculator.md)** | Interactive Fitness Calculator | Controlled inputs, BMR/TDEE math, BMI indicators, macro splits |
| **[Milestone 7](./07-modals-and-overlays.md)** | Modals & Overlays | Portal pattern, escape key listeners, transform lightbox, video preview |
| **[Milestone 8](./08-multistep-form-and-instapay.md)** | Multi-Step Wizard & InstaPay | 8-step form state machine, InstaPay deep link, receipt screenshot upload |
| **[Milestone 9](./09-polish-and-architecture.md)** | Polish & Architecture | Responsive audit, custom hooks, error handling, final knowledge review |

---

## 📁 Workspace Recommendation: `/src/my-app/`

Create your project files inside `/src/my-app/`:
```text
src/
├── my-app/                <-- YOUR CODE GOES HERE
│   ├── components/        <-- Reusable UI (Navbar, Footer, Modal, etc.)
│   ├── pages/             <-- Views (Home, Calculator, Application, etc.)
│   ├── context/           <-- LanguageContext, etc.
│   ├── data/              <-- Translations, package plans, FAQs
│   └── MyApp.jsx          <-- Your root component
├── components/            <-- Reference (Version A)
├── pages/                 <-- Reference (Version A)
└── App.jsx                <-- Reference (Version A)
```

To view your app in the live preview whenever you want, you can simply toggle the import in `/src/main.jsx` between `App.jsx` (Reference) and `./my-app/MyApp.jsx` (Your App).

---

## 🚀 Ready to Begin?
Start with **[Milestone 1: Foundations & Shell](./01-foundations-and-shell.md)**! Read through the tasks, write your code, and submit whenever you are ready.
