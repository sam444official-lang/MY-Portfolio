import React, { useState } from "react";
import { Zap, Plus, Trash2, Save, Check, Layers, Sliders, Palette } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { SkillItem } from "../../types";

const CATEGORIES = ["Frontend", "Backend", "Programming Languages", "Databases", "AI", "Cloud", "DevOps", "Developer Tools"];

export const SkillsCMS: React.FC = () => {
  const { data, updateData, saveNow } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const skills = data.skills || [];

  const handleProgressChange = (index: number, newProgress: number) => {
    updateData((prev) => {
      const updated = [...prev.skills];
      updated[index] = { ...updated[index], progress: newProgress };
      return { ...prev, skills: updated };
    }, `Updated skill progress for ${skills[index]?.name}`);
  };

  const handleFieldChange = (index: number, field: keyof SkillItem, value: any) => {
    updateData((prev) => {
      const updated = [...prev.skills];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, skills: updated };
    }, `Updated skill ${field}`);
  };

  const handleAddSkill = () => {
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: "New Skill",
      level: "Advanced",
      progress: 85,
      category: activeCategory !== "All" ? (activeCategory as any) : "Frontend",
      iconName: "Code2",
      relevantTech: ["TypeScript", "API Integration"],
      description: "Skill mastery description",
      color: "#10B981",
      sortOrder: skills.length + 1,
    };

    updateData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }), "Added new skill");
  };

  const handleDeleteSkill = (index: number) => {
    updateData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }), "Deleted skill");
  };

  const filteredSkills = skills.filter((s) =>
    activeCategory === "All" ? true : s.category === activeCategory
  );

  const handleSave = async () => {
    const ok = await saveNow();
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Skills Matrix CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Categorize tech stack items, adjust percentage sliders, customize colors, and update relevant sub-frameworks.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddSkill}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Skill</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 shrink-0"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Skills</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === "All"
              ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          All Skills ({skills.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = skills.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="space-y-4">
        {filteredSkills.map((skill, index) => {
          const realIndex = skills.findIndex((s) => s === skill);
          return (
            <div
              key={skill.id || index}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md hover:border-slate-700 transition-all space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleFieldChange(realIndex, "name", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={skill.category}
                    onChange={(e: any) => handleFieldChange(realIndex, "category", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Mastery Level
                  </label>
                  <select
                    value={skill.level}
                    onChange={(e: any) => handleFieldChange(realIndex, "level", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Proficient">Proficient</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 justify-end">
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-emerald-400">{skill.progress}%</span>
                    <span className="text-[10px] text-slate-500 block">Proficiency</span>
                  </div>

                  <button
                    onClick={() => handleDeleteSkill(realIndex)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar Slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 text-[11px]">Percentage Slider</span>
                  <span className="font-mono text-emerald-400 text-xs">{skill.progress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.progress}
                  onChange={(e) => handleProgressChange(realIndex, parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Relevant Sub-technologies Tags */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Relevant Sub-Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  value={(skill.relevantTech || []).join(", ")}
                  onChange={(e) =>
                    handleFieldChange(
                      realIndex,
                      "relevantTech",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  placeholder="App Router, Server Components, Custom Hooks"
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
