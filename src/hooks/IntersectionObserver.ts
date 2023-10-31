import { useEffect, RefObject } from 'react';

const listenerCallbacks = new WeakMap<HTMLElement, () => void>();

let observer: IntersectionObserver | undefined;

function handleIntersections(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (listenerCallbacks.has(entry.target as HTMLElement)) {
      const cb = listenerCallbacks.get(entry.target as HTMLElement);
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        if (observer) {
          observer.unobserve(entry.target);
        }
        listenerCallbacks.delete(entry.target as HTMLElement);
        cb?.();
      }
    }
  });
}

function getIntersectionObserver(): IntersectionObserver {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '100px',
      threshold: 0.15,
    });
  }
  return observer;
}

export function useIntersection(elem: RefObject<HTMLElement>, callback: () => void): void {
  useEffect(() => {
    const target = elem.current;

    if (!target) return;
    const observer = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observer.observe(target);
    return () => {
      if (!target) return;
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, [callback, elem]);
}
