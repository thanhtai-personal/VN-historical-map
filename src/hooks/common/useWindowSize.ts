import { useState, useEffect } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return size;
}

// // Usage
// const Example = () => {
//   const { width, height } = useWindowSize();

//   return (
//     <p>
//       Width: {width}, Height: {height}
//     </p>
//   );
// };
