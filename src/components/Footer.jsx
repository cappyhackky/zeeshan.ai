import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/resume';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 border border-[#00D9FF]/50 rounded-full" />
            <div className="absolute inset-2 bg-[#00D9FF] rounded-full" />
          </div>
          <span className="font-display text-sm font-bold text-white tracking-widest uppercase">
            MZ<span className="text-[#00D9FF]">S</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} Mohd Zishan Saifi · Computer Vision Engineer
        </p>

        {/* Social */}
        <div className="flex items-center gap-4">
          {[
            { Icon: Github, href: personalInfo.github, label: "GitHub" },
            { Icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
            { Icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-[#00D9FF] hover:border-[#00D9FF]/30 transition-all duration-200"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
