import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  isInfinite?: boolean;
  stateCallback?: (isElementInView?: boolean) => void;
  style?: CSSProperties;
}

export const IntersectionObserverView = ({
  children,
  className,
  id,
  isInfinite = false,
  stateCallback,
  style = {}
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          stateCallback?.(true);
        } else {
          if (isInfinite) {
            setLoaded(false);
          }
          stateCallback?.(false);
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div id={id} ref={ref} style={{
      width: "100%",
      minHeight: "100px",
      ...style
    }} className={`${className}`}>
      {loaded ? children : ""}
    </div>
  );
};