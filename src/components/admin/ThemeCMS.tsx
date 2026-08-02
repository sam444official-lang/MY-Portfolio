import React, { useState } from "react";
import { Palette, Sparkles, Save, Check, Sun, Moon, Sliders } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

const PRESET_ACCENTS = [
  { name: "Emerald Cyber", hex: "#10B981" },
  { name: "Electric Blue", hex: "#3B82F6" },
  { name: "Royal Indigo", hex: "#6366F1" },
  { name: "Purple Neon", hex: "#A855F7" },
  { name: "Rose Crimson", hex: "#F43F5E" },
  { name: "Amber Glow", hex: "#F59E0B" },
  { name: "Teal Matrix", hex: "#14B8A6" },
];

export const ThemeCMS: React.FC = () => {
  const { data, updateData, saveNow } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const theme = data.themeSettings || {
    primaryColor: "#10B981",
    darkMode: true,
    fontFamily: "Inter",
    glassmorphismIntensity: "medium",
    animationSpeed: "normal",
    gridPattern: "dots",
  };

  const handleChange = (field: string, value: any) => {
    updateData((prev) => ({
      ...prev,
      themeSettings: {
        ...prev.themeSettings,
        [field]: value,
      },
    }), `Updated theme setting ${field}`);
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
            <Palette className="w-5 h-5 text-pink-400" />
            <span>Theme & Visual Styling Customizer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pick accent brand colors, glassmorphism backdrop blurs, animation speeds, and background grid patterns.
          </p>
        </div>

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
              <span>Save Theme</span>
            </>
          )}
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-6">
        {/* Color Palette Presets */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Primary Brand Accent Color
          </label>

          <div className="flex flex-wrap gap-3">
            {PRESET_ACCENTS.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                onClick={() => handleChange("primaryColor", preset.hex)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center space-x-2 border transition-all ${
                  theme.primaryColor === preset.hex
                    ? "border-white bg-slate-800 text-white shadow-lg"
                    : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.hex }} />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Glassmorphism Intensity</label>
            <select
              value={theme.glassmorphismIntensity || "medium"}
              onChange={(e) => handleChange("glassmorphismIntensity", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="subtle">Subtle Blur (8px)</option>
              <option value="medium">Medium Glass (16px)</option>
              <option value="heavy">Heavy Frosted Glass (24px)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Motion Animation Speed</label>
            <select
              value={theme.animationSpeed || "normal"}
              onChange={(e) => handleChange("animationSpeed", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="fast">Snappy (0.2s)</option>
              <option value="normal">Normal (0.4s)</option>
              <option value="relaxed">Relaxed Elegance (0.6s)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Background Grid</label>
            <select
              value={theme.gridPattern || "dots"}
              onChange={(e) => handleChange("gridPattern", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="dots">Dotted Cyber Matrix</option>
              <option value="grid">Subtle Grid Lines</option>
              <option value="waves">Glow Orbs Only</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
