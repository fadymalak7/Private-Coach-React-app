# Milestone 2: Reusable Layout Components & Props

In this milestone, you will extract and build the primary static layout components: the **Navbar**, the **Footer**, and the **Floating WhatsApp CTA**. You will master passing data and callbacks through **props**.

---

## Task 2.1: Header/Navbar Component & Brand Identity

### 1. What You Are Building
A responsive navigation bar (`Navbar.jsx`) that displays Coach Mina Nashat's branding (logo/name), navigation links (Home, Calculator, Transformations, Pricing, Apply), and a language toggle button placeholder.

### 2. Core Concepts to Understand
- **Component Props:** Passing values from parent to child (`activeTab`, `onTabChange`, etc.).
- **List Rendering & Keys:** Rendering navigation items dynamically using `.map()` with unique `key` props.
- **Conditional Styling:** Applying active styling (e.g. highlight color, border, glow) when a link matches the current view.

### 3. Recommended Resources
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)

### 4. Implementation Steps
1. Create `/src/my-app/components/Navbar.jsx`.
2. Define navigation links array (either inside the file or passed in):
   ```js
   const navItems = [
     { id: 'home', label: 'Home' },
     { id: 'calculator', label: 'Fitness Calculator' },
     { id: 'transformations', label: 'Transformations' },
     { id: 'pricing', label: 'Packages' },
     { id: 'apply', label: 'Apply Now' },
   ];
   ```
3. Accept props: `activeTab` (string) and `onSelectTab` (function).
4. Render:
   - Brand logo / title: "Coach Mina Nashat | مينا نشأت"
   - Desktop navigation list with `.map()`
   - Distinct active class on the active link (e.g., `text-amber-400 font-semibold` vs `text-zinc-400 hover:text-white`).
5. Include an "Apply Now" prominent button.

### 5. Verification & Acceptance Criteria
- [ ] Navbar renders cleanly with sticky or fixed positioning at the top (`sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md`).
- [ ] Each navigation item triggers `onSelectTab(item.id)` when clicked.
- [ ] The active tab is visually highlighted.

---

## Task 2.2: Footer Component & Dynamic Metadata

### 1. What You Are Building
A rich footer component (`Footer.jsx`) with quick navigation links, coach credentials, social media links (Instagram, Facebook, YouTube), disclaimer note, and a dynamic copyright year (`new Date().getFullYear()`).

### 2. Core Concepts to Understand
- **Dynamic JavaScript Expressions in JSX:** Using `{new Date().getFullYear()}` directly inside JSX.
- **Props vs Static Presentation:** Deciding when a component should receive data from props vs when it can define its own structure.
- **External Links Security:** Using `target="_blank"` with `rel="noopener noreferrer"`.

### 3. Recommended Resources
- [React: JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)

### 4. Implementation Steps
1. Create `/src/my-app/components/Footer.jsx`.
2. Accept `onSelectTab` prop so footer quick links can navigate between tabs.
3. Organize into a multi-column responsive grid:
   - Column 1: Coach Mina Nashat bio summary & mission statement.
   - Column 2: Quick links (`Home`, `Calculator`, `Packages`, `Apply`).
   - Column 3: Contact info, social links, and working hours.
4. Bottom bar: Copyright notice with dynamic year and fitness disclaimer.

### 5. Verification & Acceptance Criteria
- [ ] Responsive grid: 1 column on mobile (`grid-cols-1`), 3 columns on desktop (`md:grid-cols-3`).
- [ ] Clicking quick links in the footer invokes `onSelectTab`.
- [ ] Clean typographic hierarchy with dimmed secondary labels (`text-zinc-400 text-sm`).

---

## Task 2.3: Reusable Floating WhatsApp Button with Props

### 1. What You Are Building
A fixed floating action button (FAB) in the corner of the screen (`WhatsAppButton.jsx`) that allows potential clients to message Coach Mina directly on WhatsApp with a pre-filled greeting message.

### 2. Core Concepts to Understand
- **Prop Defaults & Destructuring:** Providing default values for props like `phoneNumber` and `prefilledText`.
- **URL Encoding in JavaScript:** Using `encodeURIComponent()` to safely format pre-filled WhatsApp message queries (`https://wa.me/<number>?text=<encoded>`).
- **Fixed Viewport Positioning:** Tailwind utility classes (`fixed bottom-6 right-6 z-50`) and hover animations.

### 3. Recommended Resources
- [MDN: encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- [React: Passing Props with Default Values](https://react.dev/learn/passing-props-to-a-component#specifying-a-default-value-for-a-prop)

### 4. Implementation Steps
1. Create `/src/my-app/components/WhatsAppButton.jsx`.
2. Accept optional props:
   - `phoneNumber` (default: e.g. `"+201000000000"`)
   - `message` (default: `"Hello Coach Mina, I'm interested in personal coaching!"`)
3. Construct the WhatsApp link:
   ```js
   const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
   ```
4. Style the button with high-visibility styling (emerald green `bg-emerald-500`, hover glow, icon, and pulse or bounce effect).

### 5. Verification & Acceptance Criteria
- [ ] Floats consistently in the bottom corner without overlapping important page buttons.
- [ ] Opens WhatsApp in a new browser tab with the encoded message.
- [ ] Reusable with any phone number or message passed via props.

---

## 💡 Submission Instructions
You can submit:
- **Task 2.1** (Navbar)
- **Task 2.2** (Footer)
- **Task 2.3** (WhatsAppButton)
- Or **all three together in a single batch**!
Paste your code when ready for feedback.
