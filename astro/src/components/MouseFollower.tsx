import { useEffect, useRef } from 'react';

export default function MouseFollower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.7,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
    />
  );
}
