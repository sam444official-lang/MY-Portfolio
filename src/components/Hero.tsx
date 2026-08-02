import React, { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Copy,
  Check,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Terminal,
  Zap,
  Globe,
  MapPin,
  Calendar,
} from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

interface HeroProps {
  onOpenResume: () => void;
  onOpenSchedule: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenSchedule }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [terminalTab, setTerminalTab] = useState<"code" | "status" | "stack">("code");

  const developerCodeSnippet = `// Sarim Usmani - Portfolio Overview
const developer = {
  name: "${PERSONAL_INFO.name}",
  role: "Full-Stack Web Developer",
  education: "B.Sc. Computer Science (2022-2026)",
  location: "Mumbai, India",
  coreStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Express", "Firebase"],
  aiCapabilities: ["Gemini API", "Vision AI", "Structured JSON Schemas"],
  status: "Available for Internships & Full-time Roles",
  passion: "Crafting modern SaaS products with pixel-perfect UI/UX",
  contact: "${PERSONAL_INFO.email}"
};`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(developerCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 -z-10 bg-[#09090B]">
        {/* Subtle SVG Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-blue-500/15 to-violet-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Floating Geometric Elements */}
        <div className="absolute top-28 right-[12%] w-16 h-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md rotate-12 hidden lg:block animate-pulse duration-1000" />
        <div className="absolute bottom-20 left-[8%] w-12 h-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md -rotate-6 hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-zinc-300">
                Full-Stack & Generative AI Developer
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
              <span className="text-xs text-emerald-400 font-medium">Mumbai, India</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="text-xl md:text-2xl font-semibold text-emerald-400 tracking-tight flex items-center gap-2">
                <span>Hi, I'm</span>
                <span className="inline-block w-8 h-[2px] bg-emerald-400/60" />
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Sarim Usmani
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-zinc-400 tracking-tight leading-snug">
                Final-Year Computer Science Student
                <span className="text-emerald-400 font-bold"> • </span>
                Full-Stack Web Developer
              </p>
            </div>

            {/* Paragraph Introduction */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-normal">
              I build high-performance, modern web applications leveraging{" "}
              <strong className="text-zinc-200 font-semibold">React 19</strong>,{" "}
              <strong className="text-zinc-200 font-semibold">Next.js 15</strong>,{" "}
              <strong className="text-zinc-200 font-semibold">TypeScript</strong>, and{" "}
              <strong className="text-zinc-200 font-semibold">AI integrations</strong>. Driven by a passion for clean code, responsive glassmorphic UI, and scalable software architecture.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Contact Me</span>
                <Mail className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
              </button>

              <button
                onClick={onOpenSchedule}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Call</span>
              </button>
            </div>

            {/* Social Icons & Quick Info */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all shadow-md"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-blue-400 hover:bg-white/10 hover:scale-110 transition-all shadow-md"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-emerald-400 hover:bg-white/10 hover:scale-110 transition-all shadow-md"
                  aria-label="Email Me"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lords Universal College, Mumbai (2022–2026)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive SaaS Developer Terminal */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-[#18181B]/90 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              {/* Terminal Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    sarim-usmani.ts
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/5 text-[11px] font-mono">
                  <button
                    onClick={() => setTerminalTab("code")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      terminalTab === "code" ? "bg-white/10 text-emerald-400 font-semibold" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Code
                  </button>
                  <button
                    onClick={() => setTerminalTab("status")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      terminalTab === "status" ? "bg-white/10 text-blue-400 font-semibold" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Status
                  </button>
                  <button
                    onClick={() => setTerminalTab("stack")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      terminalTab === "stack" ? "bg-white/10 text-violet-400 font-semibold" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Stack
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto min-h-[300px]">
                {terminalTab === "code" && (
                  <div className="relative">
                    <button
                      onClick={copyCodeToClipboard}
                      className="absolute top-0 right-0 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
                      title="Copy code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <pre className="text-zinc-300">
                      <code>
                        <span className="text-violet-400">const</span>{" "}
                        <span className="text-blue-400">developer</span> = &#123;{"\n"}
                        {"  "}<span className="text-emerald-400">name</span>: <span className="text-amber-300">"{PERSONAL_INFO.name}"</span>,{"\n"}
                        {"  "}<span className="text-emerald-400">role</span>: <span className="text-amber-300">"Full-Stack Web Developer"</span>,{"\n"}
                        {"  "}<span className="text-emerald-400">college</span>: <span className="text-amber-300">"Lords Universal College"</span>,{"\n"}
                        {"  "}<span className="text-emerald-400">year</span>: <span className="text-amber-300">"Final-Year CS (2022-2026)"</span>,{"\n"}
                        {"  "}<span className="text-emerald-400">stack</span>: [
                        <span className="text-amber-300">"Next.js"</span>, <span className="text-amber-300">"React 19"</span>, <span className="text-amber-300">"TypeScript"</span>, <span className="text-amber-300">"Express"</span>, <span className="text-amber-300">"Firebase"</span>],{"\n"}
                        {"  "}<span className="text-emerald-400">aiIntegration</span>: <span className="text-amber-300">"Gemini API & Bill Vision AI"</span>,{"\n"}
                        {"  "}<span className="text-emerald-400">status</span>: <span className="text-amber-300">"{PERSONAL_INFO.status}"</span>{"\n"}
                        &#125;;
                      </code>
                    </pre>
                  </div>
                )}

                {terminalTab === "status" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-zinc-400">Academic Progress:</span>
                      <span className="text-emerald-400 font-bold">8th Semester (Final Year)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-zinc-400">Primary Goal:</span>
                      <span className="text-blue-400 font-bold">Software Engineer Internship</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-zinc-400">Flagship Project:</span>
                      <span className="text-violet-400 font-bold">EcoTrack India (AI Platform)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-zinc-400">Current Focus:</span>
                      <span className="text-amber-300">Next.js 15 App Router & Generative AI</span>
                    </div>
                  </div>
                )}

                {terminalTab === "stack" && (
                  <div className="space-y-3">
                    <div className="text-zinc-400 text-xs font-medium">Core Stack Highlights:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Next.js & React 19</span>
                      </div>
                      <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" />
                        <span>TypeScript</span>
                      </div>
                      <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Gemini AI SDK</span>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Node.js & Express</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal Footer Bar */}
              <div className="px-5 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ready for internship assignments</span>
                </div>
                <span>UTF-8 • TSX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
