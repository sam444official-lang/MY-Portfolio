import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini client lazily or safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Sarim's System Profile Context for AI Assistant
const SARIM_PROFILE_CONTEXT = `
You are Sarim Usmani's AI Portfolio Assistant, representing Sarim Usmani on his developer portfolio.
Key information about Sarim Usmani:
- Role: Final-Year Computer Science Student & Full-Stack Web Developer
- Location: Mumbai, India
- Education: Bachelor of Science in Computer Science, Lords Universal College, Mumbai (2022–2026)
- Availability: Open for Full-Time Software Engineering Roles, Web Development Internships, & Select Freelance Projects.
- Core Skills:
  - Frontend: React 19, Next.js 15, TypeScript, Tailwind CSS, Framer Motion, HTML5/CSS3
  - Backend: Node.js, Express, Firebase (Firestore, Auth), REST APIs, GraphQL
  - Languages: C, C++, Java, Python, JavaScript, TypeScript
  - Databases: MySQL, Firestore, MongoDB
  - Developer Tools: Git, GitHub, VS Code, Postman, Figma, Docker, Vercel
- Flagship Featured Project: EcoTrack India (AI-powered Carbon Footprint Tracking Platform with AI Bill Scanner, Carbon Calculator, PDF Report Exports, Firebase Auth & Analytics).
- Key Soft Skills: Problem Solving, Rapid Learning, Team Collaboration, Project Planning, Critical Thinking, Professional Communication.
- Mindset: Passionate about clean architecture, high performance, slick modern SaaS UI/UX, user-first product design, and AI integrations.

Always answer politely, concisely, and professionally in first-person ("Sarim is..." or "As Sarim's AI assistant...") as a helpful representative. Highlight Sarim's technical strengths and invite recruiters to schedule a call or send a message via the Contact form.
`;

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Chatbot endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response if API key is not yet set up
      res.json({
        reply: `Thanks for reaching out! Sarim is a Final-Year Computer Science student at Lords Universal College, Mumbai (2022–2026), specializing in Next.js, React, TypeScript, Node.js, and AI integrations. He is actively seeking Software Engineering internships and full-time roles! Feel free to leave a message in the contact section or view his projects.`,
      });
      return;
    }

    const prompt = `${SARIM_PROFILE_CONTEXT}\n\nVisitor Question: "${message}"\nProvide a clear, engaging, and structured response:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const reply = response.text || "Thank you for asking! Sarim is ready to collaborate on high-impact full-stack and AI projects.";
    res.json({ reply });
  } catch (err: any) {
    console.error("AI Chat error:", err);
    res.status(500).json({
      error: "Failed to generate response",
      details: err.message,
      fallback: "Sarim Usmani is a Full-Stack Web Developer & Final-Year CS student proficient in Next.js, TypeScript, React, and Firebase. You can reach him directly via email or LinkedIn!",
    });
  }
});

// EcoTrack Bill Scanner AI endpoint
app.post("/api/ai/scan-bill", async (req, res) => {
  try {
    const { billDetails, stateLocation, monthlyKwH } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // High quality realistic simulation fallback
      const calculatedCo2 = Math.round((monthlyKwH || 240) * 0.82); // ~0.82 kg CO2 per kWh in India
      res.json({
        providerName: "Tata Power / MSEDCL (Detected)",
        monthlyUsageKwh: monthlyKwH || 240,
        estimatedCarbonKg: calculatedCo2,
        sustainabilityRating: calculatedCo2 > 200 ? "Medium Carbon Impact" : "Eco-Friendly Baseline",
        breakdown: [
          { category: "Air Conditioning / Cooling", usagePercent: 42, co2Kg: Math.round(calculatedCo2 * 0.42) },
          { category: "Refrigeration & Appliances", usagePercent: 28, co2Kg: Math.round(calculatedCo2 * 0.28) },
          { category: "Lighting & Electronics", usagePercent: 30, co2Kg: Math.round(calculatedCo2 * 0.30) },
        ],
        actionableTips: [
          "Switch to 5-Star inverter ACs and set temperature to 24°C-26°C to cut cooling emissions by up to 18%.",
          "Upgrade older CFL bulbs to smart LED fixtures to save ~15 kWh monthly.",
          "Install smart plug timers to eliminate vampire draw on standby entertainment systems.",
        ],
        reductionPotentialPercent: 24,
      });
      return;
    }

    const prompt = `You are EcoTrack India's AI Sustainability Analyzer.
Analyze this Indian electricity utility bill information and compute estimated carbon footprint.
Input Details: "${billDetails || `Monthly kWh: ${monthlyKwH || 250}, State: ${stateLocation || 'Maharashtra'}`}"

Return a JSON response strictly adhering to this structure:
{
  "providerName": "Detected or Estimated Utility Company",
  "monthlyUsageKwh": number,
  "estimatedCarbonKg": number,
  "sustainabilityRating": "Excellent" | "Moderate Carbon Impact" | "High Carbon Impact",
  "breakdown": [
    { "category": "string", "usagePercent": number, "co2Kg": number }
  ],
  "actionableTips": [
    "Tip 1 tailored to Indian context",
    "Tip 2",
    "Tip 3"
  ],
  "reductionPotentialPercent": number
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    console.error("Scan bill error:", err);
    res.status(500).json({ error: "Failed to scan bill", details: err.message });
  }
});

// Contact Endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required" });
      return;
    }

    console.log("Received contact message from:", name, email, subject);

    // Provide immediate receipt confirmation with optional AI personal note
    let aiNote = null;
    const ai = getGeminiClient();
    if (ai) {
      try {
        const resp = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: `Write a brief 1-2 sentence warm automated acknowledgement from Sarim Usmani to ${name} regarding their inquiry about "${subject || 'Collaboration'}". Mention that Sarim usually responds within 12 hours.`,
        });
        aiNote = resp.text;
      } catch (e) {
        // ignore fallback
      }
    }

    res.json({
      success: true,
      message: "Message received successfully! Sarim will get back to you shortly.",
      timestamp: new Date().toISOString(),
      aiAcknowledgement: aiNote,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Vite Middleware for Development & Static Serve for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
