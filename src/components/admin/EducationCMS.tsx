import React, { useState } from "react";
import { GraduationCap, Save, Check, Plus, Trash2 } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

export const EducationCMS: React.FC = () => {
  const { data, updateData, saveNow } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const edu = data.education;

  const handleChange = (field: keyof typeof edu, value: any) => {
    updateData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value,
      },
    }), `Updated education ${field}`);
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
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <span>Academic & Education CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Update university background, degree credentials, graduation timeline, coursework, and college achievements.
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
              <span>Save Education</span>
            </>
          )}
        </button>
      </div>

      {/* Main Education Form Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Title</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">College / Institution</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => handleChange("institution", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={edu.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Period / Graduation</label>
            <input
              type="text"
              value={edu.period}
              onChange={(e) => handleChange("period", e.target.value)}
              placeholder="2022 – 2026"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">CGPA / Score Note</label>
            <input
              type="text"
              value={edu.score || ""}
              onChange={(e) => handleChange("score", e.target.value)}
              placeholder="Final Year (Expected May 2026)"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Summary</label>
          <textarea
            rows={2}
            value={edu.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Academic Achievements & Highlights (One per line)
          </label>
          <textarea
            rows={4}
            value={(edu.achievements || []).join("\n")}
            onChange={(e) =>
              handleChange(
                "achievements",
                e.target.value.split("\n").filter(Boolean)
              )
            }
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Core Coursework Subjects (Comma Separated)
          </label>
          <input
            type="text"
            value={(edu.coursework || []).join(", ")}
            onChange={(e) =>
              handleChange(
                "coursework",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};
