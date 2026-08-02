import React, { useState } from "react";
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Sparkles,
  Send,
  RefreshCw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCMS } from "../context/CMSContext";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { data } = useCMS();
  const profile = data.profile;
  const edu = data.education;
  const featuredProject = data.featuredProject;
  const skillsList = data.skills || [];

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"resume" | "ai">("resume");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  if (!isOpen) return null;

  const handleDownloadResume = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22C55E", "#3B82F6", "#8B5CF6"],
    });

    const resumeFormattedText = `
===================================================================
${profile.name.toUpperCase()} - RESUME
===================================================================
Email: ${profile.email}
Phone: ${profile.phone || "N/A"}
Location: ${profile.location}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}

SUMMARY
-------------------------------------------------------------------
${profile.bioFull || profile.bioShort}

EDUCATION
-------------------------------------------------------------------
Degree: ${edu?.degree || "Bachelor of Science in Computer Science"}
Institution: ${edu?.institution || profile.college}, ${edu?.location || profile.location}
Period: ${edu?.period || profile.graduationYear}
Score: ${edu?.score || "N/A"}

SKILLS
-------------------------------------------------------------------
${skillsList.map((s) => `• ${s.name} (${s.category}) - ${s.progress}%`).join("\n")}

FEATURED CAPSTONE PROJECT
-------------------------------------------------------------------
Title: ${featuredProject?.title} - ${featuredProject?.subtitle}
Description: ${featuredProject?.description}
Technologies: ${(featuredProject?.technologies || []).join(", ")}

===================================================================
`;

    const blob = new Blob([resumeFormattedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, "_")}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    const text = `${profile.name} - ${profile.title}\nEmail: ${profile.email}\nEducation: ${edu?.degree || profile.college} (${profile.graduationYear})\nSkills: ${skillsList.slice(0, 6).map((s) => s.name).join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskAiAboutResume = async (qPrompt?: string) => {
    const questionToAsk = qPrompt || aiQuestion;
    if (!questionToAsk.trim()) return;

    setIsAsking(true);
    setAiAnswer(null);

    try {
      const resp = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Regarding ${profile.name}'s Resume: ${questionToAsk}`,
        }),
      });

      const resData = await resp.json();
      setAiAnswer(resData.reply || `${profile.name} is proficient in web development, modern frontend frameworks, and AI integrations.`);
    } catch {
      setAiAnswer(`${profile.name} is a ${profile.title} at ${profile.college}, skilled in React, Next.js, and Full-Stack Web Development.`);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#18181B] border border-white/15 p-6 md:p-8 space-y-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {profile.name} — Curriculum Vitae
              </h3>
              <p className="text-xs text-zinc-400">
                {profile.title} • {profile.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === "resume" ? "ai" : "resume")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "ai"
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeTab === "ai" ? "View Document" : "Ask AI About Resume"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Resume View */}
        {activeTab === "resume" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header info card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-lg font-bold text-white">{profile.name}</div>
                <div className="text-xs text-emerald-400 font-mono">{profile.title} • {profile.college}</div>
                <div className="text-xs text-zinc-400">{profile.email} • {profile.location}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyText}
                  className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Quick Summary"}</span>
                </button>

                <button
                  onClick={handleDownloadResume}
                  className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>

            {/* Education Section */}
            {edu && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </h4>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-white font-bold">
                    <span>{edu.degree}</span>
                    <span className="text-emerald-400 font-mono">{edu.period}</span>
                  </div>
                  <div className="text-zinc-400">{edu.institution}, {edu.location}</div>
                  <div className="text-zinc-300 font-medium pt-1">Status: {edu.score || "Enrolled"}</div>
                </div>
              </div>
            )}

            {/* Technical Skills Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>Core Technical Skills</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {skillsList.map((skill, index) => (
                  <div key={skill.id || index} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white font-bold">{skill.name}</span>
                      <span className="text-emerald-400 font-mono text-[11px]">{skill.progress}%</span>
                    </div>
                    <p className="text-zinc-400 text-[11px]">{skill.category} • {(skill.relevantTech || []).join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects Section */}
            {featuredProject && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Featured Capstone Work</span>
                </h4>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-xs">
                  <div className="flex justify-between text-white font-bold">
                    <span>{featuredProject.title} — {featuredProject.subtitle}</span>
                  </div>
                  <p className="text-zinc-300">{featuredProject.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(featuredProject.technologies || []).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI Resume Query Assistant */}
        {activeTab === "ai" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-xs space-y-2">
              <div className="flex items-center gap-2 text-violet-300 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Resume Recruiter Query Assistant</span>
              </div>
              <p className="text-zinc-300">
                Ask any specific recruiter or technical evaluation questions regarding {profile.name}'s experience, skills, projects, or availability.
              </p>
            </div>

            {/* Sample Preset Queries */}
            <div className="space-y-2">
              <span className="text-xs text-zinc-400 font-mono">Suggested Questions:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  `Is ${profile.name} available for immediate internships?`,
                  `What are ${profile.name}'s key technical skills?`,
                  `Tell me about ${profile.name}'s capstone project.`,
                  `What degree is ${profile.name} pursuing?`,
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setAiQuestion(preset);
                      handleAskAiAboutResume(preset);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    "{preset}"
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={`Ask anything about ${profile.name}'s resume...`}
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskAiAboutResume()}
                className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50"
              />
              <button
                onClick={() => handleAskAiAboutResume()}
                disabled={isAsking}
                className="px-5 py-3 rounded-2xl bg-violet-500 hover:bg-violet-400 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isAsking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Ask AI</span>
              </button>
            </div>

            {/* AI Answer Card */}
            {aiAnswer && (
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-200 leading-relaxed space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Assistant Response:</span>
                </div>
                <p className="whitespace-pre-wrap">{aiAnswer}</p>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
