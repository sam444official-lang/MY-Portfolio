import { CmsData } from "../types";
import {
  PERSONAL_INFO,
  STATISTICS_DATA,
  SKILLS_DATA,
  FEATURED_PROJECT,
  ADDITIONAL_PROJECTS,
  EDUCATION_DATA,
  SOFT_SKILLS_DATA,
} from "./portfolioData";

export const INITIAL_CMS_DATA: CmsData = {
  profile: {
    name: PERSONAL_INFO.name,
    headerLogo: PERSONAL_INFO.headerLogo,
    title: PERSONAL_INFO.title,
    subtitle: PERSONAL_INFO.subtitle,
    tagline: PERSONAL_INFO.tagline,
    status: PERSONAL_INFO.status,
    location: PERSONAL_INFO.location,
    email: PERSONAL_INFO.email,
    phone: "+91 98765 43210",
    github: PERSONAL_INFO.github,
    linkedin: PERSONAL_INFO.linkedin,
    college: PERSONAL_INFO.college,
    graduationYear: PERSONAL_INFO.graduationYear,
    yearsExperience: "2+ Years (Academic & Projects)",
    portfolioUrl: "https://sarim-usmani-portfolio.app",
    profilePhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    resumePdfUrl: "/assets/Sarim_Usmani_Resume.pdf",
    availability: "Immediate / Summer 2026",
    statusBadge: "Actively Job Hunting",
    bioShort: PERSONAL_INFO.bioShort,
    bioFull: PERSONAL_INFO.bioFull,
  },
  statistics: STATISTICS_DATA,
  skills: SKILLS_DATA.map((s, idx) => ({
    ...s,
    id: `skill-${idx + 1}`,
    color: idx % 2 === 0 ? "#10B981" : "#3B82F6",
    sortOrder: idx + 1,
  })),
  featuredProject: {
    ...FEATURED_PROJECT,
    status: "published",
    category: "Full-Stack AI",
    tags: ["Gemini AI", "Next.js", "Firebase", "Sustainability"],
  },
  additionalProjects: ADDITIONAL_PROJECTS.map((p) => ({
    ...p,
    status: "published",
    category: p.technologies.includes("Gemini API") || p.technologies.includes("AI") ? "AI Application" : "Web Development",
    tags: p.technologies,
  })),
  experiences: [
    {
      id: "exp-1",
      company: "Universal Tech Circle",
      role: "Lead Student Web Developer & Mentor",
      location: "Mumbai, India",
      startDate: "Aug 2024",
      endDate: "Present",
      isCurrent: true,
      description: "Spearheaded student web development initiatives, organized hackathons, and mentored junior CS undergraduates in React, TypeScript, and Git workflows.",
      achievements: [
        "Architected the tech society portal using React 19 and Tailwind CSS.",
        "Mentored over 40+ students in web design, API integration, and version control.",
      ],
      companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "exp-2",
      company: "TechNexus Open Source",
      role: "Full-Stack Contributor (Internship)",
      location: "Remote",
      startDate: "Jan 2024",
      endDate: "Jun 2024",
      isCurrent: false,
      description: "Built responsive frontend views and Express REST endpoints for developer productivity tooling.",
      achievements: [
        "Reduced API latency by 35% using lazy initialization and payload caching.",
        "Integrated dark mode theme switcher and responsive grid systems.",
      ],
      companyLogo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
    },
  ],
  education: {
    ...EDUCATION_DATA,
    id: "edu-1",
  },
  certificates: [
    {
      id: "cert-1",
      title: "Google Cloud Certified — AI & Generative AI Essentials",
      issuer: "Google Cloud",
      issueDate: "Jan 2025",
      credentialUrl: "https://cloud.google.com/certification",
      credentialId: "GCP-AI-2025-9981",
      skills: ["Gemini API", "Generative AI", "LLM Fine-tuning", "Prompt Engineering"],
    },
    {
      id: "cert-2",
      title: "Full-Stack Web Development Mastery (React & Node.js)",
      issuer: "Udemy / Meta Developer Network",
      issueDate: "Nov 2024",
      credentialUrl: "https://udemy.com/certificate",
      credentialId: "UC-98214-FULLSTACK",
      skills: ["React 19", "Next.js 15", "TypeScript", "REST APIs", "Express"],
    },
  ],
  softSkills: SOFT_SKILLS_DATA,
  blogs: [
    {
      id: "blog-1",
      title: "Building EcoTrack India: How We Integrated Gemini Vision AI for Carbon Calculations",
      slug: "building-ecotrack-india-gemini-ai",
      summary: "A step-by-step breakdown of parsing unstructured Indian utility bills into structured carbon metrics using Next.js 15 and Gemini AI.",
      content: `# Building EcoTrack India: Lessons in Full-Stack & Generative AI

When developing **EcoTrack India**, our goal was simple yet ambitious: empower Indian households to understand their carbon emissions from electricity usage without tedious manual entry.

## The Engineering Challenge

Indian power distribution companies (Tata Power, MSEDCL, Adani Electricity, BESCOM) issue bills with wildly different layouts, fonts, and Hindi/English terminology. Traditional OCR regex matching frequently broke down.

## Leveraging Gemini Vision AI & Structured Schemas

Instead of rigid OCR, we utilized the new **@google/genai SDK** with structured JSON output configurations:

\`\`\`typescript
const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: prompt,
  config: { responseMimeType: "application/json" }
});
\`\`\`

### Key Outcomes

1. **< 1.5s Scan Latency**: Users receive instant carbon breakdowns across cooling, lighting, and appliances.
2. **Region-Specific Emission Factors**: Computed state grid factors (0.82 kg CO2 / kWh for Maharashtra).
3. **Downloadable PDF Reports**: Automated actionable tips for 5-Star inverter AC upgrades.

Stay tuned for our upcoming IoT solar integration updates!`,
      category: "Case Study",
      tags: ["Gemini AI", "Next.js", "Sustainability", "React"],
      featuredImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80",
      status: "published",
      publishDate: "2026-07-28",
      readingTime: "4 min read",
      seoTitle: "Building EcoTrack India — AI Sustainability App Case Study",
      seoDescription: "How Sarim Usmani built EcoTrack India using Next.js 15, React, and Gemini Vision AI.",
    },
    {
      id: "blog-2",
      title: "Why Next.js 15 & React 19 Are the Gold Standard for Modern SaaS",
      slug: "nextjs15-react19-saas-architecture",
      summary: "Exploring Server Components, Compiler optimizations, and strict TypeScript patterns in modern production web development.",
      content: `# Why Next.js 15 & React 19 Are the Gold Standard

React 19 brings powerful compiler optimizations, actions, and streamlined hooks. Paired with Next.js 15 App Router, full-stack web applications reach unprecedented performance benchmarks.

## 1. Zero-Bundle Server Components
Moving heavy computation to the server keeps client JavaScript minimal and fast.

## 2. Type-Safe API Routes
With TypeScript strict mode, contract interfaces between client forms and backend endpoints guarantee zero runtime type mismatches.

\`\`\`tsx
export async function POST(req: Request) {
  const body: UserPayload = await req.json();
  // Safe processing...
}
\`\`\`

Clean architecture matters!`,
      category: "Engineering",
      tags: ["React 19", "Next.js 15", "TypeScript", "Performance"],
      featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      status: "published",
      publishDate: "2026-07-15",
      readingTime: "3 min read",
      seoTitle: "Next.js 15 & React 19 SaaS Architecture Guide",
      seoDescription: "An engineering deep-dive into React 19, Next.js 15, and TypeScript by Sarim Usmani.",
    },
  ],
  prompts: [
    {
      id: "prompt-1",
      title: "Full-Stack Code Auditor & Security Refactoring System Prompt",
      promptText: `You are an expert Principal Full-Stack Engineer and Security Auditor. Analyze the provided TypeScript/React snippet and output a JSON breakdown containing:
1. "vulnerabilities": List of memory leaks, XSS risks, or API key exposure.
2. "refactoredCode": Clean, production-ready code using React 19 hooks and type safety.
3. "performanceGain": Estimated execution improvement percentage.`,
      category: "Development",
      tags: ["Code Review", "Security", "TypeScript"],
      difficulty: "Intermediate",
      isFeatured: true,
      copiedCount: 142,
    },
    {
      id: "prompt-2",
      title: "Gemini Structured JSON Schema Extractor Prompt",
      promptText: `Extract unstructured text/document data into strict JSON following this JSON Schema:
{ "type": "object", "properties": { "title": { "type": "string" }, "items": { "type": "array" } } }
Do not output markdown code fences or conversational conversational text—return valid JSON only.`,
      category: "AI Engineering",
      tags: ["Gemini API", "JSON Schema", "Structured Output"],
      difficulty: "Advanced",
      isFeatured: true,
      copiedCount: 98,
    },
  ],
  resumes: [
    {
      id: "res-1",
      title: "Full-Stack Web Developer Resume (2026)",
      targetRole: "Software Engineering & Full Stack Roles",
      fileUrl: "/assets/Sarim_Usmani_FullStack_Resume.pdf",
      format: "PDF",
      isDefault: true,
      lastUpdated: "July 2026",
      summaryText: "Comprehensive CV highlighting Next.js 15, React 19, TypeScript, Node.js, Express, Firebase, and Gemini AI projects.",
    },
    {
      id: "res-2",
      title: "Frontend Engineering Resume",
      targetRole: "Frontend Developer / UI Engineer",
      fileUrl: "/assets/Sarim_Usmani_Frontend_Resume.pdf",
      format: "PDF",
      isDefault: false,
      lastUpdated: "July 2026",
      summaryText: "Specialized CV emphasizing Tailwind CSS, Framer Motion, glassmorphism UI design, and client-side performance.",
    },
    {
      id: "res-3",
      title: "AI Systems & Web Engineering Resume",
      targetRole: "AI Application Developer / Web AI Engineer",
      fileUrl: "/assets/Sarim_Usmani_AI_Resume.pdf",
      format: "PDF",
      isDefault: false,
      lastUpdated: "July 2026",
      summaryText: "Focuses on Gemini Vision AI, bill scanners, prompt engineering, and LLM orchestration.",
    },
  ],
  socialLinks: [
    { id: "soc-1", platform: "GitHub", url: "https://github.com/sarim-usmani", iconName: "Github", enabled: true },
    { id: "soc-2", platform: "LinkedIn", url: "https://linkedin.com/in/sarim-usmani", iconName: "Linkedin", enabled: true },
    { id: "soc-3", platform: "Twitter / X", url: "https://twitter.com/sarimusmani", iconName: "Twitter", enabled: true },
    { id: "soc-4", platform: "LeetCode", url: "https://leetcode.com/u/sarimusmani", iconName: "Code2", enabled: true },
    { id: "soc-5", platform: "Email", url: "mailto:sam444official@gmail.com", iconName: "Mail", enabled: true },
    { id: "soc-6", platform: "WhatsApp", url: "https://wa.me/919876543210", iconName: "MessageCircle", enabled: true },
    { id: "soc-7", platform: "Instagram", url: "https://instagram.com/sarim_usmani", iconName: "Instagram", enabled: false },
    { id: "soc-8", platform: "YouTube", url: "https://youtube.com/@sarimusmani", iconName: "Youtube", enabled: false },
    { id: "soc-9", platform: "Dev.to", url: "https://dev.to/sarimusmani", iconName: "FileText", enabled: true },
    { id: "soc-10", platform: "Medium", url: "https://medium.com/@sarimusmani", iconName: "Globe", enabled: false },
  ],
  contact: {
    email: "sam444official@gmail.com",
    phone: "+91 98765 43210",
    address: "Lords Universal College Campus, Malad West, Mumbai, Maharashtra 400064",
    googleMapsUrl: "https://maps.google.com/?q=Lords+Universal+College+Mumbai",
    calendlyUrl: "https://calendly.com/sarim-usmani/15min",
    workingHours: "Mon – Sat: 09:00 AM – 08:00 PM IST",
    availabilityStatus: "Open for Full-Time Roles & Internships",
    responseTime: "< 12 Hours",
  },
  seo: {
    siteTitle: "Sarim Usmani — Full-Stack Web Developer & CS Student Portfolio",
    metaDescription: "Portfolio of Sarim Usmani, Final-Year CS Student at Lords Universal College, Mumbai. Specializing in Next.js, React 19, TypeScript, and Gemini AI.",
    keywords: "Sarim Usmani, Full-Stack Developer, Computer Science, Mumbai, React 19, Next.js 15, TypeScript, EcoTrack India, Gemini AI",
    ogImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80",
    twitterCard: "summary_large_image",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://sarim-usmani-portfolio.app/sitemap.xml",
    sitemapXml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://sarim-usmani-portfolio.app/</loc>\n    <lastmod>2026-08-02</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>`,
    googleAnalyticsId: "G-SARIM2026PORTFOLIO",
    googleSearchConsoleMeta: "gsc_verification_code_sarim_2026",
  },
  theme: {
    primaryColor: "#10B981", // Emerald
    accentColor: "#3B82F6", // Blue
    themeMode: "dark",
    animationsEnabled: true,
    fontFamily: "Inter, Plus Jakarta Sans, sans-serif",
    borderRadius: "1.5rem",
    customCss: "",
  },
  assets: [
    {
      id: "asset-1",
      name: "sarim_profile_photo.jpg",
      size: 142000,
      type: "image",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      uploadedAt: "2026-07-20",
    },
    {
      id: "asset-2",
      name: "ecotrack_dashboard_banner.png",
      size: 420000,
      type: "image",
      url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80",
      uploadedAt: "2026-07-22",
    },
  ],
  analytics: {
    totalViews: 1284,
    projectClicks: 412,
    contactSubmissions: 28,
    resumeDownloads: 184,
    topProjects: [
      { name: "EcoTrack India", clicks: 248 },
      { name: "DevAssist AI", clicks: 89 },
      { name: "Pulse Analytics", clicks: 75 },
    ],
    recentInquiries: [
      { id: "inq-1", name: "Rohan Mehta", email: "rohan@techcorp.in", subject: "Full Stack Internship Role", date: "2026-08-01" },
      { id: "inq-2", name: "Priya Sharma", email: "priya@innovate.io", subject: "Project Demonstration Inquiry", date: "2026-07-30" },
    ],
  },
  versions: [
    {
      id: "ver-1",
      timestamp: "2026-08-02 10:00 AM",
      summary: "Initial Portfolio Baseline Setup",
      author: "Admin",
    },
  ],
  mode: "published",
  lastSavedAt: new Date().toISOString(),
  aiSettings: {
    geminiApiKey: "••••••••••••••••••••••••••••",
    openAiApiKey: "",
    defaultModel: "gemini-3.6-flash",
    systemPrompt: "You are an intelligent AI assistant representing Sarim Usmani's portfolio. Provide helpful, accurate responses about Sarim's skills, experience, and capstone projects.",
    temperature: 0.7,
    maxTokens: 2048,
    enableStreaming: true,
    enableAiChat: true,
    enableCodeReview: true,
    enableResumeBuilder: true,
    enablePromptLibrary: true,
  },
};
