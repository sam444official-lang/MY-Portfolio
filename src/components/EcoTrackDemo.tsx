import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Leaf,
  FileText,
  Download,
  Flame,
  CheckCircle2,
  RefreshCw,
  PieChart,
  BarChart3,
  ShieldCheck,
  Building2,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { BillScanResult } from "../types";

export const EcoTrackDemo: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>("mumbai-3bhk");
  const [billText, setBillText] = useState<string>(
    "MSEDCL Electricity Bill - Customer ID: 102938475. Billed Consumption: 285 kWh. Current Month Amount: ₹2,450. Meter Type: Residential Single Phase, Zone: Mumbai Suburban."
  );
  const [monthlyKwH, setMonthlyKwH] = useState<number>(285);
  const [stateLocation, setStateLocation] = useState<string>("Maharashtra");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<BillScanResult | null>({
    providerName: "MSEDCL Suburban Grid",
    monthlyUsageKwh: 285,
    estimatedCarbonKg: 233, // 285 * 0.82 kg CO2 / kWh
    sustainabilityRating: "Moderate Carbon Impact",
    breakdown: [
      { category: "Air Conditioning (Cooling)", usagePercent: 45, co2Kg: 105 },
      { category: "Refrigeration & Heavy Appliances", usagePercent: 25, co2Kg: 58 },
      { category: "Lighting & Electronics", usagePercent: 20, co2Kg: 47 },
      { category: "Vampire / Standby Draw", usagePercent: 10, co2Kg: 23 },
    ],
    actionableTips: [
      "Set AC temperature to 24°C-26°C instead of 18°C to reduce cooling load by up to 18%.",
      "Upgrade old CFL light fixtures to 5-Star rated smart LEDs saving ~22 kWh monthly.",
      "Install smart timer plugs to kill vampire standby power on TV and gaming consoles overnight.",
    ],
    reductionPotentialPercent: 26,
  });

  const presetBills = [
    {
      id: "mumbai-3bhk",
      label: "3BHK Apartment (Mumbai MSEDCL)",
      kwh: 285,
      state: "Maharashtra",
      details: "MSEDCL Suburban Bill. kWh: 285, Amount: ₹2,450. Meter: Residential 3BHK.",
    },
    {
      id: "delhi-2bhk",
      label: "2BHK Apartment (BSES Delhi)",
      kwh: 195,
      state: "Delhi",
      details: "BSES Rajdhani Delhi Electricity Bill. kWh: 195, Subsidized rate slab.",
    },
    {
      id: "bangalore-house",
      label: "Independent Villa (BESCOM Bangalore)",
      kwh: 420,
      state: "Karnataka",
      details: "BESCOM Karnataka Electric Bill. kWh: 420, High appliance load.",
    },
  ];

  const handleSelectPreset = (presetId: string) => {
    const p = presetBills.find((x) => x.id === presetId);
    if (p) {
      setSelectedPreset(presetId);
      setBillText(p.details);
      setMonthlyKwH(p.kwh);
      setStateLocation(p.state);
    }
  };

  const handleRunAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const resp = await fetch("/api/ai/scan-bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billDetails: billText,
          monthlyKwH,
          stateLocation,
        }),
      });

      if (!resp.ok) throw new Error("API error");
      const data: BillScanResult = await resp.json();
      setScanResult(data);
    } catch (err) {
      // Fallback calculation if server error
      const calculatedCo2 = Math.round(monthlyKwH * 0.82);
      setScanResult({
        providerName: `${stateLocation} Power Grid`,
        monthlyUsageKwh: monthlyKwH,
        estimatedCarbonKg: calculatedCo2,
        sustainabilityRating: calculatedCo2 > 250 ? "High Carbon Impact" : "Moderate Carbon Impact",
        breakdown: [
          { category: "Air Conditioning & Cooling", usagePercent: 42, co2Kg: Math.round(calculatedCo2 * 0.42) },
          { category: "Refrigeration & Cooking", usagePercent: 28, co2Kg: Math.round(calculatedCo2 * 0.28) },
          { category: "Lighting & Smart Devices", usagePercent: 30, co2Kg: Math.round(calculatedCo2 * 0.30) },
        ],
        actionableTips: [
          "Switch to 5-Star inverter appliances to shave up to 25% off monthly kWh usage.",
          "Optimize lighting with scheduled smart LEDs.",
          "Use smart plugs to prevent standby power drain.",
        ],
        reductionPotentialPercent: 24,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportPdfReport = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22C55E", "#3B82F6", "#8B5CF6"],
    });

    const reportContent = `
==================================================
ECOTRACK INDIA - CARBON FOOTPRINT SUMMARY REPORT
==================================================
Date: ${new Date().toLocaleDateString()}
Utility Provider: ${scanResult?.providerName || "Indian Utility Grid"}
Location: ${stateLocation}

CONSUMPTION & FOOTPRINT ANALYSIS:
• Monthly Electricity Usage: ${scanResult?.monthlyUsageKwh || monthlyKwH} kWh
• Estimated Carbon Footprint: ${scanResult?.estimatedCarbonKg} kg CO2e / month
• Annual Carbon Projection: ${Math.round((scanResult?.estimatedCarbonKg || 200) * 12)} kg CO2e / year
• Sustainability Status: ${scanResult?.sustainabilityRating}

ACTIONABLE AI REDUCTION RECOMMENDATIONS:
${scanResult?.actionableTips.map((tip, i) => `${i + 1}. ${tip}`).join("\n")}

Potential Monthly Carbon Savings: ${scanResult?.reductionPotentialPercent}%
Engineered by Sarim Usmani - EcoTrack India Platform
==================================================
`;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EcoTrack_Carbon_Report_${stateLocation}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="ecotrack-live-sandbox" className="p-6 md:p-8 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-zinc-950 font-extrabold shadow-lg shadow-emerald-500/20">
            <Leaf className="w-6 h-6 text-zinc-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">EcoTrack India Live AI Sandbox</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold">
                GEMINI VISION AI
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Interactive demonstration of Sarim Usmani's flagship AI utility bill scanner & carbon calculator.
            </p>
          </div>
        </div>

        <button
          onClick={handleExportPdfReport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer hover:border-emerald-500/30"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Export Carbon Report</span>
        </button>
      </div>

      {/* Preset Selection & Bill Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>Select Utility Preset</span>
              <span className="text-[11px] text-emerald-400 font-mono">Indian State Grids</span>
            </label>
            <div className="space-y-2">
              {presetBills.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedPreset === preset.id
                      ? "bg-emerald-500/10 border-emerald-500/40 text-white"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-medium">{preset.label}</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">{preset.kwh} kWh</span>
                </button>
              ))}
            </div>
          </div>

          {/* kWh Slider */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-zinc-300">Monthly Usage (kWh):</span>
              <span className="text-emerald-400 font-mono text-sm">{monthlyKwH} kWh</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="5"
              value={monthlyKwH}
              onChange={(e) => setMonthlyKwH(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>50 kWh (1BHK)</span>
              <span>500 kWh (4BHK)</span>
              <span>1000 kWh (Villa)</span>
            </div>
          </div>

          {/* Raw Bill Text / OCR Preview */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Bill Details / OCR Input</span>
            </label>
            <textarea
              rows={3}
              value={billText}
              onChange={(e) => setBillText(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 text-xs font-mono placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>

          {/* Run AI Analysis Button */}
          <button
            onClick={handleRunAiAnalysis}
            disabled={isAnalyzing}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
                <span>Running Gemini AI Scan...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                <span>Calculate CO2 & AI Insights</span>
              </>
            )}
          </button>
        </div>

        {/* Results Dashboard Output */}
        <div className="lg:col-span-7 space-y-6">
          {scanResult && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Primary Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[11px] font-mono text-zinc-400">Monthly Usage</div>
                  <div className="text-2xl font-extrabold text-white font-mono">{scanResult.monthlyUsageKwh} kWh</div>
                  <div className="text-[10px] text-zinc-500">Power Meter Read</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <div className="text-[11px] font-mono text-emerald-400">Monthly CO2 Output</div>
                  <div className="text-2xl font-extrabold text-emerald-300 font-mono">{scanResult.estimatedCarbonKg} kg</div>
                  <div className="text-[10px] text-emerald-400/80">CO2 Equivalent</div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                  <div className="text-[11px] font-mono text-blue-400">Savings Potential</div>
                  <div className="text-2xl font-extrabold text-blue-300 font-mono">-{scanResult.reductionPotentialPercent}%</div>
                  <div className="text-[10px] text-blue-400/80">With AI Recommendations</div>
                </div>
              </div>

              {/* Carbon Breakdown Bar */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-white flex items-center gap-1.5">
                    <PieChart className="w-4 h-4 text-emerald-400" />
                    Appliance Consumption & Emission Breakdown
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{scanResult.providerName}</span>
                </div>

                <div className="space-y-3">
                  {scanResult.breakdown.map((item, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between text-zinc-300">
                        <span>{item.category}</span>
                        <span className="font-mono text-emerald-400 font-semibold">{item.co2Kg} kg CO2 ({item.usagePercent}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            idx === 0
                              ? "bg-emerald-500"
                              : idx === 1
                              ? "bg-blue-500"
                              : idx === 2
                              ? "bg-violet-500"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${item.usagePercent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Actionable Tips */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Sustainability Roadmap</span>
                </div>
                <div className="space-y-2">
                  {scanResult.actionableTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
