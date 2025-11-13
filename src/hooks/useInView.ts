import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

/**
 * Hook to detect when an element enters the viewport using IntersectionObserver.
 * Disconnects after first intersection for performance.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): { ref: React.RefObject<T>; inView: boolean } {
  const { threshold = 0.15, rootMargin = '0px', root = null } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    
    // If IntersectionObserver is not available, assume element is in view
    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Disconnect after first intersection to avoid unnecessary checks
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root]);

  return { ref, inView };
}

