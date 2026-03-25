import { Brain, Cpu, Camera, Database } from 'lucide-react';
import SectionWrapper, { SectionHeader } from './SectionWrapper';

const pillars = [
  {
    icon: Camera,
    title: "Vision Systems",
    description: "End-to-end facial recognition pipelines from camera ingestion to ERP reporting — production-tested across 20+ concurrent streams.",
    color: "#00D9FF",
  },
  {
    icon: Cpu,
    title: "Inference Optimization",
    description: "TensorRT FP16 quantization on NVIDIA DGX A100, delivering real-time throughput with sub-100ms latency at scale.",
    color: "#FF6B35",
  },
  {
    icon: Database,
    title: "Vector Search at Scale",
    description: "Milvus vector databases architected for 24,000+ face embeddings with sub-second similarity search under concurrent load.",
    color: "#7B2FBE",
  },
  {
    icon: Brain,
    title: "Deep Learning",
    description: "SCRFD-10G detection + ResNet-50 embeddings — model selection, training, and optimization for real-world uncontrolled environments.",
    color: "#22d3ee",
  },
];

export default function About() {
  return (
    <SectionWrapper id="about" className="relative">
      <div
        className="absolute right-0 top-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,107,53,0.04) 0%, transparent 70%)' }}
      />

      <SectionHeader
        label="// about"
        title="Building AI that works in the real world."
      />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Text */}
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed font-body">
            I'm a <span className="text-[#00D9FF]">Computer Vision Engineer</span> with 2+ years of hands-on experience designing and shipping production-grade AI systems — not demos, but systems that process thousands of faces daily in unpredictable, real-world environments.
          </p>
          <p className="text-slate-400 leading-relaxed font-body">
            Currently at <span className="text-white font-medium">Global Infoventures Pvt. Ltd.</span>, I lead the development of facial recognition attendance infrastructure used across university campuses — achieving 98% accuracy on over 24,000 enrolled faces across CCTV gate cameras, PTZ classroom setups, and instructor mobile apps.
          </p>
          <p className="text-slate-400 leading-relaxed font-body">
            My stack is deep: from SCRFD and ResNet-50 embedding models to TensorRT optimization on NVIDIA DGX A100, Triton Inference Server orchestration, Milvus vector search, and Docker-containerized microservice deployment integrated with institutional ERP systems.
          </p>

          {/* Phone / email quick line */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="mailto:saifizeeshan895@gmail.com"
              className="font-mono text-sm text-[#00D9FF] hover:text-white transition-colors"
            >
              saifizeeshan895@gmail.com
            </a>
            <span className="text-slate-700">·</span>
            <a
              href="tel:+918194015009"
              className="font-mono text-sm text-slate-400 hover:text-[#00D9FF] transition-colors"
            >
              +91 8194015009
            </a>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="glass glass-hover rounded-2xl p-6 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                >
                  <Icon size={18} style={{ color: p.color }} />
                </div>
                <h3
                  className="font-display font-bold text-sm mb-2"
                  style={{ color: p.color }}
                >
                  {p.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-body">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
