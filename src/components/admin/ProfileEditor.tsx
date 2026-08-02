import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Link2, Upload, Save, Check, Sparkles } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

export const ProfileEditor: React.FC = () => {
  const { data, updateData, saveNow, uploadAsset, saveStatus } = useCMS();
  const profile = data.profile;

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (field: keyof typeof profile, value: string) => {
    updateData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }), `Updated profile ${field}`);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setUploading(true);
    const url = await uploadAsset(e.target.files[0]);
    setUploading(false);
    if (url) {
      handleChange("profilePhotoUrl", url);
    }
  };

  const handleSave = async () => {
    const ok = await saveNow();
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <User className="w-5 h-5 text-emerald-400" />
            <span>Profile Editor</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Update personal bio, role headlines, contact info, photo, and availability badge live.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 shrink-0"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved Live!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Profile Photo & Primary Status Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
          Photo & Availability Badge
        </h3>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group shrink-0">
            <img
              src={profile.profilePhotoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xl"
            />
            <label className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center cursor-pointer text-xs text-emerald-400 font-semibold p-2 text-center">
              <Upload className="w-5 h-5 mb-1" />
              <span>{uploading ? "Uploading..." : "Change Photo"}</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status Badge Text</label>
              <input
                type="text"
                value={profile.statusBadge || ""}
                onChange={(e) => handleChange("statusBadge", e.target.value)}
                placeholder="Actively Job Hunting"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Availability Window</label>
              <input
                type="text"
                value={profile.availability || ""}
                onChange={(e) => handleChange("availability", e.target.value)}
                placeholder="Immediate / Summer 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Experience</label>
              <input
                type="text"
                value={profile.yearsExperience || ""}
                onChange={(e) => handleChange("yearsExperience", e.target.value)}
                placeholder="2+ Years (Academic & Projects)"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Portfolio Base URL</label>
              <input
                type="text"
                value={profile.portfolioUrl || ""}
                onChange={(e) => handleChange("portfolioUrl", e.target.value)}
                placeholder="https://sarim-usmani-portfolio.app"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Core Identity Form Grid */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Navbar Logo Text</label>
            <input
              type="text"
              value={profile.headerLogo}
              onChange={(e) => handleChange("headerLogo", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Role Title</label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Specialization</label>
            <input
              type="text"
              value={profile.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Tagline Headline</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => handleChange("tagline", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={profile.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">College / University</label>
            <input
              type="text"
              value={profile.college}
              onChange={(e) => handleChange("college", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Biography Fields */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Biography & Background Story
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Short Bio Summary (1-2 sentences)</label>
          <textarea
            rows={2}
            value={profile.bioShort}
            onChange={(e) => handleChange("bioShort", e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Full About Me Narrative</label>
          <textarea
            rows={5}
            value={profile.bioFull}
            onChange={(e) => handleChange("bioFull", e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};
