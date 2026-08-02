import React from "react";
import { Code2, Cpu, GraduationCap, GitBranch, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useCMS } from "../context/CMSContext";

interface AboutProps {
  onOpenSchedule: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenSchedule }) => {
  const { data } = useCMS();
  const profile = data.profile;
  const statistics = data.statistics || [];

  const getIcon = (name: string) => {
    switch (name) {
      case "Code2":
        return <Code2 className="w-6 h-6 text-emerald-400" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-blue-400" />;
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-violet-400" />;
      case "GitBranch":
        return <GitBranch className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-emerald-400" />;
    }
  };

  const highlights = [
    {
      title: "Academic Background",
      description: `${profile.title} at ${profile.college} (${profile.graduationYear}). Focus on Data Structures, Algorithms, DBMS, and Web Architecture.`,
    },
    {
      title: "Full-Stack Development",
      description: "Practitioner of modern React, Next.js, and TypeScript, building full-stack platforms backed by Express, Node.js, and Firebase.",
    },
    {
      title: "Generative AI Integration",
      description: "Integrating LLMs and Gemini APIs into production tools—from OCR scanning to intelligent search and automated workflows.",
    },
    {
      title: "Engineering Mindset",
      description: "Dedicated to type-safe TypeScript, robust software architecture, clean code quality, and responsive UI/UX.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Subtle Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering modern web experiences with passion & purpose.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Bridging technical rigor with creative product design. Here is a look at my background and technical foundation.
          </p>
        </div>

        {/* Narrative & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-[#18181B] border border-white/10 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent blur-2xl pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Hi, I'm {profile.name} 👋
              </h3>

              <p className="text-zinc-300 text-base leading-relaxed whitespace-pre-line">
                {profile.bioFull || profile.bioShort}
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    SU
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{profile.name}</p>
                    <p className="text-zinc-400 text-xs">{profile.college} • {profile.location}</p>
                  </div>
                </div>

                <button
                  onClick={onOpenSchedule}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-medium hover:border-emerald-500/30 transition-all cursor-pointer"
                >
                  <span>Connect With {profile.name.split(" ")[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed pl-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Statistics Glass Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Key Profile Highlights</span>
              <span className="text-xs text-emerald-400 font-mono font-normal">({profile.graduationYear})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {statistics.map((card) => (
                <div
                  key={card.id}
                  className="group relative p-6 rounded-3xl bg-[#18181B] hover:bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                      {getIcon(card.iconName)}
                    </div>
                    {card.trend && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                        {card.trend}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                      {card.value}
                    </div>
                    <div className="text-xs font-semibold text-zinc-300">{card.label}</div>
                    <div className="text-xs text-zinc-400">{card.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
