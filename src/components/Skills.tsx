import React, { useState } from "react";
import {
  Atom,
  Globe,
  FileCode2,
  Palette,
  Layout,
  Server,
  Workflow,
  Flame,
  ArrowLeftRight,
  Database,
  Layers,
  Binary,
  Code,
  Coffee,
  Terminal,
  GitBranch,
  Laptop,
  Send,
  Figma,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { SKILLS_DATA } from "../data/portfolioData";
import { SkillItem } from "../types";

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Programming Languages",
    "Databases",
    "Developer Tools",
  ];

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Atom":
        return <Atom className="w-5 h-5 text-cyan-400" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-emerald-400" />;
      case "FileCode2":
        return <FileCode2 className="w-5 h-5 text-blue-400" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-teal-400" />;
      case "Layout":
        return <Layout className="w-5 h-5 text-indigo-400" />;
      case "Server":
        return <Server className="w-5 h-5 text-emerald-400" />;
      case "Workflow":
        return <Workflow className="w-5 h-5 text-amber-400" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-orange-400" />;
      case "ArrowLeftRight":
        return <ArrowLeftRight className="w-5 h-5 text-violet-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-blue-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-amber-400" />;
      case "Binary":
        return <Binary className="w-5 h-5 text-indigo-400" />;
      case "Code":
        return <Code className="w-5 h-5 text-violet-400" />;
      case "Coffee":
        return <Coffee className="w-5 h-5 text-red-400" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-yellow-400" />;
      case "GitBranch":
        return <GitBranch className="w-5 h-5 text-rose-400" />;
      case "Laptop":
        return <Laptop className="w-5 h-5 text-blue-400" />;
      case "Send":
        return <Send className="w-5 h-5 text-orange-400" />;
      case "Figma":
        return <Figma className="w-5 h-5 text-purple-400" />;
      default:
        return <Zap className="w-5 h-5 text-emerald-400" />;
    }
  };

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory =
      selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.relevantTech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Technical Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Skills & Expertise
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Comprehensive proficiency across full-stack development, modern frameworks, core programming languages, databases, and developer tools.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === category
                  ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group p-6 rounded-3xl bg-[#18181B] hover:bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Top Row: Icon + Name + Level Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                      {getSkillIcon(skill.iconName)}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base group-hover:text-emerald-400 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                      skill.level === "Expert"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : skill.level === "Advanced"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                        : "bg-violet-500/10 text-violet-400 border-violet-500/30"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Proficiency</span>
                    <span className="text-zinc-200 font-bold">{skill.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500 transition-all duration-1000"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>

                {/* Description */}
                {skill.description && (
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {skill.description}
                  </p>
                )}
              </div>

              {/* Technologies / Key Tags */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                {skill.relevantTech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-zinc-300 text-[11px] font-mono group-hover:border-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 p-8 rounded-3xl bg-[#18181B] border border-white/10 text-zinc-400 space-y-2">
            <Sparkles className="w-8 h-8 text-zinc-500 mx-auto" />
            <p className="text-base font-semibold text-white">No matching skills found</p>
            <p className="text-xs text-zinc-500">Try clearing your search query or selecting another category.</p>
          </div>
        )}
      </div>
    </section>
  );
};
