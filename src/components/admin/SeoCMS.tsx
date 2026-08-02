import React, { useState } from "react";
import { Globe, Save, Check, Upload, Search, Share2 } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

export const SeoCMS: React.FC = () => {
  const { data, updateData, saveNow, uploadAsset } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const seo = data.seoSettings || {
    siteTitle: "Sarim Usmani — Portfolio",
    metaDescription: "Full-Stack Software Engineer & AI Systems Developer Portfolio.",
    keywords: ["Sarim Usmani", "Software Engineer", "Full Stack", "React", "TypeScript"],
    ogImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    twitterHandle: "@sarim_usmani",
    canonicalUrl: "https://sarim-usmani-portfolio.app",
  };

  const handleChange = (field: string, value: any) => {
    updateData((prev) => ({
      ...prev,
      seoSettings: {
        ...prev.seoSettings,
        [field]: value,
      },
    }), `Updated SEO setting ${field}`);
  };

  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const url = await uploadAsset(e.target.files[0]);
    if (url) {
      handleChange("ogImageUrl", url);
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
            <Globe className="w-5 h-5 text-blue-400" />
            <span>SEO & Social Sharing Customizer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Optimize search engine meta tags, OpenGraph social card previews, Twitter handles, and indexing keywords.
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
              <span>Save SEO Settings</span>
            </>
          )}
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Page Meta Title</label>
            <input
              type="text"
              value={seo.siteTitle}
              onChange={(e) => handleChange("siteTitle", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Canonical Site URL</label>
            <input
              type="text"
              value={seo.canonicalUrl || ""}
              onChange={(e) => handleChange("canonicalUrl", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Meta Description (150-160 characters)</label>
          <textarea
            rows={3}
            value={seo.metaDescription}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            SEO Indexing Keywords (Comma Separated)
          </label>
          <input
            type="text"
            value={Array.isArray(seo.keywords) ? seo.keywords.join(", ") : (seo.keywords || "")}
            onChange={(e) =>
              handleChange(
                "keywords",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Twitter / X Creator Handle</label>
            <input
              type="text"
              value={seo.twitterHandle || ""}
              onChange={(e) => handleChange("twitterHandle", e.target.value)}
              placeholder="@sarim_usmani"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">OpenGraph Social Banner Image</label>
            <label className="w-full py-2 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs flex items-center justify-between cursor-pointer hover:border-slate-700">
              <span className="truncate">{seo.ogImageUrl ? "Custom Image Uploaded" : "Upload Banner Image"}</span>
              <Upload className="w-4 h-4 text-emerald-400 shrink-0" />
              <input type="file" accept="image/*" onChange={handleOgImageUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
