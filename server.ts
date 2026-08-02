import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { INITIAL_CMS_DATA } from "./src/data/initialCmsData";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// CMS File Database Storage Setup
const DATA_DIR = path.join(process.cwd(), "data");
const CMS_FILE_PATH = path.join(DATA_DIR, "cms-db.json");

function ensureDataStoreExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CMS_FILE_PATH)) {
    fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(INITIAL_CMS_DATA, null, 2), "utf-8");
  }
}

function readCmsStore() {
  try {
    ensureDataStoreExists();
    const raw = fs.readFileSync(CMS_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading CMS store, resetting to initial data:", e);
    return INITIAL_CMS_DATA;
  }
}

function writeCmsStore(data: any) {
  try {
    ensureDataStoreExists();
    data.lastSavedAt = new Date().toISOString();
    fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing CMS store:", e);
  }
}

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

// =============================
// CMS ADMIN & API ENDPOINTS
// =============================

// Get CMS Data
app.get("/api/cms/data", (_req, res) => {
  const store = readCmsStore();
  res.json(store);
});

// Update / Auto-Save CMS Data
app.post("/api/cms/update", (req, res) => {
  try {
    const newStore = req.body;
    if (!newStore || typeof newStore !== "object") {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    const currentStore = readCmsStore();
    
    // Automatically record a version history snapshot if major changes occur
    const versionEntry = {
      id: `ver-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      summary: req.body.changeSummary || "Auto-saved updates",
      author: req.body.author || "Admin",
    };

    const updatedVersions = [versionEntry, ...(currentStore.versions || [])].slice(0, 20); // keep last 20

    const mergedStore = {
      ...currentStore,
      ...newStore,
      versions: updatedVersions,
      lastSavedAt: new Date().toISOString(),
    };

    writeCmsStore(mergedStore);
    res.json({ success: true, store: mergedStore, message: "Changes saved successfully" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update CMS store", details: err.message });
  }
});

// Publish CMS Data
app.post("/api/cms/publish", (req, res) => {
  try {
    const store = readCmsStore();
    store.mode = "published";
    store.lastSavedAt = new Date().toISOString();
    
    const versionEntry = {
      id: `pub-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      summary: "Published Live Portfolio Changes",
      author: "Admin",
    };
    store.versions = [versionEntry, ...(store.versions || [])].slice(0, 20);

    writeCmsStore(store);
    res.json({ success: true, store, message: "Portfolio published live!" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to publish portfolio" });
  }
});

// Auth Login
app.post("/api/cms/auth/login", (req, res) => {
  const { email, password } = req.body;
  const store = readCmsStore();
  const adminEmail = store.profile?.email || "sam444official@gmail.com";

  // Allow standard admin credentials or owner email
  if ((email === adminEmail || email === "admin@portfolio.com" || email === "sam444official@gmail.com") && (password === "admin123" || password === "sarim2026" || password === "admin")) {
    res.json({
      success: true,
      token: `token-${Date.now()}`,
      user: {
        name: store.profile?.name || "Sarim Usmani",
        email: adminEmail,
        role: "Administrator",
        avatar: store.profile?.profilePhotoUrl || "",
      },
    });
  } else {
    res.status(401).json({ error: "Invalid email or password. Use email: sam444official@gmail.com and password: admin123" });
  }
});

// Asset File Upload
app.post("/api/cms/upload", (req, res) => {
  try {
    const { name, type, dataUrl, size } = req.body;
    if (!name || !dataUrl) {
      res.status(400).json({ error: "File name and data URL are required" });
      return;
    }

    const store = readCmsStore();
    const newAsset = {
      id: `asset-${Date.now()}`,
      name,
      size: size || Math.round(dataUrl.length * 0.75),
      type: type || "image",
      url: dataUrl,
      uploadedAt: new Date().toISOString().split("T")[0],
    };

    store.assets = [newAsset, ...(store.assets || [])];
    writeCmsStore(store);

    res.json({ success: true, asset: newAsset });
  } catch (err: any) {
    res.status(500).json({ error: "File upload failed" });
  }
});

// Reset CMS Store to Default
app.post("/api/cms/reset", (_req, res) => {
  try {
    writeCmsStore(INITIAL_CMS_DATA);
    res.json({ success: true, store: INITIAL_CMS_DATA, message: "Portfolio reset to factory default!" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to reset portfolio" });
  }
});

// Export JSON Backup
app.get("/api/cms/export", (_req, res) => {
  const store = readCmsStore();
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", `attachment; filename=sarim_portfolio_cms_backup_${Date.now()}.json`);
  res.send(JSON.stringify(store, null, 2));
});

// Import JSON Backup
app.post("/api/cms/import", (req, res) => {
  try {
    const importedData = req.body;
    if (!importedData || typeof importedData !== "object" || !importedData.profile) {
      res.status(400).json({ error: "Invalid JSON backup format" });
      return;
    }

    writeCmsStore(importedData);
    res.json({ success: true, store: importedData, message: "Backup imported successfully!" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to import backup JSON" });
  }
});

// Analytics Event Logging
app.post("/api/cms/analytics/event", (req, res) => {
  try {
    const { eventType, projectName, inquiry } = req.body;
    const store = readCmsStore();
    if (!store.analytics) {
      store.analytics = {
        totalViews: 100,
        projectClicks: 50,
        contactSubmissions: 5,
        resumeDownloads: 20,
        topProjects: [],
        recentInquiries: [],
      };
    }

    if (eventType === "page_view") {
      store.analytics.totalViews += 1;
    } else if (eventType === "project_click") {
      store.analytics.projectClicks += 1;
      if (projectName) {
        const existing = store.analytics.topProjects.find((p: any) => p.name === projectName);
        if (existing) existing.clicks += 1;
        else store.analytics.topProjects.push({ name: projectName, clicks: 1 });
      }
    } else if (eventType === "resume_download") {
      store.analytics.resumeDownloads += 1;
    } else if (eventType === "contact_submit" && inquiry) {
      store.analytics.contactSubmissions += 1;
      store.analytics.recentInquiries.unshift({
        id: `inq-${Date.now()}`,
        name: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject || "General Inquiry",
        date: new Date().toISOString().split("T")[0],
      });
    }

    writeCmsStore(store);
    res.json({ success: true, analytics: store.analytics });
  } catch (err) {
    res.json({ success: false });
  }
});

// AI Chatbot endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const cms = readCmsStore();
    const customPromptContext = `
You are Sarim Usmani's AI Portfolio Assistant, representing Sarim Usmani on his developer portfolio.
Live Updated Profile Context:
- Name: ${cms.profile.name}
- Title: ${cms.profile.title} (${cms.profile.subtitle})
- Location: ${cms.profile.location}
- College: ${cms.profile.college} (Graduation: ${cms.profile.graduationYear})
- Status: ${cms.profile.statusBadge} (${cms.profile.availability})
- Email: ${cms.profile.email} | Phone: ${cms.profile.phone}
- Bio: ${cms.profile.bioShort}
- Featured Project: ${cms.featuredProject.title} - ${cms.featuredProject.description}
- Active Skills: ${cms.skills.map((s: any) => s.name).join(", ")}

Answer visitor questions accurately based on this live portfolio data!
`;

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response if API key is not yet set up
      res.json({
        reply: `Thanks for reaching out! ${cms.profile.name} is a ${cms.profile.title} at ${cms.profile.college}, specializing in Next.js, React, TypeScript, Node.js, and AI integrations. He is ${cms.profile.statusBadge.toLowerCase()}! Feel free to leave a message in the contact section or schedule a meeting.`,
      });
      return;
    }

    const prompt = `${customPromptContext}\n\nVisitor Question: "${message}"\nProvide a clear, engaging, and structured response:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const reply = response.text || `Thank you for asking! ${cms.profile.name} is ready to collaborate on high-impact projects.`;
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

    // Log contact submission to CMS analytics inquiries log
    try {
      const store = readCmsStore();
      if (!store.analytics) {
        store.analytics = { totalViews: 0, projectClicks: 0, contactSubmissions: 0, resumeDownloads: 0, topProjects: [], recentInquiries: [] };
      }
      store.analytics.contactSubmissions = (store.analytics.contactSubmissions || 0) + 1;
      store.analytics.recentInquiries = [
        { id: `inq-${Date.now()}`, name, email, subject: subject || "General Inquiry", date: new Date().toISOString().split("T")[0] },
        ...(store.analytics.recentInquiries || []),
      ];
      writeCmsStore(store);
    } catch (e) {
      // ignore
    }

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

