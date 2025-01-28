import { useState, useCallback } from "react";

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle] as const;
}

// // Usage
// const Example = () => {
//   const [isToggled, toggle] = useToggle(false);

//   return (
//     <button onClick={toggle}>
//       {isToggled ? "ON" : "OFF"}
//     </button>
//   );
// };
