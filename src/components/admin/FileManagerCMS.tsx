import React, { useState } from "react";
import { HardDrive, Upload, Copy, Check, ExternalLink, Image, FileText } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

export const FileManagerCMS: React.FC = () => {
  const { uploadAsset } = useCMS();
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string; size: string; type: string }[]>([
    {
      name: "sarim-profile-photo.jpg",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
      size: "245 KB",
      type: "image",
    },
    {
      name: "Sarim_Usmani_Software_Engineer_Resume.pdf",
      url: "/assets/Sarim_Usmani_Resume.pdf",
      size: "1.12 MB",
      type: "pdf",
    },
  ]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setUploading(true);
    const url = await uploadAsset(file);
    setUploading(false);

    if (url) {
      setUploadedFiles((prev) => [
        {
          name: file.name,
          url,
          size: `${(file.size / 1024).toFixed(0)} KB`,
          type: file.type.includes("pdf") ? "pdf" : "image",
        },
        ...prev,
      ]);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <HardDrive className="w-5 h-5 text-emerald-400" />
            <span>Media & Asset Storage Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload images, project screenshots, PDF resumes, and get CDN URLs for instant use in any CMS section.
          </p>
        </div>

        <label className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          <span>{uploading ? "Uploading..." : "Upload New Asset"}</span>
          <input type="file" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {uploadedFiles.map((file, idx) => (
          <div key={idx} className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-3 rounded-2xl bg-slate-800 text-emerald-400 shrink-0">
                {file.type === "pdf" ? <FileText className="w-5 h-5" /> : <Image className="w-5 h-5" />}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-white truncate">{file.name}</div>
                <div className="text-xs text-slate-500 font-mono">{file.size}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleCopy(file.url)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>{copiedUrl === file.url ? "Copied URL!" : "Copy URL"}</span>
              </button>

              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="View Asset"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
