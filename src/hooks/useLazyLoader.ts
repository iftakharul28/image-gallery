import { useEffect, useState, useRef } from 'react';

function useLazyLoader(rootMargin = '-300px') {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!imageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(imageRef.current);

    return () => {
      if (!imageRef.current) return;
      observer.unobserve(imageRef?.current);
    };
  }, [rootMargin]);

  return { imageRef, isIntersecting };
}

export default useLazyLoader;
