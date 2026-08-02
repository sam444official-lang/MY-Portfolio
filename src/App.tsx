import React, { useState } from "react";
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

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B] text-white selection:bg-emerald-500/30 selection:text-emerald-300 font-sans antialiased overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <Header onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Sections */}
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
      <Footer />

      {/* Modals & Interactive AI Assistant */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
      />

      <AIChatBot />
    </div>
  );
}
