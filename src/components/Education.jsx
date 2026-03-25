import { GraduationCap, Award } from 'lucide-react';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { education, certifications } from '../data/resume';

function EducationCard({ item }) {
  return (
    <div
      className="glass glass-hover rounded-2xl p-6 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 bottom-0 w-0.5"
        style={{ background: `linear-gradient(180deg, ${item.color}, transparent)` }}
      />

      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
        >
          <GraduationCap size={18} style={{ color: item.color }} />
        </div>

        <div className="flex-1">
          <h3 className="font-display font-bold text-lg text-white mb-1">{item.degree}</h3>
          <p className="text-sm mb-0.5" style={{ color: item.color }}>{item.institution}</p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-mono mt-2">
            <span>{item.location}</span>
            <span>{item.period}</span>
            {item.cgpa && (
              <span className="text-[#00D9FF]">CGPA: {item.cgpa}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CertBadge({ cert }) {
  return (
    <div
      className="glass glass-hover rounded-xl p-4 flex items-start gap-3 group"
    >
      <div
        className="absolute top-0 left-0 bottom-0 w-0.5"
        style={{ background: `linear-gradient(180deg, ${cert.color}, transparent)` }}
      />
      {/* <span className="text-2xl flex-shrink-0">{cert.icon}</span> */}
      <Award size={18} style={{ color: cert.color }} />
      <div>
        <p className="text-sm text-slate-300 font-body leading-snug group-hover:text-white transition-colors mb-1">
          {cert.name}
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="text-xs font-bold tracking-wider"
            style={{ color: cert.color }}
          >
            {cert.issuer}
          </span>
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: cert.color }}
          />
          <svg className="w-3 h-3" style={{ color: cert.color }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.8 8.2L20 9L14.9 13.8L16.4 20L12 17L7.6 20L9.1 13.8L4 9L10.2 8.2L12 2Z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <SectionWrapper id="education" className="relative">
      <SectionHeader
        label="// education & certs"
        title="Credentials"
        subtitle="Academic foundation + 7 NVIDIA DLI certifications."
      />

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Education */}
        <div>
          <h3 className="font-display font-bold text-base text-slate-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <GraduationCap size={16} className="text-[#00D9FF]" />
            Education
          </h3>
          <div className="space-y-4">
            {education.map((item) => (
              <EducationCard key={item.degree} item={item} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-display font-bold text-base text-slate-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <Award size={16} className="text-[#FF6B35]" />
            NVIDIA DLI Certifications
          </h3>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <a href={cert.href} target={cert.href.startsWith('http') ? '_blank' : undefined} key={cert.name} className="gap-3"><CertBadge cert={cert} /></a>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
