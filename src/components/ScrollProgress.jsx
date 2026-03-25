import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-75"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #00D9FF, #7B2FBE, #FF6B35)',
          boxShadow: '0 0 8px rgba(0,217,255,0.6)',
        }}
      />
    </div>
  );
}
