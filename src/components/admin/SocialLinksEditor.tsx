import React, { useState } from "react";
import { Share2, Save, Plus, Trash2, Check, Eye, EyeOff, Globe } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { SocialLink } from "../../types";

export const SocialLinksEditor: React.FC = () => {
  const { data, updateData, saveNow } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const links = data.socialLinks || [];

  const handleToggleLink = (id: string) => {
    updateData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) =>
        link.id === id ? { ...link, enabled: !link.enabled } : link
      ),
    }), `Toggled social link ${id}`);
  };

  const handleUrlChange = (id: string, newUrl: string) => {
    updateData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) =>
        link.id === id ? { ...link, url: newUrl } : link
      ),
    }), `Updated social link URL for ${id}`);
  };

  const handleAddCustomLink = () => {
    const newLink: SocialLink = {
      id: `soc-custom-${Date.now()}`,
      platform: "Custom Link",
      url: "https://example.com",
      iconName: "Globe",
      enabled: true,
      customLabel: "My Custom Social",
    };

    updateData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLink],
    }), "Added custom social link");
  };

  const handleDeleteLink = (id: string) => {
    updateData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((l) => l.id !== id),
    }), `Deleted social link ${id}`);
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
            <Share2 className="w-5 h-5 text-blue-400" />
            <span>Social Links & Profiles</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Enable, disable, or edit URLs for developer profiles (GitHub, LeetCode, Codeforces, LinkedIn, WhatsApp, etc.).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddCustomLink}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Custom Link</span>
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
                <span>Save Links</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* List of Social Links */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3">
        {links.map((link) => (
          <div
            key={link.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              link.enabled
                ? "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                : "bg-slate-950/30 border-slate-900/50 opacity-60"
            }`}
          >
            <div className="flex items-center space-x-3 shrink-0">
              <button
                type="button"
                onClick={() => handleToggleLink(link.id)}
                className={`p-2 rounded-xl transition-all ${
                  link.enabled
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-800 text-slate-500 border border-slate-700"
                }`}
                title={link.enabled ? "Enabled - Click to disable" : "Disabled - Click to enable"}
              >
                {link.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <div>
                <span className="text-sm font-bold text-white block">
                  {link.platform} {link.customLabel ? `(${link.customLabel})` : ""}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {link.enabled ? "Visible on Portfolio" : "Hidden"}
                </span>
              </div>
            </div>

            <div className="flex-1 w-full md:w-auto">
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleUrlChange(link.id, e.target.value)}
                placeholder={`https://${link.platform.toLowerCase()}.com/username`}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            {link.id.startsWith("soc-custom-") && (
              <button
                type="button"
                onClick={() => handleDeleteLink(link.id)}
                className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors shrink-0"
                title="Delete Link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
