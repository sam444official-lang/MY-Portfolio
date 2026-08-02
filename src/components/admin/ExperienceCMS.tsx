import React, { useState } from "react";
import { Briefcase, Plus, Trash2, Save, Check, Upload, Calendar, MapPin } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { ExperienceEntry } from "../../types";

export const ExperienceCMS: React.FC = () => {
  const { data, updateData, saveNow, uploadAsset } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const experiences = data.experiences || [];

  const handleAddExperience = () => {
    const newExp: ExperienceEntry = {
      id: `exp-${Date.now()}`,
      company: "Company / Organization Name",
      role: "Software Engineering Intern",
      location: "Mumbai, India",
      startDate: "Jan 2025",
      endDate: "Present",
      isCurrent: true,
      description: "Spearheaded full-stack web features, managed REST endpoints, and collaborated with cross-functional development teams.",
      achievements: [
        "Delivered zero-downtime deployment pipelines.",
        "Engineered responsive user interfaces with Next.js and TypeScript.",
      ],
      companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    };

    updateData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }), "Added work experience entry");
  };

  const handleFieldChange = (index: number, field: keyof ExperienceEntry, value: any) => {
    updateData((prev) => {
      const updated = [...prev.experiences];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experiences: updated };
    }, `Updated experience ${field}`);
  };

  const handleDeleteExperience = (index: number) => {
    updateData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }), "Deleted work experience entry");
  };

  const handleLogoUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const url = await uploadAsset(e.target.files[0]);
    if (url) {
      handleFieldChange(index, "companyLogo", url);
    }
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
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span>Work & Internship Experience</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            CRUD management for professional positions, roles, company logos, achievements, and current job status toggles.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddExperience}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Position</span>
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
                <span>Save Experience</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={exp.id || index}
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={exp.companyLogo || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80"}
                  alt={exp.company}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{exp.role}</h3>
                  <span className="text-xs text-emerald-400 font-medium">{exp.company}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={exp.isCurrent}
                    onChange={(e) => handleFieldChange(index, "isCurrent", e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0"
                  />
                  <span>Current Position</span>
                </label>

                <button
                  onClick={() => handleDeleteExperience(index)}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                  title="Delete Position"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleFieldChange(index, "company", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role Title</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleFieldChange(index, "role", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleFieldChange(index, "location", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleFieldChange(index, "startDate", e.target.value)}
                  placeholder="Aug 2024"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleFieldChange(index, "endDate", e.target.value)}
                  placeholder="Present"
                  disabled={exp.isCurrent}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company Logo Upload</label>
                <label className="w-full py-2 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs flex items-center justify-between cursor-pointer hover:border-slate-700">
                  <span>Upload Logo File</span>
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(index, e)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role Description</label>
              <textarea
                rows={2}
                value={exp.description}
                onChange={(e) => handleFieldChange(index, "description", e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Key Achievements (One per line)
              </label>
              <textarea
                rows={3}
                value={(exp.achievements || []).join("\n")}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "achievements",
                    e.target.value.split("\n").filter(Boolean)
                  )
                }
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
