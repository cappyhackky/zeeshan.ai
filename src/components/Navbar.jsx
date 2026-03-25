import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050509]/90 backdrop-blur-xl border-b border-[#00D9FF]/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={() => handleNav('#hero')} className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border border-[#00D9FF]/60 rounded-full group-hover:border-[#00D9FF] transition-colors" />
            <div className="absolute inset-1.5 border border-[#00D9FF]/30 rounded-full" />
            <div className="absolute inset-[9px] bg-[#00D9FF] rounded-full group-hover:shadow-[0_0_10px_#00D9FF] transition-all" />
          </div>
          <span className="font-display font-700 text-white text-sm tracking-widest uppercase">
            MZ<span className="text-[#00D9FF]">S</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="px-4 py-2 text-sm font-body text-slate-400 hover:text-[#00D9FF] transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#00D9FF] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <a
            href="mailto:saifizeeshan895@gmail.com"
            className="ml-4 px-5 py-2 text-sm font-mono text-[#00D9FF] border border-[#00D9FF]/40 hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] rounded transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-[#00D9FF] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0a0a14]/95 backdrop-blur-xl border-t border-[#00D9FF]/10 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left py-2.5 text-slate-300 hover:text-[#00D9FF] font-body text-sm transition-colors border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
