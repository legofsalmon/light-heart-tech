import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      trail.style.display = 'none';
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });

      gsap.to(trail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, trail], { opacity: 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, trail], { opacity: 0, duration: 0.2 });
    };

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    const handleElementEnter = () => {
      gsap.to(cursor, { scale: 2, duration: 0.2 });
      gsap.to(trail, { scale: 1.5, opacity: 0.3, duration: 0.2 });
    };

    const handleElementLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(trail, { scale: 1, opacity: 0.15, duration: 0.2 });
    };

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementEnter);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ 
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
        }}
      />
      {/* Cursor trail */}
      <div
        ref={trailRef}
        className="fixed w-6 h-6 border border-neon-cyan/30 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{ 
          transform: 'translate(-50%, -50%)',
          opacity: 0.15,
        }}
      />
    </>
  );
}
