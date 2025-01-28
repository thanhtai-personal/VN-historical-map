import { useEffect, useRef } from "react";

/**
 * A custom hook to set up a timeout that runs a callback function after a specified delay.
 * @param callback - The function to execute after the timeout.
 * @param delay - The delay in milliseconds. Pass `null` to cancel the timeout.
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // Save the latest callback in a ref
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const tick = () => {
      savedCallback.current?.();
    };

    const id = setTimeout(tick, delay);

    return () => clearTimeout(id); // Cleanup on unmount or delay change
  }, [delay]);
}
