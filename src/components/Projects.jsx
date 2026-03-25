import { Camera, Video, Smartphone, ExternalLink, Github, Cctv } from 'lucide-react';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { projects } from '../data/resume';

const iconMap = { camera: Cctv, video: Camera, smartphone: Smartphone };

function ProjectCard({ project }) {
  const Icon = iconMap[project.icon] || Camera;

  return (
    <div
      className="glass rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ '--card-color': project.color }}
    >
      {/* Header */}
      <div
        className="relative p-6 pb-4"
        style={{
          background: `linear-gradient(135deg, ${project.color}10 0%, transparent 60%)`,
          borderBottom: `1px solid ${project.color}20`,
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${project.color}15`,
            border: `1px solid ${project.color}30`,
            boxShadow: `0 0 20px ${project.color}20`,
          }}
        >
          <Icon size={22} style={{ color: project.color }} />
        </div>

        <h3 className="font-display font-bold text-lg text-white mb-2 leading-tight group-hover:text-[#00D9FF] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 font-body leading-relaxed">{project.description}</p>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* <p className="text-xs text-slate-500 font-body leading-relaxed mb-5 flex-1">
          {project.longDescription}
        </p> */}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-lg p-2"
              style={{ background: `${project.color}08`, border: `1px solid ${project.color}15` }}
            >
              <div
                className="font-display font-bold text-sm mb-0.5"
                style={{ color: project.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                background: `${project.color}08`,
                color: project.color,
                border: `1px solid ${project.color}20`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="relative">
      <div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(123,47,190,0.05) 0%, transparent 70%)' }}
      />

      <SectionHeader
        label="// projects"
        title="Key Projects"
        subtitle="Production systems deployed and operating at scale — not proof-of-concepts."
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {/* System architecture note */}
      <div className="mt-10 glass rounded-2xl p-6">
        <p className="font-mono text-xs text-slate-600 tracking-widest uppercase mb-3">// system overview</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Detection Model", value: "SCRFD-10G" },
            { label: "Embedding Model", value: "ResNet-50 w600k" },
            { label: "Optimization", value: "TensorRT FP16" },
            { label: "Hardware", value: "NVIDIA DGX A100" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-display font-bold text-sm text-[#00D9FF] mb-1">{item.value}</div>
              <div className="font-mono text-xs text-slate-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
