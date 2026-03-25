import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function SectionWrapper({ id, children, className = '' }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section
      id={id}
      ref={ref}
      className={`py-24 px-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase opacity-70">
          {label}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00D9FF]/20 to-transparent" />
      </div>
      <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 text-base font-body max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}
