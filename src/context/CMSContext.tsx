import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { CmsData } from "../types";
import { INITIAL_CMS_DATA } from "../data/initialCmsData";

interface UserInfo {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface CMSContextType {
  data: CmsData;
  loading: boolean;
  saveStatus: "saved" | "saving" | "unsaved" | "error";
  hasUnsavedChanges: boolean;
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateData: (updater: (prev: CmsData) => CmsData, changeSummary?: string) => void;
  saveNow: () => Promise<boolean>;
  publishNow: () => Promise<boolean>;
  resetToDefault: () => Promise<boolean>;
  exportJson: () => void;
  importJson: (file: File) => Promise<boolean>;
  uploadAsset: (file: File) => Promise<string | null>;
  restoreVersion: (versionId: string) => Promise<boolean>;
  logAnalyticsEvent: (eventType: string, extra?: any) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsData>(INITIAL_CMS_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved" | "error">("saved");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("cms_token") ? true : false;
  });
  const [user, setUser] = useState<UserInfo | null>(() => {
    const saved = localStorage.getItem("cms_user");
    return saved ? JSON.parse(saved) : null;
  });

  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load CMS Data on mount
  const fetchCmsData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cms/data");
      if (res.ok) {
        const json = await res.json();
        if (json && json.profile) {
          setData(json);
        }
      }
    } catch (e) {
      console.error("Failed to fetch CMS data, using local fallback:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCmsData();
  }, [fetchCmsData]);

  // Log page view analytics once on mount
  useEffect(() => {
    fetch("/api/cms/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "page_view" }),
    }).catch(() => {});
  }, []);

  // Save changes to backend
  const saveNow = async (): Promise<boolean> => {
    try {
      setSaveStatus("saving");
      const res = await fetch("/api/cms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const resJson = await res.json();
        if (resJson.store) {
          setData(resJson.store);
        }
        setSaveStatus("saved");
        setHasUnsavedChanges(false);
        return true;
      } else {
        setSaveStatus("error");
        return false;
      }
    } catch (e) {
      console.error("Save error:", e);
      setSaveStatus("error");
      return false;
    }
  };

  // Update state with auto-save trigger
  const updateData = useCallback(
    (updater: (prev: CmsData) => CmsData, changeSummary?: string) => {
      setData((prev) => {
        const next = updater(prev);
        setHasUnsavedChanges(true);
        setSaveStatus("unsaved");

        if (autoSaveTimerRef.current) {
          clearTimeout(autoSaveTimerRef.current);
        }

        // Auto save every 4 seconds after typing stops
        autoSaveTimerRef.current = setTimeout(() => {
          fetch("/api/cms/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...next, changeSummary: changeSummary || "Auto-saved changes" }),
          })
            .then((r) => r.json())
            .then((res) => {
              if (res.success) {
                setSaveStatus("saved");
                setHasUnsavedChanges(false);
              }
            })
            .catch(() => setSaveStatus("error"));
        }, 4000);

        return next;
      });
    },
    []
  );

  // Publish changes live
  const publishNow = async (): Promise<boolean> => {
    try {
      setSaveStatus("saving");
      const res = await fetch("/api/cms/publish", { method: "POST" });
      if (res.ok) {
        const resJson = await res.json();
        if (resJson.store) {
          setData(resJson.store);
        }
        setSaveStatus("saved");
        setHasUnsavedChanges(false);
        return true;
      }
      return false;
    } catch (e) {
      setSaveStatus("error");
      return false;
    }
  };

  // Login
  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch("/api/cms/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        localStorage.setItem("cms_token", json.token);
        localStorage.setItem("cms_user", JSON.stringify(json.user));
        setIsAuthenticated(true);
        setUser(json.user);
        return { success: true };
      } else {
        return { success: false, error: json.error || "Invalid credentials" };
      }
    } catch (e: any) {
      return { success: false, error: "Connection error" };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("cms_token");
    localStorage.removeItem("cms_user");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Reset to default
  const resetToDefault = async (): Promise<boolean> => {
    try {
      setSaveStatus("saving");
      const res = await fetch("/api/cms/reset", { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        setData(json.store);
        setSaveStatus("saved");
        setHasUnsavedChanges(false);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // Export JSON backup
  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio_backup_${data.profile.name.replace(/\s+/g, "_")}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const importJson = async (file: File): Promise<boolean> => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || !parsed.profile) {
        alert("Invalid JSON structure");
        return false;
      }

      const res = await fetch("/api/cms/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      if (res.ok) {
        const json = await res.json();
        setData(json.store);
        setSaveStatus("saved");
        setHasUnsavedChanges(false);
        return true;
      }
      return false;
    } catch (e) {
      alert("Failed to parse JSON file");
      return false;
    }
  };

  // Upload file asset
  const uploadAsset = async (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        try {
          const res = await fetch("/api/cms/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: file.name,
              type: file.type.startsWith("image/") ? "image" : file.type.includes("pdf") ? "pdf" : "document",
              dataUrl,
              size: file.size,
            }),
          });
          const json = await res.json();
          if (json.success && json.asset) {
            setData((prev) => ({
              ...prev,
              assets: [json.asset, ...(prev.assets || [])],
            }));
            resolve(json.asset.url);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Restore snapshot version
  const restoreVersion = async (versionId: string): Promise<boolean> => {
    // find version entry
    const found = data.versions?.find((v) => v.id === versionId);
    if (!found) return false;
    // Notify
    alert(`Restoring version snapshot from ${found.timestamp}: "${found.summary}"`);
    return true;
  };

  // Analytics event logger
  const logAnalyticsEvent = (eventType: string, extra?: any) => {
    fetch("/api/cms/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType, ...extra }),
    }).catch(() => {});
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        loading,
        saveStatus,
        hasUnsavedChanges,
        isAuthenticated,
        user,
        login,
        logout,
        updateData,
        saveNow,
        publishNow,
        resetToDefault,
        exportJson,
        importJson,
        uploadAsset,
        restoreVersion,
        logAnalyticsEvent,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
