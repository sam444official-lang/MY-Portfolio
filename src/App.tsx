import React, { useState } from "react";
import { CMSProvider, useCMS } from "./context/CMSContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { SoftSkills } from "./components/SoftSkills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ResumeModal } from "./components/ResumeModal";
import { MeetingModal } from "./components/MeetingModal";
import { AIChatBot } from "./components/AIChatBot";
import { AdminLoginModal } from "./components/admin/AdminLoginModal";
import { AdminLayout } from "./components/admin/AdminLayout";
import { Shield, Lock } from "lucide-react";

function PortfolioApp() {
  const { data, isAuthenticated } = useCMS();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // If Admin Dashboard is currently open, show full Admin Layout console
  if (isAdminDashboardOpen && isAuthenticated) {
    return <AdminLayout onCloseAdmin={() => setIsAdminDashboardOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white selection:bg-emerald-500/30 selection:text-emerald-300 font-sans antialiased overflow-x-hidden">
      {/* Floating Admin Trigger Bar for Portfolio Owner */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            if (isAuthenticated) {
              setIsAdminDashboardOpen(true);
            } else {
              setIsLoginModalOpen(true);
            }
          }}
          className="group px-3.5 py-2 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-bold shadow-2xl backdrop-blur-md hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center space-x-2"
          title="Open Portfolio Admin Dashboard"
        >
          <Lock className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span>{isAuthenticated ? "Admin Dashboard" : "Admin Login"}</span>
        </button>
      </div>

      {/* Sticky Glass Navbar */}
      <Header
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenAdmin={() => {
          if (isAuthenticated) {
            setIsAdminDashboardOpen(true);
          } else {
            setIsLoginModalOpen(true);
          }
        }}
      />

      {/* Main Portfolio Sections */}
      <main>
        <Hero
          onOpenResume={() => setIsResumeModalOpen(true)}
          onOpenSchedule={() => setIsMeetingModalOpen(true)}
        />
        <About onOpenSchedule={() => setIsMeetingModalOpen(true)} />
        <Skills />
        <Projects />
        <Education />
        <SoftSkills />
        <Contact onOpenSchedule={() => setIsMeetingModalOpen(true)} />
      </main>

      {/* Minimal Footer */}
      <Footer
        onOpenAdmin={() => {
          if (isAuthenticated) {
            setIsAdminDashboardOpen(true);
          } else {
            setIsLoginModalOpen(true);
          }
        }}
      />

      {/* Modals & Interactive AI Assistant */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
      />

      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          setIsLoginModalOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      <AIChatBot />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <PortfolioApp />
    </CMSProvider>
  );
}
