import React from "react";
import {
  Puzzle,
  Zap,
  Users,
  Compass,
  BrainCircuit,
  MessageSquare,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useCMS } from "../context/CMSContext";

export const SoftSkills: React.FC = () => {
  const { data } = useCMS();
  const softSkills = data.softSkills || [];

  const getSoftSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Puzzle":
        return <Puzzle className="w-6 h-6 text-emerald-400" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-amber-400" />;
      case "Users":
        return <Users className="w-6 h-6 text-blue-400" />;
      case "Compass":
        return <Compass className="w-6 h-6 text-violet-400" />;
      case "BrainCircuit":
        return <BrainCircuit className="w-6 h-6 text-teal-400" />;
      case "MessageSquare":
        return <MessageSquare className="w-6 h-6 text-rose-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Professional Mindset</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Soft Skills & Collaboration
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Engineering excellence requires more than syntax—it demands effective communication, adaptability, and product discipline.
          </p>
        </div>

        {/* Soft Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softSkills.map((skill) => (
            <div
              key={skill.id}
              className="group p-6 rounded-3xl bg-[#18181B] hover:bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="p-3 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                  {getSoftSkillIcon(skill.iconName)}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {skill.title}
                </h3>

                <p className="text-zinc-300 text-xs leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Practical Example Badge */}
              <div className="pt-3 border-t border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Real-World Application</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  {skill.examples}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
