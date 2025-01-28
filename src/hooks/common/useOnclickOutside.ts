import { useEffect } from "react";

export function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener); // Cleanup
  }, [ref, handler]);
}

// // Usage
// const Example = () => {
//   const ref = useRef(null);
//   const handleClose = () => console.log("Clicked outside!");

//   useOnClickOutside(ref, handleClose);

//   return <div ref={ref}>Click outside me!</div>;
// };
