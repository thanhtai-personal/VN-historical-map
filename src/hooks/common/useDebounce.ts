import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // Cleanup timeout
  }, [value, delay]);

  return debouncedValue;
}

// // Usage
// const Example = () => {
//   const [search, setSearch] = useState("");
//   const debouncedSearch = useDebounce(search, 500);

//   useEffect(() => {
//     if (debouncedSearch) {
//       console.log("Search API call for:", debouncedSearch);
//     }
//   }, [debouncedSearch]);

//   return <input onChange={(e) => setSearch(e.target.value)} />;
// };
