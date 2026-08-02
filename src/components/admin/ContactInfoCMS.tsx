import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Save, Check, Send } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

export const ContactInfoCMS: React.FC = () => {
  const { data, updateData, saveNow } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const contact = data.contactInfo || {
    email: data.profile.email,
    phone: data.profile.phone,
    address: data.profile.location,
    ctaHeadline: "Let's Build Something Exceptional Together",
    workingHours: "Mon – Fri, 9:00 AM – 7:00 PM IST",
    responseTime: "Usually responds within 2 hours",
  };

  const handleChange = (field: string, value: string) => {
    updateData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }), `Updated contact info ${field}`);
  };

  const handleSave = async () => {
    const ok = await saveNow();
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Mail className="w-5 h-5 text-emerald-400" />
            <span>Contact Information & CTA CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Customize direct contact parameters, response timelines, location address, and footer call-to-action text.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 shrink-0"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved Live!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Contact Info</span>
            </>
          )}
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Email Address</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={contact.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location / Campus Address</label>
            <input
              type="text"
              value={contact.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Response Time</label>
            <input
              type="text"
              value={contact.responseTime || ""}
              onChange={(e) => handleChange("responseTime", e.target.value)}
              placeholder="Usually responds within 2 hours"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Footer CTA Headline</label>
          <input
            type="text"
            value={contact.ctaHeadline || ""}
            onChange={(e) => handleChange("ctaHeadline", e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};
