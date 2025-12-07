import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const useScrollSpy = (ids, offset = 100) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // 1. Define the logic
    const listener = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the section that covers the current scroll position
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(id);
            return; 
          }
        }
      }
    };

    // 2. Throttle the listener (Execute at most once every 100ms)
    // This dramatically reduces CPU usage on mobile
    const throttledListener = throttle(listener, 100);

    // 3. Attach Event Listener
    window.addEventListener('scroll', throttledListener);
    
    // 4. Run once on mount to set initial active tab
    throttledListener();

    // 5. Cleanup
    return () => {
      window.removeEventListener('scroll', throttledListener);
      throttledListener.cancel(); // Cancel any pending calls
    };
  }, [ids, offset]);

  return activeId;
};

export default useScrollSpy;