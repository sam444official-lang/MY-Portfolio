import React, { useState } from "react";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Zap,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Cpu,
  Download,
  Share2,
  Mail,
  Palette,
  Globe,
  TrendingUp,
  Clock,
  HardDrive,
  LogOut,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";

import { DashboardOverview } from "./DashboardOverview";
import { ProfileEditor } from "./ProfileEditor";
import { ProjectsCMS } from "./ProjectsCMS";
import { SkillsCMS } from "./SkillsCMS";
import { ExperienceCMS } from "./ExperienceCMS";
import { EducationCMS } from "./EducationCMS";
import { CertificatesCMS } from "./CertificatesCMS";
import { BlogCMS } from "./BlogCMS";
import { PromptLibraryCMS } from "./PromptLibraryCMS";
import { ResumeCMS } from "./ResumeCMS";
import { SocialLinksEditor } from "./SocialLinksEditor";
import { ContactInfoCMS } from "./ContactInfoCMS";
import { ThemeCMS } from "./ThemeCMS";
import { SeoCMS } from "./SeoCMS";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { FileManagerCMS } from "./FileManagerCMS";
import { BackupSettingsCMS } from "./BackupSettingsCMS";

interface AdminLayoutProps {
  onCloseAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onCloseAdmin }) => {
  const { data, logout, publishNow, saveStatus } = useCMS();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: User },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "skills", label: "Skills Matrix", icon: Zap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "blogs", label: "Blogs & Articles", icon: FileText },
    { id: "prompts", label: "AI Prompts", icon: Cpu },
    { id: "resume", label: "Resume PDF", icon: Download },
    { id: "socials", label: "Social Links", icon: Share2 },
    { id: "contact", label: "Contact Info", icon: Mail },
    { id: "theme", label: "Theme Settings", icon: Palette },
    { id: "seo", label: "SEO Settings", icon: Globe },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "files", label: "Media Storage", icon: HardDrive },
    { id: "backup", label: "Backup & Restore", icon: Clock },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[90] flex bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Left Navigation Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto p-4 space-y-6">
          {/* Sidebar Top Branding */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20 font-black text-sm">
                SU
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight">CMS Dashboard</h2>
                <p className="text-[10px] text-emerald-400 font-mono">v2.4.0 • Production</p>
              </div>
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="space-y-1 flex-1">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3 mb-2">
              Content Sections
            </div>

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all group ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-md"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </nav>

          {/* User Profile & Logout Bottom Box */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src={data.profile.profilePhotoUrl}
                  alt={data.profile.name}
                  className="w-8 h-8 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <div className="text-xs font-bold text-white truncate max-w-[100px]">{data.profile.name}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Owner Admin</div>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Logout from Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        {/* Top Header Navigation Bar */}
        <header className="h-16 px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center space-x-2 text-xs">
              <span className="text-slate-500">Portfolio CMS</span>
              <span className="text-slate-600">/</span>
              <span className="text-emerald-400 font-bold capitalize">{activeTab} Editor</span>
            </div>
          </div>

          {/* Top Bar Action Badges */}
          <div className="flex items-center space-x-3">
            {/* Save Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono">
              {saveStatus === "saving" && (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-amber-400">Autosaving changes...</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">All Changes Saved Live</span>
                </>
              )}
              {saveStatus === "unsaved" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-slate-400">Unsaved edits pending</span>
                </>
              )}
            </div>

            {/* View Live Portfolio Button */}
            <button
              onClick={onCloseAdmin}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-700/60"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>View Live Portfolio</span>
            </button>

            {/* Publish Changes Button */}
            <button
              onClick={() => publishNow()}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Publish</span>
            </button>
          </div>
        </header>

        {/* Tab Content Rendering Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === "dashboard" && <DashboardOverview onNavigateTab={handleTabClick} />}
            {activeTab === "profile" && <ProfileEditor />}
            {activeTab === "projects" && <ProjectsCMS />}
            {activeTab === "skills" && <SkillsCMS />}
            {activeTab === "experience" && <ExperienceCMS />}
            {activeTab === "education" && <EducationCMS />}
            {activeTab === "certificates" && <CertificatesCMS />}
            {activeTab === "blogs" && <BlogCMS />}
            {activeTab === "prompts" && <PromptLibraryCMS />}
            {activeTab === "resume" && <ResumeCMS />}
            {activeTab === "socials" && <SocialLinksEditor />}
            {activeTab === "contact" && <ContactInfoCMS />}
            {activeTab === "theme" && <ThemeCMS />}
            {activeTab === "seo" && <SeoCMS />}
            {activeTab === "analytics" && <AnalyticsDashboard />}
            {activeTab === "files" && <FileManagerCMS />}
            {activeTab === "backup" && <BackupSettingsCMS />}
          </div>
        </main>
      </div>
    </div>
  );
};
