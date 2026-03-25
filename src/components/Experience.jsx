import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { experience } from '../data/resume';

function TimelineItem({ item, index }) {
  return (
    <div className="relative pl-8 md:pl-0">
      {/* Desktop: alternating layout */}
      <div className={`hidden md:flex gap-8 items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Content */}
        <div className="flex-1">
          <div
            className={`glass glass-hover rounded-2xl p-7 relative overflow-hidden group ${
              index % 2 === 0 ? 'text-left' : 'text-right'
            }`}
          >
            {/* Colored accent top border */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
            />

            {/* Current badge */}
            {item.current && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono mb-4"
                style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Current Role
              </div>
            )}

            <h3 className="font-display font-bold text-xl text-white mb-1">{item.role}</h3>
            <p className="font-body text-base mb-3" style={{ color: item.color }}>{item.company}</p>

            <div className={`flex flex-wrap gap-4 text-xs text-slate-500 mb-5 font-mono ${index % 2 !== 0 ? 'justify-end' : ''}`}>
              <span className="flex items-center gap-1.5">
                <Calendar size={11} />
                {item.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={11} />
                {item.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={11} />
                {item.type}
              </span>
            </div>

            <ul className={`space-y-2.5 mb-5 ${index % 2 !== 0 ? 'items-end' : ''}`}>
              {item.highlights.map((h, i) => (
                <li key={i} className={`flex gap-2.5 text-sm text-slate-400 font-body leading-relaxed ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? 'justify-end' : ''}`}>
              {item.tags.map((tag) => (
                <span key={tag} className="tech-chip">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Center dot */}
        <div className="flex flex-col items-center flex-shrink-0 pt-6">
          <div
            className="w-4 h-4 rounded-full border-2 relative z-10"
            style={{
              background: item.color,
              borderColor: item.color,
              boxShadow: `0 0 16px ${item.color}80`,
            }}
          />
        </div>

        {/* Empty space for alternating layout */}
        {/* <div className="flex-1" /> */}
        {/* Image */}
<div className="flex-1 flex justify-center items-center">
  <div className="relative w-full max-w-sm group">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />
    
    <img
      src={item.image}
      alt={item.role}
      className="relative rounded-2xl w-full h-auto object-cover border border-white/10 shadow-xl group-hover:scale-105 transition duration-500"
    />
  </div>
</div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-6 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, ${item.color}, transparent)` }}
        />
        {/* Dot */}
        <div
          className="absolute left-[-6px] top-5 w-3.5 h-3.5 rounded-full border-2 z-10"
          style={{ background: item.color, borderColor: item.color, boxShadow: `0 0 10px ${item.color}80` }}
        />

        <div className="glass rounded-2xl p-5 ml-2 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
          />

          {item.current && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono mb-3"
              style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Current Role
            </div>
          )}

          <h3 className="font-display font-bold text-lg text-white mb-1">{item.role}</h3>
          <p className="text-sm mb-3" style={{ color: item.color }}>{item.company}</p>

          <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4 font-mono">
            <span className="flex items-center gap-1"><Calendar size={10} />{item.period}</span>
            <span className="flex items-center gap-1"><MapPin size={10} />{item.location}</span>
          </div>

          <ul className="space-y-2 mb-4">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-400 font-body">
                <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span key={tag} className="tech-chip">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="relative">
      <SectionHeader
        label="// experience"
        title="Work History"
        subtitle="Where theory meets production-scale deployment."
      />

      {/* Desktop timeline with center line */}
      <div className="hidden md:block relative">
        {/* Center vertical line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(180deg, #00D9FF30 0%, #00D9FF10 50%, transparent 100%)' }}
        />

        <div className="space-y-12">
          {experience.map((item, i) => (
            <TimelineItem key={item.company} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="md:hidden space-y-8 relative pl-4">
        {experience.map((item, i) => (
          <TimelineItem key={item.company} item={item} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
