import React, { useState } from "react";
import { Cpu, Plus, Trash2, Save, Check, Copy, Star, Sparkles, Sliders, Key, Bot, Settings2 } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { PromptItem, AiSettings } from "../../types";

export const PromptLibraryCMS: React.FC = () => {
  const { data, updateData, saveNow } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [aiSavedSuccess, setAiSavedSuccess] = useState(false);
  const [isSavingAi, setIsSavingAi] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompts = data.prompts || [];

  const aiSettings: AiSettings = data.aiSettings || {
    geminiApiKey: "••••••••••••••••••••••••••••",
    openAiApiKey: "",
    defaultModel: "gemini-3.6-flash",
    systemPrompt: "You are an intelligent AI assistant representing Sarim Usmani's portfolio. Provide helpful, accurate responses about Sarim's skills, experience, and capstone projects.",
    temperature: 0.7,
    maxTokens: 2048,
    enableStreaming: true,
    enableAiChat: true,
    enableCodeReview: true,
    enableResumeBuilder: true,
    enablePromptLibrary: true,
  };

  const handleAiSettingChange = (field: keyof AiSettings, value: any) => {
    updateData((prev) => ({
      ...prev,
      aiSettings: {
        ...(prev.aiSettings || aiSettings),
        [field]: value,
      },
    }), `Updated AI Setting: ${field}`);
  };

  const handleSaveAiSettings = async () => {
    setIsSavingAi(true);
    const ok = await saveNow();
    setIsSavingAi(false);
    if (ok) {
      setAiSavedSuccess(true);
      setTimeout(() => setAiSavedSuccess(false), 2500);
    }
  };

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
      prompts: [...(prev.prompts || []), newPrompt],
    }), "Added AI prompt item");
  };

  const handleFieldChange = (index: number, field: keyof PromptItem, value: any) => {
    updateData((prev) => {
      const updated = [...(prev.prompts || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, prompts: updated };
    }, `Updated prompt ${field}`);
  };

  const handleDeletePrompt = (index: number) => {
    updateData((prev) => ({
      ...prev,
      prompts: (prev.prompts || []).filter((_, i) => i !== index),
    }), "Deleted prompt item");
  };

  const handleCopyTest = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSavePrompts = async () => {
    const ok = await saveNow();
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ----------------- AI ENGINE CONFIGURATION CARD ----------------- */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <Settings2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>AI System & LLM Configuration</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  Active
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure API keys, temperature parameters, system prompts, and feature toggles.
              </p>
            </div>
          </div>

          <button
            onClick={handleSaveAiSettings}
            disabled={isSavingAi}
            className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2 shrink-0 cursor-pointer disabled:opacity-50"
          >
            {aiSavedSuccess ? (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>Settings Saved!</span>
              </>
            ) : isSavingAi ? (
              <>
                <Save className="w-4 h-4 animate-spin text-slate-950" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>

        {/* API Keys Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gemini API Key</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Server Key Proxy</span>
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={aiSettings.geminiApiKey || ""}
              onChange={(e) => handleAiSettingChange("geminiApiKey", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-blue-400" />
                <span>OpenAI API Key</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">Optional Fallback</span>
            </label>
            <input
              type="password"
              placeholder="sk-proj-..."
              value={aiSettings.openAiApiKey || ""}
              onChange={(e) => handleAiSettingChange("openAiApiKey", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Model, Temp & Max Tokens */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Default AI Model</label>
            <select
              value={aiSettings.defaultModel || "gemini-3.6-flash"}
              onChange={(e) => handleAiSettingChange("defaultModel", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="gemini-3.6-flash">Gemini 3.6 Flash (Recommended)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
              <option value="gpt-4o">OpenAI GPT-4o</option>
              <option value="gpt-3.5-turbo">OpenAI GPT-3.5 Turbo</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Temperature</span>
              <span className="font-mono text-emerald-400">{aiSettings.temperature ?? 0.7}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={aiSettings.temperature ?? 0.7}
              onChange={(e) => handleAiSettingChange("temperature", parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Max Tokens</label>
            <input
              type="number"
              value={aiSettings.maxTokens ?? 2048}
              onChange={(e) => handleAiSettingChange("maxTokens", parseInt(e.target.value) || 2048)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* System Prompt */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">System Prompt</label>
          <textarea
            rows={3}
            value={aiSettings.systemPrompt || ""}
            onChange={(e) => handleAiSettingChange("systemPrompt", e.target.value)}
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Feature Toggles */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Modules & Feature Toggles</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { key: "enableStreaming", label: "Enable Streaming" },
              { key: "enableAiChat", label: "Enable AI Chat" },
              { key: "enableCodeReview", label: "Enable Code Review" },
              { key: "enableResumeBuilder", label: "Enable Resume Builder" },
              { key: "enablePromptLibrary", label: "Enable Prompt Library" },
            ].map(({ key, label }) => {
              const checked = !!aiSettings[key as keyof AiSettings];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleAiSettingChange(key as keyof AiSettings, !checked)}
                  className={`p-3 rounded-2xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                    checked
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-slate-950 border-slate-800 text-slate-500"
                  }`}
                >
                  <span className="text-[11px] font-semibold">{label}</span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${checked ? "bg-emerald-500 border-emerald-400" : "border-slate-700"}`}>
                    {checked && <Check className="w-2.5 h-2.5 text-slate-950 font-bold" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ----------------- PROMPTS LIBRARY CMS SECTION ----------------- */}
      <div className="space-y-4">
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
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add Prompt</span>
            </button>

            <button
              onClick={handleSavePrompts}
              className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 shrink-0 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
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
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 transition-colors cursor-pointer ${
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
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{copiedId === p.id ? "Copied!" : "Test Copy"}</span>
                  </button>

                  <button
                    onClick={() => handleDeletePrompt(index)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
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
    </div>
  );
};
