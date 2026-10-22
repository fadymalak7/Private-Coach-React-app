# Milestone 6: Interactive Fitness Calculator & Math Logic

In this milestone, you will build an interactive fitness tool (`FitnessCalculator.jsx`). You will learn how to handle **controlled inputs**, validate numeric form data, compute scientific formulas (**BMR**, **TDEE**, **BMI**), and visualize **macronutrient splits**.

---

## Task 6.1: Controlled Inputs & Form State Object

### 1. What You Are Building
A fitness calculator input form collecting:
- **Gender** (Male / Female)
- **Age** (years)
- **Height** (cm)
- **Weight** (kg)
- **Activity Level** (Sedentary, Lightly Active, Moderately Active, Very Active, Athlete)
- **Fitness Goal** (Fat Loss, Maintenance, Muscle Gain)

### 2. Core Concepts to Understand
- **Controlled Components:** React state as the "single source of truth" for form inputs (`value={state.field}` and `onChange={handleChange}`).
- **Single State Object Pattern:** Managing related input fields inside a single object:
  ```js
  const [formData, setFormData] = useState({
    gender: 'male',
    age: 26,
    height: 178,
    weight: 80,
    activity: 1.55,
    goal: 'cut',
  });
  ```
- **Generic Change Handler:** Updating specific keys using computed property names (`[e.target.name]: e.target.value`).

### 3. Recommended Resources
- [React: Responding to Events](https://react.dev/learn/responding-to-events)
- [React: Updating Objects in State](https://react.dev/learn/updating-objects-in-state)

### 4. Implementation Steps
1. Create `/src/my-app/pages/FitnessCalculator.jsx`.
2. Initialize `formData` with sensible defaults.
3. Write a universal handler:
   ```js
   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setFormData(prev => ({
       ...prev,
       [name]: value
     }));
   };
   ```
4. Render inputs with label, type, name, value, and onChange.

### 5. Verification & Acceptance Criteria
- [ ] Typing into inputs updates the state without losing focus or resetting other fields.
- [ ] Number inputs enforce realistic minimums/maximums (`min="10" max="120"`).

---

## Task 6.2: BMR & TDEE Calculations (Mifflin-St Jeor Formula)

### 1. What You Are Building
Compute the user's **Basal Metabolic Rate (BMR)** and **Total Daily Energy Expenditure (TDEE)**, plus adjusted daily caloric target based on their goal (deficit for fat loss, surplus for muscle building).

### 2. Core Concepts to Understand
- **Scientific Fitness Formulas (Mifflin-St Jeor):**
  - For Men: `BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(years) + 5`
  - For Women: `BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(years) - 161`
  - `TDEE = BMR * activityMultiplier`
- **Target Calories:**
  - Fat Loss (Cutting): `TDEE - 500 kcal` (or -20%)
  - Maintenance: `TDEE`
  - Muscle Building (Bulking): `TDEE + 300 kcal` (or +10%)
- **Derived State vs Unnecessary State:** Why calculate values on-the-fly during render or with `useMemo` rather than keeping redundant values in `useState`.

### 3. Recommended Resources
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: useMemo](https://react.dev/reference/react/useMemo)

### 4. Implementation Steps
1. Write a pure calculation utility function `calculateBMRAndTDEE(formData)`.
2. Compute `bmr`, `tdee`, and `targetCalories`.
3. Display cards showing:
   - Base Calories (BMR)
   - Maintenance Calories (TDEE)
   - Goal Caloric Target (bold highlighted number in amber).

### 5. Verification & Acceptance Criteria
- [ ] Changing weight from 80kg to 90kg recalculates BMR and TDEE instantly.
- [ ] Switching gender from Male to Female applies the proper offset.

---

## Task 6.3: BMI Calculation & Categorization Badge

### 1. What You Are Building
Calculate the Body Mass Index (**BMI**) and show a visual badge and scale:
- Formula: `weight (kg) / (height (m) ^ 2)`
- Categories:
  - Underweight: `< 18.5` (Blue)
  - Normal weight: `18.5 - 24.9` (Green)
  - Overweight: `25.0 - 29.9` (Yellow/Amber)
  - Obese: `≥ 30.0` (Red)

### 2. Core Concepts to Understand
- **Mathematical Unit Conversion:** Converting height from centimeters to meters (`height / 100`).
- **Dynamic CSS Classes:** Applying color classes conditionally based on the calculated category.

### 3. Recommended Resources
- [MDN: Math.pow & Number.toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)

### 4. Implementation Steps
1. In `FitnessCalculator.jsx`, compute:
   ```js
   const heightInMeters = Number(formData.height) / 100;
   const bmi = heightInMeters > 0 
     ? (Number(formData.weight) / (heightInMeters * heightInMeters)).toFixed(1)
     : 0;
   ```
2. Determine category and badge color.
3. Render a progress bar or gauge indicator showing where the user's BMI sits on the spectrum.

### 5. Verification & Acceptance Criteria
- [ ] For 180cm and 80kg, BMI displays as ~24.7 (Normal weight).
- [ ] Badge color and category title adapt dynamically.

---

## Task 6.4: Macronutrient Breakdown & Visual Ratio Bar

### 1. What You Are Building
Calculate customized daily macronutrient targets in grams:
- **Protein:** ~2.0g per kg bodyweight (`4 kcal/g`)
- **Fats:** ~25% of total target calories (`9 kcal/g`)
- **Carbohydrates:** Remaining calories (`4 kcal/g`)
Plus a visual distribution bar displaying the % split of Protein, Carbs, and Fats.

### 2. Core Concepts to Understand
- **Energy Conversion:** 1g protein = 4 kcal, 1g carb = 4 kcal, 1g fat = 9 kcal.
- **Visual Progress Bar:** Using flexbox with dynamic widths (`style={{ width: `${percentProtein}%` }}`) or SVG bars.

### 3. Recommended Resources
- [Tailwind CSS: Inline Styles vs Utility Classes](https://tailwindcss.com/docs/adding-custom-styles)

### 4. Implementation Steps
1. Calculate:
   - `proteinGrams = Math.round(weight * 2.0)`
   - `proteinCalories = proteinGrams * 4`
   - `fatCalories = Math.round(targetCalories * 0.25)`
   - `fatGrams = Math.round(fatCalories / 9)`
   - `carbCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories))`
   - `carbGrams = Math.round(carbCalories / 4)`
2. Render 3 summary stat badges: Protein (g), Carbs (g), Fats (g).
3. Render a stacked horizontal bar showing the relative percentages.
4. Add a CTA button beneath the results: *"Ready for a custom nutrition plan tailored by Coach Mina? [Apply Now]"*.

### 5. Verification & Acceptance Criteria
- [ ] Total calories from grams equals target calories: `(P*4) + (C*4) + (F*9) ≈ targetCalories`.
- [ ] Bar smoothly reflects the distribution.
- [ ] Clicking the CTA navigates the user to the coaching application form.

---

## 💡 Submission Instructions
Submit your work for **Task 6.1, 6.2, 6.3, or the complete FitnessCalculator component**.
Share `FitnessCalculator.jsx` and explain how your calculations were organized!
