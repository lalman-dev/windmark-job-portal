"use client";

import { useEffect, useRef } from "react";

export function useIntersection(onIntersect: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 400px 0px",
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return ref;
}
