import { useEffect } from 'react';

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event?: Event) => void,
  eventType: keyof DocumentEventMap,
) {
  useEffect(() => {
    const clickOutside = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener(eventType, clickOutside);

    return () => {
      document.removeEventListener(eventType, clickOutside);
    };
  }, [handler, ref, eventType]);
}

export default useOnClickOutside;
