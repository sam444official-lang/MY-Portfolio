import React from "react";
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  Eye,
  Download,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Send,
  Clock,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const { data, publishNow, saveStatus } = useCMS();

  const totalProjects = (data.additionalProjects?.length || 0) + (data.featuredProject ? 1 : 0);
  const publishedBlogs = data.blogs?.filter((b) => b.status === "published").length || 0;
  const totalSkills = data.skills?.length || 0;
  const analytics = data.analytics || { totalViews: 1284, projectClicks: 412, contactSubmissions: 28, resumeDownloads: 184 };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/20 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Portfolio CMS Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {data.profile.name}!
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              You have full real-time control over all text, projects, skills, education, blogs, prompt libraries, resumes, SEO, and styling settings without touching any code.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => publishNow()}
              className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Live Portfolio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{totalProjects}</div>
          <p className="text-xs text-slate-400 flex items-center justify-between">
            <span>Includes EcoTrack Capstone</span>
            <button onClick={() => onNavigateTab("projects")} className="text-emerald-400 hover:underline">Manage</button>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Published Blogs</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{publishedBlogs}</div>
          <p className="text-xs text-slate-400 flex items-center justify-between">
            <span>Markdown CMS Enabled</span>
            <button onClick={() => onNavigateTab("blogs")} className="text-emerald-400 hover:underline">Manage</button>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Page Views</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{analytics.totalViews}</div>
          <p className="text-xs text-emerald-400 flex items-center space-x-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Live Visitor Analytics</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Resume Downloads</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{analytics.resumeDownloads}</div>
          <p className="text-xs text-slate-400 flex items-center justify-between">
            <span>{data.resumes?.length || 0} Resume Versions</span>
            <button onClick={() => onNavigateTab("resume")} className="text-emerald-400 hover:underline">Manage</button>
          </p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Quick Content Management Actions</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => onNavigateTab("profile")}
            className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 text-left transition-all group"
          >
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-2 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Edit Profile</div>
            <div className="text-[10px] text-slate-400">Bio & Contact</div>
          </button>

          <button
            onClick={() => onNavigateTab("projects")}
            className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 text-left transition-all group"
          >
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-2 group-hover:scale-110 transition-transform">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Add Project</div>
            <div className="text-[10px] text-slate-400">New Work Card</div>
          </button>

          <button
            onClick={() => onNavigateTab("blogs")}
            className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 text-left transition-all group"
          >
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-2 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Write Blog</div>
            <div className="text-[10px] text-slate-400">Markdown Editor</div>
          </button>

          <button
            onClick={() => onNavigateTab("skills")}
            className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 text-left transition-all group"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-2 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Skills Matrix</div>
            <div className="text-[10px] text-slate-400">Tech % Sliders</div>
          </button>

          <button
            onClick={() => onNavigateTab("theme")}
            className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 text-left transition-all group"
          >
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 w-fit mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Theme & Colors</div>
            <div className="text-[10px] text-slate-400">Live Customizer</div>
          </button>

          <button
            onClick={() => onNavigateTab("backup")}
            className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 text-left transition-all group"
          >
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 w-fit mb-2 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Backup JSON</div>
            <div className="text-[10px] text-slate-400">Export & Restore</div>
          </button>
        </div>
      </div>

      {/* Recent Contact Messages Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Recent Visitor Inquiries ({data.analytics?.recentInquiries?.length || 0})</span>
            </h3>
            <button onClick={() => onNavigateTab("analytics")} className="text-xs text-emerald-400 hover:underline">
              View All Logs
            </button>
          </div>

          <div className="space-y-3">
            {data.analytics?.recentInquiries && data.analytics.recentInquiries.length > 0 ? (
              data.analytics.recentInquiries.slice(0, 4).map((inq) => (
                <div key={inq.id} className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{inq.name}</div>
                    <div className="text-[11px] text-emerald-400">{inq.email}</div>
                    <div className="text-xs text-slate-300 mt-1">"{inq.subject}"</div>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">{inq.date}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">No visitor messages received yet.</p>
            )}
          </div>
        </div>

        {/* Version History Log */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Auto-Save & Version History</span>
            </h3>
            <button onClick={() => onNavigateTab("backup")} className="text-xs text-emerald-400 hover:underline">
              Manage Backups
            </button>
          </div>

          <div className="space-y-3">
            {data.versions && data.versions.length > 0 ? (
              data.versions.slice(0, 4).map((ver) => (
                <div key={ver.id} className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{ver.summary}</div>
                    <div className="text-[10px] text-slate-500">Saved by {ver.author}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{ver.timestamp}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">No previous version history recorded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
