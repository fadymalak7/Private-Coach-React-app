# Milestone 8: Multi-Step Application Wizard & InstaPay Payment Flow

In this milestone, you will build the core conversion engine of the platform: the **Multi-Step Client Application Wizard** (`ApplicationPage.jsx`). You will implement step-by-step state management, form validation, deep-linking to **InstaPay** for payment, and a **Receipt Screenshot Upload** with real-time image preview.

---

## 📋 Wizard Step Architecture

The application wizard is organized into 8 progressive steps:

1. **Step 1: Personal Information** (Full Name, Age, Phone Number, City, Gender)
2. **Step 2: Physical Metrics** (Height, Current Weight, Target Goal Weight)
3. **Step 3: Fitness Goals** (Fat loss, Muscle gain, Recomposition, General health)
4. **Step 4: Nutrition & Diet Preferences** (Meal frequency, Allergies, Favorite foods, Supplements)
5. **Step 5: Health & Medical History** (Injuries, Chronic conditions, Medications)
6. **Step 6: Plan Selection** (3 Months, 6 Months, or 12 Months Coaching)
7. **Step 7: InstaPay Payment Transfer** (InstaPay redirect button, Coach username/QR, Payment instructions)
8. **Step 8: Receipt Screenshot Upload & Final Submission** (Image file upload, preview, confirmation, and final submission)

*(Note: In accordance with project requirements, legacy WhatsApp summaries and gym location questions have been removed in favor of this direct digital payment onboarding).*

---

## Task 8.1: Multi-Step Wizard State Machine & Progress Bar

### 1. What You Are Building
The wizard skeleton with `currentStep` tracking (1 to 8), Next/Back navigation buttons, and a visual step progress indicator bar at the top of the form.

### 2. Core Concepts to Understand
- **Step State Management:** Tracking integer `currentStep` (`useState(1)`) with boundary constraints:
  ```js
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  ```
- **Compound Form State:** A single `formData` object collecting data across all steps until final submission.
- **Progress Calculation:** `const progressPercentage = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;`

### 3. Recommended Resources
- [React: Updating State Objects](https://react.dev/learn/updating-objects-in-state)
- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)

### 4. Implementation Steps
1. Create `/src/my-app/pages/ApplicationPage.jsx`.
2. Define `TOTAL_STEPS = 8`.
3. Set up state:
   ```jsx
   const [currentStep, setCurrentStep] = useState(1);
   const [formData, setFormData] = useState({
     // Step 1: Personal
     fullName: '', age: '', phone: '', city: '', gender: 'male',
     // Step 2: Metrics
     height: '', weight: '', targetWeight: '',
     // Step 3: Goals
     primaryGoal: 'fat_loss', activityLevel: 'moderate',
     // Step 4: Nutrition
     mealCount: '3', allergies: '',
     // Step 5: Health
     injuries: '', medicalNotes: '',
     // Step 6: Plan
     selectedPlan: '6_months',
     // Step 7 & 8: Payment
     hasInitiatedPayment: false,
     paymentReceiptFile: null,
     paymentReceiptPreview: '',
   });
   ```
4. Build the step progress bar:
   - Dynamic fill width: `style={{ width: `${progressPercentage}%` }}`
   - Step counter: "Step {currentStep} of {TOTAL_STEPS}"
5. Add universal "Next" and "Back" buttons at the bottom of the card.

### 5. Verification & Acceptance Criteria
- [ ] Clicking "Next" advances the step; clicking "Back" returns to the previous step without losing data.
- [ ] Step 1 disables the "Back" button; Step 8 changes "Next" into "Submit Application".
- [ ] Progress bar width updates smoothly.

---

## Task 8.2: Data Collection Steps (Steps 1 through 6)

### 1. What You Are Building
Render the input forms for steps 1 through 6:
- **Step 1:** Name, phone, city, age.
- **Step 2:** Height, weight, target weight.
- **Step 3:** Goal selection (radio cards with icons).
- **Step 4:** Daily meals, dietary restrictions, preferred foods.
- **Step 5:** Past injuries, chronic medical conditions, medications.
- **Step 6:** Coaching package selection (3, 6, or 12 months with price tags).

### 2. Core Concepts to Understand
- **Field Validation Before Next:** Validating required fields before allowing `nextStep()`:
  ```js
  const validateStep = (step) => {
    if (step === 1) return formData.fullName.trim() && formData.phone.trim();
    if (step === 2) return formData.height && formData.weight;
    return true;
  };
  ```
- **Option Card Selectors:** Building clickable custom radio cards that highlight when selected instead of using plain browser radio inputs.

### 3. Recommended Resources
- [MDN: Form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

### 4. Implementation Steps
1. Create a step renderer function or subcomponents for steps 1-6.
2. For each input, attach `name`, `value`, and `onChange`.
3. Add inline error messaging if a user clicks Next with an empty required field.
4. For Step 6, allow selecting one of Coach Mina's packages with the price clearly stated in EGP.

### 5. Verification & Acceptance Criteria
- [ ] Entering data and moving to Step 2 then back to Step 1 preserves the user's entered text.
- [ ] Validation prevents proceeding if required contact info is missing.

---

## Task 8.3: Step 7 — InstaPay Payment Transfer Flow

### 1. What You Are Building
A payment initiation screen for Egyptian InstaPay:
- Displays Coach Mina Nashat's InstaPay address / username (e.g., `mina.nashat@instapay` or mobile number).
- Calculates the total amount due based on the plan selected in Step 6.
- A prominent button: **"Pay via InstaPay"** that attempts to deep-link to the InstaPay mobile app or opens payment instructions.
- Clear step-by-step instructions:
  1. Click to open InstaPay (or transfer manually using the coach's address).
  2. Send the exact subscription amount.
  3. **Take a screenshot of the successful transaction confirmation screen**.
  4. Return here to upload the screenshot in the next step.

### 2. Core Concepts to Understand
- **Mobile Deep Linking:** Using custom URI schemes (`instapay://` or web fallback) to launch installed mobile banking apps.
- **Clipboard API in JavaScript:** Providing a "Copy InstaPay Address" button with `navigator.clipboard.writeText()` for effortless user experience.
- **State Flag:** Tracking `hasInitiatedPayment: true` once the user clicks the payment button.

### 3. Recommended Resources
- [MDN: Clipboard API writeText](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)

### 4. Implementation Steps
1. Display the coach's InstaPay details in a prominent payment box:
   - Recipient Name: **مينا نشأت / Mina Nashat**
   - InstaPay IPA: `coach.minanashat@instapay` (or phone number)
   - Total Amount: e.g. `2,500 EGP` (dynamically pulled from `formData.selectedPlan`)
2. Add a "Copy Address" button with feedback text ("Copied!").
3. Add the main payment button:
   ```jsx
   <a
     href="instapay://"
     onClick={() => setFormData(p => ({ ...p, hasInitiatedPayment: true }))}
     className="block w-full text-center py-4 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white shadow-lg shadow-purple-600/30"
   >
     Open InstaPay App & Pay
   </a>
   ```
4. Render an informative notice reminding the client to capture a screenshot after transferring.

### 5. Verification & Acceptance Criteria
- [ ] Shows exact price corresponding to the package picked in Step 6.
- [ ] Copy button copies the InstaPay ID and shows temporary "Copied!" feedback.
- [ ] Clear callout instructs the user to take a screenshot and proceed to upload.

---

## Task 8.4: Step 8 — Payment Receipt Screenshot Upload & File Preview

### 1. What You Are Building
An image upload zone in Step 8 where the user uploads their InstaPay payment confirmation screenshot, sees an instant image preview, can remove/re-upload if wrong, and submits the final application.

### 2. Core Concepts to Understand
- **HTML5 File Inputs (`<input type="file" accept="image/*">`):** Reading user files with `e.target.files[0]`.
- **Client-Side Image Preview with `URL.createObjectURL`:** Generating a local blob preview URL without uploading to a server first.
- **Memory Management:** Calling `URL.revokeObjectURL()` on file change or unmount to prevent browser memory leaks.
- **Drag-and-Drop UX:** Optional dragover/drop handlers for desktop users.

### 3. Recommended Resources
- [MDN: URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
- [MDN: Using files from web applications](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)

### 4. Implementation Steps
1. In `ApplicationPage.jsx`, add a file change handler:
   ```js
   const handleFileUpload = (e) => {
     const file = e.target.files[0];
     if (file) {
       // Revoke previous URL if one exists to avoid memory leak
       if (formData.paymentReceiptPreview) {
         URL.revokeObjectURL(formData.paymentReceiptPreview);
       }
       const previewUrl = URL.createObjectURL(file);
       setFormData(prev => ({
         ...prev,
         paymentReceiptFile: file,
         paymentReceiptPreview: previewUrl,
       }));
     }
   };
   ```
2. Render an upload dropzone:
   - If no file uploaded: Dashed border upload card with icon, "Upload Screenshot", and `<input type="file" accept="image/*" className="hidden" id="receipt-upload" />`.
   - If file uploaded: Show image thumbnail preview, file name, file size, and a "Change / Remove" button.
3. Validate that a receipt image has been provided before allowing the final "Submit Application" button to be clicked.

### 5. Verification & Acceptance Criteria
- [ ] Selecting an image file immediately renders a thumbnail preview.
- [ ] Clicking "Remove" clears the file and preview URL cleanly.
- [ ] The user cannot submit until a receipt image is selected.

---

## Task 8.5: Final Review & Submission Confirmation

### 1. What You Are Building
A success screen displayed upon completing the 8 steps:
- Congratulates the user ("Application & Payment Received!").
- Displays an application reference ID (e.g. `#MN-84920`).
- Outlines the next steps: Coach Mina will review the questionnaire and verify the InstaPay transaction within 2-4 hours, then reach out on WhatsApp to schedule the onboarding call.
- A button to return to the Home page.

### 2. Core Concepts to Understand
- **Submission State Machine:** Tracking `isSubmitted: boolean` or `status: 'idle' | 'submitting' | 'success' | 'error'`.
- **Resetting Form State:** Restoring the form to its initial empty state when starting over.

### 3. Recommended Resources
- [React: Managing State](https://react.dev/learn/managing-state)

### 4. Implementation Steps
1. Add state: `const [isSubmitted, setIsSubmitted] = useState(false);`
2. In the submit handler:
   - Simulate an async submission with `setTimeout` or real API.
   - Upon completion, `setIsSubmitted(true)`.
3. Render the success view with celebratory checkmark icon and clear onboarding timeline.

### 5. Verification & Acceptance Criteria
- [ ] Submitting the completed 8-step form shows the success confirmation view.
- [ ] All entered data and uploaded file are handled cleanly.
- [ ] "Back to Home" resets the wizard and navigates to the home view.

---

## 💡 Submission Instructions
You can submit:
- **Tasks 8.1 & 8.2** (Wizard foundation & inputs)
- **Tasks 8.3 & 8.4** (InstaPay redirect & screenshot file upload)
- Or **the full 8-step ApplicationPage component** at once!
Share your code when ready for code review.
