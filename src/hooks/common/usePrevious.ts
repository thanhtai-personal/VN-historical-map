import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// // Usage
// const Example = ({ count }: { count: number }) => {
//   const prevCount = usePrevious(count);

//   return (
//     <div>
//       <p>Current: {count}</p>
//       <p>Previous: {prevCount}</p>
//     </div>
//   );
// };
