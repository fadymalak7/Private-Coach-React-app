# Milestone 3: State Management & Tab Navigation

In this milestone, you will make your application interactive! You will implement stateful navigation without an external router library, understanding how React's `useState` hook triggers re-renders and drives view transitions.

---

## Task 3.1: Tab-Based View Navigation with `useState`

### 1. What You Are Building
Connect the `activeTab` state in your root component (`MyApp.jsx`) so that clicking different links in the `Navbar` or `Footer` dynamically displays different views/pages (e.g. Home, Calculator, Transformations, Pricing, Application).

### 2. Core Concepts to Understand
- **The `useState` Hook:** How state stores values that persist across renders and triggers re-renders upon being updated.
- **Conditional Rendering Patterns:**
  - `switch / case` inside a helper render function
  - Logical AND (`activeTab === 'home' && <HomePage />`)
  - Object dictionary mapping (`views[activeTab]`)
- **Lifting State Up:** Why navigation state belongs in the parent (`MyApp.jsx`) rather than inside the `Navbar` itself.

### 3. Recommended Resources
- [React: State - A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)

### 4. Implementation Steps
1. In `MyApp.jsx`, import `{ useState }` from `'react'`.
2. Declare navigation state:
   ```jsx
   const [activeTab, setActiveTab] = useState('home');
   ```
3. Pass `activeTab` and `setActiveTab` to `Navbar` and `Footer`.
4. Create temporary placeholder view components (e.g. `HomePlaceholder`, `CalculatorPlaceholder`, `ApplicationPlaceholder`).
5. Render the matching view conditionally inside `<Layout>`:
   ```jsx
   const renderContent = () => {
     switch (activeTab) {
       case 'calculator':
         return <CalculatorPlaceholder />;
       case 'transformations':
         return <TransformationsPlaceholder />;
       case 'pricing':
         return <PricingPlaceholder />;
       case 'apply':
         return <ApplicationPlaceholder />;
       default:
         return <HomePlaceholder onNavigate={setActiveTab} />;
     }
   };
   ```

### 5. Verification & Acceptance Criteria
- [ ] Clicking any link in the Navbar updates `activeTab` and switches the displayed view immediately.
- [ ] No page reload occurs (SPA behavior).
- [ ] Passing `onNavigate` allows buttons inside page views (like a hero "Join Now" button) to switch the active tab to `'apply'`.

---

## Task 3.2: Mobile Drawer / Hamburger Menu State

### 1. What You Are Building
Add a responsive mobile drawer to `Navbar.jsx` with an open/close toggle button (hamburger icon) that slides out or drops down on small viewports and closes when a link is clicked.

### 2. Core Concepts to Understand
- **Local Component State:** Why `isMenuOpen` can be local to `Navbar` since no other components need to know if the drawer is open.
- **Event Handling:** Attaching `onClick` handlers to toggle state (`setIsMenuOpen(prev => !prev)`).
- **Auto-Close on Navigation:** Ensuring that selecting any link in the mobile drawer invokes `setIsMenuOpen(false)` so the menu doesn't block the screen.

### 3. Recommended Resources
- [React: Responding to Events](https://react.dev/learn/responding-to-events)
- [React: Updating State based on the previous state](https://react.dev/learn/queueing-a-series-of-state-updates)

### 4. Implementation Steps
1. In `Navbar.jsx`, add state:
   ```jsx
   const [isOpen, setIsOpen] = useState(false);
   ```
2. Render a hamburger button visible only on small screens (`md:hidden`).
3. Render a mobile dropdown or sliding drawer when `isOpen` is `true`.
4. When any link inside the mobile drawer is clicked:
   - Call `onSelectTab(item.id)`
   - Call `setIsOpen(false)`
5. Add a backdrop overlay with `onClick={() => setIsOpen(false)}` to dismiss the menu when tapping outside.

### 5. Verification & Acceptance Criteria
- [ ] Hamburger button toggles the mobile navigation menu smoothly.
- [ ] Selecting an item closes the drawer and navigates to the selected tab.
- [ ] On desktop (`md` breakpoint and larger), the hamburger icon is hidden and full links are visible.

---

## Task 3.3: Smooth Scroll vs Page Switch Interaction

### 1. What You Are Building
Handle scroll restoration when navigating between views. When the user changes tabs (e.g. from the bottom of the home page to the calculator), the window should smoothly scroll back to the top.

### 2. Core Concepts to Understand
- **The `useEffect` Hook for Side Effects:** Executing DOM operations (like `window.scrollTo`) in response to state changes.
- **Dependency Array:** Running an effect only when `activeTab` changes: `[activeTab]`.

### 3. Recommended Resources
- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)

### 4. Implementation Steps
1. In `MyApp.jsx`, import `{ useEffect }` from `'react'`.
2. Add an effect that listens to `activeTab`:
   ```jsx
   useEffect(() => {
     window.scrollTo({ top: 0, behavior: 'smooth' });
   }, [activeTab]);
   ```
3. Test transitioning between tabs from a scrolled position.

### 5. Verification & Acceptance Criteria
- [ ] Navigating to a new tab resets the scroll position to the top of the viewport.
- [ ] Effect runs only when `activeTab` changes, not on unrelated re-renders.

---

## 💡 Submission Instructions
Submit **Task 3.1**, **Task 3.2**, or **all of Milestone 3** together. Share your code for `MyApp.jsx` and `Navbar.jsx` to receive feedback!
