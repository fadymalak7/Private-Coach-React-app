# Milestone 5: Presentational Sections & Responsive Grids

In this milestone, you will construct the primary visual content sections for Coach Mina Nashat: the **Hero section**, **Coach Bio & Stats**, **Transformations Showcase**, **Pricing Packages**, and an interactive **FAQ Accordion**.

---

## Task 5.1: Hero Section with Coach Mina Showcase & CTAs

### 1. What You Are Building
A high-impact hero section (`HeroSection.jsx`) featuring a bold fitness headline, badge ("Certified Fitness & Nutrition Specialist"), call-to-action buttons, trust indicators, and a high-resolution photo/portrait of Coach Mina Nashat.

### 2. Core Concepts to Understand
- **Component Decomposition:** Keeping the hero section focused on high-conversion presentation while delegating navigation actions upward.
- **Two-Column Responsive Layout:** `grid grid-cols-1 lg:grid-cols-2` that stacks on mobile and splits side-by-side on desktop.
- **Image Handling & Placeholders:** Managing fallback imagery, aspect ratios (`aspect-4/5` or `aspect-square`), and object positioning (`object-cover`).

### 3. Recommended Resources
- [Tailwind CSS: Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [React: Passing Event Handlers as Props](https://react.dev/learn/responding-to-events#passing-event-handlers-as-props)

### 4. Implementation Steps
1. Create `/src/my-app/components/HeroSection.jsx`.
2. Accept `onNavigate` prop so the CTAs ("Apply Now" & "Calculate Macros") can change tabs.
3. Left Column (or Right in RTL):
   - Status pill: "⚡ Limited Coaching Spots Available"
   - Headline: "Transform Your Physique with Coach Mina Nashat"
   - Subtitle: Evidence-based coaching, customized nutrition, weekly check-ins.
   - Dual buttons: Primary CTA (`onNavigate('apply')`) and Secondary CTA (`onNavigate('calculator')`).
4. Right Column:
   - Image card with dark border, gradient glow, and floating badge (e.g. "⭐ 500+ Clients Transformed").

### 5. Verification & Acceptance Criteria
- [ ] Responsive across small mobile screens and large desktop displays.
- [ ] Clicking "Apply Now" navigates to the application tab; clicking "Calculate Macros" navigates to the calculator.
- [ ] Respects RTL alignment when Arabic is selected.

---

## Task 5.2: Coach Bio, Credentials & Metric Counters

### 1. What You Are Building
A credibility section (`CoachBio.jsx`) highlighting Coach Mina Nashat's certifications, philosophy, and impressive milestone statistics (e.g. 8+ Years Experience, 500+ Transformed Bodies, 98% Success Rate).

### 2. Core Concepts to Understand
- **Data-Driven List Rendering:** Storing stats in an array of objects and rendering them via `.map()`.
- **Card UI Pattern:** Reusable stat card styling with subtle borders, dark glassmorphism, and accent colors (gold/amber).

### 3. Recommended Resources
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)

### 4. Implementation Steps
1. Create `/src/my-app/components/CoachBio.jsx`.
2. Define stats data array:
   ```js
   const stats = [
     { value: '8+', labelEn: 'Years Experience', labelAr: 'سنوات خبرة' },
     { value: '500+', labelEn: 'Success Stories', labelAr: 'قصة تحول' },
     { value: '98%', labelEn: 'Client Satisfaction', labelAr: 'نسبة الرضا' },
     { value: '24/7', labelEn: 'Direct Support', labelAr: 'متابعة مستمرة' },
   ];
   ```
3. Render credentials list:
   - Certified Personal Trainer (ISSA / ACE)
   - Sports Nutrition Specialist
   - Natural Bodybuilding & Fat Loss Coach
4. Map over stats with responsive 2-column or 4-column grid (`grid-cols-2 lg:grid-cols-4`).

### 5. Verification & Acceptance Criteria
- [ ] Clean typographic contrast between large stat numbers (`text-3xl font-bold text-amber-400`) and labels (`text-sm text-zinc-400`).
- [ ] Adapts smoothly across mobile and tablet.

---

## Task 5.3: Transformations Grid & Category Filter

### 1. What You Are Building
A client results showcase (`Transformations.jsx`) with before/after comparison cards, weight loss / muscle gain metrics, client quotes, and category filtering (All, Fat Loss, Muscle Gain).

### 2. Core Concepts to Understand
- **Derived State & Filtering:** Filtering an array of transformation objects based on an active filter state (`useState('all')` + `items.filter(...)`).
- **Callback Props:** Passing an `onSelectTransformation(item)` callback so clicking a card can open a detailed lightbox modal (prepared for Milestone 7).

### 3. Recommended Resources
- [React: Choosing the State Structure (Filtering lists)](https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state)

### 4. Implementation Steps
1. Create `/src/my-app/data/transformationsData.js` with client transformation objects (name, age, duration, weightLost, category, beforeImage, afterImage, quote).
2. Create `/src/my-app/components/Transformations.jsx`.
3. Add state: `const [filter, setFilter] = useState('all');`
4. Filter transformations:
   ```js
   const displayed = filter === 'all' 
     ? transformations 
     : transformations.filter(t => t.category === filter);
   ```
5. Render filter pill buttons with active highlights.
6. Render the transformation grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

### 5. Verification & Acceptance Criteria
- [ ] Clicking filter buttons instantly filters displayed client cards without full reloads.
- [ ] Each card clearly displays before/after images and key results (e.g. "-18 kg in 16 weeks").

---

## Task 5.4: Pricing & Package Cards with Features Checklist

### 1. What You Are Building
A tiered pricing table (`Pricing.jsx`) featuring Coach Mina's 3 coaching packages: **3 Months (Starter)**, **6 Months (Transformation - Most Popular)**, and **12 Months (VIP Elite)**.

### 2. Core Concepts to Understand
- **High-Converting Product Cards:** Highlighting a "Popular" tier with distinct borders (`border-amber-500`) and a "Best Value" badge.
- **Dynamic Action Prop:** Passing the chosen package ID to the application form so clicking "Choose Package" pre-selects that tier in the checkout form.

### 3. Recommended Resources
- [React: Passing Functions to Components](https://react.dev/learn/passing-props-to-a-component)

### 4. Implementation Steps
1. Create `/src/my-app/data/packagesData.js` defining tiers (title, duration, price, monthlyEquivalent, isPopular, features list).
2. Create `/src/my-app/components/Pricing.jsx`.
3. Accept `onSelectPackage(packageId)` prop.
4. Render 3 cards side-by-side on desktop:
   - Features checklist using checkmark icons
   - Price in EGP (Egyptian Pounds)
   - "Get Started" button that triggers `onSelectPackage(pkg.id)`.

### 5. Verification & Acceptance Criteria
- [ ] "Popular" package stands out visually from standard tiers.
- [ ] Clicking "Get Started" invokes the callback with the selected plan.

---

## Task 5.5: FAQ Accordion with Expand/Collapse State

### 1. What You Are Building
An interactive FAQ accordion (`FAQ.jsx`) addressing common questions (e.g. nutrition requirements, home vs gym workouts, payment methods like InstaPay, communication frequency).

### 2. Core Concepts to Understand
- **Single vs Multi-Open Accordion State:** Storing `openIndex` (`useState(null)`) so only one item is expanded at a time, or an array of open IDs.
- **Conditional Class Transitions:** Rotating a chevron icon (`rotate-180`) and animating height when expanded.

### 3. Recommended Resources
- [React: Thinking in React (Step 4: Identify Where Your State Should Live)](https://react.dev/learn/thinking-in-react)

### 4. Implementation Steps
1. Create `/src/my-app/components/FAQ.jsx`.
2. Add state: `const [openId, setOpenId] = useState(null);`
3. Toggle function: `setOpenId(current => current === id ? null : id)`
4. Render FAQ items with question button and conditional answer panel:
   ```jsx
   {openId === item.id && (
     <div className="p-4 text-zinc-300 border-t border-zinc-800">
       {item.answer}
     </div>
   )}
   ```

### 5. Verification & Acceptance Criteria
- [ ] Clicking a question opens its answer.
- [ ] Clicking an already open question collapses it.
- [ ] Smooth icon rotation indicator.

---

## 💡 Submission Instructions
You can submit **any subset of these tasks** (e.g. Tasks 5.1 & 5.2, or Tasks 5.3, 5.4 & 5.5). Share your component files and ask any questions!
