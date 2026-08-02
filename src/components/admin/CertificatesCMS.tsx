import React, { useState } from "react";
import { Award, Plus, Trash2, Save, Check, ExternalLink } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { CertificateEntry } from "../../types";

export const CertificatesCMS: React.FC = () => {
  const { data, updateData, saveNow } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const certificates = data.certificates || [];

  const handleAddCertificate = () => {
    const newCert: CertificateEntry = {
      id: `cert-${Date.now()}`,
      title: "New Professional Certification",
      issuer: "Google Cloud / Meta",
      issueDate: "Feb 2026",
      credentialUrl: "https://example.com/verify",
      credentialId: "CERT-2026-9901",
      skills: ["React", "TypeScript", "Cloud APIs"],
    };

    updateData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, newCert],
    }), "Added certificate");
  };

  const handleFieldChange = (index: number, field: keyof CertificateEntry, value: any) => {
    updateData((prev) => {
      const updated = [...prev.certificates];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, certificates: updated };
    }, `Updated certificate ${field}`);
  };

  const handleDeleteCertificate = (index: number) => {
    updateData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }), "Deleted certificate");
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
            <Award className="w-5 h-5 text-amber-400" />
            <span>Certificates & Credentials CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage professional tech certifications, verification badges, credential IDs, and issuer links.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddCertificate}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Certificate</span>
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
                <span>Save Certs</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Certificates List */}
      <div className="space-y-4">
        {certificates.map((cert, index) => (
          <div
            key={cert.id || index}
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                  <span className="text-xs text-slate-400">{cert.issuer} • {cert.issueDate}</span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteCertificate(index)}
                className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                title="Delete Certificate"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Certification Title</label>
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Issuer / Platform</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleFieldChange(index, "issuer", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Issue Date</label>
                <input
                  type="text"
                  value={cert.issueDate}
                  onChange={(e) => handleFieldChange(index, "issueDate", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Verification / Credential URL</label>
                <input
                  type="url"
                  value={cert.credentialUrl || ""}
                  onChange={(e) => handleFieldChange(index, "credentialUrl", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skills Covered (Comma Separated)</label>
                <input
                  type="text"
                  value={(cert.skills || []).join(", ")}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "skills",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
