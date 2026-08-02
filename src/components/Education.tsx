import React from "react";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2, Sparkles, Briefcase } from "lucide-react";
import { useCMS } from "../context/CMSContext";

export const Education: React.FC = () => {
  const { data } = useCMS();
  const edu = data.education;
  const experiences = data.experiences || [];
  const certificates = data.certificates || [];

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Experience Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education, Experience & Certifications
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Structured computer science education building fundamental problem-solving principles, hands-on experience, and accredited certifications.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l border-white/10 space-y-12">
          {/* Main Education Node */}
          {edu && (
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
                      {edu.degree}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-300">
                      <span className="text-zinc-200 font-bold">{edu.institution}</span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-1">
                    <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      <span>{edu.period}</span>
                    </div>
                    {edu.score && (
                      <span className="text-emerald-400 text-xs font-semibold font-mono">
                        {edu.score}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {edu.description}
                </p>

                {/* Coursework & Achievements Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
                  {/* Academic Highlights / Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>Achievements & Leadership</span>
                      </h4>
                      <div className="space-y-2.5">
                        {edu.achievements.map((ach, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coursework */}
                  {edu.coursework && edu.coursework.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Relevant Coursework</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {edu.coursework.map((course, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-zinc-300 font-medium"
                          >
                            {course}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Technical Focus Badges */}
                {edu.technicalFocus && edu.technicalFocus.length > 0 && (
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                      Core Academic Technical Focus
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {edu.technicalFocus.map((focus, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Work Experiences Nodes */}
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#09090B] border-2 border-blue-500 flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-blue-400" />
              </div>

              <div className="p-6 rounded-3xl bg-[#18181B] border border-white/10 backdrop-blur-xl shadow-xl space-y-4 hover:border-white/20 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-blue-400 font-bold">{exp.role}</span>
                    <h4 className="text-xl font-bold text-white">{exp.company}</h4>
                    <span className="text-xs text-zinc-400">{exp.location}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono w-fit">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{exp.description}</p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {exp.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Certificates Display */}
          {certificates.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Professional Certifications</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-5 rounded-2xl bg-[#18181B] border border-white/10 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="text-sm font-bold text-white">{cert.title}</h5>
                        <p className="text-xs text-emerald-400 font-mono">{cert.issuer}</p>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">{cert.issueDate}</span>
                    </div>
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cert.skills.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-300 font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
