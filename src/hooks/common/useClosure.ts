import { useRef, useCallback } from "react";

/**
 * A custom hook that ensures you have access to the latest value of a function or variable inside a closure.
 * @param callback - The function or value you want to keep up-to-date in a closure.
 * @returns A stable function reference that always uses the latest version of the callback.
 */
export function useClosure<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef<T>(callback);

  // Update the ref whenever the callback changes
  callbackRef.current = callback;

  // Return a memoized function that calls the latest callback
  return useCallback(((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }) as T, []);
}
