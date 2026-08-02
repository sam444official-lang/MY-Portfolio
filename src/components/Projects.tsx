import React, { useState } from "react";
import {
  ArrowUpRight,
  Github,
  Sparkles,
  Zap,
  Code2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Layers,
  Wrench,
  TrendingUp,
  X,
  Play,
  Cpu,
} from "lucide-react";
import { FEATURED_PROJECT, ADDITIONAL_PROJECTS } from "../data/portfolioData";
import { Project } from "../types";
import { EcoTrackDemo } from "./EcoTrackDemo";

export const Projects: React.FC = () => {
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);
  const [showSandbox, setShowSandbox] = useState<boolean>(true);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-16">
        {/* Section Title Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            <span>Featured Portfolio Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Projects & Engineering
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Full-stack web applications engineered with production-ready code, modern SaaS design patterns, and Generative AI capabilities.
          </p>
        </div>

        {/* FLAGSHIP FEATURED PROJECT: EcoTrack India */}
        <div className="relative rounded-3xl bg-[#18181B] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden p-6 md:p-10 space-y-8">
          {/* Top Flagship Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship Capstone Project</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {FEATURED_PROJECT.title}
              </h3>
              <p className="text-emerald-400 font-semibold text-base">
                {FEATURED_PROJECT.subtitle}
              </p>
              <p className="text-zinc-300 text-sm leading-relaxed pt-1">
                {FEATURED_PROJECT.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowSandbox(!showSandbox)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{showSandbox ? "Hide Live Sandbox" : "Launch Live Sandbox"}</span>
              </button>

              <a
                href={FEATURED_PROJECT.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>

              <button
                onClick={() => setSelectedProjectModal(FEATURED_PROJECT)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold text-xs transition-all cursor-pointer"
              >
                <span>Project Architecture</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Key Stats Bar */}
          {FEATURED_PROJECT.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {FEATURED_PROJECT.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="text-xs text-zinc-400 font-mono">{stat.label}</div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">{stat.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Badges */}
          <div className="space-y-2">
            <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider font-semibold">
              Technologies & Frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {FEATURED_PROJECT.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-200 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Embedded Interactive Live Sandbox */}
          {showSandbox && (
            <div className="pt-4">
              <EcoTrackDemo />
            </div>
          )}
        </div>

        {/* ADDITIONAL PROJECTS GRID */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>More Full-Stack & AI Projects</span>
              <span className="text-xs text-emerald-400 font-mono font-normal">({ADDITIONAL_PROJECTS.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ADDITIONAL_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group p-6 rounded-3xl bg-[#18181B] hover:bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon + Title */}
                  <div className="space-y-2">
                    <div className="p-3 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                      <Cpu className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-400/90 font-mono">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    {project.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Tech Stack + Details Trigger */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProjectModal(project)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Details & Challenges</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#18181B] border border-white/15 p-6 md:p-8 space-y-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                  Full Project Specifications
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight mt-2">
                  {selectedProjectModal.title}
                </h3>
                <p className="text-xs text-zinc-400">{selectedProjectModal.subtitle}</p>
              </div>

              <button
                onClick={() => setSelectedProjectModal(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Architecture Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Architecture & System Design</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                {selectedProjectModal.architectureOverview}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>Key Features</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProjectModal.features.map((feat, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges Solved */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-4 h-4" />
                <span>Engineering Challenges Solved</span>
              </h4>
              <div className="space-y-2">
                {selectedProjectModal.challengesSolved.map((chal, i) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-zinc-300">
                    • {chal}
                  </div>
                ))}
              </div>
            </div>

            {/* Future Improvements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>Future Technical Roadmap</span>
              </h4>
              <div className="space-y-2">
                {selectedProjectModal.futureImprovements.map((imp, i) => (
                  <div key={i} className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/10 text-xs text-zinc-300">
                    • {imp}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              {selectedProjectModal.githubUrl && (
                <a
                  href={selectedProjectModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View GitHub Code</span>
                </a>
              )}
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold"
              >
                Close Specifications
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
