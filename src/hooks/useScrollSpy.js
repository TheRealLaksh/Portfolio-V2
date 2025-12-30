import { useState, useEffect, useRef } from 'react';

const useScrollSpy = (ids, offset = 100) => {
  const [activeId, setActiveId] = useState('');
  const observer = useRef(null);

  useEffect(() => {

    if (observer.current) observer.current.disconnect();


    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0.1 
      }
    );


    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.current.observe(element);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [ids, offset]);

  return activeId;
};

export default useScrollSpy;