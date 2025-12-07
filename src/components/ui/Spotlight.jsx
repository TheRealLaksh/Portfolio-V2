import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const Spotlight = () => {
  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMove = (x, y) => {
      springX.set(x);
      springY.set(y);
    };

    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    
    // Add Touch Support
    const handleTouchMove = (e) => {
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove); // Enable touch tracking

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [springX, springY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none z-0 mix-blend-screen opacity-50 md:opacity-100" // Reduced opacity on mobile
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(0,0,0,0) 70%)' 
      }}
    />
  );
};

export default Spotlight;