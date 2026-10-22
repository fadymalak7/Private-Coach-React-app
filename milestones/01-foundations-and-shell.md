# Milestone 1: Foundations & App Shell

In this milestone, you will initialize your learning workspace and build the foundational shell for your version of the application. You will understand how React renders into the DOM, the role of JSX, and how to create a high-contrast dark theme container.

---

## Task 1.1: Set Up Your Isolated Workspace

### 1. What You Are Building
You will create an isolated directory (`/src/my-app/`) and a root component (`MyApp.jsx`) so your work does not overwrite or interfere with the existing reference app.

### 2. Core Concepts to Understand
- **Single Page Application (SPA) Root:** How `ReactDOM.createRoot` in `src/main.jsx` mounts the root React element onto `<div id="root"></div>` in `index.html`.
- **Component File Conventions:** Why React components are JavaScript functions that return JSX, named in `PascalCase`, and exported either as `export default` or named exports.

### 3. Recommended Resources
- [React: Describing the UI & Your First Component](https://react.dev/learn/your-first-component)
- [React: Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)

### 4. Implementation Steps
1. Create a folder named `/src/my-app/`.
2. Inside it, create `MyApp.jsx`.
3. In `MyApp.jsx`, define and export a functional component named `MyApp`.
4. Return a simple greeting to confirm rendering:
   ```jsx
   export default function MyApp() {
     return <div>Coach Mina Nashat - Rebuild in Progress</div>;
   }
   ```
5. *(Optional for live testing)*: Check how `src/main.jsx` can import `MyApp` from `./my-app/MyApp.jsx` instead of `./App.jsx` when you want to preview your work.

### 5. Verification & Acceptance Criteria
- [ ] `src/my-app/MyApp.jsx` exists and has a clean, valid default export.
- [ ] No compilation errors when mounted.

---

## Task 1.2: Understanding React 19 JSX & Root Shell

### 1. What You Are Building
Transform `MyApp.jsx` into a production-grade layout shell with a dark theme background (`bg-zinc-950` or `bg-slate-950`), clean text color hierarchy (`text-zinc-100`), minimum screen height (`min-h-screen`), and an accessible document structure.

### 2. Core Concepts to Understand
- **JSX Rules:**
  - Must return a single root element (or Fragment `<>...</>`).
  - Close all tags (`<img />`, `<br />`, `<input />`).
  - Use `className` instead of `class` because `class` is a reserved JavaScript keyword.
- **Tailwind Utility Architecture:** Why utility classes like `min-h-screen`, `bg-zinc-950`, `text-zinc-100`, `flex`, and `flex-col` establish a sturdy flexbox container that pushes footers to the bottom.

### 3. Recommended Resources
- [React: Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Tailwind CSS: Flexbox and Grid](https://tailwindcss.com/docs/flex)

### 4. Implementation Steps
1. In `MyApp.jsx`, wrap the content inside a container element with:
   - Full minimum height: `min-h-screen`
   - Dark background: e.g. `bg-zinc-950`
   - Light primary text: `text-zinc-100`
   - Flex vertical layout: `flex flex-col`
2. Add placeholder areas inside the shell for:
   - Header area (`<header>`)
   - Main content area (`<main className="flex-1">`)
   - Footer area (`<footer>`)
3. Ensure the `main` tag uses `flex-1` so that even with minimal content, the footer stays anchored at the bottom of the viewport.

### 5. Verification & Acceptance Criteria
- [ ] The app shell fills the full viewport height without awkward gaps or horizontal scroll.
- [ ] The background is a sleek dark tone matching Coach Mina's branding.
- [ ] `<main>` expands dynamically to fill remaining vertical space.

---

## Task 1.3: Creating the Base Layout Wrapper Component

### 1. What You Are Building
Refactor the shell into a reusable `Layout` component that accepts a `children` prop. This allows any page or view to be wrapped cleanly without repeating the outer shell markup.

### 2. Core Concepts to Understand
- **The `children` Prop:** How React passes nested JSX elements into components as `props.children`.
- **Component Composition:** Creating generic wrappers (e.g. `Layout`, `Card`, `Container`) vs monolithic files.

### 3. Recommended Resources
- [React: Passing Props to a Component (Passing JSX as children)](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)

### 4. Implementation Steps
1. Create `/src/my-app/components/Layout.jsx`.
2. Define `Layout({ children })` accepting `children` via prop destructuring.
3. Move the outer dark theme container, header placeholder, `<main className="flex-1">{children}</main>`, and footer placeholder into `Layout.jsx`.
4. In `MyApp.jsx`, import `Layout` and wrap some test content inside `<Layout> ... </Layout>`.

### 5. Verification & Acceptance Criteria
- [ ] Any content passed inside `<Layout>Hello</Layout>` renders correctly inside the `<main>` tag.
- [ ] The structure is decoupled and ready for dedicated Header and Footer components in Milestone 2.

---

## 💡 Submission Instructions
You can submit **Task 1.1 alone**, or **Tasks 1.1 + 1.2 + 1.3 together**!
Paste your code for `MyApp.jsx` and `Layout.jsx` into the chat when ready.
