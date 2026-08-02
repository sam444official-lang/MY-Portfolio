import React from "react";
import { Eye, MousePointerClick, Download, Mail, TrendingUp, Users, Globe, ArrowUpRight } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

export const AnalyticsDashboard: React.FC = () => {
  const { data } = useCMS();
  const analytics = data.analytics || {
    totalViews: 1284,
    projectClicks: 412,
    contactSubmissions: 28,
    resumeDownloads: 184,
    topProjects: ["EcoTrack Smart Carbon Footprint Platform", "AI Technical Architect Assistant"],
    recentInquiries: [],
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span>Real-Time Visitor Analytics & Logs</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Monitor live page traffic, project card engagement, resume PDF downloads, and visitor messages.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Total Portfolio Views</span>
            <Eye className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">{analytics.totalViews}</div>
          <span className="text-[10px] text-emerald-400 flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +18.4% this week
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Project Link Clicks</span>
            <MousePointerClick className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{analytics.projectClicks}</div>
          <span className="text-[10px] text-blue-400 flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> High Engagement
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Resume Downloads</span>
            <Download className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">{analytics.resumeDownloads}</div>
          <span className="text-[10px] text-amber-400 flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> Recruiter Target
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Contact Messages</span>
            <Mail className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{analytics.contactSubmissions}</div>
          <span className="text-[10px] text-purple-400 flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> Active Inbox
          </span>
        </div>
      </div>

      {/* Visitor Inquiries Log Table */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
          <Mail className="w-4 h-4 text-emerald-400" />
          <span>Visitor Contact Inquiries Log ({analytics.recentInquiries?.length || 0})</span>
        </h3>

        <div className="space-y-3">
          {analytics.recentInquiries && analytics.recentInquiries.length > 0 ? (
            analytics.recentInquiries.map((inq) => (
              <div key={inq.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-bold text-white">{inq.name} ({inq.email})</div>
                  <span className="text-slate-500 text-[10px]">{inq.date}</span>
                </div>
                <div className="text-xs text-emerald-400 font-semibold">{inq.subject}</div>
                <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                  {inq.message}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">No contact inquiries received yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
