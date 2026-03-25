import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { personalInfo } from '../data/resume';
import emailjs from "@emailjs/browser";

const EMAILJS_TOKEN = import.meta.env.EMAILJS_TOKEN

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "#00D9FF",
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: "#FF6B35",
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: personalInfo.location_url,
    color: "#7B2FBE",
  },
  {
    icon: Github,
    label: "GitHub",
    value: personalInfo.github,
    href: personalInfo.github,
    color: "#e2e8f0",
  },
  {
    icon: ({ size, style }) => (
      <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" style={style}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/mohdzishan",
    href: personalInfo.linkedin,
    color: "#0A66C2",
  },
];

function ContactCard({ item }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
      >
        <Icon size={16} style={{ color: item.color }} />
      </div>
      <div>
        <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-0.5">{item.label}</p>
        <p className="text-sm text-slate-300 group-hover:text-white transition-colors font-body">{item.value}</p>
      </div>
    </a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message too short';
    return e;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errs = validate();
  //   if (Object.keys(errs).length > 0) { setErrors(errs); return; }
  //   // Simulate submission — in production, wire to your backend or Formspree
  //   setSubmitted(true);
  // };

  const handleSubmit = (e) => {
  e.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  // Send email using EmailJS
  emailjs
    .send(
      "portfolio_service",
      "portfolio_template_id",
      {
        user_name: form.name,
        user_email: form.email,
        message: form.message,
      },
      EMAILJS_TOKEN
    )
    .then(
      (result) => {
        console.log(result.text);
        setSubmitted(true);
      },
      (error) => {
        console.error(error.text);
        alert("Failed to send message. Try again.");
      }
    );
};
  return (
    <SectionWrapper id="contact" className="relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,217,255,0.04) 0%, transparent 70%)' }}
      />

      <SectionHeader
        label="// contact"
        title="Let's Build Something"
        subtitle="Open to full-time roles, consulting, and collaborations in computer vision and AI systems."
      />

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: contact cards */}
        <div>
          <p className="text-slate-400 text-base font-body leading-relaxed mb-8">
            Whether you're looking for someone to architect a vision pipeline, optimize inference at scale,
            or bring AI systems from prototype to production — I'd love to hear from you.
          </p>

          <div className="space-y-3">
            {contactLinks.map((item) => (
              <ContactCard key={item.label} item={item} />
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div>
          {submitted ? (
            <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Message Sent!</h3>
              <p className="text-slate-400 font-body text-sm">Thanks for reaching out. I'll get back to you shortly.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                className="mt-4 px-6 py-2 text-sm font-mono text-[#00D9FF] border border-[#00D9FF]/30 rounded hover:bg-[#00D9FF]/10 transition-all"
              >
                Send another
              </button>
            </div>
          ) : (
            <div className="glass rounded-2xl p-7 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, #00D9FF, #7B2FBE, transparent)' }}
              />

              <p className="font-mono text-xs text-slate-600 tracking-widest uppercase mb-6">// send a message</p>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block font-mono text-xs text-slate-500 mb-1.5 tracking-wide">name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#00D9FF]/50 rounded-lg px-4 py-3 text-sm text-white font-body outline-none transition-colors placeholder:text-slate-700"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-xs text-slate-500 mb-1.5 tracking-wide">email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#00D9FF]/50 rounded-lg px-4 py-3 text-sm text-white font-body outline-none transition-colors placeholder:text-slate-700"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-xs text-slate-500 mb-1.5 tracking-wide">message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 focus:border-[#00D9FF]/50 rounded-lg px-4 py-3 text-sm text-white font-body outline-none transition-colors resize-none placeholder:text-slate-700"
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#00D9FF] text-[#050509] font-display font-bold rounded-lg hover:bg-white hover:shadow-[0_0_30px_rgba(0,217,255,0.3)] transition-all duration-300 text-sm tracking-wide"
                >
                  <Send size={15} />
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
