export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription?: string;
  isFeatured?: boolean;
  features: string[];
  technologies: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  docUrl?: string;
  caseStudyUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  galleryImages?: string[];
  status?: "published" | "draft";
  category?: string;
  tags?: string[];
  architectureOverview: string;
  challengesSolved: string[];
  futureImprovements: string[];
  imagePlaceholderText: string;
  stats?: { label: string; value: string }[];
}

export interface SkillItem {
  id?: string;
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
  progress: number; // 0-100
  category: "Frontend" | "Backend" | "Programming Languages" | "Databases" | "Developer Tools" | "AI" | "Cloud" | "DevOps" | "Tools";
  iconName: string;
  relevantTech: string[];
  description?: string;
  color?: string;
  sortOrder?: number;
}

export interface EducationEntry {
  id?: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  description: string;
  achievements: string[];
  coursework: string[];
  technicalFocus: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  companyLogo?: string;
}

export interface CertificateEntry {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  imageBadge?: string;
  skills: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown text
  summary: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  status: "published" | "draft";
  publishDate: string;
  readingTime: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface PromptItem {
  id: string;
  title: string;
  promptText: string;
  category: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  isFeatured?: boolean;
  copiedCount?: number;
}

export interface ResumeVersion {
  id: string;
  title?: string;
  label?: string;
  targetRole?: string;
  fileUrl: string;
  format?: "PDF" | "DOCX";
  isDefault?: boolean;
  isPrimary?: boolean;
  lastUpdated?: string;
  uploadDate?: string;
  fileSize?: string;
  downloadCount?: number;
  summaryText?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string;
  enabled: boolean;
  customLabel?: string;
}

export interface ProfileInfo {
  name: string;
  headerLogo: string;
  title: string;
  subtitle: string;
  tagline: string;
  status: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  college: string;
  graduationYear: string;
  yearsExperience: string;
  portfolioUrl: string;
  profilePhotoUrl?: string;
  resumePdfUrl?: string;
  availability: string;
  statusBadge: string;
  bioShort: string;
  bioFull: string;
}

export interface ContactConfig {
  email: string;
  phone?: string;
  address?: string;
  googleMapsUrl?: string;
  calendlyUrl?: string;
  workingHours?: string;
  availabilityStatus?: string;
  responseTime?: string;
  ctaHeadline?: string;
}

export interface SeoConfig {
  siteTitle: string;
  metaDescription: string;
  keywords?: string[] | string;
  ogImage?: string;
  ogImageUrl?: string;
  twitterCard?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
  robotsTxt?: string;
  sitemapXml?: string;
  googleAnalyticsId?: string;
  googleSearchConsoleMeta?: string;
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor?: string;
  themeMode?: "dark" | "light";
  darkMode?: boolean;
  animationsEnabled?: boolean;
  fontFamily?: string;
  borderRadius?: string;
  customCss?: string;
  glassmorphismIntensity?: string;
  animationSpeed?: string;
  gridPattern?: string;
}

export interface FileAsset {
  id: string;
  name: string;
  size: number;
  type: "image" | "pdf" | "document" | "video" | "icon";
  url: string;
  uploadedAt: string;
}

export interface AnalyticsData {
  totalViews: number;
  projectClicks: number;
  contactSubmissions: number;
  resumeDownloads: number;
  topProjects?: any[];
  recentInquiries?: { id: string; name: string; email: string; subject: string; message?: string; date: string }[];
}

export interface VersionHistoryEntry {
  id: string;
  timestamp: string;
  summary: string;
  author: string;
}

export interface CmsData {
  profile: ProfileInfo;
  statistics: StatisticCard[];
  skills: SkillItem[];
  featuredProject: Project;
  additionalProjects: Project[];
  experiences: ExperienceEntry[];
  education: EducationEntry;
  certificates: CertificateEntry[];
  softSkills: SoftSkill[];
  blogs: BlogPost[];
  prompts: PromptItem[];
  resumes: ResumeVersion[];
  socialLinks: SocialLink[];
  contact: ContactConfig;
  contactInfo?: ContactConfig;
  seo: SeoConfig;
  seoSettings?: SeoConfig;
  theme: ThemeConfig;
  themeSettings?: ThemeConfig;
  assets: FileAsset[];
  analytics: AnalyticsData;
  versions: VersionHistoryEntry[];
  mode: "published" | "draft";
  lastSavedAt?: string;
}

export interface SoftSkill {
  id: string;
  title: string;
  iconName: string;
  description: string;
  examples: string;
}

export interface StatisticCard {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  iconName: string;
  trend?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface BillScanResult {
  providerName: string;
  monthlyUsageKwh: number;
  estimatedCarbonKg: number;
  sustainabilityRating: string;
  breakdown: { category: string; usagePercent: number; co2Kg: number }[];
  actionableTips: string[];
  reductionPotentialPercent: number;
}
