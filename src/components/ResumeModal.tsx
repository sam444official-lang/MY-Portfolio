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
  Award,
  Sparkles,
  Send,
  RefreshCw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, FEATURED_PROJECT, EDUCATION_DATA, SKILLS_DATA } from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
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
SARIM USMANI - RESUME
===================================================================
Email: ${PERSONAL_INFO.email}
Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}

OBJECTIVE / SUMMARY
-------------------------------------------------------------------
Final-Year Computer Science undergraduate student at Lords Universal College, Mumbai (2022-2026), with core expertise in Full-Stack Web Development (Next.js 15, React 19, TypeScript, Node.js, Express, Firebase) and Generative AI integrations (Gemini API).

EDUCATION
-------------------------------------------------------------------
Degree: ${EDUCATION_DATA.degree}
Institution: ${EDUCATION_DATA.institution}, ${EDUCATION_DATA.location}
Period: ${EDUCATION_DATA.period}
Status: ${EDUCATION_DATA.score}

TECHNICAL SKILLS
-------------------------------------------------------------------
• Frontend: React 19, Next.js 15, TypeScript, Tailwind CSS, HTML5, CSS3
• Backend: Node.js, Express.js, Firebase (Firestore & Auth), REST APIs
• Programming Languages: C, C++, Java, Python, JavaScript, TypeScript
• Databases: MySQL, Firestore
• Developer Tools: Git, GitHub, VS Code, Postman, Figma

FEATURED CAPSTONE PROJECT
-------------------------------------------------------------------
Title: ${FEATURED_PROJECT.title} - ${FEATURED_PROJECT.subtitle}
Description: ${FEATURED_PROJECT.description}
Key Highlights:
${FEATURED_PROJECT.features.map((f) => `  - ${f}`).join("\n")}
Technologies: ${FEATURED_PROJECT.technologies.join(", ")}

===================================================================
`;

    const blob = new Blob([resumeFormattedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Sarim_Usmani_Resume.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    const text = `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}\nEmail: ${PERSONAL_INFO.email}\nEducation: ${EDUCATION_DATA.degree}, ${EDUCATION_DATA.institution} (2022-2026)\nSkills: Next.js, React, TypeScript, Node.js, Firebase, Gemini AI.`;
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
          message: `Regarding Sarim Usmani's Resume: ${questionToAsk}`,
        }),
      });

      const data = await resp.json();
      setAiAnswer(data.reply || "Sarim Usmani is proficient in Next.js, React, TypeScript, and AI integrations.");
    } catch (err) {
      setAiAnswer("Sarim Usmani is a Final-Year CS Student at Lords Universal College, Mumbai, skilled in React 19, Next.js, and Full-Stack Web Development.");
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
                Sarim Usmani — Curriculum Vitae
              </h3>
              <p className="text-xs text-zinc-400">
                Final-Year Computer Science Student • Full-Stack Web Developer
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
                <div className="text-lg font-bold text-white">{PERSONAL_INFO.name}</div>
                <div className="text-xs text-emerald-400 font-mono">{PERSONAL_INFO.title} • {PERSONAL_INFO.college}</div>
                <div className="text-xs text-zinc-400">{PERSONAL_INFO.email} • {PERSONAL_INFO.location}</div>
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
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </h4>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-white font-bold">
                  <span>{EDUCATION_DATA.degree}</span>
                  <span className="text-emerald-400 font-mono">{EDUCATION_DATA.period}</span>
                </div>
                <div className="text-zinc-400">{EDUCATION_DATA.institution}, {EDUCATION_DATA.location}</div>
                <div className="text-zinc-300 font-medium pt-1">Expected Graduation: May 2026</div>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>Core Technical Skills</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-white font-bold">Frontend Development</span>
                  <p className="text-zinc-400">React 19, Next.js 15, TypeScript, Tailwind CSS, HTML5, CSS3, Framer Motion</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-white font-bold">Backend & AI</span>
                  <p className="text-zinc-400">Node.js, Express.js, Firebase (Firestore, Auth), REST APIs, Gemini AI SDK</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-white font-bold">Programming Languages</span>
                  <p className="text-zinc-400">C, C++, Java, Python, JavaScript, TypeScript</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-white font-bold">Developer Tools & Databases</span>
                  <p className="text-zinc-400">Git, GitHub, VS Code, Postman, Figma, MySQL, Firestore</p>
                </div>
              </div>
            </div>

            {/* Featured Projects Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Featured Capstone Work</span>
              </h4>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-xs">
                <div className="flex justify-between text-white font-bold">
                  <span>{FEATURED_PROJECT.title} — {FEATURED_PROJECT.subtitle}</span>
                </div>
                <p className="text-zinc-300">{FEATURED_PROJECT.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {FEATURED_PROJECT.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
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
                Ask any specific recruiter or technical evaluation questions regarding Sarim Usmani's experience, skills, projects, or availability.
              </p>
            </div>

            {/* Sample Preset Queries */}
            <div className="space-y-2">
              <span className="text-xs text-zinc-400 font-mono">Suggested Questions:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Is Sarim available for immediate full-stack internships?",
                  "What is Sarim's experience with Next.js & React 19?",
                  "Tell me about Sarim's capstone project EcoTrack India.",
                  "Does Sarim have experience with Firebase & Express?",
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
                placeholder="Ask anything about Sarim's resume..."
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
                  <span>Sarim's Assistant Response:</span>
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
