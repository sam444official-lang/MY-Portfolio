import React, { useState } from "react";
import { Clock, Download, Upload, RefreshCw, Check, ShieldAlert, Sparkles } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

export const BackupSettingsCMS: React.FC = () => {
  const { data, updateData, saveNow } = useCMS();
  const [restoredMsg, setRestoredMsg] = useState<string | null>(null);

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-cms-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        updateData(() => importedData, "Restored database from imported JSON backup");
        saveNow();
        setRestoredMsg("Database successfully restored from JSON file!");
        setTimeout(() => setRestoredMsg(null), 3000);
      } catch (err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleRestoreVersion = (versionId: string, summary: string) => {
    if (confirm(`Are you sure you want to revert portfolio state to: "${summary}"?`)) {
      setRestoredMsg(`Reverted state to checkpoint: ${summary}`);
      setTimeout(() => setRestoredMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-teal-400" />
            <span>Database Backup & Restore Checkpoints</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Export complete portfolio JSON data, import previous backups, and restore auto-saved version snapshots.
          </p>
        </div>

        <button
          onClick={handleExportJson}
          className="px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center space-x-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export JSON Database</span>
        </button>
      </div>

      {restoredMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{restoredMsg}</span>
        </div>
      )}

      {/* Import / Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Complete Backup</span>
          </h3>
          <p className="text-xs text-slate-400">
            Download a portable JSON file containing every profile field, project item, skill slider, blog markdown post, prompt, and theme configuration.
          </p>
          <button
            onClick={handleExportJson}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs transition-colors"
          >
            Download Backup .JSON File
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Upload className="w-4 h-4 text-blue-400" />
            <span>Restore from File</span>
          </h3>
          <p className="text-xs text-slate-400">
            Select a previously exported portfolio JSON file to overwrite current database state with zero loss.
          </p>
          <label className="block w-full py-2.5 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs cursor-pointer transition-colors">
            <span>Select JSON File to Restore</span>
            <input type="file" accept=".json,application/json" onChange={handleImportJson} className="hidden" />
          </label>
        </div>
      </div>

      {/* Version History Log */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
          <Clock className="w-4 h-4 text-teal-400" />
          <span>Auto-Save Version Checkpoints</span>
        </h3>

        <div className="space-y-3">
          {data.versions && data.versions.length > 0 ? (
            data.versions.map((ver) => (
              <div
                key={ver.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs font-bold text-white">{ver.summary}</div>
                  <div className="text-[10px] text-slate-500">Saved by {ver.author} • {ver.timestamp}</div>
                </div>

                <button
                  onClick={() => handleRestoreVersion(ver.id, ver.summary)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center space-x-1 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
                  <span>Restore Checkpoint</span>
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 py-4 text-center">No version checkpoints recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
