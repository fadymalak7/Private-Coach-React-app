# Milestone 7: Modals & Interactive Overlays

In this milestone, you will build production-quality overlay dialogs: a reusable **Modal Base** component, an interactive **Transformation Lightbox**, and an **Exercise Video Player Modal**.

---

## Task 7.1: Reusable Modal Wrapper with Escape Key & Backdrop

### 1. What You Are Building
A foundational dialog component (`Modal.jsx`) that displays content centered over a darkened backdrop, locks background scrolling while open, and closes when clicking outside or pressing the `Escape` key.

### 2. Core Concepts to Understand
- **Keyboard Event Listeners in `useEffect`:** Listening to `'keydown'` on `window` and checking `e.key === 'Escape'`.
- **Cleanup Functions:** Removing event listeners (`window.removeEventListener`) and unlocking body overflow on unmount.
- **Backdrop Click vs Dialog Click:** Preventing clicks inside the modal content from accidentally bubbling up and triggering the backdrop close handler (`e.stopPropagation()`).

### 3. Recommended Resources
- [React: Synchronizing with Effects (Event listeners & Cleanup)](https://react.dev/learn/synchronizing-with-effects#how-to-handle-an-effect-with-a-cleanup)
- [MDN: KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)

### 4. Implementation Steps
1. Create `/src/my-app/components/Modal.jsx`.
2. Accept props: `isOpen` (boolean), `onClose` (function), `title` (optional), `children` (ReactNode).
3. Early return if not open: `if (!isOpen) return null;`
4. Add `useEffect`:
   ```jsx
   useEffect(() => {
     if (!isOpen) return;
     const handleKeyDown = (e) => {
       if (e.key === 'Escape') onClose();
     };
     document.body.style.overflow = 'hidden';
     window.addEventListener('keydown', handleKeyDown);
     return () => {
       document.body.style.overflow = 'unset';
       window.removeEventListener('keydown', handleKeyDown);
     };
   }, [isOpen, onClose]);
   ```
5. Structure markup:
   - Outer backdrop container: `fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4`
   - Inner dialog card with `onClick={(e) => e.stopPropagation()}`
   - Close 'X' button in top corner.

### 5. Verification & Acceptance Criteria
- [ ] Modal opens smoothly and centers in the viewport.
- [ ] Pressing `Escape` closes the modal.
- [ ] Clicking the darkened backdrop closes the modal, but clicking inside the modal does not close it.
- [ ] Background page cannot be scrolled while modal is open.

---

## Task 7.2: Client Transformation Lightbox Modal

### 1. What You Are Building
A dedicated transformation lightbox (`TransformationModal.jsx`) that displays an enlarged view of a selected client's before-and-after photos, stats (starting weight, ending weight, body fat %, weeks taken), and an inspiring quote.

### 2. Core Concepts to Understand
- **Selected Item State:** Storing the active transformation object or `null` in parent state:
  ```jsx
  const [selectedTransformation, setSelectedTransformation] = useState(null);
  ```
- **Modal Component Composition:** Wrapping `TransformationModal` around the reusable `Modal` component created in Task 7.1.

### 3. Recommended Resources
- [React: Component Composition vs Inheritance](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)

### 4. Implementation Steps
1. Create `/src/my-app/components/TransformationModal.jsx`.
2. Receive props: `transformation` (object or null), `onClose` (function).
3. If `transformation` is present, render:
   - Client name and age badge
   - Side-by-side or stacked Before & After high-res images
   - Stat pills: Timeframe, Total Weight Lost, Key Achievement
   - Personal quote / testimonial
4. Add a "Start Your Own Transformation" button that navigates directly to the Application form.

### 5. Verification & Acceptance Criteria
- [ ] Clicking any transformation card in the grid opens this detailed modal.
- [ ] Displays before and after images with high clarity and proper labels.
- [ ] Closing the modal resets `selectedTransformation` to `null`.

---

## Task 7.3: Workout Video Preview Modal

### 1. What You Are Building
A video preview dialog (`VideoModal.jsx`) that embeds an exercise demonstration or coach intro video with an embedded HTML5 video or YouTube iframe, stopping playback automatically when closed.

### 2. Core Concepts to Understand
- **Stopping Media on Unmount:** Why closing a modal should stop or destroy the video player rather than allowing audio to continue in the background.
- **Responsive Aspect Ratios:** `aspect-video` (16:9) container in Tailwind CSS.

### 3. Recommended Resources
- [MDN: The Video Embed element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
- [Tailwind CSS: Aspect Ratio](https://tailwindcss.com/docs/aspect-ratio)

### 4. Implementation Steps
1. Create `/src/my-app/components/VideoModal.jsx`.
2. Accept `isOpen`, `onClose`, and `videoUrl` or `videoId`.
3. Embed an iframe or HTML5 `<video controls autoPlay>` inside the `Modal`.
4. Ensure the video source is unmounted when `isOpen` is `false`.

### 5. Verification & Acceptance Criteria
- [ ] Video renders in a responsive 16:9 box.
- [ ] Closing the dialog stops video audio immediately.

---

## 💡 Submission Instructions
Submit **Task 7.1** alone or together with **Tasks 7.2 and 7.3**. Share your modal code and let's review your event cleanup and overlay architecture!
