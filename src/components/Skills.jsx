import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { skills } from '../data/resume';
import { BrainCircuit, BrainCircuitIcon, Focus, UsbIcon } from 'lucide-react';
import { BsNvidia } from 'react-icons/bs';
import { SiMediapipe, SiMilvus, SiNvidia, SiOnnx, SiOpencv, SiPytorch, SiTensorflow } from 'react-icons/si';
import { DiDocker, DiGithub, DiLinux, DiPostgresql, DiPython } from 'react-icons/di';
import { BiBuilding } from 'react-icons/bi';

// Skill bar with animated fill
function SkillBar({ name, level, color, visible }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setWidth(level), 200 + Math.random() * 400);
      return () => clearTimeout(t);
    }
  }, [visible, level]);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-300 font-body group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="font-mono text-xs" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        </div>
      </div>
    </div>
  );
}

// Skill category panel
function SkillCategory({ category, data, visible }) {
  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-2 h-6 rounded-full"
          style={{ background: data.color, boxShadow: `0 0 10px ${data.color}60` }}
        />
        <h3 className="font-display font-bold text-sm text-white tracking-wide">
          {category}
        </h3>
      </div>
      <div className="space-y-4">
        {data.items.map((skill) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={data.color}
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}

// Tech badge cloud
const allTags = [
  { name: "InsightFace", icon: <BrainCircuit/> }, { name: "TensorRT", icon: <BsNvidia/> }, { name: "SCRFD-10G", icon: <BrainCircuitIcon/> }, { name: "ResNet-50", icon: <Focus/> }, { name: "Triton Server", icon: <SiNvidia/> }, { name: "Milvus", icon: <SiMilvus/> }, { name: "ONNX", icon: <SiOnnx/> }, { name: "DGX A100", icon: <SiNvidia/> }, { name: "DeepStream", icon: <BsNvidia/> }, { name: "OpenCV", icon: <SiOpencv/> }, { name: "Docker", icon: <DiDocker/> }, { name: "Python", icon: <DiPython/> }, { name: "PostgreSQL", icon: <DiPostgresql/> }, { name: "PyTorch", icon: <SiPytorch/> }, { name: "TensorFlow", icon: <SiTensorflow/> }, { name: "Git", icon: <DiGithub/> }, { name: "Linux", icon: <DiLinux/> }, { name: "MediaPipe", icon: <SiMediapipe/> }, { name: "REST API", icon: <UsbIcon/> }, { name: "ERP Integration", icon: <BiBuilding/>}
];
// const allTags = [
//   "InsightFace", "TensorRT", "SCRFD-10G", "ResNet-50", "Triton Server",
//   "Milvus", "ONNX", "DGX A100", "DeepStream", "OpenCV",
//   "Docker", "Python", "PostgreSQL", "PyTorch", "TensorFlow",
//   "Git", "Linux", "MediaPipe", "REST API", "ERP Integration"
// ];

export default function Skills() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <SectionWrapper id="skills" className="relative">
      <div
        className="absolute left-0 top-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,217,255,0.04) 0%, transparent 70%)' }}
      />

      <SectionHeader
        label="// skills"
        title="Technical Arsenal"
        subtitle="A deep stack built for production AI at scale."
      />

      {/* Skill bars grid */}
      <div ref={ref} className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
        {Object.entries(skills).map(([cat, data]) => (
          <SkillCategory key={cat} category={cat} data={data} visible={isVisible} />
        ))}
      </div>

      {/* Tag cloud */}
      <div className="glass rounded-2xl p-6">
        <p className="font-mono text-xs text-slate-600 tracking-widest uppercase mb-4">
          // full stack
        </p>
        {/* <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <span key={tag} className="tech-chip cursor-default">
              {tag}
            </span>
          ))}
        </div> */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <span
              key={tag.name}
              className="tech-chip cursor-default flex items-center gap-1"
            >
              {tag.icon}
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
