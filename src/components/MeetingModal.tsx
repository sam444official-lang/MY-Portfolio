import React, { useState } from "react";
import { X, Calendar, Clock, CheckCircle2, Send, Sparkles, User, Mail, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MeetingModal: React.FC<MeetingModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState("Software Internship Interview");
  const [selectedDate, setSelectedDate] = useState("2026-08-05");
  const [selectedTime, setSelectedTime] = useState("11:00 AM IST");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [scheduled, setScheduled] = useState(false);

  if (!isOpen) return null;

  const topics = [
    "Software Internship Interview",
    "Full-Time Role Discussion",
    "Project Collaboration",
    "Technical Mentorship / Advice",
  ];

  const timeSlots = [
    "10:00 AM IST",
    "11:00 AM IST",
    "02:00 PM IST",
    "04:00 PM IST",
    "06:00 PM IST",
  ];

  const handleConfirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setScheduled(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22C55E", "#3B82F6", "#8B5CF6"],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#18181B] border border-white/15 p-6 md:p-8 space-y-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Schedule a Call with Sarim
              </h3>
              <p className="text-xs text-zinc-400">
                Select an interview date & topic for a 15-30 min conversation.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {scheduled ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-4 text-center animate-in fade-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Meeting Request Sent!</h4>
              <p className="text-xs text-zinc-300">
                Thank you {name}! Sarim has received your invitation for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> regarding <em>"{selectedTopic}"</em>. A calendar invite confirmation will be emailed to <strong>{email}</strong>.
              </p>
            </div>

            <button
              onClick={() => {
                setScheduled(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmSchedule} className="space-y-4">
            {/* Topic Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Meeting Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50"
              >
                {topics.map((t) => (
                  <option key={t} value={t} className="bg-zinc-900 text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Time Slot</span>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-zinc-900 text-white">
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Meeting Notes / Agenda</label>
              <textarea
                rows={3}
                placeholder="Brief agenda or interview questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-white/5 text-zinc-400 text-xs hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Confirm Invitation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
