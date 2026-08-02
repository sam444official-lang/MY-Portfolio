import React, { useState } from "react";
import { Cpu, Plus, Trash2, Save, Check, Copy, Star, Sparkles } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { PromptItem } from "../../types";

export const PromptLibraryCMS: React.FC = () => {
  const { data, updateData, saveNow } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompts = data.prompts || [];

  const handleAddPrompt = () => {
    const newPrompt: PromptItem = {
      id: `prompt-${Date.now()}`,
      title: "New AI Engineering Prompt",
      promptText: "You are an AI System Prompt. Provide structured response formatted cleanly...",
      category: "AI Systems",
      tags: ["Gemini API", "LLM", "Prompt Engineering"],
      difficulty: "Intermediate",
      isFeatured: false,
      copiedCount: 0,
    };

    updateData((prev) => ({
      ...prev,
      prompts: [...prev.prompts, newPrompt],
    }), "Added AI prompt item");
  };

  const handleFieldChange = (index: number, field: keyof PromptItem, value: any) => {
    updateData((prev) => {
      const updated = [...prev.prompts];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, prompts: updated };
    }, `Updated prompt ${field}`);
  };

  const handleDeletePrompt = (index: number) => {
    updateData((prev) => ({
      ...prev,
      prompts: prev.prompts.filter((_, i) => i !== index),
    }), "Deleted prompt item");
  };

  const handleCopyTest = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span>AI Prompt Library CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Curate reusable AI prompts, system instructions, difficulty tags, and featured prompt badges for visitors.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddPrompt}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Prompt</span>
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
                <span>Save Prompts</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Prompts List */}
      <div className="space-y-4">
        {prompts.map((p, index) => (
          <div
            key={p.id || index}
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {p.category}
                </span>

                <button
                  type="button"
                  onClick={() => handleFieldChange(index, "isFeatured", !p.isFeatured)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 transition-colors ${
                    p.isFeatured
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-slate-800 text-slate-500 border border-slate-700"
                  }`}
                >
                  <Star className="w-3 h-3" />
                  <span>{p.isFeatured ? "Featured Prompt" : "Standard"}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopyTest(p.promptText, p.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{copiedId === p.id ? "Copied!" : "Test Copy"}</span>
                </button>

                <button
                  onClick={() => handleDeletePrompt(index)}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                  title="Delete Prompt"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Prompt Title</label>
                <input
                  type="text"
                  value={p.title}
                  onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label>
                <select
                  value={p.difficulty}
                  onChange={(e: any) => handleFieldChange(index, "difficulty", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Prompt Instruction Text</label>
              <textarea
                rows={4}
                value={p.promptText}
                onChange={(e) => handleFieldChange(index, "promptText", e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
