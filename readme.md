# 🧠 React Concepts Covered

## 1. **Fragments**
- Used to group multiple elements without adding an extra DOM node.  
- Syntax:
  ```jsx
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
  ```

---

## 2. **Refs – Connecting and Accessing HTML Elements**
- Refs provide a way to directly access DOM elements.
- Created using `useRef()` and assigned to an element’s `ref` attribute.

---

## 3. **Manipulating the DOM via Refs (Imperative Approach)**
- Refs allow direct DOM manipulation, bypassing React’s declarative model.
- Should be used **only when absolutely necessary**.

  ```jsx
  inputRef.current.value = "Updated imperatively!";
  ```

---

## 4. **Refs vs State Values**
| Aspect | Refs | State |
|--------|------|-------|
| Trigger re-render | ❌ No | ✅ Yes |
| Mutable | ✅ Yes | ❌ (Immutable)
| Access DOM directly | ✅ Yes | ❌ No |
| Use case | Access/manipulate DOM or store mutable value | Manage reactive UI data |

---

## 5. **Assigning a Modal Component using Refs**
- Refs can be used to control child components (like opening/closing a modal) from a parent component.

  ```jsx
  function App() {
    const modalRef = useRef();

    const openModal = () => {
      modalRef.current.open();
    };

    return (
      <>
        <button onClick={openModal}>Open Modal</button>
        <Modal ref={modalRef} />
      </>
    );
  }
  ```

---

## 6. **Forwarding Refs to Custom Components**
- Allows parent components to pass refs down to child components.
- Prior to React v19, done using `forwardRef` from React.

  ```jsx
  import { forwardRef } from "react";

  const ForwardRefContainer = forwardRef(function ComponentFunction({...props}, ref) {
    return (
      <>
        <div ref={ref}>Forwarded Ref Example</div>
      </>
    );
  });

  export default ForwardRefContainer;
  ```

---

## 7. **Exposing Component APIs via `useImperativeHandle` Hook**
- Used with `forwardRef` to define specific methods/properties accessible from parent components.

  ```jsx
  import { useImperativeHandle, useRef, forwardRef } from "react";

  export default function Modal (props, ref) {
    const dialogRef = useRef();

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current.showModal(),
      close: () => dialogRef.current.close(),
    }));

    return <dialog ref={dialogRef}>Modal Content</dialog>;
  } ;
  ```