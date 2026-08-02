import React from "react";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import { EDUCATION_DATA } from "../data/portfolioData";

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & Foundation
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Structured computer science education building fundamental problem-solving principles, software engineering methodologies, and web architecture.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l border-white/10 space-y-12">
          {/* Main Education Node */}
          <div className="relative group">
            {/* Pulsing Node Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#09090B] border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Content Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#18181B] border border-white/10 backdrop-blur-xl shadow-2xl space-y-8 hover:border-white/20 transition-all">
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Undergraduate Degree</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-300">
                    <span className="text-zinc-200 font-bold">{EDUCATION_DATA.institution}</span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {EDUCATION_DATA.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-violet-400" />
                    <span>{EDUCATION_DATA.period}</span>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold font-mono">
                    {EDUCATION_DATA.score}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {EDUCATION_DATA.description}
              </p>

              {/* Coursework & Achievements Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
                {/* Academic Highlights / Achievements */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Achievements & Leadership</span>
                  </h4>
                  <div className="space-y-2.5">
                    {EDUCATION_DATA.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coursework */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Relevant Coursework</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {EDUCATION_DATA.coursework.map((course, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-zinc-300 font-medium"
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Focus Badges */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  Core Academic Technical Focus
                </span>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION_DATA.technicalFocus.map((focus, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
