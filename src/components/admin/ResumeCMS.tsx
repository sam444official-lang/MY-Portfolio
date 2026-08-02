import React, { useState } from "react";
import { Download, Upload, FileCheck, Star, Trash2, Save, Check, ExternalLink } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { ResumeVersion } from "../../types";

export const ResumeCMS: React.FC = () => {
  const { data, updateData, saveNow, uploadAsset } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const resumes = data.resumes || [];

  const handleSetPrimary = (id: string) => {
    updateData((prev) => ({
      ...prev,
      resumes: prev.resumes.map((r) => ({ ...r, isPrimary: r.id === id })),
    }), `Set resume ${id} as primary default`);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileUrl = await uploadAsset(file);
    setUploading(false);

    if (fileUrl) {
      const newResume: ResumeVersion = {
        id: `res-${Date.now()}`,
        label: file.name.replace(".pdf", ""),
        fileUrl,
        uploadDate: new Date().toISOString().split("T")[0],
        isPrimary: resumes.length === 0,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        downloadCount: 0,
      };

      updateData((prev) => ({
        ...prev,
        resumes: [newResume, ...prev.resumes],
      }), "Uploaded new resume PDF");
    }
  };

  const handleDeleteResume = (id: string) => {
    updateData((prev) => ({
      ...prev,
      resumes: prev.resumes.filter((r) => r.id !== id),
    }), "Deleted resume version");
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
            <Download className="w-5 h-5 text-amber-400" />
            <span>Resume & CV File Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload PDF resumes, manage tailored ATS versions, set primary download targets, and track download analytics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <label className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all flex items-center space-x-1.5 cursor-pointer">
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>{uploading ? "Uploading PDF..." : "Upload New PDF Resume"}</span>
            <input type="file" accept=".pdf,application/pdf" onChange={handleFileUpload} className="hidden" />
          </label>

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
                <span>Save Resumes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resume Versions List */}
      <div className="space-y-4">
        {resumes.map((res) => (
          <div
            key={res.id}
            className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              res.isPrimary
                ? "bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border-amber-500/40 shadow-xl"
                : "bg-slate-900/90 border-slate-800"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-2xl ${res.isPrimary ? "bg-amber-500/20 text-amber-400" : "bg-slate-800 text-slate-400"}`}>
                <FileCheck className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white">{res.label}</h3>
                  {res.isPrimary && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>Primary Default</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Uploaded {res.uploadDate} • Size: {res.fileSize || "1.2 MB"} • Total Downloads: {res.downloadCount || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 w-full md:w-auto justify-end">
              <a
                href={res.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                <span>View PDF</span>
              </a>

              {!res.isPrimary && (
                <button
                  onClick={() => handleSetPrimary(res.id)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold border border-amber-500/30 transition-all"
                >
                  Make Primary
                </button>
              )}

              <button
                onClick={() => handleDeleteResume(res.id)}
                className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                title="Delete Resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
