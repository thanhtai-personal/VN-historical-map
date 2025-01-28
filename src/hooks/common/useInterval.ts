import { useEffect, useRef } from "react";

/**
 * A custom hook to set up an interval that runs a callback function at a specified delay.
 * @param callback - The function to run on each interval.
 * @param delay - The delay between executions in milliseconds. Pass `null` to pause.
 */
export function useInterval(callback: () => void, delay: number | null) {
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

    const id = setInterval(tick, delay);

    return () => clearInterval(id); // Cleanup on unmount or delay change
  }, [delay]);
}
